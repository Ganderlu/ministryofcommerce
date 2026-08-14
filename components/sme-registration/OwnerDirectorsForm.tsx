"use client";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Grid,
  Button,
  Stack,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import { ArrowBack, ArrowForward, Add, Close } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { z } from "zod";
import type { SMEOwnerDirector } from "@/types";

const MotionCard = motion(Card);
const MotionBox = motion(Box);

const STORAGE_KEY = "sme_registration_step2_draft";

const genders = ["Male", "Female", "Other"];
const nationalities = ["Nigerian", "Ghanaian", "Kenyan", "South African", "British", "Other"];
const idTypes = [
  "National Identity Card (NIN)",
  "International Passport",
  "Driver's License",
  "Voter's Card",
  "PVC",
];
const occupations = [
  "Business Owner",
  "Director",
  "Entrepreneur",
  "Professional",
  "Trader",
  "Farmer",
  "Other",
];
const positions = [
  "Owner",
  "Proprietor",
  "CEO",
  "Managing Director",
  "Director",
  "Partner",
  "Other",
];

const ownerDirectorSchema = z.object({
  id: z.string(),
  fullName: z.string().min(2, "Full name is required"),
  gender: z.string().min(1, "Gender is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  nationality: z.string().min(1, "Nationality is required"),
  meansOfId: z.string().min(1, "Means of identification is required"),
  idNumber: z.string().min(2, "ID number is required"),
  residentialAddress: z.string().min(3, "Residential address is required"),
  occupation: z.string().min(1, "Occupation is required"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email"),
  phoneNumber: z
    .string()
    .min(8, "Phone number is required")
    .regex(/^[+\d\s-]{8,}$/, "Please enter a valid phone number"),
  position: z.string().min(1, "Position is required"),
});

const ownersSchema = z
  .array(ownerDirectorSchema)
  .min(1, "At least one owner/director is required");

const emptyOwner = (id: string): SMEOwnerDirector => ({
  id,
  fullName: "",
  gender: "",
  dateOfBirth: "",
  nationality: "Nigerian",
  meansOfId: "",
  idNumber: "",
  residentialAddress: "",
  occupation: "",
  email: "",
  phoneNumber: "",
  position: "Owner",
});

interface OwnerDirectorsFormProps {
  initialOwners?: SMEOwnerDirector[];
  onSaveAndContinue: (owners: SMEOwnerDirector[]) => void;
  onBack: () => void;
  saving: boolean;
}

export default function OwnerDirectorsForm({
  initialOwners,
  onSaveAndContinue,
  onBack,
  saving,
}: OwnerDirectorsFormProps) {
  const primaryColor = "#D4AF37";
  const accentColor = "#D4AF37";
  const [owners, setOwners] = useState<SMEOwnerDirector[]>(() => {
    if (initialOwners && initialOwners.length > 0) return initialOwners;
    try {
      const saved =
        typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return [emptyOwner("1")];
  });
  const [errors, setErrors] = useState<Record<string, Record<string, string>>>({});
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "error" });

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(owners));
      }
    } catch {
      // ignore
    }
  }, [owners]);

  useEffect(() => {
    if (initialOwners && initialOwners.length > 0) {
      setOwners(initialOwners);
    }
  }, [initialOwners]);

  const addOwner = () => {
    setOwners([...owners, emptyOwner(String(Date.now()))]);
  };

  const removeOwner = (index: number) => {
    if (owners.length > 1) {
      setOwners(owners.filter((_, i) => i !== index));
      setErrors((prev) => {
        const next = { ...prev };
        delete next[index];
        return next;
      });
    }
  };

  const updateOwner = (
    index: number,
    field: keyof SMEOwnerDirector,
    value: string
  ) => {
    const updated = [...owners];
    updated[index] = { ...updated[index], [field]: value };
    setOwners(updated);
    setErrors((prev) => {
      if (!prev[index]) return prev;
      const next = { ...prev };
      const fieldErrors = { ...next[index] };
      delete fieldErrors[field];
      if (Object.keys(fieldErrors).length === 0) {
        delete next[index];
      } else {
        next[index] = fieldErrors;
      }
      return next;
    });
  };

  const validateAll = (): boolean => {
    const result = ownersSchema.safeParse(owners);
    if (!result.success) {
      const fieldErrors: Record<string, Record<string, string>> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path;
        if (path.length >= 2) {
          const ownerIdx = String(path[0]);
          const fieldName = String(path[1]);
          if (!fieldErrors[ownerIdx]) fieldErrors[ownerIdx] = {};
          fieldErrors[ownerIdx][fieldName] = issue.message;
        }
      });
      setErrors(fieldErrors);
      setSnackbar({
        open: true,
        message: "Please correct the highlighted fields.",
        severity: "error",
      });
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSaveAndContinue = () => {
    if (!validateAll()) return;
    onSaveAndContinue(owners);
  };

  const textFieldSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      transition: "all 0.3s ease",
      "&:hover fieldset": { borderColor: `${primaryColor}60` },
      "&.Mui-focused fieldset": { borderColor: primaryColor, borderWidth: 2 },
    },
    "& .MuiInputLabel-root": {
      fontFamily: "var(--font-poppins)",
      fontWeight: 500,
      fontSize: "0.88rem",
      color: "#475569",
      "&.Mui-focused": { color: primaryColor, fontWeight: 600 },
    },
    "& .MuiOutlinedInput-input": {
      fontFamily: "var(--font-inter)",
      fontSize: "0.9rem",
    },
  };

  return (
    <>
      <MotionCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        sx={{
          borderRadius: 3,
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          border: "1px solid #F1F5F9",
          overflow: "visible",
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 5 } }}>
          <MotionBox
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            sx={{ mb: 4, pb: 3, borderBottom: "1px solid #F1F5F9" }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                fontFamily: "var(--font-poppins)",
                color: "#1E293B",
                mb: 1,
                fontSize: { xs: "1.3rem", md: "1.6rem" },
              }}
            >
              MSME Registration
            </Typography>
            <Typography sx={{ color: "#64748B", fontSize: "0.95rem" }}>
              Please provide owner / director information.
            </Typography>
          </MotionBox>

          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              fontFamily: "var(--font-poppins)",
              color: primaryColor,
              mb: 3,
              fontSize: "0.95rem",
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            Owner / Director Details
          </Typography>

          <Stack spacing={4}>
            {owners.map((owner, ownerIndex) => (
              <motion.div
                key={owner.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: ownerIndex * 0.05 }}
              >
                <Box
                  sx={{
                    p: 3,
                    border: "1px solid #E2E8F0",
                    borderRadius: 3,
                    backgroundColor: "#FCFDFE",
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mb: 3 }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 600,
                        fontFamily: "var(--font-poppins)",
                        color: primaryColor,
                        fontSize: "0.95rem",
                      }}
                    >
                      {owners.length > 1
                        ? `Owner / Director ${ownerIndex + 1}`
                        : "Owner / Director Details"}
                    </Typography>
                    {owners.length > 1 && (
                      <IconButton
                        onClick={() => removeOwner(ownerIndex)}
                        sx={{ color: "#DC2626" }}
                        size="small"
                      >
                        <Close fontSize="small" />
                      </IconButton>
                    )}
                  </Stack>
                  <Grid container spacing={2.5}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Full Name *"
                        placeholder="Enter full name"
                        value={owner.fullName}
                        onChange={(e) =>
                          updateOwner(ownerIndex, "fullName", e.target.value)
                        }
                        error={!!errors[ownerIndex]?.fullName}
                        helperText={errors[ownerIndex]?.fullName}
                        fullWidth
                        sx={{ ...textFieldSx, mb: 2.5 }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        select
                        label="Position / Role *"
                        value={owner.position}
                        onChange={(e) =>
                          updateOwner(ownerIndex, "position", e.target.value)
                        }
                        error={!!errors[ownerIndex]?.position}
                        helperText={errors[ownerIndex]?.position}
                        fullWidth
                        sx={{ ...textFieldSx, mb: 2.5 }}
                      >
                        {positions.map((p) => (
                          <MenuItem key={p} value={p}>
                            {p}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        select
                        label="Gender *"
                        value={owner.gender}
                        onChange={(e) =>
                          updateOwner(ownerIndex, "gender", e.target.value)
                        }
                        error={!!errors[ownerIndex]?.gender}
                        helperText={errors[ownerIndex]?.gender}
                        fullWidth
                        sx={{ ...textFieldSx, mb: 2.5 }}
                      >
                        {genders.map((g) => (
                          <MenuItem key={g} value={g}>
                            {g}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        type="date"
                        label="Date of Birth *"
                        value={owner.dateOfBirth}
                        onChange={(e) =>
                          updateOwner(ownerIndex, "dateOfBirth", e.target.value)
                        }
                        InputLabelProps={{ shrink: true }}
                        error={!!errors[ownerIndex]?.dateOfBirth}
                        helperText={errors[ownerIndex]?.dateOfBirth}
                        fullWidth
                        sx={{ ...textFieldSx, mb: 2.5 }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        select
                        label="Nationality *"
                        value={owner.nationality}
                        onChange={(e) =>
                          updateOwner(ownerIndex, "nationality", e.target.value)
                        }
                        error={!!errors[ownerIndex]?.nationality}
                        helperText={errors[ownerIndex]?.nationality}
                        fullWidth
                        sx={{ ...textFieldSx, mb: 2.5 }}
                      >
                        {nationalities.map((n) => (
                          <MenuItem key={n} value={n}>
                            {n}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        select
                        label="Occupation *"
                        value={owner.occupation}
                        onChange={(e) =>
                          updateOwner(ownerIndex, "occupation", e.target.value)
                        }
                        error={!!errors[ownerIndex]?.occupation}
                        helperText={errors[ownerIndex]?.occupation}
                        fullWidth
                        sx={{ ...textFieldSx, mb: 2.5 }}
                      >
                        {occupations.map((o) => (
                          <MenuItem key={o} value={o}>
                            {o}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        select
                        label="Means of Identification *"
                        value={owner.meansOfId}
                        onChange={(e) =>
                          updateOwner(ownerIndex, "meansOfId", e.target.value)
                        }
                        error={!!errors[ownerIndex]?.meansOfId}
                        helperText={errors[ownerIndex]?.meansOfId}
                        fullWidth
                        sx={{ ...textFieldSx, mb: 2.5 }}
                      >
                        {idTypes.map((t) => (
                          <MenuItem key={t} value={t}>
                            {t}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="ID Number *"
                        placeholder="Enter ID number"
                        value={owner.idNumber}
                        onChange={(e) =>
                          updateOwner(ownerIndex, "idNumber", e.target.value)
                        }
                        error={!!errors[ownerIndex]?.idNumber}
                        helperText={errors[ownerIndex]?.idNumber}
                        fullWidth
                        sx={{ ...textFieldSx, mb: 2.5 }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Residential Address *"
                        placeholder="Enter residential address"
                        value={owner.residentialAddress}
                        onChange={(e) =>
                          updateOwner(ownerIndex, "residentialAddress", e.target.value)
                        }
                        error={!!errors[ownerIndex]?.residentialAddress}
                        helperText={errors[ownerIndex]?.residentialAddress}
                        fullWidth
                        sx={{ ...textFieldSx, mb: 2.5 }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        type="email"
                        label="Email *"
                        placeholder="Enter email address"
                        value={owner.email}
                        onChange={(e) =>
                          updateOwner(ownerIndex, "email", e.target.value)
                        }
                        error={!!errors[ownerIndex]?.email}
                        helperText={errors[ownerIndex]?.email}
                        fullWidth
                        sx={{ ...textFieldSx, mb: 2.5 }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        type="tel"
                        label="Phone Number *"
                        placeholder="Enter phone number"
                        value={owner.phoneNumber}
                        onChange={(e) =>
                          updateOwner(ownerIndex, "phoneNumber", e.target.value)
                        }
                        error={!!errors[ownerIndex]?.phoneNumber}
                        helperText={errors[ownerIndex]?.phoneNumber}
                        fullWidth
                        sx={{ ...textFieldSx, mb: 2.5 }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </motion.div>
            ))}
          </Stack>

          <Box sx={{ mt: 3, mb: 4 }}>
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={addOwner}
              sx={{
                borderColor: `${accentColor}80`,
                color: accentColor,
                fontWeight: 600,
                borderRadius: 2,
                px: 3,
                textTransform: "none",
                "&:hover": {
                  borderColor: accentColor,
                  backgroundColor: `${accentColor}08`,
                },
              }}
            >
              Add Owner / Director
            </Button>
          </Box>

          <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
            <Button
              onClick={onBack}
              variant="outlined"
              startIcon={<ArrowBack />}
              sx={{
                borderColor: "#CBD5E1",
                color: "#475569",
                px: 4,
                py: 1.6,
                fontWeight: 600,
                borderRadius: 2,
                textTransform: "none",
                fontFamily: "var(--font-poppins)",
                "&:hover": {
                  borderColor: "#94A3B8",
                  backgroundColor: "#F8FAFC",
                },
              }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              endIcon={<ArrowForward />}
              onClick={handleSaveAndContinue}
              disabled={saving}
              sx={{
                backgroundColor: primaryColor,
                px: 5,
                py: 1.6,
                fontWeight: 700,
                fontSize: "0.95rem",
                borderRadius: 2,
                fontFamily: "var(--font-poppins)",
                boxShadow: `0 6px 20px ${primaryColor}40`,
                "&:hover": {
                  backgroundColor: "#B8941F",
                  transform: "translateY(-2px)",
                  boxShadow: `0 8px 24px ${primaryColor}50`,
                },
                "&:disabled": {
                  backgroundColor: `${primaryColor}90`,
                  color: "white",
                },
                transition: "all 0.3s ease",
                textTransform: "none",
              }}
            >
              {saving ? "Saving..." : "Save & Continue"}
            </Button>
          </Stack>
        </CardContent>
      </MotionCard>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          severity={snackbar.severity}
          variant="filled"
          sx={{
            width: "100%",
            fontFamily: "var(--font-inter)",
            fontWeight: 500,
            borderRadius: 2,
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            ...(snackbar.severity === "success" && {
              backgroundColor: accentColor,
            }),
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
