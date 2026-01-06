# Cuse Student Deals

Every legit student discount in Syracuse — verified, local, and updated.

A student discount directory for Syracuse University students, aggregating local business discounts and national student offers into a single, searchable platform.

## Features

- **Browse by Category**: Food & Drink, Retail, Entertainment, Services, Online
- **Search**: Find deals by business name, description, or category
- **Verification Badges**: See when each deal was last verified
- **SEO Optimized**: Each deal has its own page for long-tail search ranking
- **Mobile-First**: Responsive design optimized for student traffic
- **Deal Submissions**: Students and businesses can submit new deals

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/syr-student-directory.git
cd syr-student-directory

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Supabase (required for production)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Optional
GOOGLE_ADSENSE_ID=your_adsense_id
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home page
│   ├── categories/[slug]/  # Category listing pages
│   ├── deals/[slug]/       # Individual deal pages
│   ├── submit/             # Deal submission form
│   ├── about/              # About page
│   ├── advertise/          # Business information
│   └── api/                # API routes
├── components/             # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── DealCard.tsx
│   ├── CategoryCard.tsx
│   ├── SearchBar.tsx
│   └── VerificationBadge.tsx
├── lib/                    # Utilities and data
│   ├── data.ts             # Mock data (replace with Supabase)
│   └── utils.ts            # Helper functions
└── types/                  # TypeScript types
    └── database.ts
```

## Database Setup

Run the migration in `supabase/migrations/001_initial_schema.sql` to set up:

- Categories table
- Businesses table
- Deals table
- Submissions table
- Row Level Security policies
- Full-text search indexes

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy

### Manual

```bash
npm run build
npm run start
```

## Roadmap

- [ ] Connect to Supabase for production data
- [ ] Add Google Maps integration for business locations
- [ ] Implement email notifications for new submissions
- [ ] Add Google AdSense integration
- [ ] Create admin dashboard for managing deals
- [ ] Add user authentication for saved deals
- [ ] Implement email newsletter signup

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details
