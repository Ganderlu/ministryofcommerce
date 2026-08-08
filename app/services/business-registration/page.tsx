import { Metadata } from "next";
import { Box } from "@mui/material";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/business-registration/Hero";
import Benefits from "@/components/business-registration/Benefits";
import Eligibility from "@/components/business-registration/Eligibility";
import RegistrationProcess from "@/components/business-registration/RegistrationProcess";
import CTA from "@/components/business-registration/CTA";

export const metadata: Metadata = {
  title: "Business Registration | Anambra State Ministry of Commerce",
  description:
    "Register your business with the Anambra State Ministry of Commerce. Start, Register, Grow. Gain legal recognition, access government opportunities, funding, and support for your enterprise.",
  keywords: [
    "Anambra State",
    "Business Registration",
    "Ministry of Commerce",
    "Register Business",
    "CAC",
    "TIN",
    "MSME",
    "Legal Recognition",
    "Business Support",
    "Anambra Business",
  ],
  openGraph: {
    title: "Business Registration | Anambra State Ministry of Commerce",
    description:
      "Register your business with the Anambra State Ministry of Commerce. Start. Register. Grow.",
    type: "website",
    siteName: "Anambra State Ministry of Commerce",
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Registration | Anambra State Ministry of Commerce",
    description:
      "Register your business with the Anambra State Ministry of Commerce. Start. Register. Grow.",
  },
};

export default function BusinessRegistrationPage() {
  return (
    <Box>
      <TopBar />
      <Navbar />
      <Hero />
      <Benefits />
      <Eligibility />
      <RegistrationProcess />
      <CTA />
      <Footer />
    </Box>
  );
}
