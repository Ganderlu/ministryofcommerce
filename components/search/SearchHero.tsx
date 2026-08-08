"use client";
import { Box, Container, Typography, Breadcrumbs, Link } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import { Home } from "@mui/icons-material";

const MotionBox = motion(Box);

export default function SearchHero() {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "50vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <Box sx={{ position: "absolute", inset: 0 }}>
        <Image
          src="/images/ch5.png"
          alt="Search"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
        />
      </Box>

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.55)",
        }}
      />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            py: { xs: 6, md: 8 },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Breadcrumbs
              aria-label="breadcrumb"
              sx={{
                mb: 4,
                color: "white",
                justifyContent: { xs: "center", md: "flex-start" },
                display: "flex",
              }}
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
                Search
              </Typography>
            </Breadcrumbs>

            <Typography
              variant="h1"
              sx={{
                color: "white",
                fontWeight: 800,
                mb: 2.5,
                fontSize: { xs: "2.25rem", md: "3.25rem" },
                fontFamily: "var(--font-poppins)",
                textShadow: "0 4px 12px rgba(0,0,0,0.3)",
              }}
            >
              Search the Portal
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "rgba(255,255,255,0.92)",
                fontSize: { xs: "1rem", md: "1.15rem" },
                lineHeight: 1.8,
                maxWidth: "600px",
                mx: { xs: "auto", md: 0 },
              }}
            >
              Find services, news, departments, events, and everything you need
              across the Anambra State Ministry of Commerce portal.
            </Typography>
          </MotionBox>
        </Box>
      </Container>
    </Box>
  );
}
