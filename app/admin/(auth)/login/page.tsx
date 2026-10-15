"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { signInWithEmailAndPassword, auth } from "@/firebase/clients";

const primaryGreen = "#FFAA00";

function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // 1. Sign in with Firebase Auth (client).
      const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
      const idToken = await credential.user.getIdToken();

      // 2. Exchange the short-lived ID token for a long-lived session cookie.
      const res = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Sign-in failed");
      }

      // 3. Redirect to the originally requested admin page.
      // Use a full page navigation (window.location) so the freshly-set
      // __session cookie is guaranteed to be sent with the request.
      // router.push + router.refresh can race and abort the in-flight
      // session fetch, leaving the cookie unset.
      window.location.href = next;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 3,
        p: { xs: 3, md: 5 },
        boxShadow: "0 10px 30px rgba(15, 23, 42, 0.12)",
      }}
    >
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Stack spacing={2.5}>
        <TextField
          id="admin-email"
          label="Email Address"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email sx={{ color: "#94A3B8" }} />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          id="admin-password"
          label="Password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock sx={{ color: "#94A3B8" }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((s) => !s)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={loading}
          sx={{
            backgroundColor: primaryGreen,
            color: "white",
            py: 1.4,
            borderRadius: 2,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 0.5,
            boxShadow: "0 8px 24px rgba(255, 170, 0, 0.25)",
            "&:hover": { backgroundColor: "#CC8800" },
            "&:disabled": { backgroundColor: "#94A3B8" },
          }}
        >
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </Stack>
    </Box>
  );
}

export default function AdminLoginPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F1F5F9",
        py: 8,
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Stack spacing={4} alignItems="center">
          <Stack spacing={1} alignItems="center" sx={{ textAlign: "center" }}>
            <Typography
              variant="h1"
              sx={{
                fontFamily: "var(--font-poppins)",
                fontWeight: 800,
                fontSize: { xs: "1.75rem", md: "2.25rem" },
                color: "#0F172A",
              }}
            >
              Admin Sign In
            </Typography>
            <Typography sx={{ color: "#64748B", fontSize: "0.95rem" }}>
              Anambra State Ministry of Commerce — Integrated Digital Portal
            </Typography>
          </Stack>

          <Suspense
            fallback={
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress sx={{ color: primaryGreen }} />
              </Box>
            }
          >
            <LoginForm />
          </Suspense>

          <Typography sx={{ color: "#94A3B8", fontSize: "0.8rem", textAlign: "center" }}>
            Authorised personnel only. All access is logged and monitored.
            <br />
            <Link href="/" style={{ color: primaryGreen, fontWeight: 600 }}>
              Return to homepage
            </Link>
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

