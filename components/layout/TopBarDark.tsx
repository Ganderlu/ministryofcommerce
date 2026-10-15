"use client";
import { Box, Container, Typography, IconButton, Stack, Tooltip } from "@mui/material";
import { Facebook, Twitter, Instagram, Email, Phone } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";

export default function TopBarDark() {
  return (
    <Box sx={{ backgroundColor: "#000000", py: 1.5 }}>
      <Container maxWidth="xl">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent={{ xs: "center", sm: "flex-end" }}
          alignItems={{ xs: "center", sm: "center" }}
          spacing={{ xs: 1, sm: 3 }}
        >
          <Link
              href="mailto:commerce@anambrastate.gov.ng"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              <Stack direction="row" alignItems="center" spacing={0.8}>
                <Email sx={{ color: "#ffffff", fontSize: { xs: 16, sm: 18 } }} />
                <Typography
                  variant="body2"
                  sx={{
                    color: "#ffffff",
                    fontSize: { xs: "0.78rem", sm: "0.85rem" },
                    fontWeight: 550,
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  commerce@anambrastate.gov.ng
                </Typography>
              </Stack>
            </Link>

            <Link
              href="tel:+2348134234567"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              <Stack direction="row" alignItems="center" spacing={0.8}>
                <Phone sx={{ color: "#ffffff", fontSize: { xs: 16, sm: 18 } }} />
                <Typography
                  variant="body2"
                  sx={{
                    color: "#ffffff",
                    fontSize: { xs: "0.78rem", sm: "0.85rem" },
                    fontWeight: 550,
                    whiteSpace: "nowrap",
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  +234 (0) 813 423 4567
                </Typography>
              </Stack>
            </Link>

            <Stack direction="row" spacing={{ xs: 0.5, sm: 1 }}>
              <Tooltip title="Facebook (official link pending)" placement="bottom">
                <span>
                  <IconButton
                    size="small"
                    disabled
                    aria-disabled="true"
                    aria-label="Facebook page — link pending"
                    sx={{
                      color: "rgba(255,255,255,0.62)",
                      padding: 0.5,
                      cursor: "default",
                      bgcolor: "transparent",
                      borderRadius: "50%",
                      transition: "background-color 0.25s ease, color 0.25s ease",
                      "&.Mui-disabled": {
                        color: "rgba(255,255,255,0.55)",
                        bgcolor: "transparent",
                      },
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.22)",
                        color: "rgba(255,255,255,0.92)",
                      },
                    }}
                  >
                    <Facebook fontSize="small" />
                  </IconButton>
                </span>
              </Tooltip>
              <Tooltip title="Twitter/X (official link pending)" placement="bottom">
                <span>
                  <IconButton
                    size="small"
                    disabled
                    aria-disabled="true"
                    aria-label="Twitter/X page — link pending"
                    sx={{
                      color: "rgba(255,255,255,0.62)",
                      padding: 0.5,
                      cursor: "default",
                      bgcolor: "transparent",
                      borderRadius: "50%",
                      transition: "background-color 0.25s ease, color 0.25s ease",
                      "&.Mui-disabled": {
                        color: "rgba(255,255,255,0.55)",
                        bgcolor: "transparent",
                      },
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.22)",
                        color: "rgba(255,255,255,0.92)",
                      },
                    }}
                  >
                    <Twitter fontSize="small" />
                  </IconButton>
                </span>
              </Tooltip>
              <Tooltip title="LET Platform (official link pending)" placement="bottom">
                <span>
                  <IconButton
                    size="small"
                    disabled
                    aria-disabled="true"
                    aria-label="LET Platform — link pending"
                    sx={{
                      color: "rgba(255,255,255,0.62)",
                      padding: 0.5,
                      cursor: "default",
                      bgcolor: "transparent",
                      borderRadius: "50%",
                      transition: "background-color 0.25s ease, color 0.25s ease",
                      "&.Mui-disabled": {
                        color: "rgba(255,255,255,0.55)",
                        bgcolor: "transparent",
                      },
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.22)",
                        color: "rgba(255,255,255,0.92)",
                      },
                    }}
                  >
                    <Image
                      src="/images/let.png"
                      alt="LET Platform — official link pending"
                      width={20}
                      height={20}
                      style={{
                        objectFit: "contain",
                        opacity: 0.62,
                        filter: "brightness(0) invert(1)",
                      }}
                    />
                  </IconButton>
                </span>
              </Tooltip>
              <Tooltip title="Instagram (official link pending)" placement="bottom">
                <span>
                  <IconButton
                    size="small"
                    disabled
                    aria-disabled="true"
                    aria-label="Instagram page — link pending"
                    sx={{
                      color: "rgba(255,255,255,0.62)",
                      padding: 0.5,
                      cursor: "default",
                      bgcolor: "transparent",
                      borderRadius: "50%",
                      transition: "background-color 0.25s ease, color 0.25s ease",
                      "&.Mui-disabled": {
                        color: "rgba(255,255,255,0.55)",
                        bgcolor: "transparent",
                      },
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.22)",
                        color: "rgba(255,255,255,0.92)",
                      },
                    }}
                  >
                    <Instagram fontSize="small" />
                  </IconButton>
                </span>
              </Tooltip>
            </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
