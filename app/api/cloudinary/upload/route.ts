import { NextRequest, NextResponse } from "next/server";
import { uploadFromServer } from "@/cloudinary/server";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let folder = "server-uploads";
    let tags: string[] = [];
    let resourceType: "auto" | "image" | "video" | "raw" = "auto";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const fileField = formData.get("file") as File | Blob | null;
      folder = (formData.get("folder") as string) || folder;
      const tagsStr = (formData.get("tags") as string) || "";
      if (tagsStr) tags = tagsStr.split(",").map((t) => t.trim());
      const rt = formData.get("resourceType") as string | null;
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

    const body = await request.json();
    const { file, fileUrl, folder: folderOpt, tags: tagsOpt, resourceType: rtOpt } = body;

    folder = folderOpt || folder;
    if (Array.isArray(tagsOpt)) tags = tagsOpt;
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
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { ok: false, error: message },
      { status: 500 }
    );
  }
}
