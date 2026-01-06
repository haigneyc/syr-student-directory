/**
 * Affiliate link tracking utilities
 *
 * This module provides utilities for tracking affiliate link clicks
 * and appending affiliate parameters to external URLs
 */

// Common affiliate programs and their parameter names
const AFFILIATE_PARAMS: Record<string, string> = {
  'amazon.com': 'tag',
  'amazon.co.uk': 'tag',
  'spotify.com': 'ref',
  'apple.com': 'at',
  'bestbuy.com': 'ref',
  'target.com': 'aflt',
};

interface AffiliateConfig {
  amazonTag?: string;
  spotifyRef?: string;
  appleAt?: string;
}

// Get affiliate config from environment
function getAffiliateConfig(): AffiliateConfig {
  return {
    amazonTag: process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_TAG,
    spotifyRef: process.env.NEXT_PUBLIC_SPOTIFY_REF,
    appleAt: process.env.NEXT_PUBLIC_APPLE_AFFILIATE_TOKEN,
  };
}

/**
 * Add affiliate parameters to a URL if applicable
 */
export function addAffiliateParams(url: string): string {
  if (!url) return url;

  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.replace('www.', '');
    const config = getAffiliateConfig();

    // Amazon affiliate
    if (hostname.includes('amazon.') && config.amazonTag) {
      urlObj.searchParams.set('tag', config.amazonTag);
    }

    // Spotify affiliate
    if (hostname.includes('spotify.') && config.spotifyRef) {
      urlObj.searchParams.set('ref', config.spotifyRef);
    }

    // Apple affiliate
    if (hostname.includes('apple.') && config.appleAt) {
      urlObj.searchParams.set('at', config.appleAt);
    }

    return urlObj.toString();
  } catch {
    // If URL parsing fails, return original
    return url;
  }
}

/**
 * Track an affiliate link click
 */
export function trackAffiliateClick(
  dealSlug: string,
  businessName: string,
  destinationUrl: string
): void {
  // Send to Google Analytics if available
  if (typeof window !== 'undefined' && 'gtag' in window) {
    const gtag = window.gtag as (
      command: string,
      action: string,
      params: Record<string, unknown>
    ) => void;

    gtag('event', 'affiliate_click', {
      event_category: 'Affiliate',
      event_label: businessName,
      deal_slug: dealSlug,
      destination: destinationUrl,
    });
  }

  // Log for debugging in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Affiliate click:', { dealSlug, businessName, destinationUrl });
  }
}

/**
 * Check if a URL is an affiliate link (external with known affiliate program)
 */
export function isAffiliateLink(url: string): boolean {
  if (!url) return false;

  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.replace('www.', '');

    return Object.keys(AFFILIATE_PARAMS).some((domain) =>
      hostname.includes(domain.split('.')[0])
    );
  } catch {
    return false;
  }
}
