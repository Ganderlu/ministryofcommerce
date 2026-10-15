"use client";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import { gallery } from "@/data/seed";

const MotionCard = motion(Card);

export default function GallerySection() {
  const accentColor = "#FFAA00";

  return (
    <Box id="gallery" sx={{ py: { xs: 6, md: 10 }, backgroundColor: "#fafafa" }}>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
          <Typography
            variant="overline"
            sx={{
              color: accentColor,
              fontWeight: 600,
              letterSpacing: 1,
              mb: 2,
              fontSize: { xs: "0.7rem", md: "0.85rem" },
            }}
          >
            PHOTO GALLERY
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              fontFamily: "var(--font-poppins)",
              mb: 2,
              fontSize: { xs: "1.75rem", md: "2.25rem" },
            }}
          >
            Moments That Matter
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              maxWidth: "600px",
              mx: "auto",
              fontSize: { xs: "0.95rem", md: "1.05rem" },
            }}
          >
            Explore our photo gallery featuring key moments from the Ministry of Commerce.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {gallery.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <MotionCard
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    height: { xs: 200, md: 240 },
                    width: "100%",
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 599px) 100vw, (max-width: 899px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                    loading={index < 3 ? "eager" : "lazy"}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(135deg, rgba(15, 23, 42, 0.88) 0%, rgba(255, 170, 0, 0.82) 100%)",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                      "&:hover": { opacity: 1 },
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: "white",
                        fontWeight: 700,
                        fontFamily: "var(--font-poppins)",
                        px: 2,
                        textAlign: "center",
                      }}
                    >
                      {item.title}
                    </Typography>
                  </Box>
                </Box>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}