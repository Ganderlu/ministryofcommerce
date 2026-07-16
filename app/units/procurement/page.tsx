import { Metadata } from "next";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DepartmentSection from "@/components/departments/DepartmentSection";

export const metadata: Metadata = {
  title: "Procurement Unit | Anambra State Ministry of Commerce",
  description:
    "The Procurement Unit manages the Ministry's procurement processes, ensuring transparency, efficiency, and compliance.",
};

export default function ProcurementPage() {
  return (
    <main>
      <TopBar />
      <Navbar />
      <DepartmentSection
        title="Procurement Unit"
        subtitle="Unit"
        description="The Procurement Unit is responsible for managing the Ministry's procurement processes in accordance with public procurement laws and regulations. We ensure transparency, efficiency, and value for money in all procurement activities of the Ministry."
        responsibilities={[
          "Managing the Ministry's procurement processes.",
          "Ensuring compliance with public procurement laws.",
          "Tender management and evaluation.",
          "Vendor management and pre-qualification.",
          "Procurement planning and budget alignment.",
          "Maintaining procurement records and documentation.",
        ]}
        keyInitiatives={[
          "Digitization of procurement processes.",
          "Enhanced transparency in procurement operations.",
          "Vendor development and capacity building.",
          "Procurement best practices implementation.",
        ]}
        contactInfo={{
          email: "procurement@commerce.anambrastate.gov.ng",
          phone: "+234 (0) 813 423 4575",
        }}
      />
      <Footer />
    </main>
  );
}
