import { Metadata } from "next";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MediaHero from "@/components/media/MediaHero";
import NewsSection from "@/components/media/NewsSection";
import EventsSection from "@/components/media/EventsSection";
import GallerySection from "@/components/media/Gallery";

export const metadata: Metadata = {
  title: "Media | Anambra State Ministry of Commerce",
  description:
    "Stay updated with the latest news, events, and photo gallery from the Anambra State Ministry of Commerce.",
  keywords:
    "Anambra, Ministry of Commerce, news, events, gallery, media",
  openGraph: {
    title: "Media | Anambra State Ministry of Commerce",
    description:
      "Stay updated with the latest news, events, and photo gallery from the Anambra State Ministry of Commerce.",
    url: "/media",
    siteName: "Anambra State Ministry of Commerce",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Media | Anambra State Ministry of Commerce",
    description:
      "Stay updated with the latest news, events, and photo gallery from the Anambra State Ministry of Commerce.",
  },
};

export default function MediaPage() {
  return (
    <main>
      <TopBar />
      <Navbar />
      <MediaHero />
      <NewsSection />
      <EventsSection />
      <GallerySection />
      <Footer />
    </main>
  );
}