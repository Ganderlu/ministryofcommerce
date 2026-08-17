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
  Snackbar,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import { ArrowForward, ArrowBack, CheckCircleOutline } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  smeBusinessTypes,
  smeBusinessCategories,
  smeBusinessNatures,
  smeBusinessStructures,
  numberOfEmployees,
  annualTurnover,
  lgas,
  nigerianStates,
} from "@/data/seed";
import type { MSMERegistrationFormData } from "@/types";
import {
  db,
  auth,
  collection,
  addDoc,
  updateDoc,
  doc,
  onAuthStateChanged,
  serverTimestamp,
  User,
} from "@/firebase/clients";

const MotionCard = motion(Card);
const MotionBox = motion(Box);

const STORAGE_KEY = "msme_registration_step1_draft";
const MAX_DESCRIPTION_LENGTH = 1000;
const MSME_SAVE_TIMEOUT_MS = 30_000;

const MSME_RULES_HINT =
  "Firestore rules may not be deployed yet. Run `npx firebase deploy --only firestore:rules` from the project folder, or paste firestore.rules into: console.firebase.google.com/project/anambra-commerce-d6fa7/firestore/rules then click PUBLISH.";

function classifyMsmeFirestoreError(rawError: string | null | undefined): {
  severity: "error" | "info" | "warning";
  userMessage: string;
} {
  if (!rawError) return { severity: "error", userMessage: "Unknown error" };
  const e = String(rawError);
  if (
    /PERMISSION[_-]DENIED|permission[_-]denied|Missing or insufficient permissions|permission-denied/i.test(
      e
    )
  ) {
    return {
      severity: "error",
      userMessage: `Access to Firestore was DENIED. ${MSME_RULES_HINT}.`,
    };
  }
  if (/TIMEOUT|timed out|exceeded.*ms/i.test(e)) {
    return {
      severity: "error",
      userMessage: `Save did not respond within the allowed time. If this keeps happening, ${MSME_RULES_HINT.toLowerCase()}.`,
    };
  }
  if (
    /network|offline|internet|connection|DNS|CORS|Failed to fetch|fetch failed|socket/i.test(
      e
    )
  ) {
    return {
      severity: "error",
      userMessage: `Network issue: ${e.substring(0, 140)}. Check your connection and try again.`,
    };
  }
  return { severity: "error", userMessage: `Unable to save: ${e}` };
}

const generateApplicationId = (): string => {
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `ANS-MSME-${year}-${random}`;
};

const schema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  businessType: z.string().min(1, "Business type is required"),
  businessCategory: z.string().min(1, "Business category is required"),
  natureOfBusiness: z.string().min(1, "Nature of business is required"),
  cacRegistrationNumber: z.string(),
  dateOfCommencement: z.string().min(1, "Date of commencement is required"),
  businessStructure: z.string().min(1, "Business structure is required"),
  numberOfEmployees: z.string().min(1, "Number of employees is required"),
  annualTurnoverRange: z.string().min(1, "Annual turnover range is required"),
  businessAddress: z.string().min(3, "Business address is required"),
  localGovernmentArea: z.string().min(1, "Local Government Area is required"),
  community: z.string().min(2, "Community / Town is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z
    .string()
    .min(4, "Postal code is required")
    .regex(/^\d{4,6}$/, "Please enter a valid postal code"),
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
  phoneNumber: z
    .string()
    .min(8, "Phone number is required")
    .regex(/^[+\d\s-]{8,}$/, "Please enter a valid phone number"),
  alternativePhone: z
    .string()
    .refine(
      (val) => !val || val.length === 0 || /^[+\d\s-]{8,}$/.test(val),
      "Please enter a valid phone number"
    ),
  website: z.string(),
  businessDescription: z
    .string()
    .min(10, "Business description is required")
    .max(MAX_DESCRIPTION_LENGTH, `Maximum ${MAX_DESCRIPTION_LENGTH} characters allowed`),
});

const defaultValues: MSMERegistrationFormData = {
  businessName: "",
  businessType: "",
  businessCategory: "",
  natureOfBusiness: "",
  cacRegistrationNumber: "",
  dateOfCommencement: "",
  businessStructure: "",
  numberOfEmployees: "",
  annualTurnoverRange: "",
  businessAddress: "",
  localGovernmentArea: "",
  community: "",
  state: "Anambra State",
  postalCode: "",
  email: "",
  phoneNumber: "",
  alternativePhone: "",
  website: "",
  businessDescription: "",
};

