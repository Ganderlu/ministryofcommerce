import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionCookie, hasAdminClaim, adminDb } from "@/firebase/admin";

export const runtime = "nodejs";

const ALLOWED_COLLECTIONS = new Set([
  "business_registrations",
  "cooperativeRegistrations",
  "msme_registrations",
  "sme_registrations",
]);

/**
 * GET /api/admin/applications/[collection]/[id]
 *
 * Returns the raw Firestore document for a registration application.
 * Protected: valid `__session` cookie + `admin` claim required.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: { collection: string; id: string } }
) {
  try {
    const sessionCookie = cookies().get("__session")?.value;
    if (!sessionCookie) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const decoded = await verifySessionCookie(sessionCookie);
    if (!decoded) {
      return NextResponse.json(
        { error: "Invalid or expired session" },
        { status: 401 }
      );
    }

    const isAdmin = await hasAdminClaim(decoded.uid);
    if (!isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { collection, id } = params;
    if (!collection || !ALLOWED_COLLECTIONS.has(collection)) {
      return NextResponse.json({ error: "Invalid collection" }, { status: 400 });
    }
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    if (!adminDb) {
      return NextResponse.json(
        { error: "Database unavailable" },
        { status: 500 }
      );
    }

    const snap = await adminDb.collection(collection).doc(id).get();
    if (!snap.exists) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ id: snap.id, ...snap.data() });
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[admin detail read] failed:", err);
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
