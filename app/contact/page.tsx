import { Metadata } from "next";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactHero from "@/components/contact/Hero";
import ContactCards from "@/components/contact/ContactCards";
import SupportSection from "@/components/contact/SupportSection";

export const metadata: Metadata = {
  title: "Contact Us | Anambra State Ministry of Commerce",
  description:
    "Get in touch with the Anambra State Ministry of Commerce for enquiries, feedback, partnerships, or assistance. We are here to help businesses, investors, and citizens.",
  keywords:
    "Anambra, Ministry of Commerce, contact, enquiry, partnership, support",
  openGraph: {
    title: "Contact Us | Anambra State Ministry of Commerce",
    description:
      "Get in touch with the Anambra State Ministry of Commerce for enquiries, feedback, partnerships, or assistance.",
    url: "/contact",
    siteName: "Anambra State Ministry of Commerce",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Anambra State Ministry of Commerce",
    description:
      "Get in touch with the Anambraa State Ministry of Commerce for enquiries, feedback, partnerships, or assistance.",
  },
};

export default function ContactPage() {
  return (
    <main>
      <TopBar />
      <Navbar />
      <ContactHero />
      <ContactCards />
      <SupportSection />
      <Footer />
    </main>
  );
}
