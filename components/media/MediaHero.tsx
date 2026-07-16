"use client";
import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";

const MotionBox = motion(Box);

export default function MediaHero() {
  const accentColor = "#D4AF37";

  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: 300, md: 400 },
        overflow: "hidden",
      }}
    >
      <Image
        src="/images/soludo21.png"
        alt="Media"
        fill
        style={{ objectFit: "cover" }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container maxWidth="xl">
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="overline"
              sx={{
                color: accentColor,
                fontWeight: 700,
                letterSpacing: 2,
                mb: 1.5,
                fontSize: { xs: "0.75rem", md: "0.9rem" },
              }}
            >
              WELCOME TO
            </Typography>
            <Typography
              variant="h2"
              sx={{
                color: "white",
                fontWeight: 700,
                fontFamily: "var(--font-poppins)",
                mb: 2,
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              }}
            >
              Media & Updates
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "rgba(255, 255, 255, 0.9)",
                maxWidth: "600px",
                fontSize: { xs: "0.95rem", md: "1.1rem" },
              }}
            >
              Stay updated with the latest news, upcoming events, and photo gallery from the Anambra State Ministry of Commerce.
            </Typography>
          </MotionBox>
        </Container>
      </Box>
    </Box>
  );
}