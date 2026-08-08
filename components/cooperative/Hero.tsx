"use client";
import { Box, Container, Typography, Button, Stack, Breadcrumbs, Link } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import LinkNext from "next/link";
import { Download, ArrowForward, Home, ChevronRight } from "@mui/icons-material";

const MotionBox = motion(Box);

export default function Hero() {
  const primaryColor = "#D4AF37";
  const accentColor = "#D4AF37";

  return (
    <Box sx={{ position: "relative" }}>
      <Box sx={{ position: "relative", height: { xs: "550px", md: "600px" }, overflow: "hidden" }}>
        <motion.div
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          style={{ position: "absolute", inset: 0 }}
        >
          <Image
            src="/images/images3.jpg"
            alt="Farmers working together"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
          />
        </motion.div>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(135deg, ${primaryColor}dd 0%, ${primaryColor}aa 50%, rgba(0,0,0,0.4) 100%)`,
          }}
        />
        <Container
          maxWidth="xl"
          sx={{
            position: "relative",
            zIndex: 1,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            pt: { xs: 4, md: 6 },
          }}
        >
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            sx={{ maxWidth: "680px" }}
          >
            <Typography
              variant="h1"
              sx={{
                color: "white",
                fontSize: { xs: "2.25rem", sm: "2.75rem", md: "3.5rem" },
                fontFamily: "var(--font-poppins)",
                fontWeight: 700,
                mb: 1.5,
                lineHeight: 1.2,
                textShadow: "2px 2px 8px rgba(0,0,0,0.3)",
              }}
            >
              Cooperative Registration
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: accentColor,
                fontWeight: 500,
                fontFamily: "var(--font-poppins)",
                fontSize: { xs: "1.2rem", md: "1.5rem" },
                mb: 3,
                position: "relative",
                pb: 3,
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: 80,
                  height: 4,
                  backgroundColor: accentColor,
                  borderRadius: 2,
                },
              }}
            >
              Build Stronger Together
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "rgba(255,255,255,0.92)",
                lineHeight: 1.8,
                mb: 5,
                fontSize: { xs: "0.95rem", md: "1.05rem" },
                textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
              }}
            >
              Register your cooperative society with the Anambra State Ministry of Commerce and
              enjoy legal recognition, access to government support programs, funding
              opportunities and technical development services.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                component={LinkNext}
                href="/services/cooperative-registration/register"
                variant="contained"
                startIcon={<ArrowForward />}
                sx={{
                  backgroundColor: accentColor,
                  color: "black",
                  px: 4,
                  py: 1.75,
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  borderRadius: 2,
                  boxShadow: "0 6px 20px rgba(212, 175, 55, 0.4)",
                  "&:hover": {
                    backgroundColor: "#c49f2d",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 24px rgba(212, 175, 55, 0.5)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Start Registration
              </Button>
              <Button
                variant="outlined"
                startIcon={<Download />}
                sx={{
                  borderColor: "white",
                  color: "white",
                  borderWidth: 2,
                  px: 4,
                  py: 1.75,
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  borderRadius: 2,
                  "&:hover": {
                    borderColor: "white",
                    backgroundColor: "rgba(255,255,255,0.15)",
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

      <Box sx={{ backgroundColor: "#F8FAFC", borderBottom: "1px solid #E2E8F0", py: 2.5 }}>
        <Container maxWidth="xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Breadcrumbs
              separator={<ChevronRight sx={{ fontSize: "1rem", color: "#94A3B8" }} />}
              sx={{ fontSize: "0.9rem" }}
            >
              <Link
                component={LinkNext}
                href="/"
                underline="hover"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  color: "#64748B",
                  fontWeight: 500,
                  "&:hover": { color: primaryColor },
                }}
              >
                <Home sx={{ fontSize: "1rem" }} />
                Home
              </Link>
              <Link
                component={LinkNext}
                href="/services"
                underline="hover"
                sx={{
                  color: "#64748B",
                  fontWeight: 500,
                  "&:hover": { color: primaryColor },
                }}
              >
                Services
              </Link>
              <Typography sx={{ color: primaryColor, fontWeight: 600 }}>
                Cooperative Registration
              </Typography>
            </Breadcrumbs>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
}
