"use client";
import { Box, Container, Grid, Typography, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import { teamMembers } from "@/data/seed";

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const coreValues = [
  "Promoting local and international trade.",
  "Supporting Micro, Small and Medium Enterprises (MSMEs).",
  "Developing and modernizing markets across Anambra State.",
  "Encouraging investment and industrial growth.",
  "Facilitating ease of doing business.",
  "Strengthening partnerships with private sector organizations.",
  "Enhancing business regulations and compliance.",
  "Empowering entrepreneurs through training and business support.",
  "Promoting innovation, digital commerce, and export opportunities.",
  "Building a competitive commercial ecosystem that benefits every citizen.",
];

export default function AboutSection() {
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
            About Us
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
            Welcome to the Anambra State Ministry of Commerce
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
            <p>
              The Anambra State Ministry of Commerce is the government institution responsible for promoting trade, commerce, investment, market development, and business growth across Anambra State. We serve as a bridge between government, businesses, investors, traders, manufacturers, and market associations, creating an enabling environment where commerce can thrive.
            </p>
            <p>
              As one of the key drivers of the state's economic development, the Ministry formulates and implements policies that encourage entrepreneurship, strengthen markets, attract investments, support small and medium-sized enterprises (SMEs), improve ease of doing business, and enhance commercial activities throughout the state.
            </p>
            <p>
              We work closely with market leaders, business organizations, financial institutions, development partners, and other government agencies to ensure that Anambra remains Nigeria's leading commercial destination and a preferred place to invest and do business. These responsibilities align with the Ministry's ongoing engagement with market associations and commercial stakeholders across the state.
            </p>
          </Box>
        </MotionBox>

        {/* Vision & Mission Section */}
        <Box id="mission-vision" sx={{ mb: { xs: 8, md: 12 } }}>
          <Grid container spacing={{ xs: 3, md: 6 }}>
            <Grid item xs={12} md={6}>
              <MotionBox
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                sx={{
                  backgroundColor: "white",
                  p: { xs: 3, md: 6 },
                  borderRadius: 3,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    fontFamily: "var(--font-poppins)",
                    color: accentColor,
                    mb: 3,
                    fontSize: { xs: "1.25rem", md: "1.5rem" },
                  }}
                >
                  Our Vision
                </Typography>
                <Typography
                  sx={{
                    color: "#666",
                    fontSize: { xs: "0.95rem", md: "1.05rem" },
                    lineHeight: 1.7,
                  }}
                >
                  To make Anambra State the foremost commercial and investment destination in Nigeria by fostering a vibrant, innovative, inclusive, and globally competitive business environment that creates sustainable wealth, employment, and economic prosperity for all citizens.
                </Typography>
              </MotionBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <MotionBox
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                sx={{
                  backgroundColor: "white",
                  p: { xs: 3, md: 6 },
                  borderRadius: 3,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    fontFamily: "var(--font-poppins)",
                    color: accentColor,
                    mb: 3,
                    fontSize: { xs: "1.25rem", md: "1.5rem" },
                  }}
                >
                  Our Mission
                </Typography>
                <Typography
                  sx={{
                    color: "#666",
                    fontSize: { xs: "0.95rem", md: "1.05rem" },
                    lineHeight: 1.7,
                  }}
                >
                  To formulate and implement policies that promote commerce, trade, investment, entrepreneurship, market development, and private sector growth through effective regulation, strategic partnerships, innovation, and excellent service delivery for the economic transformation of Anambra State.
                </Typography>
              </MotionBox>
            </Grid>
          </Grid>
        </Box>

        {/* Who We Are Section */}
        <Box id="history" sx={{ mb: { xs: 8, md: 12 } }}>
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
              Who We Are
            </Typography>
            <Box
              sx={{
                maxWidth: "1000px",
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
              <p>
                We are the Anambra State Ministry of Commerce, committed to driving economic development through the promotion of commerce, trade, investment, and enterprise development.
              </p>
              <p>
                Our Ministry exists to create opportunities for businesses of all sizes—from local traders and artisans to manufacturers, exporters, cooperatives, and international investors. We believe that a thriving commercial sector is the foundation of sustainable economic growth, job creation, and improved living standards.
              </p>
            </Box>
            <Box sx={{ mt: { xs: 4, md: 6 } }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  fontFamily: "var(--font-poppins)",
                  color: accentColor,
                  mb: 4,
                  textAlign: "center",
                  fontSize: { xs: "1.1rem", md: "1.25rem" },
                }}
              >
                We Are Dedicated To:
              </Typography>
              <Grid container spacing={{ xs: 2, md: 3 }}>
                {coreValues.map((value, index) => (
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
                        {value}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </MotionBox>
        </Box>

        {/* Our Team Section */}
        <Box id="our-team">
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              fontFamily: "var(--font-poppins)",
              color: "#333",
              mb: 2,
              textAlign: "center",
              fontSize: { xs: "1.5rem", md: "2rem" },
            }}
          >
            Our Team
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#666",
              mb: { xs: 6, md: 8 },
              textAlign: "center",
              maxWidth: "600px",
              margin: "0 auto",
              fontSize: { xs: "0.95rem", md: "1rem" },
              px: 2,
            }}
          >
            Meet the dedicated professionals leading the charge for economic development in Anambra State.
          </Typography>
          <Grid container spacing={{ xs: 3, md: 4 }}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={4} key={member.id}>
                <MotionCard
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    overflow: "hidden",
                    backgroundColor: "white",
                    textAlign: "center",
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      height: { xs: 300, md: 380 },
                      width: "100%",
                      backgroundColor: "#f5f5f5",
                    }}
                  >
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      style={{
                        objectFit: "contain",
                        objectPosition: "center top",
                      }}
                    />
                  </Box>
                  <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        fontFamily: "var(--font-poppins)",
                        color: "#333",
                        mb: 1,
                        fontSize: { xs: "1.1rem", md: "1.25rem" },
                      }}
                    >
                      {member.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: accentColor,
                        fontWeight: 600,
                        fontSize: { xs: "0.85rem", md: "0.95rem" },
                      }}
                    >
                      {member.position}
                    </Typography>
                  </CardContent>
                </MotionCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
