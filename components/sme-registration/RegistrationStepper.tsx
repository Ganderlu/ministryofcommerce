"use client";
import { Box, Stepper, Step, StepLabel, Container, useMediaQuery, useTheme, Typography, Stack } from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

interface StepItem {
  label: string;
  subtitle: string;
}

const steps: StepItem[] = [
  { label: "Business Information", subtitle: "Provide your SME details." },
  { label: "Owner/Director Details", subtitle: "Provide owner information." },
  { label: "Documents Upload", subtitle: "Upload required documents." },
  { label: "Review & Submit", subtitle: "Review and submit application." },
];

interface RegistrationStepperProps {
  activeStep: number;
}

export default function RegistrationStepper({ activeStep }: RegistrationStepperProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const primaryColor = "#D4AF37";
  const greyColor = "#CBD5E1";

  return (
    <Box sx={{ py: { xs: 3, md: 5 }, backgroundColor: "white", borderBottom: "1px solid #F1F5F9" }}>
      <Container maxWidth="xl">
        <MotionBox
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Stepper
            activeStep={activeStep}
            alternativeLabel={!isMobile}
            orientation={isMobile ? "vertical" : "horizontal"}
            sx={{
              "& .MuiStepLabel-label": {
                fontFamily: "var(--font-poppins)",
                fontWeight: 600,
                fontSize: { xs: "0.78rem", md: "0.9rem" },
                color: greyColor,
              },
              "& .MuiStepLabel-label.Mui-active": {
                color: primaryColor,
                fontWeight: 700,
              },
              "& .MuiStepLabel-label.Mui-completed": {
                color: primaryColor,
                fontWeight: 600,
              },
              "& .MuiStepIcon-root": {
                color: greyColor,
                "& .MuiStepIcon-text": {
                  fill: "white",
                  fontFamily: "var(--font-poppins)",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                },
              },
              "& .MuiStepIcon-root.Mui-active": {
                color: primaryColor,
                filter: `drop-shadow(0 4px 8px ${primaryColor}30)`,
                transform: "scale(1.1)",
              },
              "& .MuiStepIcon-root.Mui-completed": {
                color: primaryColor,
              },
              "& .MuiStepConnector-line": {
                borderTopWidth: 3,
                borderColor: greyColor,
                borderRadius: 2,
              },
              "& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line": {
                borderColor: primaryColor,
              },
              "& .MuiStepConnector-root.Mui-active .MuiStepConnector-line": {
                borderColor: `${primaryColor}60`,
              },
            }}
          >
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  optional={
                    <Stack alignItems={isMobile ? "flex-start" : "center"} spacing={0.3} sx={{ mt: isMobile ? 0.5 : 0.8 }}>
                      <Typography
                        variant="caption"
                        sx={{
                          fontFamily: "var(--font-inter)",
                          fontWeight: index === activeStep ? 600 : 500,
                          fontSize: "0.72rem",
                          color: index === activeStep ? primaryColor : "#94A3B8",
                          letterSpacing: 0.2,
                        }}
                      >
                        {step.subtitle}
                      </Typography>
                    </Stack>
                  }
                >
                  {step.label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </MotionBox>
      </Container>
    </Box>
  );
}
