import { Metadata } from "next";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DepartmentSection from "@/components/departments/DepartmentSection";

export const metadata: Metadata = {
  title: "Trade & Industry Department | Anambra State Ministry of Commerce",
  description:
    "The Trade & Industry Department promotes industrial development, trade facilitation, and manufacturing growth across Anambra State.",
};

export default function TradeIndustryPage() {
  return (
    <main>
      <TopBar />
      <Navbar />
      <DepartmentSection
        title="Department of Trade & Industry"
        subtitle="Department"
        description="The Department of Trade and Industry focuses on promoting industrialization, manufacturing, and trade development in Anambra State. We support local industries, facilitate international trade, and work to make Anambra a leading industrial hub in Nigeria."
        responsibilities={[
          "Promoting industrial development and manufacturing growth.",
          "Facilitating international and local trade.",
          "Supporting small and medium-sized industries (SMIs).",
          "Developing industrial parks and industrial zones.",
          "Implementing industrial policies and incentives.",
          "Promoting made-in-Anambra products.",
        ]}
        keyInitiatives={[
          "Development of industrial parks and special economic zones.",
          "Made-in-Anambra product promotion campaigns.",
          "Industrial skills development programs.",
          "Trade missions and international exhibitions participation.",
        ]}
        contactInfo={{
          email: "tradeindustry@commerce.anambrastate.gov.ng",
          phone: "+234 (0) 813 423 4569",
        }}
      />
      <Footer />
    </main>
  );
}
