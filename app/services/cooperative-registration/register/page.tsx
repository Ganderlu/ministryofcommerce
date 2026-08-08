import { Metadata } from "next";
import { Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";
import dynamic from "next/dynamic";

const CooperativeRegistrationClient = dynamic(
  () => import("./CooperativeRegistrationClient"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Register Cooperative | Anambra State Ministry of Commerce",
  description:
    "Complete your cooperative society registration with the Anambra State Ministry of Commerce. Fill in your cooperative details, upload required documents, and submit your application.",
  keywords: [
    "Anambra State",
    "Cooperative Registration",
    "Register Cooperative",
    "Ministry of Commerce",
    "Cooperative Application",
    "Form",
  ],
  openGraph: {
    title: "Register Cooperative | Anambra State Ministry of Commerce",
    description:
      "Complete your cooperative society registration form online with the Anambra State Ministry of Commerce.",
    type: "website",
    siteName: "Anambra State Ministry of Commerce",
  },
  twitter: {
    card: "summary_large_image",
    title: "Register Cooperative | Anambra State Ministry of Commerce",
    description:
      "Complete your cooperative society registration form online.",
  },
};

export default function CooperativeRegisterPage() {
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
      <CooperativeRegistrationClient />
    </Suspense>
  );
}
