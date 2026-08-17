// Import the functions you need from the SDKs you need
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
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

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEPlb-Mpl5WNsiS0spsyKww41-UkyOP9U",
  authDomain: "anambra-commerce-d6fa7.firebaseapp.com",
  projectId: "anambra-commerce-d6fa7",
  storageBucket: "anambra-commerce-d6fa7.firebasestorage.app",
  messagingSenderId: "376801891052",
  appId: "1:376801891052:web:567a2b6d829e529926cbc9",
  measurementId: "G-SELHMVVW1J"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Analytics requires a browser environment with cookies / window.
// Skip during Next.js SSR / SSG prerender to avoid "window is not defined".
export const analytics =
  typeof window !== "undefined" ? getAnalytics(app) : null;

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




