import { Metadata } from "next";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutSection from "@/components/about/AboutSection";

export const metadata: Metadata = {
  title: "About Us | Anambra State Ministry of Commerce",
  description:
    "Learn about the Anambra State Ministry of Commerce - our mission, vision, team, and commitment to driving economic development through commerce, trade, and investment.",
  keywords:
    "Anambra, Ministry of Commerce, about us, mission, vision, team, economic development",
  openGraph: {
    title: "About Us | Anambra State Ministry of Commerce",
    description:
      "Learn about the Anambra State Ministry of Commerce - our mission, vision, and team.",
    url: "/about",
    siteName: "Anambra State Ministry of Commerce",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Anambra State Ministry of Commerce",
    description:
      "Learn about the Anambra State Ministry of Commerce - our mission, vision, and team.",
  },
};

export default function AboutPage() {
  return (
    <main>
      <TopBar />
      <Navbar />
      <AboutSection />
      <Footer />
    </main>
  );
}
