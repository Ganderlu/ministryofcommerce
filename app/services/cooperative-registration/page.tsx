import { Metadata } from "next";
import { Box } from "@mui/material";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/cooperative/Hero";
import Benefits from "@/components/cooperative/Benefits";
import Eligibility from "@/components/cooperative/Eligibility";
import RegistrationProcess from "@/components/cooperative/RegistrationProcess";
import CTA from "@/components/cooperative/CTA";

export const metadata: Metadata = {
  title: "Cooperative Registration | Anambra State Ministry of Commerce",
  description:
    "Register your cooperative society with the Anambra State Ministry of Commerce. Enjoy legal recognition, access to government support, funding opportunities, and technical development services.",
  keywords: [
    "Anambra State",
    "Cooperative Registration",
    "Ministry of Commerce",
    "Cooperative Society",
    "Business Registration",
    "Anambra Cooperatives",
    "Legal Recognition",
    "Funding Opportunities",
  ],
  openGraph: {
    title: "Cooperative Registration | Anambra State Ministry of Commerce",
    description:
      "Register your cooperative society with the Anambra State Ministry of Commerce. Build Stronger Together.",
    type: "website",
    siteName: "Anambra State Ministry of Commerce",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cooperative Registration | Anambra State Ministry of Commerce",
    description:
      "Register your cooperative society with the Anambra State Ministry of Commerce. Build Stronger Together.",
  },
};

export default function CooperativeRegistrationPage() {
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
