-- ============================================================================
-- Syracuse Student Directory - Complete Schema Snapshot
-- Generated: 2026-01-06
--
-- This file represents the complete database schema after all migrations.
-- For reference and backup purposes only - do not run directly.
-- Instead, run migrations in order: 001 -> 002 -> 003
-- ============================================================================

-- ============================================================================
-- EXTENSIONS
-- ============================================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- CUSTOM TYPES
-- ============================================================================
CREATE TYPE discount_type AS ENUM ('percentage', 'fixed', 'bogo', 'special');
CREATE TYPE redemption_method AS ENUM ('show_id', 'online_code', 'app');
CREATE TYPE deal_status AS ENUM ('active', 'pending', 'expired');
CREATE TYPE submission_source AS ENUM ('student', 'business');
CREATE TYPE submission_status AS ENUM ('pending', 'approved', 'rejected');

-- ============================================================================
-- TABLES
-- ============================================================================

-- Categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Businesses table
CREATE TABLE businesses (
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
CREATE TABLE deals (
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
  status deal_status DEFAULT 'pending',
  -- Full-text search vector (added in 003_fulltext_search.sql)
  search_vector tsvector GENERATED ALWAYS AS (
    setweight(to_tsvector('english', COALESCE(title, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(discount_value, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(description, '')), 'C') ||
    setweight(to_tsvector('english', COALESCE(conditions, '')), 'C')
  ) STORED
);

-- Submissions table (enhanced in 002_enhanced_submissions.sql)
CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,  -- renamed from submitter_email
  business_name TEXT NOT NULL,
  deal_description TEXT NOT NULL,
  category TEXT,
  address TEXT,
  phone TEXT,
  website TEXT,
  submitter_type submission_source DEFAULT 'student',  -- renamed from source
  status submission_status DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  -- Enhanced fields from 002_enhanced_submissions.sql
  contact_name TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  location TEXT,
  eligibility TEXT,
  eligibility_other TEXT,
  redemption_methods TEXT[],
  redemption_other TEXT,
  availability TEXT,
  availability_details TEXT,
  restrictions TEXT,
  start_date DATE,
  has_expiration BOOLEAN DEFAULT false,
  expiration_date DATE,
  interested_featured TEXT,
  interested_notifications BOOLEAN DEFAULT false,
  permission_granted BOOLEAN DEFAULT false,
  referral_source TEXT,
  additional_notes TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Core indexes (001_initial_schema.sql)
CREATE INDEX idx_deals_category ON deals(category_id);
CREATE INDEX idx_deals_business ON deals(business_id);
CREATE INDEX idx_deals_status ON deals(status);
CREATE INDEX idx_deals_featured ON deals(is_featured) WHERE is_featured = true;
CREATE INDEX idx_deals_slug ON deals(slug);
CREATE INDEX idx_businesses_slug ON businesses(slug);
CREATE INDEX idx_categories_slug ON categories(slug);

-- Full-text search indexes (003_fulltext_search.sql)
CREATE INDEX idx_deals_fts ON deals USING gin(search_vector);
CREATE INDEX idx_businesses_name_search ON businesses USING gin(to_tsvector('english', name));

-- Submission indexes (002_enhanced_submissions.sql)
CREATE INDEX idx_submissions_submitter_type ON submissions(submitter_type);
CREATE INDEX idx_submissions_status ON submissions(status);
CREATE INDEX idx_submissions_featured_interest ON submissions(interested_featured)
  WHERE interested_featured = 'yes';

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Full-text search function (003_fulltext_search.sql)
CREATE OR REPLACE FUNCTION search_deals_fts(search_query TEXT)
RETURNS TABLE (
  id UUID,
  business_id UUID,
  category_id UUID,
  title TEXT,
  slug TEXT,
  description TEXT,
  discount_type discount_type,
  discount_value TEXT,
  conditions TEXT,
  redemption_method redemption_method,
  code TEXT,
  is_verified BOOLEAN,
  verified_at TIMESTAMP WITH TIME ZONE,
  is_featured BOOLEAN,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE,
  status deal_status,
  search_vector tsvector,
  rank REAL
) AS $$
DECLARE
  tsquery_value tsquery;
BEGIN
  tsquery_value := plainto_tsquery('english', search_query);

  RETURN QUERY
  SELECT
    d.id,
    d.business_id,
    d.category_id,
    d.title,
    d.slug,
    d.description,
    d.discount_type,
    d.discount_value,
    d.conditions,
    d.redemption_method,
    d.code,
    d.is_verified,
    d.verified_at,
    d.is_featured,
    d.expires_at,
    d.created_at,
    d.status,
    d.search_vector,
    ts_rank(d.search_vector, tsquery_value) +
    CASE WHEN b.name ILIKE '%' || search_query || '%' THEN 0.5 ELSE 0 END AS rank
  FROM deals d
  JOIN businesses b ON d.business_id = b.id
  WHERE d.status = 'active'
    AND (
      d.search_vector @@ tsquery_value
      OR b.name ILIKE '%' || search_query || '%'
      OR d.title ILIKE '%' || search_query || '%'
    )
  ORDER BY
    d.is_featured DESC,
    rank DESC,
    d.verified_at DESC NULLS LAST;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Categories: Public read access
CREATE POLICY "Categories are viewable by everyone" ON categories
  FOR SELECT USING (true);

-- Businesses: Public read access
CREATE POLICY "Businesses are viewable by everyone" ON businesses
  FOR SELECT USING (true);

-- Deals: Public read access for active deals only
CREATE POLICY "Active deals are viewable by everyone" ON deals
  FOR SELECT USING (status = 'active');

-- Submissions: Anyone can submit, service role manages
CREATE POLICY "Anyone can submit a deal" ON submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role can update submissions" ON submissions
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Service role can view all submissions" ON submissions
  FOR SELECT USING (true);

-- ============================================================================
-- PERMISSIONS
-- ============================================================================

GRANT EXECUTE ON FUNCTION search_deals_fts(TEXT) TO anon;
GRANT EXECUTE ON FUNCTION search_deals_fts(TEXT) TO authenticated;

-- ============================================================================
-- SEED DATA
-- ============================================================================

INSERT INTO categories (name, slug, icon, description) VALUES
  ('Food & Drink', 'food', '🍕', 'Restaurants, cafes, and food delivery discounts'),
  ('Retail', 'retail', '🛍️', 'Clothing, electronics, and shopping deals'),
  ('Entertainment', 'entertainment', '🎬', 'Movies, events, and recreational activities'),
  ('Services', 'services', '✂️', 'Haircuts, gyms, phone repair, and more'),
  ('Online', 'online', '💻', 'Software, streaming, and digital subscriptions')
ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE submissions IS 'Deal submissions from students and businesses. Business submissions include contact info, discount details, and monetization interest.';
COMMENT ON COLUMN submissions.submitter_type IS 'student or business';
COMMENT ON COLUMN submissions.eligibility IS 'syracuse, all_college, high_school_college, or other';
COMMENT ON COLUMN submissions.redemption_methods IS 'Array of: show_id, promo_code, mention, other';
COMMENT ON COLUMN submissions.availability IS 'anytime, certain_days, or limited_time';
COMMENT ON COLUMN submissions.interested_featured IS 'yes, maybe, or no - monetization lead indicator';
COMMENT ON COLUMN submissions.interested_notifications IS 'Whether business wants view/click notifications';
COMMENT ON COLUMN submissions.permission_granted IS 'Business consent to display deal publicly';
COMMENT ON FUNCTION search_deals_fts IS 'Full-text search for deals with business name matching and ranking';
