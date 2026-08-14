"use client";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import { msmeDocuments } from "@/data/seed";
import {
  Description,
  Badge,
  Home,
  Article,
  PermContactCalendar,
  SvgIconComponent,
} from "@mui/icons-material";

const MotionPaper = motion(Paper);

const iconMap: { [key: string]: SvgIconComponent } = {
  Description,
  Badge,
  Home,
  Article,
  PermContactCalendar,
};

export default function DocumentsSection() {
  const primaryColor = "#D4AF37";

  return (
    <Box sx={{ py: { xs: 10, md: 14 }, backgroundColor: "white" }}>
      <Container maxWidth="xl">
        <SectionTitle
          overline="REQUIRED DOCUMENTS"
          title="Documents You'll Need"
          description="Please ensure you have the following documents ready before starting your registration."
        />
        <Grid container spacing={3}>
          {msmeDocuments.map((doc, index) => {
            const IconComponent = iconMap[doc.icon] || Description;
            return (
              <Grid item xs={12} sm={6} md key={doc.id} sx={{ flexBasis: { md: "20%" } }}>
                <MotionPaper
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  sx={{
                    borderRadius: 3,
                    border: "1px solid #F1F5F9",
                    height: "100%",
                    p: 3,
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: `${primaryColor}40`,
                      boxShadow: `0 8px 24px ${primaryColor}15`,
                    },
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
                  }}
                >
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: "16px",
                      backgroundColor: `${primaryColor}15`,
                      color: primaryColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2.5,
                      transition: "all 0.3s ease",
                    }}
                  >
                    <IconComponent sx={{ fontSize: "1.75rem" }} />
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      fontFamily: "var(--font-poppins)",
                      color: "#1E293B",
                      mb: 1,
                      fontSize: "1rem",
                    }}
                  >
                    {doc.name}
                  </Typography>
                  {doc.note && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#64748B",
                        lineHeight: 1.6,
                        fontSize: "0.85rem",
                      }}
                    >
                      {doc.note}
                    </Typography>
                  )}
                </MotionPaper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
