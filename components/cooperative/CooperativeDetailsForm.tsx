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
import { useState, useId } from "react";
import {
  cooperativeTypes as _cooperativeTypes,
  registrationCategories as _registrationCategories,
  operationalAreas as _operationalAreas,
  yearsOfEstablishment as _yearsOfEstablishment,
  lgas as _lgas,
} from "@/data/seed";
import type { CooperativeRegistrationFormData } from "@/types";

const cooperativeTypes = _cooperativeTypes ?? [];
const registrationCategories = _registrationCategories ?? [];
const operationalAreas = _operationalAreas ?? [];
const yearsOfEstablishment = _yearsOfEstablishment ?? [];
const lgas = _lgas ?? [];

const MotionCard = motion(Card);
const MotionBox = motion(Box);

const initialFormData: CooperativeRegistrationFormData = {
  cooperativeName: "",
  cooperativeType: "",
  registrationCategory: "",
  yearOfEstablishment: "",
  operationalArea: "",
  officeAddress: "",
  localGovernmentArea: "",
  communityTown: "",
  emailAddress: "",
  phoneNumber: "",
  whatsappNumber: "",
  website: "",
  objectives: "",
};

interface CooperativeDetailsFormProps {
  initialData?: CooperativeRegistrationFormData;
  onSaveAndContinue: (data: CooperativeRegistrationFormData) => Promise<void> | void;
  saving?: boolean;
}

export default function CooperativeDetailsForm({
  initialData,
  onSaveAndContinue,
  saving = false,
}: CooperativeDetailsFormProps) {
  const primaryColor = "#CC8800";
  const formUid = useId();
  const [formData, setFormData] = useState<CooperativeRegistrationFormData>(
    initialData && Object.values(initialData).some((v) => v && String(v).trim().length > 0)
      ? initialData
      : initialFormData
  );
  const [errors, setErrors] = useState<Partial<Record<keyof CooperativeRegistrationFormData, string>>>({});

  const requiredFields: (keyof CooperativeRegistrationFormData)[] = [
    "cooperativeName",
    "cooperativeType",
    "registrationCategory",
    "yearOfEstablishment",
    "operationalArea",
    "officeAddress",
    "localGovernmentArea",
    "communityTown",
    "emailAddress",
    "phoneNumber",
    "objectives",
  ];

  const validateForm = () => {
    const newErrors: Partial<Record<keyof CooperativeRegistrationFormData, string>> = {};
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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof CooperativeRegistrationFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [field]: e.target.value });
      if (errors[field]) {
        setErrors({ ...errors, [field]: undefined });
      }
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    await onSaveAndContinue(formData);
  };

  const fieldId = (name: string) => `${formUid}-${name}`;
  const errorId = (name: string) => `${formUid}-${name}-error`;

  const fieldAccessibilityProps = (
    field: keyof CooperativeRegistrationFormData,
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
        fontSize: "0.9rem",
        color: "#475569",
        "&.Mui-focused": { color: primaryColor, fontWeight: 600 },
      },
      "& .MuiOutlinedInput-input": {
        fontFamily: "var(--font-inter)",
        fontSize: "0.92rem",
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
            Cooperative Registration
          </Typography>
          <Typography sx={{ color: "#64748B", fontSize: "0.95rem" }}>
            Please provide accurate information about your cooperative society.
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
              fontSize: "0.98rem",
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            Cooperative Information
          </Typography>

          <Grid container spacing={2.5}>
            <Grid item xs={12}>
              <TextField
                label="Cooperative Name *"
                placeholder="Enter cooperative name"
                value={formData.cooperativeName}
                onChange={handleChange("cooperativeName")}
                helperText={errors.cooperativeName}
                {...fieldAccessibilityProps("cooperativeName", true)}
                {...textFieldProps}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                select
                label="Cooperative Type *"
                placeholder="Select cooperative type"
                value={formData.cooperativeType}
                onChange={handleChange("cooperativeType")}
                helperText={errors.cooperativeType}
                {...fieldAccessibilityProps("cooperativeType", true)}
                {...textFieldProps}
              >
                {cooperativeTypes.map((type) => (
                  <MenuItem key={type.id} value={type.name}>
                    {type.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Registration Category *"
                placeholder="Select category"
                value={formData.registrationCategory}
                onChange={handleChange("registrationCategory")}
                helperText={errors.registrationCategory}
                {...fieldAccessibilityProps("registrationCategory", true)}
                {...textFieldProps}
              >
                {registrationCategories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.name}>
                    {cat.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Year of Establishment *"
                placeholder="Select year"
                value={formData.yearOfEstablishment}
                onChange={handleChange("yearOfEstablishment")}
                helperText={errors.yearOfEstablishment}
                {...fieldAccessibilityProps("yearOfEstablishment", true)}
                {...textFieldProps}
              >
                {yearsOfEstablishment.map((year) => (
                  <MenuItem key={year.id} value={year.name}>
                    {year.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                select
                label="Operational Area *"
                placeholder="Select operational area"
                value={formData.operationalArea}
                onChange={handleChange("operationalArea")}
                helperText={errors.operationalArea}
                {...fieldAccessibilityProps("operationalArea", true)}
                {...textFieldProps}
              >
                {operationalAreas.map((area) => (
                  <MenuItem key={area.id} value={area.name}>
                    {area.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Office Address *"
                placeholder="Enter office address"
                value={formData.officeAddress}
                onChange={handleChange("officeAddress")}
                helperText={errors.officeAddress}
                {...fieldAccessibilityProps("officeAddress", true)}
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
                label="Community/Town *"
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
                type="email"
                label="Email Address *"
                placeholder="Enter email address"
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
                placeholder="Enter phone number"
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
                label="WhatsApp Number"
                placeholder="Enter whatsapp number"
                value={formData.whatsappNumber}
                onChange={handleChange("whatsappNumber")}
                {...fieldAccessibilityProps("whatsappNumber", false)}
                {...textFieldProps}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Website (Optional)"
                placeholder="Enter website"
                value={formData.website}
                onChange={handleChange("website")}
                {...fieldAccessibilityProps("website", false)}
                {...textFieldProps}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Objectives of the Cooperative *"
                placeholder="Describe the main objectives of the cooperative"
                value={formData.objectives}
                onChange={handleChange("objectives")}
                helperText={errors.objectives}
                multiline
                rows={5}
                {...fieldAccessibilityProps("objectives", true)}
                {...textFieldProps}
              />
            </Grid>
          </Grid>

          <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={saving}
              endIcon={<ArrowForward />}
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
                  backgroundColor: "#c49f2d",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 24px rgba(15, 23, 42, 0.32)",
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
