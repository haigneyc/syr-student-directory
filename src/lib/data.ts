// Mock data for development - will be replaced with Supabase queries
import { Category, Business, Deal, DealWithRelations } from '@/types/database';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Food & Drink',
    slug: 'food',
    icon: '🍕',
    description: 'Restaurants, cafes, and food delivery discounts',
  },
  {
    id: '2',
    name: 'Retail',
    slug: 'retail',
    icon: '🛍️',
    description: 'Clothing, electronics, and shopping deals',
  },
  {
    id: '3',
    name: 'Entertainment',
    slug: 'entertainment',
    icon: '🎬',
    description: 'Movies, events, and recreational activities',
  },
  {
    id: '4',
    name: 'Services',
    slug: 'services',
    icon: '✂️',
    description: 'Haircuts, gyms, phone repair, and more',
  },
  {
    id: '5',
    name: 'Online',
    slug: 'online',
    icon: '💻',
    description: 'Software, streaming, and digital subscriptions',
  },
];

export const businesses: Business[] = [
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

export const deals: Deal[] = [
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

// Helper functions to simulate database queries
export function getAllDeals(): DealWithRelations[] {
  return deals.map(deal => ({
    ...deal,
    business: businesses.find(b => b.id === deal.business_id)!,
    category: categories.find(c => c.id === deal.category_id)!,
  }));
}

export function getDealBySlug(slug: string): DealWithRelations | undefined {
  const deal = deals.find(d => d.slug === slug);
  if (!deal) return undefined;
  return {
    ...deal,
    business: businesses.find(b => b.id === deal.business_id)!,
    category: categories.find(c => c.id === deal.category_id)!,
  };
}

export function getDealsByCategory(categorySlug: string): DealWithRelations[] {
  const category = categories.find(c => c.slug === categorySlug);
  if (!category) return [];
  return deals
    .filter(d => d.category_id === category.id && d.status === 'active')
    .map(deal => ({
      ...deal,
      business: businesses.find(b => b.id === deal.business_id)!,
      category: category,
    }));
}

export function getFeaturedDeals(): DealWithRelations[] {
  return deals
    .filter(d => d.is_featured && d.status === 'active')
    .map(deal => ({
      ...deal,
      business: businesses.find(b => b.id === deal.business_id)!,
      category: categories.find(c => c.id === deal.category_id)!,
    }));
}

export function getLatestDeals(limit: number = 6): DealWithRelations[] {
  return deals
    .filter(d => d.status === 'active')
    .sort((a, b) => new Date(b.verified_at || b.created_at).getTime() - new Date(a.verified_at || a.created_at).getTime())
    .slice(0, limit)
    .map(deal => ({
      ...deal,
      business: businesses.find(b => b.id === deal.business_id)!,
      category: categories.find(c => c.id === deal.category_id)!,
    }));
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug);
}

export function getAllCategories(): Category[] {
  return categories;
}

export function searchDeals(query: string): DealWithRelations[] {
  const lowerQuery = query.toLowerCase();
  return deals
    .filter(d =>
      d.status === 'active' && (
        d.title.toLowerCase().includes(lowerQuery) ||
        d.description.toLowerCase().includes(lowerQuery) ||
        businesses.find(b => b.id === d.business_id)?.name.toLowerCase().includes(lowerQuery)
      )
    )
    .map(deal => ({
      ...deal,
      business: businesses.find(b => b.id === deal.business_id)!,
      category: categories.find(c => c.id === deal.category_id)!,
    }));
}
