import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  verifySessionCookie,
  hasAdminClaim,
  adminDb,
  FieldValueAdmin,
} from "@/firebase/admin";

export const runtime = "nodejs";

const ALLOWED_COLLECTIONS = new Set([
  "business_registrations",
  "cooperativeRegistrations",
  "msme_registrations",
  "sme_registrations",
]);

const ALLOWED_STATUSES = new Set([
  "Approved",
  "Rejected",
  "Suspended",
  "Under Review",
  "Pending",
]);

/**
 * POST /api/admin/applications/status
 * Body: { collection: string, id: string, status: string }
 *
 * Protected: requires a valid `__session` cookie whose user has the `admin`
 * custom claim. Updates the target document's `status` and `updatedAt` via
 * the Firebase Admin SDK.
 */
export async function POST(request: NextRequest) {
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

    const body = await request.json().catch(() => null);
    const collection = body?.collection as string | undefined;
    const id = body?.id as string | undefined;
    const status = body?.status as string | undefined;

    if (!collection || !ALLOWED_COLLECTIONS.has(collection)) {
      return NextResponse.json({ error: "Invalid collection" }, { status: 400 });
    }
    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Missing document id" }, { status: 400 });
    }
    if (!status || !ALLOWED_STATUSES.has(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    if (!adminDb) {
      return NextResponse.json(
        { error: "Database unavailable" },
        { status: 500 }
      );
    }

    await adminDb
      .collection(collection)
      .doc(id)
      .update({
        status,
        updatedAt: FieldValueAdmin.serverTimestamp(),
      });

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[admin status update] failed:", err);
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
