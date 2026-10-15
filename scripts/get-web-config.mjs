import { cert, getApps, initializeApp } from "firebase-admin/app";
import { readFileSync } from "node:fs";

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
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      if (!(key in process.env)) process.env[key] = value;
    }
  } catch {}
}
loadEnv();

const projectId = process.env.FIREBASE_PROJECT_ID;
const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, "\n");
const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;

const app = getApps().length > 0 ? getApps()[0] : initializeApp({
  credential: cert({ projectId, clientEmail, privateKey }),
  projectId,
});

const token = await app.options.credential.getAccessToken();

const appId = "1:376801891052:web:567a2b6d829e529926cbc9";
const res = await fetch(
  `https://firebase.googleapis.com/v1beta1/projects/${projectId}/webApps/${appId}/config`,
  { headers: { Authorization: `Bearer ${token.access_token}` } }
);
const data = await res.json();
console.log(JSON.stringify(data, null, 2));
