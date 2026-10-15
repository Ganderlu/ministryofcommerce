"use client";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Avatar,
  Snackbar,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import { Email, Send } from "@mui/icons-material";
import { useState, useId } from "react";
import { db, addDoc, collection, serverTimestamp } from "@/firebase/clients";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldError, setFieldError] = useState("");
  const [touched, setTouched] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const emailId = useId();
  const errorId = `${emailId}-error`;
  const helperId = `${emailId}-helper`;

  const validateEmail = (val: string): string => {
    const trimmed = val.trim();
    if (!trimmed) return "Please enter your email address.";
    if (!EMAIL_REGEX.test(trimmed.toLowerCase()))
      return "Please enter a valid email address (e.g. name@example.com).";
    return "";
  };

  const handleBlur = () => {
    setTouched(true);
    setFieldError(validateEmail(email));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (touched || fieldError) {
      setFieldError(validateEmail(e.target.value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const err = validateEmail(email);
    if (err) {
      setFieldError(err);
      setSnackbar({
        open: true,
        message: err,
        severity: "error",
      });
      return;
    }
    setFieldError("");

    setLoading(true);
    try {
      await addDoc(collection(db, "newsletter_subscribers"), {
        email: email.trim(),
        timestamp: serverTimestamp(),
      });
      setSnackbar({
        open: true,
        message: "Successfully subscribed to the newsletter!",
        severity: "success",
      });
      setEmail("");
      setTouched(false);
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error subscribing:", error);
      }
      setSnackbar({
        open: true,
        message: "Something went wrong. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const hasError = Boolean(fieldError);

  return (
    <>
      <Box sx={{ py: 10, backgroundColor: "#CC8800" }} role="region" aria-labelledby="newsletter-heading">
        <Container maxWidth="xl">
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "flex-start", md: "center" },
              gap: { xs: 4, md: 8 },
            }}
          >
            {/* Left Content */}
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    backgroundColor: "rgba(0,0,0,0.15)",
                    color: "#0F172A",
                  }}
                >
                  <Email sx={{ fontSize: 30 }} />
                </Avatar>
                <Box>
                  <Typography
                    id="newsletter-heading"
                    variant="h4"
                    sx={{
                      fontWeight: 800,
                      color: "#0F172A",
                      fontFamily: "var(--font-poppins)",
                    }}
                  >
                    Stay Updated
                  </Typography>
                </Box>
              </Box>
              <Typography
                id={helperId}
                sx={{
                  color: "#0F172A",
                  fontSize: "1.1rem",
                  lineHeight: 1.8,
                  maxWidth: "500px",
                }}
              >
                Subscribe for Ministry news, investment opportunities, policy
                updates, programmes, and events.
              </Typography>
            </Box>

            {/* Right: Form */}
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              aria-describedby={helperId}
              sx={{
                flex: 1,
                maxWidth: "600px",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                }}
              >
                <TextField
                  id={emailId}
                  type="email"
                  label="Email Address"
                  fullWidth
                  variant="outlined"
                  placeholder="name@example.com"
                  value={email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  error={hasError}
                  aria-invalid={hasError || undefined}
                  aria-required="true"
                  aria-describedby={hasError ? errorId : helperId}
                  helperText={hasError ? fieldError : undefined}
                  FormHelperTextProps={{
                    id: hasError ? errorId : undefined,
                    role: hasError ? "alert" : undefined,
                    sx: { color: "#7F1D1D", fontWeight: 550 },
                  }}
                  sx={{
                    backgroundColor: "#FFFDF5",
                    borderRadius: 2,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "& fieldset": { border: "none" },
                    },
                  }}
                  disabled={loading}
                />
                <MotionButton
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  aria-describedby={helperId}
                  sx={{
                    backgroundColor: "#0F172A",
                    color: "#FFE9B3",
                    fontWeight: 700,
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: "none",
                    whiteSpace: "nowrap",
                    minHeight: 56,
                    "&:hover": { backgroundColor: "#1E293B" },
                    "&:disabled": { backgroundColor: "#334155", color: "#CBD5E1" },
                  }}
                  endIcon={<Send />}
                >
                  {loading ? "Subscribing..." : "Subscribe"}
                </MotionButton>
              </Box>
            </Box>
          </MotionBox>
        </Container>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          role={snackbar.severity === "success" ? "status" : "alert"}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
