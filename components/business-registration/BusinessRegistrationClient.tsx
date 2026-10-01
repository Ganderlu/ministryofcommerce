"use client";
import { useEffect, useRef, useState } from "react";
import { Box, Container, Grid, Snackbar, Alert } from "@mui/material";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RegistrationStepper from "@/components/business-registration/RegistrationStepper";
import BusinessInformationForm from "@/components/business-registration/BusinessInformationForm";
import OwnerInformationForm from "@/components/business-registration/OwnerInformationForm";
import DocumentUpload from "@/components/business-registration/DocumentUpload";
import ReviewSubmission from "@/components/business-registration/ReviewSubmission";
import GuidelinesSidebar from "@/components/business-registration/GuidelinesSidebar";
import RequiredDocuments from "@/components/business-registration/RequiredDocuments";
import HelpCard from "@/components/business-registration/HelpCard";
import {
  db,
  collection,
  doc,
  getDoc,
  setDoc,
  Timestamp,
} from "@/firebase/clients";
import type {
  BusinessRegistrationFormData,
  OwnerDirector,
  BusinessDocumentUpload,
  BusinessRegistrationDocument,
} from "@/types";

const COLLECTION_PATH = "business_registrations";
const STORAGE_DOC_KEY = "businessRegDocId";
const STORAGE_DATA_KEY = "businessRegDraft";
const SUBMIT_TIMEOUT_MS = 120_000;

const RULES_HINT_MSG =
  "Firestore rules may not be deployed yet. Run `npx firebase deploy --only firestore:rules` from the project folder, or paste firestore.rules into: console.firebase.google.com/project/anambra-commerce-d6fa7/firestore/rules then click PUBLISH.";

function classifyFirestoreError(rawError: string | null | undefined): {
  level: "error" | "info";
  userMessage: string;
} {
  if (!rawError) return { level: "info", userMessage: "Unknown error" };
  const e = String(rawError);
  if (
    /PERMISSION[_-]DENIED|permission[_-]denied|Missing or insufficient permissions|permission-denied/i.test(
      e
    )
  ) {
    return {
      level: "error",
      userMessage: `Access to Firestore was DENIED. ${RULES_HINT_MSG}.`,
    };
  }
  if (/TIMEOUT|timed out|exceeded.*ms/i.test(e)) {
    return {
      level: "error",
      userMessage: `Save did not respond within the allowed time. If this keeps happening, ${RULES_HINT_MSG.toLowerCase()}.`,
    };
  }
  if (
    /network|offline|internet|connection|DNS|CORS|Failed to fetch|fetch failed|socket/i.test(
      e
    )
  ) {
    return {
      level: "error",
      userMessage: `Network issue: ${e.substring(0, 140)}. Check your connection and try again.`,
    };
  }
  return { level: "error", userMessage: e };
}

type SerializableRecord = Record<string, any>;

function stripUndefined<T extends SerializableRecord>(obj: T): T {
  const out: any = {};
  for (const key of Object.keys(obj)) {
    const value = (obj as any)[key];
    if (value === undefined) continue;
    if (value && typeof value === "object" && !Array.isArray(value) && !(value instanceof Timestamp)) {
      out[key] = stripUndefined(value);
    } else {
      out[key] = value;
    }
  }
  return out as T;
}

async function withTimeout<T>(
  promise: Promise<T>,
  ms: number,
  label: string
): Promise<{ ok: boolean; result?: T; error?: string; timedOut: boolean }> {
  let timeoutId: any = null;
  let completed = false;

  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      if (!completed) {
        reject(new Error(`TIMEOUT: ${label} exceeded ${ms}ms`));
      }
    }, ms);
  });

  try {
    const result = await Promise.race([promise, timeoutPromise]);
    completed = true;
    return { ok: true, timedOut: false, result: result as T };
  } catch (e: any) {
    const isTimeout = e?.message?.startsWith?.("TIMEOUT:") ?? false;

    if (isTimeout) {
      promise.then(
        () => {},
        () => {}
      ).finally(() => {
        completed = true;
      });
    } else {
      completed = true;
    }

    return {
      ok: false,
      timedOut: isTimeout,
      error: e?.message || String(e) || "Unknown error",
    };
  } finally {
    if (timeoutId != null) clearTimeout(timeoutId);
  }
}

