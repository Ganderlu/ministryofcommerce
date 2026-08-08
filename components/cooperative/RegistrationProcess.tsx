"use client";
import { Box, Container, Typography, Stack } from "@mui/material";
import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import { registrationProcessSteps } from "@/data/seed";

const MotionBox = motion(Box);

export default function RegistrationProcess() {
  const primaryColor = "#D4AF37";
  const accentColor = "#D4AF37";

  return (
    <Box sx={{ py: { xs: 10, md: 14 }, backgroundColor: "white" }}>
      <Container maxWidth="xl">
        <SectionTitle
          overline="REGISTRATION PROCESS"
          title="How It Works"
          description="Follow these simple steps to register your cooperative society online."
        />
        <Box sx={{ position: "relative", mt: 4 }}>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              position: "absolute",
              top: 40,
              left: "8%",
              right: "8%",
              height: 3,
              backgroundColor: "#E2E8F0",
              zIndex: 0,
            }}
          />
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 4, md: 0 }}
            alignItems="stretch"
            justifyContent="space-between"
            sx={{ position: "relative", zIndex: 1 }}
          >
            {registrationProcessSteps.map((step, index) => (
              <MotionBox
                key={step.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                viewport={{ once: true }}
                sx={{
                  flex: 1,
                  position: "relative",
                  px: { md: 2 },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2} sx={{ width: "100%", mb: { xs: 0, md: 0 } }}>
                  <Box sx={{ display: { xs: "block", md: "none" }, flexShrink: 0 }}>
                    <ProcessCircle step={step.step} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Box
                      sx={{
                        display: { xs: "none", md: "flex" },
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}dd 100%)`,
                        color: "white",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        fontSize: "1.5rem",
                        fontFamily: "var(--font-poppins)",
                        boxShadow: `0 6px 20px ${primaryColor}40`,
                        border: `4px solid white`,
                        mb: 2,
                        mx: "auto",
                      }}
                    >
                      {step.step}
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        fontFamily: "var(--font-poppins)",
                        color: "#1E293B",
                        mb: 1,
                        fontSize: { xs: "1rem", md: "1.05rem" },
                        textAlign: { xs: "left", md: "center" },
                      }}
                    >
                      {step.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#64748B",
                        lineHeight: 1.7,
                        fontSize: "0.88rem",
                        textAlign: { xs: "left", md: "center" },
                      }}
                    >
                      {step.description}
                    </Typography>
                  </Box>
                </Stack>
              </MotionBox>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

function ProcessCircle({ step }: { step: number }) {
  const primaryColor = "#D4AF37";
  return (
    <Box
      sx={{
        width: 56,
        height: 56,
        borderRadius: "50%",
        background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}dd 100%)`,
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: "1.25rem",
        fontFamily: "var(--font-poppins)",
        boxShadow: `0 4px 16px ${primaryColor}30`,
        flexShrink: 0,
      }}
    >
      {step}
    </Box>
  );
}
