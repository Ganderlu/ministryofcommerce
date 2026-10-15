import type { Metadata } from "next";
import RegistrationListPage from "@/components/admin/RegistrationListPage";
import { getMsmeRows } from "@/lib/admin-data";
import { COLLECTION_KEYS } from "@/lib/admin-actions";

export const metadata: Metadata = {
  title: "MSME Management | Anambra State Ministry of Commerce",
  description:
    "Admin panel to manage, monitor and oversee all registered MSMEs.",
  robots: { index: false, follow: false },
};

export default async function MsmeAdminPage() {
  const initialRows = await getMsmeRows();
  return (
    <RegistrationListPage
      initialRows={initialRows}
      collection={COLLECTION_KEYS.msme}
      title="MSME Management Module"
      subtitle="Manage, monitor and oversee all registered Micro, Small and Medium Enterprises in the system."
    />
  );
}
