import { Metadata } from "next";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DepartmentSection from "@/components/departments/DepartmentSection";

export const metadata: Metadata = {
  title: "Cooperatives Department | Anambra State Ministry of Commerce",
  description:
    "The Cooperatives Department supports and regulates cooperative societies across Anambra State, promoting collective enterprise and economic empowerment.",
};

export default function CooperativesPage() {
  return (
    <main>
      <TopBar />
      <Navbar />
      <DepartmentSection
        title="Department of Cooperatives"
        subtitle="Department"
        description="The Department of Cooperatives is responsible for the registration, regulation, and development of cooperative societies in Anambra State. We empower citizens through collective enterprise, promoting economic self-reliance and community development through cooperative models."
        responsibilities={[
          "Registration and regulation of cooperative societies.",
          "Providing training and capacity building for cooperative members.",
          "Facilitating access to finance and resources for cooperatives.",
          "Monitoring and ensuring compliance with cooperative laws and regulations.",
          "Promoting cooperative development in all sectors of the economy.",
          "Supporting the establishment of new cooperative societies.",
        ]}
        keyInitiatives={[
          "Cooperative registration drive across all 21 local government areas.",
          "Capacity building workshops for cooperative leaders.",
          "Cooperative financing and grant programs.",
          "Establishment of cooperative federations and unions.",
        ]}
        contactInfo={{
          email: "cooperatives@commerce.anambrastate.gov.ng",
          phone: "+234 (0) 813 423 4568",
        }}
      />
      <Footer />
    </main>
  );
}
