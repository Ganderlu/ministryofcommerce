import { v2 as cloudinary } from "cloudinary";

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "m7yxk6za";
const apiKey = process.env.CLOUDINARY_API_KEY || "951375989845552";
const apiSecret = process.env.CLOUDINARY_API_SECRET || "ntjhbXtLIlghRwe1nKwbua7LpO4";
const uploadPreset =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "anambra_sme_uploads";

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

export const cloudinaryServer = cloudinary;
export { cloudName, apiKey, uploadPreset };

export interface ServerUploadOptions {
  folder?: string;
  tags?: string[];
  publicId?: string;
  overwrite?: boolean;
  resourceType?: "auto" | "image" | "video" | "raw";
  transformation?: unknown;
  context?: Record<string, string>;
  useFilename?: boolean;
  uniqueFilename?: boolean;
  allowedFormats?: string[];
  async?: boolean;
  eager?: unknown[];
}

export function buildSignedUploadParams(
  params: Record<string, unknown> = {}
): Record<string, unknown> & { signature: string; api_key: string; timestamp: number } {
  const timestamp = Math.round(Date.now() / 1000);
  const paramsToSign = { timestamp, ...params };
  const signature = cloudinary.utils.api_sign_request(paramsToSign, apiSecret);
  return {
    ...params,
    timestamp,
    signature,
    api_key: apiKey,
  };
}

export async function uploadFromServer(
  file: string,
  options: ServerUploadOptions = {}
): Promise<Record<string, unknown>> {
  const {
    folder,
    tags,
    publicId,
    overwrite = false,
    resourceType = "auto",
    transformation,
    context,
    useFilename = true,
    uniqueFilename = true,
    allowedFormats,
    eager,
  } = options;

  const result = await cloudinary.uploader.upload(file, {
    folder,
    tags,
    public_id: publicId,
    overwrite,
    resource_type: resourceType,
    transformation: transformation as never,
    context,
    use_filename: useFilename,
    unique_filename: uniqueFilename,
    allowed_formats: allowedFormats,
    eager: eager as never[],
  });

  return result as unknown as Record<string, unknown>;
}

export async function uploadStreamFromServer(
  stream: NodeJS.ReadableStream,
  options: ServerUploadOptions = {}
): Promise<Record<string, unknown>> {
  const {
    folder,
    tags,
    publicId,
    overwrite = false,
    resourceType = "auto",
    transformation,
  } = options;

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        tags,
        public_id: publicId,
        overwrite,
        resource_type: resourceType,
        transformation: transformation as never,
      },
      (error, result) => {
        if (error) reject(error);
        else if (result) resolve(result as unknown as Record<string, unknown>);
        else reject(new Error("Upload completed with no result"));
      }
    );
    stream.pipe(uploadStream);
  });
}

export async function deleteFromCloudinary(
  publicId: string,
  resourceType: "image" | "video" | "raw" = "image",
  invalidate: boolean = true
): Promise<Record<string, unknown>> {
  const result = await cloudinary.uploader.destroy(publicId, {
    resource_type: resourceType,
    invalidate,
  });
  return result as unknown as Record<string, unknown>;
}

export async function deleteFromCloudinaryByUrls(
  secureUrls: string[],
  resourceType: "image" | "video" | "raw" = "image"
): Promise<{ deleted: string[]; errors: { url: string; error: string }[] }> {
  const deleted: string[] = [];
  const errors: { url: string; error: string }[] = [];

  for (const url of secureUrls) {
    try {
      const publicId = extractPublicIdFromUrl(url);
      if (publicId) {
        await deleteFromCloudinary(publicId, resourceType);
        deleted.push(url);
      } else {
        errors.push({ url, error: "Could not extract public_id from URL" });
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      errors.push({ url, error: message });
    }
  }

  return { deleted, errors };
}

export function extractPublicIdFromUrl(secureUrl: string): string | null {
  try {
    const baseUrlPattern = `res.cloudinary.com/${cloudName}/`;
    const idx = secureUrl.indexOf(baseUrlPattern);
    if (idx === -1) return null;

    const afterBase = secureUrl.slice(idx + baseUrlPattern.length);
    const parts = afterBase.split("/");

    const uploadIdx = parts.indexOf("upload");
    if (uploadIdx === -1) {
      const videoIdx = parts.indexOf("video");
      const imageIdx = parts.indexOf("image");
      const rawIdx = parts.indexOf("raw");
      const typeIdx = [videoIdx, imageIdx, rawIdx].find((i) => i !== -1);
      if (typeIdx === undefined) return null;
      const relevant = parts.slice(typeIdx + 1);
      return stripFormatFromId(relevant.join("/"));
    }

    const afterUpload = parts.slice(uploadIdx + 1);
    const idParts: string[] = [];
    for (const part of afterUpload) {
      if (part.includes("_") && part.match(/^[a-z]_/)) continue;
      if (/^v\d+$/.test(part)) continue;
      idParts.push(part);
    }
    return stripFormatFromId(idParts.join("/"));
  } catch {
    return null;
  }
}

function stripFormatFromId(id: string): string {
  const lastDot = id.lastIndexOf(".");
  if (lastDot === -1) return id;
  return id.slice(0, lastDot);
}

export async function getResourceByPublicId(
  publicId: string,
  resourceType: "image" | "video" | "raw" = "image"
): Promise<Record<string, unknown>> {
  const result = await cloudinary.api.resource(publicId, { resource_type: resourceType });
  return result as unknown as Record<string, unknown>;
}

export async function listResourcesInFolder(
  folder: string,
  options?: {
    resourceType?: "image" | "video" | "raw";
    maxResults?: number;
    nextCursor?: string;
  }
): Promise<Record<string, unknown>> {
  const { resourceType = "image", maxResults = 50, nextCursor } = options || {};
  const result = await cloudinary.api.resources({
    type: "upload",
    prefix: folder,
    resource_type: resourceType,
    max_results: maxResults,
    next_cursor: nextCursor,
  });
  return result as unknown as Record<string, unknown>;
}

export async function createSignedUploadSignature(
  paramsToSign: Record<string, unknown> = {}
): Promise<{ signature: string; timestamp: number; apiKey: string }> {
  const timestamp = Math.round(Date.now() / 1000);
  const allParams = { timestamp, ...paramsToSign };
  const signature = cloudinary.utils.api_sign_request(allParams, apiSecret);
  return {
    signature,
    timestamp,
    apiKey,
  };
}
