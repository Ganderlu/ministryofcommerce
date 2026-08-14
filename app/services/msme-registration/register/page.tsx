import { Metadata } from "next";
import MSMERegistrationClient from "@/components/msme-registration/MSMERegistrationClient";

export const metadata: Metadata = {
  title: "Register MSME | Anambra State Ministry of Commerce",
  description:
    "Complete your MSME registration with the Anambra State Ministry of Commerce. Fill in your business details, owner/director information, upload required documents, and submit your application online.",
  keywords: [
    "Anambra State",
    "MSME Registration",
    "Register MSME",
    "Ministry of Commerce",
    "MSME Application",
    "Micro Enterprise",
    "Small Business",
    "Medium Enterprise",
    "Form",
  ],
  openGraph: {
    title: "Register MSME | Anambra State Ministry of Commerce",
    description:
      "Complete your MSME registration form online with the Anambra State Ministry of Commerce.",
    type: "website",
    siteName: "Anambra State Ministry of Commerce",
  },
  twitter: {
    card: "summary_large_image",
    title: "Register MSME | Anambra State Ministry of Commerce",
    description:
      "Complete your MSME registration form online.",
  },
};

export default function MSMERegisterPage() {
  return <MSMERegistrationClient />;
}
