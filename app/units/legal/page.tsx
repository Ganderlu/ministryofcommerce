import { Metadata } from "next";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DepartmentSection from "@/components/departments/DepartmentSection";

export const metadata: Metadata = {
  title: "Legal Unit | Anambra State Ministry of Commerce",
  description:
    "The Legal Unit provides legal advice, support, and representation to the Ministry, ensuring legal compliance.",
};

export default function LegalPage() {
  return (
    <main>
      <TopBar />
      <Navbar />
      <DepartmentSection
        title="Legal Unit"
        subtitle="Unit"
        description="The Legal Unit provides legal advice, support, and representation to the Ministry. We ensure legal compliance, draft and review legal documents, and represent the Ministry in legal matters."
        responsibilities={[
          "Providing legal advice and guidance to the Ministry.",
          "Drafting and reviewing legal documents, contracts, and agreements.",
          "Ensuring compliance with laws and regulations.",
          "Representing the Ministry in legal proceedings.",
          "Conducting legal research and analysis.",
          "Advising on policy and legislative matters.",
        ]}
        keyInitiatives={[
          "Legal compliance framework implementation.",
          "Legal awareness training for staff.",
          "Contract management system development.",
          "Legal support for Ministry programs and initiatives.",
        ]}
        contactInfo={{
          email: "legal@commerce.anambrastate.gov.ng",
          phone: "+234 (0) 813 423 4579",
        }}
      />
      <Footer />
    </main>
  );
}
