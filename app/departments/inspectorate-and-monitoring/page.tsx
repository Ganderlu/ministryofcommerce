import { Metadata } from "next";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DepartmentSection from "@/components/departments/DepartmentSection";

export const metadata: Metadata = {
  title: "Inspectorate & Monitoring Department | Anambra State Ministry of Commerce",
  description:
    "The Inspectorate & Monitoring Department ensures compliance with commercial laws and regulations, protecting consumers and businesses.",
};

export default function InspectorateMonitoringPage() {
  return (
    <main>
      <TopBar />
      <Navbar />
      <DepartmentSection
        title="Department of Inspectorate & Monitoring"
        subtitle="Department"
        description="The Department of Inspectorate and Monitoring is responsible for ensuring compliance with commercial laws, regulations, and standards in Anambra State. We protect consumers, ensure fair business practices, and maintain the integrity of commercial operations across the state."
        responsibilities={[
          "Monitoring compliance with commercial laws and regulations.",
          "Inspecting business premises and operations.",
          "Enforcing consumer protection measures.",
          "Addressing complaints and disputes in the commercial sector.",
          "Ensuring compliance with product quality standards.",
          "Conducting regular monitoring of markets and business activities.",
        ]}
        keyInitiatives={[
          "Regular market inspection programs.",
          "Consumer protection awareness campaigns.",
          "Complaint resolution mechanism for businesses and consumers.",
          "Compliance training for business operators.",
        ]}
        contactInfo={{
          email: "inspectorate@commerce.anambrastate.gov.ng",
          phone: "+234 (0) 813 423 4571",
        }}
      />
      <Footer />
    </main>
  );
}
