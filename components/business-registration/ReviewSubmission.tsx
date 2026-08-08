"use client";
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
} from "@mui/material";
import { motion } from "framer-motion";
import {
  ArrowBack,
  Description,
  Save,
  TaskAlt,
  Store,
  Person,
  FolderCopy,
  CheckCircle,
} from "@mui/icons-material";
import { useState } from "react";

const MotionCard = motion(Card);
const MotionBox = motion(Box);

interface ReviewSubmissionProps {
  onPrevious?: () => void;
}

export default function ReviewSubmission({ onPrevious }: ReviewSubmissionProps) {
  const primaryColor = "#D4AF37";
  const [declaration, setDeclaration] = useState(false);

  const summarySections = [
    {
      title: "Business Information",
      icon: <Store />,
      items: [
        { label: "Business Name", value: "Sample Business Name (Pending)" },
        { label: "Business Type", value: "Private Limited Liability Company" },
        { label: "Business Category", value: "Small Enterprise (10-49 employees)" },
        { label: "Nature of Business", value: "Trading / Commerce" },
        { label: "Business Address", value: "123 Commerce Road, Awka, Anambra State" },
        { label: "Email Address", value: "business@example.com" },
        { label: "Phone Number", value: "+234 800 000 0000" },
      ],
    },
    {
      title: "Owner / Director Details",
      icon: <Person />,
      items: [
        { label: "Full Name", value: "Chukwuma Okonkwo" },
        { label: "Gender", value: "Male" },
        { label: "Nationality", value: "Nigerian" },
        { label: "Occupation", value: "Business Owner" },
        { label: "Email", value: "owner@example.com" },
        { label: "Phone Number", value: "+234 801 000 0000" },
      ],
    },
    {
      title: "Uploaded Documents",
      icon: <FolderCopy />,
      items: [
        { label: "CAC Certificate", value: "Uploaded ✓", status: "success" },
        { label: "Tax Identification (TIN)", value: "Uploaded ✓", status: "success" },
        { label: "Proof of Address", value: "Uploaded ✓", status: "success" },
        { label: "Passport Photograph", value: "Uploaded ✓", status: "success" },
        { label: "Business Plan", value: "Optional" },
      ],
    },
  ];

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
                Review & Submit
              </Typography>
              <Typography sx={{ color: "#64748B", fontSize: "0.95rem" }}>
                Please review your application before final submission.
              </Typography>
            </Box>
          </Stack>
        </MotionBox>

        <Stack spacing={4} mb={5}>
          {summarySections.map((section, sIdx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + sIdx * 0.1 }}
            >
              <Paper
                sx={{
                  borderRadius: 3,
                  border: "1px solid #E2E8F0",
                  overflow: "hidden",
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
                    }}
                  >
                    {section.icon}
                  </Box>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontFamily: "var(--font-poppins)",
                      color: "#1E293B",
                      fontSize: "1rem",
                    }}
                  >
                    {section.title}
                  </Typography>
                  <Box sx={{ ml: "auto" }}>
                    <Button
                      size="small"
                      variant="text"
                      sx={{
                        color: primaryColor,
                        textTransform: "none",
                        fontWeight: 600,
                        fontSize: "0.85rem",
                      }}
                    >
                      Edit
                    </Button>
                  </Box>
                </Box>
                <Box sx={{ p: 1 }}>
                  {section.items.map((item, iIdx) => (
                    <Box key={item.label}>
                      {iIdx > 0 && <Divider sx={{ opacity: 0.4 }} />}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          p: 2,
                        }}
                      >
                        <Typography
                          sx={{
                            color: "#64748B",
                            fontSize: "0.88rem",
                            fontWeight: 500,
                          }}
                        >
                          {item.label}
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                          {"status" in item && item.status === "success" && (
                            <CheckCircle sx={{ color: "#D4AF37", fontSize: "1.1rem" }} />
                          )}
                          <Typography
                            sx={{
                              color: "#1E293B",
                              fontSize: "0.9rem",
                              fontWeight: 600,
                              textAlign: "right",
                            }}
                          >
                            {item.value}
                          </Typography>
                        </Stack>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </motion.div>
          ))}
        </Stack>

        <Paper
          sx={{
            p: 3,
            borderRadius: 3,
            backgroundColor: "#F8FAFC",
            border: "1px solid #E2E8F0",
            mb: 4,
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
                }}
              />
            }
            label={
              <Typography sx={{ fontSize: "0.88rem", color: "#334155", lineHeight: 1.7 }}>
                I hereby declare that all information provided in this application is true,
                accurate and complete to the best of my knowledge. I understand that any
                false information may result in the rejection or cancellation of this
                registration and may attract legal penalties.
              </Typography>
            }
          />
        </Paper>

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
              variant="outlined"
              startIcon={<Save />}
              sx={{
                borderColor: "#D4AF37",
                color: "#B8952D",
                px: 4,
                py: 1.6,
                fontWeight: 600,
                borderRadius: 2,
                textTransform: "none",
                "&:hover": {
                  borderColor: "#D4AF37",
                  backgroundColor: "rgba(212, 175, 55, 0.08)",
                },
              }}
            >
              Save Draft
            </Button>
          </Stack>
          <Button
            variant="contained"
            startIcon={<TaskAlt />}
            disabled={!declaration}
            sx={{
              backgroundColor: declaration ? primaryColor : "#CBD5E1",
              px: 5,
              py: 1.6,
              fontWeight: 700,
              fontSize: "0.95rem",
              borderRadius: 2,
              fontFamily: "var(--font-poppins)",
              boxShadow: declaration ? `0 6px 20px ${primaryColor}40` : "none",
              "&:hover": {
                backgroundColor: declaration ? "#D4AF37" : "#CBD5E1",
                transform: declaration ? "translateY(-2px)" : "none",
                boxShadow: declaration ? `0 8px 24px ${primaryColor}50` : "none",
              },
              transition: "all 0.3s ease",
              textTransform: "none",
              order: { xs: 1, sm: 2 },
            }}
          >
            Submit Registration
          </Button>
        </Stack>
      </CardContent>
    </MotionCard>
  );
}
