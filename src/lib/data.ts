// Data layer - Uses Supabase when available, falls back to mock data
import { supabase } from './supabase';
import type { Category, Business, Deal, DealWithRelations } from '@/types/supabase';

// Check if Supabase is configured
const isSupabaseConfigured = () => {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  );
};

// ============================================================================
// MOCK DATA (Fallback when Supabase is not configured)
// ============================================================================

const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Food & Drink',
    slug: 'food',
    icon: '🍕',
    description: 'Save on pizza, coffee, and restaurants near Syracuse University campus. From Marshall Street favorites to downtown eateries, find student discounts at local spots including Varsity Pizza, King David\'s, Faegan\'s, and more. Show your SU student ID and enjoy discounts on dine-in, takeout, and delivery orders.',
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Retail',
    slug: 'retail',
    icon: '🛍️',
    description: 'Student discounts on clothing, electronics, and everyday essentials. Shop smarter at stores near Syracuse University with exclusive SU student savings. Find deals on textbooks, dorm supplies, tech accessories, and fashion from both local shops and national retailers.',
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    name: 'Entertainment',
    slug: 'entertainment',
    icon: '🎬',
    description: 'Discounted movies, events, and activities for Syracuse students. Enjoy student pricing at local theaters, bowling alleys, escape rooms, and entertainment venues. Perfect for weekend outings, date nights, or group hangouts without breaking the budget.',
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '4',
    name: 'Services',
    slug: 'services',
    icon: '✂️',
    description: 'Student discounts on haircuts, gym memberships, phone repair, and professional services near Syracuse University. Save money on grooming, fitness, and essential services with your SU student ID. Local barbers, salons, and fitness centers offer exclusive Orange pricing.',
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '5',
    name: 'Online',
    slug: 'online',
    icon: '💻',
    description: 'Digital subscriptions and software at student prices. Access Spotify Premium, Amazon Prime Student, Adobe Creative Cloud, Microsoft Office, and streaming services with verified .edu email discounts. Save 50% or more on the apps and tools you use daily.',
    created_at: '2024-01-01T00:00:00Z',
  },
];

const mockBusinesses: Business[] = [
  {
    id: '1',
    name: "Varsity Pizza",
    slug: 'varsity-pizza',
    logo_url: null,
    address: '123 Marshall St, Syracuse, NY 13210',
    latitude: 43.0389,
    longitude: -76.1350,
    phone: '(315) 555-0101',
    website: 'https://varsitypizza.com',
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: "Faegan's Cafe & Pub",
    slug: 'feagans-cafe',
    logo_url: null,
    address: '734 S Crouse Ave, Syracuse, NY 13210',
    latitude: 43.0385,
    longitude: -76.1325,
    phone: '(315) 555-0102',
    website: null,
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    name: 'Syracuse Cinemas',
    slug: 'syracuse-cinemas',
    logo_url: null,
    address: '456 Erie Blvd, Syracuse, NY 13210',
    latitude: 43.0510,
    longitude: -76.1480,
    phone: '(315) 555-0103',
    website: 'https://syracusecinemas.com',
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '4',
    name: 'Orange Fitness',
    slug: 'orange-fitness',
    logo_url: null,
    address: '789 University Ave, Syracuse, NY 13210',
    latitude: 43.0395,
    longitude: -76.1340,
    phone: '(315) 555-0104',
    website: 'https://orangefitness.com',
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '5',
    name: 'Spotify',
    slug: 'spotify',
    logo_url: null,
    address: 'Online',
    latitude: null,
    longitude: null,
    phone: null,
    website: 'https://spotify.com/student',
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '6',
    name: "King David's Restaurant",
    slug: 'king-davids',
    logo_url: null,
    address: '129 Marshall St, Syracuse, NY 13210',
    latitude: 43.0391,
    longitude: -76.1352,
    phone: '(315) 555-0105',
    website: null,
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '7',
    name: 'Westcott Barber Shop',
    slug: 'westcott-barber',
    logo_url: null,
    address: '550 Westcott St, Syracuse, NY 13210',
    latitude: 43.0420,
    longitude: -76.1200,
    phone: '(315) 555-0106',
    website: null,
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '8',
    name: 'Amazon',
    slug: 'amazon',
    logo_url: null,
    address: 'Online',
    latitude: null,
    longitude: null,
    phone: null,
    website: 'https://amazon.com/primestudent',
    created_at: '2024-01-01T00:00:00Z',
  },
];

