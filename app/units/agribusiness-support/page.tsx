import { Metadata } from "next";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DepartmentSection from "@/components/departments/DepartmentSection";

export const metadata: Metadata = {
  title: "Agribusiness Support Unit | Anambra State Ministry of Commerce",
  description:
    "The Agribusiness Support Unit promotes agricultural commerce, value addition, and agribusiness development in Anambra State.",
};

export default function AgribusinessSupportPage() {
  return (
    <main>
      <TopBar />
      <Navbar />
      <DepartmentSection
        title="Agribusiness Support Unit"
        subtitle="Unit"
        description="The Agribusiness Support Unit is dedicated to promoting agricultural commerce, value addition, and the development of agribusiness enterprises in Anambra State. We link farmers to markets, support agro-processing, and facilitate agribusiness investments."
        responsibilities={[
          "Promoting agribusiness development and value addition.",
          "Linking farmers to local and international markets.",
          "Supporting agro-processing enterprises.",
          "Facilitating agribusiness investments.",
          "Promoting agricultural exports from Anambra State.",
          "Supporting farmer cooperatives and associations.",
        ]}
        keyInitiatives={[
          "Agribusiness value chain development programs.",
          "Farmers' market access initiatives.",
          "Agro-processing entrepreneurship support.",
          "Agricultural export promotion.",
        ]}
        contactInfo={{
          email: "agribusiness@commerce.anambrastate.gov.ng",
          phone: "+234 (0) 813 423 4574",
        }}
      />
      <Footer />
    </main>
  );
}
