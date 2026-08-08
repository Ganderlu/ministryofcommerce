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
} from "@mui/material";
import { motion } from "framer-motion";
import { ArrowBack, ArrowForward, Add, Delete } from "@mui/icons-material";
import { useState } from "react";
import type { OwnerDirector } from "@/types";

const MotionCard = motion(Card);
const MotionBox = motion(Box);

const genders = [
  { id: "1", name: "Male" },
  { id: "2", name: "Female" },
  { id: "3", name: "Other" },
];

const nationalities = [
  { id: "1", name: "Nigerian" },
  { id: "2", name: "Ghanaian" },
  { id: "3", name: "Kenyan" },
  { id: "4", name: "South African" },
  { id: "5", name: "British" },
  { id: "6", name: "Other" },
];

const idTypes = [
  { id: "1", name: "National Identity Card (NIN)" },
  { id: "2", name: "International Passport" },
  { id: "3", name: "Driver's License" },
  { id: "4", name: "Voter's Card" },
  { id: "5", name: "PVC" },
];

const occupations = [
  { id: "1", name: "Business Owner" },
  { id: "2", name: "Director" },
  { id: "3", name: "Entrepreneur" },
  { id: "4", name: "Professional" },
  { id: "5", name: "Trader" },
  { id: "6", name: "Farmer" },
  { id: "7", name: "Other" },
];

const emptyOwner = (id: string): OwnerDirector => ({
  id,
  fullName: "",
  gender: "",
  dateOfBirth: "",
  nationality: "Nigerian",
  bvn: "",
  nin: "",
  meansOfId: "",
  residentialAddress: "",
  occupation: "",
  email: "",
  phoneNumber: "",
});

interface OwnerInformationFormProps {
  onPrevious?: () => void;
}

export default function OwnerInformationForm({ onPrevious }: OwnerInformationFormProps) {
  const primaryColor = "#D4AF37";
  const [owners, setOwners] = useState<OwnerDirector[]>([emptyOwner("1")]);

  const addOwner = () => {
    setOwners([...owners, emptyOwner(String(owners.length + 1))]);
  };

  const removeOwner = (index: number) => {
    if (owners.length > 1) {
      setOwners(owners.filter((_, i) => i !== index));
    }
  };

  const updateOwner = (index: number, field: keyof OwnerDirector, value: string) => {
    const updated = [...owners];
    updated[index] = { ...updated[index], [field]: value };
    setOwners(updated);
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
            Please provide owner / director information.
          </Typography>
        </MotionBox>

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
                      <Delete fontSize="small" />
                    </IconButton>
                  )}
                </Stack>
                <Grid container spacing={2.5}>
                  <Grid item xs={12}>
                    <TextField
                      label="Full Name *"
                      placeholder="Enter full name"
                      value={owner.fullName}
                      onChange={(e) => updateOwner(ownerIndex, "fullName", e.target.value)}
                      {...textFieldProps}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      label="Gender *"
                      value={owner.gender}
                      onChange={(e) => updateOwner(ownerIndex, "gender", e.target.value)}
                      {...textFieldProps}
                    >
                      {genders.map((g) => (
                        <MenuItem key={g.id} value={g.name}>
                          {g.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="date"
                      label="Date of Birth *"
                      value={owner.dateOfBirth}
                      onChange={(e) => updateOwner(ownerIndex, "dateOfBirth", e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      {...textFieldProps}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      label="Nationality *"
                      value={owner.nationality}
                      onChange={(e) => updateOwner(ownerIndex, "nationality", e.target.value)}
                      {...textFieldProps}
                    >
                      {nationalities.map((n) => (
                        <MenuItem key={n.id} value={n.name}>
                          {n.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="BVN (Optional)"
                      placeholder="Enter BVN"
                      value={owner.bvn}
                      onChange={(e) => updateOwner(ownerIndex, "bvn", e.target.value)}
                      {...textFieldProps}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="NIN *"
                      placeholder="Enter National Identification Number"
                      value={owner.nin}
                      onChange={(e) => updateOwner(ownerIndex, "nin", e.target.value)}
                      {...textFieldProps}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      label="Means of Identification *"
                      value={owner.meansOfId}
                      onChange={(e) => updateOwner(ownerIndex, "meansOfId", e.target.value)}
                      {...textFieldProps}
                    >
                      {idTypes.map((t) => (
                        <MenuItem key={t.id} value={t.name}>
                          {t.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Residential Address *"
                      placeholder="Enter residential address"
                      value={owner.residentialAddress}
                      onChange={(e) => updateOwner(ownerIndex, "residentialAddress", e.target.value)}
                      {...textFieldProps}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      label="Occupation *"
                      value={owner.occupation}
                      onChange={(e) => updateOwner(ownerIndex, "occupation", e.target.value)}
                      {...textFieldProps}
                    >
                      {occupations.map((o) => (
                        <MenuItem key={o.id} value={o.name}>
                          {o.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="email"
                      label="Email *"
                      placeholder="Enter email address"
                      value={owner.email}
                      onChange={(e) => updateOwner(ownerIndex, "email", e.target.value)}
                      {...textFieldProps}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="tel"
                      label="Phone Number *"
                      placeholder="Enter phone number"
                      value={owner.phoneNumber}
                      onChange={(e) => updateOwner(ownerIndex, "phoneNumber", e.target.value)}
                      {...textFieldProps}
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
              borderColor: `${primaryColor}60`,
              color: primaryColor,
              fontWeight: 600,
              borderRadius: 2,
              px: 3,
              textTransform: "none",
              "&:hover": {
                borderColor: primaryColor,
                backgroundColor: `${primaryColor}08`,
              },
            }}
          >
            Add Another Director / Owner
          </Button>
        </Box>

        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ mt: 2 }}
        >
          <Button
            onClick={onPrevious}
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
              "&:hover": {
                borderColor: "#94A3B8",
                backgroundColor: "#F8FAFC",
              },
            }}
          >
            Previous
          </Button>
          <Button
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
      </CardContent>
    </MotionCard>
  );
}
