"use client";
import { useMemo, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Paper,
  Divider,
  Checkbox,
  FormControlLabel,
  Link as MuiLink,
  Avatar,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  ArrowBack,
  Description,
  TaskAlt,
  Store,
  Person,
  FolderCopy,
  CheckCircle,
  CloudDone,
  WarningAmber,
  ExpandMore,
} from "@mui/icons-material";
import type {
  BusinessRegistrationDocument,
  BusinessRegistrationFormData,
  OwnerDirector,
  BusinessDocumentUpload,
} from "@/types";

const MotionCard = motion(Card);
const MotionBox = motion(Box);

interface ReviewSubmissionProps {
  documentData: BusinessRegistrationDocument;
  onBack: () => void;
  onSubmit: (submissionData: {
    declarationAgreed: boolean;
    termsAgreed: boolean;
    certificationAccuracy: boolean;
    submissionDate: string;
  }) => Promise<void> | void;
  submitting: boolean;
}

interface SummaryRow {
  label: string;
  value: React.ReactNode;
  status?: "success" | "warning";
}

function formatBytes(bytes: number): string {
  if (bytes == null) return "—";
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

function OwnerDirectorDetails({ person }: { person: OwnerDirector }) {
  const rows: { label: string; value: string }[] = [
    { label: "Full Name", value: person.fullName || "—" },
    { label: "Gender", value: person.gender || "—" },
    { label: "Date of Birth", value: person.dateOfBirth || "—" },
    { label: "Nationality", value: person.nationality || "—" },
    { label: "BVN", value: person.bvn || "Not provided" },
    { label: "NIN", value: person.nin || "—" },
    { label: "Means of ID", value: person.meansOfId || "—" },
    { label: "Residential Address", value: person.residentialAddress || "—" },
    { label: "Occupation", value: person.occupation || "—" },
    { label: "Email", value: person.email || "—" },
    { label: "Phone Number", value: person.phoneNumber || "—" },
  ];
  return (
    <Stack spacing={0}>
      {rows.map((row, idx) => (
        <Box key={row.label}>
          {idx > 0 && <Divider sx={{ opacity: 0.35 }} />}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 2,
              p: 1.6,
            }}
          >
            <Typography
              sx={{
                color: "#64748B",
                fontSize: "0.83rem",
                fontWeight: 500,
                width: "38%",
                flexShrink: 0,
              }}
            >
              {row.label}
            </Typography>
            <Typography
              sx={{
                color: "#0F172A",
                fontSize: "0.86rem",
                fontWeight: 600,
                textAlign: "right",
                wordBreak: "break-word",
              }}
            >
              {row.value}
            </Typography>
          </Box>
        </Box>
      ))}
    </Stack>
  );
}

