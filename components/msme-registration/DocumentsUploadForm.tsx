"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  UploadFile as UploadFileIcon,
  Description as DescriptionIcon,
  PictureAsPdf as PictureAsPdfIcon,
  Image as ImageIcon,
  TableChart as TableChartIcon,
  FolderZip as FolderZipIcon,
  InsertDriveFile as InsertDriveFileIcon,
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Save as SaveIcon,
  CloudUpload as CloudUploadIcon,
  CloudDone as CloudDoneIcon,
  WarningAmber as WarningAmberIcon,
} from "@mui/icons-material";
import type { MSMEDocumentUpload } from "@/types";
import {
  uploadToCloudinary,
  cloudinaryConfig,
  uploadToCloudinarySigned,
  isPresetNotFoundError,
  type CloudinaryUploadResult,
} from "@/cloudinary/client";

const STORAGE_KEY = "msme_registration_step3_draft";

interface RequiredMSMEDocument {
  id: string;
  label: string;
  description: string;
  required: boolean;
  acceptedFormats: string[];
  maxSizeMB: number;
  placeholderExample: string;
  category: "Legal" | "Identity" | "Financial" | "Profile";
}

const MSME_DOCUMENTS: RequiredMSMEDocument[] = [
  {
    id: "cac_certificate",
    label: "CAC Certificate",
    description:
      "Corporate Affairs Commission registration certificate. Upload if your business is registered with CAC.",
    required: false,
    acceptedFormats: [".pdf", ".jpg", ".jpeg", ".png"],
    maxSizeMB: 10,
    placeholderExample: "e.g. CAC_Registration_Certificate.pdf",
    category: "Legal",
  },
  {
    id: "means_of_identification",
    label: "Means of Identification",
    description:
      "Valid government-issued ID card (NIN slip, International Passport, Driver's License, PVC, or Voter's Card).",
    required: true,
    acceptedFormats: [".pdf", ".jpg", ".jpeg", ".png"],
    maxSizeMB: 10,
    placeholderExample: "e.g. NIN_ID_Card_Front.jpg",
    category: "Identity",
  },
  {
    id: "proof_of_address",
    label: "Proof of Address",
    description:
      "Utility bill (electricity, water, waste), tenancy agreement, or any official document showing your business/residential address. Must not be older than 3 months.",
    required: true,
    acceptedFormats: [".pdf", ".jpg", ".jpeg", ".png"],
    maxSizeMB: 10,
    placeholderExample: "e.g. Electricity_Bill_July2025.pdf",
    category: "Identity",
  },
  {
    id: "business_profile",
    label: "Business Profile",
    description:
      "Document outlining your business activities, products/services, target market, operational history, and objectives. Upload a PDF/DOCX OR you may provide a written profile separately.",
    required: true,
    acceptedFormats: [".pdf", ".doc", ".docx", ".txt", ".jpg", ".jpeg", ".png"],
    maxSizeMB: 15,
    placeholderExample: "e.g. Business_Profile.pdf",
    category: "Profile",
  },
  {
    id: "passport_photograph",
    label: "Passport Photograph",
    description:
      "Recent passport photograph of the owner/authorized signatory. Clear headshot, plain background, JPEG or PNG format preferred.",
    required: true,
    acceptedFormats: [".jpg", ".jpeg", ".png"],
    maxSizeMB: 5,
    placeholderExample: "e.g. Passport_Photo.jpg",
    category: "Identity",
  },
];

interface DocumentsUploadFormProps {
  initialDocuments?: MSMEDocumentUpload[];
  temporaryFolderId?: string;
  onSaveAndContinue: (docs: MSMEDocumentUpload[]) => void;
  onBack: () => void;
  saving: boolean;
}

