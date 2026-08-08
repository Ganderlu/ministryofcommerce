import {
  uploadToCloudinary,
  uploadMultipleToCloudinary,
  getCloudinaryImageUrl,
  type CloudinaryUploadResult,
  type UploadOptions,
} from "@/cloudinary/client";

export async function uploadMedia(
  file: File | Blob | string,
  folder: string = "general",
  tags: string[] = []
): Promise<CloudinaryUploadResult> {
  return uploadToCloudinary(file, { folder, tags });
}

export async function uploadBusinessDocument(
  file: File | Blob | string,
  businessId: string,
  documentType: string
): Promise<CloudinaryUploadResult> {
  return uploadToCloudinary(file, {
    folder: `businesses/${businessId}/documents`,
    tags: ["business", "document", documentType, businessId],
    context: {
      business_id: businessId,
      document_type: documentType,
      uploaded_at: new Date().toISOString(),
    },
  });
}

export async function uploadBusinessLogo(
  file: File | Blob | string,
  businessId: string
): Promise<CloudinaryUploadResult> {
  return uploadToCloudinary(file, {
    folder: `businesses/${businessId}/logo`,
    tags: ["business", "logo", businessId],
  });
}

export async function uploadCooperativeDocument(
  file: File | Blob | string,
  cooperativeId: string,
  documentType: string
): Promise<CloudinaryUploadResult> {
  return uploadToCloudinary(file, {
    folder: `cooperatives/${cooperativeId}/documents`,
    tags: ["cooperative", "document", documentType, cooperativeId],
    context: {
      cooperative_id: cooperativeId,
      document_type: documentType,
      uploaded_at: new Date().toISOString(),
    },
  });
}

export async function uploadNewsImage(
  file: File | Blob | string,
  newsId?: string
): Promise<CloudinaryUploadResult> {
  const folder = newsId ? `news/${newsId}` : "news";
  return uploadToCloudinary(file, {
    folder,
    tags: ["news", "image", ...(newsId ? [newsId] : [])],
  });
}

export async function uploadGalleryImage(
  file: File | Blob | string,
  galleryCategory: string = "general"
): Promise<CloudinaryUploadResult> {
  return uploadToCloudinary(file, {
    folder: `gallery/${galleryCategory}`,
    tags: ["gallery", galleryCategory],
  });
}

export async function uploadEventMedia(
  file: File | Blob | string,
  eventId: string,
  mediaType: "image" | "video" = "image"
): Promise<CloudinaryUploadResult> {
  return uploadToCloudinary(file, {
    folder: `events/${eventId}/${mediaType}s`,
    tags: ["event", mediaType, eventId],
  });
}

export async function uploadOfficialPhoto(
  file: File | Blob | string,
  officialId: string
): Promise<CloudinaryUploadResult> {
  return uploadToCloudinary(file, {
    folder: `officials/${officialId}/photos`,
    tags: ["official", "photo", officialId],
  });
}

export async function bulkUploadMedia(
  files: (File | Blob | string)[],
  options: UploadOptions = {}
): Promise<CloudinaryUploadResult[]> {
  return uploadMultipleToCloudinary(files, options);
}

export function getThumbnailUrl(
  publicId: string,
  width: number = 300,
  height: number = 200
): string {
  return getCloudinaryImageUrl(publicId, {
    width,
    height,
    crop: "fill",
    gravity: "auto",
    quality: "auto",
    format: "webp",
  });
}

export function getOriginalImageUrl(publicId: string): string {
  return getCloudinaryImageUrl(publicId, {
    quality: "auto",
    format: "auto",
  });
}

export function getOptimizedImageUrl(
  publicId: string,
  width: number = 1200
): string {
  return getCloudinaryImageUrl(publicId, {
    width,
    quality: "auto:best",
    format: "webp",
  });
}

export function getAvatarUrl(
  publicId: string,
  size: number = 200
): string {
  return getCloudinaryImageUrl(publicId, {
    width: size,
    height: size,
    crop: "thumb",
    gravity: "face",
    radius: "max",
    quality: "auto",
    format: "webp",
  });
}

export function getRoundedImageUrl(
  publicId: string,
  width: number = 600,
  height: number = 400,
  radius: number = 24
): string {
  return getCloudinaryImageUrl(publicId, {
    width,
    height,
    crop: "fill",
    gravity: "auto",
    radius,
    quality: "auto",
    format: "webp",
  });
}

export async function deleteMediaServerSide(
  secureUrl: string,
  resourceType: "image" | "video" | "raw" = "image"
): Promise<{ ok: boolean; message?: string }> {
  const response = await fetch("/api/cloudinary/delete", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secureUrl, resourceType }),
  });
  return response.json();
}

export async function requestSignedUpload(): Promise<{
  signature: string;
  timestamp: number;
  apiKey: string;
}> {
  const response = await fetch("/api/cloudinary/sign", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
}
