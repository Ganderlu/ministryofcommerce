"use client";
import {
  Alert,
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
  Divider,
  Chip,
  Avatar,
} from "@mui/material";
import { motion } from "framer-motion";
import { ArrowBack, ArrowForward, Add as AddIcon, Delete as DeleteIcon, Person as PersonIcon, WarningAmber as WarningAmberIcon } from "@mui/icons-material";
import { useState, useMemo } from "react";
import type { CooperativeMember, CooperativeMemberRole } from "@/types";

const MotionCard = motion(Card);
const MotionBox = motion(Box);

const MEMBER_ROLES: CooperativeMemberRole[] = [
  "Chairman",
  "Vice Chairman",
  "Secretary",
  "Assistant Secretary",
  "Treasurer",
  "Financial Secretary",
  "PRO",
  "Auditor",
  "Ex-Officio",
  "Member",
];

const EXECUTIVE_ROLES: CooperativeMemberRole[] = [
  "Chairman",
  "Vice Chairman",
  "Secretary",
  "Assistant Secretary",
  "Treasurer",
  "Financial Secretary",
  "PRO",
  "Auditor",
  "Ex-Officio",
];

const createEmptyMember = (role: CooperativeMemberRole = "Member"): CooperativeMember => ({
  id: Math.random().toString(36).slice(2) + Date.now().toString(36),
  role,
  fullName: "",
  position: "",
  gender: "",
  dateOfBirth: "",
  phoneNumber: "",
  emailAddress: "",
  residentialAddress: "",
  occupation: "",
  bvn: "",
  nin: "",
  shareHolding: "",
  yearsInCooperative: "",
});

interface MembersInformationFormProps {
  initialMembers?: CooperativeMember[];
  onSaveAndContinue: (members: CooperativeMember[]) => Promise<void> | void;
  onBack: () => void;
  saving?: boolean;
}

