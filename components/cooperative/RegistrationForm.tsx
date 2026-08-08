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
  cooperativeTypes,
  registrationCategories,
  operationalAreas,
  yearsOfEstablishment,
  lgas,
} from "@/data/seed";
import type { CooperativeRegistrationFormData } from "@/types";

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

export default function RegistrationForm() {
  const primaryColor = "#D4AF37";
  const [formData, setFormData] = useState<CooperativeRegistrationFormData>(initialFormData);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
    }
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
                error={!!errors.cooperativeName}
                helperText={errors.cooperativeName}
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
                error={!!errors.cooperativeType}
                helperText={errors.cooperativeType}
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
                error={!!errors.registrationCategory}
                helperText={errors.registrationCategory}
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
                error={!!errors.yearOfEstablishment}
                helperText={errors.yearOfEstablishment}
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
                error={!!errors.operationalArea}
                helperText={errors.operationalArea}
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
                error={!!errors.officeAddress}
                helperText={errors.officeAddress}
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
                label="Community/Town *"
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
                label="WhatsApp Number"
                placeholder="Enter whatsapp number"
                value={formData.whatsappNumber}
                onChange={handleChange("whatsappNumber")}
                {...textFieldProps}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Website (Optional)"
                placeholder="Enter website"
                value={formData.website}
                onChange={handleChange("website")}
                {...textFieldProps}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Objectives of the Cooperative *"
                placeholder="Describe the main objectives of the cooperative"
                value={formData.objectives}
                onChange={handleChange("objectives")}
                error={!!errors.objectives}
                helperText={errors.objectives}
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