const mockDeals: Deal[] = [
  {
    id: '1',
    business_id: '1',
    category_id: '1',
    title: '15% Off Any Pizza',
    slug: 'varsity-pizza-15-off',
    description: 'Show your Syracuse University student ID and get 15% off any pizza order. Valid for dine-in and takeout.',
    discount_type: 'percentage',
    discount_value: '15%',
    conditions: 'Valid SU student ID required. Cannot be combined with other offers.',
    redemption_method: 'show_id',
    code: null,
    is_verified: true,
    verified_at: '2024-12-15T00:00:00Z',
    is_featured: true,
    expires_at: null,
    created_at: '2024-01-01T00:00:00Z',
    status: 'active',
  },
  {
    id: '2',
    business_id: '2',
    category_id: '1',
    title: '$2 Off Lunch Specials',
    slug: 'feagans-lunch-special',
    description: 'Students get $2 off any lunch special Monday through Friday, 11am-3pm.',
    discount_type: 'fixed',
    discount_value: '$2',
    conditions: 'Weekdays only, 11am-3pm. Student ID required.',
    redemption_method: 'show_id',
    code: null,
    is_verified: true,
    verified_at: '2024-12-10T00:00:00Z',
    is_featured: false,
    expires_at: null,
    created_at: '2024-01-01T00:00:00Z',
    status: 'active',
  },
  {
    id: '3',
    business_id: '3',
    category_id: '3',
    title: '$3 Student Movie Tickets',
    slug: 'syracuse-cinemas-student-tickets',
    description: 'All students pay just $3 for any movie showing on Tuesdays. Regular student price is $8 any other day.',
    discount_type: 'special',
    discount_value: '$3 Tuesdays',
    conditions: 'Valid student ID required. Tuesdays only for $3 price.',
    redemption_method: 'show_id',
    code: null,
    is_verified: true,
    verified_at: '2024-12-01T00:00:00Z',
    is_featured: true,
    expires_at: null,
    created_at: '2024-01-01T00:00:00Z',
    status: 'active',
  },
  {
    id: '4',
    business_id: '4',
    category_id: '4',
    title: '20% Off Student Memberships',
    slug: 'orange-fitness-student-membership',
    description: 'Syracuse students get 20% off monthly gym memberships. Includes access to all equipment and group classes.',
    discount_type: 'percentage',
    discount_value: '20%',
    conditions: 'Must show valid student ID. Monthly commitment required.',
    redemption_method: 'show_id',
    code: null,
    is_verified: true,
    verified_at: '2024-11-20T00:00:00Z',
    is_featured: false,
    expires_at: null,
    created_at: '2024-01-01T00:00:00Z',
    status: 'active',
  },
  {
    id: '5',
    business_id: '5',
    category_id: '5',
    title: 'Spotify Premium - 50% Off',
    slug: 'spotify-student-premium',
    description: 'Get Spotify Premium for just $5.99/month (normally $11.99). Includes Hulu and SHOWTIME.',
    discount_type: 'percentage',
    discount_value: '50%',
    conditions: 'Must verify student status through SheerID. Renews at $5.99/month for up to 4 years.',
    redemption_method: 'online_code',
    code: null,
    is_verified: true,
    verified_at: '2024-12-20T00:00:00Z',
    is_featured: true,
    expires_at: null,
    created_at: '2024-01-01T00:00:00Z',
    status: 'active',
  },
  {
    id: '6',
    business_id: '6',
    category_id: '1',
    title: '10% Off Everything',
    slug: 'king-davids-student-discount',
    description: 'All Syracuse University students receive 10% off their entire order at King David\'s.',
    discount_type: 'percentage',
    discount_value: '10%',
    conditions: 'Valid student ID required. Dine-in and takeout.',
    redemption_method: 'show_id',
    code: null,
    is_verified: true,
    verified_at: '2024-12-05T00:00:00Z',
    is_featured: false,
    expires_at: null,
    created_at: '2024-01-01T00:00:00Z',
    status: 'active',
  },
  {
    id: '7',
    business_id: '7',
    category_id: '4',
    title: '$5 Student Haircuts',
    slug: 'westcott-barber-student-haircut',
    description: 'Get a quality haircut for just $5 with your student ID. Wednesdays only.',
    discount_type: 'special',
    discount_value: '$5',
    conditions: 'Wednesdays only. Cash preferred. Student ID required.',
    redemption_method: 'show_id',
    code: null,
    is_verified: true,
    verified_at: '2024-11-15T00:00:00Z',
    is_featured: true,
    expires_at: null,
    created_at: '2024-01-01T00:00:00Z',
    status: 'active',
  },
  {
    id: '8',
    business_id: '8',
    category_id: '5',
    title: 'Amazon Prime Student - 6 Months Free',
    slug: 'amazon-prime-student-free-trial',
    description: 'Students get 6 months of Amazon Prime free, then 50% off ($7.49/month) after that.',
    discount_type: 'special',
    discount_value: '6 Mo Free',
    conditions: 'Must verify .edu email. After trial, $7.49/month or $69/year.',
    redemption_method: 'online_code',
    code: null,
    is_verified: true,
    verified_at: '2024-12-18T00:00:00Z',
    is_featured: true,
    expires_at: null,
    created_at: '2024-01-01T00:00:00Z',
    status: 'active',
  },
];

