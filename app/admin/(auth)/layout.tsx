/**
 * Public auth route group layout. Renders the login page without the dashboard
 * chrome and without an auth gate (so the sign-in form is reachable).
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
