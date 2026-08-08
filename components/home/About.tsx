"use client";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const MotionBox = motion(Box);
const MotionGrid = motion(Grid);

const galleryImages = [
  "/images/soludo11.png",
  "/images/soludo12.png",
  "/images/soludo13.png",
  "/images/soludo14.png",
  "/images/soludo15.png",
  "/images/ch3.png",
  "/images/ch1.png",
  "/images/ch2.png",
  "/images/soludo19.png"
];

export default function About() {
  const accentColor = "#D4AF37";

  return (
    <Box sx={{ py: 12, position: "relative", overflow: "hidden" }}>
      {/* Decorative background shape */}
      <Box
        sx={{
          position: "absolute",
          left: -100,
          top: "20%",
          width: 400,
          height: 400,
          backgroundColor: accentColor,
          borderRadius: "50%",
          opacity: 0.15
        }}
      />

      <Container maxWidth="xl">
        <Grid container spacing={8} alignItems="center">
          {/* Left Column: Gallery */}
          <Grid item xs={12} md={6}>
            <MotionBox
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              sx={{
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: -20,
                  right: -20,
                  width: "100%",
                  height: "100%",
                  backgroundColor: accentColor,
                  borderRadius: 4,
                  zIndex: -1
                }
              }}
            >
              <Grid container spacing={2}>
                {galleryImages.map((img, idx) => (
                  <Grid item xs={4} key={idx}>
                    <Box sx={{ position: "relative", height: 140 }}>
                      <Image
                        src={img}
                        alt={`Gallery image ${idx + 1}`}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                      {/* Faded yellow overlay on gallery images */}
                      <Box
                        sx={{
                          position: "absolute",
                          inset: 0,
                          backgroundColor: "rgba(212, 175, 55, 0.15)"
                        }}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </MotionBox>
          </Grid>

          {/* Right Column: Text */}
          <Grid item xs={12} md={6}>
            <MotionBox
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="overline"
                sx={{
                  color: accentColor,
                  fontWeight: 700,
                  letterSpacing: 1.5,
                  display: "block",
                  mb: 2,
                  fontSize: "0.85rem"
                }}
              >
                ABOUT US
              </Typography>

              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  fontFamily: "var(--font-poppins)",
                  lineHeight: 1.2,
                  mb: 4,
                  fontSize: { xs: "2rem", md: "2.75rem" }
                }}
              >
                Anambra State Ministry of Commerce
              </Typography>

              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: "1.05rem",
                  lineHeight: 1.8,
                  mb: 3
                }}
              >
                We are the Anambra State Ministry of Commerce, committed to driving economic development through the promotion of commerce, trade, investment, and enterprise development.
              </Typography>

              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: "1.05rem",
                  lineHeight: 1.8,
                  mb: 5
                }}
              >
               Our Ministry exists to create opportunities for businesses of all sizes—from local traders and artisans to manufacturers, exporters, cooperatives, and international investors. We believe that a thriving commercial sector is the foundation of sustainable economic growth, job creation, and improved living standards.
              </Typography>

              <Button
                component={Link}
                href="/about"
                variant="contained"
                sx={{
                  backgroundColor: accentColor,
                  color: "black",
                  px: 5,
                  py: 1.5,
                  borderRadius: 50,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  "&:hover": { backgroundColor: "#c49f2d" }
                }}
              >
                Read More
              </Button>
            </MotionBox>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
