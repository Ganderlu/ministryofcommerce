"use client";
import { Box, Card, CardContent, Typography, Stack } from "@mui/material";
import { motion } from "framer-motion";
import { CheckCircleOutline } from "@mui/icons-material";
import { msmeRequiredDocs } from "@/data/seed";

const MotionCard = motion(Card);

export default function RequiredDocuments() {
  const primaryColor = "#D4AF37";

  return (
    <MotionCard
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      sx={{
        borderRadius: 3,
        border: "1px solid #F1F5F9",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        mb: 2.5,
        overflow: "visible",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontFamily: "var(--font-poppins)",
            color: primaryColor,
            mb: 2.5,
            pb: 2,
            borderBottom: "1px solid #F1F5F9",
            fontSize: "1.05rem",
          }}
        >
          Required Documents
        </Typography>
        <Stack spacing={2}>
          {msmeRequiredDocs.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.35 + index * 0.05 }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  py: 0.3,
                }}
              >
                <CheckCircleOutline
                  sx={{
                    color: primaryColor,
                    fontSize: "1.15rem",
                    flexShrink: 0,
                  }}
                />
                <Typography
                  sx={{
                    color: "#475569",
                    fontSize: "0.88rem",
                    fontWeight: 500,
                    lineHeight: 1.5,
                  }}
                >
                  {doc.name}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Stack>
      </CardContent>
    </MotionCard>
  );
}
