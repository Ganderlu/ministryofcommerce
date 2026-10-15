import { NextRequest, NextResponse } from "next/server";
import { createSessionCookie, hasAdminClaim } from "@/firebase/admin";

export const runtime = "nodejs";

/**
 * POST /api/auth/session
 * Body: { idToken: string }
 *
 * Verifies the client-supplied Firebase ID token belongs to a user with the
 * `admin` custom claim, then exchanges it for a long-lived session cookie
 * stored as `__session` (the only cookie name Firebase Hosting forwards).
 */
export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json({ error: "Invalid content type" }, { status: 415 });
    }

    const body = await request.json().catch(() => null);
    const idToken: string | undefined = body?.idToken;
    if (!idToken || typeof idToken !== "string") {
      return NextResponse.json({ error: "Missing idToken" }, { status: 400 });
    }

    // Verify the ID token first.
    const { verifyIdToken } = await import("@/firebase/admin");
    const decoded = await verifyIdToken(idToken);
    if (!decoded) {
      return NextResponse.json({ error: "Invalid or expired credentials" }, { status: 401 });
    }

    // Only admin-claimed users may obtain a session cookie.
    const isAdmin = await hasAdminClaim(decoded.uid);
    if (!isAdmin) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 });
    }

    const expiresIn = 60 * 60 * 24 * 7 * 1000; // 7 days
    const sessionCookie = await createSessionCookie(idToken, expiresIn);
    if (!sessionCookie) {
      return NextResponse.json({ error: "Failed to create session" }, { status: 500 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set("__session", sessionCookie, {
      maxAge: expiresIn / 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
    return response;
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
