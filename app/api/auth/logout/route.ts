import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * POST /api/auth/logout
 * Clears the `__session` cookie and signs the user out.
 */
export async function POST(_request: NextRequest) {
  const response = NextResponse.json({ ok: true });
  response.cookies.set("__session", "", {
    maxAge: 0,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
  return response;
}
