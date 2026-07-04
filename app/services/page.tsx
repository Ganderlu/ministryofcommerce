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
  Avatar,
} from "@mui/material";
import {
  Description,
  Verified,
  People,
  ShowChart,
  AccountBalanceWallet,
  Payment,
  TaskAlt,
  Computer,
  ShoppingCart,
  SupportAgent,
  ArrowBack,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { theme } from "@/theme";
import { services } from "@/data/seed";
import { useRouter } from "next/navigation";

const iconMap: Record<string, React.ElementType> = {
  Description,
  Verified,
  People,
  ShowChart,
  AccountBalanceWallet,
  Payment,
  TaskAlt,
  Computer,
  ShoppingCart,
  SupportAgent,
};

const MotionCard = motion(Card);

export default function ServicesPage() {
  const router = useRouter();

  return (
    <Box sx={{ py: 8, backgroundColor: "white" }}>
      <Container maxWidth="xl">
        <Stack
          direction="row"
          alignItems="center"
          mb={6}
          spacing={2}
        >
          <Button
            startIcon={<ArrowBack />}
            onClick={() => router.push("/")}
            sx={{ color: theme.palette.primary.main }}
          >
            Back to Home
          </Button>
        </Stack>

        <Box sx={{ mb: 8, textAlign: "center" }}>
          <Typography
            variant="overline"
            sx={{ color: theme.palette.primary.main, fontWeight: 600, letterSpacing: 1 }}
          >
            WHAT WE OFFER
          </Typography>
          <Typography
            variant="h2"
            sx={{
              color: theme.palette.text.primary,
              fontWeight: 700,
              fontFamily: "var(--font-poppins)",
              mb: 2,
            }}
          >
            All Our Services
          </Typography>
          <Typography
            sx={{ color: theme.palette.text.secondary, maxWidth: "600px", mx: "auto" }}
          >
            Explore our comprehensive range of services designed to support business, investment, and enterprise development in Anambra State.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={service.id}>
                <MotionCard
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
                  sx={{ height: "100%" }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: 2,
                      p: 4,
                    }}
                  >
                    <Avatar sx={{ backgroundColor: "#fff7ed", color: theme.palette.primary.main, width: 64, height: 64 }}>
                      <Icon sx={{ fontSize: 32 }} />
                    </Avatar>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        fontFamily: "var(--font-poppins)",
                      }}
                    >
                      {service.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: theme.palette.text.secondary, flexGrow: 1 }}
                    >
                      {service.description}
                    </Typography>
                  </CardContent>
                </MotionCard>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
