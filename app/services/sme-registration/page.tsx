import { Metadata } from "next";
import { Box } from "@mui/material";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sme-registration/Hero";
import Benefits from "@/components/sme-registration/Benefits";
import Eligibility from "@/components/sme-registration/Eligibility";
import DocumentsSection from "@/components/sme-registration/DocumentsSection";
import RegistrationProcess from "@/components/sme-registration/RegistrationProcess";
import CTA from "@/components/sme-registration/CTA";

export const metadata: Metadata = {
  title: "SME Registration | Anambra State Ministry of Commerce",
  description:
    "Register your Small and Medium Enterprise (SME) with the Anambra State Ministry of Commerce. Empowering Small Businesses. Building a Prosperous Anambra. Unlock access to government support programmes, financing opportunities, capacity-building and business development opportunities.",
  keywords: [
    "Anambra State",
    "SME Registration",
    "Small Medium Enterprise",
    "Ministry of Commerce",
    "Register SME",
    "Business Support",
    "SME Financing",
    "Capacity Building",
    "Anambra SME",
    "Government Programmes",
    "MSME",
  ],
  openGraph: {
    title: "SME Registration | Anambra State Ministry of Commerce",
    description:
      "Register your Small and Medium Enterprise (SME) with the Anambra State Ministry of Commerce. Empowering Small Businesses. Building a Prosperous Anambra.",
    type: "website",
    siteName: "Anambra State Ministry of Commerce",
  },
  twitter: {
    card: "summary_large_image",
    title: "SME Registration | Anambra State Ministry of Commerce",
    description:
      "Register your Small and Medium Enterprise (SME) with the Anambra State Ministry of Commerce. Empowering Small Businesses. Building a Prosperous Anambra.",
  },
};

export default function SMERegistrationPage() {
  return (
    <Box>
      <TopBar />
      <Navbar />
      <Hero />
      <Benefits />
      <Eligibility />
      <DocumentsSection />
      <RegistrationProcess />
      <CTA />
      <Footer />
    </Box>
  );
}
