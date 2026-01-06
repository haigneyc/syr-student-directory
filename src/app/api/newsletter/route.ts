import { NextRequest, NextResponse } from 'next/server';
import {
  checkRateLimit,
  getClientIdentifier,
  createRateLimitHeaders,
  SUBMISSION_RATE_LIMIT,
} from '@/lib/rate-limit';
import { subscribeToNewsletter, isBeehiivConfigured } from '@/lib/beehiiv';

interface SubscribeRequest {
  email: string;
  source?: string;
}

/**
 * Subscribe to the newsletter
 * POST /api/newsletter
 */
export async function POST(request: NextRequest) {
  // Rate limit check to prevent abuse
  const identifier = getClientIdentifier(request);
  const rateLimitResult = checkRateLimit(
    identifier,
    'newsletter',
    SUBMISSION_RATE_LIMIT
  );

  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: createRateLimitHeaders(rateLimitResult),
      }
    );
  }

  try {
    const body: SubscribeRequest = await request.json();

    // Validate email
    if (!body.email || !body.email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email address required' },
        { status: 400 }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Subscribe via Beehiiv if configured
    if (isBeehiivConfigured()) {
      const result = await subscribeToNewsletter(body.email, {
        utmSource: body.source || 'website',
        utmMedium: 'footer_signup',
      });

      if (!result.success && result.error !== 'Already subscribed') {
        console.error('Newsletter subscription failed:', result.error);
        return NextResponse.json(
          { error: 'Failed to subscribe. Please try again.' },
          {
            status: 500,
            headers: createRateLimitHeaders(rateLimitResult),
          }
        );
      }

      // Already subscribed is still a success case
      if (result.error === 'Already subscribed') {
        return NextResponse.json(
          { success: true, message: "You're already subscribed!" },
          {
            status: 200,
            headers: createRateLimitHeaders(rateLimitResult),
          }
        );
      }
    } else {
      // Beehiiv not configured - log for manual processing
      console.log('[Newsletter] Signup (Beehiiv not configured):', body.email);
    }

    console.log('[Newsletter] New subscriber:', body.email);

    return NextResponse.json(
      { success: true, message: 'Successfully subscribed!' },
      {
        status: 201,
        headers: createRateLimitHeaders(rateLimitResult),
      }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to process subscription' },
      { status: 500 }
    );
  }
}
