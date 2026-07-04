"use client";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";
import { theme } from "@/theme";
import { services } from "@/data/seed";
import Image from "next/image";
import { useRouter } from "next/navigation";

const MotionCard = motion(Card);

export default function Services() {
  const router = useRouter();
  const displayServices = services.slice(0, 5);
  const accentColor = "#D4AF37";

  return (
    <Box sx={{ py: 12, backgroundColor: "white" }}>
      <Container maxWidth="xl">
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "flex-start" }}
          mb={8}
          spacing={4}
        >
          <Box sx={{ maxWidth: "450px" }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                backgroundColor: accentColor,
                color: "black",
                px: 2,
                py: 0.5,
                borderRadius: 1,
                mb: 2,
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              OUR PROGRAMMES
            </Box>
            <Typography
              variant="h3"
              sx={{
                color: "#333333",
                fontWeight: 700,
                fontFamily: "var(--font-poppins)",
                lineHeight: 1.3,
                mb: 2,
              }}
            >
              Our Intensive Capacity Building Plans
            </Typography>
            <Typography
              sx={{
                color: "#666666",
                lineHeight: 1.7,
                fontSize: "0.95rem",
              }}
            >
              We are working in contact with other institutions in both public and private sectors to create a good enabling environment of business in general, and SMEs activities in particular.
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={4}>
          {displayServices.map((service, index) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={2.4} key={service.id}>
                <MotionCard
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
                  sx={{
                    height: "100%",
                    borderRadius: 2,
                    overflow: "hidden",
                    backgroundColor: "white",
                  }}
                >
                  <Box sx={{ position: "relative", height: 220, overflow: "hidden" }}>
                    <Image
                      src={service.image}
                      alt={service.title}
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
                    <Box
                      sx={{
                        width: 40,
                        height: 3,
                        backgroundColor: accentColor,
                        mb: 2,
                      }}
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        fontFamily: "var(--font-poppins)",
                        fontSize: "1rem",
                        color: "#333333",
                      }}
                    >
                      {service.title}
                    </Typography>
                  </CardContent>
                </MotionCard>
              </Grid>
            );
          })}
        </Grid>

        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Button
            variant="contained"
            onClick={() => router.push("/services")}
            sx={{
              backgroundColor: accentColor,
              color: "black",
              px: 6,
              py: 1.5,
              "&:hover": { backgroundColor: "#c49f2d" },
              fontWeight: 600,
              borderRadius: 2,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            View All Services
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
