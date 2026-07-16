import { Metadata } from "next";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DepartmentSection from "@/components/departments/DepartmentSection";

export const metadata: Metadata = {
  title: "Finance & Account Department | Anambra State Ministry of Commerce",
  description:
    "The Finance & Account Department manages the Ministry's financial resources, ensuring fiscal responsibility and transparency.",
};

export default function FinanceAccountPage() {
  return (
    <main>
      <TopBar />
      <Navbar />
      <DepartmentSection
        title="Department of Finance & Account"
        subtitle="Department"
        description="The Department of Finance and Account is responsible for managing the Ministry's financial resources, ensuring fiscal discipline, transparency, and accountability in all financial operations. We provide financial management support to all departments and units of the Ministry."
        responsibilities={[
          "Managing the Ministry's financial resources and budget.",
          "Preparing and implementing annual budgets.",
          "Ensuring compliance with financial regulations and reporting standards.",
          "Processing payments and financial transactions.",
          "Financial reporting and record keeping.",
          "Coordinating with auditing agencies.",
        ]}
        keyInitiatives={[
          "Implementation of modern financial management systems.",
          "Enhanced budget transparency and accountability.",
          "Financial training for Ministry staff.",
          "Improved financial reporting and record keeping.",
        ]}
        contactInfo={{
          email: "finance@commerce.anambrastate.gov.ng",
          phone: "+234 (0) 813 423 4573",
        }}
      />
      <Footer />
    </main>
  );
}
