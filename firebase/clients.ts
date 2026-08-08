import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import {
  getAuth,
  Auth,
  GoogleAuthProvider,
  signInWithEmailAndPassword as _signInWithEmailAndPassword,
  signOut as _signOut,
  onAuthStateChanged as _onAuthStateChanged,
  User,
} from "firebase/auth";
import {
  getFirestore,
  Firestore,
  collection as _collection,
  doc as _doc,
  getDoc as _getDoc,
  getDocs as _getDocs,
  setDoc as _setDoc,
  addDoc as _addDoc,
  updateDoc as _updateDoc,
  deleteDoc as _deleteDoc,
  query as _query,
  where as _where,
  orderBy as _orderBy,
  limit as _limit,
  serverTimestamp as _serverTimestamp,
  Timestamp,
  FieldValue,
} from "firebase/firestore";
import {
  getStorage,
  FirebaseStorage,
  ref as _ref,
  uploadBytes as _uploadBytes,
  uploadString as _uploadString,
  getDownloadURL as _getDownloadURL,
  deleteObject as _deleteObject,
} from "firebase/storage";
import {
  getFunctions,
  Functions,
  httpsCallable as _httpsCallable,
} from "firebase/functions";

const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    "AIzaSyBxN-vOObBe3BeLQ-Tx-Fk0nzlv-F9bDz4",
  authDomain: "state-project-20464.firebaseapp.com",
  projectId: "state-project-20464",
  storageBucket: "state-project-20464.appspot.com",
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "456713823316",
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
    "1:456713823316:web:3ba8db69cda39080ef39c1",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || undefined,
};

export const app: FirebaseApp =
  getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Firestore initialized with explicit databaseId for safety and cross-compat
export const db: Firestore = (() => {
  try {
    return getFirestore(app);
  } catch {
    return getFirestore(app, "(default)");
  }
})();

export const auth: Auth = getAuth(app);
export const storage: FirebaseStorage = getStorage(app);
export const functions: Functions = getFunctions(app);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const signInWithEmailAndPassword = _signInWithEmailAndPassword;
export const signOut = _signOut;
export const onAuthStateChanged = _onAuthStateChanged;
export const collection = _collection;
export const doc = _doc;
export const getDoc = _getDoc;
export const getDocs = _getDocs;
export const setDoc = _setDoc;
export const addDoc = _addDoc;
export const updateDoc = _updateDoc;
export const deleteDoc = _deleteDoc;
export const query = _query;
export const where = _where;
export const orderBy = _orderBy;
export const limit = _limit;
export const serverTimestamp = _serverTimestamp;
export const storageRef = _ref;
export const uploadBytes = _uploadBytes;
export const uploadString = _uploadString;
export const getDownloadURL = _getDownloadURL;
export const deleteObject = _deleteObject;
export const httpsCallable = _httpsCallable;

export { Timestamp, FieldValue };
export type { User };
