"use client";
import { Box, Container, Typography, Stack, Chip } from "@mui/material";
import { motion } from "framer-motion";
import { theme } from "@/theme";

const MotionStack = motion(Stack);

export default function Partners() {
  const partnerNames = [
    "ANIDA",
    "NIPC",
    "Bank of Industry",
    "Mantrac",
    "Dangote",
    "BOI",
    "AFREXIM",
    "NACCIMA",
  ];

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography
            variant="overline"
            sx={{
              color: theme.palette.text.secondary,
              fontWeight: 600,
              letterSpacing: 1,
              display: "block",
              mb: 1.5,
            }}
          >
            OUR PARTNERS
          </Typography>
          <Chip
            label="Partner logos awaiting official approval"
            size="small"
            sx={{
              backgroundColor: "#FFF3D6",
              color: "#996600",
              fontWeight: 600,
              fontSize: "0.75rem",
              fontFamily: "var(--font-poppins)",
              px: 0.8,
            }}
          />
        </Box>

        <MotionStack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={{ xs: 2, md: 4 }}
          flexWrap="wrap"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {partnerNames.map((name, idx) => (
            <Box
              key={`${name}-${idx}`}
              role="img"
              aria-label={`${name} logo placeholder`}
              sx={{
                width: { xs: 108, md: 156 },
                height: { xs: 64, md: 84 },
                backgroundColor: "#FFFDF5",
                borderRadius: 2.5,
                border: "1.5px dashed #E2E8F0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 1.5,
                textAlign: "center",
                transition: "all 0.25s ease",
                "&:hover": {
                  borderColor: "#FFAA00",
                  boxShadow: "0 4px 16px rgba(15, 23, 42, 0.08)",
                },
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  color: "#94A3B8",
                  fontFamily: "var(--font-poppins)",
                  fontSize: { xs: "0.78rem", md: "0.88rem" },
                  letterSpacing: 0.2,
                }}
              >
                {name}
              </Typography>
            </Box>
          ))}
        </MotionStack>
      </Container>
    </Box>
  );
}
