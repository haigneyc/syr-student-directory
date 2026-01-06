# User Setup Tasks

> Non-code tasks that need to be completed to launch the site.
>
> **Organized by launch phases** to prevent "gold-plating" before launch.

---

# Phase 1: Foundations (Blocking)

## 1. Domain Registration

- [x] **Choose a domain name**
  - `orangediscounts.com` chosen

- [x] **Purchase the domain** (~$12/year for .com)

- [x] **Configure DNS** (done during Vercel deployment)

---

## 2. Supabase Setup

### Create Account & Project

- [x] Go to [supabase.com](https://supabase.com) and sign up (free tier available)

- [x] Click "New Project" and configure:
  - **Name**: `syr-student-directory`
  - **Database Password**: Generate a strong password and save it securely
  - **Region**: Choose closest to Syracuse (e.g., `us-east-1`)

- [x] Wait for project to initialize (~2 minutes)

### Run Database Migration

- [x] In Supabase dashboard, go to **SQL Editor**

- [x] Click "New Query"

- [x] Copy the contents of `supabase/migrations/001_initial_schema.sql` and paste it

- [x] Click "Run" to create all tables

- [x] Verify tables were created in **Table Editor**

### Security Configuration

- [x] **Enable RLS (Row Level Security)** on all public tables
  - RLS is already enabled via `001_initial_schema.sql` migration
  - Read policies for public access are configured
  - Write policies for admin operations use service role key

### Get API Keys (New System - 2025+)

> **Note**: Supabase has transitioned to a new API key system. New projects have both
> legacy keys (JWT-based) and new keys. The new system offers instant revocation and
> better security. Legacy keys will be removed in late 2026.

- [x] Go to **Settings** → **API**

- [x] Locate your **new-format keys** (recommended):
  ```
  Project URL:        https://umyibzadoyplottcyurb.supabase.co
  Publishable key:    sb_publishable_xxxxxxxxxxxx  (safe for client-side)
  Secret key:         sb_secret_xxxxxxxxxxxx       (server-side only!)
  ```

- [x] **Important security notes for new keys**:
  - Publishable keys (`sb_publishable_...`) are safe to expose in browser code
  - Secret keys (`sb_secret_...`) will return HTTP 401 if used in browsers (security feature)
  - Secret keys can be instantly revoked by deleting them in the dashboard
  - New keys are NOT JWTs - they use a different authorization mechanism

- [x] Create `.env.local` file in project root:
  ```env
  NEXT_PUBLIC_SUPABASE_URL=https://umyibzadoyplottcyurb.supabase.co
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxxxxxxxxx
  SUPABASE_SECRET_KEY=sb_secret_xxxxxxxxxxxx
  ```

### Backup Configuration

- [ ] **Enable automated backups** in Supabase dashboard
  - Go to **Settings** → **Database** → **Backups**
  - Enable Point-in-Time Recovery (PITR) if on Pro plan
  - Or ensure daily backups are enabled (free tier)

- [x] **Document recovery procedure** in RECOVERY.md file

- [x] **Export schema snapshot** to repository (`supabase/schema_snapshot.sql`)

<details>
<summary>Using Legacy Keys (not recommended for new projects)</summary>

If you need to use the legacy JWT-based keys temporarily:
```env
NEXT_PUBLIC_SUPABASE_URL=https://umyibzadoyplottcyurb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Legacy keys will be deprecated by late 2026. Plan to migrate to new keys.
</details>

---

## 3. Vercel Deployment

### Create Account & Deploy

- [x] Go to [vercel.com](https://vercel.com) and sign up with GitHub

- [x] Click "Add New Project"

- [x] Import your GitHub repository

- [x] Add environment variables:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
  - `SUPABASE_SECRET_KEY`

- [x] Click "Deploy"

### Configure Domain

- [x] After deployment, go to **Settings** → **Domains**

- [x] Add your custom domain

- [x] Follow Vercel's instructions to update DNS records:
  - Add `A` record pointing to `76.76.21.21`
  - Add `CNAME` record for `www` pointing to `cname.vercel-dns.com`

- [x] Wait for SSL certificate (automatic, ~10 minutes)

### Domain Redirects

- [ ] **Enforce HTTPS redirect** (Vercel does this by default, verify in settings)

- [ ] **Configure www redirect**:
  - Go to **Settings** → **Domains**
  - Set up redirect from `www.orangediscounts.com` → `orangediscounts.com` (or vice versa)
  - Choose one canonical domain and stick with it

---

# Phase 2: Content & Trust (Launch-Blocking)

## 4. Trust & Credibility Content

> **Critical**: Students are extremely sensitive to scammy coupon sites.

### Create Trust Pages

- [x] **Update About page** with:
  - Who runs the site (name/team, Syracuse connection)
  - Why it exists (mission to help students save money)
  - Why students should trust it (verification process, no fake deals)
  - Clear disclaimer: "Not affiliated with Syracuse University"

- [x] **Create "How We Verify Deals" page** explaining:
  - How deals are submitted
  - How deals are verified (visited in person, called business, etc.)
  - How often deals are re-verified
  - How to report incorrect/expired deals

- [x] **Add contact email to footer**: `syracuse.automation@gmail.com`

### Legal Pages

- [x] Privacy Policy (created)
- [x] Terms of Service (created)
- [x] **Add affiliate disclosure** (FTC requirement):
  - Inline disclosure on affiliate links with tooltip
  - "ad" label with info icon next to affiliate links

- [ ] **Add cookie consent banner** (lightweight, for future-proofing)

---

## 5. Initial Content Collection

> **Goal**: Seed 30-40 high-quality deals before launch

### Research Local Discounts

- [ ] Visit Marshall Street businesses and ask about student discounts:
  - Restaurants (Varsity, Faegan's, King David's, etc.)
  - Retail stores
  - Salons/barbers

- [ ] Check Westcott Street businesses

- [ ] Search Reddit threads:
  - [r/SyracuseU](https://reddit.com/r/SyracuseU)
  - [r/Syracuse](https://reddit.com/r/Syracuse)

- [ ] Review Syracuse.com articles about student deals

- [ ] Check Syracuse University official resources

### Deal Categorization

- [ ] **Tag deals as "evergreen" vs "seasonal"**:
  - Evergreen: Always available (Spotify, gym memberships)
  - Seasonal: Limited time (back-to-school, finals week)

- [ ] **Tag deals by proximity to campus**:
  - On-campus
  - Walking distance (< 10 min)
  - Needs transportation

### National Student Discounts to Add

- [ ] Spotify Premium Student ($5.99/mo)
- [ ] Amazon Prime Student (6 months free)
- [ ] Apple Music Student ($5.99/mo)
- [ ] Adobe Creative Cloud (60% off)
- [ ] Microsoft 365 (free for students)
- [ ] GitHub Student Developer Pack (free)
- [ ] Notion (free for students)
- [ ] Figma (free for students)
- [ ] Headspace (free for students)
- [ ] The New York Times (free/discounted)

---

# Phase 3: Traffic & SEO (Post-Launch Week 1)

## 6. Google Services

### Google Analytics

- [x] Go to [analytics.google.com](https://analytics.google.com)

- [x] Create a new property for your domain

- [x] Get your Measurement ID (starts with `G-`)

- [x] Add to environment variables:
  ```env
  NEXT_PUBLIC_GA_MEASUREMENT_ID=G-FGZJKQVVZ4
  ```

### Google Search Console

- [x] Go to [search.google.com/search-console](https://search.google.com/search-console)

- [x] Add your property (domain)

- [x] Verify ownership via DNS TXT record:
  ```
  google-site-verification=o9iQ_GCfsWW72FIuRHkcU0Mkrd_xfJ9UopItEHn9XZw
  ```

- [ ] **Submit your sitemap**: `https://orangediscounts.com/sitemap.xml`

- [ ] **Request indexing** for key pages (homepage, category pages)

### Analytics Hygiene

- [ ] **Create baseline metrics document** (Day 0):
  - Current page count
  - Current deal count
  - Initial traffic (will be 0)
  - Screenshot of Search Console

- [ ] **Define conversion events** to track:
  - Deal view (click into deal page)
  - Affiliate link click
  - Deal submission started
  - Newsletter signup

---

# Phase 4: Monetization (Week 2+)

## 7. Google AdSense

- [x] Go to [adsense.google.com](https://adsense.google.com)

- [x] Sign up and add your site

- [x] Wait for approval (can take 1-2 weeks)

- [x] Once approved, get your Publisher ID

- [x] Add to environment variables:
  ```env
  NEXT_PUBLIC_GOOGLE_ADSENSE_ID=ca-pub-XXXXXXXXXX
  ```

---

## 8. Affiliate Programs

### Amazon Associates

- [x] Sign up at [affiliate-program.amazon.com](https://affiliate-program.amazon.com)
- [x] Get your Associate Tag: `orangediscoun-20`
- [x] Add to environment variables:
  ```env
  NEXT_PUBLIC_AMAZON_AFFILIATE_TAG=orangediscoun-20
  ```

### Other Affiliate Programs (Optional)

- [ ] Spotify has limited affiliate options - check current programs

---

## 9. Stripe Setup (For Featured Listings)

> Required for businesses to pay for featured listing placements

- [x] Go to [stripe.com](https://stripe.com) and create an account

- [x] Get your API keys from **Developers** → **API Keys**:
  - Publishable key: `pk_live_...` or `pk_test_...`
  - Secret key: `sk_live_...` or `sk_test_...`

- [ ] Create a Product for "Featured Listing" in **Products**:
  - Set pricing (e.g., $29/month or $249/year)
  - Note the Price ID: `price_...`

- [ ] Set up Webhook endpoint:
  - URL: `https://orangediscounts.com/api/webhooks/stripe`
  - Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
  - Get webhook signing secret: `whsec_...`

- [ ] **Plan for manual overrides**:
  - Create process to comp featured listings for early partners
  - Document in admin procedures

- [ ] **Plan for cancellations**:
  - What happens when a business cancels?
  - Grace period? Immediate removal?

- [x] Add to environment variables:
  ```env
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxx
  STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxx
  STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxx
  STRIPE_FEATURED_PRICE_ID=price_xxxxxxxxxxxx
  ```

---

# Phase 5: Scale & Operations (Month 2+)

## 10. Email Setup

> **Strategy**: Use Resend for transactional email (reliable, developer-friendly) and Beehiiv for marketing/newsletter (handles compliance, list management).

### For Business Email

- [x] Set up email
  - `syrAIcuse.automation@gmail.com`

### Transactional Email (Resend)

> Use for: submission confirmations, admin notifications, "deal approved" emails.
> Why Resend: Excellent DX, simple API, no bloat, perfect for Next.js.

- [x] Sign up for [Resend](https://resend.com) (free tier: 3,000 emails/month)

- [x] **Verify your domain** in Resend dashboard:
  - Go to **Domains** → **Add Domain**
  - Add DNS records (SPF, DKIM, DMARC)
  - Wait for verification (~5-10 minutes)

- [x] Get API key and add to environment variables:
  ```env
  RESEND_API_KEY=re_XXXXXXXXXX
  ```

- [ ] **Emails to Build (Phase 1 - just one to start):**

  **Business Submission Confirmation** (send immediately after submission):
  - Thank them for submitting
  - Confirm receipt of their deal
  - Set timeline: "We verify within 3–5 business days"
  - Include contact email for questions

  **Admin Notification** (send to you on new submission):
  - Business name, contact info
  - Deal details
  - Link to review in admin

### Marketing Email (Beehiiv)

> Use for: weekly deals newsletter, student engagement.
> Why Beehiiv: Strong discovery, referral features, handles compliance automatically.

- [x] Sign up for [Beehiiv](https://beehiiv.com) (free tier available)

- [x] **Configure publication settings:**
  - Publication name: "Syracuse Student Deals"
  - From email: Use Beehiiv's sending or connect custom domain
  - Add physical mailing address (required for CAN-SPAM)

- [ ] **Set up email lists** (keep it simple - 2 lists only):

  **1. Students / Users List**
  - Source: Footer signup, optional checkbox on deal submission
  - Purpose: Weekly deals, seasonal announcements (Welcome Week, Finals)

  **2. Businesses List**
  - Source: Deal submission form, outreach responses
  - Purpose: Listing confirmations, traffic updates, featured listing upsells
  - **Keep separate from student list**

- [x] **Connect signup forms:**
  - Get Beehiiv API key from **Settings** → **API**
  - Update footer signup to POST to Beehiiv API
  - Add to environment variables:
    ```env
    BEEHIIV_API_KEY=xxxxxxxxxxxx
    BEEHIIV_PUBLICATION_ID=pub_xxxxxxxxxxxx
    ```

- [ ] **Create welcome email** (automated on signup):
  - Thank them for subscribing
  - Set expectations (weekly emails)
  - Maybe include 2-3 top deals

- [ ] **Weekly Deals Newsletter Template** (repeatable, 15 min to write):
  ```
  Subject: This Week's Best Student Deals in Syracuse

  [1-2 line intro]

  🔥 Featured Deals
  - Business – Deal
  - Business – Deal

  🍔 Food & Coffee
  - Deal
  - Deal

  🎬 Entertainment / Services
  - Deal

  Submit a deal → [link]
  ```

### Email Compliance Checklist

> Even early on, do this right to stay out of spam trouble.

- [ ] **Marketing emails must include:**
  - Unsubscribe link (Beehiiv handles automatically)
  - Physical mailing address (Beehiiv handles automatically)

- [ ] **Transactional emails should:**
  - Not include marketing content
  - Be clearly service-related (confirmations, notifications)
  - Include business name and what triggered the email

### DO NOT Build Yet

> Only after 500+ student subscribers and 20-30 active listings:

- ❌ Drip campaigns / multi-step funnels
- ❌ Referral programs
- ❌ Complex segmentation
- ❌ Sponsored newsletter slots
- ❌ Welcome Week email sequences
- ❌ Business performance summaries

---

## 11. Error Tracking with Sentry

> Recommended for production error monitoring

- [x] Go to [sentry.io](https://sentry.io) and create an account (free tier available)

- [x] Create a new project:
  - Platform: **Next.js**
  - Name: `cuse-student-deals`

- [x] Get your DSN from **Settings** → **Client Keys (DSN)**

- [x] Add to environment variables:
  ```env
  NEXT_PUBLIC_SENTRY_DSN=https://xxxx@xxxx.ingest.sentry.io/xxxx
  SENTRY_AUTH_TOKEN=sntrys_xxxxxxxxxxxx
  ```

---

## 12. Admin API Key (For Bulk Import)

> Required to use the `/api/deals/import` endpoint

- [ ] Generate a secure random string for admin access:
  ```bash
  openssl rand -base64 32
  ```

- [ ] Add to environment variables:
  ```env
  ADMIN_API_KEY=your-secure-random-string
  ```

- [x] **Set up rate limiting** on admin endpoints (implemented in `src/lib/rate-limit.ts`)

- [x] **Enable logging** for admin API usage (implemented in `src/lib/admin-logger.ts`)
  - View logs via `GET /api/admin/logs` with admin key

- [ ] Use in API requests:
  ```bash
  curl -X POST https://orangediscounts.com/api/deals/import \
    -H "Content-Type: application/json" \
    -H "x-admin-key: your-secure-random-string" \
    -d '{"deals": [...]}'
  ```

---

## 13. Social Media & Marketing

### Create Social Accounts

- [ ] Instagram: `@cusestudentdeals`
- [ ] Twitter/X: `@cusestudentdeals`
- [ ] TikTok: `@cusestudentdeals`

### Prepare Launch Content

- [ ] Create announcement post for launch
- [ ] Prepare graphics (Canva templates work well)
- [ ] Draft Reddit announcement (r/SyracuseU)
- [ ] Identify Syracuse student influencers to reach out to

### Business Outreach

- [ ] Create email template for businesses
- [ ] Prepare "Listed on Cuse Student Deals" badge graphic
- [ ] Make list of 20 businesses to contact first

---

# Quick Reference: All Environment Variables

```env
# Required - Supabase (New Key Format - 2025+)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxxxxxxxxx
SUPABASE_SECRET_KEY=sb_secret_xxxxxxxxxxxx

# Optional - Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Optional - Ads
NEXT_PUBLIC_GOOGLE_ADSENSE_ID=ca-pub-XXXXXXXXXX

# Optional - Email (Transactional - Resend)
RESEND_API_KEY=re_XXXXXXXXXX

# Optional - Email (Marketing - Beehiiv)
BEEHIIV_API_KEY=xxxxxxxxxxxx
BEEHIIV_PUBLICATION_ID=pub_xxxxxxxxxxxx

# Optional - Payments (Stripe)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxx
STRIPE_FEATURED_PRICE_ID=price_xxxxxxxxxxxx

# Optional - Error Tracking (Sentry)
NEXT_PUBLIC_SENTRY_DSN=https://xxxx@xxxx.ingest.sentry.io/xxxx
SENTRY_AUTH_TOKEN=sntrys_xxxxxxxxxxxx

# Optional - Admin Access
ADMIN_API_KEY=your-secure-random-string

# Optional - Affiliate Programs
NEXT_PUBLIC_AMAZON_AFFILIATE_TAG=orangediscoun-20
```

---

# Launch Checklist

**Before announcing publicly, verify:**

- [ ] SSL certificate active (green padlock)
- [ ] www redirect configured
- [ ] 30+ quality deals seeded
- [ ] Trust pages complete (About, How We Verify)
- [ ] Contact email visible in footer
- [ ] Sitemap submitted to Search Console
- [ ] Analytics tracking verified
- [ ] Mobile Lighthouse score > 85
- [ ] Error monitoring enabled
- [ ] Affiliate disclosures in place

---

# Key Format Reference

| Key Type | Prefix | Usage | Expose in Browser? |
|----------|--------|-------|-------------------|
| Publishable | `sb_publishable_` | Client-side, public APIs | Yes |
| Secret | `sb_secret_` | Server-side, admin operations | No (returns 401) |
| Legacy Anon | `eyJhbG...` (JWT) | Deprecated by late 2026 | Yes |
| Legacy Service | `eyJhbG...` (JWT) | Deprecated by late 2026 | No |
