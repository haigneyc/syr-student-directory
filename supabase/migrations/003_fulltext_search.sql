-- Syracuse Student Directory - Full-text Search Enhancement
-- This migration adds comprehensive full-text search capabilities

-- Create a function to generate search vectors for deals
-- This combines deal title, description, and business name for better search results
CREATE OR REPLACE FUNCTION deals_search_vector(deal deals)
RETURNS tsvector AS $$
DECLARE
  business_name TEXT;
  category_name TEXT;
BEGIN
  -- Get the business name
  SELECT name INTO business_name FROM businesses WHERE id = deal.business_id;
  -- Get the category name
  SELECT name INTO category_name FROM categories WHERE id = deal.category_id;

  -- Create weighted search vector:
  -- A = highest weight (business name, deal title)
  -- B = medium weight (discount value, category)
  -- C = lower weight (description, conditions)
  RETURN (
    setweight(to_tsvector('english', COALESCE(business_name, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(deal.title, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(deal.discount_value, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(category_name, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(deal.description, '')), 'C') ||
    setweight(to_tsvector('english', COALESCE(deal.conditions, '')), 'C')
  );
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Add a generated search vector column to deals table
ALTER TABLE deals ADD COLUMN IF NOT EXISTS search_vector tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', COALESCE(title, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(discount_value, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(description, '')), 'C') ||
    setweight(to_tsvector('english', COALESCE(conditions, '')), 'C')
  ) STORED;

-- Create GIN index on the search vector for fast full-text search
DROP INDEX IF EXISTS idx_deals_search;
CREATE INDEX idx_deals_fts ON deals USING gin(search_vector);

-- Create index on business name for search
CREATE INDEX IF NOT EXISTS idx_businesses_name_search ON businesses USING gin(to_tsvector('english', name));

-- Create a function for full-text search across deals and businesses
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
  -- Convert search query to tsquery with prefix matching for partial words
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

-- Grant execute permission on the search function
GRANT EXECUTE ON FUNCTION search_deals_fts(TEXT) TO anon;
GRANT EXECUTE ON FUNCTION search_deals_fts(TEXT) TO authenticated;

COMMENT ON FUNCTION search_deals_fts IS 'Full-text search for deals with business name matching and ranking';
