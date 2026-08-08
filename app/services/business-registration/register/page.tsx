import { Metadata } from "next";
import { Box, Container, Grid } from "@mui/material";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RegistrationStepper from "@/components/business-registration/RegistrationStepper";
import BusinessInformationForm from "@/components/business-registration/BusinessInformationForm";
import GuidelinesSidebar from "@/components/business-registration/GuidelinesSidebar";
import RequiredDocuments from "@/components/business-registration/RequiredDocuments";
import HelpCard from "@/components/business-registration/HelpCard";

export const metadata: Metadata = {
  title: "Register Business | Anambra State Ministry of Commerce",
  description:
    "Complete your business registration with the Anambra State Ministry of Commerce. Fill in your business details, owner/director information, upload required documents, and submit your application online.",
  keywords: [
    "Anambra State",
    "Business Registration",
    "Register Business",
    "Ministry of Commerce",
    "Business Application",
    "CAC",
    "MSME Registration",
    "Form",
  ],
  openGraph: {
    title: "Register Business | Anambra State Ministry of Commerce",
    description:
      "Complete your business registration form online with the Anambra State Ministry of Commerce.",
    type: "website",
    siteName: "Anambra State Ministry of Commerce",
  },
  twitter: {
    card: "summary_large_image",
    title: "Register Business | Anambra State Ministry of Commerce",
    description:
      "Complete your business registration form online.",
  },
};

export default function BusinessRegisterPage() {
  return (
    <Box>
      <TopBar />
      <Navbar />
      <RegistrationStepper activeStep={0} />
      <Box sx={{ py: { xs: 5, md: 7 }, backgroundColor: "#F8FAFC" }}>
        <Container maxWidth="xl">
          <Grid container spacing={3.5}>
            <Grid item xs={12} lg={8}>
              <BusinessInformationForm />
            </Grid>
            <Grid item xs={12} lg={4}>
              <GuidelinesSidebar />
              <RequiredDocuments />
              <HelpCard />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
