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
import { useState, useEffect, useId } from "react";
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
import type { SMERegistrationFormData } from "@/types";

const MotionCard = motion(Card);
const MotionBox = motion(Box);

const STORAGE_KEY = "sme_registration_step1_draft";
const MAX_DESCRIPTION_LENGTH = 1000;

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

const defaultValues: SMERegistrationFormData = {
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
  initialData?: Partial<SMERegistrationFormData>;
  onSaveAndContinue: (data: SMERegistrationFormData) => void;
  saving: boolean;
  onBack?: () => void;
}

export default function BusinessInformationForm({
  initialData,
  onSaveAndContinue,
  saving,
  onBack,
}: BusinessInformationFormProps) {
  const primaryColor = "#CC8800";
  const formUid = useId();
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
    formState: { errors, isValid, isDirty },
  } = useForm<SMERegistrationFormData>({
    resolver: zodResolver(schema),
    defaultValues: { ...defaultValues, ...(initialData || {}) },
    mode: "onTouched",
  });

  const watchDescription = watch("businessDescription", "");

  useEffect(() => {
    try {
      const saved =
        typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
      if (saved) {
        const parsed = JSON.parse(saved);
        reset({ ...defaultValues, ...parsed, ...(initialData || {}) });
      } else if (initialData) {
        reset({ ...defaultValues, ...initialData });
      }
    } catch {
      // ignore
    }
  }, [reset, initialData]);

  useEffect(() => {
    const subscription = watch((formValues) => {
      try {
        if (typeof window !== "undefined") {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(formValues));
        }
      } catch {
        // ignore
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (data: SMERegistrationFormData) => {
    setIsSubmitting(true);

    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      }
    } catch {
      // ignore
    }

    setSnackbar({
      open: true,
      message: "Business information saved locally. Continuing to Owner/Director Information…",
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

  const fieldId = (name: string) => `${formUid}-${name}`;
  const errorId = (name: string) => `${formUid}-${name}-error`;

  const fieldAccessibilityProps = (
    field: keyof SMERegistrationFormData,
    required = false
  ) => {
    const hasErr = Boolean(errors[field]);
    return {
      id: fieldId(String(field)),
      error: hasErr,
      required,
      "aria-invalid": hasErr || undefined,
      "aria-required": required || undefined,
      "aria-describedby": hasErr ? errorId(String(field)) : undefined,
      FormHelperTextProps: hasErr
        ? {
            id: errorId(String(field)),
            role: "alert" as const,
          }
        : undefined,
    };
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
              SME Registration
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
                      helperText={errors.businessName?.message}
                      {...fieldAccessibilityProps("businessName", true)}
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
                      helperText={errors.businessType?.message}
                      {...fieldAccessibilityProps("businessType", true)}
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
                      helperText={errors.businessCategory?.message}
                      {...fieldAccessibilityProps("businessCategory", true)}
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
                      helperText={errors.natureOfBusiness?.message}
                      {...fieldAccessibilityProps("natureOfBusiness", true)}
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
                      helperText={errors.cacRegistrationNumber?.message}
                      {...fieldAccessibilityProps("cacRegistrationNumber", false)}
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
                      helperText={errors.dateOfCommencement?.message}
                      InputLabelProps={{ shrink: true }}
                      {...fieldAccessibilityProps("dateOfCommencement", true)}
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
                      helperText={errors.businessStructure?.message}
                      {...fieldAccessibilityProps("businessStructure", true)}
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
                      helperText={errors.numberOfEmployees?.message}
                      {...fieldAccessibilityProps("numberOfEmployees", true)}
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
                      helperText={errors.annualTurnoverRange?.message}
                      {...fieldAccessibilityProps("annualTurnoverRange", true)}
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
                      helperText={errors.businessAddress?.message}
                      {...fieldAccessibilityProps("businessAddress", true)}
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
                      helperText={errors.localGovernmentArea?.message}
                      {...fieldAccessibilityProps("localGovernmentArea", true)}
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
                      helperText={errors.community?.message}
                      {...fieldAccessibilityProps("community", true)}
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
                      helperText={errors.state?.message}
                      {...fieldAccessibilityProps("state", true)}
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
                      helperText={errors.postalCode?.message}
                      {...fieldAccessibilityProps("postalCode", true)}
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
                      helperText={errors.email?.message}
                      {...fieldAccessibilityProps("email", true)}
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
                      helperText={errors.phoneNumber?.message}
                      {...fieldAccessibilityProps("phoneNumber", true)}
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
                      helperText={errors.alternativePhone?.message}
                      {...fieldAccessibilityProps("alternativePhone", false)}
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
                      {...fieldAccessibilityProps("website", false)}
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
                        helperText={errors.businessDescription?.message}
                        multiline
                        rows={5}
                        inputProps={{ maxLength: MAX_DESCRIPTION_LENGTH }}
                        {...fieldAccessibilityProps("businessDescription", true)}
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

            <Stack direction={{ xs: "column-reverse", sm: "row" }} justifyContent="space-between" sx={{ mt: 3 }} spacing={2}>
              {onBack && (
                <Button
                  type="button"
                  variant="outlined"
                  startIcon={<ArrowBack />}
                  onClick={onBack}
                  disabled={isSaving}
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
                    "&:disabled": {
                      borderColor: "#CBD5E1",
                      color: "#94A3B8",
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
                  boxShadow: "0 6px 20px rgba(15, 23, 42, 0.25)",
                  "&:hover": {
                    backgroundColor: "#C9A22E",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.32)",
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
          role={snackbar.severity === "error" ? "alert" : "status"}
          sx={{
            width: "100%",
            fontFamily: "var(--font-inter)",
            fontWeight: 500,
            borderRadius: 2,
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
