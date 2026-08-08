"use client";
import { Box, Container, Typography, Breadcrumbs, Link, Paper } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import { Home } from "@mui/icons-material";

const MotionBox = motion(Box);

export default function ContactHero() {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Background Image */}
      <Box sx={{ position: "absolute", inset: 0 }}>
        <Image
          src="/images/ch5.png"
          alt="Government Building"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
        />
      </Box>

      {/* Solid Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 4,
            alignItems: "center",
            py: 8,
          }}
        >
          {/* Left Content */}
          <MotionBox
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Breadcrumbs
              aria-label="breadcrumb"
              sx={{ mb: 4, color: "white" }}
            >
              <Link
                underline="hover"
                color="inherit"
                href="/"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  "&:hover": { color: "#D4AF37" },
                }}
              >
                <Home fontSize="small" />
                Home
              </Link>
              <Typography sx={{ color: "#D4AF37", fontWeight: 600 }}>
                Contact Us
              </Typography>
            </Breadcrumbs>

            <Typography
              variant="h1"
              sx={{
                color: "white",
                fontWeight: 800,
                mb: 3,
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                fontFamily: "var(--font-poppins)",
                textShadow: "0 4px 12px rgba(0,0,0,0.3)",
              }}
            >
              Contact Us
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "rgba(255,255,255,0.9)",
                fontSize: { xs: "1.1rem", md: "1.25rem" },
                lineHeight: 1.8,
                maxWidth: "500px",
              }}
            >
              We are here to assist you. Reach out to us for enquiries,
              feedback, partnerships, or any assistance you need.
            </Typography>
          </MotionBox>

          {/* Right Image */}
          <MotionBox
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            sx={{
              display: { xs: "none", md: "block" },
            }}
          >
            <Paper
              elevation={8}
              sx={{
                borderRadius: 4,
                overflow: "hidden",
                height: "400px",
                position: "relative",
              }}
            >
              <Image
                src="/images/soludo2.jpg"
                alt="Government Building"
                fill
                style={{ objectFit: "cover" }}
              />
            </Paper>
          </MotionBox>
        </Box>
      </Container>
    </Box>
  );
}
