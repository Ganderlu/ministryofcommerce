"use client";
import { Box, Container, Typography, Button, Stack, useTheme } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

const MotionBox = motion(Box);

const images = [
  "/images/Governor1.jpg",
  "/images/governor3.jpg",
  "/images/governor4.png"
];

export default function Hero() {
  const theme = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Box sx={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{ position: "absolute", inset: 0 }}
        >
          <Image
            src={images[currentImageIndex]}
            alt="Anambra State"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
          />
        </motion.div>
      </AnimatePresence>
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      />
      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          paddingTop: { xs: 12, md: 16 },
          paddingBottom: { xs: 8, md: 12 },
        }}
      >
        <MotionBox
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          sx={{ maxWidth: "700px" }}
        >
          <Typography
            variant="h1"
            sx={{
              color: "white",
              fontSize: { xs: "2.25rem", sm: "2.75rem", md: "3.75rem" },
              fontFamily: "var(--font-poppins)",
              fontWeight: 700,
              mb: 3,
              lineHeight: 1.2,
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            Building a Thriving Commerce and Investment Ecosystem in{" "}
            <span style={{ color: theme.palette.secondary.main }}>Anambra State</span>
          </Typography>
          <Typography
            variant="body1"
            sx={{ 
              color: "rgba(255,255,255,0.95)", 
              mb: 5, 
              lineHeight: 1.8,
              fontSize: { xs: "1rem", md: "1.125rem" },
              textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
            }}
          >
            We promote trade, investment, and enterprise development for a prosperous and globally
            competitive Anambra.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2.5}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#D4AF37",
                paddingX: 5,
                paddingY: 1.75,
                "&:hover": { backgroundColor: "#c49f2d" },
                fontWeight: 700,
                color: "black",
                fontSize: "1rem",
                boxShadow: "0 4px 12px rgba(212, 175, 55, 0.4)",
              }}
            >
              Explore Services
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: "white",
                color: "white",
                paddingX: 5,
                paddingY: 1.75,
                "&:hover": { borderColor: "white", backgroundColor: "rgba(255,255,255,0.15)" },
                fontWeight: 600,
                fontSize: "1rem",
                borderWidth: 2,
              }}
            >
              Invest in Anambra
            </Button>
          </Stack>
        </MotionBox>
      </Container>
    </Box>
  );
}
