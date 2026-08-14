import { Metadata } from "next";
import SMERegistrationClient from "@/components/sme-registration/SMERegistrationClient";

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
  return <SMERegistrationClient />;
}
