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
  Grid,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  ArrowBack,
  Description,
  TaskAlt,
  Apartment as ApartmentIcon,
  Group as GroupIcon,
  FolderCopy as FolderCopyIcon,
  CheckCircle as CheckCircleIcon,
  CloudDone as CloudDoneIcon,
  WarningAmber as WarningAmberIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import type {
  CooperativeRegistrationDocument,
  CooperativeRegistrationFormData,
  CooperativeMember,
  CooperativeDocument,
} from "@/types";

const MotionCard = motion(Card);
const MotionBox = motion(Box);

interface ReviewSubmissionProps {
  documentData: CooperativeRegistrationDocument;
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

  const cooperativeDetails = useMemo<
    CooperativeRegistrationFormData | Record<string, unknown>
  >(() => {
    return (
      documentData?.cooperativeDetails ?? ({} as CooperativeRegistrationFormData)
    );
  }, [documentData]);

  const members = useMemo<CooperativeMember[]>(
    () => documentData?.members ?? [],
    [documentData]
  );

  const documents = useMemo<CooperativeDocument[]>(
    () => documentData?.documents ?? [],
    [documentData]
  );

  const allRequiredDocsOnCloudinary = useMemo(() => {
    return documents.length > 0 && documents.every((d) => !!d.cloudinary);
  }, [documents]);

  const totalCloudinary = useMemo(
    () => documents.filter((d) => !!d.cloudinary).length,
    [documents]
  );

