import { Metadata } from "next";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DepartmentSection from "@/components/departments/DepartmentSection";

export const metadata: Metadata = {
  title: "Administration & Human Resource Department | Anambra State Ministry of Commerce",
  description:
    "The Administration & Human Resource Department manages the Ministry's operations, personnel, and administrative functions.",
};

export default function AdministrationHRPage() {
  return (
    <main>
      <TopBar />
      <Navbar />
      <DepartmentSection
        title="Department of Administration & Human Resource"
        subtitle="Department"
        description="The Department of Administration and Human Resource is responsible for managing the Ministry's administrative operations, human capital development, and general welfare of staff. We ensure efficient service delivery through effective management of resources and personnel."
        responsibilities={[
          "Managing the Ministry's administrative operations.",
          "Human resource management and staff development.",
          "Coordinating internal and external communications.",
          "Managing office facilities and logistics.",
          "Implementing staff welfare programs.",
          "Organizing training and capacity building for Ministry staff.",
        ]}
        keyInitiatives={[
          "Staff capacity building and professional development programs.",
          "Modernization of administrative processes and systems.",
          "Staff welfare and motivation initiatives.",
          "Improved internal communication and coordination.",
        ]}
        contactInfo={{
          email: "adminhr@commerce.anambrastate.gov.ng",
          phone: "+234 (0) 813 423 4572",
        }}
      />
      <Footer />
    </main>
  );
}
