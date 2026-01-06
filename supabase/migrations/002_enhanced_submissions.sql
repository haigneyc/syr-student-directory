-- Enhanced Submissions Schema for Business Submission Form
-- Run this migration in your Supabase SQL editor AFTER 001_initial_schema.sql

-- Add new columns to submissions table for enhanced business form
ALTER TABLE submissions
  -- Rename source column to submitter_type for clarity
  RENAME COLUMN source TO submitter_type;

-- Add new columns for business submissions
ALTER TABLE submissions
  ADD COLUMN IF NOT EXISTS contact_name TEXT,
  ADD COLUMN IF NOT EXISTS contact_email TEXT,
  ADD COLUMN IF NOT EXISTS contact_phone TEXT,
  ADD COLUMN IF NOT EXISTS location TEXT,
  ADD COLUMN IF NOT EXISTS eligibility TEXT,
  ADD COLUMN IF NOT EXISTS eligibility_other TEXT,
  ADD COLUMN IF NOT EXISTS redemption_methods TEXT[],
  ADD COLUMN IF NOT EXISTS redemption_other TEXT,
  ADD COLUMN IF NOT EXISTS availability TEXT,
  ADD COLUMN IF NOT EXISTS availability_details TEXT,
  ADD COLUMN IF NOT EXISTS restrictions TEXT,
  ADD COLUMN IF NOT EXISTS start_date DATE,
  ADD COLUMN IF NOT EXISTS has_expiration BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS expiration_date DATE,
  ADD COLUMN IF NOT EXISTS interested_featured TEXT,
  ADD COLUMN IF NOT EXISTS interested_notifications BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS permission_granted BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS referral_source TEXT,
  ADD COLUMN IF NOT EXISTS additional_notes TEXT,
  ADD COLUMN IF NOT EXISTS submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Rename submitter_email to email for consistency
ALTER TABLE submissions
  RENAME COLUMN submitter_email TO email;

-- Add deal_description column if business_name exists but deal_description doesn't
-- (The original schema used deal_description, but we want to ensure it exists)
ALTER TABLE submissions
  ADD COLUMN IF NOT EXISTS deal_description TEXT;

-- Create index for filtering by submitter type
CREATE INDEX IF NOT EXISTS idx_submissions_submitter_type ON submissions(submitter_type);

-- Create index for filtering by status
CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);

-- Create index for filtering by interested_featured (for monetization leads)
CREATE INDEX IF NOT EXISTS idx_submissions_featured_interest ON submissions(interested_featured)
  WHERE interested_featured = 'yes';

-- Update RLS policy to allow server-side inserts with secret key
-- The existing policy should already allow inserts, but let's ensure it works with the new fields
DROP POLICY IF EXISTS "Anyone can submit a deal" ON submissions;
CREATE POLICY "Anyone can submit a deal" ON submissions
  FOR INSERT WITH CHECK (true);

-- Add policy for server-side updates (using service role)
CREATE POLICY "Service role can update submissions" ON submissions
  FOR UPDATE USING (true) WITH CHECK (true);

-- Add policy for server-side selects (for admin dashboard later)
CREATE POLICY "Service role can view all submissions" ON submissions
  FOR SELECT USING (true);

COMMENT ON TABLE submissions IS 'Deal submissions from students and businesses. Business submissions include contact info, discount details, and monetization interest.';
COMMENT ON COLUMN submissions.submitter_type IS 'student or business';
COMMENT ON COLUMN submissions.eligibility IS 'syracuse, all_college, high_school_college, or other';
COMMENT ON COLUMN submissions.redemption_methods IS 'Array of: show_id, promo_code, mention, other';
COMMENT ON COLUMN submissions.availability IS 'anytime, certain_days, or limited_time';
COMMENT ON COLUMN submissions.interested_featured IS 'yes, maybe, or no - monetization lead indicator';
COMMENT ON COLUMN submissions.interested_notifications IS 'Whether business wants view/click notifications';
COMMENT ON COLUMN submissions.permission_granted IS 'Business consent to display deal publicly';