function categoryColor(category: RequiredMSMEDocument["category"]) {
  switch (category) {
    case "Legal":
      return { bg: "rgba(14, 116, 144, 0.1)", color: "#0E7490" };
    case "Identity":
      return { bg: "rgba(212, 175, 55, 0.12)", color: "#D4AF37" };
    case "Financial":
      return { bg: "rgba(124, 58, 237, 0.12)", color: "#6D28D9" };
    case "Profile":
      return { bg: "rgba(212, 175, 55, 0.15)", color: "#8C6A16" };
    default:
      return { bg: "#F1F5F9", color: "#0F172A" };
  }
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function fileIconByType(fileName: string) {
  const lc = (fileName || "").toLowerCase();
  if (lc.endsWith(".pdf")) return <PictureAsPdfIcon sx={{ color: "#DC2626" }} />;
  if (/\.(png|jpe?g|webp|gif)$/.test(lc))
    return <ImageIcon sx={{ color: "#0284C7" }} />;
  if (/\.(xlsx?|csv|numbers)$/.test(lc))
    return <TableChartIcon sx={{ color: "#15803D" }} />;
  if (/\.(zip|rar|7z)$/.test(lc))
    return <FolderZipIcon sx={{ color: "#C2410C" }} />;
  if (/\.(docx?|txt|rtf)$/.test(lc))
    return <DescriptionIcon sx={{ color: "#1D4ED8" }} />;
  return <InsertDriveFileIcon sx={{ color: "#475569" }} />;
}

export default function DocumentsUploadForm({
  initialDocuments,
  temporaryFolderId,
  onSaveAndContinue,
  onBack,
  saving,
}: DocumentsUploadFormProps) {
  const primaryColor = "#D4AF37";
  const accentColor = "#D4AF37";
  const seeds = useMemo(() => [...MSME_DOCUMENTS], []);
  const [documents, setDocuments] = useState<Record<string, MSMEDocumentUpload>>(
    () => {
      const acc: Record<string, MSMEDocumentUpload> = {};
      (initialDocuments ?? []).forEach((d) => {
        if (d && d.documentId) acc[d.documentId] = d;
      });
      try {
        const saved =
          typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
        if (saved) {
          const parsed = JSON.parse(saved);
          Object.entries(parsed).forEach(([k, v]) => {
            if (v && !acc[k]) acc[k] = v as MSMEDocumentUpload;
          });
        }
      } catch {
        // ignore
      }
      return acc;
    }
  );
  const [uploading, setUploading] = useState<Record<string, number | boolean>>(
    {}
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState<string>("");
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    if (!initialDocuments || initialDocuments.length === 0) return;
    const acc: Record<string, MSMEDocumentUpload> = {};
    initialDocuments.forEach((d) => {
      if (d && d.documentId) acc[d.documentId] = d;
    });
    setDocuments(acc);
  }, [initialDocuments]);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
      }
    } catch {
      // ignore
    }
  }, [documents]);

  const progressSummary = useMemo(() => {
    const total = seeds.filter((s) => s.required).length;
    const done = seeds.filter(
      (s) => s.required && documents[s.id] && documents[s.id].fileUrl
    ).length;
    const optionalTotal = seeds.filter((s) => !s.required).length;
    const optionalDone = seeds.filter(
      (s) => !s.required && documents[s.id] && documents[s.id].fileUrl
    ).length;
    const percent = total === 0 ? 0 : Math.round((done / total) * 100);
    return { total, done, optionalTotal, optionalDone, percent };
  }, [seeds, documents]);

  const folderPrefix = useMemo(() => {
    const base = "msme_registrations";
    if (temporaryFolderId) return `${base}/${temporaryFolderId}`;
    const stored =
      typeof window !== "undefined"
        ? window.sessionStorage.getItem("msmeRegDocId")
        : null;
    if (stored) return `${base}/${stored}`;
    return `${base}/drafts`;
  }, [temporaryFolderId]);

  const buildMSMEDocument = (
    docId: string,
    file: File,
    seed: RequiredMSMEDocument,
    data: CloudinaryUploadResult
  ): MSMEDocumentUpload => ({
    documentId: docId,
    name: seed.label,
    label: seed.label,
    fileName: file.name,
    fileUrl: data.secure_url,
    fileSizeBytes: data.bytes ?? file.size,
    mimeType: file.type || data.format || "application/octet-stream",
    uploadedAt: data.created_at || new Date().toISOString(),
    uploadedBy: "applicant",
    required: seed.required,
    cloudinary: {
      publicId: data.public_id,
      secureUrl: data.secure_url,
      format: data.format || "",
      resourceType: data.resource_type || "raw",
      bytes: data.bytes ?? file.size,
      folder: data.folder,
    },
  });

  const uploadWithProgress = (
    docId: string,
    file: File,
    seed: RequiredMSMEDocument
  ): Promise<MSMEDocumentUpload> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const formData = new FormData();
      formData.append("upload_preset", cloudinaryConfig.uploadPreset);
      formData.append("folder", `${folderPrefix}/${seed.category}`);
      formData.append(
        "tags",
        `msme,document,${seed.category},${seed.id}`
      );
      formData.append(
        "context",
        `document=${seed.label}|category=${seed.category}|original_filename=${file.name}`
      );
      formData.append("file", file);

      const isImage = file.type.startsWith("image");
      const isVideo = file.type.startsWith("video");
      const uploadUrl = isVideo
        ? cloudinaryConfig.videoUploadUrl
        : isImage
          ? cloudinaryConfig.imageUploadUrl
          : cloudinaryConfig.rawUploadUrl;

      xhr.open("POST", uploadUrl);

      xhr.upload.onprogress = (evt) => {
        if (evt.lengthComputable) {
          const percent = Math.round((evt.loaded / evt.total) * 100);
          setUploading((u) => ({ ...u, [docId]: percent }));
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data = JSON.parse(xhr.responseText) as CloudinaryUploadResult;
            resolve(buildMSMEDocument(docId, file, seed, data));
          } catch (parseErr: unknown) {
            reject(
              new Error(
                "Upload response parse failed: " +
                  (parseErr instanceof Error ? parseErr.message : String(parseErr))
              )
            );
          }
        } else {
          let msg = `Upload failed (${xhr.status})`;
          try {
            const data = JSON.parse(xhr.responseText);
            if (data?.error?.message) msg = data.error.message;
          } catch {
            /* ignore parse */
          }
          const fullMsg = `Cloudinary upload failed: ${xhr.status} ${msg}`;
          reject(new Error(fullMsg));
        }
      };

      xhr.onerror = () => reject(new Error("Network error during upload"));
      xhr.onabort = () => reject(new Error("Upload aborted"));

      try {
        xhr.send(formData);
      } catch (sendErr: unknown) {
        reject(
          new Error(
            "Unable to start upload: " +
              (sendErr instanceof Error ? sendErr.message : String(sendErr))
          )
        );
      }
    });
  };

  const applyDocumentResult = (
    docId: string,
    meta: MSMEDocumentUpload,
    err?: unknown
  ): boolean => {
    if (meta) {
      setDocuments((d) => ({ ...d, [docId]: meta }));
      setUploading((u) => ({ ...u, [docId]: false }));
      return true;
    }
    const message = err instanceof Error ? err.message : String(err || "Unknown error");
    setErrors((e) => ({
      ...e,
      [docId]:
        "Cloudinary upload failed: " +
        (message.length > 220 ? message.slice(0, 220) + "…" : message),
    }));
    setUploading((u) => ({ ...u, [docId]: false }));
    return false;
  };

  const uploadFile = async (
    docId: string,
    file: File,
    seed: RequiredMSMEDocument
  ): Promise<{ ok: boolean; shouldTrySigned: boolean }> => {
    try {
      setUploading((u) => ({ ...u, [docId]: 0 }));
      const meta = await uploadWithProgress(docId, file, seed);
      setDocuments((d) => ({ ...d, [docId]: meta }));
      setUploading((u) => ({ ...u, [docId]: false }));
      return { ok: true, shouldTrySigned: false };
    } catch (err: unknown) {
      setUploading((u) => ({ ...u, [docId]: false }));
      const shouldTrySigned = isPresetNotFoundError(err);
      if (!shouldTrySigned) {
        const message = err instanceof Error ? err.message : String(err);
        setErrors((e) => ({
          ...e,
          [docId]:
            "Cloudinary upload failed: " +
            (message.length > 220 ? message.slice(0, 220) + "…" : message),
        }));
      }
      return { ok: false, shouldTrySigned };
    }
  };

  const fallbackUpload = async (
    docId: string,
    file: File,
    seed: RequiredMSMEDocument
  ): Promise<{ ok: boolean; shouldTrySigned: boolean }> => {
    try {
      setUploading((u) => ({ ...u, [docId]: 10 }));
      const result = await uploadToCloudinary(file, {
        folder: `${folderPrefix}/${seed.category}`,
        tags: ["msme", "document", seed.category, seed.id],
        context: {
          document: seed.label,
          category: seed.category,
          original_filename: file.name,
        },
      });
      setUploading((u) => ({ ...u, [docId]: 100 }));
      const meta = buildMSMEDocument(docId, file, seed, result);
      setDocuments((d) => ({ ...d, [docId]: meta }));
      setUploading((u) => ({ ...u, [docId]: false }));
      return { ok: true, shouldTrySigned: false };
    } catch (err: unknown) {
      setUploading((u) => ({ ...u, [docId]: false }));
      const shouldTrySigned = isPresetNotFoundError(err);
      if (!shouldTrySigned) {
        const message = err instanceof Error ? err.message : String(err);
        setErrors((e) => ({
          ...e,
          [docId]:
            "Cloudinary upload failed: " +
            (message.length > 220 ? message.slice(0, 220) + "…" : message),
        }));
      }
      return { ok: false, shouldTrySigned };
    }
  };

  const signedFallbackUpload = async (
    docId: string,
    file: File,
    seed: RequiredMSMEDocument
  ): Promise<boolean> => {
    try {
      setUploading((u) => ({ ...u, [docId]: 5 }));
      const resourceType = file.type.startsWith("video")
        ? "video"
        : file.type.startsWith("image")
          ? "image"
          : "raw";
      const result = await uploadToCloudinarySigned(file, {
        folder: `${folderPrefix}/${seed.category}`,
        tags: ["msme", "document", seed.category, seed.id],
        context: {
          document: seed.label,
          category: seed.category,
          original_filename: file.name,
        },
        resourceType,
        onProgress: (pct) =>
          setUploading((u) => ({
            ...u,
            [docId]: Math.max(10, Math.min(100, pct)),
          })),
      });
      const meta = buildMSMEDocument(docId, file, seed, result);
      return applyDocumentResult(docId, meta);
    } catch (err: unknown) {
      return applyDocumentResult(docId, null as never, err);
    }
  };

  const handleFile = async (seed: RequiredMSMEDocument, file: File | null) => {
    if (!file) return;
    setErrors((e) => ({ ...e, [seed.id]: "" }));
    setGlobalError("");

    const lowerName = file.name.toLowerCase();
    const extOk = seed.acceptedFormats.some((ext) =>
      lowerName.endsWith(ext.toLowerCase())
    );
    if (!extOk) {
      setErrors((e) => ({
        ...e,
        [seed.id]: `Unsupported file format. Accepted: ${seed.acceptedFormats.join(
          ", "
        )}.`,
      }));
      return;
    }
    const maxBytes = seed.maxSizeMB * 1024 * 1024;
    if (file.size > maxBytes) {
      setErrors((e) => ({
        ...e,
        [seed.id]: `File is too large (${formatSize(
          file.size
        )}). Maximum size is ${seed.maxSizeMB} MB.`,
      }));
      return;
    }

    let done = false;
    let shouldTrySigned = false;

    const r1 = await uploadFile(seed.id, file, seed);
    if (r1.ok) {
      done = true;
    } else {
      shouldTrySigned = shouldTrySigned || r1.shouldTrySigned;
      const r2 = await fallbackUpload(seed.id, file, seed);
      if (r2.ok) {
        done = true;
      } else {
        shouldTrySigned = shouldTrySigned || r2.shouldTrySigned;
      }
    }

    if (!done && shouldTrySigned) {
      await signedFallbackUpload(seed.id, file, seed);
    }
  };

  const handleRemove = (docId: string) => {
    setDocuments((d) => {
      const next = { ...d };
      delete next[docId];
      return next;
    });
    if (fileInputRefs.current[docId]) {
      fileInputRefs.current[docId]!.value = "";
    }
  };

  const handleValidateAndContinue = async () => {
    const anyUploading = Object.values(uploading).some((v) => v !== false && v !== undefined);
    if (anyUploading) {
      setGlobalError("Please wait until all documents have finished uploading to Cloudinary.");
      return;
    }
    const errs: Record<string, string> = {};
    for (const seed of seeds) {
      if (seed.required && !documents[seed.id]?.fileUrl) {
        errs[seed.id] = "This document is required.";
      }
    }
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      setTimeout(() => {
        const first = Object.keys(errs)[0];
        const el = document.querySelector<HTMLElement>(`[data-doc-id="${first}"]`);
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
      return;
    }
    setGlobalError("");
    const docs = Object.values(documents).filter(Boolean);
    onSaveAndContinue(docs);
  };

  const totalCloudinaryDocs = Object.values(documents).filter((d) => d?.cloudinary).length;

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid #E5E7EB",
        backgroundColor: "#FFFFFF",
        p: { xs: 2.5, md: 4.5 },
      }}
    >
      <Stack direction="row" spacing={2} alignItems="flex-start" justifyContent="space-between">
        <Box>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "1.5rem", md: "1.85rem" },
              fontWeight: 800,
              fontFamily: "var(--font-poppins)",
              color: "#0F172A",
              mb: 0.5,
            }}
          >
            Documents Upload
          </Typography>
          <Typography
            sx={{
              color: "#475569",
              fontSize: "0.98rem",
              lineHeight: 1.7,
              fontFamily: "var(--font-poppins)",
            }}
          >
            Upload all required supporting documents below. Files are securely uploaded
            directly to Cloudinary. {progressSummary.done}/{progressSummary.total} required
            documents uploaded ({progressSummary.percent}% complete).
            {totalCloudinaryDocs > 0 && (
              <Chip
                size="small"
                icon={<CloudDoneIcon />}
                label={`${totalCloudinaryDocs} on Cloudinary`}
                sx={{
                  ml: 1,
                  bgcolor: "rgba(212, 175, 55, 0.1)",
                  color: primaryColor,
                  fontWeight: 700,
                  borderRadius: 10,
                  "& .MuiChip-icon": { color: primaryColor },
                }}
              />
            )}
          </Typography>
        </Box>
        <Chip
          color="warning"
          icon={<CheckCircleIcon />}
          label={`${progressSummary.percent}%`}
          sx={{
            fontWeight: 700,
            fontSize: "0.85rem",
            bgcolor: "rgba(212, 175, 55, 0.12)",
            color: "#8C6A16",
            "& .MuiChip-icon": { color: accentColor },
            borderRadius: 10,
            px: 1,
          }}
        />
      </Stack>

      <Box sx={{ mt: 2, mb: 4 }}>
        <LinearProgress
          variant="determinate"
          value={progressSummary.percent}
          sx={{
            borderRadius: 20,
            height: 8,
            bgcolor: "#F1F5F9",
            "& .MuiLinearProgress-bar": {
              borderRadius: 20,
              background: `linear-gradient(90deg,${primaryColor},${accentColor})`,
            },
          }}
        />
        <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
          <Typography sx={{ color: "#64748B", fontSize: "0.8rem", fontWeight: 500 }}>
            Required: {progressSummary.done}/{progressSummary.total}
          </Typography>
          <Typography sx={{ color: "#64748B", fontSize: "0.8rem", fontWeight: 500 }}>
            Optional: {progressSummary.optionalDone}/{progressSummary.optionalTotal}
          </Typography>
        </Stack>
      </Box>

      {globalError && (
        <Alert
          severity="warning"
          icon={<WarningAmberIcon />}
          sx={{
            mb: 3,
            borderRadius: 2.5,
            bgcolor: "rgba(212, 175, 55, 0.06)",
            border: "1px solid #F6DF8A",
            color: "#8a6e14",
            fontWeight: 600,
            fontSize: "0.88rem",
            fontFamily: "var(--font-poppins)",
          }}
        >
          {globalError}
        </Alert>
      )}

      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 600,
          fontFamily: "var(--font-poppins)",
          color: primaryColor,
          mb: 3,
          fontSize: "0.95rem",
          textTransform: "uppercase",
          letterSpacing: 0.5,
        }}
      >
        Documents Upload
      </Typography>

      <Stack spacing={2.5}>
        {seeds.map((seed) => {
          const saved = documents[seed.id];
          const err = errors[seed.id];
          const up = uploading[seed.id];
          const isUploading = typeof up === "number" || up === true;
          const pct = typeof up === "number" ? up : undefined;
          const cat = categoryColor(seed.category);
          const onCloudinary = !!saved?.cloudinary;

          return (
            <Box
              key={seed.id}
              data-doc-id={seed.id}
              sx={{
                border: `1.5px solid ${err ? "#FECACA" : saved ? `rgba(212,175,55,0.45)` : "#E2E8F0"}`,
                borderRadius: 3,
                background: saved ? "#FBF7EA" : "#FFFFFF",
                p: { xs: 2, md: 2.75 },
                transition: "box-shadow 0.2s ease, transform 0.2s ease",
                "&:hover": {
                  boxShadow: "0 8px 24px rgba(2,6,23,0.06)",
                  transform: "translateY(-1px)",
                },
              }}
            >
              <Stack
                direction="row"
                spacing={2}
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Stack direction="row" spacing={1.25} alignItems="center" mb={0.75} flexWrap="wrap">
                    <Typography
                      sx={{
                        fontWeight: 800,
                        color: "#0F172A",
                        fontSize: "1rem",
                        fontFamily: "var(--font-poppins)",
                      }}
                    >
                      {seed.label}
                      {seed.required && (
                        <Box
                          component="span"
                          sx={{ color: "#DC2626", ml: 0.25, fontWeight: 800 }}
                        >
                          *
                        </Box>
                      )}
                      {!seed.required && (
                        <Typography
                          component="span"
                          sx={{
                            fontSize: "0.75rem",
                            color: "#64748B",
                            ml: 0.75,
                            fontWeight: 500,
                            fontStyle: "italic",
                          }}
                        >
                          (If registered)
                        </Typography>
                      )}
                    </Typography>
                    <Chip
                      size="small"
                      label={seed.category}
                      sx={{
                        bgcolor: cat.bg,
                        color: cat.color,
                        fontWeight: 700,
                        fontSize: "0.72rem",
                        borderRadius: 10,
                        py: 0.4,
                      }}
                    />
                    {saved && !err && !isUploading && (
                      <Chip
                        size="small"
                        icon={onCloudinary ? <CloudDoneIcon sx={{ fontSize: 15 }} /> : <CheckCircleIcon sx={{ fontSize: 15 }} />}
                        label={onCloudinary ? "Uploaded to Cloudinary" : "Uploaded"}
                        sx={{
                          bgcolor: onCloudinary ? "rgba(212, 175, 55, 0.12)" : "rgba(212, 175, 55, 0.12)",
                          color: onCloudinary ? primaryColor : "#D4AF37",
                          fontWeight: 700,
                          fontSize: "0.72rem",
                          borderRadius: 10,
                          py: 0.4,
                          "& .MuiChip-icon": { color: onCloudinary ? primaryColor : "#D4AF37" },
                        }}
                      />
                    )}
                  </Stack>
                  <Typography
                    sx={{
                      color: "#475569",
                      fontSize: "0.88rem",
                      lineHeight: 1.6,
                      fontFamily: "var(--font-poppins)",
                      mb: 0.75,
                    }}
                  >
                    {seed.description}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#64748B",
                      fontSize: "0.78rem",
                      fontWeight: 500,
                      fontFamily: "var(--font-poppins)",
                    }}
                  >
                    Accepts: {seed.acceptedFormats.join(", ")} • Max {seed.maxSizeMB}MB •{" "}
                    <Box component="span" sx={{ fontStyle: "italic" }}>
                      {seed.placeholderExample}
                    </Box>
                  </Typography>

                  {saved && (
                    <Box
                      sx={{
                        mt: 2,
                        border: "1px solid #E5E7EB",
                        borderRadius: 2.25,
                        bgcolor: "#F8FAFC",
                        p: 1.75,
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                      }}
                    >
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: 2,
                          bgcolor: "#FFFFFF",
                          border: "1px solid #E2E8F0",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {fileIconByType(saved.fileName || "")}
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                          sx={{
                            color: "#0F172A",
                            fontSize: "0.9rem",
                            fontWeight: 700,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {saved.fileName}
                        </Typography>
                        <Typography
                          sx={{ color: "#64748B", fontSize: "0.78rem", fontWeight: 500 }}
                        >
                          {formatSize(saved.fileSizeBytes ?? 0)} • uploaded{" "}
                          {saved.uploadedAt ? new Date(saved.uploadedAt).toLocaleString() : ""}
                          {saved.cloudinary?.folder && (
                            <> • Folder: {saved.cloudinary.folder}</>
                          )}
                        </Typography>
                        {saved.fileUrl && saved.fileUrl.startsWith("http") && (
                          <Box
                            component="a"
                            href={saved.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              color: accentColor,
                              fontSize: "0.78rem",
                              fontWeight: 700,
                              textDecoration: "none",
                              "&:hover": { textDecoration: "underline" },
                            }}
                          >
                            {onCloudinary ? "Open on Cloudinary →" : "Preview file →"}
                          </Box>
                        )}
                      </Box>
                      <IconButton
                        onClick={() => handleRemove(seed.id)}
                        size="small"
                        sx={{ color: "#94A3B8", "&:hover": { color: "#DC2626" } }}
                        aria-label={`Remove ${seed.label}`}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  )}

                  {isUploading && pct !== undefined && (
                    <Box sx={{ mt: 1.5 }}>
                      <LinearProgress
                        variant="determinate"
                        value={pct}
                        sx={{
                          borderRadius: 20,
                          height: 6,
                          bgcolor: "#F1F5F9",
                          "& .MuiLinearProgress-bar": {
                            borderRadius: 20,
                            bgcolor: primaryColor,
                          },
                        }}
                      />
                      <Typography
                        sx={{
                          mt: 0.5,
                          color: primaryColor,
                          fontSize: "0.76rem",
                          fontWeight: 600,
                        }}
                      >
                        Uploading to Cloudinary… {pct}%
                      </Typography>
                    </Box>
                  )}

                  {err && (
                    <Alert
                      severity="error"
                      sx={{
                        mt: 1.5,
                        borderRadius: 2,
                        bgcolor: "rgba(220, 38, 38, 0.05)",
                        border: "1px solid #FECACA",
                        color: "#991B1B",
                        fontWeight: 500,
                        fontSize: "0.82rem",
                      }}
                    >
                      {err}
                    </Alert>
                  )}
                </Box>

                <Box sx={{ flexShrink: 0, ml: { xs: 0, md: 2 }, mt: { xs: 2, md: 0 } }}>
                  <input
                    ref={(el) => { fileInputRefs.current[seed.id] = el; }}
                    type="file"
                    accept={seed.acceptedFormats.join(",")}
                    id={`msme-doc-file-${seed.id}`}
                    hidden
                    onChange={(e) =>
                      handleFile(seed, e.target.files ? e.target.files[0] : null)
                    }
                  />
                  <Button
                    component="label"
                    htmlFor={`msme-doc-file-${seed.id}`}
                    disabled={isUploading || saving}
                    variant={saved ? "outlined" : "contained"}
                    size="large"
                    startIcon={isUploading ? <CloudUploadIcon /> : <UploadFileIcon />}
                    sx={{
                      minWidth: 140,
                      bgcolor: saved ? "transparent" : primaryColor,
                      color: saved ? primaryColor : "#FFFFFF",
                      borderColor: saved ? primaryColor : "transparent",
                      borderRadius: 2,
                      textTransform: "none",
                      fontFamily: "var(--font-poppins)",
                      fontWeight: 700,
                      px: 2.25,
                      py: 1,
                      boxShadow: saved ? "none" : `0 10px 24px ${primaryColor}40`,
                      "&:hover": {
                        bgcolor: saved ? `${primaryColor}08` : "#095A31",
                        borderColor: "#095A31",
                      },
                      "&:disabled": { bgcolor: "#F1F5F9", color: "#94A3B8" },
                    }}
                  >
                    {isUploading
                      ? "Uploading…"
                      : saved
                        ? "Replace File"
                        : "Upload to Cloudinary"}
                  </Button>
                </Box>
              </Stack>
            </Box>
          );
        })}
      </Stack>

      <Divider sx={{ my: 4, borderColor: "#E5E7EB" }} />

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="space-between"
      >
        <Button
          variant="outlined"
          size="large"
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          disabled={saving}
          sx={{
            px: 3,
            py: 1.25,
            borderRadius: 2,
            textTransform: "none",
            fontFamily: "var(--font-poppins)",
            fontWeight: 700,
            color: "#334155",
            borderColor: "#CBD5E1",
            "&:hover": { borderColor: primaryColor, color: primaryColor },
          }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          size="large"
          startIcon={saving ? <SaveIcon /> : <CloudUploadIcon />}
          endIcon={<ArrowForwardIcon />}
          onClick={handleValidateAndContinue}
          disabled={saving}
          sx={{
            px: { xs: 2.5, sm: 3.5 },
            py: 1.25,
            borderRadius: 2.5,
            bgcolor: primaryColor,
            color: "#FFFFFF",
            fontWeight: 800,
            textTransform: "none",
            fontFamily: "var(--font-poppins)",
            boxShadow: `0 14px 32px ${primaryColor}50`,
            "&:hover": { bgcolor: "#B8941F" },
            "&:disabled": { bgcolor: "#F1F5F9", color: "#94A3B8", boxShadow: "none" },
          }}
        >
          {saving ? "Saving…" : "Save & Continue"}
        </Button>
      </Stack>
    </Paper>
  );
}
