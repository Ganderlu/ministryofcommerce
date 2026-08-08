"use client";
import { Box, Card, CardContent, Typography, Stack } from "@mui/material";
import { motion } from "framer-motion";
import {
  Verified,
  Star,
  UploadFile,
  FactCheck,
  SvgIconComponent,
} from "@mui/icons-material";
import { businessRegistrationGuidelines } from "@/data/seed";

const MotionCard = motion(Card);

const iconMap: { [key: string]: SvgIconComponent } = {
  Verified,
  Star,
  UploadFile,
  FactCheck,
};

export default function GuidelinesSidebar() {
  const primaryColor = "#D4AF37";

  return (
    <MotionCard
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
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
          Registration Guidelines
        </Typography>
        <Stack spacing={2.5}>
          {businessRegistrationGuidelines.map((guideline) => {
            const IconComponent = iconMap[guideline.icon] || Verified;
            return (
              <motion.div
                key={guideline.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.25 + Number(guideline.id) * 0.05 }}
              >
                <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                  <Box
                    sx={{
                      width: 34,
                      height: 34,
                      borderRadius: "10px",
                      backgroundColor: `${primaryColor}12`,
                      color: primaryColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      mt: 0.1,
                    }}
                  >
                    <IconComponent sx={{ fontSize: "1.05rem" }} />
                  </Box>
                  <Typography
                    sx={{
                      color: "#475569",
                      fontSize: "0.87rem",
                      lineHeight: 1.65,
                      fontWeight: 500,
                      pt: 0.4,
                    }}
                  >
                    {guideline.text}
                  </Typography>
                </Box>
              </motion.div>
            );
          })}
        </Stack>
      </CardContent>
    </MotionCard>
  );
}
