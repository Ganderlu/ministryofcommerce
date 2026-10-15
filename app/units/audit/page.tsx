import { Metadata } from "next";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DepartmentSection from "@/components/departments/DepartmentSection";

export const metadata: Metadata = {
  title: "Audit Unit | Anambra State Ministry of Commerce",
  description:
    "The Audit Unit provides internal audit services, ensuring accountability and compliance in the Ministry's operations.",
  keywords: [
    "Anambra State",
    "Audit",
    "Internal Audit",
    "Ministry of Commerce",
    "Accountability",
    "Compliance",
    "Risk Management",
    "Internal Controls",
    "Financial Audit",
    "Transparency",
  ],
  alternates: { canonical: "/units/audit" },
  openGraph: {
    title: "Audit Unit | Anambra State Ministry of Commerce",
    description:
      "The Audit Unit provides internal audit services, ensuring accountability and compliance in the Ministry's operations.",
    type: "website",
    url: "/units/audit",
    siteName: "Anambra State Ministry of Commerce",
  },
  twitter: {
    card: "summary_large_image",
    title: "Audit Unit | Anambra State Ministry of Commerce",
    description:
      "The Audit Unit provides internal audit services, ensuring accountability and compliance in the Ministry's operations.",
  },
};

export default function AuditPage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <DepartmentSection
        title="Audit Unit"
        subtitle="Unit"
        description="The Audit Unit provides independent internal audit services to the Ministry, ensuring accountability, transparency, and compliance with laws and regulations. We evaluate internal controls, risk management, and governance processes."
        responsibilities={[
          "Conducting internal audits of Ministry operations.",
          "Evaluating internal control systems.",
          "Ensuring compliance with laws and regulations.",
          "Reviewing financial and operational processes.",
          "Identifying risks and recommending improvements.",
          "Follow-up on audit recommendations.",
        ]}
        keyInitiatives={[
          "Risk-based audit planning and execution.",
          "Continuous audit process improvement.",
          "Staff capacity building in audit and compliance.",
          "Enhanced audit reporting and follow-up mechanisms.",
        ]}
        contactInfo={{
          email: "audit@commerce.anambrastate.gov.ng",
          phone: "+234 (0) 813 423 4577",
        }}
      />
      <Footer />
    </>
  );
}
