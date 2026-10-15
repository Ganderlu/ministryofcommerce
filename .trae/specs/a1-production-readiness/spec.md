# A1 Production-Readiness Standardisation - Product Requirements Document

## Overview
- **Summary**: Audit and remediate the Anambra State Ministry of Commerce Next.js portal against State deployment standards (Section A1). Fix failing security, content, performance, SEO, error-handling, accessibility and build items without redesigning the site or removing working features.
- **Purpose**: Bring the portal to a production-safe, deployable state with no broken builds, no leaked secrets/PII, no fake official statistics, correct security headers, clean metadata, professional error pages, and WCAG 2.1 AA quick wins.
- **Target Users**: Ministry ICT/engineering team, State deployment auditors, end users (businesses, SMEs, MSMEs, cooperatives), admin staff.

## Goals
- Production build succeeds with zero TypeScript/lint errors.
- No secrets, credentials, or PII leaked to client or console output.
- Security headers (CSP, HSTS, HTTPS-only, X-Frame-Options, etc.) are present and non-broken.
- Demo/placeholder/fake-statistics content is either replaced with approved content or cleanly hidden.
- SEO metadata, canonical URLs, sitemap and robots are accurate and indexability is correct.
- Professional 404/error pages and safe form error handling exist.
- WCAG 2.1 AA quick wins (keyboard, focus, labels, contrast, alt text, headings) addressed.
- Honest validation evidence (audit, tsc, build, lint) with no false pass claims.

## Non-Goals
- Redesigning the visual layout or changing branding.
- Removing working registration features.
- Inventing official government statistics or credentials.
- Weakening Firestore security rules.
- Setting up a full test framework (only existing/available tests are run).

## Background & Context
- Tech stack: Next.js 14.2, TypeScript, React 18, MUI, Firebase (Auth, Firestore, Storage, Admin), Cloudinary, framer-motion, react-hook-form + zod.
- Existing architecture: App Router, Firebase client singleton at `firebase/clients.ts`, Admin SDK at `firebase/admin.ts`, route security helpers at `lib/route-security.ts`.
- Security headers already defined in both `next.config.js` and `middleware.ts`.
- Firestore rules already follow least-privilege (no client deletes, admin/sessionToken access).
- `package.json` overrides pin patched versions of undici, busboy, uuid, tar, protobufjs, source-map-js.
- Audit findings (pre-change):
  - **BUILD FAIL**: `app/privacy/page.tsx` and `app/terms/page.tsx` import `useEffect`/`useState` but are not marked `"use client"` → webpack build error.
  - **DEBUG/PII LEAK**: `app/services/cooperative-registration/register/CooperativeRegistrationClient.tsx` lines 216-218 `console.log` the registration payload (includes PII) and document ID. `components/cooperative/RegistrationForm.tsx:92` logs form data.
  - **ADMIN AUTH GAP**: `middleware.ts` redirects unauthenticated `/admin/*` to `/admin/login`, but **no `/admin/login` route exists**. Admin pages are all `"use client"` with no server-side ID-token verification; `verifyIdToken`/`hasAdminClaim` exist but are unused in the admin flow.
  - **PLACEHOLDER CONTENT**: `components/home/Statistics.tsx` renders "— — —" placeholder counts + "count unavailable" aria (already removed from `app/page.tsx` but file remains). Admin dashboard components (`StatisticsCards`, `BusinessStatistics`, `CooperativeStatistics`, `FooterStatistics`, `StatusChart`, `TopServicesTable`, `SystemAlerts`, `ApplicationsChart`, `RevenueChart`, `RecentApplications`) all render "— — —" / "Pending" placeholder data. Services landing page (`/services`) and `/services/export-promotion`, `/services/loan-grants`, `/services/permit-licensing` show "Coming Soon" placeholder copy.
  - **SEO**: `/services` metadata description = "Services page - Coming Soon".
  - **npm audit**: 0 vulnerabilities (exit 0).
  - **tsc --noEmit**: passes (exit 0).
  - **Images**: `next/image` remotePatterns are specific (no wildcard hostnames); images carry `alt`.
  - **A11y**: skip link, semantic `<main>`, alt text present.

## Functional Requirements
- **FR-1**: `npm run build` completes successfully.
- **FR-2**: No `console.log/debug/info` of PII, secrets, or registration payloads ships in production code.
- **FR-3**: Admin area enforces authentication server-side; the `/admin/login` destination either exists with a working sign-in or the middleware is corrected to a valid destination.
- **FR-4**: Fake/placeholder statistics and "Coming Soon" copy on public pages are hidden cleanly or replaced; no invented official government figures are shown.
- **FR-5**: Public pages have accurate, non-placeholder metadata and canonical URLs.
- **FR-6**: 404 and global-error pages render branded, safe content with no stack traces in production.

