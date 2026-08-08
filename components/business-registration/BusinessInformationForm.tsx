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
import { useState } from "react";
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

export default function BusinessInformationForm() {
  const primaryColor = "#D4AF37";
  const [formData, setFormData] = useState<BusinessRegistrationFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof BusinessRegistrationFormData, string>>>({});

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
        newErrors[field] = "This field is required";
      }
    });
    if (formData.emailAddress && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress)) {
      newErrors.emailAddress = "Please enter a valid email address";
    }
    if (formData.phoneNumber && !/^[+\d\s-]{8,}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }
    if (formData.postalCode && !/^\d{4,6}$/.test(formData.postalCode)) {
      newErrors.postalCode = "Please enter a valid postal code";
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
    validateForm();
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
                error={!!errors.businessName}
                helperText={errors.businessName}
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
                error={!!errors.businessType}
                helperText={errors.businessType}
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
                error={!!errors.businessCategory}
                helperText={errors.businessCategory}
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
                error={!!errors.natureOfBusiness}
                helperText={errors.natureOfBusiness}
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
                error={!!errors.dateOfIncorporation}
                helperText={errors.dateOfIncorporation}
                InputLabelProps={{ shrink: true }}
                {...textFieldProps}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="CAC Registration Number (If applicable)"
                placeholder="Enter CAC registration number"
                value={formData.cacRegNumber}
                onChange={handleChange("cacRegNumber")}
                {...textFieldProps}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Tax Identification Number (TIN) *"
                placeholder="Enter TIN"
                value={formData.taxIdentificationNumber}
                onChange={handleChange("taxIdentificationNumber")}
                error={!!errors.taxIdentificationNumber}
                helperText={errors.taxIdentificationNumber}
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
                error={!!errors.businessStructure}
                helperText={errors.businessStructure}
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
                error={!!errors.businessAddress}
                helperText={errors.businessAddress}
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
                error={!!errors.localGovernmentArea}
                helperText={errors.localGovernmentArea}
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
                error={!!errors.communityTown}
                helperText={errors.communityTown}
                {...textFieldProps}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="State *"
                value={formData.state}
                onChange={handleChange("state")}
                error={!!errors.state}
                helperText={errors.state}
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
                placeholder="Enter postal code"
                value={formData.postalCode}
                onChange={handleChange("postalCode")}
                error={!!errors.postalCode}
                helperText={errors.postalCode}
                {...textFieldProps}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                type="email"
                label="Email Address *"
                placeholder="Enter email address"
                value={formData.emailAddress}
                onChange={handleChange("emailAddress")}
                error={!!errors.emailAddress}
                helperText={errors.emailAddress}
                {...textFieldProps}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="tel"
                label="Phone Number *"
                placeholder="Enter phone number"
                value={formData.phoneNumber}
                onChange={handleChange("phoneNumber")}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
                {...textFieldProps}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                type="tel"
                label="Alternative Phone Number"
                placeholder="Enter alternative phone number"
                value={formData.alternativePhoneNumber}
                onChange={handleChange("alternativePhoneNumber")}
                {...textFieldProps}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Website (If available)"
                placeholder="Enter website URL"
                value={formData.website}
                onChange={handleChange("website")}
                {...textFieldProps}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Brief Description of Business *"
                placeholder="Describe your business activities, products or services"
                value={formData.businessDescription}
                onChange={handleChange("businessDescription")}
                error={!!errors.businessDescription}
                helperText={errors.businessDescription}
                multiline
                rows={5}
                {...textFieldProps}
              />
            </Grid>
          </Grid>

          <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              endIcon={<ArrowForward />}
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
                  backgroundColor: "#D4AF37",
                  transform: "translateY(-2px)",
                  boxShadow: `0 8px 24px ${primaryColor}50`,
                },
                transition: "all 0.3s ease",
                textTransform: "none",
              }}
            >
              Save & Continue
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </MotionCard>
  );
}
