import type { Metadata } from "next";
import TopBar from "@/components/layout/TopBar";
import TopBarDark from "@/components/layout/TopBarDark";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Services from "@/components/home/Services";
import News from "@/components/home/News";
import Partners from "@/components/home/Partners";
import CTA from "@/components/home/CTA";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Official portal of the Anambra State Ministry of Commerce. Register businesses, SMEs, MSMEs and cooperatives. Explore investment, trade permits, export promotion and enterprise support programmes.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Anambra State Ministry of Commerce — Official Portal",
    description:
      "Building a thriving commerce and investment ecosystem in Anambra State. Business, SME, MSME and Cooperative registration services.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anambra State Ministry of Commerce — Official Portal",
    description:
      "Official portal for Business, SME, MSME and Cooperative registration in Anambra State.",
  },
};

export default function Home() {
  return (
    <>
      <TopBar />
      <TopBarDark />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <News />
      <Partners />
      <CTA />
      <Footer />
    </>
  );
}
