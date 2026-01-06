/**
 * Google Analytics event tracking utilities
 *
 * Events tracked:
 * - deal_view: When a user views a deal detail page
 * - deal_click: When a user clicks on a deal card
 * - affiliate_click: When a user clicks an affiliate/external link
 * - submission_started: When a user starts filling the submission form
 * - newsletter_signup: When a user subscribes to the newsletter
 * - category_view: When a user views a category page
 */

declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'js',
      action: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

type EventName =
  | 'deal_view'
  | 'deal_click'
  | 'affiliate_click'
  | 'submission_started'
  | 'submission_completed'
  | 'newsletter_signup'
  | 'category_view'
  | 'search';

interface EventParams {
  deal_slug?: string;
  deal_title?: string;
  business_name?: string;
  category_slug?: string;
  category_name?: string;
  affiliate_url?: string;
  submitter_type?: 'student' | 'business';
  search_query?: string;
  [key: string]: unknown;
}

/**
 * Track a custom event in Google Analytics
 */
export function trackEvent(eventName: EventName, params?: EventParams): void {
  if (typeof window === 'undefined' || !window.gtag) {
    // GA not loaded or SSR
    return;
  }

  window.gtag('event', eventName, {
    ...params,
    send_to: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  });
}

/**
 * Track when a user views a deal detail page
 */
export function trackDealView(
  dealSlug: string,
  dealTitle: string,
  businessName: string,
  categoryName: string
): void {
  trackEvent('deal_view', {
    deal_slug: dealSlug,
    deal_title: dealTitle,
    business_name: businessName,
    category_name: categoryName,
  });
}

/**
 * Track when a user clicks on a deal card
 */
export function trackDealClick(
  dealSlug: string,
  dealTitle: string,
  businessName: string
): void {
  trackEvent('deal_click', {
    deal_slug: dealSlug,
    deal_title: dealTitle,
    business_name: businessName,
  });
}

/**
 * Track when a user clicks an affiliate link
 * Note: This is also called from AffiliateLink component via trackAffiliateClick in affiliate.ts
 */
export function trackAffiliateClickEvent(
  dealSlug: string,
  businessName: string,
  affiliateUrl: string
): void {
  trackEvent('affiliate_click', {
    deal_slug: dealSlug,
    business_name: businessName,
    affiliate_url: affiliateUrl,
  });
}

/**
 * Track when a user starts the submission form
 */
export function trackSubmissionStarted(submitterType: 'student' | 'business'): void {
  trackEvent('submission_started', {
    submitter_type: submitterType,
  });
}

/**
 * Track when a user completes a submission
 */
export function trackSubmissionCompleted(submitterType: 'student' | 'business'): void {
  trackEvent('submission_completed', {
    submitter_type: submitterType,
  });
}

/**
 * Track newsletter signup
 */
export function trackNewsletterSignup(): void {
  trackEvent('newsletter_signup');
}

/**
 * Track category page view
 */
export function trackCategoryView(categorySlug: string, categoryName: string): void {
  trackEvent('category_view', {
    category_slug: categorySlug,
    category_name: categoryName,
  });
}

/**
 * Track search query
 */
export function trackSearch(query: string): void {
  trackEvent('search', {
    search_query: query,
  });
}
