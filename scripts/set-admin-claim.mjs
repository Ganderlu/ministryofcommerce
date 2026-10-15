/**
 * set-admin-claim.mjs
 *
 * Grants the `admin` custom claim to a Firebase Auth user so they can log in
 * to the admin portal at /admin/login.
 *
 * Usage:
 *   node scripts/set-admin-claim.mjs <email> [password]
 *
 * - If the user does not exist, it is created with the given password (a
 *   random 16-char password is generated if omitted).
 * - If the user already exists, the `admin` claim is simply added.
 *
 * Requires a valid .env.local with FIREBASE_PROJECT_ID,
 * FIREBASE_ADMIN_CLIENT_EMAIL, and FIREBASE_ADMIN_PRIVATE_KEY.
 */

import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { readFileSync } from "node:fs";
import crypto from "node:crypto";

// Minimal .env.local parser (avoids adding a dotenv dependency).
function loadEnv(path = ".env.local") {
  try {
    const content = readFileSync(path, "utf8");
    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!(key in process.env)) process.env[key] = value;
    }
  } catch {
    // file may not exist; env vars may be set another way
  }
}

loadEnv();

function requireEnv(name) {
  const v = process.env[name];
  if (!v) {
    console.error(`[set-admin-claim] Missing env var: ${name}`);
    process.exit(1);
  }
  return v;
}

function randomPassword(len = 16) {
  return crypto.randomBytes(len).toString("base64url").slice(0, len);
}

const email = process.argv[2];
if (!email) {
  console.error("Usage: node scripts/set-admin-claim.mjs <email> [password]");
  process.exit(1);
}

const privateKeyRaw = requireEnv("FIREBASE_ADMIN_PRIVATE_KEY").replace(/\\n/g, "\n");

const app =
  getApps().length > 0
    ? getApps()[0]
    : initializeApp({
        credential: cert({
            projectId: requireEnv("FIREBASE_PROJECT_ID"),
            clientEmail: requireEnv("FIREBASE_ADMIN_CLIENT_EMAIL"),
            privateKey: privateKeyRaw,
          }),
      });

const auth = getAuth(app);

async function main() {
  let user;
  let created = false;
  try {
    user = await auth.getUserByEmail(email);
    console.log(`Found existing user: ${user.uid} (${user.email})`);
  } catch (err) {
    if (err.code !== "auth/user-not-found") {
      console.error("Failed to look up user:", err.message);
      process.exit(1);
    }
    const password = process.argv[3] || randomPassword();
    user = await auth.createUser({ email, password, emailVerified: true });
    created = true;
    console.log(`Created new user: ${user.uid}`);
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
  }

  await auth.setCustomUserClaims(user.uid, { admin: true });
  console.log(`\n✓ Granted 'admin' claim to ${email}`);
  console.log(`You can now sign in at /admin/login`);
  if (created) {
    console.log("(Store the generated password above — it will not be shown again.)");
  }
}

main().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
