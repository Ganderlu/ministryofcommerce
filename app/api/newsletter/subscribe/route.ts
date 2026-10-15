import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, sanitizeError } from "@/lib/route-security";
import {
  adminDb,
  FieldValueAdmin,
  TimestampAdmin,
} from "@/firebase/admin";

export const runtime = "nodejs";

const EMAIL_REGEX =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function normalizeEmail(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const lower = trimmed.toLowerCase();
  if (!EMAIL_REGEX.test(lower)) return null;
  return lower;
}

export async function POST(request: NextRequest) {
  const rl = checkRateLimit(request, "newsletter:subscribe", 60_000, 6);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil(rl.retryAfterMs / 1000)),
        },
      }
    );
  }

  let body: { email?: unknown; source?: unknown } = {};
  try {
    body = (await request.json().catch(() => ({}))) as {
      email?: unknown;
      source?: unknown;
    };
  } catch {
    body = {};
  }

  const email = normalizeEmail(body.email);
  if (!email) {
    return NextResponse.json(
      { ok: false, error: "A valid email address is required." },
      { status: 400 }
    );
  }

  const source =
    typeof body.source === "string" && body.source.length > 0
      ? body.source.substring(0, 120)
      : "footer";

  try {
    const col = adminDb.collection("newsletter_subscribers");
    const snap = await col.where("email", "==", email).limit(1).get();

    if (!snap.empty) {
      const existingDoc = snap.docs[0];
      try {
        await col.doc(existingDoc.id).update({
          updatedAt: TimestampAdmin.now(),
          lastSeenSource: source,
          subscribeAttempts: FieldValueAdmin.increment(1),
          status: "subscribed",
        });
      } catch {
        // ignore update error; fall through to success response below
      }
      return NextResponse.json({
        ok: true,
        status: "already_subscribed",
        message: "You're already subscribed. Thank you!",
      });
    }

    const payload = {
      email,
      status: "subscribed",
      source,
      createdAt: TimestampAdmin.now(),
      updatedAt: TimestampAdmin.now(),
      subscribeAttempts: 1,
    };

    await col.add(payload);

    return NextResponse.json(
      {
        ok: true,
        status: "subscribed",
        message: "You've been subscribed. Thank you!",
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    return NextResponse.json(
      { ok: false, error: sanitizeError(err) },
      { status: 500 }
    );
  }
}
