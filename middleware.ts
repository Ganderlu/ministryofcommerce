import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/:path*",
    "/((?!_next/static|_next/image|favicon.ico|images|robots.txt|sitemap.xml).*)",
  ],
};

const PUBLIC_ROUTES = new Set([
  "/",
  "/about",
  "/contact",
  "/media",
  "/search",
  "/services",
  "/services/business-registration",
  "/services/business-registration/register",
  "/services/cooperative-registration",
  "/services/cooperative-registration/register",
  "/services/msme-registration",
  "/services/msme-registration/register",
  "/services/sme-registration",
  "/services/sme-registration/register",
  "/services/export-promotion",
  "/services/loan-grants",
  "/services/permit-licensing",
  "/privacy",
  "/terms",
]);

const DEPARTMENT_ROUTE_RE = /^\/departments\//;
const UNIT_ROUTE_RE = /^\/units\//;

function isPublicRoute(pathname: string): boolean {
  if (PUBLIC_ROUTES.has(pathname)) return true;
  if (DEPARTMENT_ROUTE_RE.test(pathname)) return true;
  if (UNIT_ROUTE_RE.test(pathname)) return true;
  // Let individual static assets / images through (Next's matcher already skips
  // most; we additionally permit /images/* and well-known files.)
  if (pathname.startsWith("/images/")) return true;
  return false;
}

const SECURITY_HEADERS: Array<{ key: string; value: string }> = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(), sync-xhr=(), usb=(), magnetometer=(), gyroscope=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://region1.google-analytics.com https://js.stripe.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https://res.cloudinary.com https://firebasestorage.googleapis.com https://lh3.googleusercontent.com https://*.googleusercontent.com https://images.unsplash.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      "connect-src 'self' https://*.googleapis.com https://*.firebaseio.com https://*.cloudinary.com https://www.google-analytics.com https://region1.google-analytics.com wss://*.firebaseio.com wss://*.firestore.googleapis.com",
      "frame-src https://js.stripe.com https://www.googletagmanager.com",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

function applySecurityHeaders(response: NextResponse): NextResponse {
  for (const h of SECURITY_HEADERS) response.headers.set(h.key, h.value);
  response.headers.set("X-DNS-Prefetch-Control", "on");
  response.headers.set("X-Permitted-Cross-Domain-Policies", "none");
  return response;
}

function readSessionCookie(request: NextRequest): string | null {
  const cookie = request.cookies.get("__session")?.value;
  return cookie || null;
}

function redirectLogin(request: NextRequest): NextResponse {
  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("next", request.nextUrl.pathname + request.nextUrl.search);
  const res = NextResponse.redirect(loginUrl);
  return applySecurityHeaders(res);
}

export function middleware(request: NextRequest): NextResponse {
  const { nextUrl, headers } = request;
  const pathname = nextUrl.pathname;

  // ---- 1. HTTP -> HTTPS redirect in production ---------------------------
  const proto = headers.get("x-forwarded-proto") || nextUrl.protocol.replace(":", "");
  const host = headers.get("x-forwarded-host") || headers.get("host") || "";
  if (process.env.NODE_ENV === "production" && proto !== "https" && host) {
    const target = `https://${host}${pathname}${nextUrl.search}`;
    return NextResponse.redirect(target, 308);
  }

  // ---- 2. /admin/* auth gate ---------------------------------------------
  if (pathname.startsWith("/admin")) {
    // Allow /admin/login itself so the user can actually sign in.
    if (pathname !== "/admin/login" && !pathname.startsWith("/admin/login/")) {
      const session = readSessionCookie(request);
      // Minimal pre-flight: require a __session cookie to exist. Deep authz is
      // performed inside each page/layout server component by verifying the
      // cookie's Firebase ID token against admin SDK.
      if (!session) return redirectLogin(request);
    }
  }

  // ---- 3. Apply standard security response headers to everything ----------
  // Fall through case: serve the original response with headers added.
  let response: NextResponse;
  if (isPublicRoute(pathname) || pathname.startsWith("/_next/")) {
    response = NextResponse.next();
  } else {
    response = NextResponse.next();
  }

  return applySecurityHeaders(response);
}
