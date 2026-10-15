import type { Metadata } from "next";
import Link from "next/link";
import { Box, Container, Typography, Button, Stack } from "@mui/material";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Page Not Found (404)",
  description:
    "The page you are looking for could not be found on the Anambra State Ministry of Commerce portal.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  const accentColor = "#FFAA00";
  const primaryGreen = "#FFAA00";

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#FAFAFA" }}>
      <TopBar />
      <Navbar />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: { xs: 10, md: 16 },
          px: 2,
        }}
      >
        <Container maxWidth="md">
          <Stack
            spacing={5}
            alignItems="center"
            sx={{ textAlign: "center" }}
          >
            <Box>
              <Typography
                variant="h1"
                sx={{
                  fontFamily: "var(--font-poppins)",
                  fontWeight: 800,
                  fontSize: { xs: "6rem", md: "9rem" },
                  lineHeight: 1,
                  color: primaryGreen,
                  textShadow: "0 4px 20px rgba(255, 170, 0, 0.22)",
                  letterSpacing: "-0.02em",
                }}
              >
                404
              </Typography>
            </Box>

            <Stack spacing={2}>
              <Typography
                variant="h2"
                sx={{
                  fontFamily: "var(--font-poppins)",
                  fontWeight: 700,
                  fontSize: { xs: "1.5rem", md: "2.25rem" },
                  color: "#0F172A",
                }}
              >
                Page Not Found
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "1rem", md: "1.125rem" },
                  lineHeight: 1.8,
                  color: "#475569",
                  maxWidth: 620,
                  mx: "auto",
                }}
              >
                The page you are looking for does not exist, has been moved, or is
                temporarily unavailable. Please use the navigation below or return
                to the homepage to continue exploring the Anambra State Ministry of
                Commerce portal.
              </Typography>
            </Stack>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2.5}
              sx={{ mt: 2 }}
            >
              <Button
                component={Link}
                href="/"
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: primaryGreen,
                  color: "white",
                  px: 4.5,
                  py: 1.5,
                  borderRadius: 50,
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                  boxShadow: "0 8px 24px rgba(255, 170, 0, 0.25)",
                  "&:hover": {
                    backgroundColor: "#CC8800",
                    transform: "translateY(-1px)",
                    boxShadow: "0 12px 30px rgba(255, 170, 0, 0.3)",
                  },
                  transition: "all 0.25s ease",
                }}
              >
                Back to Homepage
              </Button>
              <Button
                component={Link}
                href="/search"
                variant="outlined"
                size="large"
                sx={{
                  borderColor: primaryGreen,
                  color: primaryGreen,
                  px: 4.5,
                  py: 1.5,
                  borderRadius: 50,
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                  borderWidth: 2,
                  "&:hover": {
                    borderColor: primaryGreen,
                    backgroundColor: "rgba(255, 170, 0, 0.04)",
                    transform: "translateY(-1px)",
                    borderWidth: 2,
                  },
                  transition: "all 0.25s ease",
                }}
              >
                Search the Site
              </Button>
            </Stack>

            <Box
              sx={{
                mt: 4,
                pt: 5,
                width: "100%",
                maxWidth: 620,
                borderTop: "1px solid #E2E8F0",
              }}
            >
              <Typography
                variant="overline"
                sx={{
                  display: "block",
                  fontWeight: 700,
                  color: accentColor,
                  letterSpacing: 1.2,
                  mb: 2.5,
                  fontSize: "0.8rem",
                }}
              >
                Popular Destinations
              </Typography>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1.5, sm: 4 }}
                justifyContent="center"
                flexWrap="wrap"
              >
                {[
                  { href: "/services/business-registration", label: "Business Registration" },
                  { href: "/services/sme-registration", label: "SME Registration" },
                  { href: "/services/cooperative-registration", label: "Cooperative Registration" },
                  { href: "/departments/investment-promotion", label: "Invest in Anambra" },
                  { href: "/media", label: "News & Events" },
                  { href: "/contact", label: "Contact Us" },
                ].map((item) => (
                  <Button
                    key={item.href}
                    component={Link}
                    href={item.href}
                    size="small"
                    sx={{
                      color: "#475569",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      textTransform: "none",
                      "&:hover": {
                        color: primaryGreen,
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
