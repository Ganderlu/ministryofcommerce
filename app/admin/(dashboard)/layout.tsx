import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySessionCookie, hasAdminClaim, getUser } from "@/firebase/admin";
import AdminClientLayout from "../AdminClientLayout";

export interface AdminIdentity {
  uid: string;
  email: string | null;
  displayName: string | null;
}

/**
 * Auth-gated dashboard layout. Verifies the `__session` cookie and the `admin`
 * custom claim before rendering any admin dashboard route. Redirects to
 * /admin/login if the session is missing, invalid, revoked, or lacks admin
 * privileges. Also fetches the signed-in admin's identity for the header.
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessionCookie = cookies().get("__session")?.value;

  if (!sessionCookie) {
    redirect("/admin/login");
  }

  const decoded = await verifySessionCookie(sessionCookie);
  if (!decoded) {
    redirect("/admin/login");
  }

  const isAdmin = await hasAdminClaim(decoded.uid);
  if (!isAdmin) {
    redirect("/admin/login");
  }

  const userRecord = await getUser(decoded.uid);
  const admin: AdminIdentity = {
    uid: decoded.uid,
    email: userRecord?.email ?? decoded.email ?? null,
    displayName: userRecord?.displayName ?? null,
  };

  return <AdminClientLayout admin={admin}>{children}</AdminClientLayout>;
}
