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
import { useState } from "react";
import { db, addDoc, collection, serverTimestamp } from "@/firebase/clients";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setSnackbar({
        open: true,
        message: "Please enter your email address",
        severity: "error",
      });
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "newsletter_subscribers"), {
        email,
        timestamp: serverTimestamp(),
      });
      setSnackbar({
        open: true,
        message: "Successfully subscribed to the newsletter!",
        severity: "success",
      });
      setEmail("");
    } catch (error) {
      console.error("Error subscribing:", error);
      setSnackbar({
        open: true,
        message: "Something went wrong. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box sx={{ py: 10, backgroundColor: "#D4AF37" }}>
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
                    backgroundColor: "rgba(212, 175, 55, 0.2)",
                    color: "#D4AF37",
                  }}
                >
                  <Email sx={{ fontSize: 30 }} />
                </Avatar>
                <Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 800,
                      color: "black",
                      fontFamily: "var(--font-poppins)",
                    }}
                  >
                    Stay Updated
                  </Typography>
                </Box>
              </Box>
              <Typography
                sx={{
                  color: "rgba(0,0,0,0.85)",
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
              sx={{
                flex: 1,
                maxWidth: "600px",
                width: "100%",
              }}
            >
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                }}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    backgroundColor: "white",
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
                  sx={{
                    backgroundColor: "black",
                    color: "#D4AF37",
                    fontWeight: 700,
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: "none",
                    whiteSpace: "nowrap",
                    "&:hover": { backgroundColor: "#1E293B" },
                    "&:disabled": { backgroundColor: "#334155" },
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
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