export default function ReviewSubmission({
  documentData,
  onBack,
  onSubmit,
  submitting,
}: ReviewSubmissionProps) {
  const primaryColor = "#D4AF37";

  const [declaration, setDeclaration] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [certification, setCertification] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const businessInformation = useMemo<
    BusinessRegistrationFormData | Record<string, unknown>
  >(() => {
    return (
      documentData?.businessInformation ?? ({} as BusinessRegistrationFormData)
    );
  }, [documentData]);

  const owners = useMemo<OwnerDirector[]>(
    () => documentData?.owners ?? [],
    [documentData]
  );

  const documents = useMemo<BusinessDocumentUpload[]>(
    () => documentData?.documents ?? [],
    [documentData]
  );

  const allDocsOnCloudinary = useMemo(() => {
    return documents.length > 0 && documents.every((d) => !!d.cloudinary);
  }, [documents]);

  const totalCloudinary = useMemo(
    () => documents.filter((d) => !!d.cloudinary).length,
    [documents]
  );

  const businessSummary: SummaryRow[] = [
    { label: "Business Name", value: (businessInformation as any).businessName || "—" },
    { label: "Business Type", value: (businessInformation as any).businessType || "—" },
    { label: "Business Category", value: (businessInformation as any).businessCategory || "—" },
    { label: "Nature of Business", value: (businessInformation as any).natureOfBusiness || "—" },
    { label: "Date of Incorporation", value: (businessInformation as any).dateOfIncorporation || "—" },
    { label: "CAC Registration Number", value: (businessInformation as any).cacRegNumber || "Not provided" },
    { label: "Tax Identification (TIN)", value: (businessInformation as any).taxIdentificationNumber || "—" },
    { label: "Business Structure", value: (businessInformation as any).businessStructure || "—" },
    { label: "Business Address", value: (businessInformation as any).businessAddress || "—" },
    { label: "Local Government Area", value: (businessInformation as any).localGovernmentArea || "—" },
    { label: "Community / Town", value: (businessInformation as any).communityTown || "—" },
    { label: "State", value: (businessInformation as any).state || "—" },
    { label: "Postal Code", value: (businessInformation as any).postalCode || "—" },
    { label: "Email Address", value: (businessInformation as any).emailAddress || "—" },
    { label: "Phone Number", value: (businessInformation as any).phoneNumber || "—" },
    { label: "Alternative Phone", value: (businessInformation as any).alternativePhoneNumber || "Not provided" },
    { label: "Website", value: (businessInformation as any).website || "Not provided" },
    {
      label: "Business Description",
      value: (businessInformation as any).businessDescription || "—",
    },
  ];

  const canSubmit = declaration && termsAgreed && certification && !submitting;

  const handleSubmit = async () => {
    setErrorMsg("");
    if (!declaration) {
      setErrorMsg("You must agree to the declaration of accurate information before submitting.");
      return;
    }
    if (!termsAgreed) {
      setErrorMsg("You must agree to the terms and conditions before submitting.");
      return;
    }
    if (!certification) {
      setErrorMsg("You must certify the documents are genuine before submitting.");
      return;
    }
    if (owners.length === 0) {
      setErrorMsg("At least one owner/director must be provided before submitting.");
      return;
    }
    if (documents.length === 0) {
      setErrorMsg("At least one document must be uploaded before submitting.");
      return;
    }
    try {
      await onSubmit({
        declarationAgreed: declaration,
        termsAgreed,
        certificationAccuracy: certification,
        submissionDate: new Date().toISOString(),
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setErrorMsg(
        "Submission failed: " + (message.length > 300 ? message.slice(0, 300) + "…" : message)
      );
    }
  };

  const SectionCard = ({
    title,
    icon,
    rows,
    index,
    editOnClick,
    statusChip,
  }: {
    title: string;
    icon: React.ReactNode;
    rows: SummaryRow[];
    index: number;
    editOnClick?: () => void;
    statusChip?: React.ReactNode;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
    >
      <Paper
        sx={{
          borderRadius: 3,
          border: "1px solid #E2E8F0",
          overflow: "hidden",
          mb: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            p: 2.5,
            backgroundColor: `${primaryColor}08`,
            borderBottom: "1px solid #E2E8F0",
          }}
        >
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: "10px",
              backgroundColor: primaryColor,
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {icon}
          </Box>
          <Typography
            sx={{
              fontWeight: 700,
              fontFamily: "var(--font-poppins)",
              color: "#1E293B",
              fontSize: "1.02rem",
            }}
          >
            {title}
          </Typography>
          {statusChip}
          <Box sx={{ ml: "auto" }}>
            {editOnClick && (
              <Button
                size="small"
                variant="text"
                onClick={editOnClick}
                sx={{
                  color: primaryColor,
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                }}
              >
                Edit
              </Button>
            )}
          </Box>
        </Box>
        <Box sx={{ p: 0.75 }}>
          {rows.map((row, iIdx) => (
            <Box key={row.label}>
              {iIdx > 0 && <Divider sx={{ opacity: 0.4 }} />}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  p: 2,
                  gap: 2,
                }}
              >
                <Typography
                  sx={{
                    color: "#64748B",
                    fontSize: "0.88rem",
                    fontWeight: 500,
                    flexShrink: 0,
                    width: { xs: "40%", sm: "32%" },
                  }}
                >
                  {row.label}
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="flex-start"
                  sx={{ justifyContent: "flex-end", width: "68%" }}
                >
                  {row.status === "success" && (
                    <CheckCircle sx={{ color: primaryColor, fontSize: "1.05rem", mt: 0.3 }} />
                  )}
                  {row.status === "warning" && (
                    <WarningAmber sx={{ color: "#F59E0B", fontSize: "1.05rem", mt: 0.3 }} />
                  )}
                  <Typography
                    sx={{
                      color: "#1E293B",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      textAlign: "right",
                      minWidth: 0,
                      wordBreak: "break-word",
                    }}
                  >
                    {row.value}
                  </Typography>
                </Stack>
              </Box>
            </Box>
          ))}
        </Box>
      </Paper>
    </motion.div>
  );

  return (
    <MotionCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      sx={{
        borderRadius: 3,
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        border: "1px solid #F1F5F9",
        overflow: "visible",
      }}
    >
      <CardContent sx={{ p: { xs: 3, md: 5 } }}>
        <MotionBox
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          sx={{ mb: 4, pb: 3, borderBottom: "1px solid #F1F5F9" }}
        >
          <Stack direction="row" spacing={2} alignItems="center" mb={1}>
            <Box
              sx={{
                width: 54,
                height: 54,
                borderRadius: "16px",
                backgroundColor: `${primaryColor}12`,
                color: primaryColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Description sx={{ fontSize: "1.8rem" }} />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontFamily: "var(--font-poppins)",
                  color: primaryColor,
                  fontSize: "0.85rem",
                  letterSpacing: 0.5,
                  textTransform: "uppercase",
                  mb: 0.5,
                }}
              >
                Business Registration
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  fontFamily: "var(--font-poppins)",
                  color: "#1E293B",
                  fontSize: { xs: "1.3rem", md: "1.6rem" },
                }}
              >
                Review all information and submit your application.
              </Typography>
            </Box>
          </Stack>
        </MotionBox>

        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: 2.5,
                fontWeight: 500,
                fontFamily: "var(--font-poppins)",
                "& .MuiAlert-message": { fontSize: "0.9rem" },
              }}
            >
              {errorMsg}
            </Alert>
          </motion.div>
        )}

        <Stack mb={3}>
          <SectionCard
            title="Business Information"
            icon={<Store />}
            rows={businessSummary}
            index={0}
            editOnClick={onBack}
          />

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <Paper
              sx={{
                borderRadius: 3,
                border: "1px solid #E2E8F0",
                overflow: "hidden",
                mb: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  p: 2.5,
                  backgroundColor: `${primaryColor}08`,
                  borderBottom: "1px solid #E2E8F0",
                }}
              >
                <Box
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: "10px",
                    backgroundColor: primaryColor,
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Person />
                </Box>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontFamily: "var(--font-poppins)",
                    color: "#1E293B",
                    fontSize: "1.02rem",
                  }}
                >
                  Owner / Director Details ({owners.length})
                </Typography>
                <Box sx={{ ml: "auto" }}>
                  <Button
                    size="small"
                    variant="text"
                    onClick={onBack}
                    sx={{
                      color: primaryColor,
                      textTransform: "none",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                    }}
                  >
                    Edit
                  </Button>
                </Box>
              </Box>

              <Box sx={{ p: 2 }}>
                {owners.length === 0 ? (
                  <Typography
                    sx={{
                      color: "#B91C1C",
                      fontSize: "0.9rem",
                      textAlign: "center",
                      py: 3,
                      fontWeight: 600,
                    }}
                  >
                    No owners/directors added yet. Please go back and add at least one owner or director.
                  </Typography>
                ) : (
                  <Stack spacing={2}>
                    {owners.map((m, i) => (
                      <Accordion
                        key={m.id}
                        disableGutters
                        elevation={0}
                        sx={{
                          border: "1px solid #E5E7EB",
                          borderRadius: 2.25,
                          "&:not(:last-of-type)": { mb: 1.25 },
                          "&:last-of-type": { mb: 0 },
                          "&:before": { display: "none" },
                          overflow: "hidden",
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMore sx={{ color: primaryColor }} />}
                          sx={{
                            borderRadius: 2.25,
                            bgcolor: "#FBFBFA",
                            "&.Mui-expanded": {
                              bgcolor: `${primaryColor}08`,
                              borderBottom: "1px solid #F1E4B8",
                              minHeight: 56,
                            },
                            px: 2,
                            py: 1,
                          }}
                        >
                          <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            sx={{ width: "100%" }}
                          >
                            <Avatar
                              sx={{
                                width: 38,
                                height: 38,
                                bgcolor: primaryColor,
                                fontWeight: 800,
                                fontSize: "0.85rem",
                                boxShadow: `0 4px 12px ${primaryColor}30`,
                              }}
                            >
                              {m.fullName?.trim()
                                ? m.fullName
                                    .trim()
                                    .split(/\s+/)
                                    .map((n: string) => n[0])
                                    .join("")
                                    .slice(0, 2)
                                    .toUpperCase()
                                : (i + 1).toString()}
                            </Avatar>
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                              <Typography
                                sx={{
                                  fontWeight: 700,
                                  color: "#0F172A",
                                  fontSize: "0.9rem",
                                  fontFamily: "var(--font-poppins)",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {m.fullName || "Unnamed Person"}
                              </Typography>
                              <Stack direction="row" spacing={1} alignItems="center">
                                <Chip
                                  size="small"
                                  label={m.occupation || "Owner/Director"}
                                  sx={{
                                    fontWeight: 700,
                                    fontSize: "0.72rem",
                                    bgcolor: `${primaryColor}1A`,
                                    color: primaryColor,
                                    borderRadius: 1.25,
                                    height: 20,
                                    "& .MuiChip-label": { px: 1 },
                                  }}
                                />
                                <Typography
                                  sx={{
                                    color: "#64748B",
                                    fontSize: "0.76rem",
                                    fontWeight: 500,
                                  }}
                                >
                                  Person #{i + 1}
                                </Typography>
                              </Stack>
                            </Box>
                            <Box sx={{ textAlign: "right" }}>
                              <Typography
                                sx={{
                                  color: primaryColor,
                                  fontSize: "0.76rem",
                                  fontWeight: 700,
                                }}
                              >
                                Tap to expand
                              </Typography>
                            </Box>
                          </Stack>
                        </AccordionSummary>
                        <AccordionDetails
                          sx={{
                            bgcolor: "#FFFFFF",
                            p: 0,
                            pt: 0,
                          }}
                        >
                          <OwnerDirectorDetails person={m} />
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </Stack>
                )}
              </Box>
            </Paper>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <Paper
              sx={{
                borderRadius: 3,
                border: "1px solid #E2E8F0",
                overflow: "hidden",
                mb: 0,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  p: 2.5,
                  backgroundColor: `${primaryColor}08`,
                  borderBottom: "1px solid #E2E8F0",
                }}
              >
                <Box
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: "10px",
                    backgroundColor: primaryColor,
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <FolderCopy />
                </Box>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontFamily: "var(--font-poppins)",
                    color: "#1E293B",
                    fontSize: "1.02rem",
                  }}
                >
                  Documents Uploaded ({documents.length})
                </Typography>
                <Chip
                  size="small"
                  icon={
                    allDocsOnCloudinary ? (
                      <CloudDone sx={{ fontSize: 15 }} />
                    ) : (
                      <WarningAmber sx={{ fontSize: 15 }} />
                    )
                  }
                  label={`${totalCloudinary} on Cloudinary`}
                  sx={{
                    bgcolor: allDocsOnCloudinary
                      ? `${primaryColor}1A`
                      : "rgba(245, 158, 11, 0.12)",
                    color: allDocsOnCloudinary ? primaryColor : "#B45309",
                    fontWeight: 700,
                    fontSize: "0.72rem",
                    borderRadius: 10,
                    py: 0.3,
                    "& .MuiChip-icon": {
                      color: allDocsOnCloudinary ? primaryColor : "#D97706",
                    },
                  }}
                />
                <Box sx={{ ml: "auto" }}>
                  <Button
                    size="small"
                    variant="text"
                    onClick={onBack}
                    sx={{
                      color: primaryColor,
                      textTransform: "none",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                    }}
                  >
                    Edit
                  </Button>
                </Box>
              </Box>
              <Box sx={{ p: 1.5 }}>
                {documents.length === 0 ? (
                  <Typography
                    sx={{
                      color: "#B91C1C",
                      fontSize: "0.9rem",
                      textAlign: "center",
                      py: 3,
                      fontWeight: 600,
                    }}
                  >
                    No documents uploaded yet. Please go back to upload required documents.
                  </Typography>
                ) : (
                  <Stack spacing={1.5}>
                    {documents.map((doc) => {
                      const isOnCloudinary = !!doc.cloudinary;
                      const label =
                        doc.label || doc.name || doc.documentId || "Document";
                      const docSize =
                        doc.fileSizeBytes ?? doc.cloudinary?.bytes ?? undefined;
                      return (
                        <Box
                          key={doc.documentId || doc.name || label}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            p: 1.5,
                            bgcolor: "#FAFBFC",
                            border: "1px solid #E5E7EB",
                            borderRadius: 2.25,
                          }}
                        >
                          <Box
                            sx={{
                              width: 36,
                              height: 36,
                              borderRadius: 1.75,
                              bgcolor: isOnCloudinary
                                ? `${primaryColor}1A`
                                : "#FFF7E6",
                              color: isOnCloudinary ? primaryColor : "#B45309",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            <Description fontSize="small" />
                          </Box>
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography
                              sx={{
                                fontWeight: 700,
                                color: "#0F172A",
                                fontSize: "0.88rem",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {label}
                              {doc.required !== false && (
                                <Box
                                  component="span"
                                  sx={{ color: "#DC2626", ml: 0.5 }}
                                >
                                  {" "}
                                  *
                                </Box>
                              )}
                            </Typography>
                            <Stack
                              direction="row"
                              spacing={1.5}
                              alignItems="center"
                              flexWrap="wrap"
                            >
                              <Typography
                                sx={{
                                  color: "#64748B",
                                  fontSize: "0.78rem",
                                  fontWeight: 500,
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {doc.fileName || doc.cloudinary?.publicId?.split("/").pop() || "Uploaded file"}
                                {" • "}
                                {docSize != null ? formatBytes(docSize) : "—"}
                              </Typography>
                              {isOnCloudinary && (
                                <Chip
                                  size="small"
                                  icon={<CloudDone sx={{ fontSize: 12 }} />}
                                  label="Cloudinary"
                                  sx={{
                                    bgcolor: `${primaryColor}1A`,
                                    color: primaryColor,
                                    fontWeight: 700,
                                    fontSize: "0.68rem",
                                    borderRadius: 1.1,
                                    height: 18,
                                    "& .MuiChip-label": { px: 0.75 },
                                    "& .MuiChip-icon": {
                                      fontSize: "0.7rem",
                                      color: primaryColor,
                                    },
                                  }}
                                />
                              )}
                            </Stack>
                          </Box>
                          {(doc.fileUrl || doc.cloudinary?.secureUrl) && (
                            <MuiLink
                              href={doc.cloudinary?.secureUrl || doc.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              underline="none"
                              sx={{
                                color: primaryColor,
                                fontSize: "0.78rem",
                                fontWeight: 700,
                                "&:hover": { textDecoration: "underline" },
                                flexShrink: 0,
                              }}
                            >
                              View →
                            </MuiLink>
                          )}
                        </Box>
                      );
                    })}
                  </Stack>
                )}
              </Box>
            </Paper>
          </motion.div>
        </Stack>

        <Stack spacing={2} sx={{ my: 4 }}>
          <Paper
            sx={{
              p: 2.75,
              borderRadius: 3,
              backgroundColor: "#FDF8E8",
              border: `1px solid ${primaryColor}40`,
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={declaration}
                  onChange={(e) => setDeclaration(e.target.checked)}
                  sx={{
                    color: primaryColor,
                    "&.Mui-checked": { color: primaryColor },
                    "& .MuiSvgIcon-root": { fontSize: "1.35rem" },
                  }}
                />
              }
              label={
                <Typography sx={{ fontSize: "0.88rem", color: "#334155", lineHeight: 1.7 }}>
                  <strong style={{ color: "#1E293B" }}>Declaration of Accurate Information:</strong>{" "}
                  I hereby declare that all information provided in this application is true,
                  accurate and complete to the best of my knowledge. I understand that any
                  false information may result in the rejection or cancellation of this
                  registration and may attract legal penalties.
                </Typography>
              }
              sx={{ alignItems: "flex-start", "& .MuiFormControlLabel-label": { pt: 0.25 } }}
            />
          </Paper>

          <Paper
            sx={{
              p: 2.75,
              borderRadius: 3,
              backgroundColor: "#F8FAFC",
              border: "1px solid #E2E8F0",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={termsAgreed}
                  onChange={(e) => setTermsAgreed(e.target.checked)}
                  sx={{
                    color: primaryColor,
                    "&.Mui-checked": { color: primaryColor },
                    "& .MuiSvgIcon-root": { fontSize: "1.35rem" },
                  }}
                />
              }
              label={
                <Typography sx={{ fontSize: "0.88rem", color: "#334155", lineHeight: 1.7 }}>
                  <strong style={{ color: "#1E293B" }}>Terms &amp; Conditions:</strong> I agree to
                  the terms and conditions of the Anambra State Ministry of Commerce governing
                  business registration, including data privacy, processing fees (where
                  applicable), and compliance with applicable state and federal laws.
                </Typography>
              }
              sx={{ alignItems: "flex-start", "& .MuiFormControlLabel-label": { pt: 0.25 } }}
            />
          </Paper>

          <Paper
            sx={{
              p: 2.75,
              borderRadius: 3,
              backgroundColor: "#F8FAFC",
              border: "1px solid #E2E8F0",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={certification}
                  onChange={(e) => setCertification(e.target.checked)}
                  sx={{
                    color: primaryColor,
                    "&.Mui-checked": { color: primaryColor },
                    "& .MuiSvgIcon-root": { fontSize: "1.35rem" },
                  }}
                />
              }
              label={
                <Typography sx={{ fontSize: "0.88rem", color: "#334155", lineHeight: 1.7 }}>
                  <strong style={{ color: "#1E293B" }}>Certification of Documents:</strong> I
                  certify that all documents uploaded with this application are genuine,
                  unaltered copies of the original documents and belong to the business or
                  owner(s) listed in this application.
                </Typography>
              }
              sx={{ alignItems: "flex-start", "& .MuiFormControlLabel-label": { pt: 0.25 } }}
            />
          </Paper>
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          spacing={2}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ order: { xs: 2, sm: 1 } }}
          >
            <Button
              onClick={onBack}
              variant="outlined"
              startIcon={<ArrowBack />}
              disabled={submitting}
              sx={{
                borderColor: "#CBD5E1",
                color: "#475569",
                px: 4,
                py: 1.6,
                fontWeight: 600,
                borderRadius: 2,
                textTransform: "none",
                "&:hover": {
                  borderColor: "#94A3B8",
                  backgroundColor: "#F8FAFC",
                },
              }}
            >
              Previous
            </Button>
          </Stack>
          <Button
            onClick={handleSubmit}
            variant="contained"
            startIcon={
              submitting ? (
                <CircularProgress size={18} sx={{ color: "white" }} />
              ) : (
                <TaskAlt />
              )
            }
            disabled={!canSubmit}
            sx={{
              backgroundColor: canSubmit ? primaryColor : "#CBD5E1",
              px: 5,
              py: 1.6,
              fontWeight: 700,
              fontSize: "0.95rem",
              borderRadius: 2,
              fontFamily: "var(--font-poppins)",
              boxShadow: canSubmit ? `0 6px 20px ${primaryColor}40` : "none",
              "&:hover": {
                backgroundColor: canSubmit ? "#B8952D" : "#CBD5E1",
                transform: canSubmit ? "translateY(-2px)" : "none",
                boxShadow: canSubmit ? `0 8px 24px ${primaryColor}50` : "none",
              },
              transition: "all 0.3s ease",
              textTransform: "none",
              order: { xs: 1, sm: 2 },
            }}
          >
            {submitting ? "Submitting…" : "Submit Registration"}
          </Button>
        </Stack>
      </CardContent>
    </MotionCard>
  );
}
