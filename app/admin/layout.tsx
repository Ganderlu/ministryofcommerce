import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Anambra State Ministry of Commerce",
  description:
    "Admin area for the Anambra State Ministry of Commerce Integrated Digital Portal.",
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Top-level admin layout — a simple pass-through.
 * Authentication and dashboard chrome are handled by the route-group layouts:
 *   - app/admin/(dashboard)/layout.tsx → auth-gated, renders AdminClientLayout
 *   - app/admin/(auth)/layout.tsx      → public login page
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