// ============================================================================
// HELPER FUNCTIONS (Mock data)
// ============================================================================

function getMockDealWithRelations(deal: Deal): DealWithRelations {
  return {
    ...deal,
    business: mockBusinesses.find(b => b.id === deal.business_id)!,
    category: mockCategories.find(c => c.id === deal.category_id)!,
  };
}

// ============================================================================
// DATA FETCHING FUNCTIONS (Supabase with mock fallback)
// ============================================================================

export async function getAllDealsAsync(): Promise<DealWithRelations[]> {
  if (!isSupabaseConfigured()) {
    return mockDeals.map(getMockDealWithRelations);
  }

  const { data, error } = await supabase
    .from('deals')
    .select(`
      *,
      business:businesses(*),
      category:categories(*)
    `)
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching deals:', error);
    return mockDeals.map(getMockDealWithRelations);
  }

  return data as DealWithRelations[];
}

export async function getDealBySlugAsync(slug: string): Promise<DealWithRelations | null> {
  if (!isSupabaseConfigured()) {
    const deal = mockDeals.find(d => d.slug === slug);
    return deal ? getMockDealWithRelations(deal) : null;
  }

  const { data, error } = await supabase
    .from('deals')
    .select(`
      *,
      business:businesses(*),
      category:categories(*)
    `)
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching deal:', error);
    const deal = mockDeals.find(d => d.slug === slug);
    return deal ? getMockDealWithRelations(deal) : null;
  }

  return data as DealWithRelations;
}

export async function getDealsByCategoryAsync(categorySlug: string): Promise<DealWithRelations[]> {
  if (!isSupabaseConfigured()) {
    const category = mockCategories.find(c => c.slug === categorySlug);
    if (!category) return [];
    return mockDeals
      .filter(d => d.category_id === category.id && d.status === 'active')
      .map(getMockDealWithRelations);
  }

  const { data, error } = await supabase
    .from('deals')
    .select(`
      *,
      business:businesses(*),
      category:categories!inner(*)
    `)
    .eq('category.slug', categorySlug)
    .eq('status', 'active')
    .order('is_featured', { ascending: false })
    .order('verified_at', { ascending: false });

  if (error) {
    console.error('Error fetching deals by category:', error);
    const category = mockCategories.find(c => c.slug === categorySlug);
    if (!category) return [];
    return mockDeals
      .filter(d => d.category_id === category.id && d.status === 'active')
      .map(getMockDealWithRelations);
  }

  return data as DealWithRelations[];
}

export async function getFeaturedDealsAsync(): Promise<DealWithRelations[]> {
  if (!isSupabaseConfigured()) {
    return mockDeals
      .filter(d => d.is_featured && d.status === 'active')
      .map(getMockDealWithRelations);
  }

  const { data, error } = await supabase
    .from('deals')
    .select(`
      *,
      business:businesses(*),
      category:categories(*)
    `)
    .eq('is_featured', true)
    .eq('status', 'active')
    .order('verified_at', { ascending: false });

  if (error) {
    console.error('Error fetching featured deals:', error);
    return mockDeals
      .filter(d => d.is_featured && d.status === 'active')
      .map(getMockDealWithRelations);
  }

  return data as DealWithRelations[];
}

