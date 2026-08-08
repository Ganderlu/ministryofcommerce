"use client";
import { Box, Container, Grid, Typography, Stack, Paper } from "@mui/material";
import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import { businessEligibility } from "@/data/seed";
import { CheckCircle, Info } from "@mui/icons-material";

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

export default function Eligibility() {
  const primaryColor = "#D4AF37";
  const darkGreen = "#D4AF37";
  const accentColor = "#D4AF37";

  return (
    <Box sx={{ py: { xs: 10, md: 14 }, backgroundColor: "#F8FAFC" }}>
      <Container maxWidth="xl">
        <SectionTitle
          overline="ELIGIBILITY REQUIREMENTS"
          title="Who Can Register?"
          description="Your business must meet the following basic requirements:"
        />
        <Grid container spacing={5} alignItems="center">
          <Grid item xs={12} lg={7}>
            <MotionBox
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Stack spacing={1.5}>
                {businessEligibility.map((req, index) => (
                  <motion.div
                    key={req.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 2,
                        p: 2.5,
                        backgroundColor: "white",
                        borderRadius: 2.5,
                        border: "1px solid #E2E8F0",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          borderColor: `${primaryColor}40`,
                          boxShadow: "0 4px 12px rgba(212, 175, 55, 0.08)",
                          transform: "translateX(4px)",
                        },
                      }}
                    >
                      <CheckCircle
                        sx={{
                          color: primaryColor,
                          fontSize: "1.5rem",
                          mt: 0.1,
                          flexShrink: 0,
                        }}
                      />
                      <Typography
                        sx={{
                          color: "#334155",
                          fontWeight: 500,
                          lineHeight: 1.6,
                          fontSize: "0.95rem",
                        }}
                      >
                        {req.text}
                      </Typography>
                    </Box>
                  </motion.div>
                ))}
              </Stack>
            </MotionBox>
          </Grid>
          <Grid item xs={12} lg={5}>
            <MotionPaper
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              sx={{
                backgroundColor: `${primaryColor}10`,
                borderRadius: 3,
                p: 4,
                border: `1px solid ${primaryColor}30`,
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: -50,
                  right: -50,
                  width: 150,
                  height: 150,
                  borderRadius: "50%",
                  backgroundColor: `${accentColor}15`,
                },
              }}
            >
              <Box sx={{ position: "relative", zIndex: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mb: 2.5,
                  }}
                >
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: "12px",
                      backgroundColor: primaryColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Info sx={{ color: "white", fontSize: "1.4rem" }} />
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      fontFamily: "var(--font-poppins)",
                      color: darkGreen,
                      fontSize: "1.15rem",
                    }}
                  >
                    Important Note
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    color: "#334155",
                    lineHeight: 1.8,
                    fontSize: "0.92rem",
                    fontWeight: 500,
                  }}
                >
                  All information provided must be accurate and up to date.
                  False information may lead to penalties or cancellation
                  of registration.
                </Typography>
              </Box>
            </MotionPaper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
