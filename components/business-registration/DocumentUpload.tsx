"use client";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  ArrowBack,
  ArrowForward,
  CloudUpload,
  Description,
  Article,
  Receipt,
  PhotoCamera,
  InsertDriveFile,
  FolderCopy,
  NoteAdd,
} from "@mui/icons-material";

const MotionCard = motion(Card);
const MotionBox = motion(Box);

interface DocItem {
  label: string;
  icon: React.ReactNode;
  required: boolean;
}

const documentItems: DocItem[] = [
  { label: "CAC Certificate", icon: <Article />, required: false },
  { label: "Tax Clearance / TIN", icon: <Receipt />, required: true },
  { label: "Utility Bill (Proof of Address)", icon: <Description />, required: true },
  { label: "Passport Photograph", icon: <PhotoCamera />, required: true },
  { label: "Business Plan", icon: <InsertDriveFile />, required: false },
  { label: "Memorandum & Articles of Association", icon: <FolderCopy />, required: false },
  { label: "Supporting Documents", icon: <NoteAdd />, required: false },
];

interface DocumentUploadProps {
  onPrevious?: () => void;
}

export default function DocumentUpload({ onPrevious }: DocumentUploadProps) {
  const primaryColor = "#D4AF37";
  const accentColor = "#D4AF37";

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
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              fontFamily: "var(--font-poppins)",
              color: "#1E293B",
              mb: 1,
              fontSize: { xs: "1.3rem", md: "1.6rem" },
            }}
          >
            Business Registration
          </Typography>
          <Typography sx={{ color: "#64748B", fontSize: "0.95rem" }}>
            Please upload the required documents.
          </Typography>
        </MotionBox>

        <Paper
          variant="outlined"
          sx={{
            border: `2px dashed ${primaryColor}50`,
            borderRadius: 3,
            p: { xs: 4, md: 6 },
            textAlign: "center",
            mb: 4,
            backgroundColor: `${primaryColor}05`,
            cursor: "pointer",
            transition: "all 0.3s ease",
            "&:hover": {
              borderColor: primaryColor,
              backgroundColor: `${primaryColor}0A`,
              boxShadow: "0 4px 20px rgba(212, 175, 55, 0.08)",
            },
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              backgroundColor: `${primaryColor}15`,
              color: primaryColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 3,
            }}
          >
            <CloudUpload sx={{ fontSize: "2.5rem" }} />
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              fontFamily: "var(--font-poppins)",
              color: "#1E293B",
              mb: 1,
            }}
          >
            Drag and drop files here
          </Typography>
          <Typography sx={{ color: "#64748B", mb: 3, fontSize: "0.9rem" }}>
            or click the button below to browse files
          </Typography>
          <Button
            variant="contained"
            startIcon={<CloudUpload />}
            sx={{
              backgroundColor: primaryColor,
              px: 4,
              py: 1.4,
              fontWeight: 600,
              borderRadius: 2,
              textTransform: "none",
              boxShadow: `0 4px 16px ${primaryColor}30`,
              "&:hover": {
                backgroundColor: "#D4AF37",
              },
            }}
          >
            Browse Files
          </Button>
          <Typography
            sx={{
              mt: 3,
              color: "#94A3B8",
              fontSize: "0.82rem",
            }}
          >
            Accepted formats: PDF, JPG, PNG, DOCX | Max file size: 10MB
          </Typography>
        </Paper>

        <Stack spacing={2.5} mb={5}>
          {documentItems.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + idx * 0.05 }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 2.5,
                  border: "1px solid #E2E8F0",
                  borderRadius: 2.5,
                  backgroundColor: "white",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: `${primaryColor}40`,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  },
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: "12px",
                      backgroundColor: `${accentColor}18`,
                      color: accentColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color: "#1E293B",
                        fontSize: "0.92rem",
                        mb: 0.2,
                      }}
                    >
                      {item.label}
                      {item.required && (
                        <span style={{ color: "#DC2626", marginLeft: 4 }}> *</span>
                      )}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#94A3B8",
                        fontSize: "0.8rem",
                      }}
                    >
                      No file uploaded
                    </Typography>
                  </Box>
                </Stack>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    borderColor: "#CBD5E1",
                    color: "#475569",
                    borderRadius: 1.5,
                    textTransform: "none",
                    fontWeight: 500,
                    fontSize: "0.82rem",
                    "&:hover": {
                      borderColor: primaryColor,
                      color: primaryColor,
                    },
                  }}
                >
                  Upload
                </Button>
              </Box>
            </motion.div>
          ))}
        </Stack>

        <Stack
          direction="row"
          justifyContent="space-between"
        >
          <Button
            onClick={onPrevious}
            variant="outlined"
            startIcon={<ArrowBack />}
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
          <Button
            variant="contained"
            endIcon={<ArrowForward />}
            sx={{
              backgroundColor: primaryColor,
              px: 5,
              py: 1.6,
              fontWeight: 700,
              fontSize: "0.95rem",
              borderRadius: 2,
              fontFamily: "var(--font-poppins)",
              boxShadow: `0 6px 20px ${primaryColor}40`,
              "&:hover": {
                backgroundColor: "#D4AF37",
                transform: "translateY(-2px)",
                boxShadow: `0 8px 24px ${primaryColor}50`,
              },
              transition: "all 0.3s ease",
              textTransform: "none",
            }}
          >
            Save & Continue
          </Button>
        </Stack>
      </CardContent>
    </MotionCard>
  );
}
