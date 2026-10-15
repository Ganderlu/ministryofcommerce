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
  CircularProgress,
} from "@mui/material";
import Image from "next/image";
import { footerLinks } from "@/data/seed";
import { useState, FormEvent } from "react";

type NewsletterStatus =
  | "idle"
  | "loading"
  | "success"
  | "validation_error"
  | "network_error"
  | "server_error";

const EMAIL_REGEX =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

function isDisabledPlaceholder(href: string | undefined | null): boolean {
  if (!href) return true;
  if (href === "#") return true;
  if (href.trim() === "") return true;
  return false;
}

export default function Footer() {
  const accentColor = "#CC8800";
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<NewsletterStatus>("idle");
  const [userMessage, setUserMessage] = useState("");
  const emailInputId = "footer-newsletter-email";
  const messageId = "footer-newsletter-message";

  const updateSubscribeDisabled =
    status === "loading" || status === "success";

  async function handleSubscribeSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading" || status === "success") return;

    const trimmed = email.trim();
    if (!trimmed) {
      setStatus("validation_error");
      setUserMessage("Please enter your email address.");
      return;
    }
    if (!EMAIL_REGEX.test(trimmed.toLowerCase())) {
      setStatus("validation_error");
      setUserMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setUserMessage("");

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmed,
          source: "footer_newsletter",
        }),
      });

      let data: { ok?: boolean; status?: string; message?: string; error?: string } =
        {};
      try {
        data = (await res.json()) as typeof data;
      } catch {
        data = {};
      }

      if (res.ok && data.ok) {
        setStatus("success");
        setUserMessage(
          data.message || "Thank you! You've been subscribed successfully."
        );
        setEmail("");
      } else if (res.status === 429) {
        setStatus("server_error");
        setUserMessage(
          data.error ||
            "You've tried too many times recently. Please try again in a few minutes."
        );
      } else if (res.status === 400) {
        setStatus("validation_error");
        setUserMessage(data.error || "Please enter a valid email address.");
      } else {
        setStatus("server_error");
        setUserMessage(
          data.error ||
            "Something went wrong on our end. Please try again later."
        );
      }
    } catch {
      setStatus("network_error");
      setUserMessage(
        "We couldn't reach the server. Please check your connection and try again."
      );
    }
  }

  const helperTextColor =
    status === "validation_error"
      ? "#FECACA"
      : status === "network_error" || status === "server_error"
        ? "#FECACA"
        : status === "success"
          ? "#FFE9B3"
          : "#CBD5E1";

  const hasError =
    status === "validation_error" ||
    status === "network_error" ||
    status === "server_error";

  return (
    <Box
      component="footer"
      role="contentinfo"
      sx={{ backgroundColor: "#0F172A", pt: 12, pb: 6 }}
    >
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
                    sizes="70px"
                    style={{ objectFit: "contain" }}
                    loading="lazy"
                  />
                </Box>
                <Box>
                  <Typography
                    variant="h6"
                    component="p"
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
                    component="p"
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
              variant="h4"
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
              {footerLinks[0].links.map((link, idx) => {
                const disabled = isDisabledPlaceholder(link.href);
                const external = isExternalHref(link.href);
                return (
                  <Link
                    key={idx}
                    href={disabled ? undefined : link.href}
                    underline="none"
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    sx={{
                      color: "#94A3B8",
                      fontSize: "0.95rem",
                      transition: "all 0.3s ease",
                      pointerEvents: disabled ? "none" : "auto",
                      cursor: disabled ? "default" : "pointer",
                      opacity: disabled ? 0.55 : 1,
                      textDecoration: disabled ? "line-through" : "none",
                      "&:hover": { color: accentColor },
                    }}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </Stack>
          </Grid>

          {/* Column 3: Important Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h4"
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
              {footerLinks[1].links.map((link, idx) => {
                const disabled = isDisabledPlaceholder(link.href);
                const external = isExternalHref(link.href);
                return (
                  <Link
                    key={idx}
                    href={disabled ? undefined : link.href}
                    underline="none"
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    sx={{
                      color: "#94A3B8",
                      fontSize: "0.95rem",
                      transition: "all 0.3s ease",
                      pointerEvents: disabled ? "none" : "auto",
                      cursor: disabled ? "default" : "pointer",
                      opacity: disabled ? 0.55 : 1,
                      textDecoration: disabled ? "line-through" : "none",
                      "&:hover": { color: accentColor },
                    }}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </Stack>
          </Grid>

          {/* Column 4: Contact */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h4"
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
                <Link
                  href="tel:+2348134234567"
                  underline="none"
                  sx={{
                    color: "#94A3B8",
                    fontSize: "0.95rem",
                    transition: "color 0.3s ease",
                    "&:hover": { color: accentColor },
                  }}
                >
                  +234 (0) 813 423 4567
                </Link>
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
                <Link
                  href="mailto:commerce@anambrastate.gov.ng"
                  underline="none"
                  sx={{
                    color: "#94A3B8",
                    fontSize: "0.95rem",
                    transition: "color 0.3s ease",
                    "&:hover": { color: accentColor },
                  }}
                >
                  commerce@anambrastate.gov.ng
                </Link>
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

              <Stack
                component="form"
                onSubmit={handleSubscribeSubmit}
                noValidate
                spacing={1.5}
                sx={{ mt: 2 }}
              >
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
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 1,
                    mt: 1,
                  }}
                >
                  <TextField
                    id={emailInputId}
                    type="email"
                    label="Newsletter Email"
                    placeholder="name@example.com"
                    size="small"
                    fullWidth
                    required
                    value={email}
                    disabled={updateSubscribeDisabled}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "validation_error") {
                        setStatus("idle");
                        setUserMessage("");
                      }
                    }}
                    error={hasError}
                    aria-invalid={hasError || undefined}
                    aria-required="true"
                    aria-describedby={userMessage ? messageId : undefined}
                    sx={{
                      backgroundColor: "#FFFDF5",
                      borderRadius: 1,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 1,
                        "& fieldset": { border: "none" },
                      },
                      "&.Mui-disabled": {
                        backgroundColor: "#E2E8F0",
                      },
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={updateSubscribeDisabled}
                    endIcon={
                      status === "loading" ? (
                        <CircularProgress
                          size={14}
                          sx={{ color: "#0F172A" }}
                        />
                      ) : undefined
                    }
                    sx={{
                      backgroundColor: accentColor,
                      color: "#0F172A",
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                      px: 2.25,
                      minHeight: 40,
                      "&:hover": { backgroundColor: "#c49f2d" },
                      "&.Mui-disabled": {
                        backgroundColor: "#996600",
                        color: "#0F172A",
                        opacity: 0.7,
                      },
                    }}
                  >
                    {status === "loading"
                      ? "Subscribing…"
                      : status === "success"
                        ? "Subscribed ✓"
                        : "Subscribe"}
                  </Button>
                </Box>
                {userMessage ? (
                  <Typography
                    id={messageId}
                    role={
                      status === "success" ? "status" : "alert"
                    }
                    aria-live="polite"
                    sx={{
                      fontSize: "0.82rem",
                      color: helperTextColor,
                      fontWeight: 550,
                      lineHeight: 1.5,
                      minHeight: 0,
                    }}
                  >
                    {userMessage}
                  </Typography>
                ) : null}
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
              href="/privacy"
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
              href="/terms"
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
              href="/sitemap.xml"
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
