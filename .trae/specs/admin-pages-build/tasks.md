# Admin Pages Build — Tasks

## Task 1: Fix Businesses page data loading

- Map: AC-1
- Priority: high
- Status: pending

Edit `app/admin/(dashboard)/businesses/page.tsx` to call `getBusinessRows()`
from `@/lib/admin-data` server-side and pass `initialRows` to
`BusinessesPageClient`. (The client already accepts the prop; the page just
never supplied it.)

**TR-1.1 (rule):** `page.tsx` imports `getBusinessRows` and renders
`<BusinessesPageClient initialRows={rows} />`.

---

## Task 2: Fix Cooperatives page data loading

- Map: AC-2
- Priority: high
- Status: pending

- Edit `CooperativesPageClient.tsx` to accept `initialRows: CooperativeRow[]`
  and use it for filtering/pagination (remove `EMPTY_ROWS`).
- Edit `cooperatives/page.tsx` to call `getCooperativeRows()` and pass rows.
- Remove the "awaiting live Firestore connection" warning chip.

**TR-2.1 (rule):** `CooperativesPageClient` filters over `initialRows` and
the warning chip is gone.

---

## Task 3: Add MSME + SME row fetchers and admin pages

- Map: AC-3
- Priority: high
- Status: pending

- Add `getMsmeRows()` and `getSmeRows()` to `lib/admin-data.ts` producing
  `BusinessRow`-shaped rows (reuse `BusinessRow` for SME/MSME tables, mapping
  their `businessInformation`/`ownerDirectors` fields).
- Create `app/admin/(dashboard)/msme/page.tsx` and
  `app/admin/(dashboard)/sme/page.tsx` + client components that reuse the
  existing `BusinessTable` / `BusinessFilters` / `BusinessStatistics` pattern.
- Add MSME + SME entries to the sidebar nav.

**TR-3.1 (rule):** `/admin/msme` and `/admin/sme` render tables with their
collection's rows.

---

## Task 4: Add status-update API route

- Map: AC-4, AC-5
- Priority: high
- Status: pending

Create `app/api/admin/applications/status/route.ts`:
- Read `__session` cookie via `cookies()`.
- `verifySessionCookie` → `hasAdminClaim`; 401/403 on failure.
- Body: `{ collection: 'business_registrations'|'cooperativeRegistrations'|'msme_registrations'|'sme_registrations', id, status }`.
- Validate `status` against the allowed set.
- `adminDb.collection(collection).doc(id).update({ status, updatedAt: FieldValue.serverTimestamp() })`.
- Return `{ ok: true }`.
- No client-side deletes.

**TR-4.1 (rule):** Route exists, validates session + admin claim, validates
status enum, and updates the document.

---

## Task 5: Wire table actions to real writes

- Map: AC-5
- Priority: high
- Status: pending

- Add a shared `useAdminAction` hook (or inline fetch helper) that POSTs to
  `/api/admin/applications/status` with `collection`, `id`, `status`.
- In each page client, replace the snackbar-only handlers with real calls:
  show a loading state, update the row optimistically on success, show error
  on failure.
- Apply to Businesses, Cooperatives, MSME, SME tables.

**TR-5.1 (rule):** Approve/Reject/Suspend buttons call the API and the row
status updates in the table.

---

## Task 6: Wire logout + admin identity

- Map: AC-6, AC-7
- Priority: medium
- Status: pending

- In `app/admin/(dashboard)/layout.tsx`, after verifying the session, fetch
  the user record (`getUser(decoded.uid)`) and pass `{ email, displayName }`
  to `AdminClientLayout`.
- `AdminClientLayout` forwards `admin` to `Header`.
- `Header` "Sign Out" calls `fetch('/api/auth/logout', { method:'POST' })`
  then `router.push('/admin/login'); router.refresh()`.
- Dashboard welcome uses the real admin email/name.

**TR-6.1 (rule):** Sign Out clears session and redirects to `/admin/login`.
**TR-6.2 (rule):** Header + dashboard show the real admin email/name.

---

## Task 7: Add detail drawer

- Map: AC-3 (detail view), AC-8
- Priority: medium
- Status: pending

Create `components/admin/ApplicationDetailDrawer.tsx` that:
- Receives the collection + id, fetches the raw document server-side or via a
  small read route, and renders business/cooperative/MSME/SME fields in a
  clean read-only layout with documents list.
- Triggered by "View" action in each table.

For scope, fetch via a new read route `GET /api/admin/applications/[collection]/[id]`
protected the same way as the status route.

**TR-7.1 (rule):** Clicking "View" opens a drawer with the full document data.

---

## Task 8: Admin claim script + build verification + report

- Map: AC-9, AC-10
- Priority: high
- Status: pending

- Create `scripts/set-admin-claim.mjs` that reads env, imports the Admin SDK,
  and for a given email either creates the user (random password) or fetches
  it, then `setCustomUserClaims(uid, { admin: true })`.
- Run `npm run build` and `tsc --noEmit`; fix any errors.
- Write the final report: how to run the claim script, how to log in at
  `/admin/login`, and a summary of what was implemented.

**TR-8.1 (rule):** `scripts/set-admin-claim.mjs` exists and runs against the
configured Firebase project.
**TR-8.2 (rule):** `next build` completes with exit code 0.
