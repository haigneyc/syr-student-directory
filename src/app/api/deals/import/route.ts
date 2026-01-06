import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import {
  checkRateLimit,
  getClientIdentifier,
  createRateLimitHeaders,
  ADMIN_RATE_LIMIT,
} from '@/lib/rate-limit';
import { logAdminAction } from '@/lib/admin-logger';

interface ImportDeal {
  title: string;
  slug?: string;
  description: string;
  discount_type: 'percentage' | 'fixed' | 'special';
  discount_value: string;
  conditions?: string;
  redemption_method: 'show_id' | 'online_code' | 'app';
  code?: string;
  is_verified?: boolean;
  is_featured?: boolean;
  expires_at?: string;
  business: {
    name: string;
    slug?: string;
    address?: string;
    phone?: string;
    website?: string;
    latitude?: number;
    longitude?: number;
  };
  category_slug: string;
}

interface ImportPayload {
  deals: ImportDeal[];
}

/**
 * Bulk import deals from JSON
 * POST /api/deals/import
 *
 * Requires server-side authentication (admin only)
 * This route uses the secret key for write operations
 */
export async function POST(request: NextRequest) {
  // Check for admin authorization header
  const authHeader = request.headers.get('x-admin-key');
  const adminKey = process.env.ADMIN_API_KEY;

  if (!adminKey || authHeader !== adminKey) {
    return NextResponse.json(
      { error: 'Unauthorized. Admin API key required.' },
      { status: 401 }
    );
  }

  // Rate limit check (using API key as identifier for admin routes)
  const identifier = authHeader || getClientIdentifier(request);
  const rateLimitResult = checkRateLimit(identifier, 'deals/import', ADMIN_RATE_LIMIT);

  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Please try again later.' },
      {
        status: 429,
        headers: createRateLimitHeaders(rateLimitResult),
      }
    );
  }

  try {
    const body: ImportPayload = await request.json();

    if (!body.deals || !Array.isArray(body.deals)) {
      return NextResponse.json(
        { error: 'Invalid payload. Expected { deals: [...] }' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();
    const results = {
      success: [] as string[],
      errors: [] as { deal: string; error: string }[],
    };

    for (const deal of body.deals) {
      try {
        // Validate required fields
        if (!deal.title || !deal.description || !deal.discount_value || !deal.category_slug) {
          results.errors.push({
            deal: deal.title || 'Unknown',
            error: 'Missing required fields (title, description, discount_value, category_slug)',
          });
          continue;
        }

        // Get or create business
        let businessId: string;

        // Check if business exists
        const { data: existingBusiness } = await supabase
          .from('businesses')
          .select('id')
          .eq('name', deal.business.name)
          .single();

        if (existingBusiness) {
          businessId = existingBusiness.id;
        } else {
          // Create new business
          const businessSlug =
            deal.business.slug ||
            deal.business.name
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-|-$/g, '');

          const { data: newBusiness, error: bizError } = await supabase
            .from('businesses')
            .insert({
              name: deal.business.name,
              slug: businessSlug,
              address: deal.business.address,
              phone: deal.business.phone,
              website: deal.business.website,
              latitude: deal.business.latitude,
              longitude: deal.business.longitude,
            })
            .select('id')
            .single();

          if (bizError || !newBusiness) {
            results.errors.push({
              deal: deal.title,
              error: `Failed to create business: ${bizError?.message}`,
            });
            continue;
          }

          businessId = newBusiness.id;
        }

        // Get category
        const { data: category } = await supabase
          .from('categories')
          .select('id')
          .eq('slug', deal.category_slug)
          .single();

        if (!category) {
          results.errors.push({
            deal: deal.title,
            error: `Category not found: ${deal.category_slug}`,
          });
          continue;
        }

        // Generate slug if not provided
        const dealSlug =
          deal.slug ||
          `${deal.business.name}-${deal.title}`
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');

        // Insert deal
        const { error: dealError } = await supabase.from('deals').insert({
          business_id: businessId,
          category_id: category.id,
          title: deal.title,
          slug: dealSlug,
          description: deal.description,
          discount_type: deal.discount_type,
          discount_value: deal.discount_value,
          conditions: deal.conditions,
          redemption_method: deal.redemption_method,
          code: deal.code,
          is_verified: deal.is_verified ?? false,
          is_featured: deal.is_featured ?? false,
          expires_at: deal.expires_at,
          status: 'active',
        });

        if (dealError) {
          results.errors.push({
            deal: deal.title,
            error: dealError.message,
          });
        } else {
          results.success.push(deal.title);
        }
      } catch (dealErr) {
        results.errors.push({
          deal: deal.title || 'Unknown',
          error: String(dealErr),
        });
      }
    }

    // Log successful import
    logAdminAction({
      endpoint: '/api/deals/import',
      method: 'POST',
      ip: identifier,
      action: 'bulk_import',
      details: {
        imported: results.success.length,
        failed: results.errors.length,
      },
      success: true,
      statusCode: 200,
    });

    return NextResponse.json(
      {
        message: 'Import completed',
        imported: results.success.length,
        failed: results.errors.length,
        results,
      },
      {
        headers: createRateLimitHeaders(rateLimitResult),
      }
    );
  } catch (error) {
    // Log failed import
    logAdminAction({
      endpoint: '/api/deals/import',
      method: 'POST',
      ip: identifier,
      action: 'bulk_import',
      details: { error: String(error) },
      success: false,
      statusCode: 500,
    });

    console.error('Import error:', error);
    return NextResponse.json(
      { error: 'Failed to process import' },
      { status: 500 }
    );
  }
}
