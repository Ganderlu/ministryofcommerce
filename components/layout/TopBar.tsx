"use client";
import { Box, Container, Typography, IconButton, Stack } from "@mui/material";
import { Facebook, Twitter, Instagram, Email, Phone } from "@mui/icons-material";
import Image from "next/image";

export default function TopBar() {
  return (
    <Box sx={{ backgroundColor: "#D4AF37", py: 1.5 }}>
      <Container maxWidth="xl">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "center", sm: "center" }}
          spacing={{ xs: 1.5, sm: 2 }}
        >
          {/* Left: Welcome Message */}
          <Typography
            variant="body2"
            sx={{
              color: "black",
              fontSize: { xs: "0.8rem", sm: "0.875rem" },
              fontWeight: 500,
              textAlign: "center",
            }}
          >
            Welcome to Anambra State Ministry of Commerce
          </Typography>

          {/* Right: Contact & Socials */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "center", sm: "center" }}
            spacing={{ xs: 1, sm: 3 }}
          >
            {/* Email */}
            <Stack direction="row" alignItems="center" spacing={0.8}>
              <Email sx={{ color: "black", fontSize: { xs: 16, sm: 18 } }} />
              <Typography
                variant="body2"
                sx={{
                  color: "black",
                  fontSize: { xs: "0.78rem", sm: "0.85rem" },
                  fontWeight: 500,
                }}
              >
                info@commerce.anambrastate.gov.ng
              </Typography>
            </Stack>

            {/* Phone */}
            <Stack direction="row" alignItems="center" spacing={0.8}>
              <Phone sx={{ color: "black", fontSize: { xs: 16, sm: 18 } }} />
              <Typography
                variant="body2"
                sx={{
                  color: "black",
                  fontSize: { xs: "0.78rem", sm: "0.85rem" },
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                }}
              >
                +234 (0) 813 423 4567
              </Typography>
            </Stack>

            {/* Social Icons */}
            <Stack direction="row" spacing={{ xs: 0.5, sm: 1 }}>
              <IconButton
                size="small"
                sx={{
                  color: "black",
                  padding: 0.5,
                  "&:hover": { backgroundColor: "rgba(0,0,0,0.08)" },
                }}
              >
                <Facebook fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  color: "black",
                  padding: 0.5,
                  "&:hover": { backgroundColor: "rgba(0,0,0,0.08)" },
                }}
              >
                <Twitter fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  color: "black",
                  padding: 0.5,
                  "&:hover": { backgroundColor: "rgba(0,0,0,0.08)" },
                }}
              >
                <Image
                  src="/images/let.png"
                  alt="LET"
                  width={20}
                  height={20}
                  style={{ objectFit: "contain" }}
                />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  color: "black",
                  padding: 0.5,
                  "&:hover": { backgroundColor: "rgba(0,0,0,0.08)" },
                }}
              >
                <Instagram fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
