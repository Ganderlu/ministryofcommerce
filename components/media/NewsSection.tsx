"use client";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
} from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { motion } from "framer-motion";
import { theme } from "@/theme";
import { news } from "@/data/seed";
import Image from "next/image";

const MotionCard = motion(Card);

export default function NewsSection() {
  const accentColor = "#D4AF37";

  return (
    <Box id="news" sx={{ py: { xs: 6, md: 10 } }}>
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
            LATEST NEWS
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
            Stay Informed
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
            Get the latest updates on our initiatives, programs, and achievements.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {news.map((item, index) => (
            <Grid item xs={12} md={4} key={item.id}>
              <MotionCard
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  overflow: "hidden",
                  backgroundColor: "white",
                }}
              >
                <Box sx={{ position: "relative", height: { xs: 180, md: 220 }, overflow: "hidden" }}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      backgroundColor: "rgba(212, 175, 55, 0.45)",
                    }}
                  />
                </Box>
                <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                  <Chip
                    label={item.date}
                    size="small"
                    sx={{
                      mb: 1.5,
                      backgroundColor: "#fff7ed",
                      color: accentColor,
                      fontWeight: 500,
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      fontFamily: "var(--font-poppins)",
                      fontSize: { xs: "1rem", md: "1.1rem" },
                      mb: 1,
                      lineHeight: 1.4,
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Button
                    variant="text"
                    endIcon={<ArrowForward />}
                    sx={{
                      color: accentColor,
                      fontWeight: 600,
                      p: 0,
                      mt: 1,
                    }}
                  >
                    Read More
                  </Button>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}