export default function MembersInformationForm({
  initialMembers,
  onSaveAndContinue,
  onBack,
  saving = false,
}: MembersInformationFormProps) {
  const primaryColor = "#D4AF37";
  const [members, setMembers] = useState<CooperativeMember[]>(() => {
    if (initialMembers && initialMembers.length > 0) return initialMembers;
    return [
      createEmptyMember("Chairman"),
      createEmptyMember("Secretary"),
      createEmptyMember("Treasurer"),
    ];
  });
  const [errors, setErrors] = useState<Record<string, Partial<Record<keyof CooperativeMember, string>>>>({});
  const [activeMemberIndex, setActiveMemberIndex] = useState(0);

  const currentMember = members[activeMemberIndex];

  const requiredMemberFields: (keyof CooperativeMember)[] = [
    "role",
    "fullName",
    "gender",
    "phoneNumber",
    "emailAddress",
    "residentialAddress",
    "occupation",
  ];

  const [globalErrors, setGlobalErrors] = useState<string[]>([]);

  const updateMember = (idx: number, patch: Partial<CooperativeMember>) => {
    setMembers((prev) => prev.map((m, i) => (i === idx ? { ...m, ...patch } : m)));
    if (errors[idx]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[idx];
        return next;
      });
    }
  };

  const addMember = (role: CooperativeMemberRole = "Member") => {
    setMembers((prev) => [...prev, createEmptyMember(role)]);
    setActiveMemberIndex(members.length);
  };

  const removeMember = (idx: number) => {
    if (members.length <= 1) return;
    setMembers((prev) => prev.filter((_, i) => i !== idx));
    setErrors((prev) => {
      const next: Record<string, any> = {};
      Object.keys(prev).forEach((k) => {
        const ki = Number(k);
        if (ki === idx) return;
        next[ki > idx ? ki - 1 : ki] = prev[k];
      });
      return next;
    });
    setActiveMemberIndex((i) => (i >= members.length - 1 ? members.length - 2 : i));
  };

  interface ValidationOutcome {
    ok: boolean;
    memberErrors: Record<number, Partial<Record<keyof CooperativeMember, string>>>;
    firstErrorMemberIndex: number;
    globalErrors: string[];
  }

  const validateAll = (): ValidationOutcome => {
    const memberErrors: Record<number, Partial<Record<keyof CooperativeMember, string>>> = {};
    let ok = true;
    let firstErrorMemberIndex = 0;
    let firstFound = false;
    members.forEach((m, idx) => {
      const e: Partial<Record<keyof CooperativeMember, string>> = {};
      requiredMemberFields.forEach((f) => {
        const v = m[f];
        if (!v || (typeof v === "string" && !v.trim())) {
          e[f] = "This field is required";
          ok = false;
          if (!firstFound) {
            firstErrorMemberIndex = idx;
            firstFound = true;
          }
        }
      });
      if (m.emailAddress && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m.emailAddress)) {
        e.emailAddress = "Please enter a valid email";
        ok = false;
        if (!firstFound) {
          firstErrorMemberIndex = idx;
          firstFound = true;
        }
      }
      if (m.phoneNumber && !/^[+\d\s-]{8,}$/.test(m.phoneNumber)) {
        e.phoneNumber = "Please enter a valid phone";
        ok = false;
        if (!firstFound) {
          firstErrorMemberIndex = idx;
          firstFound = true;
        }
      }
      if (Object.keys(e).length > 0) memberErrors[idx] = e;
    });

    const globalErrors: string[] = [];
    const hasChairman = members.some((m) => m.role === "Chairman");
    const hasSecretary = members.some((m) => m.role === "Secretary");
    const hasTreasurer = members.some((m) => m.role === "Treasurer");
    if (!hasChairman) {
      globalErrors.push("You must add at least one Chairman (executive role).");
      ok = false;
    }
    if (!hasSecretary) {
      globalErrors.push("You must add at least one Secretary (executive role).");
      ok = false;
    }
    if (!hasTreasurer) {
      globalErrors.push("You must add at least one Treasurer (executive role).");
      ok = false;
    }
    if (members.length === 0) {
      globalErrors.push("You must add at least one member (Chairman + Secretary + Treasurer).");
      ok = false;
    }

    return { ok, memberErrors, firstErrorMemberIndex, globalErrors };
  };

  const handleSaveContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    const outcome = validateAll();
    setErrors(outcome.memberErrors);
    if (!outcome.ok) {
      setActiveMemberIndex(outcome.firstErrorMemberIndex);
      if (typeof window !== "undefined") {
        // Scroll to error banner at top of members card
        const el = document.getElementById("members-validation-summary");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        else window.scrollTo({ top: 0, behavior: "smooth" });
      }
      setGlobalErrors(outcome.globalErrors);
      return;
    }
    setGlobalErrors([]);
    try {
      await onSaveAndContinue(members);
    } catch (err: any) {
      setGlobalErrors([
        err?.message
          ? `Save failed: ${String(err.message).substring(0, 160)}`
          : "Save failed. Please try again.",
      ]);
    }
  };

  const textFieldProps = useMemo(
    () => ({
      fullWidth: true,
      sx: {
        mb: 2,
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,
          transition: "all 0.3s ease",
          "&:hover fieldset": { borderColor: `${primaryColor}60` },
          "&.Mui-focused fieldset": { borderColor: primaryColor, borderWidth: 2 },
        },
        "& .MuiInputLabel-root": {
          fontFamily: "var(--font-poppins)",
          fontWeight: 500,
          fontSize: "0.875rem",
          color: "#475569",
          "&.Mui-focused": { color: primaryColor, fontWeight: 600 },
        },
        "& .MuiOutlinedInput-input": {
          fontFamily: "var(--font-inter)",
          fontSize: "0.9rem",
        },
      },
    }),
    [primaryColor]
  );

  const executives = members.filter((m) => EXECUTIVE_ROLES.includes(m.role));
  const generalMembers = members.filter((m) => !EXECUTIVE_ROLES.includes(m.role));
  const hasChairman = members.some((m) => m.role === "Chairman");
  const hasSecretary = members.some((m) => m.role === "Secretary");
  const hasTreasurer = members.some((m) => m.role === "Treasurer");
  const totalErrors = Object.values(errors).reduce(
    (acc, m) => acc + Object.keys(m).length,
    0
  );

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
      <CardContent sx={{ p: { xs: 2.5, md: 4.5 } }}>
        <MotionBox
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          sx={{ mb: 3, pb: 2.5, borderBottom: "1px solid #F1F5F9" }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              fontFamily: "var(--font-poppins)",
              color: "#1E293B",
              mb: 0.75,
              fontSize: { xs: "1.25rem", md: "1.55rem" },
            }}
          >
            Cooperative Registration
          </Typography>
          <Typography sx={{ color: "#64748B", fontSize: "0.92rem" }}>
            Provide information about key executive members and general members of the cooperative.
          </Typography>
        </MotionBox>

        <Box component="form" onSubmit={handleSaveContinue} noValidate>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              fontFamily: "var(--font-poppins)",
              color: primaryColor,
              mb: 2,
              fontSize: "0.95rem",
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            Members Information
          </Typography>

          {globalErrors && globalErrors.length > 0 && (
            <Alert
              id="members-validation-summary"
              severity="error"
              icon={<WarningAmberIcon />}
              sx={{
                mb: 3,
                borderRadius: 2.5,
                bgcolor: "rgba(220, 38, 38, 0.05)",
                border: "1px solid #FECACA",
                color: "#991B1B",
                fontWeight: 500,
                fontSize: "0.88rem",
                fontFamily: "var(--font-poppins)",
                "& .MuiAlert-icon": { color: "#DC2626", fontSize: 22 },
                "& .MuiAlert-message": { width: "100%" },
              }}
            >
              <Box sx={{ fontWeight: 800, fontSize: "0.92rem", mb: 0.5 }}>
                Please fix the following issues before continuing:
              </Box>
              <Box component="ul" sx={{ m: 0, pl: 2.25 }}>
                {globalErrors.map((msg, i) => (
                  <Box component="li" key={i} sx={{ lineHeight: 1.7 }}>
                    {msg}
                  </Box>
                ))}
              </Box>
              {Object.keys(errors).length > 0 && (
                <Typography sx={{ mt: 1, fontSize: "0.8rem", fontWeight: 600 }}>
                  Additional per-member issues are highlighted in red — click member #{globalErrors.length > 0 ? (Object.keys(errors)[0] ? Number(Object.keys(errors)[0]) + 1 : 1) : 1} to see required fields.
                </Typography>
              )}
            </Alert>
          )}

          <Grid container spacing={2.5}>
            <Grid item xs={12} md={4}>
              <Card
                variant="outlined"
                sx={{
                  borderRadius: 2.5,
                  bgcolor: "#FAFBFC",
                  borderColor: "#E2E8F0",
                  height: "100%",
                }}
              >
                <CardContent sx={{ p: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 1.5,
                    }}
                  >
                    <Typography sx={{ fontWeight: 700, fontFamily: "var(--font-poppins)", fontSize: "0.95rem" }}>
                      Members ({members.length})
                    </Typography>
                    {totalErrors > 0 && (
                      <Chip
                        label={`${totalErrors} issue${totalErrors > 1 ? "s" : ""}`}
                        size="small"
                        color="error"
                        sx={{ fontWeight: 600, borderRadius: 1.5 }}
                      />
                    )}
                  </Box>

                  <Box
                    sx={{
                      p: 1.25,
                      mb: 2,
                      border: "1px solid #E5E7EB",
                      borderRadius: 2,
                      bgcolor: "#FFFFFF",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        color: "#475569",
                        mb: 1,
                        fontFamily: "var(--font-poppins)",
                        textTransform: "uppercase",
                        letterSpacing: 0.3,
                      }}
                    >
                      Required Executive Officers
                    </Typography>
                    <Stack direction="row" spacing={0.75} flexWrap="wrap">
                      {(["Chairman", "Secretary", "Treasurer"] as CooperativeMemberRole[]).map((role) => {
                        const has = role === "Chairman" ? hasChairman : role === "Secretary" ? hasSecretary : hasTreasurer;
                        return (
                          <Chip
                            key={role}
                            size="small"
                            label={`${has ? "✓ " : "✗ "}${role}`}
                            onClick={() => {
                              if (!has) addMember(role);
                            }}
                            sx={{
                              fontWeight: 700,
                              fontSize: "0.76rem",
                              borderRadius: 10,
                              cursor: has ? "default" : "pointer",
                              bgcolor: has ? "rgba(16,185,129,0.12)" : "rgba(220,38,38,0.06)",
                              color: has ? "#047857" : "#B91C1C",
                              border: `1px solid ${has ? "rgba(212,175,55,0.4)" : "rgba(220,38,38,0.25)"}`,
                              "&:hover": has ? {} : { bgcolor: "rgba(220,38,38,0.1)" },
                            }}
                          />
                        );
                      })}
                    </Stack>
                    {(!hasChairman || !hasSecretary || !hasTreasurer) && (
                      <Typography
                        sx={{
                          mt: 1,
                          fontSize: "0.75rem",
                          color: "#991B1B",
                          fontWeight: 600,
                          fontFamily: "var(--font-poppins)",
                        }}
                      >
                        ✗ Click a red chip above to quickly add the missing executive.
                      </Typography>
                    )}
                  </Box>

                  <Stack spacing={1} sx={{ mb: 2 }}>
                    {members.map((m, idx) => {
                      const hasError = !!errors[idx] && Object.keys(errors[idx]).length > 0;
                      const isActive = idx === activeMemberIndex;
                      return (
                        <Box
                          key={m.id}
                          onClick={() => setActiveMemberIndex(idx)}
                          sx={{
                            p: 1.25,
                            pr: 1,
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            borderRadius: 1.75,
                            cursor: "pointer",
                            border: isActive ? `2px solid ${primaryColor}` : "2px solid transparent",
                            bgcolor: isActive ? "#FFFEF2" : "white",
                            boxShadow: isActive ? `0 4px 14px ${primaryColor}25` : "0 1px 3px rgba(0,0,0,0.05)",
                            transition: "all 0.2s ease",
                            "&:hover": { bgcolor: isActive ? "#FFFEF2" : "#FAF7EA" },
                          }}
                        >
                          <Avatar
                            sx={{
                              bgcolor: `${primaryColor}22`,
                              color: primaryColor,
                              width: 36,
                              height: 36,
                              flexShrink: 0,
                              fontWeight: 700,
                            }}
                          >
                            <PersonIcon fontSize="small" />
                          </Avatar>
                          <Box sx={{ minWidth: 0, flex: 1 }}>
                            <Typography
                              sx={{
                                fontWeight: 600,
                                fontFamily: "var(--font-poppins)",
                                fontSize: "0.85rem",
                                color: "#1E293B",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {m.fullName?.trim() || "Unnamed Member"}
                            </Typography>
                            <Stack direction="row" spacing={0.5} alignItems="center">
                              <Chip
                                label={m.role}
                                size="small"
                                sx={{
                                  fontWeight: 600,
                                  fontSize: "0.7rem",
                                  bgcolor: `${primaryColor}1A`,
                                  color: "#8a6e14",
                                  borderRadius: 1.25,
                                  height: 20,
                                  "& .MuiChip-label": { px: 1 },
                                }}
                              />
                              {hasError && (
                                <Chip
                                  label={Object.keys(errors[idx]!).length}
                                  size="small"
                                  color="error"
                                  sx={{ borderRadius: 1.25, height: 20, "& .MuiChip-label": { px: 1, fontSize: "0.7rem" } }}
                                />
                              )}
                            </Stack>
                          </Box>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeMember(idx);
                            }}
                            disabled={members.length <= 1}
                            sx={{ color: "#94A3B8", "&:hover": { color: "#DC2626", bgcolor: "#FEF2F2" } }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      );
                    })}
                  </Stack>

                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "#94A3B8",
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                      mb: 0.75,
                    }}
                  >
                    Quick Add Executive
                  </Typography>
                  <Stack direction="row" flexWrap="wrap" spacing={0.75} sx={{ rowGap: 0.75, mb: 1.5 }}>
                    {EXECUTIVE_ROLES.filter((r) => !members.some((m) => m.role === r)).map((role) => (
                      <Button
                        key={role}
                        variant="outlined"
                        size="small"
                        onClick={() => addMember(role)}
                        sx={{
                          fontSize: "0.72rem",
                          py: 0.35,
                          px: 1,
                          textTransform: "none",
                          borderRadius: 1.5,
                          borderColor: "#E2E8F0",
                          color: "#475569",
                          fontWeight: 600,
                          fontFamily: "var(--font-inter)",
                          "&:hover": {
                            borderColor: primaryColor,
                            bgcolor: `${primaryColor}10`,
                            color: "#8a6e14",
                          },
                        }}
                        startIcon={<AddIcon sx={{ fontSize: "0.9rem" }} />}
                      >
                        {role}
                      </Button>
                    ))}
                  </Stack>

                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => addMember("Member")}
                    sx={{
                      bgcolor: `${primaryColor}12`,
                      color: "#8a6e14",
                      fontWeight: 700,
                      fontFamily: "var(--font-poppins)",
                      textTransform: "none",
                      borderRadius: 2,
                      py: 1,
                      fontSize: "0.85rem",
                      "&:hover": { bgcolor: `${primaryColor}20` },
                    }}
                  >
                    Add General Member
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={8}>
              {currentMember && (
                <Card
                  variant="outlined"
                  sx={{ borderRadius: 2.5, borderColor: "#E2E8F0", height: "100%" }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 3,
                        pb: 2,
                        borderBottom: "1px solid #F1F5F9",
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 56,
                          height: 56,
                          bgcolor: primaryColor,
                          fontWeight: 800,
                          fontSize: "1.25rem",
                          boxShadow: `0 6px 16px ${primaryColor}40`,
                        }}
                      >
                        {currentMember.fullName?.trim()
                          ? currentMember.fullName.trim().split(/\s+/).map((n) => n[0]).join("").slice(0, 2).toUpperCase()
                          : <PersonIcon fontSize="medium" />}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontWeight: 800, fontFamily: "var(--font-poppins)", fontSize: "1.1rem", color: "#1E293B" }}>
                          {currentMember.fullName?.trim() || "New Member"}
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Chip
                            label={currentMember.role}
                            size="small"
                            sx={{
                              fontWeight: 700,
                              bgcolor: `${primaryColor}1E`,
                              color: "#8a6e14",
                              borderRadius: 1.25,
                            }}
                          />
                          <Typography sx={{ color: "#94A3B8", fontSize: "0.8rem", fontWeight: 600 }}>
                            Member #{activeMemberIndex + 1}
                          </Typography>
                        </Stack>
                      </Box>
                    </Box>

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          select
                          label="Role *"
                          value={currentMember.role}
                          onChange={(e) => updateMember(activeMemberIndex, { role: e.target.value as CooperativeMemberRole })}
                          error={!!errors[activeMemberIndex]?.role}
                          helperText={errors[activeMemberIndex]?.role}
                          {...textFieldProps}
                        >
                          {MEMBER_ROLES.map((r) => (
                            <MenuItem key={r} value={r}>{r}</MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Full Name *"
                          placeholder="Surname Firstname Middlename"
                          value={currentMember.fullName}
                          onChange={(e) => updateMember(activeMemberIndex, { fullName: e.target.value })}
                          error={!!errors[activeMemberIndex]?.fullName}
                          helperText={errors[activeMemberIndex]?.fullName}
                          {...textFieldProps}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          select
                          label="Gender *"
                          value={currentMember.gender}
                          onChange={(e) => updateMember(activeMemberIndex, { gender: e.target.value as any })}
                          error={!!errors[activeMemberIndex]?.gender}
                          helperText={errors[activeMemberIndex]?.gender}
                          {...textFieldProps}
                        >
                          <MenuItem value="Male">Male</MenuItem>
                          <MenuItem value="Female">Female</MenuItem>
                          <MenuItem value="Other">Other</MenuItem>
                        </TextField>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          type="date"
                          label="Date of Birth"
                          InputLabelProps={{ shrink: true }}
                          value={currentMember.dateOfBirth || ""}
                          onChange={(e) => updateMember(activeMemberIndex, { dateOfBirth: e.target.value })}
                          {...textFieldProps}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          type="tel"
                          label="Phone Number *"
                          placeholder="+234..."
                          value={currentMember.phoneNumber}
                          onChange={(e) => updateMember(activeMemberIndex, { phoneNumber: e.target.value })}
                          error={!!errors[activeMemberIndex]?.phoneNumber}
                          helperText={errors[activeMemberIndex]?.phoneNumber}
                          {...textFieldProps}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          type="email"
                          label="Email Address *"
                          placeholder="name@example.com"
                          value={currentMember.emailAddress}
                          onChange={(e) => updateMember(activeMemberIndex, { emailAddress: e.target.value })}
                          error={!!errors[activeMemberIndex]?.emailAddress}
                          helperText={errors[activeMemberIndex]?.emailAddress}
                          {...textFieldProps}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          label="Residential Address *"
                          placeholder="House No, Street Name, City/Town"
                          value={currentMember.residentialAddress}
                          onChange={(e) => updateMember(activeMemberIndex, { residentialAddress: e.target.value })}
                          error={!!errors[activeMemberIndex]?.residentialAddress}
                          helperText={errors[activeMemberIndex]?.residentialAddress}
                          {...textFieldProps}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Occupation *"
                          placeholder="e.g. Farmer, Trader, Teacher"
                          value={currentMember.occupation}
                          onChange={(e) => updateMember(activeMemberIndex, { occupation: e.target.value })}
                          error={!!errors[activeMemberIndex]?.occupation}
                          helperText={errors[activeMemberIndex]?.occupation}
                          {...textFieldProps}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Position in Cooperative"
                          placeholder="e.g. Community leader, Marketing officer"
                          value={currentMember.position || ""}
                          onChange={(e) => updateMember(activeMemberIndex, { position: e.target.value })}
                          {...textFieldProps}
                        />
                      </Grid>

                      <Divider sx={{ width: "100%", my: 1 }} />

                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="BVN (Optional)"
                          placeholder="11-digit BVN"
                          value={currentMember.bvn || ""}
                          onChange={(e) => updateMember(activeMemberIndex, { bvn: e.target.value })}
                          inputProps={{ maxLength: 11 }}
                          {...textFieldProps}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="NIN (Optional)"
                          placeholder="National Identification Number"
                          value={currentMember.nin || ""}
                          onChange={(e) => updateMember(activeMemberIndex, { nin: e.target.value })}
                          inputProps={{ maxLength: 11 }}
                          {...textFieldProps}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Share Holding (₦)"
                          type="number"
                          placeholder="e.g. 100000"
                          value={currentMember.shareHolding || ""}
                          onChange={(e) => updateMember(activeMemberIndex, { shareHolding: e.target.value })}
                          {...textFieldProps}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Years in Cooperative"
                          type="number"
                          placeholder="e.g. 3"
                          value={currentMember.yearsInCooperative || ""}
                          onChange={(e) => updateMember(activeMemberIndex, { yearsInCooperative: e.target.value })}
                          {...textFieldProps}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              )}
            </Grid>
          </Grid>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "stretch", sm: "center" }}
            sx={{ mt: 3.5, pt: 2.5, borderTop: "1px solid #F1F5F9" }}
            spacing={2}
          >
            <Box>
              <Typography sx={{ fontSize: "0.8rem", color: "#94A3B8", fontWeight: 600, mb: 0.5 }}>
                Executive Members ({executives.length}) · General Members ({generalMembers.length})
              </Typography>
              <Typography sx={{ fontSize: "0.8rem", color: "#64748B" }}>
                Minimum: Chairman, Secretary, Treasurer are required.
              </Typography>
            </Box>
            <Stack direction={{ xs: "column-reverse", sm: "row" }} spacing={{ xs: 1.5, sm: 2 }}>
              <Button
                type="button"
                onClick={onBack}
                variant="outlined"
                startIcon={<ArrowBack />}
                sx={{
                  px: 3.5,
                  py: 1.4,
                  fontWeight: 700,
                  fontSize: "0.92rem",
                  borderRadius: 2,
                  fontFamily: "var(--font-poppins)",
                  textTransform: "none",
                  borderColor: "#CBD5E1",
                  color: "#475569",
                  "&:hover": { borderColor: "#94A3B8", bgcolor: "#F8FAFC" },
                }}
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={saving}
                variant="contained"
                endIcon={<ArrowForward />}
                sx={{
                  backgroundColor: primaryColor,
                  px: 5,
                  py: 1.5,
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  borderRadius: 2,
                  fontFamily: "var(--font-poppins)",
                  boxShadow: `0 6px 20px ${primaryColor}40`,
                  "&:hover": {
                    backgroundColor: "#c49f2d",
                    transform: "translateY(-1.5px)",
                    boxShadow: `0 8px 24px ${primaryColor}55`,
                  },
                  transition: "all 0.3s ease",
                  textTransform: "none",
                }}
              >
                {saving ? "Saving..." : "Save & Continue"}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </CardContent>
    </MotionCard>
  );
}
