# Development TODO

> **Progress: ~95% to production-ready launch**
>
> Organized by launch phases to prevent "gold-plating" before launch.

---

## Phase 1: Foundations (Launch-Blocking)

### Supabase Client Setup (New API Key System - 2025+)
- [x] Create Supabase client library (`src/lib/supabase.ts`) using new key format
- [x] Configure client with `sb_publishable_` key for browser-safe operations
- [x] Configure server client with `sb_secret_` key for API routes (never expose in browser)
- [x] Update authorization approach (new keys are NOT JWTs - don't use Authorization header)
- [x] Test that secret key returns 401 when accidentally used client-side (security validation)
- [x] Enable RLS (Row Level Security) on all public tables (included in 001_initial_schema.sql)

### Data Layer
- [x] Replace mock data functions with Supabase queries
- [x] Implement server-side data fetching with caching

### Core Infrastructure
- [x] Create sitemap.xml for SEO
- [x] Add robots.txt configuration
- [x] Add PWA manifest for "Add to Home Screen"
- [x] Implement service worker for offline support

---

## Phase 2: Content & Trust (Launch-Blocking)

> Students are extremely sensitive to scammy coupon sites. This differentiates you immediately.

### Trust & Credibility (Critical for Students)
- [x] Add "How We Verify Deals" page explaining verification process
- [x] Display "Last verified" timestamp prominently on each deal
- [x] Add "Report Issue" functionality on deal pages (report expired/incorrect deals)
- [x] Add contact email clearly in footer
- [x] Enhance About page with:
  - Who runs the site
  - Why it exists (mission)
  - Why students should trust it
  - Disclaimer: Not affiliated with Syracuse University

### Content Quality
- [x] Write SEO-optimized category descriptions
- [x] Add FAQ page
- [x] Create privacy policy and terms of service
- [ ] Seed 30-40 high-quality local deals (minimum for launch)
- [ ] Identify "evergreen" vs "seasonal" deals
- [ ] Tag deals by proximity to campus

### Deal Management
- [x] Implement deal expiration handling
- [x] Add Google Maps embed to deal pages
- [x] Add deal sharing buttons (Twitter, Facebook, copy link)

### Business Submission Form (Improved) ✅

> Upgraded to a trust-building, low-friction form that captures structured data and seeds monetization.

- [x] **Redesign `/submit` page for business submissions**
  - [x] Header with value proposition and benefits
  - [x] Section 1: Business Information (name, website, address, contact)
  - [x] Section 2: Student Discount Details (description, eligibility, redemption, availability)
  - [x] Section 3: Terms & Verification (restrictions, dates, expiration)
  - [x] Section 4: Listing Enhancements (featured interest, notifications)
  - [x] Section 5: Confirmation & Permission
  - [x] Post-submit thank you message with 3-5 day timeline

- [x] **Add Supabase schema** (`002_enhanced_submissions.sql`)

- [x] **Update API route** `/api/submissions` to handle new fields

---

## Phase 3: Traffic & SEO (Post-Launch Week 1)

### SEO Foundations
- [x] Implement OpenGraph images for social sharing
- [x] Ensure canonical URLs on all deal and category pages
- [x] Add structured data (LocalBusiness / Offer / BreadcrumbList schema)
- [ ] Verify mobile Lighthouse score > 85
- [ ] Submit sitemap to Google Search Console

### Analytics & Measurement
- [x] Add Google Analytics integration
- [x] Define and implement conversion events:
  - [x] Deal view (view deal details)
  - [x] Affiliate outbound click
  - [x] Business submission started/completed
  - [x] Newsletter signup
- [ ] Track top categories by pageviews (via GA)
- [ ] Track top referring pages (via GA)
- [ ] Create baseline metrics document (Day 0 snapshot)

### Search & Discovery
- [x] Implement full-text search with Supabase
- [x] Add search filters (category, discount type, verified only)

---

## Phase 4: Monetization (Week 2+)

### Advertising
- [x] Integrate Google AdSense
- [x] Delay AdSense load until user interaction (future-proofing for consent)

### Affiliate Revenue
- [x] Add affiliate link tracking
- [x] Add inline affiliate disclosure near affiliate links (FTC compliance)

### Premium Listings (Stripe)
- [ ] Create Stripe integration for featured listings
- [ ] Build checkout flow for businesses
- [ ] Add manual override to comp featured listings (admin tool)
- [ ] Implement cancellation/refund flow for businesses
- [ ] Build business dashboard for paid listings

---

## Phase 5: Scale & Operations (Month 2+)

### Admin & Moderation Workflow
- [ ] Create admin authentication
- [ ] Build admin UI to:
  - [ ] Approve/reject submitted deals
  - [ ] Mark deals as verified (with timestamp)
  - [ ] Deactivate expired deals
- [ ] Add bulk verification workflow (per semester)
- [ ] Add simple audit log for changes (timestamp + action)
- [x] Rate limit admin endpoints
- [x] Log admin API usage
- [x] Create bulk deal import/export

### Transactional Email (Resend)
> For submission confirmations, admin notifications, and service emails.

- [x] Sign up for Resend account
- [x] Verify domain in Resend
- [x] Create Resend API integration (`src/lib/resend.ts`)
- [x] **Build Now:**
  - [x] Business submission confirmation email
  - [x] Admin notification on new deal submission
  - [ ] Future: "Deal approved" notification to business
- [x] Add email templates (simple, plain-text-friendly)

### Marketing Email (Beehiiv)
> For weekly deals newsletter and student engagement. Handles list management, unsubscribe, compliance.

- [x] Sign up for Beehiiv account
- [x] Configure Beehiiv publication settings
- [x] Connect newsletter signup form to Beehiiv API (`src/lib/beehiiv.ts`, `/api/newsletter`)
- [ ] **Email Lists (keep simple, 2 lists only):**
  - [x] Students/Users list (footer signup via Beehiiv API)
  - [ ] Businesses list (from deal submissions, outreach)
- [ ] **Weekly Deals Newsletter:**
  - [ ] Create repeatable template (Featured, Food, Entertainment sections)
  - [ ] Set up weekly schedule (15-min to write)
- [ ] Welcome email after signup (automated in Beehiiv)
- [x] Add email signup form to footer

### Email Compliance (Don't Skip)
- [ ] Every marketing email has unsubscribe link (Beehiiv handles)
- [ ] Physical mailing address in marketing emails (Beehiiv handles)
- [ ] Transactional emails are service-related only (no marketing content)

### DO NOT Build Yet (Post-Traction)
> Only after 500+ subscribers and 20-30 active listings:
- Drip campaigns / multi-step funnels
- Referral programs
- Complex segmentation
- Sponsored newsletter slots
- Welcome Week email sequences
- Business performance summaries

### Advanced Features
- [ ] Add "Save Deal" functionality (requires auth)
- [ ] Create email notification system for submissions
- [ ] Add real-time subscription for new deals
- [ ] Add connection pooling for production (Supabase connection limits)

### Performance & Quality
- [x] Add loading skeletons for better UX
- [x] Implement image optimization for business logos
- [x] Add error boundaries and fallback UI
- [x] Set up error tracking (Sentry)
- [x] Add unit tests for utility functions
- [x] Add E2E tests for critical paths (Playwright)
- [x] Add pull-to-refresh on mobile

### Backup & Recovery
- [ ] Enable Supabase automated backups
- [x] Document recovery procedure (RECOVERY.md)
- [x] Export schema snapshot to repository (supabase/schema_snapshot.sql)

---

## Content Backlog

> Manual tasks - not code-related

- [ ] Gather 50+ real Syracuse student discounts
- [ ] Create business logo assets
- [ ] Research Marshall Street businesses
- [ ] Research Westcott Street businesses
- [ ] Add national student discounts (Spotify, Amazon Prime, Apple Music, etc.)

---

## Completed Sections

### Mobile Experience ✅
- [x] Add PWA manifest for "Add to Home Screen"
- [x] Implement service worker for offline support
- [x] Add pull-to-refresh on mobile

### Supabase Client Setup ✅
- [x] All 5 items completed

---

## Launch Checklist (Quick Reference)

Before announcing publicly:

1. [ ] 30+ quality deals seeded
2. [x] Trust pages complete (About, How We Verify, Contact)
3. [ ] Sitemap submitted to Search Console
4. [x] Analytics events firing (deal view, affiliate click, submission, newsletter)
5. [ ] Mobile Lighthouse > 85
6. [ ] SSL certificate active
7. [x] Error monitoring enabled (Sentry)
