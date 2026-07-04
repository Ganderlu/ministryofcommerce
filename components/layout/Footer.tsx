"use client";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Stack,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import Image from "next/image";
import { footerLinks } from "@/data/seed";

export default function Footer() {
  const accentColor = "#D4AF37";

  return (
    <Box sx={{ backgroundColor: "#0F172A", pt: 12, pb: 6 }}>
      <Container maxWidth="xl">
        <Grid container spacing={8} sx={{ mb: 8 }}>
          {/* Column 1: Logo & About */}
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box sx={{ position: "relative", width: 70, height: 70 }}>
                  <Image
                    src="/images/anambralogo.jpg"
                    alt="Anambra State Logo"
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </Box>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "white",
                      fontWeight: 700,
                      fontFamily: "var(--font-poppins)",
                      lineHeight: 1.1,
                    }}
                  >
                    ANAMBRA STATE
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: accentColor,
                      fontWeight: 600,
                      fontFamily: "var(--font-poppins)",
                    }}
                  >
                    MINISTRY OF COMMERCE
                  </Typography>
                </Box>
              </Box>

              <Typography
                sx={{
                  color: "#94A3B8",
                  fontSize: "0.95rem",
                  lineHeight: 1.8,
                }}
              >
                The Ministry of Commerce is committed to promoting trade, investment, enterprise development, industrial growth, and consumer protection in Anambra State.
              </Typography>
            </Stack>
          </Grid>

          {/* Column 2: Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              sx={{
                color: "white",
                fontWeight: 600,
                mb: 3,
                fontFamily: "var(--font-poppins)",
                fontSize: "1.1rem",
              }}
            >
              Quick Links
            </Typography>
            <Stack spacing={2}>
              {footerLinks[0].links.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  underline="none"
                  sx={{
                    color: "#94A3B8",
                    fontSize: "0.95rem",
                    transition: "all 0.3s ease",
                    "&:hover": { color: accentColor },
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Column 3: Important Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              sx={{
                color: "white",
                fontWeight: 600,
                mb: 3,
                fontFamily: "var(--font-poppins)",
                fontSize: "1.1rem",
              }}
            >
              Important Links
            </Typography>
            <Stack spacing={2}>
              {footerLinks[1].links.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  underline="none"
                  sx={{
                    color: "#94A3B8",
                    fontSize: "0.95rem",
                    transition: "all 0.3s ease",
                    "&:hover": { color: accentColor },
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Column 4: Contact */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{
                color: "white",
                fontWeight: 600,
                mb: 3,
                fontFamily: "var(--font-poppins)",
                fontSize: "1.1rem",
              }}
            >
              Contact Us
            </Typography>

            <Stack spacing={3}>
              <Stack direction="row" spacing={2}>
                <Typography
                  sx={{
                    color: accentColor,
                    fontWeight: 600,
                    minWidth: 25,
                  }}
                >
                  📍
                </Typography>
                <Typography sx={{ color: "#94A3B8", fontSize: "0.95rem" }}>
                  Ministry of Commerce,
                  <br />
                  Government House Complex,
                  <br />
                  Awka, Anambra State, Nigeria
                </Typography>
              </Stack>

              <Stack direction="row" spacing={2}>
                <Typography
                  sx={{
                    color: accentColor,
                    fontWeight: 600,
                    minWidth: 25,
                  }}
                >
                  📞
                </Typography>
                <Typography sx={{ color: "#94A3B8", fontSize: "0.95rem" }}>
                  +234 (0) 813 423 4567
                </Typography>
              </Stack>

              <Stack direction="row" spacing={2}>
                <Typography
                  sx={{
                    color: accentColor,
                    fontWeight: 600,
                    minWidth: 25,
                  }}
                >
                  ✉️
                </Typography>
                <Typography sx={{ color: "#94A3B8", fontSize: "0.95rem" }}>
                  info@commerce.anambrastate.gov.ng
                </Typography>
              </Stack>

              <Stack direction="row" spacing={2}>
                <Typography
                  sx={{
                    color: accentColor,
                    fontWeight: 600,
                    minWidth: 25,
                  }}
                >
                  ⏰
                </Typography>
                <Typography sx={{ color: "#94A3B8", fontSize: "0.95rem" }}>
                  Mon - Fri: 8:00am - 4:00pm
                </Typography>
              </Stack>

              <Stack spacing={1.5} sx={{ mt: 2 }}>
                <Typography
                  sx={{
                    color: accentColor,
                    fontWeight: 600,
                    mb: 0.5,
                    fontFamily: "var(--font-poppins)",
                  }}
                >
                  Newsletter
                </Typography>
                <Typography sx={{ color: "#94A3B8", fontSize: "0.9rem" }}>
                  Subscribe to our newsletter to get latest updates.
                </Typography>
                <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                  <TextField
                    placeholder="Enter your email"
                    size="small"
                    fullWidth
                    sx={{
                      backgroundColor: "white",
                      borderRadius: 1,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 1,
                        "& fieldset": { border: "none" },
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: accentColor,
                      color: "black",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                      "&:hover": { backgroundColor: "#c49f2d" },
                    }}
                  >
                    Subscribe
                  </Button>
                </Box>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ backgroundColor: "rgba(148, 163, 184, 0.2)", mb: 4 }} />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={3}
        >
          <Typography sx={{ color: "#94A3B8", fontSize: "0.875rem" }}>
            © 2025 Anambra State Ministry of Commerce. All Rights Reserved.
          </Typography>
          <Stack direction="row" spacing={4}>
            <Link
              href="#"
              underline="none"
              sx={{
                color: "#94A3B8",
                fontSize: "0.875rem",
                transition: "all 0.3s ease",
                "&:hover": { color: accentColor },
              }}
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              underline="none"
              sx={{
                color: "#94A3B8",
                fontSize: "0.875rem",
                transition: "all 0.3s ease",
                "&:hover": { color: accentColor },
              }}
            >
              Terms of Use
            </Link>
            <Link
              href="#"
              underline="none"
              sx={{
                color: "#94A3B8",
                fontSize: "0.875rem",
                transition: "all 0.3s ease",
                "&:hover": { color: accentColor },
              }}
            >
              Site Map
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
