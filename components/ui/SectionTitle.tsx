"use client";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

interface SectionTitleProps {
  overline?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionTitle({
  overline,
  title,
  description,
  align = "center",
}: SectionTitleProps) {
  const accentColor = "#D4AF37";
  const primaryColor = "#D4AF37";

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      sx={{
        textAlign: align,
        mb: description ? 6 : 4,
        maxWidth: align === "center" ? "700px" : "none",
        mx: align === "center" ? "auto" : 0,
      }}
    >
      {overline && (
        <Typography
          variant="overline"
          sx={{
            color: primaryColor,
            fontWeight: 700,
            letterSpacing: 2,
            fontSize: "0.8rem",
            mb: 1,
            display: "block",
          }}
        >
          {overline}
        </Typography>
      )}
      <Typography
        variant="h2"
        sx={{
          fontWeight: 700,
          fontFamily: "var(--font-poppins)",
          color: "#1E293B",
          fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" },
          lineHeight: 1.3,
          mb: description ? 2 : 0,
          position: "relative",
          pb: 2,
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: align === "center" ? "50%" : 0,
            transform: align === "center" ? "translateX(-50%)" : "none",
            width: 60,
            height: 3,
            backgroundColor: accentColor,
            borderRadius: 2,
          },
        }}
      >
        {title}
      </Typography>
      {description && (
        <Typography
          variant="body1"
          sx={{
            color: "#64748B",
            fontSize: { xs: "0.95rem", md: "1.05rem" },
            lineHeight: 1.8,
            mt: 3,
          }}
        >
          {description}
        </Typography>
      )}
    </MotionBox>
  );
}
