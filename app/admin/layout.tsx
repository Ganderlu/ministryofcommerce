import type { Metadata } from "next";
import AdminClientLayout from "./AdminClientLayout";

export const metadata: Metadata = {
  title: "Admin Dashboard | Anambra State Ministry of Commerce",
  description:
    "Super admin dashboard for the Anambra State Ministry of Commerce Integrated Digital Portal. Monitor applications, businesses, cooperatives, payments, and users.",
  keywords: [
    "Anambra State Ministry of Commerce",
    "Admin Dashboard",
    "Government Portal",
    "Business Registration",
    "Cooperative Registration",
    "Nigeria SME",
  ],
  authors: [{ name: "Anambra State Ministry of Commerce" }],
  openGraph: {
    title: "Admin Dashboard | Anambra State Ministry of Commerce",
    description:
      "Enterprise admin dashboard for managing registrations, payments, users and reports.",
    type: "website",
    locale: "en_NG",
    siteName: "Anambra State Ministry of Commerce Portal",
  },
  twitter: {
    card: "summary_large_image",
    title: "Admin Dashboard | Anambra State Ministry of Commerce",
    description:
      "Enterprise admin dashboard — applications, businesses, cooperatives, revenue & system status.",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminClientLayout>{children}</AdminClientLayout>;
}
