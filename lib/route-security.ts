import { NextRequest } from "next/server";
import { verifyIdToken, hasAdminClaim } from "@/firebase/admin";

export async function extractAndVerifyBearer(
  request: NextRequest
): Promise<{ uid: string; email?: string | null; isAdmin: boolean } | null> {
  const authHeader = request.headers.get("authorization") || "";
  if (!authHeader.startsWith("Bearer ")) return null;
  const idToken = authHeader.slice(7).trim();
  if (!idToken) return null;

  const decoded = await verifyIdToken(idToken);
  if (!decoded) return null;
  const isAdmin = await hasAdminClaim(decoded.uid);
  return { uid: decoded.uid, email: decoded.email ?? null, isAdmin };
}

// Simple per-IP in-memory sliding-window rate limiter.
// NOTE: This is single-instance only. For multi-instance deployments behind a
// load balancer, replace with Redis / Upstash / Vercel KV backed storage.
type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

export function checkRateLimit(
  request: NextRequest,
  keySuffix: string,
  windowMs: number = 60_000,
  maxRequests: number = 30
): { ok: boolean; retryAfterMs: number } {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  const key = `${ip}|${keySuffix}`;
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || now > existing.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfterMs: 0 };
  }

  if (existing.count >= maxRequests) {
    return { ok: false, retryAfterMs: existing.resetAt - now };
  }

  existing.count += 1;
  return { ok: true, retryAfterMs: 0 };
}

export function sanitizeError(err: unknown): string {
  if (process.env.NODE_ENV !== "production") {
    return err instanceof Error ? err.message : String(err ?? "Unknown error");
  }
  return "Internal server error";
}
