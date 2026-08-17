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
} from "firebase-admin/firestore";
import {
  getStorage,
  Storage,
} from "firebase-admin/storage";

const serviceAccount = {
  type: "service_account",
  project_id: "anambra-commerce-d6fa7",
  private_key_id: "260b1388cd56a30cb36e7d7129355b703ecb3bd3",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDIUR7iWhyHF0LI\nCM18+NbhiwBM/HXsxSoTvmSrqqpDEXa9a8GC7hh5YJ3nfj9HwHJ2PXKDe9aBaAXg\nxfeB8JTu42xTYAqgOTZoBHpamax+ZuVa3JiMQ0lDlKHwE0rc0zjASrloDRWZbqRM\nML0fiTjAHIH7pm2gBrbYN1Zb0cXu4SQKyoRdNWoYrGnD/SJdlRni+Ckw14p3Krwz\nTuyd53XV4QBxSuuSDkYmAqMHYa4acP/3vdF9lH3UiTrss1e9qJHOHnfzrXiD5xnC\n5A+NoppT3CIV+m5L4Ac9IFSH++yy0p+wLfbBYF6MRqQNFoki/LzQHBrNSKUIhHFn\nFVwJEnehAgMBAAECggEABlLxS6oWnnkwhYopmplsh0BRKR0LSAdNdcQb/4NqzqU9\nf2tod462vRY8xfMpYkWEF5GHDPma4wj6robxcmu69/O8FsHAdCB6RDxn9HZHiNIM\nyZqPQlZZeMW3exHQ2jnc3808HznShb6Fd1ZOkjFN1lrQC7bMXTH5EchldI6h1hG9\nH0cv1kDRbY9NCr/LQmNgJ/qkUFyA91/Zc6bG6KmA4cE7i3fb/MsLEk1NS289ymp+\nP20JLgb79ZL+8hhIlEUjsDNbqqnBP4EKSwSrA+SZ5FVaJawuuwFC4U9yCCefJOBz\nU9F0u6RKla6SR+1b88EivOmNkBkW++HYCxB8cX95AQKBgQD/muob1NRLMLhgVLVZ\nNF0xtDntUxu7HYG2U989pyDKpIpXrjHVC6WAcC1J2FdtR3NGS36d+WfpRnHd972Z\nVpkFaNqmQJmc4zQiCTol04I2D7iDfG5cjAvFP4lNLJA54NSqPcnwebo5sE6/dJQY\nl9w3S6TsqUTvmatE/qgfCMqasQKBgQDIoFdMwzHFZs+1iecmjjpwHo8uAgJrg6DB\nI9TTiLpaHeYG1bs+SSiSkQn77EhWpK41KqpHDttKXvSHwbTy63zumJuPn9jZXlft\nM2uMXUB29SsbkLivuyDclX3ec5dWs9oNK4T+Gf05B9+lblyXwJFtYkebz00x6P4N\n+zrwyNwH8QKBgQDbzDcsn6O+1LJ4A9++Sc0qBLUbY7AhA4qbYxxBRApqt3tPUrf/\nX/h9rfkD20my6xIxjJHg/qtgafdYzMT5qwIDKNt8w2hVBPu7mPurs2nxWytrxgCR\nDMzCXZSQDJYpbzDxBBk29TYyjW3qLTF8xHnWAvJboGNrNlWVCvc/WKwAwQKBgFBf\no/m1rSfHE2lH8NmKWzD1nSiyV2PZHLqjbyy7duSJW9DbKSM/zchB4L0TILvNR5k3\nGXZUJlf6CH6mhKZY3vj7HD8Cq64RVKpLUkeuSBggCgAGD2cfUX/tR7qpljR+4tkp\n2SKvKLoDRH6S4vdMhzZKDCQIfYWEMNtLDYbPAQ8RAoGAfzq3HWWd2cJ2VFT0MTpJ\nnpgWzMNmPidYUYsUjDhK2iHxSrrwmvnU82JL12uuoT1GpKJM9zqPNcyRC8xD7AkU\nAX3ZfhqORI9yOaNgWacjYa5GW18z8s60gjDmUHShyhv9g47L6EmR+ZcRseHS+avF\n2IWAb9VZ4gfzVYRgtJID0fk=\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-fbsvc@anambra-commerce-d6fa7.iam.gserviceaccount.com",
  client_id: "100114866217676732457",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40anambra-commerce-d6fa7.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

export const adminApp: App =
  getApps().length > 0
    ? getApp()
    : initializeApp({
        credential: cert(serviceAccount as unknown as ServiceAccount),
        projectId: "anambra-commerce-d6fa7",
        storageBucket: "anambra-commerce-d6fa7.appspot.com",
      });

export const adminAuth: Auth = getAuth(adminApp);
export const adminDb: Firestore = getFirestore(adminApp);
export const adminStorage: Storage = getStorage(adminApp);

export async function verifyIdToken(idToken: string): Promise<DecodedIdToken | null> {
  try {
    const decoded = await adminAuth.verifyIdToken(idToken, true);
    return decoded;
  } catch (err) {
    return null;
  }
}

export async function getUser(uid: string): Promise<UserRecord | null> {
  try {
    return await adminAuth.getUser(uid);
  } catch (err) {
    return null;
  }
}

export async function setCustomClaims(
  uid: string,
  claims: Record<string, any>
): Promise<void> {
  await adminAuth.setCustomUserClaims(uid, claims);
}
