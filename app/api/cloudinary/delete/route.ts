import { NextRequest, NextResponse } from "next/server";
import { deleteFromCloudinaryByUrls } from "@/cloudinary/server";
import {
  checkRateLimit,
  extractAndVerifyBearer,
  sanitizeError,
} from "@/lib/route-security";

export async function DELETE(request: NextRequest) {
  const rl = checkRateLimit(request, "cloudinary:delete", 60_000, 20);
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
  if (!auth || !auth.isAdmin) {
    return NextResponse.json(
      { ok: false, error: "Administrative access required" },
      { status: 403 }
    );
  }

  try {
    const body = await request.json().catch(() => ({}));
    const { secureUrl, secureUrls, resourceType = "image" } = body;

    const urls: string[] = [];
    if (typeof secureUrl === "string") urls.push(secureUrl);
    if (Array.isArray(secureUrls)) {
      for (const u of secureUrls) if (typeof u === "string") urls.push(u);
    }

    if (urls.length === 0) {
      return NextResponse.json(
        { ok: false, error: "No secureUrl or secureUrls provided" },
        { status: 400 }
      );
    }

    if (resourceType !== "image" && resourceType !== "video" && resourceType !== "raw") {
      return NextResponse.json(
        { ok: false, error: "Invalid resourceType" },
        { status: 400 }
      );
    }

    const result = await deleteFromCloudinaryByUrls(urls, resourceType);

    return NextResponse.json({
      ok: true,
      deleted: result.deleted,
      errors: process.env.NODE_ENV === "production" ? undefined : result.errors,
      count: result.deleted.length,
      errorCount: result.errors.length,
    });
  } catch (err: unknown) {
    return NextResponse.json(
      { ok: false, error: sanitizeError(err) },
      { status: 500 }
    );
  }
}
