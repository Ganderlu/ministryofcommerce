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
  project_id: "state-project-20464",
  private_key_id: "2e8400cdcf039054d086294667865fc504d93547",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDKu59mgMJyyRNB\n3mDypc6x1m4BG3irj8qjsamD0GkpGFAqfXnv6V3li75j6FCEDSGndUSbEhytjhu1\nKkXM7JGzmOPYy5lgqRm+1/VnAFltyKBWvQE2CtJ9i00NtuTAyPZFdFUH+eP9O0EA\nfIX7l0nG+KIi1omdc7hJheUvNvqougaaAxLzT9kU7GL6lVNrrvavOtXLWaRbEHli\nRe29EgS9EQQKmzq+3516Jd2jGl3Dll8bL4HZbk2Ro4WNIk7yUXDDwGZR3rxds44+\nqu5Lies6nXSV8TYGWJNv5FmGEuw2Bmz+r9Avr1/KPjvnwocc9zP07IWM4IRXXiRM\n4skSxhM1AgMBAAECggEACEffbAUdX1yym/gOQ+SdS54WsmMU+J9jQQo8NZ8F9JpC\niAHF2pSD89QGuLdgA1mZj5v8639mMXnPZh56z5lOhQrDkvLgagmhYuF/HuM6Q+XN\nrgCC89o/gvl1WJApMG1+j0azRHCi4EPGO21aq0FtaSJ1vCONzaMdtDV//EyfTDq+\nVH/bujFTAeuZW/6LcgP6ck6/LTMSOLbC9nK9YupdqKTsLx04GJ+OlvHgKBmYGckM\nHmhlSpSf6RGp8cpyg5TJI/P2O1+fZwvputAq13bdOhT+S1IQ0bD8ikeGOcQh3RC1\nhrdayQ++Kxslxx/NpjWVsAKrH6zvbWv78CSJKgoo/wKBgQDyHUD89cbaCzd1P0yi\nZ32FfMAFbZ/ssIDwtjdne6NKbsd325q8JT8Jv26mib4EwO/X2tEq0n6cJJrTXa0f\ngs6+Z1izWErWIohqPP2mXzsu4e8TbQAjJavGQVZHiMZowH35GkWKksI4df49miy6\nRyE9sEQH8rAxNi009lc4zuC02wKBgQDWXCrjNsQ9qekZMBb3060eUDtYBGFq39bl\nwDJiLXMmAbmssf/t5z9a9iBQ1hP7bQS8awnggHcXVUMWmEW2baymG062L08G2E03\nirghSzt54IajAH4l057dYDOSgILqkiO0QqnM/8Ub9pXiBu7sTpG39EX06OrzxzCY\nL2VAlg1NLwKBgQCDQGiiuXp7aek+nnok8IWTf/V4+9zeqzC7TYzrhJMZHsTzrRFN\nPcPWvPh3P+TLHuzmz7DkzgflDdMBEp9vnbIGdnAXiZ3ISCA7t6SqNKYY3FKG7WhN\npXZhm7nyPauRzgh8qklYvgacJRsWuiXVNgpHLu8yf9YUV5JaS9Es8rnOUQKBgQCs\nbL7ivW7k2wNxC0muV0ptk8PobL2fpiXJ8OuWJVD2RXUBAL0ItHY1yLz9yPWRzIN+\nu+rZ9vvUfPTV++43a8jwZA7QZQWAUATspFywCz/wLTafbwoJi0vCbluNgGnOHXcy\nzFyhVStL7vFpOoJ8+kYkXgzXj3NOW+8uuxEK/qf8aQKBgQCnHPZdO0Ja54mMEj+8\n39ZoYm0wWi4qRPWG6QR1inFnKL7UzWHde3sJVhSM0bsTO4twpyGJA4piFN9nZg7b\nTfHWHa2MJ9OpjgP5/UKwjl9GIM9DwMntvLgxYChWvtmr6NRxlA7pgw21zuhvw8VY\n3IaoNh5TW57riG4jJJZqZuL42Q==\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-fbsvc@state-project-20464.iam.gserviceaccount.com",
  client_id: "102228455688019413606",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40state-project-20464.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

export const adminApp: App =
  getApps().length > 0
    ? getApp()
    : initializeApp({
        credential: cert(serviceAccount as unknown as ServiceAccount),
        projectId: "state-project-20464",
        storageBucket: "state-project-20464.appspot.com",
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
