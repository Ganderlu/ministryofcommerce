import { Metadata } from "next";
import { Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";
import dynamic from "next/dynamic";

const SMERegistrationClient = dynamic(
  () => import("@/components/sme-registration/SMERegistrationClient"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Register SME | Anambra State Ministry of Commerce",
  description:
    "Complete your SME registration with the Anambra State Ministry of Commerce. Fill in your SME details, owner/director information, upload required documents, and submit your application online.",
  keywords: [
    "Anambra State",
    "SME Registration",
    "Register SME",
    "Ministry of Commerce",
    "SME Application",
    "Small Business",
    "Medium Enterprise",
    "MSME",
    "Form",
  ],
  openGraph: {
    title: "Register SME | Anambra State Ministry of Commerce",
    description:
      "Complete your SME registration form online with the Anambra State Ministry of Commerce.",
    type: "website",
    siteName: "Anambra State Ministry of Commerce",
  },
  twitter: {
    card: "summary_large_image",
    title: "Register SME | Anambra State Ministry of Commerce",
    description:
      "Complete your SME registration form online.",
  },
};

export default function SMERegisterPage() {
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
      <SMERegistrationClient />
    </Suspense>
  );
}