## Non-Functional Requirements
- **NFR-1**: Security headers (CSP, HSTS, X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy, frame-ancestors 'none', object-src 'none') are emitted on all responses.
- **NFR-2**: HTTPS enforced in production (308 redirect).
- **NFR-3**: Firebase Admin secrets never appear in client bundles (no `NEXT_PUBLIC_` prefix for admin keys).
- **NFR-4**: `/api/*` and `/admin/*` responses set `Cache-Control: private, no-store`.
- **NFR-5**: No dependency vulnerabilities at moderate or higher severity.
- **NFR-6**: WCAG 2.1 AA quick wins: keyboard-operable, visible focus, form labels, alt text, heading order, sufficient contrast.

## Constraints
- **Technical**: Next.js 14 App Router; MUI (no Tailwind); Firebase rules must not be weakened.
- **Business**: Do not invent official State statistics or claim State approval.
- **Dependencies**: Cannot modify `.env.local` secrets; must not commit live credentials.

## Assumptions
- `firebase/clients.ts` public config values are the intended Firebase web config (safe to expose).
- Admin login flow is expected to use Firebase Auth + custom `admin` claim; the missing `/admin/login` is a gap to fix.
- "Coming Soon" service pages are intentional placeholders awaiting Ministry content; we make them production-safe (clean metadata, no fake data) rather than inventing content.

## Acceptance Criteria

### AC-1: Production build succeeds
- **Type**: `rule`
- **Given**: A clean working tree with the fixes applied
- **When**: `npm run build` is executed
- **Then**: The build completes with exit code 0 and no webpack errors
- **Pass Condition**: Build exits 0; no "use client" / hook errors
- **Evidence**: `npm run build` terminal output

### AC-2: No PII/secret console output in production code
- **Type**: `rule`
- **Given**: The codebase after fixes
- **When**: Searching for `console.log`/`console.debug`/`console.info` in app/ and components/
- **Then**: No matches log registration payloads, document IDs, secrets, or PII; only safe `console.warn`/`console.error` for errors remain
- **Pass Condition**: Grep for payload/PII logging returns nothing
- **Evidence**: Grep output

### AC-3: Admin authentication destination is valid and enforced
- **Type**: `rule`
- **Given**: An unauthenticated request to `/admin`
- **When**: The middleware runs in production
- **Then**: The redirect target is an existing route and admin server components verify the Firebase ID token (admin claim) before rendering
- **Pass Condition**: `/admin/login` exists and renders a sign-in form, OR middleware redirects to a valid existing route; admin layout/page verifies token server-side
- **Evidence**: Route file exists; auth check present in admin layout

### AC-4: No fake official statistics on public pages
- **Type**: `rule`
- **Given**: The home page and public content pages
- **When**: Rendered
- **Then**: No "— — —" placeholder statistics or "pending publication" badges appear on public pages
- **Pass Condition**: Home page does not render the Statistics placeholder block
- **Evidence**: Home page render / source inspection

### AC-5: Public page metadata is accurate
- **Type**: `rule`
- **Given**: The `/services` page and other public pages
- **When**: Metadata is generated
- **Then**: Descriptions are not "Coming Soon" placeholders; canonical URLs are present
- **Pass Condition**: Grep for "Coming Soon" in metadata descriptions returns nothing
- **Evidence**: Grep output

### AC-6: Security headers present
- **Type**: `rule`
- **Given**: A production response from any route
- **When**: Headers are inspected
- **Then**: CSP, HSTS, X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy are present
- **Pass Condition**: `next.config.js` headers() and middleware both define the set
- **Evidence**: Source inspection of next.config.js / middleware.ts

### AC-7: No moderate+ dependency vulnerabilities
- **Type**: `rule`
- **Given**: Installed dependencies
- **When**: `npm audit` runs
- **Then**: Exit code 0 (no vulnerabilities at the configured level)
- **Pass Condition**: `npm audit` exits 0
- **Evidence**: `npm audit` output

### AC-8: Error pages are safe and branded
- **Type**: `rubric`
- **Dimension**: Production safety and brand consistency of 404/error pages
- **Scale**: 1-5
- **Anchors**: 1 = stack traces / unbranded; 3 = branded but leaks detail; 5 = branded, no stack traces in prod, clear CTAs
- **Pass Threshold**: >= 4
- **Evidence**: Source of `app/not-found.tsx`, `app/error.tsx`

### AC-9: WCAG 2.1 AA quick wins
- **Type**: `rubric`
- **Dimension**: Accessibility baseline coverage across the public site
- **Scale**: 1-5
- **Anchors**: 1 = missing skip link / alt text / focus; 3 = partial; 5 = skip link, visible focus, alt text on images, labeled form fields, heading hierarchy, keyboard operable
- **Pass Threshold**: >= 4
- **Evidence**: Source inspection of layout, forms, images

## Open Questions
- [ ] Should the admin `/admin/login` page use Firebase email/password sign-in with the existing `admin` custom claim, or is an external SSO expected? (Assume Firebase email/password + admin claim until told otherwise.)
- [ ] Should the "Coming Soon" service pages be kept (with clean metadata) or hidden from navigation/sitemap? (Assume keep with clean metadata.)
