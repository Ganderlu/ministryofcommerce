import { initializeApp, getApps, getApp, App, cert, ServiceAccount } from "firebase-admin/app";
import {
  getAuth,
  Auth,
  DecodedIdToken,
  UserRecord,
} from "firebase-admin/auth";
import {
  getFirestore,
  Firestore,
  FieldValue,
  Timestamp,
} from "firebase-admin/firestore";
import {
  getStorage,
  Storage,
} from "firebase-admin/storage";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    const msg = `[firebase/admin] Missing required env var: ${name}. Set it in .env.local before running.`;
    if (process.env.NODE_ENV === "production") throw new Error(msg);
    console.warn(msg);
    return "";
  }
  return value;
}

function buildServiceAccount(): ServiceAccount {
  const privateKeyRaw = requireEnv("FIREBASE_ADMIN_PRIVATE_KEY");
  const privateKey = privateKeyRaw.replace(/\\n/g, "\n");

  return {
    projectId: requireEnv("FIREBASE_PROJECT_ID"),
    privateKey,
    clientEmail: requireEnv("FIREBASE_ADMIN_CLIENT_EMAIL"),
  };
}

const projectId = requireEnv("FIREBASE_PROJECT_ID");
const storageBucket = process.env.FIREBASE_STORAGE_BUCKET || `${projectId}.appspot.com`;

export const adminApp: App =
  getApps().length > 0
    ? getApp()
    : initializeApp({
        credential: cert(buildServiceAccount()),
        projectId,
        storageBucket,
      });

export const adminAuth: Auth = getAuth(adminApp);
export const adminDb: Firestore = getFirestore(adminApp);
export const adminStorage: Storage = getStorage(adminApp);

export async function verifyIdToken(idToken: string): Promise<DecodedIdToken | null> {
  try {
    const decoded = await adminAuth.verifyIdToken(idToken, true);
    return decoded;
  } catch {
    return null;
  }
}

/**
 * Creates a long-lived Firebase session cookie from a client ID token.
 * The cookie is meant to be stored as `__session` and verified server-side.
 */
export async function createSessionCookie(idToken: string, expiresIn: number = 60 * 60 * 24 * 7 * 1000): Promise<string | null> {
  try {
    const cookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
    return cookie;
  } catch {
    return null;
  }
}

/**
 * Verifies a Firebase session cookie and returns the decoded claims.
 * Uses checkRevoked=true so revoked sessions are rejected.
 */
export async function verifySessionCookie(sessionCookie: string): Promise<DecodedIdToken | null> {
  try {
    const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
    return decoded;
  } catch {
    return null;
  }
}

export async function getUser(uid: string): Promise<UserRecord | null> {
  try {
    return await adminAuth.getUser(uid);
  } catch {
    return null;
  }
}

export async function setCustomClaims(
  uid: string,
  claims: Record<string, unknown>
): Promise<void> {
  await adminAuth.setCustomUserClaims(uid, claims);
}

export async function hasAdminClaim(uid: string): Promise<boolean> {
  const user = await getUser(uid);
  return Boolean(user?.customClaims?.admin === true);
}

export { FieldValue as FieldValueAdmin, Timestamp as TimestampAdmin };
export const dbAdmin: Firestore | null = adminDb || null;
