// Cached data layer - Server-side data fetching with Next.js caching
import { unstable_cache } from 'next/cache';
import { supabase } from './supabase';
import type { Category, DealWithRelations } from '@/types/supabase';

// Cache tags for revalidation
export const CACHE_TAGS = {
  DEALS: 'deals',
  CATEGORIES: 'categories',
  DEAL: (slug: string) => `deal-${slug}`,
  CATEGORY: (slug: string) => `category-${slug}`,
} as const;

// Default revalidation time in seconds (5 minutes)
const DEFAULT_REVALIDATE = 300;

// Check if Supabase is configured
const isSupabaseConfigured = () => {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  );
};

// Import mock data for fallback
import {
  categories as mockCategories,
  deals as mockDeals,
  businesses as mockBusinesses,
} from './data';

function getMockDealWithRelations(
  deal: (typeof mockDeals)[number]
): DealWithRelations {
  return {
    ...deal,
    business: mockBusinesses.find((b) => b.id === deal.business_id)!,
    category: mockCategories.find((c) => c.id === deal.category_id)!,
  };
}

/**
 * Get all deals with caching
 * Revalidates every 5 minutes or on-demand via revalidateTag
 */
export const getAllDealsCached = unstable_cache(
  async (): Promise<DealWithRelations[]> => {
    if (!isSupabaseConfigured()) {
      return mockDeals.map(getMockDealWithRelations);
    }

    const { data, error } = await supabase
      .from('deals')
      .select(
        `
        *,
        business:businesses(*),
        category:categories(*)
      `
      )
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching deals:', error);
      return mockDeals.map(getMockDealWithRelations);
    }

    return data as DealWithRelations[];
  },
  ['all-deals'],
  {
    tags: [CACHE_TAGS.DEALS],
    revalidate: DEFAULT_REVALIDATE,
  }
);

/**
 * Get a deal by slug with caching
 */
export const getDealBySlugCached = unstable_cache(
  async (slug: string): Promise<DealWithRelations | null> => {
    if (!isSupabaseConfigured()) {
      const deal = mockDeals.find((d) => d.slug === slug);
      return deal ? getMockDealWithRelations(deal) : null;
    }

    const { data, error } = await supabase
      .from('deals')
      .select(
        `
        *,
        business:businesses(*),
        category:categories(*)
      `
      )
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching deal:', error);
      const deal = mockDeals.find((d) => d.slug === slug);
      return deal ? getMockDealWithRelations(deal) : null;
    }

    return data as DealWithRelations;
  },
  ['deal-by-slug'],
  {
    tags: [CACHE_TAGS.DEALS],
    revalidate: DEFAULT_REVALIDATE,
  }
);

/**
 * Get deals by category with caching
 */
export const getDealsByCategoryCached = unstable_cache(
  async (categorySlug: string): Promise<DealWithRelations[]> => {
    if (!isSupabaseConfigured()) {
      const category = mockCategories.find((c) => c.slug === categorySlug);
      if (!category) return [];
      return mockDeals
        .filter((d) => d.category_id === category.id && d.status === 'active')
        .map(getMockDealWithRelations);
    }

    const { data, error } = await supabase
      .from('deals')
      .select(
        `
        *,
        business:businesses(*),
        category:categories!inner(*)
      `
      )
      .eq('category.slug', categorySlug)
      .eq('status', 'active')
      .order('is_featured', { ascending: false })
      .order('verified_at', { ascending: false });

    if (error) {
      console.error('Error fetching deals by category:', error);
      const category = mockCategories.find((c) => c.slug === categorySlug);
      if (!category) return [];
      return mockDeals
        .filter((d) => d.category_id === category.id && d.status === 'active')
        .map(getMockDealWithRelations);
    }

    return data as DealWithRelations[];
  },
  ['deals-by-category'],
  {
    tags: [CACHE_TAGS.DEALS, CACHE_TAGS.CATEGORIES],
    revalidate: DEFAULT_REVALIDATE,
  }
);

/**
 * Get featured deals with caching
 */
