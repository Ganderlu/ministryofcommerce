import { NextRequest, NextResponse } from "next/server";
import { createSignedUploadSignature } from "@/cloudinary/server";
import {
  checkRateLimit,
  extractAndVerifyBearer,
  sanitizeError,
} from "@/lib/route-security";

export async function POST(request: NextRequest) {
  const rl = checkRateLimit(request, "cloudinary:sign", 60_000, 40);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many requests" },
      {
        status: 429,
        headers: { "Retry-After": String(Math.ceil(rl.retryAfterMs / 1000)) },
      }
    );
  }

  const auth = await extractAndVerifyBearer(request);
  if (!auth) {
    return NextResponse.json(
      { ok: false, error: "Authentication required" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json().catch(() => ({}));
    const paramsToSign = body?.params ?? {};

    const { signature, timestamp, apiKey } =
      await createSignedUploadSignature(paramsToSign);

    return NextResponse.json({
      signature,
      timestamp,
      apiKey,
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    });
  } catch (err: unknown) {
    return NextResponse.json(
      { ok: false, error: sanitizeError(err) },
      { status: 500 }
    );
  }
}
