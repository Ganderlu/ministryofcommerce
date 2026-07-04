"use client";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Chip,
} from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { motion } from "framer-motion";
import { theme } from "@/theme";
import { news } from "@/data/seed";
import Image from "next/image";

const MotionCard = motion(Card);

export default function News() {
  const accentColor = "#D4AF37";
  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="xl">
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "flex-end" }}
          mb={6}
          spacing={3}
        >
          <Box>
            <Typography
              variant="overline"
              sx={{ color: accentColor, fontWeight: 600, letterSpacing: 1 }}
            >
              LATEST NEWS
            </Typography>
            <Typography
              variant="h3"
              sx={{
                color: theme.palette.text.primary,
                fontWeight: 700,
                fontFamily: "var(--font-poppins)",
              }}
            >
              Latest News & Updates
            </Typography>
          </Box>
          <Button
            variant="text"
            endIcon={<ArrowForward />}
            sx={{ color: accentColor, fontWeight: 600 }}
          >
            View All
          </Button>
        </Stack>

        <Grid container spacing={4}>
          {news.map((item, index) => (
            <Grid item xs={12} md={4} key={item.id}>
              <MotionCard
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
              >
                <Box sx={{ position: "relative", height: 200, overflow: "hidden" }}>
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
                <CardContent sx={{ p: 3 }}>
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
                      fontSize: "1.1rem",
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
