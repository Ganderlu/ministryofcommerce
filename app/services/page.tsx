import { Metadata } from "next";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Box, Container, Typography } from "@mui/material";

export const metadata: Metadata = {
  title: "Services | Anambra State Ministry of Commerce",
  description: "Services page - Coming Soon",
};

export default function ServicesPage() {
  const accentColor = "#D4AF37";
  
  return (
    <Box>
      <TopBar />
      <Navbar />
      <Box sx={{ py: { xs: 16, md: 24 }, backgroundColor: "white" }}>
        <Container maxWidth="xl" sx={{ textAlign: "center" }}>
          <Typography
            variant="overline"
            sx={{
              color: accentColor,
              fontWeight: 700,
              letterSpacing: 1.5,
              fontSize: "0.85rem",
              mb: 2,
            }}
          >
            COMING SOON
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              fontFamily: "var(--font-poppins)",
              color: "#333",
              mb: 4,
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            Services Page
          </Typography>
          <Typography
            sx={{
              color: "#666",
              fontSize: "1.1rem",
              lineHeight: 1.8,
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            We are working on something great! This page will be available soon.
          </Typography>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
