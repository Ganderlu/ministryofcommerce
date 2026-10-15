import DashboardClient from "./DashboardClient";
import { getAdminDashboardData } from "@/lib/admin-data";

export default async function AdminDashboardPage() {
  const data = await getAdminDashboardData();
  return <DashboardClient data={data} />;
}
