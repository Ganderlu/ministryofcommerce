"use client";
import { Box, Stepper, Step, StepLabel, Container, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const steps = [
  "Cooperative Details",
  "Members Information",
  "Documents Upload",
  "Review & Submit",
];

interface RegistrationStepperProps {
  activeStep: number;
}

export default function RegistrationStepper({ activeStep }: RegistrationStepperProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const primaryColor = "#D4AF37";
  const accentColor = "#D4AF37";
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
                fontSize: { xs: "0.8rem", md: "0.9rem" },
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
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </MotionBox>
      </Container>
    </Box>
  );
}
