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
} from "@mui/material";
import { motion } from "framer-motion";
import { ArrowForward } from "@mui/icons-material";
import { useState, useEffect, useId } from "react";
import {
  businessTypes,
  businessCategories,
  businessNatures,
  businessStructures,
  lgas,
  nigerianStates,
} from "@/data/seed";
import type { BusinessRegistrationFormData } from "@/types";

const MotionCard = motion(Card);
const MotionBox = motion(Box);

const STORAGE_KEY = "business_registration_step1_draft";

const initialFormData: BusinessRegistrationFormData = {
  businessName: "",
  businessType: "",
  businessCategory: "",
  natureOfBusiness: "",
  dateOfIncorporation: "",
  cacRegNumber: "",
  taxIdentificationNumber: "",
  businessStructure: "",
  businessAddress: "",
  localGovernmentArea: "",
  communityTown: "",
  state: "Anambra State",
  postalCode: "",
  emailAddress: "",
  phoneNumber: "",
  alternativePhoneNumber: "",
  website: "",
  businessDescription: "",
  owners: [],
};

interface BusinessInformationFormProps {
  initialData?: BusinessRegistrationFormData;
  onSaveAndContinue: (data: BusinessRegistrationFormData) => void;
  saving: boolean;
}

export default function BusinessInformationForm({
  initialData,
  onSaveAndContinue,
  saving,
}: BusinessInformationFormProps) {
  const primaryColor = "#CC8800";
  const formUid = useId();
  const [formData, setFormData] = useState<BusinessRegistrationFormData>(() => {
    if (initialData && initialData.businessName) return initialData;
    try {
      const saved =
        typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.businessName) return parsed;
      }
    } catch {}
    return initialFormData;
  });
  const [errors, setErrors] = useState<Partial<Record<keyof BusinessRegistrationFormData, string>>>({});

  useEffect(() => {
    if (initialData && initialData.businessName) {
      setFormData(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      }
    } catch {}
  }, [formData]);

  const requiredFields: (keyof BusinessRegistrationFormData)[] = [
    "businessName",
    "businessType",
    "businessCategory",
    "natureOfBusiness",
    "dateOfIncorporation",
    "taxIdentificationNumber",
    "businessStructure",
    "businessAddress",
    "localGovernmentArea",
    "communityTown",
    "state",
    "postalCode",
    "emailAddress",
    "phoneNumber",
    "businessDescription",
  ];

  const validateForm = () => {
    const newErrors: Partial<Record<keyof BusinessRegistrationFormData, string>> = {};
    requiredFields.forEach((field) => {
      if (!formData[field]?.toString().trim()) {
        newErrors[field] = `${String(field)
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (c) => c.toUpperCase())
          .trim()} is required.`;
      }
    });
    if (formData.emailAddress && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress)) {
      newErrors.emailAddress = "Please enter a valid email address (e.g. name@example.com).";
    }
    if (formData.phoneNumber && !/^[+\d\s-]{8,}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number (8+ digits).";
    }
    if (formData.postalCode && !/^\d{4,6}$/.test(formData.postalCode)) {
      newErrors.postalCode = "Please enter a valid postal code (4-6 digits).";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof BusinessRegistrationFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [field]: e.target.value });
      if (errors[field]) {
        setErrors({ ...errors, [field]: undefined });
      }
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    onSaveAndContinue(formData);
  };

  const fieldId = (name: string) => `${formUid}-${name}`;
  const errorId = (name: string) => `${formUid}-${name}-error`;

  const fieldAccessibilityProps = (
    field: keyof BusinessRegistrationFormData,
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

  const textFieldProps = {
    fullWidth: true,
    sx: {
      mb: 2.5,
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
      "& .MuiFormHelperText-root.Mui-error": {
        fontWeight: 550,
      },
    },
  };

  return (
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
            Business Registration
          </Typography>
          <Typography sx={{ color: "#64748B", fontSize: "0.95rem" }}>
            Please provide accurate information about your business.
          </Typography>
        </MotionBox>

        <Box component="form" onSubmit={handleSubmit} noValidate>
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
              <TextField
                label="Business Name *"
                placeholder="Enter your business name"
                value={formData.businessName}
                onChange={handleChange("businessName")}
                helperText={errors.businessName}
                {...fieldAccessibilityProps("businessName", true)}
                {...textFieldProps}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Business Type *"
                placeholder="Select business type"
                value={formData.businessType}
                onChange={handleChange("businessType")}
                helperText={errors.businessType}
                {...fieldAccessibilityProps("businessType", true)}
                {...textFieldProps}
              >
                {businessTypes.map((t) => (
                  <MenuItem key={t.id} value={t.name}>
                    {t.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Business Category *"
                placeholder="Select category"
                value={formData.businessCategory}
                onChange={handleChange("businessCategory")}
                helperText={errors.businessCategory}
                {...fieldAccessibilityProps("businessCategory", true)}
                {...textFieldProps}
              >
                {businessCategories.map((c) => (
                  <MenuItem key={c.id} value={c.name}>
                    {c.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Nature of Business *"
                placeholder="Select nature of business"
                value={formData.natureOfBusiness}
                onChange={handleChange("natureOfBusiness")}
                helperText={errors.natureOfBusiness}
                {...fieldAccessibilityProps("natureOfBusiness", true)}
                {...textFieldProps}
              >
                {businessNatures.map((n) => (
                  <MenuItem key={n.id} value={n.name}>
                    {n.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                label="Date of Incorporation/Commencement *"
                value={formData.dateOfIncorporation}
                onChange={handleChange("dateOfIncorporation")}
                helperText={errors.dateOfIncorporation}
                InputLabelProps={{ shrink: true }}
                {...fieldAccessibilityProps("dateOfIncorporation", true)}
                {...textFieldProps}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="CAC Registration Number (If applicable)"
                placeholder="Enter CAC registration number"
                value={formData.cacRegNumber}
                onChange={handleChange("cacRegNumber")}
                {...fieldAccessibilityProps("cacRegNumber", false)}
                {...textFieldProps}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Tax Identification Number (TIN) *"
                placeholder="Enter TIN"
                value={formData.taxIdentificationNumber}
                onChange={handleChange("taxIdentificationNumber")}
                helperText={errors.taxIdentificationNumber}
                {...fieldAccessibilityProps("taxIdentificationNumber", true)}
                {...textFieldProps}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Business Structure *"
                placeholder="Select structure"
                value={formData.businessStructure}
                onChange={handleChange("businessStructure")}
                helperText={errors.businessStructure}
                {...fieldAccessibilityProps("businessStructure", true)}
                {...textFieldProps}
              >
                {businessStructures.map((s) => (
                  <MenuItem key={s.id} value={s.name}>
                    {s.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Business Address *"
                placeholder="Enter street address"
                value={formData.businessAddress}
                onChange={handleChange("businessAddress")}
                helperText={errors.businessAddress}
                {...fieldAccessibilityProps("businessAddress", true)}
                {...textFieldProps}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Local Government Area *"
                placeholder="Select LGA"
                value={formData.localGovernmentArea}
                onChange={handleChange("localGovernmentArea")}
                helperText={errors.localGovernmentArea}
                {...fieldAccessibilityProps("localGovernmentArea", true)}
                {...textFieldProps}
              >
                {lgas.map((lga) => (
                  <MenuItem key={lga.id} value={lga.name}>
                    {lga.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Community / Town *"
                placeholder="Enter community or town"
                value={formData.communityTown}
                onChange={handleChange("communityTown")}
                helperText={errors.communityTown}
                {...fieldAccessibilityProps("communityTown", true)}
                {...textFieldProps}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="State *"
                value={formData.state}
                onChange={handleChange("state")}
                helperText={errors.state}
                {...fieldAccessibilityProps("state", true)}
                {...textFieldProps}
              >
                {nigerianStates.map((s) => (
                  <MenuItem key={s.id} value={s.name}>
                    {s.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Postal Code *"
                placeholder="Enter postal code (4-6 digits)"
                value={formData.postalCode}
                onChange={handleChange("postalCode")}
                helperText={errors.postalCode}
                {...fieldAccessibilityProps("postalCode", true)}
                {...textFieldProps}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                type="email"
                label="Email Address *"
                placeholder="name@example.com"
                value={formData.emailAddress}
                onChange={handleChange("emailAddress")}
                helperText={errors.emailAddress}
                {...fieldAccessibilityProps("emailAddress", true)}
                {...textFieldProps}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="tel"
                label="Phone Number *"
                placeholder="+234 800 000 0000"
                value={formData.phoneNumber}
                onChange={handleChange("phoneNumber")}
                helperText={errors.phoneNumber}
                {...fieldAccessibilityProps("phoneNumber", true)}
                {...textFieldProps}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                type="tel"
                label="Alternative Phone Number"
                placeholder="+234 800 000 0000"
                value={formData.alternativePhoneNumber}
                onChange={handleChange("alternativePhoneNumber")}
                {...fieldAccessibilityProps("alternativePhoneNumber", false)}
                {...textFieldProps}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Website (If available)"
                placeholder="https://www.example.com"
                value={formData.website}
                onChange={handleChange("website")}
                {...fieldAccessibilityProps("website", false)}
                {...textFieldProps}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Brief Description of Business *"
                placeholder="Describe your business activities, products or services"
                value={formData.businessDescription}
                onChange={handleChange("businessDescription")}
                helperText={errors.businessDescription}
                multiline
                rows={5}
                {...fieldAccessibilityProps("businessDescription", true)}
                {...textFieldProps}
              />
            </Grid>
          </Grid>

          <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              endIcon={<ArrowForward />}
              disabled={saving}
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
                  backgroundColor: "#B8952D",
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
              {saving ? "Saving..." : "Save & Continue"}
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </MotionCard>
  );
}
