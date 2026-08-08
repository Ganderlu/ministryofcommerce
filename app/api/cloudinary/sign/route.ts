import { NextRequest, NextResponse } from "next/server";
import { createSignedUploadSignature } from "@/cloudinary/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const paramsToSign = body?.params || {};

    const { signature, timestamp, apiKey } =
      await createSignedUploadSignature(paramsToSign);

    return NextResponse.json({
      signature,
      timestamp,
      apiKey,
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { ok: false, error: message },
      { status: 500 }
    );
  }
}
