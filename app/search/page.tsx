import { Metadata } from "next";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchHero from "@/components/search/SearchHero";
import SearchResults from "@/components/search/SearchResults";
import { Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";

export const metadata: Metadata = {
  title: "Search | Anambra State Ministry of Commerce",
  description:
    "Search the Anambra State Ministry of Commerce portal for services, news, events, departments, units, team members, registration resources, and contact information.",
  keywords:
    "Anambra, Ministry of Commerce, search, services, news, events, departments, units, registration",
  openGraph: {
    title: "Search | Anambra State Ministry of Commerce",
    description:
      "Find services, news, events, departments, and resources across the Anambra State Ministry of Commerce portal.",
    url: "/search",
    siteName: "Anambra State Ministry of Commerce",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Search | Anambra State Ministry of Commerce",
    description:
      "Find services, news, events, departments, and resources across the Anambra State Ministry of Commerce portal.",
  },
};

export default function SearchPage() {
  return (
    <main>
      <TopBar />
      <Navbar />
      <SearchHero />
      <Suspense
        fallback={
          <Box
            sx={{
              py: 12,
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#FAFBFC",
            }}
          >
            <CircularProgress sx={{ color: "#D4AF37" }} />
          </Box>
        }
      >
        <SearchResults />
      </Suspense>
      <Footer />
    </main>
  );
}
