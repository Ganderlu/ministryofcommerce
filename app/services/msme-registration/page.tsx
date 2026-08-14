import { Metadata } from "next";
import { Box } from "@mui/material";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/msme-registration/Hero";
import Benefits from "@/components/msme-registration/Benefits";
import Eligibility from "@/components/msme-registration/Eligibility";
import DocumentsSection from "@/components/msme-registration/DocumentsSection";
import RegistrationProcess from "@/components/msme-registration/RegistrationProcess";
import CTA from "@/components/msme-registration/CTA";

export const metadata: Metadata = {
  title: "MSME Registration | Anambra State Ministry of Commerce",
  description:
    "Register your Micro, Small and Medium Enterprise (MSME) with the Anambra State Ministry of Commerce. Empowering MSMEs. Driving Growth. Building Anambra. Unlock access to government support programmes, financing opportunities, capacity-building and business development opportunities tailored for MSMEs.",
  keywords: [
    "Anambra State",
    "MSME Registration",
    "Micro Small Medium Enterprise",
    "Ministry of Commerce",
    "Register MSME",
    "MSME Support",
    "MSME Financing",
    "Capacity Building",
    "Anambra MSME",
    "Government Programmes",
    "MSME",
    "Micro Enterprise",
    "Small Business",
  ],
  openGraph: {
    title: "MSME Registration | Anambra State Ministry of Commerce",
    description:
      "Register your Micro, Small and Medium Enterprise (MSME) with the Anambra State Ministry of Commerce. Empowering MSMEs. Driving Growth. Building Anambra.",
    type: "website",
    siteName: "Anambra State Ministry of Commerce",
  },
  twitter: {
    card: "summary_large_image",
    title: "MSME Registration | Anambra State Ministry of Commerce",
    description:
      "Register your Micro, Small and Medium Enterprise (MSME) with the Anambra State Ministry of Commerce. Empowering MSMEs. Driving Growth. Building Anambra.",
  },
};

export default function MSMERegistrationPage() {
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
