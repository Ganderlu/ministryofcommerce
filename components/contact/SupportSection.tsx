"use client";
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Avatar,
  Grid,
} from "@mui/material";
import { motion } from "framer-motion";
import { HeadsetMic, Phone } from "@mui/icons-material";
import { socialLinks } from "@/data/seed";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

export default function SupportSection() {
  return (
    <Box sx={{ py: 12, backgroundColor: "white" }}>
      <Container maxWidth="xl">
        <Grid container spacing={6} alignItems="center">
          {/* Left: Immediate Support */}
          <Grid item xs={12} lg={6}>
            <MotionBox
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              sx={{
                background: "linear-gradient(135deg, #D4AF37 0%, #C49F2D 100%)",
                borderRadius: 4,
                p: { xs: 4, md: 6 },
                color: "black",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    backgroundColor: "rgba(255,255,255,0.15)",
                    mr: 3,
                  }}
                >
                  <HeadsetMic sx={{ fontSize: 40 }} />
                </Avatar>
              </Box>

              <Typography
                variant="h4"
                sx={{
                  mb: 2,
                  fontWeight: 800,
                  fontFamily: "var(--font-poppins)",
                }}
              >
                Need Immediate Assistance?
              </Typography>

              <Typography
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  lineHeight: 1.8,
                  fontSize: "1.05rem",
                }}
              >
                Our support team is available during office hours to assist
                businesses, investors, citizens, and partners.
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                <MotionButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: "black",
                    color: "#D4AF37",
                    fontWeight: 700,
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: "none",
                    "&:hover": { backgroundColor: "#1E293B" },
                  }}
                  startIcon={<HeadsetMic />}
                >
                  Start Live Chat
                </MotionButton>

                <MotionButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: "black",
                    color: "black",
                    fontWeight: 700,
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: "none",
                    "&:hover": {
                      borderColor: "black",
                      backgroundColor: "rgba(0,0,0,0.1)",
                    },
                  }}
                  startIcon={<Phone />}
                >
                  Call Us Now
                </MotionButton>
              </Box>
            </MotionBox>
          </Grid>

          {/* Right: Connect With Us */}
          <Grid item xs={12} lg={6}>
            <MotionBox
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              sx={{
                backgroundColor: "white",
                borderRadius: 4,
                p: { xs: 4, md: 6 },
                border: "1px solid #E2E8F0",
              }}
            >
              <Box
                sx={{
                  borderLeft: "4px solid #D4AF37",
                  pl: 3,
                  mb: 4,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 800,
                    color: "#1E293B",
                    fontFamily: "var(--font-poppins)",
                    mb: 1,
                  }}
                >
                  Connect With Us
                </Typography>
                <Typography sx={{ color: "#64748B", lineHeight: 1.7 }}>
                  Follow us on our social media channels to stay updated on our
                  latest news, programmes and opportunities.
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                {socialLinks.map((social) => (
                  <IconButton
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      backgroundColor: "#F8FAFC",
                      color: "#1E293B",
                      "&:hover": {
                        backgroundColor: "#D4AF37",
                        color: "black",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    <social.icon sx={{ fontSize: 26 }} />
                  </IconButton>
                ))}
              </Box>
            </MotionBox>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
