# Development TODO

> **Progress: ~75% to production-ready launch**
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
- [ ] Enable RLS (Row Level Security) on all public tables

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
- [ ] Add "How We Verify Deals" page explaining verification process
- [ ] Display "Last verified" timestamp prominently on each deal
- [x] Add "Report Issue" functionality on deal pages (report expired/incorrect deals)
- [ ] Add contact email clearly in footer
- [ ] Enhance About page with:
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

---

## Phase 3: Traffic & SEO (Post-Launch Week 1)

### SEO Foundations
- [x] Implement OpenGraph images for social sharing
- [ ] Ensure canonical URLs on all deal pages
- [ ] Add structured data (LocalBusiness / Offer schema)
- [ ] Verify mobile Lighthouse score > 85
- [ ] Submit sitemap to Google Search Console

### Analytics & Measurement
- [x] Add Google Analytics integration
- [ ] Define and implement conversion events:
  - [ ] Deal click (view deal details)
  - [ ] Affiliate outbound click
  - [ ] Business submission started
  - [ ] Newsletter signup
- [ ] Track top categories by pageviews
- [ ] Track top referring pages
- [ ] Create baseline metrics document (Day 0 snapshot)

### Search & Discovery
- [ ] Implement full-text search with Supabase
- [x] Add search filters (category, discount type, verified only)

---

## Phase 4: Monetization (Week 2+)

### Advertising
- [x] Integrate Google AdSense
- [ ] Delay AdSense load until user interaction (future-proofing for consent)

### Affiliate Revenue
- [x] Add affiliate link tracking
- [ ] Add inline affiliate disclosure near affiliate links (FTC compliance)

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
- [ ] Rate limit admin endpoints
- [ ] Log admin API usage
- [x] Create bulk deal import/export

### Email & Marketing
- [ ] Set up email service (Resend, SendGrid, or similar)
- [ ] Create welcome email for submissions
- [ ] Build weekly deals newsletter
- [x] Add email signup form to footer

### Advanced Features
- [ ] Add "Save Deal" functionality (requires auth)
- [ ] Create email notification system for submissions
- [ ] Add real-time subscription for new deals
- [ ] Add connection pooling for production (Supabase connection limits)

### Performance & Quality
- [x] Add loading skeletons for better UX
- [x] Implement image optimization for business logos
- [x] Add error boundaries and fallback UI
- [ ] Set up error tracking (Sentry)
- [x] Add unit tests for utility functions
- [x] Add E2E tests for critical paths (Playwright)
- [x] Add pull-to-refresh on mobile

### Backup & Recovery
- [ ] Enable Supabase automated backups
- [ ] Document recovery procedure
- [ ] Export schema snapshot to repository

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
2. [ ] Trust pages complete (About, How We Verify, Contact)
3. [ ] Sitemap submitted to Search Console
4. [ ] Analytics events firing
5. [ ] Mobile Lighthouse > 85
6. [ ] SSL certificate active
7. [ ] Error monitoring enabled
