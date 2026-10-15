import { Metadata } from "next";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DepartmentSection from "@/components/departments/DepartmentSection";

export const metadata: Metadata = {
  title: "ICT Unit | Anambra State Ministry of Commerce",
  description:
    "The ICT Unit provides information and communication technology support, driving digital transformation in the Ministry.",
  keywords: [
    "Anambra State",
    "ICT",
    "Information Technology",
    "Ministry of Commerce",
    "Digital Transformation",
    "E Services",
    "Technology Support",
    "Data Security",
    "Anambra Digital",
    "ICT Infrastructure",
  ],
  alternates: { canonical: "/units/ict" },
  openGraph: {
    title: "ICT Unit | Anambra State Ministry of Commerce",
    description:
      "The ICT Unit provides information and communication technology support, driving digital transformation in the Ministry.",
    type: "website",
    url: "/units/ict",
    siteName: "Anambra State Ministry of Commerce",
  },
  twitter: {
    card: "summary_large_image",
    title: "ICT Unit | Anambra State Ministry of Commerce",
    description:
      "The ICT Unit provides information and communication technology support, driving digital transformation in the Ministry.",
  },
};

export default function ICTPage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <DepartmentSection
        title="ICT Unit"
        subtitle="Unit"
        description="The ICT Unit is responsible for providing information and communication technology (ICT) support and driving digital transformation in the Ministry. We ensure the effective use of technology to enhance service delivery and operational efficiency."
        responsibilities={[
          "Managing the Ministry's ICT infrastructure.",
          "Providing technical support to staff.",
          "Developing and maintaining the Ministry's digital platforms.",
          "Implementing digital solutions for service delivery.",
          "Ensuring data security and privacy.",
          "Training staff on ICT tools and systems.",
        ]}
        keyInitiatives={[
          "Digital transformation of Ministry operations.",
          "Development of e-service platforms.",
          "Enhanced ICT infrastructure and security.",
          "Staff digital skills development programs.",
        ]}
        contactInfo={{
          email: "ict@commerce.anambrastate.gov.ng",
          phone: "+234 (0) 813 423 4578",
        }}
      />
      <Footer />
    </>
  );
}
