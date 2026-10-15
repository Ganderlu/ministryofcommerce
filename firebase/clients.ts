// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  type User,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  documentId,
  FieldValue,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

function requirePublicEnv(name: string, value: string | undefined): string {
  // NOTE: env vars MUST be passed via direct access (process.env.NEXT_PUBLIC_*)
  // so Next.js can inline them for client-side code. Dynamic access
  // (process.env[name]) is NOT available in the browser bundle.
  if (!value) {
    const msg = `[firebase/clients] Missing required public env var: ${name}. Set it in .env.local before running.`;
    if (process.env.NODE_ENV === "production") throw new Error(msg);
    console.warn(msg);
    return "";
  }
  return value;
}

// Canonical web app Firebase configuration — loads exclusively from NEXT_PUBLIC_* env vars.
// Public client values are intentionally exposed to the browser; never put server-only secrets here.
const firebaseConfig = {
  apiKey: requirePublicEnv("NEXT_PUBLIC_FIREBASE_API_KEY", process.env.NEXT_PUBLIC_FIREBASE_API_KEY),
  authDomain: requirePublicEnv("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN", process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN),
  projectId: requirePublicEnv("NEXT_PUBLIC_FIREBASE_PROJECT_ID", process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID),
  storageBucket: requirePublicEnv("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET", process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: requirePublicEnv("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID", process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID),
  appId: requirePublicEnv("NEXT_PUBLIC_FIREBASE_APP_ID", process.env.NEXT_PUBLIC_FIREBASE_APP_ID),
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || undefined,
};

// Initialize Firebase (singleton — safe for Next.js HMR)
export const app: FirebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Analytics requires a browser environment with cookies / window.
// Skip during Next.js SSR / SSG prerender to avoid "window is not defined".
export const analytics =
  typeof window !== "undefined" && firebaseConfig.measurementId
    ? getAnalytics(app)
    : null;

// Re-export Firestore & Auth utilities so components can import everything from @/firebase/clients
export {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  documentId,
  FieldValue,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
};
export type { User };




