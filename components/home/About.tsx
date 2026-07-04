"use client";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";

const MotionBox = motion(Box);
const MotionGrid = motion(Grid);

const galleryImages = [
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1497366582816-96d57332149a?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1521791055366-0d553872125f?w=400&h=300&fit=crop"
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
                Welcome to <span style={{ color: accentColor }}>Anambra SME</span> Centre
              </Typography>

              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: "1.05rem",
                  lineHeight: 1.8,
                  mb: 3
                }}
              >
                The Anambra SME Center ("Anambra SME" or "Agency") is the State Developmental Finance Institution tasked with the purview of acting as a catalyst for job creation and facilitating easier access to resources required by entrepreneurs and investors in the Micro, Small and Medium Enterprises (MSMEs), to achieve sustainable economic development in Anambra State.
              </Typography>

              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: "1.05rem",
                  lineHeight: 1.8,
                  mb: 5
                }}
              >
                With the continued support of His Excellency Gov. Soludo, ESME beneficiaries are groomed with the capacity to create quality jobs, revitalize livelihood, commercialize new technologies, and strengthen the local and national economy.
              </Typography>

              <Button
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
