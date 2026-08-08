"use client";
import { Box, Card, CardContent, Typography, Stack, Button } from "@mui/material";
import { motion } from "framer-motion";
import { HeadsetMic, Phone, Email, Chat } from "@mui/icons-material";

const MotionCard = motion(Card);

export default function HelpCard() {
  const primaryColor = "#D4AF37";

  return (
    <MotionCard
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      sx={{
        borderRadius: 3,
        border: "1px solid #F1F5F9",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        overflow: "visible",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 1.5,
            mb: 2.5,
            pb: 2,
            borderBottom: "1px solid #F1F5F9",
          }}
        >
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: "12px",
              backgroundColor: `${primaryColor}12`,
              color: primaryColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <HeadsetMic sx={{ fontSize: "1.4rem" }} />
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontFamily: "var(--font-poppins)",
                color: "#1E293B",
                fontSize: "1.05rem",
                mb: 0.3,
              }}
            >
              Need Help?
            </Typography>
            <Typography sx={{ color: "#64748B", fontSize: "0.82rem", lineHeight: 1.5 }}>
              Our support team is available to assist you.
            </Typography>
          </Box>
        </Box>

        <Stack spacing={1.8} mb={2.5}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Phone sx={{ color: primaryColor, fontSize: "1.05rem" }} />
            <Typography sx={{ color: "#475569", fontSize: "0.87rem", fontWeight: 500 }}>
              +234 813 123 4567
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Email sx={{ color: primaryColor, fontSize: "1.05rem" }} />
            <Typography sx={{ color: "#475569", fontSize: "0.87rem", fontWeight: 500 }}>
              support@commerce.anambrastate.gov.ng
            </Typography>
          </Box>
        </Stack>

        <Button
          variant="contained"
          startIcon={<Chat />}
          fullWidth
          sx={{
            backgroundColor: primaryColor,
            py: 1.4,
            fontWeight: 600,
            fontSize: "0.9rem",
            borderRadius: 2,
            fontFamily: "var(--font-poppins)",
            textTransform: "none",
            boxShadow: `0 4px 16px ${primaryColor}30`,
            "&:hover": {
              backgroundColor: "#D4AF37",
              transform: "translateY(-1px)",
              boxShadow: `0 6px 20px ${primaryColor}40`,
            },
            transition: "all 0.3s ease",
          }}
        >
          Live Chat
        </Button>
      </CardContent>
    </MotionCard>
  );
}
