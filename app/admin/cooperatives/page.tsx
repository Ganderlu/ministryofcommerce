import type { Metadata } from "next";
import CooperativesPageClient from "./CooperativesPageClient";

export const metadata: Metadata = {
  title: "Cooperatives Management | Anambra State Ministry of Commerce",
  description:
    "Admin panel to manage, monitor and oversee all registered cooperatives in Anambra State Ministry of Commerce Integrated Digital Portal.",
  keywords: [
    "Anambra State Ministry of Commerce",
    "Admin Cooperatives",
    "Cooperative Management",
    "Cooperative Registration",
    "Government Portal",
    "Cooperative Society",
  ],
  authors: [{ name: "Anambra State Ministry of Commerce" }],
  openGraph: {
    title: "Cooperatives Management | Admin Portal",
    description:
      "Enterprise Cooperatives management dashboard — review, approve, reject and oversee all registered cooperatives.",
    type: "website",
    locale: "en_NG",
    siteName: "Anambra State Ministry of Commerce Portal",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cooperatives Management | Admin Portal",
    description:
      "Enterprise dashboard for managing all cooperatives in the Anambra State Ministry of Commerce portal.",
  },
  robots: { index: false, follow: false },
};

export default function CooperativesPage() {
  return <CooperativesPageClient />;
}
