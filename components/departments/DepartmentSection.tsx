"use client";
import { Box, Container, Typography, Card, CardContent, Grid } from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionCard = motion(Card);

interface DepartmentSectionProps {
  title: string;
  subtitle: string;
  description: string;
  responsibilities?: string[];
  keyInitiatives?: string[];
  contactInfo?: { email?: string; phone?: string };
}

export default function DepartmentSection({
  title,
  subtitle,
  description,
  responsibilities = [],
  keyInitiatives = [],
  contactInfo,
}: DepartmentSectionProps) {
  const accentColor = "#D4AF37";

  return (
    <Box sx={{ py: { xs: 4, md: 8 }, backgroundColor: "#fafafa" }}>
      <Container maxWidth="xl">
        {/* Hero Section */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          sx={{ textAlign: "center", mb: { xs: 6, md: 10 } }}
        >
          <Typography
            variant="overline"
            sx={{
              color: accentColor,
              fontWeight: 700,
              letterSpacing: 1.5,
              fontSize: { xs: "0.7rem", md: "0.85rem" },
              mb: 2,
            }}
          >
            {subtitle}
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              fontFamily: "var(--font-poppins)",
              color: "#333",
              mb: 4,
              fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" },
            }}
          >
            {title}
          </Typography>
          <Box
            sx={{
              maxWidth: "800px",
              margin: "0 auto",
              px: { xs: 1, md: 0 },
              "& p": {
                color: "#666",
                fontSize: { xs: "0.95rem", md: "1.05rem" },
                lineHeight: 1.7,
                mb: 2.5,
                textAlign: { xs: "left", md: "justify" },
              },
            }}
          >
            <p>{description}</p>
          </Box>
        </MotionBox>

        {/* Responsibilities Section */}
        {responsibilities.length > 0 && (
          <Box sx={{ mb: { xs: 8, md: 12 } }}>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              sx={{
                backgroundColor: "white",
                p: { xs: 3, md: 8 },
                borderRadius: 3,
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  fontFamily: "var(--font-poppins)",
                  color: "#333",
                  mb: 4,
                  textAlign: "center",
                  fontSize: { xs: "1.5rem", md: "2rem" },
                }}
              >
                Key Responsibilities
              </Typography>
              <Grid container spacing={{ xs: 2, md: 3 }}>
                {responsibilities.map((resp, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1.5,
                        alignItems: "flex-start",
                        backgroundColor: "#fafafa",
                        p: 2.5,
                        borderRadius: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          backgroundColor: accentColor,
                          borderRadius: "50%",
                          mt: 0.75,
                          flexShrink: 0,
                        }}
                      />
                      <Typography
                        sx={{
                          color: "#666",
                          fontSize: { xs: "0.9rem", md: "1rem" },
                          lineHeight: 1.5,
                        }}
                      >
                        {resp}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </MotionBox>
          </Box>
        )}

        {/* Key Initiatives Section */}
        {keyInitiatives.length > 0 && (
          <Box sx={{ mb: { xs: 8, md: 12 } }}>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              sx={{
                backgroundColor: "white",
                p: { xs: 3, md: 8 },
                borderRadius: 3,
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  fontFamily: "var(--font-poppins)",
                  color: "#333",
                  mb: 4,
                  textAlign: "center",
                  fontSize: { xs: "1.5rem", md: "2rem" },
                }}
              >
                Key Initiatives
              </Typography>
              <Grid container spacing={{ xs: 2, md: 3 }}>
                {keyInitiatives.map((initiative, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <MotionCard
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      sx={{
                        height: "100%",
                        borderRadius: 2,
                        backgroundColor: "#fafafa",
                        boxShadow: "none",
                      }}
                    >
                      <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            fontFamily: "var(--font-poppins)",
                            color: accentColor,
                            mb: 1,
                            fontSize: { xs: "1rem", md: "1.1rem" },
                          }}
                        >
                          Initiative {index + 1}
                        </Typography>
                        <Typography
                          sx={{
                            color: "#666",
                            fontSize: { xs: "0.9rem", md: "1rem" },
                            lineHeight: 1.6,
                          }}
                        >
                          {initiative}
                        </Typography>
                      </CardContent>
                    </MotionCard>
                  </Grid>
                ))}
              </Grid>
            </MotionBox>
          </Box>
        )}

        {/* Contact Info Section */}
        {contactInfo && (
          <Box>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              sx={{
                backgroundColor: accentColor,
                p: { xs: 4, md: 8 },
                borderRadius: 3,
                textAlign: "center",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  fontFamily: "var(--font-poppins)",
                  color: "black",
                  mb: 3,
                  fontSize: { xs: "1.25rem", md: "1.5rem" },
                }}
              >
                Get In Touch
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", gap: { xs: 2, md: 6 }, flexWrap: "wrap" }}>
                {contactInfo.email && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Typography sx={{ fontSize: "1.5rem" }}>📧</Typography>
                    <Typography
                      sx={{
                        color: "black",
                        fontWeight: 500,
                        fontSize: { xs: "0.95rem", md: "1.05rem" },
                      }}
                    >
                      {contactInfo.email}
                    </Typography>
                  </Box>
                )}
                {contactInfo.phone && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Typography sx={{ fontSize: "1.5rem" }}>📞</Typography>
                    <Typography
                      sx={{
                        color: "black",
                        fontWeight: 500,
                        fontSize: { xs: "0.95rem", md: "1.05rem" },
                      }}
                    >
                      {contactInfo.phone}
                    </Typography>
                  </Box>
                )}
              </Box>
            </MotionBox>
          </Box>
        )}
      </Container>
    </Box>
  );
}
