"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Box, Container, Typography, Button, Stack } from "@mui/material";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error("Application error:", error);
    }
  }, [error]);

  const accentColor = "#FFAA00";
  const primaryGreen = "#FFAA00";

  return (
    <html lang="en">
      <body>
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FAFAFA",
            py: { xs: 8, md: 12 },
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
                    fontSize: { xs: "5rem", md: "7rem" },
                    lineHeight: 1,
                    color: "#B91C1C",
                    textShadow: "0 4px 20px rgba(185, 28, 28, 0.22)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  500
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
                  Something Went Wrong
                </Typography>
                <Typography
                  variant="body1"
                  role="alert"
                  aria-live="assertive"
                  sx={{
                    fontSize: { xs: "1rem", md: "1.125rem" },
                    lineHeight: 1.8,
                    color: "#475569",
                    maxWidth: 620,
                    mx: "auto",
                  }}
                >
                  An unexpected error occurred while processing your request. Our
                  technical team has been notified. You may try again in a few
                  moments or return to the homepage.
                </Typography>
              </Stack>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2.5}
                sx={{ mt: 2 }}
              >
                <Button
                  onClick={reset}
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
                  Try Again
                </Button>
                <Button
                  component={Link}
                  href="/"
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
                  Back to Homepage
                </Button>
              </Stack>

              <Box
                sx={{
                  mt: 4,
                  pt: 4,
                  px: 3,
                  py: 2,
                  borderRadius: 2,
                  backgroundColor: "rgba(185, 28, 28, 0.04)",
                  border: "1px solid rgba(185, 28, 28, 0.1)",
                  maxWidth: 620,
                  width: "100%",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    fontWeight: 600,
                    color: "#B91C1C",
                    letterSpacing: 0.5,
                    mb: 0.5,
                  }}
                >
                  If the problem persists
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#64748B", fontSize: "0.875rem", lineHeight: 1.6 }}
                >
                  Please contact the ICT support unit at{" "}
                  <Link
                    href="mailto:support@commerce.anambrastate.gov.ng"
                    style={{ color: primaryGreen, fontWeight: 600 }}
                  >
                    support@commerce.anambrastate.gov.ng
                  </Link>{" "}
                  and include any details about the action you were attempting.
                </Typography>
              </Box>
            </Stack>
          </Container>
        </Box>
      </body>
    </html>
  );
}
