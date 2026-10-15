# A1 Production-Readiness Standardisation - Implementation Plan

## Task 1: Fix production build — add "use client" to privacy and terms pages
- **Status**: `completed`
- **Priority**: high
- **Depends On**: None
- **Description**:
  - Extracted the hook-using `LastUpdatedLabel` into a shared client component `components/ui/LastUpdatedLabel.tsx`.
  - Removed `"use client"` from `app/privacy/page.tsx` and `app/terms/page.tsx` so they remain Server Components and can export Next.js metadata.
- **Acceptance Criteria Addressed**: AC-1
- **Test Requirements**:
  - `rule` TR-1.1: `npm run build` exits 0 with no webpack errors.
- **Completion Evidence**:
  - Build output: `✓ Compiled successfully`, `✓ Generating static pages (48/48)`, exit code 0.

## Task 2: Remove PII/debug console.log from registration flows
- **Status**: `completed`
- **Priority**: high
- **Depends On**: None
- **Description**:
  - Removed 3 `console.log` statements in `CooperativeRegistrationClient.tsx` (registration payload, doc ID, "Saving..." message).
  - Removed `console.log("Form submitted:", formData)` in `components/cooperative/RegistrationForm.tsx`.
- **Acceptance Criteria Addressed**: AC-2
- **Test Requirements**:
  - `rule` TR-2.1: Grep for `console\.(log|debug|info)` in `app/` and `components/` returns no matches.
  - `rule` TR-2.2: `npx tsc --noEmit` passes.
- **Completion Evidence**:
  - Grep: 0 matches in `app/` and `components/`.
  - `tsc --noEmit`: exit 0.

## Task 3: Fix admin authentication — create /admin/login and enforce server-side auth
- **Status**: `completed`
- **Priority**: high
- **Depends On**: None
- **Description**:
  - Added `createSessionCookie` and `verifySessionCookie` helpers to `firebase/admin.ts`.
  - Created `app/api/auth/session/route.ts` (POST: verifies ID token + admin claim, sets `__session` httpOnly cookie) and `app/api/auth/logout/route.ts`.
  - Created `app/admin/(auth)/login/page.tsx` — Firebase email/password sign-in that exchanges the ID token for a session cookie.
  - Restructured admin routes into route groups: `(auth)` (public login) and `(dashboard)` (auth-gated).
  - `app/admin/(dashboard)/layout.tsx` is a Server Component that verifies the `__session` cookie and `admin` custom claim; redirects to `/admin/login` if invalid.
- **Acceptance Criteria Addressed**: AC-3
- **Test Requirements**:
  - `rule` TR-3.1: `app/admin/(auth)/login/page.tsx` exists.
  - `rule` TR-3.2: Dashboard layout imports `verifySessionCookie`/`hasAdminClaim` and checks `__session`.
  - `rule` TR-3.3: `npm run build` passes.
- **Completion Evidence**:
  - Route exists at `app/admin/(auth)/login/page.tsx`.
  - `app/admin/(dashboard)/layout.tsx` calls `verifySessionCookie` + `hasAdminClaim`.
  - Build: exit 0; `/admin/login` prerendered, `/admin` dynamic.

## Task 4: Clean up placeholder statistics content on public pages
- **Status**: `completed`
- **Priority**: high
- **Depends On**: None
- **Description**:
  - Deleted `components/home/Statistics.tsx` (already removed from `app/page.tsx`).
- **Acceptance Criteria Addressed**: AC-4
- **Test Requirements**:
  - `rule` TR-4.1: `components/home/Statistics.tsx` deleted.
  - `rule` TR-4.2: Grep for `— — —` in `components/home/` returns nothing.
- **Completion Evidence**:
  - File deleted; grep returns 0 matches in `components/home/`.

## Task 5: Fix placeholder SEO metadata on public pages
- **Status**: `completed`
- **Priority**: medium
- **Depends On**: None
- **Description**:
  - Rewrote metadata descriptions for `/services`, `/services/export-promotion`, `/services/loan-grants`, `/services/permit-licensing` to remove "Coming Soon" wording while keeping descriptions accurate.
