"use client";
import { Box, Container, Typography, Button, Stack, Avatar } from "@mui/material";
import { motion } from "framer-motion";
import { theme } from "@/theme";

const MotionBox = motion(Box);

export default function CTA() {
  const accentColor = "#D4AF37";
  
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
            <Avatar
              sx={{
                width: 70,
                height: 70,
                backgroundColor: "rgba(0,0,0,0.1)",
                border: "2px solid black",
              }}
            >
              <Typography
                sx={{ color: "black", fontWeight: "bold", fontSize: 24 }}
              >
                AS
              </Typography>
            </Avatar>
            <Box>
              <Typography
                variant="h4"
                sx={{
                  color: "black",
                  fontWeight: 700,
                  fontFamily: "var(--font-poppins)",
                }}
              >
                Ready to Grow Your Business or Invest in Anambra?
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "rgba(0,0,0,0.85)" }}
              >
                Get started today and join thousands of thriving businesses in Anambra State.
              </Typography>
            </Box>
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "black",
                color: "white",
                px: 3,
                py: 1.5,
                "&:hover": { backgroundColor: "#333" },
              }}
            >
              Register Your Business
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: "black",
                color: "black",
                px: 3,
                py: 1.5,
                "&:hover": {
                  borderColor: "black",
                  backgroundColor: "rgba(0,0,0,0.1)",
                },
              }}
            >
              Invest Now
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: "black",
                color: "black",
                px: 3,
                py: 1.5,
                "&:hover": {
                  borderColor: "black",
                  backgroundColor: "rgba(0,0,0,0.1)",
                },
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
