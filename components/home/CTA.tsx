"use client";
import { Box, Container, Typography, Button, Stack } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const MotionBox = motion(Box);

export default function CTA() {
  const accentColor = "#FFAA00";

  return (
    <Box sx={{ py: 8, backgroundColor: accentColor }}>
      <Container maxWidth="xl">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={3}>
            <Image
              src="/images/Anambra State Government Seal.png"
              alt="Anambra State Government Seal"
              width={70}
              height={70}
              style={{ objectFit: "contain" }}
            />
            <Box>
              <Typography
                variant="h4"
                sx={{
                  color: "black",
                  fontWeight: 700,
                  fontFamily: "var(--font-poppins)",
                  fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" },
                }}
              >
                Ready to Grow Your Business or Invest in Anambra?
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "rgba(0,0,0,0.85)", mt: 0.5 }}
              >
                Get started today and join thousands of thriving businesses in Anambra State.
              </Typography>
            </Box>
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button
              component={Link}
              href="/services/business-registration"
              variant="contained"
              sx={{
                backgroundColor: "black",
                color: "white",
                px: 3,
                py: 1.5,
                fontWeight: 600,
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(15,23,42,0.18)",
                "&:hover": {
                  backgroundColor: "#1a1a1a",
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 16px rgba(15,23,42,0.24)",
                },
                transition: "all 0.2s ease",
              }}
            >
              Register Your Business
            </Button>
            <Button
              component={Link}
              href="/invest-in-anambra"
              variant="outlined"
              sx={{
                borderColor: "black",
                color: "black",
                px: 3,
                py: 1.5,
                fontWeight: 600,
                borderRadius: 2,
                borderWidth: 2,
                "&:hover": {
                  borderColor: "black",
                  backgroundColor: "rgba(0,0,0,0.08)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(15,23,42,0.12)",
                },
                transition: "all 0.2s ease",
              }}
            >
              Invest Now
            </Button>
            <Button
              component={Link}
              href="/contact"
              variant="outlined"
              sx={{
                borderColor: "black",
                color: "black",
                px: 3,
                py: 1.5,
                fontWeight: 600,
                borderRadius: 2,
                borderWidth: 2,
                "&:hover": {
                  borderColor: "black",
                  backgroundColor: "rgba(0,0,0,0.08)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(15,23,42,0.12)",
                },
                transition: "all 0.2s ease",
              }}
            >
              Contact Us
            </Button>
          </Stack>
        </MotionBox>
      </Container>
    </Box>
  );
}