  const coopSummary: SummaryRow[] = [
    { label: "Cooperative Name", value: (cooperativeDetails as any).cooperativeName || "—" },
    { label: "Cooperative Type", value: (cooperativeDetails as any).cooperativeType || "—" },
    { label: "Registration Category", value: (cooperativeDetails as any).registrationCategory || "—" },
    { label: "Year of Establishment", value: (cooperativeDetails as any).yearOfEstablishment || "—" },
    { label: "Operational Area", value: (cooperativeDetails as any).operationalArea || "—" },
    { label: "Office Address", value: (cooperativeDetails as any).officeAddress || "—" },
    { label: "Local Government Area", value: (cooperativeDetails as any).localGovernmentArea || "—" },
    { label: "Community / Town", value: (cooperativeDetails as any).communityTown || "—" },
    { label: "Email Address", value: (cooperativeDetails as any).emailAddress || "—" },
    { label: "Phone Number", value: (cooperativeDetails as any).phoneNumber || "—" },
    { label: "WhatsApp Number", value: (cooperativeDetails as any).whatsappNumber || "Not provided" },
    { label: "Website", value: (cooperativeDetails as any).website || "Not provided" },
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
      setErrorMsg("You must certify this submission before submitting.");
      return;
    }
    if (members.length === 0) {
      setErrorMsg("At least one member must be provided before submitting.");
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
                  alignItems: "center",
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
                  alignItems="center"
                  sx={{ justifyContent: "flex-end", width: "68%" }}
                >
                  {row.status === "success" && (
                    <CheckCircleIcon sx={{ color: "#D4AF37", fontSize: "1.05rem" }} />
                  )}
                  {row.status === "warning" && (
                    <WarningAmberIcon sx={{ color: "#F59E0B", fontSize: "1.05rem" }} />
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
                variant="h5"
                sx={{
                  fontWeight: 700,
                  fontFamily: "var(--font-poppins)",
                  color: "#1E293B",
                  fontSize: { xs: "1.3rem", md: "1.6rem" },
                }}
              >
                Step 4 — Review & Submit
              </Typography>
              <Typography sx={{ color: "#64748B", fontSize: "0.95rem" }}>
                Please review all information before final submission. Once submitted,
                your application will be reviewed by the Ministry of Commerce.
              </Typography>
            </Box>
          </Stack>
        </MotionBox>

        <Stack mb={3}>
          <SectionCard
            title="Cooperative Information"
            icon={<ApartmentIcon />}
            rows={coopSummary}
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
                  <GroupIcon />
                </Box>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontFamily: "var(--font-poppins)",
                    color: "#1E293B",
                    fontSize: "1.02rem",
                  }}
                >
                  Members ({members.length})
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
                {members.length === 0 ? (
                  <Typography
                    sx={{
                      color: "#B91C1C",
                      fontSize: "0.9rem",
                      textAlign: "center",
                      py: 3,
                      fontWeight: 600,
                    }}
                  >
                    No members added yet. Please go back and add at least Chairman, Secretary, and Treasurer.
                  </Typography>
                ) : (
                  <Stack spacing={2}>
                    {members.map((m, i) => (
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
                          expandIcon={<ExpandMoreIcon sx={{ color: "#8a6e14" }} />}
                          sx={{
                            borderRadius: 2.25,
                            bgcolor: "#FBFBFA",
                            "&.Mui-expanded": {
                              bgcolor: `${primaryColor}08`,
                              borderBottom: "1px solid #F1E6BD",
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
                                ? m.fullName.trim().split(/\s+/).map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()
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
                                {m.fullName || "Unnamed Member"}
                              </Typography>
                              <Stack direction="row" spacing={1} alignItems="center">
                                <Chip
                                  size="small"
                                  label={m.role}
                                  sx={{
                                    fontWeight: 700,
                                    fontSize: "0.72rem",
                                    bgcolor: `${primaryColor}1A`,
                                    color: "#8a6e14",
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
                                  Member #{i + 1}
                                </Typography>
                              </Stack>
                            </Box>
                            <Box sx={{ textAlign: "right" }}>
                              <Typography
                                sx={{
                                  color: "#0F766E",
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
                            p: 2.25,
                            pt: 1.75,
                          }}
                        >
                          <GridLikeDetails member={m} />
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
                  <FolderCopyIcon />
                </Box>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontFamily: "var(--font-poppins)",
                    color: "#1E293B",
                    fontSize: "1.02rem",
                  }}
                >
                  Uploaded Documents ({documents.length})
                </Typography>
                <Chip
                  size="small"
                  icon={
                    allRequiredDocsOnCloudinary ? (
                      <CloudDoneIcon sx={{ fontSize: 15 }} />
                    ) : (
                      <WarningAmberIcon sx={{ fontSize: 15 }} />
                    )
                  }
                  label={`${totalCloudinary} on Cloudinary`}
                  sx={{
                    bgcolor: allRequiredDocsOnCloudinary
                      ? "rgba(15, 118, 110, 0.12)"
                      : "rgba(245, 158, 11, 0.12)",
                    color: allRequiredDocsOnCloudinary ? "#0F766E" : "#B45309",
                    fontWeight: 700,
                    fontSize: "0.72rem",
                    borderRadius: 10,
                    py: 0.3,
                    "& .MuiChip-icon": {
                      color: allRequiredDocsOnCloudinary ? "#0F766E" : "#D97706",
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
                      return (
                        <Box
                          key={doc.documentId || doc.id || label}
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
                              bgcolor: isOnCloudinary ? "rgba(15,118,110,0.1)" : "rgba(212,175,55,0.1)",
                              color: isOnCloudinary ? "#0F766E" : "#8a6e14",
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
                            </Typography>
                            <Stack direction="row" spacing={1.5} alignItems="center">
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
                                {doc.fileName || "Uploaded file"} •{" "}
                                {doc.fileSizeBytes != null
                                  ? formatBytes(doc.fileSizeBytes)
                                  : "—"}
                              </Typography>
                              {isOnCloudinary && (
                                <Chip
                                  size="small"
                                  icon={<CloudDoneIcon sx={{ fontSize: 12 }} />}
                                  label="Cloudinary"
                                  sx={{
                                    bgcolor: "rgba(15, 118, 110, 0.1)",
                                    color: "#0F766E",
                                    fontWeight: 700,
                                    fontSize: "0.68rem",
                                    borderRadius: 1.1,
                                    height: 18,
                                    "& .MuiChip-label": { px: 0.75 },
                                    "& .MuiChip-icon": {
                                      fontSize: "0.7rem",
                                      color: "#0F766E",
                                    },
                                  }}
                                />
                              )}
                            </Stack>
                          </Box>
                          {doc.fileUrl && (
                            <MuiLink
                              href={doc.fileUrl}
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
              backgroundColor: "#F8FAFC",
              border: declaration ? "1px solid #BFE2BF" : "1px solid #E2E8F0",
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
                    "& .MuiSvgIcon-root": { fontSize: 22 },
                  }}
                />
              }
              label={
                <Typography
                  sx={{
                    fontSize: "0.88rem",
                    color: "#334155",
                    lineHeight: 1.75,
                    fontWeight: 500,
                  }}
                >
                  <Box component="span" sx={{ fontWeight: 800, color: "#0F172A" }}>
                    Declaration of Accurate Information:{" "}
                  </Box>
                  I hereby declare that all information provided in this application
                  (cooperative details, member information, and all uploaded supporting
                  documents) is true, accurate and complete to the best of my knowledge
                  as the authorised representative. I understand that any false or
                  misleading information may result in the rejection or revocation of
                  this registration and may attract penalties under the Anambra State
                  Cooperative Societies Law.
                </Typography>
              }
            />
          </Paper>

          <Paper
            sx={{
              p: 2.75,
              borderRadius: 3,
              backgroundColor: "#F8FAFC",
              border: termsAgreed ? "1px solid #BFE2BF" : "1px solid #E2E8F0",
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
                    "& .MuiSvgIcon-root": { fontSize: 22 },
                  }}
                />
              }
              label={
                <Typography
                  sx={{
                    fontSize: "0.88rem",
                    color: "#334155",
                    lineHeight: 1.75,
                    fontWeight: 500,
                  }}
                >
                  <Box component="span" sx={{ fontWeight: 800, color: "#0F172A" }}>
                    Terms &amp; Conditions:{" "}
                  </Box>
                  I agree to comply with the Anambra State Ministry of Commerce terms
                  of service, privacy policy, and applicable cooperative regulations.
                  I consent to the Ministry of Commerce processing the submitted
                  personal data and documents for the purposes of registration review,
                  verification, and official record keeping, in line with applicable
                  data protection principles.
                </Typography>
              }
            />
          </Paper>

          <Paper
            sx={{
              p: 2.75,
              borderRadius: 3,
              backgroundColor: "#F8FAFC",
              border: certification ? "1px solid #BFE2BF" : "1px solid #E2E8F0",
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
                    "& .MuiSvgIcon-root": { fontSize: 22 },
                  }}
                />
              }
              label={
                <Typography
                  sx={{
                    fontSize: "0.88rem",
                    color: "#334155",
                    lineHeight: 1.75,
                    fontWeight: 500,
                  }}
                >
                  <Box component="span" sx={{ fontWeight: 800, color: "#0F172A" }}>
                    Certification:{" "}
                  </Box>
                  I certify that I am duly authorised to submit this registration on
                  behalf of the cooperative society named above, and that all
                  supporting documents are authentic official copies of the records
                  they represent. I understand the Ministry may contact me or any
                  listed member for further verification.
                </Typography>
              }
            />
          </Paper>
        </Stack>

        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Box
              sx={{
                mb: 3,
                p: 2,
                bgcolor: "rgba(220, 38, 38, 0.05)",
                border: "1px solid #FECACA",
                borderRadius: 2.25,
                display: "flex",
                alignItems: "flex-start",
                gap: 1.25,
              }}
            >
              <WarningAmberIcon
                sx={{ color: "#DC2626", fontSize: 22, flexShrink: 0, mt: 0.1 }}
              />
              <Typography
                sx={{
                  color: "#991B1B",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  lineHeight: 1.6,
                }}
              >
                {errorMsg}
              </Typography>
            </Box>
          </motion.div>
        )}

        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          spacing={2}
          sx={{ pt: 3, borderTop: "1px solid #F1F5F9" }}
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
              fontFamily: "var(--font-poppins)",
              "&:hover": {
                borderColor: "#94A3B8",
                backgroundColor: "#F8FAFC",
              },
            }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            startIcon={submitting ? undefined : <TaskAlt />}
            disabled={!canSubmit}
            onClick={handleSubmit}
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
                backgroundColor: canSubmit ? "#c49f2d" : "#CBD5E1",
                transform: canSubmit ? "translateY(-2px)" : "none",
                boxShadow: canSubmit ? `0 8px 24px ${primaryColor}50` : "none",
              },
              transition: "all 0.3s ease",
              textTransform: "none",
              minHeight: 48,
            }}
          >
            {submitting ? "Submitting…" : "Submit Registration"}
          </Button>
        </Stack>
      </CardContent>
    </MotionCard>
  );
}

function GridLikeDetails({ member }: { member: CooperativeMember }) {
  const primaryColor = "#D4AF37";
  const rows: { label: string; value: string }[] = [
    { label: "Role", value: member.role || "—" },
    { label: "Full Name", value: member.fullName || "—" },
    { label: "Gender", value: member.gender || "—" },
    { label: "Date of Birth", value: member.dateOfBirth || "—" },
    { label: "Phone Number", value: member.phoneNumber || "—" },
    { label: "Email Address", value: member.emailAddress || "—" },
    { label: "Residential Address", value: member.residentialAddress || "—" },
    { label: "Occupation", value: member.occupation || "—" },
    { label: "Position in Cooperative", value: member.position || "—" },
    { label: "BVN", value: member.bvn || "—" },
    { label: "NIN", value: member.nin || "—" },
    { label: "Share Holding", value: member.shareHolding ? `₦${member.shareHolding}` : "—" },
    { label: "Years in Cooperative", value: member.yearsInCooperative ? `${member.yearsInCooperative} year(s)` : "—" },
  ];

  return (
    <Grid container spacing={2} sx={{ mx: 0 }}>
      {rows.map((row) => (
        <Grid item xs={12} sm={6} key={row.label}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 0.4,
              p: 1.5,
              bgcolor: "#FAFBFC",
              border: `1px solid #E5E7EB`,
              borderRadius: 1.75,
            }}
          >
            <Typography
              sx={{
                color: "#8a6e14",
                fontSize: "0.72rem",
                fontWeight: 700,
                fontFamily: "var(--font-poppins)",
                letterSpacing: 0.3,
                textTransform: "uppercase",
              }}
            >
              {row.label}
            </Typography>
            <Typography
              sx={{
                color: "#0F172A",
                fontSize: "0.9rem",
                fontWeight: 600,
                wordBreak: "break-word",
              }}
            >
              {row.value}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

function formatBytes(bytes: number): string {
  if (!bytes) return "0 B";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
