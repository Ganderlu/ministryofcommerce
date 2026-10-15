/**
 * Server-side Firestore data aggregation for the admin dashboard.
 * Uses the Firebase Admin SDK (never exposed to the client).
 * All functions are safe to call from Server Components / route handlers.
 */

import { adminDb } from "@/firebase/admin";
import type { BusinessRow, CooperativeRow } from "@/types";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AdminKpis {
  totalApplications: number;
  activeBusinesses: number;
  cooperatives: number;
  revenue: number;
  officers: number;
}

export interface StatusDistribution {
  approved: number;
  pending: number;
  rejected: number;
  underReview: number;
  total: number;
}

export interface TopService {
  name: string;
  count: number;
}

export interface RecentApplication {
  id: string;
  applicantName: string;
  applicationType: string;
  submissionTime: string;
  status: string;
}

export interface MonthlyApplications {
  labels: string[];
  thisMonth: number[];
  lastMonth: number[];
}

export interface FooterAggregates {
  platformUsers: number;
  verifiedBusinesses: number;
  documentsUploaded: number;
  pendingApplications: number;
}

export interface AdminDashboardData {
  kpis: AdminKpis;
  statusDistribution: StatusDistribution;
  monthlyApplications: MonthlyApplications;
  topServices: TopService[];
  recentApplications: RecentApplication[];
  footerAggregates: FooterAggregates;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const COLLECTIONS = {
  businesses: "business_registrations",
  cooperatives: "cooperativeRegistrations",
  msme: "msme_registrations",
  sme: "sme_registrations",
  newsletter: "newsletter_subscribers",
} as const;

const SERVICE_LABELS: Record<string, string> = {
  business_registrations: "Business Registration",
  cooperativeRegistrations: "Cooperative Registration",
  msme_registrations: "MSME Registration",
  sme_registrations: "SME Registration",
};

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function toDate(value: unknown): Date | null {
  if (!value) return null;
  if (value instanceof Date) return value;
  // Firestore Timestamp admin SDK object has .toDate()
  if (typeof value === "object" && value !== null && "toDate" in value) {
    try {
      return (value as { toDate: () => Date }).toDate();
    } catch {
      return null;
    }
  }
  if (typeof value === "number") return new Date(value);
  if (typeof value === "string") {
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d;
  }
  return null;
}

function normalizeStatus(raw: unknown): "approved" | "pending" | "rejected" | "underReview" | "other" {
  const s = String(raw ?? "").toLowerCase().trim();
  if (s === "approved") return "approved";
  if (s === "rejected" || s === "suspended") return "rejected";
  if (s === "under review" || s === "under_review") return "underReview";
  if (s === "pending" || s === "submitted" || s === "draft") return "pending";
  return "other";
}

function asRecord(value: unknown): Record<string, unknown> {
  if (value && typeof value === "object") return value as Record<string, unknown>;
  return {};
}

/**
 * Fetches all documents from a collection. Admin SDK bypasses rules,
 * so this works regardless of the caller.
 */
async function fetchAll<T = Record<string, unknown>>(collectionPath: string): Promise<Array<T & { id: string }>> {
  if (!adminDb) return [];
  try {
    const snap = await adminDb.collection(collectionPath).get();
    const out: Array<T & { id: string }> = [];
    snap.forEach((doc) => {
      out.push({ id: doc.id, ...(doc.data() as T) });
    });
    return out;
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[admin-data] failed to fetch ${collectionPath}:`, err);
    }
    return [];
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Builds the full admin dashboard dataset in a single pass over Firestore.
 */
export async function getAdminDashboardData(): Promise<AdminDashboardData> {
  const [businesses, cooperatives, msmes, smes, subscribers] = await Promise.all([
    fetchAll(COLLECTIONS.businesses),
    fetchAll(COLLECTIONS.cooperatives),
    fetchAll(COLLECTIONS.msme),
    fetchAll(COLLECTIONS.sme),
    fetchAll(COLLECTIONS.newsletter),
  ]);

  const allApps = [
    ...businesses.map((d) => ({ collection: COLLECTIONS.businesses, doc: d })),
    ...cooperatives.map((d) => ({ collection: COLLECTIONS.cooperatives, doc: d })),
    ...msmes.map((d) => ({ collection: COLLECTIONS.msme, doc: d })),
    ...smes.map((d) => ({ collection: COLLECTIONS.sme, doc: d })),
  ];

  // --- KPIs ---
  const totalApplications = allApps.length;
  const activeBusinesses = businesses.length;
  const cooperativeCount = cooperatives.length;
  // Revenue: no payment collection exists yet → 0
  const revenue = 0;
  // Officers: derive from unique admins in auth is expensive; keep 0
  const officers = 0;

  // --- Status distribution ---
  const statusDist: StatusDistribution = {
    approved: 0,
    pending: 0,
    rejected: 0,
    underReview: 0,
    total: totalApplications,
  };
  for (const { doc } of allApps) {
    const normalized = normalizeStatus(doc.status);
    if (normalized === "approved") statusDist.approved++;
    else if (normalized === "pending") statusDist.pending++;
    else if (normalized === "rejected") statusDist.rejected++;
    else if (normalized === "underReview") statusDist.underReview++;
  }

  // --- Monthly applications (this year vs last year, same month bucket) ---
  const now = new Date();
  const thisYear = now.getFullYear();
  const lastYear = thisYear - 1;
  const thisMonthSeries = new Array(12).fill(0);
  const lastMonthSeries = new Array(12).fill(0);

  for (const { doc } of allApps) {
    const d = toDate(doc.createdAt ?? doc.submittedAt);
    if (!d) continue;
    const monthIdx = d.getMonth();
    if (d.getFullYear() === thisYear) thisMonthSeries[monthIdx]++;
    else if (d.getFullYear() === lastYear) lastMonthSeries[monthIdx]++;
  }

  // --- Top services (by collection) ---
  const counts: Record<string, number> = {};
  for (const { collection } of allApps) {
    counts[collection] = (counts[collection] ?? 0) + 1;
  }
  const topServices: TopService[] = Object.entries(counts)
    .map(([col, count]) => ({ name: SERVICE_LABELS[col] ?? col, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // --- Recent applications (most recent 5 by createdAt/submittedAt) ---
  const recent: RecentApplication[] = allApps
    .map(({ collection, doc }) => {
      const rec = asRecord(doc);
      const info = asRecord(rec.businessInformation ?? rec.cooperativeDetails ?? rec);
      const name =
        (info.businessName as string) ||
        (info.cooperativeName as string) ||
        (rec.businessName as string) ||
        (rec.cooperativeName as string) ||
        "Untitled Application";
      const d = toDate(rec.createdAt ?? rec.submittedAt);
      return {
        id: doc.id,
        applicantName: name,
        applicationType: SERVICE_LABELS[collection] ?? collection,
        submissionTime: d ? d.toISOString() : "",
        status: String(rec.status ?? "pending"),
      };
    })
    .sort((a, b) => (b.submissionTime > a.submissionTime ? 1 : -1))
    .slice(0, 5);

  // --- Footer aggregates ---
  const documentsUploaded = allApps.reduce((sum, { doc }) => {
    const rec = asRecord(doc);
    const docs = Array.isArray(rec.documents) ? rec.documents.length : 0;
    return sum + docs;
  }, 0);

  const footerAggregates: FooterAggregates = {
    platformUsers: subscribers.length,
    verifiedBusinesses: statusDist.approved,
    documentsUploaded,
    pendingApplications: statusDist.pending + statusDist.underReview,
  };

  return {
    kpis: {
      totalApplications,
      activeBusinesses,
      cooperatives: cooperativeCount,
      revenue,
      officers,
    },
    statusDistribution: statusDist,
    monthlyApplications: {
      labels: MONTH_LABELS,
      thisMonth: thisMonthSeries,
      lastMonth: lastMonthSeries,
    },
    topServices,
    recentApplications: recent,
    footerAggregates,
  };
}

// ---------------------------------------------------------------------------
// Businesses list (raw documents for the /admin/businesses table)
// ---------------------------------------------------------------------------

const LOGO_COLORS = ["#FFAA00", "#1D4ED8", "#7C3AED", "#CC8800", "#CC8800", "#BE123C", "#0369A1", "#7C2D12"];

function pickLogoColor(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return LOGO_COLORS[hash % LOGO_COLORS.length];
}

function normalizeBusinessStatus(raw: unknown): BusinessRow["status"] {
  const s = String(raw ?? "").toLowerCase().trim();
  if (s === "approved") return "Approved";
  if (s === "under review" || s === "under_review") return "Under Review";
  if (s === "rejected") return "Rejected";
  if (s === "suspended") return "Suspended";
  return "Pending";
}

export async function getBusinessRows(): Promise<BusinessRow[]> {
  const docs = await fetchAll(COLLECTIONS.businesses);
  return docs.map((doc) => {
    const rec = asRecord(doc);
    const info = asRecord(rec.businessInformation);
    const owners = Array.isArray(info.owners) ? info.owners : Array.isArray(rec.owners) ? rec.owners : [];
    const primaryOwner = owners.length > 0 ? asRecord(owners[0]) : {};
    const d = toDate(rec.createdAt ?? rec.submittedAt);

    return {
      id: doc.id,
      businessName: (info.businessName as string) || "Untitled Business",
      applicationNumber: (rec.registrationNumber as string) || doc.id.slice(0, 8).toUpperCase(),
      ownerName: (primaryOwner.fullName as string) || "—",
      ownerEmail: (primaryOwner.email as string) || (info.emailAddress as string) || "—",
      ownerPhone: (primaryOwner.phoneNumber as string) || (info.phoneNumber as string) || "—",
      categoryId: (info.businessCategory as string) || "",
      categoryName: (info.businessCategory as string) || "Uncategorized",
      lga: (info.localGovernmentArea as string) || "—",
      status: normalizeBusinessStatus(rec.status),
      registeredOnDate: d ? d.toLocaleDateString("en-NG") : "—",
      registeredOnTime: d ? d.toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit" }) : "—",
      logoColor: pickLogoColor((info.businessName as string) || doc.id),
    };
  });
}

// ---------------------------------------------------------------------------
// Cooperatives list
// ---------------------------------------------------------------------------

function normalizeCooperativeStatus(raw: unknown): CooperativeRow["status"] {
  const s = String(raw ?? "").toLowerCase().trim();
  if (s === "approved") return "Approved";
  if (s === "under review" || s === "under_review") return "Under Review";
  if (s === "rejected") return "Rejected";
  if (s === "suspended") return "Suspended";
  return "Pending";
}

export async function getCooperativeRows(): Promise<CooperativeRow[]> {
  const docs = await fetchAll(COLLECTIONS.cooperatives);
  return docs.map((doc) => {
    const rec = asRecord(doc);
    const info = asRecord(rec.cooperativeDetails);
    const members = Array.isArray(rec.members) ? rec.members : [];
    const chairman = members.find((m) => {
      const role = String(asRecord(m).role ?? "").toLowerCase();
      return role === "chairman";
    }) || (members.length > 0 ? members[0] : {});
    const chair = asRecord(chairman);
    const d = toDate(rec.createdAt ?? rec.submittedAt);

    return {
      id: doc.id,
      cooperativeName: (info.cooperativeName as string) || "Untitled Cooperative",
      registrationNumber: (rec.registrationNumber as string) || doc.id.slice(0, 8).toUpperCase(),
      chairmanName: (chair.fullName as string) || "—",
      chairmanEmail: (chair.emailAddress as string) || (info.emailAddress as string) || "—",
      chairmanPhone: (chair.phoneNumber as string) || (info.phoneNumber as string) || "—",
      categoryId: (info.registrationCategory as string) || "",
      categoryName: (info.registrationCategory as string) || "Uncategorized",
      lga: (info.localGovernmentArea as string) || "—",
      status: normalizeCooperativeStatus(rec.status),
      registeredOnDate: d ? d.toLocaleDateString("en-NG") : "—",
      registeredOnTime: d ? d.toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit" }) : "—",
      logoColor: pickLogoColor((info.cooperativeName as string) || doc.id),
    };
  });
}

// ---------------------------------------------------------------------------
// MSME list (reuses BusinessRow shape)
// ---------------------------------------------------------------------------

export async function getMsmeRows(): Promise<BusinessRow[]> {
  const docs = await fetchAll(COLLECTIONS.msme);
  return docs.map((doc) => {
    const rec = asRecord(doc);
    const info = asRecord(rec.businessInformation);
    const owners = Array.isArray(rec.ownerDirectors)
      ? rec.ownerDirectors
      : Array.isArray(info.owners)
      ? info.owners
      : [];
    const primaryOwner = owners.length > 0 ? asRecord(owners[0]) : {};
    const d = toDate(rec.createdAt ?? rec.submittedAt);

    return {
      id: doc.id,
      businessName: (info.businessName as string) || "Untitled MSME",
      applicationNumber: (rec.registrationNumber as string) || doc.id.slice(0, 8).toUpperCase(),
      ownerName: (primaryOwner.fullName as string) || "—",
      ownerEmail: (primaryOwner.email as string) || (info.email as string) || "—",
      ownerPhone: (primaryOwner.phoneNumber as string) || (info.phoneNumber as string) || "—",
      categoryId: (info.businessCategory as string) || "",
      categoryName: (info.businessCategory as string) || "Uncategorized",
      lga: (info.localGovernmentArea as string) || "—",
      status: normalizeBusinessStatus(rec.status),
      registeredOnDate: d ? d.toLocaleDateString("en-NG") : "—",
      registeredOnTime: d ? d.toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit" }) : "—",
      logoColor: pickLogoColor((info.businessName as string) || doc.id),
    };
  });
}

// ---------------------------------------------------------------------------
// SME list (reuses BusinessRow shape)
// ---------------------------------------------------------------------------

export async function getSmeRows(): Promise<BusinessRow[]> {
  const docs = await fetchAll(COLLECTIONS.sme);
  return docs.map((doc) => {
    const rec = asRecord(doc);
    const info = asRecord(rec.businessInformation);
    const owners = Array.isArray(rec.ownerDirectors)
      ? rec.ownerDirectors
      : Array.isArray(info.owners)
      ? info.owners
      : [];
    const primaryOwner = owners.length > 0 ? asRecord(owners[0]) : {};
    const d = toDate(rec.createdAt ?? rec.submittedAt);

    return {
      id: doc.id,
      businessName: (info.businessName as string) || "Untitled SME",
      applicationNumber: (rec.registrationNumber as string) || doc.id.slice(0, 8).toUpperCase(),
      ownerName: (primaryOwner.fullName as string) || "—",
      ownerEmail: (primaryOwner.email as string) || (info.email as string) || "—",
      ownerPhone: (primaryOwner.phoneNumber as string) || (info.phoneNumber as string) || "—",
      categoryId: (info.businessCategory as string) || "",
      categoryName: (info.businessCategory as string) || "Uncategorized",
      lga: (info.localGovernmentArea as string) || "—",
      status: normalizeBusinessStatus(rec.status),
      registeredOnDate: d ? d.toLocaleDateString("en-NG") : "—",
      registeredOnTime: d ? d.toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit" }) : "—",
      logoColor: pickLogoColor((info.businessName as string) || doc.id),
    };
  });
}
