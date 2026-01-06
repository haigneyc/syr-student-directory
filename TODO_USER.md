# User Setup Tasks

Non-code tasks that need to be completed to launch the site.

---

## 1. Domain Registration

- [x] **Choose a domain name**
  - `orangediscounts.com` chosen

- [x] **Purchase the domain** (~$12/year for .com)

- [ ] **Configure DNS** (will be done during Vercel deployment)

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

- [ ] Wait for SSL certificate (automatic, ~10 minutes)

---

## 4. Google Services

### Google Analytics (Optional)

- [x] Go to [analytics.google.com](https://analytics.google.com)

- [x] Create a new property for your domain

- [x] Get your Measurement ID (starts with `G-`)

- [x] Add to environment variables:
  ```env
  NEXT_PUBLIC_GA_MEASUREMENT_ID=G-FGZJKQVVZ4
  ```

  ```
  <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-FGZJKQVVZ4"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-FGZJKQVVZ4');
</script>
  ```

### Google AdSense

- [x] Go to [adsense.google.com](https://adsense.google.com)

- [x] Sign up and add your site

- [x] Wait for approval (can take 1-2 weeks)

- [x] Once approved, get your Publisher ID

- [x] Add to environment variables:
  ```env
  GOOGLE_ADSENSE_ID=ca-pub-XXXXXXXXXX
  ```

  ```
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2466524479356522"
     crossorigin="anonymous"></script>
  ```

### Google Search Console

- [x] Go to [search.google.com/search-console](https://search.google.com/search-console)

- [x] Add your property (domain)

- [ ] Verify ownership via DNS TXT record
```
google-site-verification=o9iQ_GCfsWW72FIuRHkcU0Mkrd_xfJ9UopItEHn9XZw
```

- [ ] Submit your sitemap: `https://yourdomain.com/sitemap.xml`

---

## 5. Content Collection

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

## 6. Social Media & Marketing

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

## 7. Legal

- [ ] Draft Privacy Policy (use a generator like [Termly](https://termly.io))
- [ ] Draft Terms of Service
- [ ] Add disclaimer about not being affiliated with Syracuse University
- [ ] Review affiliate disclosure requirements (FTC)

---

## 8. Email Setup (Optional)

### For Business Email

- [ ] Set up email with your domain (Google Workspace or Zoho free tier)
  - `hello@cusestudentdeals.com`
  - `advertise@cusestudentdeals.com`

### For Transactional Email

- [ ] Sign up for [Resend](https://resend.com) (free tier: 3,000 emails/month)
- [ ] Verify your domain
- [ ] Get API key and add to environment variables

---

## 9. Stripe Setup (For Featured Listings)

> Required for businesses to pay for featured listing placements

- [ ] Go to [stripe.com](https://stripe.com) and create an account

- [ ] Get your API keys from **Developers** → **API Keys**:
  - Publishable key: `pk_live_...` or `pk_test_...`
  - Secret key: `sk_live_...` or `sk_test_...`

- [ ] Create a Product for "Featured Listing" in **Products**:
  - Set pricing (e.g., $29/month or $249/year)
  - Note the Price ID: `price_...`

- [ ] Set up Webhook endpoint:
  - URL: `https://yourdomain.com/api/webhooks/stripe`
  - Events: `checkout.session.completed`, `customer.subscription.updated`
  - Get webhook signing secret: `whsec_...`

- [ ] Add to environment variables:
  ```env
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxx
  STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxx
  STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxx
  STRIPE_FEATURED_PRICE_ID=price_xxxxxxxxxxxx
  ```

---

## 10. Error Tracking with Sentry (Optional)

> Recommended for production error monitoring

- [ ] Go to [sentry.io](https://sentry.io) and create an account (free tier available)

- [ ] Create a new project:
  - Platform: **Next.js**
  - Name: `cuse-student-deals`

- [ ] Get your DSN from **Settings** → **Client Keys (DSN)**

- [ ] Add to environment variables:
  ```env
  NEXT_PUBLIC_SENTRY_DSN=https://xxxx@xxxx.ingest.sentry.io/xxxx
  SENTRY_AUTH_TOKEN=sntrys_xxxxxxxxxxxx
  ```

---

## 11. Admin API Key (For Bulk Import)

> Required to use the `/api/deals/import` endpoint

- [ ] Generate a secure random string for admin access:
  ```bash
  openssl rand -base64 32
  ```

- [ ] Add to environment variables:
  ```env
  ADMIN_API_KEY=your-secure-random-string
  ```

- [ ] Use in API requests:
  ```bash
  curl -X POST https://yourdomain.com/api/deals/import \
    -H "Content-Type: application/json" \
    -H "x-admin-key: your-secure-random-string" \
    -d '{"deals": [...]}'
  ```

---

## 12. Affiliate Program Setup (Optional)

> For earning commissions on referral links

### Amazon Associates

- [ ] Sign up at [affiliate-program.amazon.com](https://affiliate-program.amazon.com)
- [ ] Get your Associate Tag (e.g., `cusestudent-20`)
- [ ] Add to environment variables:
  ```env
  NEXT_PUBLIC_AMAZON_AFFILIATE_TAG=cusestudent-20
  ```

### Apple Affiliate Program

- [ ] Apply at [performance-partners.apple.com](https://performance-partners.apple.com)
- [ ] Get your affiliate token
- [ ] Add to environment variables:
  ```env
  NEXT_PUBLIC_APPLE_AFFILIATE_TOKEN=at_xxxxxxxxxxxx
  ```

---

## Quick Reference: All Environment Variables

```env
# Required - Supabase (New Key Format - 2025+)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxxxxxxxxx
SUPABASE_SECRET_KEY=sb_secret_xxxxxxxxxxxx

# Optional - Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Optional - Ads
NEXT_PUBLIC_GOOGLE_ADSENSE_ID=ca-pub-XXXXXXXXXX

# Optional - Email (Transactional)
RESEND_API_KEY=re_XXXXXXXXXX

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
NEXT_PUBLIC_AMAZON_AFFILIATE_TAG=cusestudent-20
NEXT_PUBLIC_APPLE_AFFILIATE_TOKEN=at_xxxxxxxxxxxx
NEXT_PUBLIC_SPOTIFY_REF=your-spotify-ref
```

### Key Format Reference

| Key Type | Prefix | Usage | Expose in Browser? |
|----------|--------|-------|-------------------|
| Publishable | `sb_publishable_` | Client-side, public APIs | Yes |
| Secret | `sb_secret_` | Server-side, admin operations | No (returns 401) |
| Legacy Anon | `eyJhbG...` (JWT) | Deprecated by late 2026 | Yes |
| Legacy Service | `eyJhbG...` (JWT) | Deprecated by late 2026 | No |
