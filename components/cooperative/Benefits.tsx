"use client";
import { Box, Container, Grid, Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import { cooperativeBenefits } from "@/data/seed";
import {
  Gavel,
  AccountBalanceWallet,
  School,
  Storefront,
  ReceiptLong,
  Balance,
  SupportAgent,
  Verified,
  SvgIconComponent,
} from "@mui/icons-material";

const MotionCard = motion(Card);

const iconMap: { [key: string]: SvgIconComponent } = {
  Gavel,
  AccountBalanceWallet,
  School,
  Storefront,
  ReceiptLong,
  Balance,
  SupportAgent,
  Verified,
};

export default function Benefits() {
  const primaryColor = "#D4AF37";
  const accentColor = "#D4AF37";

  return (
    <Box sx={{ py: { xs: 10, md: 14 }, backgroundColor: "white" }}>
      <Container maxWidth="xl">
        <SectionTitle
          overline="ABOUT COOPERATIVE REGISTRATION"
          title="Why Register Your Cooperative?"
          description="Registering your cooperative gives it a legal identity, credibility, and access to a wide range of benefits and opportunities that will help your members grow and succeed."
        />
        <Grid container spacing={3.5}>
          {cooperativeBenefits.map((benefit, index) => {
            const IconComponent = iconMap[benefit.icon] || Verified;
            return (
              <Grid item xs={12} sm={6} md={3} key={benefit.id}>
                <MotionCard
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    border: "1px solid #F1F5F9",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      backgroundColor: primaryColor,
                      transform: "scaleX(0)",
                      transformOrigin: "left",
                      transition: "transform 0.4s ease",
                    },
                    "&:hover::before": {
                      transform: "scaleX(1)",
                    },
                    "&:hover .benefit-icon": {
                      backgroundColor: primaryColor,
                      color: "white",
                      transform: "scale(1.1) rotate(5deg)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 3.5 }}>
                    <Box
                      className="benefit-icon"
                      sx={{
                        width: 52,
                        height: 52,
                        borderRadius: "14px",
                        backgroundColor: `${primaryColor}12`,
                        color: primaryColor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 2.5,
                        transition: "all 0.3s ease",
                      }}
                    >
                      <IconComponent sx={{ fontSize: "1.6rem" }} />
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        fontFamily: "var(--font-poppins)",
                        color: "#1E293B",
                        mb: 1.2,
                        fontSize: "1.05rem",
                      }}
                    >
                      {benefit.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#64748B",
                        lineHeight: 1.75,
                        fontSize: "0.88rem",
                      }}
                    >
                      {benefit.description}
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
