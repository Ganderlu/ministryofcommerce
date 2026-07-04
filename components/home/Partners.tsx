"use client";
import { Box, Container, Typography, Avatar, Stack } from "@mui/material";
import { motion } from "framer-motion";
import { theme } from "@/theme";
import { partners } from "@/data/seed";

const MotionStack = motion(Stack);

export default function Partners() {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="xl">
        <Typography
          variant="overline"
          sx={{
            color: theme.palette.text.secondary,
            fontWeight: 600,
            letterSpacing: 1,
            display: "block",
            textAlign: "center",
            mb: 2,
          }}
        >
          OUR PARTNERS
        </Typography>

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
          {partners.map((partner) => (
            <Box
              key={partner.id}
              sx={{
                width: { xs: 100, md: 140 },
                height: { xs: 60, md: 80 },
                backgroundColor: "white",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  color: theme.palette.text.secondary,
                  fontFamily: "var(--font-poppins)",
                }}
              >
                {partner.name}
              </Typography>
            </Box>
          ))}
        </MotionStack>
      </Container>
    </Box>
  );
}
