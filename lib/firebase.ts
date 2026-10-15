// LEGACY shim — project convention is to import Firebase client utilities
// EXCLUSIVELY from `@/firebase/clients`. This file exists only to avoid
// breaking existing imports; new code MUST use `@/firebase/clients` directly.
export { app, auth, db, storage, analytics } from "@/firebase/clients";
export type { User } from "@/firebase/clients";
