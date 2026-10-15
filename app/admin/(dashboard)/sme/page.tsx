import type { Metadata } from "next";
import RegistrationListPage from "@/components/admin/RegistrationListPage";
import { getSmeRows } from "@/lib/admin-data";
import { COLLECTION_KEYS } from "@/lib/admin-actions";

export const metadata: Metadata = {
  title: "SME Management | Anambra State Ministry of Commerce",
  description:
    "Admin panel to manage, monitor and oversee all registered SMEs.",
  robots: { index: false, follow: false },
};

export default async function SmeAdminPage() {
  const initialRows = await getSmeRows();
  return (
    <RegistrationListPage
      initialRows={initialRows}
      collection={COLLECTION_KEYS.sme}
      title="SME Management Module"
      subtitle="Manage, monitor and oversee all registered Small and Medium Enterprises in the system."
    />
  );
}