export const getFeaturedDealsCached = unstable_cache(
  async (): Promise<DealWithRelations[]> => {
    if (!isSupabaseConfigured()) {
      return mockDeals
        .filter((d) => d.is_featured && d.status === 'active')
        .map(getMockDealWithRelations);
    }

    const { data, error } = await supabase
      .from('deals')
      .select(
        `
        *,
        business:businesses(*),
        category:categories(*)
      `
      )
      .eq('is_featured', true)
      .eq('status', 'active')
      .order('verified_at', { ascending: false });

    if (error) {
      console.error('Error fetching featured deals:', error);
      return mockDeals
        .filter((d) => d.is_featured && d.status === 'active')
        .map(getMockDealWithRelations);
    }

    return data as DealWithRelations[];
  },
  ['featured-deals'],
  {
    tags: [CACHE_TAGS.DEALS],
    revalidate: DEFAULT_REVALIDATE,
  }
);

/**
 * Get latest deals with caching
 */
export const getLatestDealsCached = unstable_cache(
  async (limit: number = 6): Promise<DealWithRelations[]> => {
    if (!isSupabaseConfigured()) {
      return mockDeals
        .filter((d) => d.status === 'active')
        .sort(
          (a, b) =>
            new Date(b.verified_at || b.created_at).getTime() -
            new Date(a.verified_at || a.created_at).getTime()
        )
        .slice(0, limit)
        .map(getMockDealWithRelations);
    }

    const { data, error } = await supabase
      .from('deals')
      .select(
        `
        *,
        business:businesses(*),
        category:categories(*)
      `
      )
      .eq('status', 'active')
      .order('verified_at', { ascending: false, nullsFirst: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching latest deals:', error);
      return mockDeals
        .filter((d) => d.status === 'active')
        .slice(0, limit)
        .map(getMockDealWithRelations);
    }

    return data as DealWithRelations[];
  },
  ['latest-deals'],
  {
    tags: [CACHE_TAGS.DEALS],
    revalidate: DEFAULT_REVALIDATE,
  }
);

/**
 * Get all categories with caching
 */
export const getAllCategoriesCached = unstable_cache(
  async (): Promise<Category[]> => {
    if (!isSupabaseConfigured()) {
      return mockCategories;
    }

    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching categories:', error);
      return mockCategories;
    }

    return data;
  },
  ['all-categories'],
  {
    tags: [CACHE_TAGS.CATEGORIES],
    revalidate: DEFAULT_REVALIDATE,
  }
);

/**
 * Get a category by slug with caching
 */
export const getCategoryBySlugCached = unstable_cache(
  async (slug: string): Promise<Category | null> => {
    if (!isSupabaseConfigured()) {
      return mockCategories.find((c) => c.slug === slug) || null;
    }

    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching category:', error);
      return mockCategories.find((c) => c.slug === slug) || null;
    }

    return data;
  },
  ['category-by-slug'],
  {
    tags: [CACHE_TAGS.CATEGORIES],
    revalidate: DEFAULT_REVALIDATE,
  }
);

/**
 * Search deals with short-lived caching (1 minute)
 */
export const searchDealsCached = unstable_cache(
  async (query: string): Promise<DealWithRelations[]> => {
    if (!isSupabaseConfigured()) {
      const lowerQuery = query.toLowerCase();
      return mockDeals
        .filter(
          (d) =>
            d.status === 'active' &&
            (d.title.toLowerCase().includes(lowerQuery) ||
              d.description.toLowerCase().includes(lowerQuery) ||
              mockBusinesses
                .find((b) => b.id === d.business_id)
                ?.name.toLowerCase()
                .includes(lowerQuery))
        )
        .map(getMockDealWithRelations);
    }

    const { data, error } = await supabase
      .from('deals')
      .select(
        `
        *,
        business:businesses(*),
        category:categories(*)
      `
      )
      .eq('status', 'active')
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`);

    if (error) {
      console.error('Error searching deals:', error);
      return [];
    }

    return data as DealWithRelations[];
  },
  ['search-deals'],
  {
    tags: [CACHE_TAGS.DEALS],
    revalidate: 60, // Search results cached for 1 minute
  }
);
