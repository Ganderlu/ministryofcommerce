/**
 * Client-side helpers for admin write operations.
 * All actual Firestore writes happen on the server via protected API routes;
 * these helpers just POST to them.
 */

export const COLLECTION_KEYS = {
  businesses: "business_registrations",
  cooperatives: "cooperativeRegistrations",
  msme: "msme_registrations",
  sme: "sme_registrations",
} as const;

export type AdminCollection = (typeof COLLECTION_KEYS)[keyof typeof COLLECTION_KEYS];

export const ALLOWED_STATUSES = [
  "Approved",
  "Rejected",
  "Suspended",
  "Under Review",
  "Pending",
] as const;

export type AdminStatus = (typeof ALLOWED_STATUSES)[number];

interface UpdateStatusArgs {
  collection: AdminCollection;
  id: string;
  status: string;
}

export async function updateApplicationStatus({
  collection,
  id,
  status,
}: UpdateStatusArgs): Promise<void> {
  const res = await fetch("/api/admin/applications/status", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ collection, id, status }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(
      (data.error as string) || `Request failed with status ${res.status}`
    );
  }
}

export async function getApplicationDetail(
  collection: AdminCollection,
  id: string
): Promise<Record<string, unknown> | null> {
  const res = await fetch(`/api/admin/applications/${collection}/${id}`);
  if (!res.ok) return null;
  return (await res.json()) as Record<string, unknown>;
}
