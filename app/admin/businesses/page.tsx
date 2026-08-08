import type { Metadata } from "next";
import BusinessesPageClient from "./BusinessesPageClient";

export const metadata: Metadata = {
  title: "Businesses Management | Anambra State Ministry of Commerce",
  description:
    "Admin panel to manage, monitor and oversee all registered businesses in Anambra State Ministry of Commerce Integrated Digital Portal.",
  keywords: [
    "Anambra State Ministry of Commerce",
    "Admin Businesses",
    "Business Management",
    "Business Registration",
    "Government Portal",
    "MSME",
  ],
  authors: [{ name: "Anambra State Ministry of Commerce" }],
  openGraph: {
    title: "Businesses Management | Admin Portal",
    description:
      "Enterprise Businesses management dashboard — review, approve, reject and oversee all registered businesses.",
    type: "website",
    locale: "en_NG",
    siteName: "Anambra State Ministry of Commerce Portal",
  },
  twitter: {
    card: "summary_large_image",
    title: "Businesses Management | Admin Portal",
    description:
      "Enterprise dashboard for managing all businesses in the Anambra State Ministry of Commerce portal.",
  },
  robots: { index: false, follow: false },
};

export default function BusinessesPage() {
  return <BusinessesPageClient />;
}
