import { NextRequest, NextResponse } from "next/server";
import { deleteFromCloudinaryByUrls } from "@/cloudinary/server";

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { secureUrl, secureUrls, resourceType = "image" } = body;

    const urls: string[] = [];
    if (secureUrl) urls.push(secureUrl);
    if (Array.isArray(secureUrls)) urls.push(...secureUrls);

    if (urls.length === 0) {
      return NextResponse.json(
        { ok: false, error: "No secureUrl or secureUrls provided" },
        { status: 400 }
      );
    }

    const result = await deleteFromCloudinaryByUrls(urls, resourceType);

    return NextResponse.json({
      ok: true,
      deleted: result.deleted,
      errors: result.errors,
      count: result.deleted.length,
      errorCount: result.errors.length,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { ok: false, error: message },
      { status: 500 }
    );
  }
}
