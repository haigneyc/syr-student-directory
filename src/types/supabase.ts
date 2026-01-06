// Supabase database types
// Generated from the schema in supabase/migrations/001_initial_schema.sql

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          icon: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          icon: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          icon?: string
          description?: string | null
          created_at?: string
        }
      }
      businesses: {
        Row: {
          id: string
          name: string
          slug: string
          logo_url: string | null
          address: string | null
          latitude: number | null
          longitude: number | null
          phone: string | null
          website: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          logo_url?: string | null
          address?: string | null
          latitude?: number | null
          longitude?: number | null
          phone?: string | null
          website?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          logo_url?: string | null
          address?: string | null
          latitude?: number | null
          longitude?: number | null
          phone?: string | null
          website?: string | null
          created_at?: string
        }
      }
      deals: {
        Row: {
          id: string
          business_id: string
          category_id: string
          title: string
          slug: string
          description: string
          discount_type: 'percentage' | 'fixed' | 'bogo' | 'special'
          discount_value: string
          conditions: string | null
          redemption_method: 'show_id' | 'online_code' | 'app'
          code: string | null
          is_verified: boolean
          verified_at: string | null
          is_featured: boolean
          expires_at: string | null
          created_at: string
          status: 'active' | 'pending' | 'expired'
        }
        Insert: {
          id?: string
          business_id: string
          category_id: string
          title: string
          slug: string
          description: string
          discount_type: 'percentage' | 'fixed' | 'bogo' | 'special'
          discount_value: string
          conditions?: string | null
          redemption_method?: 'show_id' | 'online_code' | 'app'
          code?: string | null
          is_verified?: boolean
          verified_at?: string | null
          is_featured?: boolean
          expires_at?: string | null
          created_at?: string
          status?: 'active' | 'pending' | 'expired'
        }
        Update: {
          id?: string
          business_id?: string
          category_id?: string
          title?: string
          slug?: string
          description?: string
          discount_type?: 'percentage' | 'fixed' | 'bogo' | 'special'
          discount_value?: string
          conditions?: string | null
          redemption_method?: 'show_id' | 'online_code' | 'app'
          code?: string | null
          is_verified?: boolean
          verified_at?: string | null
          is_featured?: boolean
          expires_at?: string | null
          created_at?: string
          status?: 'active' | 'pending' | 'expired'
        }
      }
      submissions: {
        Row: {
          id: string
          submitter_email: string
          business_name: string
          deal_description: string
          category: string | null
          address: string | null
          phone: string | null
          website: string | null
          source: 'student' | 'business'
          status: 'pending' | 'approved' | 'rejected'
          created_at: string
        }
        Insert: {
          id?: string
          submitter_email: string
          business_name: string
          deal_description: string
          category?: string | null
          address?: string | null
          phone?: string | null
          website?: string | null
          source?: 'student' | 'business'
          status?: 'pending' | 'approved' | 'rejected'
          created_at?: string
        }
        Update: {
          id?: string
          submitter_email?: string
          business_name?: string
          deal_description?: string
          category?: string | null
          address?: string | null
          phone?: string | null
          website?: string | null
          source?: 'student' | 'business'
          status?: 'pending' | 'approved' | 'rejected'
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      discount_type: 'percentage' | 'fixed' | 'bogo' | 'special'
      redemption_method: 'show_id' | 'online_code' | 'app'
      deal_status: 'active' | 'pending' | 'expired'
      submission_source: 'student' | 'business'
      submission_status: 'pending' | 'approved' | 'rejected'
    }
  }
}

// Helper types for easier usage
export type Category = Database['public']['Tables']['categories']['Row']
export type Business = Database['public']['Tables']['businesses']['Row']
export type Deal = Database['public']['Tables']['deals']['Row']
export type Submission = Database['public']['Tables']['submissions']['Row']

// Deal with joined relations
export type DealWithRelations = Deal & {
  business: Business
  category: Category
}
