import { Metadata } from "next";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DepartmentSection from "@/components/departments/DepartmentSection";

export const metadata: Metadata = {
  title: "Planning Unit | Anambra State Ministry of Commerce",
  description:
    "The Planning Unit coordinates strategic planning, policy development, and program monitoring in the Ministry.",
};

export default function PlanningPage() {
  return (
    <main>
      <TopBar />
      <Navbar />
      <DepartmentSection
        title="Planning Unit"
        subtitle="Unit"
        description="The Planning Unit is responsible for coordinating strategic planning, policy development, program monitoring, and evaluation in the Ministry. We ensure that the Ministry's programs and policies are aligned with the state's development objectives."
        responsibilities={[
          "Strategic planning and policy development.",
          "Program and project monitoring and evaluation.",
          "Research and data collection for policy formulation.",
          "Coordination of Ministry programs and initiatives.",
          "Reporting on program implementation and outcomes.",
          "Liaison with planning agencies and development partners.",
        ]}
        keyInitiatives={[
          "Development of Ministry strategic plans.",
          "Enhanced program monitoring and evaluation systems.",
          "Research and data analysis for evidence-based policy.",
          "Strategic partnerships with development organizations.",
        ]}
        contactInfo={{
          email: "planning@commerce.anambrastate.gov.ng",
          phone: "+234 (0) 813 423 4580",
        }}
      />
      <Footer />
    </main>
  );
}
