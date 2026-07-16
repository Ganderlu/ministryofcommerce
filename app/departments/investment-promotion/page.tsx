import { Metadata } from "next";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DepartmentSection from "@/components/departments/DepartmentSection";

export const metadata: Metadata = {
  title: "Investment Promotion Department | Anambra State Ministry of Commerce",
  description:
    "The Investment Promotion Department attracts, facilitates, and retains investments in Anambra State, driving economic growth and job creation.",
};

export default function InvestmentPromotionPage() {
  return (
    <main>
      <TopBar />
      <Navbar />
      <DepartmentSection
        title="Department of Investment Promotion"
        subtitle="Department"
        description="The Department of Investment Promotion is the focal point for investment attraction, facilitation, and aftercare in Anambra State. We work to position Anambra as the preferred investment destination in Nigeria by showcasing investment opportunities, providing investment support services, and ensuring investor satisfaction."
        responsibilities={[
          "Promoting Anambra State as an investment destination.",
          "Facilitating investment processes and approvals.",
          "Providing aftercare services to investors.",
          "Identifying and developing investment opportunities.",
          "Organizing investment forums and roadshows.",
          "Collaborating with local and international investment partners.",
        ]}
        keyInitiatives={[
          "One-stop investment center for ease of doing business.",
          "Investment promotion roadshows locally and internationally.",
          "Investor aftercare and support program.",
          "Development of investment opportunity portfolios.",
        ]}
        contactInfo={{
          email: "investment@commerce.anambrastate.gov.ng",
          phone: "+234 (0) 813 423 4570",
        }}
      />
      <Footer />
    </main>
  );
}
