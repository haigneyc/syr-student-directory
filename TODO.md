# Development TODO

## Database Integration

### Supabase Client Setup (New API Key System - 2025+)
- [x] Create Supabase client library (`src/lib/supabase.ts`) using new key format
- [x] Configure client with `sb_publishable_` key for browser-safe operations
- [x] Configure server client with `sb_secret_` key for API routes (never expose in browser)
- [x] Update authorization approach (new keys are NOT JWTs - don't use Authorization header)
- [ ] Test that secret key returns 401 when accidentally used client-side (security validation)

### Data Layer
- [x] Replace mock data functions with Supabase queries
- [ ] Add real-time subscription for new deals
- [ ] Implement server-side data fetching with caching
- [ ] Add connection pooling for production (Supabase connection limits)

## Features
- [ ] Add Google Maps embed to deal pages
- [ ] Implement deal expiration handling
- [ ] Add "Save Deal" functionality (requires auth)
- [ ] Create email notification system for submissions
- [x] Add deal sharing buttons (Twitter, Facebook, copy link)
- [ ] Implement "Report Issue" functionality on deal pages

## Search & Discovery
- [ ] Implement full-text search with Supabase
- [x] Add search filters (category, discount type, verified only)
- [x] Create sitemap.xml for SEO
- [x] Add robots.txt configuration
- [x] Implement OpenGraph images for social sharing

## Admin Features
- [ ] Create admin authentication
- [ ] Build admin dashboard for managing deals
- [ ] Add deal approval workflow for submissions
- [ ] Create bulk deal import/export
- [ ] Add analytics dashboard (views, clicks, conversions)

## Monetization
- [ ] Integrate Google AdSense
- [ ] Add affiliate link tracking
- [ ] Create Stripe integration for featured listings
- [ ] Build business dashboard for paid listings

## Email & Marketing
- [ ] Set up email service (Resend, SendGrid, or similar)
- [ ] Create welcome email for submissions
- [ ] Build weekly deals newsletter
- [ ] Add email signup form to footer

## Performance & Quality
- [x] Add loading skeletons for better UX
- [ ] Implement image optimization for business logos
- [x] Add error boundaries and fallback UI
- [ ] Set up error tracking (Sentry)
- [ ] Add unit tests for utility functions
- [ ] Add E2E tests for critical paths (Playwright)

## Mobile Experience
- [x] Add PWA manifest for "Add to Home Screen"
- [ ] Implement service worker for offline support
- [ ] Add pull-to-refresh on mobile

## Content
- [ ] Gather 50+ real Syracuse student discounts
- [ ] Create business logo assets
- [ ] Write SEO-optimized category descriptions
- [ ] Add FAQ page
- [ ] Create privacy policy and terms of service

## Analytics & Tracking
- [x] Add Google Analytics integration
