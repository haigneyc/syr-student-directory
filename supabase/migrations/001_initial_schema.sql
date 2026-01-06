-- Syracuse Student Directory - Initial Schema
-- Run this migration in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Businesses table
CREATE TABLE IF NOT EXISTS businesses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  address TEXT,
  latitude DECIMAL(10, 7),
  longitude DECIMAL(10, 7),
  phone TEXT,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Deals table
CREATE TYPE discount_type AS ENUM ('percentage', 'fixed', 'bogo', 'special');
CREATE TYPE redemption_method AS ENUM ('show_id', 'online_code', 'app');
CREATE TYPE deal_status AS ENUM ('active', 'pending', 'expired');

CREATE TABLE IF NOT EXISTS deals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  discount_type discount_type NOT NULL,
  discount_value TEXT NOT NULL,
  conditions TEXT,
  redemption_method redemption_method NOT NULL DEFAULT 'show_id',
  code TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  verified_at TIMESTAMP WITH TIME ZONE,
  is_featured BOOLEAN DEFAULT FALSE,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status deal_status DEFAULT 'pending'
);

-- Submissions table
CREATE TYPE submission_source AS ENUM ('student', 'business');
CREATE TYPE submission_status AS ENUM ('pending', 'approved', 'rejected');

CREATE TABLE IF NOT EXISTS submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  submitter_email TEXT NOT NULL,
  business_name TEXT NOT NULL,
  deal_description TEXT NOT NULL,
  category TEXT,
  address TEXT,
  phone TEXT,
  website TEXT,
  source submission_source DEFAULT 'student',
  status submission_status DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_deals_category ON deals(category_id);
CREATE INDEX IF NOT EXISTS idx_deals_business ON deals(business_id);
CREATE INDEX IF NOT EXISTS idx_deals_status ON deals(status);
CREATE INDEX IF NOT EXISTS idx_deals_featured ON deals(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_deals_slug ON deals(slug);
CREATE INDEX IF NOT EXISTS idx_businesses_slug ON businesses(slug);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

-- Full-text search index on deals
CREATE INDEX IF NOT EXISTS idx_deals_search ON deals USING gin(
  to_tsvector('english', title || ' ' || description)
);

-- Row Level Security (RLS) policies
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Public read access for categories, businesses, and active deals
CREATE POLICY "Categories are viewable by everyone" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Businesses are viewable by everyone" ON businesses
  FOR SELECT USING (true);

CREATE POLICY "Active deals are viewable by everyone" ON deals
  FOR SELECT USING (status = 'active');

-- Submissions can be created by anyone (anon)
CREATE POLICY "Anyone can submit a deal" ON submissions
  FOR INSERT WITH CHECK (true);

-- Seed data for categories
INSERT INTO categories (name, slug, icon, description) VALUES
  ('Food & Drink', 'food', '🍕', 'Restaurants, cafes, and food delivery discounts'),
  ('Retail', 'retail', '🛍️', 'Clothing, electronics, and shopping deals'),
  ('Entertainment', 'entertainment', '🎬', 'Movies, events, and recreational activities'),
  ('Services', 'services', '✂️', 'Haircuts, gyms, phone repair, and more'),
  ('Online', 'online', '💻', 'Software, streaming, and digital subscriptions')
ON CONFLICT (slug) DO NOTHING;
