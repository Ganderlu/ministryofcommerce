"use client";
import { Box, Container, Typography, Button, Stack, Avatar } from "@mui/material";
import { motion } from "framer-motion";
import LinkNext from "next/link";
import { ArrowForward, Download, Store } from "@mui/icons-material";

const MotionBox = motion(Box);

export default function CTA() {
  const darkGreen = "#D4AF37";
  const primaryColor = "#D4AF37";
  const accentColor = "#D4AF37";

  return (
    <Box
      sx={{
        py: { xs: 8, md: 10 },
        background: `linear-gradient(135deg, ${darkGreen} 0%, ${primaryColor} 100%)`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accentColor}20 0%, transparent 70%)`,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -80,
          left: -80,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accentColor}15 0%, transparent 70%)`,
        }}
      />
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            gap: 4,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={3}>
            <Avatar
              sx={{
                width: 64,
                height: 64,
                backgroundColor: `${accentColor}20`,
                border: `2px solid ${accentColor}50`,
                display: { xs: "none", sm: "flex" },
              }}
            >
              <Store sx={{ color: accentColor, fontSize: "2rem" }} />
            </Avatar>
            <Box>
              <Typography
                variant="h4"
                sx={{
                  color: "white",
                  fontWeight: 700,
                  fontFamily: "var(--font-poppins)",
                  fontSize: { xs: "1.5rem", md: "2rem" },
                  mb: 0.5,
                  lineHeight: 1.3,
                }}
              >
                Ready to Grow Your MSME?
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "rgba(255,255,255,0.85)", fontSize: "0.95rem" }}
              >
                Join thousands of MSMEs in Anambra State benefiting from government support and business opportunities tailored for micro, small and medium enterprises.
              </Typography>
            </Box>
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button
              component={LinkNext}
              href="/services/msme-registration/register"
              variant="contained"
              startIcon={<ArrowForward />}
              sx={{
                backgroundColor: accentColor,
                color: "black",
                px: 4,
                py: 1.6,
                fontWeight: 700,
                fontSize: "0.95rem",
                borderRadius: 2,
                boxShadow: "0 6px 20px rgba(212, 175, 55, 0.35)",
                "&:hover": {
                  backgroundColor: "#c49f2d",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 24px rgba(212, 175, 55, 0.45)",
                },
                transition: "all 0.3s ease",
                whiteSpace: "nowrap",
              }}
            >
              Start MSME Registration
            </Button>
            <Button
              variant="outlined"
              startIcon={<Download />}
              sx={{
                borderColor: "white",
                color: "white",
                borderWidth: 2,
                px: 4,
                py: 1.6,
                fontWeight: 600,
                fontSize: "0.95rem",
                borderRadius: 2,
                whiteSpace: "nowrap",
                "&:hover": {
                  borderColor: "white",
                  backgroundColor: "rgba(255,255,255,0.12)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Download Guidelines
            </Button>
          </Stack>
        </MotionBox>
      </Container>
    </Box>
  );
}
