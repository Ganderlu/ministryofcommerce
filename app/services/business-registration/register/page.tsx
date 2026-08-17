import { Metadata } from "next";
import { Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";
import dynamic from "next/dynamic";

const BusinessRegistrationClient = dynamic(
  () => import("@/components/business-registration/BusinessRegistrationClient"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Register Business | Anambra State Ministry of Commerce",
  description:
    "Complete your business registration with the Anambra State Ministry of Commerce. Fill in your business details, owner/director information, upload required documents, and submit your application online.",
  keywords: [
    "Anambra State",
    "Business Registration",
    "Register Business",
    "Ministry of Commerce",
    "Business Application",
    "CAC",
    "MSME Registration",
    "Form",
  ],
  openGraph: {
    title: "Register Business | Anambra State Ministry of Commerce",
    description:
      "Complete your business registration form online with the Anambra State Ministry of Commerce.",
    type: "website",
    siteName: "Anambra State Ministry of Commerce",
  },
  twitter: {
    card: "summary_large_image",
    title: "Register Business | Anambra State Ministry of Commerce",
    description: "Complete your business registration form online....",
  },
};

export default function BusinessRegisterPage() {
  return (
    <Suspense
      fallback={
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#F8FAFC",
          }}
        >
          <CircularProgress sx={{ color: "#D4AF37" }} />
        </Box>
      }
    >
      <BusinessRegistrationClient />
    </Suspense>
  );
}