export async function getLatestDealsAsync(limit: number = 6): Promise<DealWithRelations[]> {
  if (!isSupabaseConfigured()) {
    return mockDeals
      .filter(d => d.status === 'active')
      .sort((a, b) => new Date(b.verified_at || b.created_at).getTime() - new Date(a.verified_at || a.created_at).getTime())
      .slice(0, limit)
      .map(getMockDealWithRelations);
  }

  const { data, error } = await supabase
    .from('deals')
    .select(`
      *,
      business:businesses(*),
      category:categories(*)
    `)
    .eq('status', 'active')
    .order('verified_at', { ascending: false, nullsFirst: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching latest deals:', error);
    return mockDeals
      .filter(d => d.status === 'active')
      .slice(0, limit)
      .map(getMockDealWithRelations);
  }

  return data as DealWithRelations[];
}

export async function getAllCategoriesAsync(): Promise<Category[]> {
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
}

export async function getCategoryBySlugAsync(slug: string): Promise<Category | null> {
  if (!isSupabaseConfigured()) {
    return mockCategories.find(c => c.slug === slug) || null;
  }

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching category:', error);
    return mockCategories.find(c => c.slug === slug) || null;
  }

  return data;
}

export async function searchDealsAsync(query: string): Promise<DealWithRelations[]> {
  if (!isSupabaseConfigured()) {
    const lowerQuery = query.toLowerCase();
    return mockDeals
      .filter(d =>
        d.status === 'active' && (
          d.title.toLowerCase().includes(lowerQuery) ||
          d.description.toLowerCase().includes(lowerQuery) ||
          mockBusinesses.find(b => b.id === d.business_id)?.name.toLowerCase().includes(lowerQuery)
        )
      )
      .map(getMockDealWithRelations);
  }

  const { data, error } = await supabase
    .from('deals')
    .select(`
      *,
      business:businesses(*),
      category:categories(*)
    `)
    .eq('status', 'active')
    .or(`title.ilike.%${query}%,description.ilike.%${query}%`);

  if (error) {
    console.error('Error searching deals:', error);
    return [];
  }

  return data as DealWithRelations[];
}

// ============================================================================
// SYNCHRONOUS FUNCTIONS (For backwards compatibility - use mock data only)
// These are kept for components that need synchronous data access
// ============================================================================

export function getAllDeals(): DealWithRelations[] {
  return mockDeals.map(getMockDealWithRelations);
}

export function getDealBySlug(slug: string): DealWithRelations | undefined {
  const deal = mockDeals.find(d => d.slug === slug);
  return deal ? getMockDealWithRelations(deal) : undefined;
}

export function getDealsByCategory(categorySlug: string): DealWithRelations[] {
  const category = mockCategories.find(c => c.slug === categorySlug);
  if (!category) return [];
  return mockDeals
    .filter(d => d.category_id === category.id && d.status === 'active')
    .map(getMockDealWithRelations);
}

export function getFeaturedDeals(): DealWithRelations[] {
  return mockDeals
    .filter(d => d.is_featured && d.status === 'active')
    .map(getMockDealWithRelations);
}

export function getLatestDeals(limit: number = 6): DealWithRelations[] {
  return mockDeals
    .filter(d => d.status === 'active')
    .sort((a, b) => new Date(b.verified_at || b.created_at).getTime() - new Date(a.verified_at || a.created_at).getTime())
    .slice(0, limit)
    .map(getMockDealWithRelations);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return mockCategories.find(c => c.slug === slug);
}

export function getAllCategories(): Category[] {
  return mockCategories;
}

export function searchDeals(query: string): DealWithRelations[] {
  const lowerQuery = query.toLowerCase();
  return mockDeals
    .filter(d =>
      d.status === 'active' && (
        d.title.toLowerCase().includes(lowerQuery) ||
        d.description.toLowerCase().includes(lowerQuery) ||
        mockBusinesses.find(b => b.id === d.business_id)?.name.toLowerCase().includes(lowerQuery)
      )
    )
    .map(getMockDealWithRelations);
}

// Export mock data for seeding
export { mockCategories as categories, mockBusinesses as businesses, mockDeals as deals };