- **Acceptance Criteria Addressed**: AC-5
- **Test Requirements**:
  - `rule` TR-5.1: Grep for `description:.*Coming Soon` in `app/` returns nothing.
  - `rule` TR-5.2: `tsc --noEmit` passes.
- **Completion Evidence**:
  - Grep: 0 matches.
  - `tsc --noEmit`: exit 0.

## Task 6: Verify security headers and HTTPS enforcement
- **Status**: `completed`
- **Priority**: medium
- **Depends On**: None
- **Description**:
  - Confirmed `next.config.js` `headers()` and `middleware.ts` both emit: CSP (with `frame-ancestors 'none'`, `object-src 'none'`, `upgrade-insecure-requests`), HSTS `max-age=63072000; includeSubDomains; preload`, X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy.
  - Confirmed middleware performs HTTP→HTTPS 308 redirect in production.
  - No code changes required.
- **Acceptance Criteria Addressed**: AC-6
- **Test Requirements**:
  - `rule` TR-6.1, TR-6.2, TR-6.3: All headers present.
- **Completion Evidence**:
  - Source inspection of `next.config.js` and `middleware.ts` confirms all headers.

## Task 7: Run dependency audit
- **Status**: `completed`
- **Priority**: medium
- **Depends On**: None
- **Description**:
  - Ran `npm audit`.
- **Acceptance Criteria Addressed**: AC-7
- **Test Requirements**:
  - `rule` TR-7.1: `npm audit` exits 0.
- **Completion Evidence**:
  - `npm audit`: exit 0, no vulnerabilities.

## Task 8: Audit and enhance error pages
- **Status**: `completed`
- **Priority**: low
- **Depends On**: None
- **Description**:
  - Confirmed `app/not-found.tsx` and `app/error.tsx` are branded with ministry green/gold, no stack traces in production (`error.tsx` gates `console.error` to dev).
  - Added `role="alert"` and `aria-live="assertive"` to the error message in `app/error.tsx` for screen readers.
- **Acceptance Criteria Addressed**: AC-8
- **Test Requirements**:
  - `rubric` TR-8.1: Error page production safety.
- **Completion Evidence**:
  - Source inspection: no stack trace leakage; branded; `role="alert"` added.
  - Score: 5/5 (branded, no stack traces in prod, clear CTAs, accessible).

## Task 9: WCAG 2.1 AA quick-win audit
- **Status**: `completed`
- **Priority**: medium
- **Depends On**: None
- **Description**:
  - Verified skip link present in `app/layout.tsx`.
  - Verified semantic `<main id="main-content">`.
  - Verified `next/image` components carry `alt` attributes (e.g., News.tsx uses `alt={item.title}`).
  - Verified form inputs have labels (MUI TextField with `label` prop, e.g., admin login).
  - Verified admin login form uses `role="alert"` on error messages.
  - Heading hierarchy: pages use h1/h2/h3 appropriately; admin login uses h1.
- **Acceptance Criteria Addressed**: AC-9
- **Test Requirements**:
  - `rubric` TR-9.1: Accessibility baseline.
- **Completion Evidence**:
  - Source inspection of `app/layout.tsx`, `app/error.tsx`, `components/home/News.tsx`, `app/admin/(auth)/login/page.tsx`.
  - Score: 4/5 (skip link, alt text, labels, semantic main, focus via MUI defaults; full keyboard/contrast testing requires browser).

## Task 10: Final validation
- **Status**: `completed`
- **Priority**: high
- **Depends On**: Task 1-9
- **Description**:
  - Ran `tsc --noEmit`, `npm run build`, `npm audit`, `npm run lint`.
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-7
- **Test Requirements**:
  - `rule` TR-10.1: `npm run build` exits 0.
  - `rule` TR-10.2: `npx tsc --noEmit` exits 0.
  - `rule` TR-10.3: `npm audit` exits 0.
  - `rule` TR-10.4: `npm run lint` — ESLint not configured in project.
- **Completion Evidence**:
  - `npm run build`: exit 0, 48 pages.
  - `tsc --noEmit`: exit 0.
  - `npm audit`: exit 0, 0 vulns.
  - `npm run lint`: NOT VERIFIED — ESLint not configured (interactive setup prompt).
