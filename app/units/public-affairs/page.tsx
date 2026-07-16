import { Metadata } from "next";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DepartmentSection from "@/components/departments/DepartmentSection";

export const metadata: Metadata = {
  title: "Public Affairs Unit | Anambra State Ministry of Commerce",
  description:
    "The Public Affairs Unit manages the Ministry's communication, public relations, and stakeholder engagement.",
};

export default function PublicAffairsPage() {
  return (
    <main>
      <TopBar />
      <Navbar />
      <DepartmentSection
        title="Public Affairs Unit"
        subtitle="Unit"
        description="The Public Affairs Unit is responsible for managing the Ministry's communication, public relations, and stakeholder engagement activities. We ensure effective communication of the Ministry's programs, policies, and achievements to the public."
        responsibilities={[
          "Managing the Ministry's public relations and communication.",
          "Media relations and press management.",
          "Organizing public events and programs.",
          "Stakeholder engagement and liaison.",
          "Content creation and dissemination.",
          "Managing the Ministry's social media and online presence.",
        ]}
        keyInitiatives={[
          "Enhanced digital communication strategy.",
          "Public awareness campaigns for Ministry programs.",
          "Stakeholder engagement forums.",
          "Media partnership programs.",
        ]}
        contactInfo={{
          email: "publicaffairs@commerce.anambrastate.gov.ng",
          phone: "+234 (0) 813 423 4576",
        }}
      />
      <Footer />
    </main>
  );
}
