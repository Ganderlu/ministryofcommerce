import { Cloudinary } from "@cloudinary/url-gen";

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "m7yxk6za";
const uploadPreset =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "anambra_sme_uploads";

export const cld = new Cloudinary({
  cloud: {
    cloudName,
  },
});

export const cloudinaryConfig = {
  cloudName,
  uploadPreset,
  apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  baseUploadUrl: `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
  imageUploadUrl: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
  videoUploadUrl: `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
  rawUploadUrl: `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,
};

export interface CloudinaryUploadResult {
  public_id: string;
  version: number;
  signature: string;
  width?: number;
  height?: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  url: string;
  secure_url: string;
  folder?: string;
  original_filename: string;
  duration?: number;
}

export interface UploadOptions {
  folder?: string;
  tags?: string[];
  uploadPreset?: string;
  transformation?: string;
  context?: Record<string, string>;
}

export async function uploadToCloudinary(
  file: File | Blob | string,
  options: UploadOptions = {}
): Promise<CloudinaryUploadResult> {
  const { folder, tags, uploadPreset: customPreset, context } = options;

  const formData = new FormData();
  formData.append("upload_preset", customPreset || uploadPreset);

  if (folder) formData.append("folder", folder);
  if (tags && tags.length > 0) formData.append("tags", tags.join(","));
  if (context) {
    const contextStr = Object.entries(context)
      .map(([k, v]) => `${k}=${v}`)
      .join("|");
    formData.append("context", contextStr);
  }

  if (typeof file === "string") {
    formData.append("file", file);
  } else {
    formData.append("file", file);
  }

  const resourceType =
    file instanceof File
      ? file.type.startsWith("video")
        ? "video"
        : file.type.startsWith("image")
          ? "image"
          : "auto"
      : "auto";

  const uploadUrl =
    resourceType === "video"
      ? cloudinaryConfig.videoUploadUrl
      : resourceType === "image"
        ? cloudinaryConfig.imageUploadUrl
        : cloudinaryConfig.baseUploadUrl;

  const response = await fetch(uploadUrl, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      `Cloudinary upload failed: ${response.status} ${
        errorData?.error?.message || response.statusText
      }`
    );
  }

  return response.json() as Promise<CloudinaryUploadResult>;
}

export async function uploadMultipleToCloudinary(
  files: (File | Blob | string)[],
  options: UploadOptions = {}
): Promise<CloudinaryUploadResult[]> {
  const results = await Promise.all(
    files.map((file) => uploadToCloudinary(file, options))
  );
  return results;
}

export function getCloudinaryImageUrl(
  publicId: string,
  transformations?: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: string | number;
    format?: string;
    gravity?: string;
    effect?: string;
    radius?: string | number;
  }
): string {
  const parts: string[] = [];

  if (transformations) {
    if (transformations.width) parts.push(`w_${transformations.width}`);
    if (transformations.height) parts.push(`h_${transformations.height}`);
    if (transformations.crop) parts.push(`c_${transformations.crop}`);
    if (transformations.quality) parts.push(`q_${transformations.quality}`);
    if (transformations.format) parts.push(`f_${transformations.format}`);
    if (transformations.gravity) parts.push(`g_${transformations.gravity}`);
    if (transformations.effect) parts.push(`e_${transformations.effect}`);
    if (transformations.radius) parts.push(`r_${transformations.radius}`);
  }

  const transformStr = parts.join(",");
  const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload`;

  if (transformStr) {
    return `${baseUrl}/${transformStr}/${publicId}`;
  }
  return `${baseUrl}/${publicId}`;
}

export interface SignedUploadCreds {
  signature: string;
  timestamp: number;
  apiKey: string;
  cloudName?: string;
}

export async function requestSignedUploadParams(
  paramsToSign: Record<string, unknown> = {}
): Promise<SignedUploadCreds> {
  const res = await fetch("/api/cloudinary/sign", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ params: paramsToSign }),
  });
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(
      `Failed to request signed upload: ${res.status} ${
        errData?.error || res.statusText
      }`
    );
  }
  return res.json();
}

export interface SignedUploadOptions {
  folder?: string;
  tags?: string[];
  context?: Record<string, string>;
  onProgress?: (pct: number) => void;
  resourceType?: "image" | "video" | "raw" | "auto";
  publicId?: string;
}

export async function uploadToCloudinarySigned(
  file: File | Blob | string,
  options: SignedUploadOptions = {}
): Promise<CloudinaryUploadResult> {
  const { folder, tags, context, onProgress, publicId } = options;
  const resourceType =
    options.resourceType ||
    (file instanceof File
      ? file.type.startsWith("video")
        ? "video"
        : file.type.startsWith("image")
          ? "image"
          : "raw"
      : "auto");

  const uploadUrl =
    resourceType === "video"
      ? cloudinaryConfig.videoUploadUrl
      : resourceType === "image"
        ? cloudinaryConfig.imageUploadUrl
        : cloudinaryConfig.rawUploadUrl;

  const paramsToSign: Record<string, unknown> = {};
  if (folder) paramsToSign.folder = folder;
  if (tags && tags.length) paramsToSign.tags = tags.join(",");
  if (publicId) paramsToSign.public_id = publicId;
  if (context) {
    paramsToSign.context = Object.entries(context)
      .map(([k, v]) => `${k}=${v}`)
      .join("|");
  }

  const creds = await requestSignedUploadParams(paramsToSign);

  const formData = new FormData();
  formData.append("file", file as never);
  formData.append("api_key", creds.apiKey);
  formData.append("timestamp", String(creds.timestamp));
  formData.append("signature", creds.signature);
  if (folder) formData.append("folder", folder);
  if (tags && tags.length) formData.append("tags", tags.join(","));
  if (publicId) formData.append("public_id", publicId);
  if (context) {
    formData.append(
      "context",
      Object.entries(context)
        .map(([k, v]) => `${k}=${v}`)
        .join("|")
    );
  }

  const useXhr = typeof XMLHttpRequest !== "undefined" && onProgress;

  if (useXhr) {
    return new Promise<CloudinaryUploadResult>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", uploadUrl);
      xhr.upload.onprogress = (evt) => {
        if (evt.lengthComputable && onProgress) {
          onProgress(Math.round((evt.loaded / evt.total) * 100));
        }
      };
      xhr.onload = () => {
        try {
          const data = JSON.parse(xhr.responseText || "{}");
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(data as CloudinaryUploadResult);
          } else {
            reject(
              new Error(
                `Cloudinary signed upload failed: ${xhr.status} ${
                  data?.error?.message || xhr.statusText
                }`
              )
            );
          }
        } catch (e) {
          reject(
            new Error(
              `Cloudinary signed upload failed: ${
                e instanceof Error ? e.message : "Invalid JSON response"
              }`
            )
          );
        }
      };
      xhr.onerror = () =>
        reject(new Error("Cloudinary signed upload failed: Network error"));
      xhr.send(formData);
    });
  }

  const response = await fetch(uploadUrl, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(
      `Cloudinary signed upload failed: ${response.status} ${
        errData?.error?.message || response.statusText
      }`
    );
  }
  return response.json();
}

export function isPresetNotFoundError(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err || "");
  return (
    msg.includes("Upload preset not found") ||
    msg.includes("Upload preset must be whitelisted") ||
    msg.includes("upload preset") ||
    /400[\s\S]{0,60}preset/i.test(msg)
  );
}

export function deleteFromCloudinaryByUrl(
  _secureUrl: string
): { ok: boolean; message: string } {
  return {
    ok: false,
    message:
      "Client-side deletion disabled. Use the server API route /api/cloudinary/delete",
  };
}
