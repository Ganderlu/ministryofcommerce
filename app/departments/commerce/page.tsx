import { Metadata } from "next";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DepartmentSection from "@/components/departments/DepartmentSection";

export const metadata: Metadata = {
  title: "Commerce Department | Anambra State Ministry of Commerce",
  description:
    "The Commerce Department of Anambra State Ministry of Commerce is responsible for promoting and developing commercial activities across the state.",
};

export default function CommercePage() {
  return (
    <main>
      <TopBar />
      <Navbar />
      <DepartmentSection
        title="Department of Commerce"
        subtitle="Department"
        description="The Department of Commerce is dedicated to promoting, regulating, and developing commercial activities across Anambra State. We work to create an enabling environment for businesses to thrive, from small market traders to large commercial enterprises."
        responsibilities={[
          "Formulating and implementing policies for commercial development in the state.",
          "Regulating and overseeing market operations and commercial activities.",
          "Promoting fair trade practices and consumer protection.",
          "Supporting the development of modern commercial infrastructure.",
          "Collaborating with market associations and business organizations.",
          "Facilitating the growth of wholesale and retail trade.",
        ]}
        keyInitiatives={[
          "Modernization of major markets across Anambra State.",
          "Establishment of standard commercial centers and shopping complexes.",
          "Training programs for traders and business owners.",
          "Development of e-commerce platforms for local businesses.",
        ]}
        contactInfo={{
          email: "commerce@commerce.anambrastate.gov.ng",
          phone: "+234 (0) 813 423 4567",
        }}
      />
      <Footer />
    </main>
  );
}
