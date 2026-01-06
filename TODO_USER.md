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

- [ ] Click "Add New Project"

- [ ] Import your GitHub repository

- [ ] Add environment variables:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
  - `SUPABASE_SECRET_KEY`

- [ ] Click "Deploy"

### Configure Domain

- [ ] After deployment, go to **Settings** → **Domains**

- [ ] Add your custom domain

- [ ] Follow Vercel's instructions to update DNS records:
  - Add `A` record pointing to `76.76.21.21`
  - Add `CNAME` record for `www` pointing to `cname.vercel-dns.com`

- [ ] Wait for SSL certificate (automatic, ~10 minutes)

---

## 4. Google Services

### Google Analytics (Optional)

- [ ] Go to [analytics.google.com](https://analytics.google.com)

- [ ] Create a new property for your domain

- [ ] Get your Measurement ID (starts with `G-`)

- [ ] Add to environment variables:
  ```env
  NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
  ```

### Google AdSense

- [ ] Go to [adsense.google.com](https://adsense.google.com)

- [ ] Sign up and add your site

- [ ] Wait for approval (can take 1-2 weeks)

- [ ] Once approved, get your Publisher ID

- [ ] Add to environment variables:
  ```env
  GOOGLE_ADSENSE_ID=ca-pub-XXXXXXXXXX
  ```

### Google Search Console

- [ ] Go to [search.google.com/search-console](https://search.google.com/search-console)

- [ ] Add your property (domain)

- [ ] Verify ownership via DNS TXT record

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

## Quick Reference: All Environment Variables

```env
# Required - Supabase (New Key Format - 2025+)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxxxxxxxxx
SUPABASE_SECRET_KEY=sb_secret_xxxxxxxxxxxx

# Optional - Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Optional - Ads
GOOGLE_ADSENSE_ID=ca-pub-XXXXXXXXXX

# Optional - Email
RESEND_API_KEY=re_XXXXXXXXXX
```

### Key Format Reference

| Key Type | Prefix | Usage | Expose in Browser? |
|----------|--------|-------|-------------------|
| Publishable | `sb_publishable_` | Client-side, public APIs | Yes |
| Secret | `sb_secret_` | Server-side, admin operations | No (returns 401) |
| Legacy Anon | `eyJhbG...` (JWT) | Deprecated by late 2026 | Yes |
| Legacy Service | `eyJhbG...` (JWT) | Deprecated by late 2026 | No |
