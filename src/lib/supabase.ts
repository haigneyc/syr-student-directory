import { createClient } from '@supabase/supabase-js';

// Supabase client configuration for the new API key system (2025+)
// See: https://github.com/orgs/supabase/discussions/29260

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

// Validate required environment variables
if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
}

if (!supabasePublishableKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY environment variable');
}

/**
 * Browser-safe Supabase client using publishable key
 * Use this for client-side operations and public data fetching
 *
 * The publishable key (sb_publishable_...) is safe to expose in browser code
 */
export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

/**
 * Server-only Supabase client using secret key
 * Use this ONLY in API routes and server components
 *
 * SECURITY: The secret key (sb_secret_...) will return HTTP 401 if used in browsers
 * This is a security feature to prevent accidental exposure
 */
export function createServerClient() {
  if (!supabaseSecretKey) {
    throw new Error('Missing SUPABASE_SECRET_KEY environment variable');
  }

  // Verify we're on the server
  if (typeof window !== 'undefined') {
    throw new Error(
      'createServerClient() must only be called on the server. ' +
      'The secret key cannot be used in browser environments.'
    );
  }

  return createClient(supabaseUrl, supabaseSecretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

// Type exports for database schema
export type { Database } from '@/types/supabase';
