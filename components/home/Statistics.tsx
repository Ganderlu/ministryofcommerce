"use client";
import { Box, Container, Grid, Typography, Avatar } from "@mui/material";
import {
  Business,
  Group,
  Storefront,
  TrendingUp,
  AccountBalance,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { theme } from "@/theme";
import { statistics } from "@/data/seed";

const iconMap: Record<string, React.ElementType> = {
  Business,
  Group,
  Storefront,
  TrendingUp,
  AccountBalance,
};

const MotionBox = motion(Box);

export default function Statistics() {
  const accentColor = "#D4AF37";
  
  return (
    <Container maxWidth="xl" sx={{ marginTop: "-60px", position: "relative", zIndex: 10 }}>
      <MotionBox
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        sx={{
          backgroundColor: accentColor,
          borderRadius: 4,
          padding: 4,
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        <Grid container spacing={4} justifyContent="center">
          {statistics.map((stat, index) => {
            const Icon = iconMap[stat.icon];
            return (
              <Grid
                item
                key={stat.id}
                xs={6}
                sm={6}
                md={4}
                lg={2.4}
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="center"
              >
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    backgroundColor: "rgba(0,0,0,0.1)",
                    mb: 2,
                  }}
                >
                  <Icon sx={{ fontSize: 30, color: "black" }} />
                </Avatar>
                <Typography
                  variant="h3"
                  sx={{
                    color: "black",
                    fontWeight: 700,
                    fontFamily: "var(--font-poppins)",
                    mb: 0.5,
                  }}
                >
                  {stat.count}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(0,0,0,0.9)" }}
                >
                  {stat.label}
                </Typography>
              </Grid>
            );
          })}
        </Grid>
      </MotionBox>
    </Container>
  );
}
