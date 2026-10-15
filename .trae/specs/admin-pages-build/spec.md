# Admin Pages Build — Specification

## Problem

The Anambra State Ministry of Commerce admin portal already has a professional
UI shell (sidebar, header, dashboard, businesses/cooperatives tables) but the
data layer is incomplete:

- The **Businesses** page renders its table client without passing `initialRows`,
  so the table is always empty even though Firestore has data.
- The **Cooperatives** page hardcodes `EMPTY_ROWS` and shows a "awaiting live
  Firestore connection" chip.
- **No MSME / SME admin pages** exist, despite those collections being present.
- All row actions (Approve / Reject / Suspend / Edit / Delete) are
  non-functional snackbars — there are **no write API routes**.
- The header **Sign Out** button does not call `/api/auth/logout`.
- The dashboard greets a hardcoded "Admin User" instead of the real admin.
- There is no documented way to **create an admin account** (set the `admin`
  custom claim), so no one can log in.

The goal is to make the admin portal fully functional: read real Firestore
data, perform real status mutations, authenticate admins end-to-end, and leave
a clear login report.

## Users

- Ministry administrators who approve/reject business, cooperative, MSME and
  SME registration applications.

## Goals

1. All four registration modules (Businesses, Cooperatives, MSME, SME) load
   real Firestore documents and display them in their existing tables.
2. Admins can change an application's status (Approve / Reject / Suspend /
   Under Review / Pending) via server-side API routes using the Firebase Admin
   SDK.
3. The admin header logout actually clears the `__session` cookie and redirects
   to `/admin/login`.
4. The dashboard and header show the signed-in admin's identity (email / name).
5. A documented, runnable procedure exists to create an admin user and grant
   the `admin` custom claim so login works.
6. A final report explains how to log in and what was built.

## Non-Goals

- Building new public-facing registration flows.
- Implementing payment / revenue collection.
- Creating a full role-based access control matrix beyond the existing
  `admin` claim.
- Migrating the gold `#D4AF37` brand accent away (it is the ministry brand
  colour; only elevation shadows must remain slate-neutral per project rules).

## Functional Requirements

### FR-1 — Data loading (read)
- Businesses page: `page.tsx` calls `getBusinessRows()` server-side and passes
  rows to `BusinessesPageClient`.
- Cooperatives page: `page.tsx` calls `getCooperativeRows()` server-side and
  passes rows to `CooperativesPageClient`; remove the "awaiting live Firestore"
  chip once data loads.
- New MSME page and SME page mirror the same pattern with their own
  `getMsmeRows()` / `getSmeRows()` helpers.

### FR-2 — Status mutation (write)
- A single server route `POST /api/admin/applications/status` accepts
  `{ collection, id, status }`, verifies the `__session` cookie + `admin`
  claim, and updates the document's `status` and `updatedAt` using the Admin
  SDK.
- Allowed `status` values: `Approved`, `Rejected`, `Suspended`,
  `Under Review`, `Pending`.
- The route is protected: missing/invalid session or non-admin → 401/403.
- Client table actions call this route and show loading + success/error
  states; the row updates optimistically and refreshes.

### FR-3 — Logout
- Header "Sign Out" calls `POST /api/auth/logout` then redirects to
  `/admin/login`.

### FR-4 — Admin identity
- The dashboard layout fetches the admin user record (email / displayName)
  from the verified session and passes it to the header/dashboard so the
  greeting and profile popover show real values.

### FR-5 — Admin account creation
- Provide a Node script `scripts/set-admin-claim.mjs` that uses the Admin SDK
  to grant the `admin` custom claim to a given email (and creates the user if
  it does not exist). Document usage in the final report.

### FR-6 — Detail view
- Add a read-only detail drawer that shows the full stored document for a
  selected row (business info, owners/directors, documents, status,
  timestamps). Used by all four modules.

## Non-Functional Requirements

- NFR-1: All admin API routes use `verifySessionCookie` + `hasAdminClaim`; no
  client-side Firestore writes for admin operations.
- NFR-2: No PII logged to console in production paths.
- NFR-3: Shadows remain neutral slate `rgba(15, 23, 42, …)` — no gold/yellow
  elevation.
- NFR-4: `next build` and `tsc --noEmit` pass with no errors.
- NFR-5: Existing security rules remain unchanged (admin list, owner-or-admin
  read, no client deletes).

## Acceptance Criteria

- **AC-1 (rule):** `/admin/businesses` renders real Firestore business rows;
  verified by build + runtime check that `page.tsx` passes `initialRows`.
- **AC-2 (rule):** `/admin/cooperatives` renders real Firestore cooperative
  rows and no longer shows the "awaiting live Firestore" chip.
- **AC-3 (rule):** `/admin/msme` and `/admin/sme` exist and render their
  collection's rows.
- **AC-4 (rule):** `POST /api/admin/applications/status` updates a document's
  `status` field and returns 200 for an admin session; returns 401 without a
  valid session.
- **AC-5 (rule):** Approve/Reject/Suspend actions in all four tables persist
  to Firestore and reflect in the UI.
- **AC-6 (rule):** Header "Sign Out" clears `__session` and lands on
  `/admin/login`.
- **AC-7 (rule):** Dashboard / header show the real admin email from the
  session, not hardcoded "Admin User".
- **AC-8 (rubric):** Professional visual quality — consistent spacing,
  slate-neutral shadows, clear loading/empty/error states. Threshold ≥ 4/5.
- **AC-9 (rule):** `scripts/set-admin-claim.mjs` exists and grants the `admin`
  claim; report explains how to run it and log in.
- **AC-10 (rule):** `next build` succeeds with no TypeScript errors.