function generateBusinessRegistrationNumber(
  businessInformation: BusinessRegistrationFormData | Record<string, unknown> | null | undefined,
  createdMs: number
): string {
  const prefix = "AN/BIZ";
  const lga = (businessInformation as any)?.localGovernmentArea || "";
  let lgaCode = "00";
  if (lga && lga.length > 0) {
    const words = lga.split(/\s+/).filter(Boolean);
    if (words.length >= 2) {
      lgaCode = (words[0][0] + words[1][0]).toUpperCase();
    } else if (words.length === 1) {
      lgaCode = words[0].slice(0, 2).toUpperCase();
    }
    if (lgaCode.length < 2) lgaCode = lgaCode.padEnd(2, "0");
  }
  const year = new Date(createdMs).getFullYear();
  const day = String(new Date(createdMs).getDate()).padStart(2, "0");
  const month = String(new Date(createdMs).getMonth() + 1).padStart(2, "0");
  const randomPart = Math.floor(1000 + Math.random() * 9000).toString();
  return `${prefix}/${lgaCode}/${year}/${month}${day}${randomPart}`;
}

export default function BusinessRegistrationClient() {
  const [activeStep, setActiveStep] = useState(0);
  const [docId, setDocId] = useState<string | null>(null);
  const [documentData, setDocumentData] = useState<BusinessRegistrationDocument | null>(null);
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<{
    registrationNumber: string;
    docId: string;
  } | null>(null);
  const [notify, setNotify] = useState<{
    open: boolean;
    type: "success" | "error" | "info";
    msg: string;
  }>({
    open: false,
    type: "success",
    msg: "",
  });
  const closeNotifyTimer = useRef<any>(null);

  const notifyOf = (type: "success" | "error" | "info", msg: string) => {
    setNotify({ open: true, type, msg });
    if (closeNotifyTimer.current) {
      clearTimeout(closeNotifyTimer.current);
    }
    const durationMs = type === "error" ? 15_000 : 7_000;
    closeNotifyTimer.current = setTimeout(() => {
      setNotify((n) => ({ ...n, open: false }));
    }, durationMs);
  };

  const hydrateFromFirestore = async (id: string) => {
    const result = await withTimeout(
      getDoc(doc(db, COLLECTION_PATH, id)),
      30_000,
      `Load document ${id}`
    );
    if (!result.ok || !result.result) return;
    const snap = result.result;
    if (!snap.exists()) return;
    const data = snap.data() as BusinessRegistrationDocument;
    setDocumentData({ ...data, id: snap.id });
    if (typeof data.status === "string" && data.status === "submitted") {
      setActiveStep(4);
      if ((data as any).registrationNumber) {
        setSuccessData({
          registrationNumber: (data as any).registrationNumber,
          docId: snap.id,
        });
      }
      return;
    }
    if (typeof data.currentStep === "number" && data.currentStep > 0) {
      setActiveStep(Math.min(data.currentStep, 3));
    }
  };

  useEffect(() => {
    const storedDocId = typeof window !== "undefined" ? window.sessionStorage.getItem(STORAGE_DOC_KEY) : null;
    const storedDraft = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_DATA_KEY) : null;
    
    if (storedDocId) {
      setDocId(storedDocId);
      hydrateFromFirestore(storedDocId);
    } else if (storedDraft) {
      try {
        const parsed = JSON.parse(storedDraft) as BusinessRegistrationDocument;
        setDocumentData(parsed);
        if (parsed.id) setDocId(parsed.id);
        if (typeof parsed.currentStep === "number") {
          setActiveStep(Math.min(parsed.currentStep, 3));
        }
      } catch {}
    }
    return () => {
      if (closeNotifyTimer.current) clearTimeout(closeNotifyTimer.current);
    };
  }, []);

  // =============== STEP 1 → 2 (Save to localStorage only, NOT Firebase) ===============
  const handleSaveStep1 = async (
    data: BusinessRegistrationFormData
  ) => {
    setSaving(true);

    const registrationDocId =
      docId || doc(collection(db, COLLECTION_PATH)).id;

    const updatedData = {
      ...(documentData ?? {}),
      id: registrationDocId,
      businessInformation: data,
      owners: documentData?.owners ?? [],
      documents: documentData?.documents ?? [],
      status: "draft",
      currentStep: 1,
    } as BusinessRegistrationDocument;

    try {
      window.localStorage.setItem(
        STORAGE_DATA_KEY,
        JSON.stringify(updatedData)
      );
    } catch {}

    setDocId(registrationDocId);

    try {
      window.sessionStorage.setItem(
        STORAGE_DOC_KEY,
        registrationDocId
      );
    } catch {}

    setDocumentData(updatedData);
    setSaving(false);

    setActiveStep(1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    notifyOf(
      "success",
      "Business information saved. Continuing to Owner / Director Information…"
    );
  };

  // =============== STEP 2 → 3 (Save to localStorage only, NOT Firebase) ===============
  const handleSaveStep2 = async (owners: OwnerDirector[]) => {
    setSaving(true);

    const updatedData = {
      ...(documentData ?? {}),
      id: docId,
      owners,
      currentStep: 2,
    } as BusinessRegistrationDocument;

    setDocumentData(updatedData);

    try {
      window.localStorage.setItem(
        STORAGE_DATA_KEY,
        JSON.stringify(updatedData)
      );
    } catch {}

    if (!docId) {
      setSaving(false);
      notifyOf("error", "Please complete Step 1 (Business Information) first.");
      setActiveStep(0);
      return;
    }

    setSaving(false);
    setActiveStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
    notifyOf(
      "success",
      "Owner / Director information saved. Continuing to Documents Upload…"
    );
  };

  // =============== STEP 3 → 4 (Save to localStorage only, NOT Firebase) ===============
  const handleSaveStep3 = async (documents: BusinessDocumentUpload[]) => {
    setSaving(true);

    const totalCloudinary = documents.filter((d) => !!d.cloudinary).length;
    const totalDocs = documents.length;

    const updatedData = {
      ...(documentData ?? {}),
      id: docId,
      documents,
      currentStep: 3,
      status: "draft",
      documentsSummary: {
        total: totalDocs,
        onCloudinary: totalCloudinary,
      },
    } as BusinessRegistrationDocument;

    setDocumentData(updatedData);

    try {
      window.localStorage.setItem(
        STORAGE_DATA_KEY,
        JSON.stringify(updatedData)
      );
    } catch {}

    if (!docId) {
      setSaving(false);
      notifyOf("error", "Please complete Step 1 (Business Information) first.");
      setActiveStep(0);
      return;
    }

    setSaving(false);
    setActiveStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
    notifyOf(
      "success",
      `${totalCloudinary}/${totalDocs} documents saved with Cloudinary URLs. Continuing to Review & Submit…`
    );
  };

  // =============== STEP 4 — Final Submit (Firebase Firestore: SAVE EVERYTHING HERE ONLY) ===============
  const handleFinalSubmit = async (submissionData: {
    declarationAgreed: boolean;
    termsAgreed: boolean;
    certificationAccuracy: boolean;
    submissionDate: string;
  }) => {
    setSubmitting(true);

    if (!docId) {
      setSubmitting(false);
      notifyOf("error", "Cannot submit: registration record is missing. Please start over from Step 1.");
      setActiveStep(0);
      return;
    }

    const docToSubmit = documentData as BusinessRegistrationDocument | null;
    if (!docToSubmit || !docToSubmit.businessInformation) {
      setSubmitting(false);
      notifyOf("error", "Cannot submit: business information is missing.");
      setActiveStep(0);
      return;
    }
    if (!docToSubmit.owners || docToSubmit.owners.length === 0) {
      setSubmitting(false);
      notifyOf("error", "Cannot submit: at least one owner/director is required.");
      setActiveStep(1);
      return;
    }
    if (!docToSubmit.documents || docToSubmit.documents.length === 0) {
      setSubmitting(false);
      notifyOf("error", "Cannot submit: at least one document is required.");
      setActiveStep(2);
      return;
    }

    const createdMs = Date.now();
    const registrationNumber = generateBusinessRegistrationNumber(
      docToSubmit.businessInformation as BusinessRegistrationFormData,
      createdMs
    );

    let submitError: string | null = null;
    try {
      const finalPayload: Record<string, unknown> = stripUndefined({
        businessInformation: docToSubmit.businessInformation,
        owners: docToSubmit.owners,
        documents: docToSubmit.documents,
        status: "submitted",
        currentStep: 4,
        registrationNumber,
        createdAt: Timestamp.now(),
        submittedAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        reviewSubmission: {
          declarationAgreed: submissionData.declarationAgreed,
          termsAgreed: submissionData.termsAgreed,
          certificationAccuracy: submissionData.certificationAccuracy,
          submissionDate: submissionData.submissionDate,
        },
        documentsSummary: {
          total: docToSubmit.documents.length,
          onCloudinary: docToSubmit.documents.filter((d) => !!d.cloudinary).length,
        },
        submissionSummary: {
          totalOwners: docToSubmit.owners.length,
          primaryOwnerName: docToSubmit.owners[0]?.fullName || "",
          primaryOwnerEmail: docToSubmit.owners[0]?.email || "",
          businessName: (docToSubmit.businessInformation as BusinessRegistrationFormData).businessName,
          lga: (docToSubmit.businessInformation as BusinessRegistrationFormData).localGovernmentArea,
          emailAddress: (docToSubmit.businessInformation as BusinessRegistrationFormData).emailAddress,
          phoneNumber: (docToSubmit.businessInformation as BusinessRegistrationFormData).phoneNumber,
        },
      } as any);

      const res = await withTimeout(
        setDoc(doc(db, COLLECTION_PATH, docId), finalPayload),
        SUBMIT_TIMEOUT_MS,
        "Submit Business registration"
      );

      if (!res.ok) {
        submitError = res.error || "Submit failed";
      } else {
        setDocumentData((prev) =>
          prev
            ? ({
                ...prev,
                ...finalPayload,
              } as BusinessRegistrationDocument)
            : prev
        );
        setSuccessData({ registrationNumber, docId });
      }
    } catch (e: any) {
      submitError = e?.message || String(e) || "Unexpected submission error";
    } finally {
      setSubmitting(false);
      if (submitError) {
        const isTimeout = submitError.startsWith("TIMEOUT:");
        if (isTimeout) {
          try {
            const check = await withTimeout(
              getDoc(doc(db, COLLECTION_PATH, docId)),
              8000,
              "Verify submission after timeout"
            );
            if (check.ok && check.result) {
              const snap = check.result;
              if (snap.exists()) {
                const latest = snap.data() as BusinessRegistrationDocument;
                if (latest.status === "submitted" && latest.registrationNumber) {
                  setDocumentData((prev) =>
                    prev
                      ? ({
                          ...prev,
                          ...latest,
                        } as BusinessRegistrationDocument)
                      : prev
                  );
                  setSuccessData({ registrationNumber: latest.registrationNumber, docId });
                  try {
                    window.sessionStorage.removeItem(STORAGE_DOC_KEY);
                    window.localStorage.removeItem(STORAGE_DATA_KEY);
                  } catch {}
                  setActiveStep(4);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  notifyOf(
                    "success",
                    `🎉 Registration submitted successfully! Your reference is ${latest.registrationNumber}. Please keep it for your records.`
                  );
                  return;
                }
              }
            }
          } catch {}
        }

        notifyOf(
          (() => {
            const classified = classifyFirestoreError(submitError);
            return classified.level;
          })(),
          (() => {
            const classified = classifyFirestoreError(submitError);
            return classified.userMessage +
              " Your data is still saved locally — please try submitting again.";
          })()
        );
      } else {
        try {
          window.sessionStorage.removeItem(STORAGE_DOC_KEY);
          window.localStorage.removeItem(STORAGE_DATA_KEY);
        } catch {}
        setActiveStep(4);
        window.scrollTo({ top: 0, behavior: "smooth" });
        notifyOf(
          "success",
          `🎉 Registration submitted successfully! Your reference is ${registrationNumber}. Please keep it for your records.`
        );
      }
    }
  };

  const handleBackFromStep2 = () => {
    setActiveStep(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackFromStep3 = () => {
    setActiveStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackFromStep4 = () => {
    setActiveStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box>
      <TopBar />
      <Navbar />
      {!successData && <RegistrationStepper activeStep={activeStep} />}
      <Box sx={{ py: { xs: 5, md: 7 }, backgroundColor: "#F8FAFC" }}>
        <Container maxWidth="xl">
          <Grid container spacing={3.5}>
            <Grid item xs={12} lg={8}>
              {successData ? (
                <SubmissionSuccessCard
                  registrationNumber={successData.registrationNumber}
                  documentData={documentData}
                  docId={successData.docId}
                  onStartNew={() => {
                    setSuccessData(null);
                    setDocumentData(null);
                    setDocId(null);
                    setActiveStep(0);
                    try {
                      window.sessionStorage.removeItem(STORAGE_DOC_KEY);
                      window.localStorage.removeItem(STORAGE_DATA_KEY);
                    } catch {}
                  }}
                />
              ) : (
                <>
                  {activeStep === 0 && (
                    <BusinessInformationForm
                      initialData={documentData?.businessInformation}
                      onSaveAndContinue={handleSaveStep1}
                      saving={saving}
                    />
                  )}
                  {activeStep === 1 && (
                    <OwnerInformationForm
                      initialOwners={documentData?.owners}
                      onSaveAndContinue={handleSaveStep2}
                      onBack={handleBackFromStep2}
                      saving={saving}
                    />
                  )}
                  {activeStep === 2 && (
                    <DocumentUpload
                      initialDocuments={documentData?.documents}
                      temporaryFolderId={docId ?? undefined}
                      onSaveAndContinue={handleSaveStep3}
                      onBack={handleBackFromStep3}
                      saving={saving}
                    />
                  )}
                  {activeStep >= 3 && (
                    <ReviewSubmission
                      documentData={
                        (documentData ?? {
                          businessInformation: {} as BusinessRegistrationFormData,
                          owners: [],
                          documents: [],
                          status: "draft",
                          currentStep: 3,
                        }) as BusinessRegistrationDocument
                      }
                      onBack={handleBackFromStep4}
                      onSubmit={handleFinalSubmit}
                      submitting={submitting}
                    />
                  )}
                </>
              )}
            </Grid>
            <Grid item xs={12} lg={4}>
              <GuidelinesSidebar />
              <RequiredDocuments />
              <HelpCard />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />

      <Snackbar
        open={notify.open}
        onClose={() => setNotify((n) => ({ ...n, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={notify.type === "info" ? "info" : notify.type}
          variant="filled"
          onClose={() => setNotify((n) => ({ ...n, open: false }))}
          sx={{
            width: "100%",
            maxWidth: 620,
            fontWeight: 600,
            fontFamily: "var(--font-poppins)",
            borderRadius: 2,
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            bgcolor: notify.type === "success" ? "#B8952D" : undefined,
          }}
        >
          {notify.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}

function SubmissionSuccessCard({
  registrationNumber,
  documentData,
  docId,
  onStartNew,
}: {
  registrationNumber: string;
  documentData: BusinessRegistrationDocument | null;
  docId: string;
  onStartNew: () => void;
}) {
  const primaryColor = "#D4AF37";
  const businessName =
    (documentData?.businessInformation as BusinessRegistrationFormData | undefined)
      ?.businessName || "Your Business";
  const email =
    (documentData?.businessInformation as BusinessRegistrationFormData | undefined)
      ?.emailAddress || "your registered email";

  return (
    <Box
      sx={{
        borderRadius: 3,
        border: "1px solid #E2E8F0",
        backgroundColor: "#FFFFFF",
        p: { xs: 3, md: 6 },
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -80,
          right: -80,
          width: 240,
          height: 240,
          borderRadius: "50%",
          bgcolor: "rgba(212, 175, 55, 0.10)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -60,
          left: -60,
          width: 180,
          height: 180,
          borderRadius: "50%",
          bgcolor: "rgba(212, 175, 55, 0.06)",
        }}
      />
      <Box sx={{ position: "relative", textAlign: "center" }}>
        <Box
          sx={{
            width: 84,
            height: 84,
            borderRadius: "50%",
            mx: "auto",
            mb: 3,
            bgcolor: "rgba(212, 175, 55, 0.18)",
            color: primaryColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 10px 28px ${primaryColor}30`,
          }}
        >
          <Box
            sx={{
              fontSize: 42,
              fontWeight: 900,
            }}
            component="span"
            aria-hidden
          >
            ✓
          </Box>
        </Box>
        <Box
          component="h1"
          sx={{
            m: 0,
            mb: 1,
            fontWeight: 800,
            fontFamily: "var(--font-poppins)",
            color: "#0F172A",
            fontSize: { xs: "1.6rem", md: "2.1rem" },
            lineHeight: 1.25,
          }}
        >
          Submission Successful
        </Box>
        <Box
          component="p"
          sx={{
            m: 0,
            mb: 3.5,
            color: "#475569",
            fontSize: "1rem",
            lineHeight: 1.7,
            fontFamily: "var(--font-inter)",
          }}
        >
          Thank you, <strong style={{ color: "#0F172A" }}>{businessName}</strong>. Your Business
          registration application has been submitted to the Anambra State Ministry of Commerce
          and will be reviewed shortly.
        </Box>

        <Box
          sx={{
            border: `1.5px solid ${primaryColor}`,
            borderRadius: 3,
            bgcolor: "#FDF8E8",
            p: { xs: 2.5, md: 3.5 },
            mb: 3.5,
            textAlign: "left",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 1.5,
              mb: 1.5,
              pb: 1.5,
              borderBottom: `1px dashed ${primaryColor}30`,
            }}
          >
            <Box
              sx={{
                fontSize: "0.78rem",
                textTransform: "uppercase",
                letterSpacing: 1.2,
                fontWeight: 800,
                color: primaryColor,
                fontFamily: "var(--font-poppins)",
              }}
            >
              Your Registration Reference
            </Box>
            <Box
              sx={{
                fontSize: "0.85rem",
                fontWeight: 700,
                color: "#8C6A16",
                fontFamily: "var(--font-poppins)",
              }}
            >
              Application ID: {docId.slice(0, 10)}…
            </Box>
          </Box>
          <Box
            sx={{
              fontSize: { xs: "1.4rem", md: "1.7rem" },
              fontWeight: 900,
              color: primaryColor,
              fontFamily: "var(--font-poppins)",
              letterSpacing: 0.3,
              wordBreak: "break-all",
            }}
          >
            {registrationNumber}
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 1.5,
            mb: 4,
            textAlign: "left",
          }}
        >
          <InfoBox label="Next Steps" value="An official will review your application and supporting documents. Please allow 7–14 business days." />
          <InfoBox label="Communication" value={`Updates will be sent to ${email}. Keep your phone number active for SMS notifications.`} />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 1.5,
            justifyContent: "center",
          }}
        >
          <Box
            component="button"
            type="button"
            onClick={onStartNew}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              border: "1px solid #CBD5E1",
              bgcolor: "white",
              color: "#475569",
              fontWeight: 700,
              fontFamily: "var(--font-poppins)",
              fontSize: "0.95rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "#F8FAFC",
                borderColor: "#94A3B8",
              },
            }}
          >
            Registerr Another Business
          </Box>
          <Box
            component="a"
            href="/"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              bgcolor: primaryColor,
              color: "white",
              fontWeight: 800,
              fontFamily: "var(--font-poppins)",
              fontSize: "0.95rem",
              cursor: "pointer",
              textDecoration: "none",
              boxShadow: `0 10px 24px ${primaryColor}35`,
              transition: "all 0.3s ease",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                bgcolor: "#B8952D",
                transform: "translateY(-1.5px)",
                boxShadow: `0 14px 28px ${primaryColor}45`,
              },
            }}
          >
            Return to Homepage
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  const primaryColor = "#D4AF37";
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2.25,
        border: "1px solid #E5E7EB",
        bgcolor: "#F8FAFC",
      }}
    >
      <Box
        sx={{
          fontFamily: "var(--font-poppins)",
          fontWeight: 800,
          fontSize: "0.76rem",
          color: primaryColor,
          letterSpacing: 0.4,
          textTransform: "uppercase",
          mb: 0.75,
        }}
      >
        {label}
      </Box>
      <Box
        sx={{
          color: "#0F172A",
          fontSize: "0.9rem",
          lineHeight: 1.6,
          fontWeight: 500,
        }}
      >
        {value}
      </Box>
    </Box>
  );
}
