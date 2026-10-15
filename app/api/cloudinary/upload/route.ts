import { NextRequest, NextResponse } from "next/server";
import { uploadFromServer } from "@/cloudinary/server";
import {
  checkRateLimit,
  extractAndVerifyBearer,
  sanitizeError,
} from "@/lib/route-security";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const rl = checkRateLimit(request, "cloudinary:upload", 60_000, 25);
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
    const contentType = request.headers.get("content-type") || "";
    let folder = `users/${auth.uid}/uploads`;
    let tags: string[] = [`uid:${auth.uid}`];
    let resourceType: "auto" | "image" | "video" | "raw" = "auto";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const fileField = formData.get("file") as File | Blob | null;
      const folderOpt = formData.get("folder") as string | null;
      const tagsStr = formData.get("tags") as string | null;
      const rt = formData.get("resourceType") as string | null;

      if (folderOpt && !folderOpt.includes("..")) {
        folder = `users/${auth.uid}/${folderOpt.replace(/^\/+/, "")}`;
      }
      if (tagsStr) tags = tags.concat(tagsStr.split(",").map((t) => t.trim()).filter(Boolean));
      if (rt === "image" || rt === "video" || rt === "raw") resourceType = rt;

      if (!fileField) {
        return NextResponse.json(
          { ok: false, error: "No file provided in form data" },
          { status: 400 }
        );
      }

      const buffer = Buffer.from(await fileField.arrayBuffer());
      const base64 = `data:${fileField.type || "application/octet-stream"};base64,${buffer.toString("base64")}`;

      const result = await uploadFromServer(base64, {
        folder,
        tags,
        resourceType,
      });

      return NextResponse.json({ ok: true, result });
    }

    const body = await request.json().catch(() => ({}));
    const { file, fileUrl, folder: folderOpt, tags: tagsOpt, resourceType: rtOpt } = body;

    if (typeof folderOpt === "string" && !folderOpt.includes("..")) {
      folder = `users/${auth.uid}/${folderOpt.replace(/^\/+/, "")}`;
    }
    if (Array.isArray(tagsOpt)) tags = tags.concat(tagsOpt.map(String).filter(Boolean));
    if (rtOpt === "image" || rtOpt === "video" || rtOpt === "raw") resourceType = rtOpt;

    const source = file || fileUrl;
    if (!source) {
      return NextResponse.json(
        { ok: false, error: "No file or fileUrl provided" },
        { status: 400 }
      );
    }

    const result = await uploadFromServer(source, {
      folder,
      tags,
      resourceType,
    });

    return NextResponse.json({ ok: true, result });
  } catch (err: unknown) {
    return NextResponse.json(
      { ok: false, error: sanitizeError(err) },
      { status: 500 }
    );
  }
}
