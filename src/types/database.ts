// Database types for Syracuse Student Directory
// These types match the Supabase schema

export type DiscountType = 'percentage' | 'fixed' | 'bogo' | 'special';
export type RedemptionMethod = 'show_id' | 'online_code' | 'app';
export type DealStatus = 'active' | 'pending' | 'expired';
export type SubmissionSource = 'student' | 'business';
export type SubmissionStatus = 'pending' | 'approved' | 'rejected';

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string | null;
  created_at: string;
}

export interface Business {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  phone: string | null;
  website: string | null;
  created_at: string;
}

export interface Deal {
  id: string;
  business_id: string;
  category_id: string;
  title: string;
  slug: string;
  description: string;
  discount_type: DiscountType;
  discount_value: string;
  conditions: string | null;
  redemption_method: RedemptionMethod;
  code: string | null;
  is_verified: boolean;
  verified_at: string | null;
  is_featured: boolean;
  expires_at: string | null;
  created_at: string;
  status: DealStatus;
  // Joined relations
  business?: Business;
  category?: Category;
}

export interface Submission {
  id: string;
  submitter_email: string;
  business_name: string;
  deal_description: string;
  source: SubmissionSource;
  status: SubmissionStatus;
  created_at: string;
}

// API response types
export interface DealWithRelations extends Deal {
  business: Business;
  category: Category;
}

export interface CategoryWithDeals extends Category {
  deals: Deal[];
  deal_count: number;
}