interface BusinessInformationFormProps {
  initialData?: Partial<MSMERegistrationFormData>;
  onSaveAndContinue: (data: MSMERegistrationFormData) => void;
  saving: boolean;
  onBack?: () => void;
}

export default function BusinessInformationForm({
  initialData,
  onSaveAndContinue,
  saving,
  onBack,
}: BusinessInformationFormProps) {
  const primaryColor = "#D4AF37";
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [existingDocId, setExistingDocId] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({
    open: false,
    message: "",
    severity: "success",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSaving = saving || isSubmitting;

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<MSMERegistrationFormData>({
    resolver: zodResolver(schema),
    defaultValues: { ...defaultValues, ...(initialData || {}) },
    mode: "onTouched",
  });

  const watchDescription = watch("businessDescription", "");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    try {
      const saved =
        typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
      if (saved) {
        const parsed = JSON.parse(saved);
        const { _existingDocId, ...rest } = parsed;
        reset({ ...defaultValues, ...rest, ...(initialData || {}) });
        if (_existingDocId) setExistingDocId(_existingDocId);
      } else if (initialData) {
        reset({ ...defaultValues, ...initialData });
      }
    } catch {
      // ignore
    }
  }, [reset, initialData]);

  useEffect(() => {
    const subscription = watch((formValues, { name, type }) => {
      try {
        if (typeof window !== "undefined") {
          const current = localStorage.getItem(STORAGE_KEY);
          const existing = current ? JSON.parse(current) : {};
          const toSave = {
            ...existing,
            ...formValues,
            _existingDocId: existingDocId,
          };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
        }
      } catch {
        // ignore
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, existingDocId]);

  const onSubmit = async (data: MSMERegistrationFormData) => {
    setIsSubmitting(true);

    try {
      if (typeof window !== "undefined") {
        const toSave = existingDocId ? { ...data, _existingDocId: existingDocId } : { ...data };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
      }
    } catch {
      // ignore
    }

    setSnackbar({
      open: true,
      message: "Business information saved successfully.",
      severity: "success",
    });

    setTimeout(() => {
      setIsSubmitting(false);
      onSaveAndContinue(data);
    }, 400);
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
              Please provide accurate information about your business.
            </Typography>
          </MotionBox>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit, (formErrors) => {
              if (Object.keys(formErrors).length > 0) {
                setSnackbar({
                  open: true,
                  message: "Please correct the highlighted fields.",
                  severity: "error",
                });
              }
            })}
            noValidate
          >
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
              Business Information
            </Typography>

            <Grid container spacing={2.5}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="businessName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Business Name *"
                      placeholder="Enter your business name"
                      error={!!errors.businessName}
                      helperText={errors.businessName?.message}
                      sx={textFieldSx}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="businessType"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      select
                      label="Business Type *"
                      placeholder="Select business type"
                      error={!!errors.businessType}
                      helperText={errors.businessType?.message}
                      sx={textFieldSx}
                    >
                      {smeBusinessTypes.map((t) => (
                        <MenuItem key={t.id} value={t.name}>
                          {t.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="businessCategory"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      select
                      label="Business Category *"
                      placeholder="Select category"
                      error={!!errors.businessCategory}
                      helperText={errors.businessCategory?.message}
                      sx={textFieldSx}
                    >
                      {smeBusinessCategories.map((c) => (
                        <MenuItem key={c.id} value={c.name}>
                          {c.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="natureOfBusiness"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      select
                      label="Nature of Business *"
                      placeholder="Select nature of business"
                      error={!!errors.natureOfBusiness}
                      helperText={errors.natureOfBusiness?.message}
                      sx={textFieldSx}
                    >
                      {smeBusinessNatures.map((n) => (
                        <MenuItem key={n.id} value={n.name}>
                          {n.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="cacRegistrationNumber"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="CAC Registration Number (If registered)"
                      placeholder="Enter CAC registration number"
                      error={!!errors.cacRegistrationNumber}
                      helperText={errors.cacRegistrationNumber?.message}
                      sx={{ ...textFieldSx, mb: 2.5 }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="dateOfCommencement"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type="date"
                      label="Date of Incorporation / Commencement *"
                      error={!!errors.dateOfCommencement}
                      helperText={errors.dateOfCommencement?.message}
                      InputLabelProps={{ shrink: true }}
                      sx={{ ...textFieldSx, mb: 2.5 }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="businessStructure"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      select
                      label="Business Structure *"
                      placeholder="Select structure"
                      error={!!errors.businessStructure}
                      helperText={errors.businessStructure?.message}
                      sx={textFieldSx}
                    >
                      {smeBusinessStructures.map((s) => (
                        <MenuItem key={s.id} value={s.name}>
                          {s.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="numberOfEmployees"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      select
                      label="Number of Employees *"
                      placeholder="Select range"
                      error={!!errors.numberOfEmployees}
                      helperText={errors.numberOfEmployees?.message}
                      sx={textFieldSx}
                    >
                      {numberOfEmployees.map((n) => (
                        <MenuItem key={n.id} value={n.name}>
                          {n.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="annualTurnoverRange"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      select
                      label="Annual Turnover Range *"
                      placeholder="Select range"
                      error={!!errors.annualTurnoverRange}
                      helperText={errors.annualTurnoverRange?.message}
                      sx={textFieldSx}
                    >
                      {annualTurnover.map((a) => (
                        <MenuItem key={a.id} value={a.name}>
                          {a.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="businessAddress"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Business Address *"
                      placeholder="Enter full street address"
                      error={!!errors.businessAddress}
                      helperText={errors.businessAddress?.message}
                      sx={{ ...textFieldSx, mb: 2.5 }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="localGovernmentArea"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      select
                      label="Local Government Area *"
                      placeholder="Select LGA"
                      error={!!errors.localGovernmentArea}
                      helperText={errors.localGovernmentArea?.message}
                      sx={textFieldSx}
                    >
                      {lgas.map((lga) => (
                        <MenuItem key={lga.id} value={lga.name}>
                          {lga.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="community"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Community / Town *"
                      placeholder="Enter community or town"
                      error={!!errors.community}
                      helperText={errors.community?.message}
                      sx={textFieldSx}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      select
                      label="State *"
                      error={!!errors.state}
                      helperText={errors.state?.message}
                      sx={textFieldSx}
                    >
                      {nigerianStates.map((s) => (
                        <MenuItem key={s.id} value={s.name}>
                          {s.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="postalCode"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Postal Code *"
                      placeholder="Enter postal code"
                      error={!!errors.postalCode}
                      helperText={errors.postalCode?.message}
                      sx={textFieldSx}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type="email"
                      label="Email Address *"
                      placeholder="Enter email address"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      sx={textFieldSx}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="phoneNumber"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type="tel"
                      label="Phone Number *"
                      placeholder="Enter phone number"
                      error={!!errors.phoneNumber}
                      helperText={errors.phoneNumber?.message}
                      sx={textFieldSx}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="alternativePhone"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type="tel"
                      label="Alternative Phone Number"
                      placeholder="Enter alternative phone number"
                      error={!!errors.alternativePhone}
                      helperText={errors.alternativePhone?.message}
                      sx={textFieldSx}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="website"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Website"
                      placeholder="Enter website URL"
                      sx={textFieldSx}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ position: "relative" }}>
                  <Controller
                    name="businessDescription"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Brief Description of Your Business *"
                        placeholder="Tell us about your business, products or services"
                        error={!!errors.businessDescription}
                        helperText={errors.businessDescription?.message}
                        multiline
                        rows={5}
                        inputProps={{ maxLength: MAX_DESCRIPTION_LENGTH }}
                        sx={textFieldSx}
                      />
                    )}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      position: "absolute",
                      right: 14,
                      bottom: 46,
                      color:
                        watchDescription.length > MAX_DESCRIPTION_LENGTH
                          ? "#DC2626"
                          : "#94A3B8",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      fontFamily: "var(--font-inter)",
                      pointerEvents: "none",
                    }}
                  >
                    {watchDescription.length}/{MAX_DESCRIPTION_LENGTH}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Stack direction="row" justifyContent={onBack ? "space-between" : "flex-end"} sx={{ mt: 3 }}>
              {onBack && (
                <Button
                  type="button"
                  variant="outlined"
                  startIcon={<ArrowBack />}
                  onClick={onBack}
                  sx={{
                    px: 4,
                    py: 1.6,
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    borderRadius: 2,
                    fontFamily: "var(--font-poppins)",
                    borderColor: `${primaryColor}50`,
                    color: primaryColor,
                    textTransform: "none",
                    "&:hover": {
                      borderColor: primaryColor,
                      backgroundColor: `${primaryColor}08`,
                      transform: "translateY(-1px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Back
                </Button>
              )}
              <Button
                type="submit"
                variant="contained"
                endIcon={isSaving ? <CheckCircleOutline /> : <ArrowForward />}
                disabled={isSaving}
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
                {isSaving ? "Saving..." : "Save & Continue"}
              </Button>
            </Stack>
          </Box>
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
              backgroundColor: primaryColor,
            }),
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
