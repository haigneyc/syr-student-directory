// Beehiiv API client for newsletter subscriptions
// Used for: student newsletter signups, marketing emails

const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY;
const BEEHIIV_PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID;

// Beehiiv API base URL
const BEEHIIV_API_URL = 'https://api.beehiiv.com/v2';

/**
 * Check if Beehiiv is configured
 */
export function isBeehiivConfigured(): boolean {
  return !!(BEEHIIV_API_KEY && BEEHIIV_PUBLICATION_ID);
}

/**
 * Subscribe an email to the newsletter
 */
export async function subscribeToNewsletter(
  email: string,
  options?: {
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    referringSite?: string;
    customFields?: Record<string, string>;
  }
): Promise<{ success: boolean; error?: string; subscriberId?: string }> {
  if (!isBeehiivConfigured()) {
    console.log('[Beehiiv] Not configured - skipping newsletter subscription');
    return { success: false, error: 'Beehiiv not configured' };
  }

  try {
    const response = await fetch(
      `${BEEHIIV_API_URL}/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${BEEHIIV_API_KEY}`,
        },
        body: JSON.stringify({
          email,
          reactivate_existing: true,
          send_welcome_email: true,
          utm_source: options?.utmSource || 'website',
          utm_medium: options?.utmMedium || 'footer_signup',
          utm_campaign: options?.utmCampaign,
          referring_site: options?.referringSite || 'orangediscounts.com',
          custom_fields: options?.customFields,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData.message || errorData.error || `HTTP ${response.status}`;
      console.error('[Beehiiv] Subscription failed:', errorMessage);

      // Check for specific errors
      if (response.status === 409) {
        // Already subscribed - this is actually fine
        return { success: true, error: 'Already subscribed' };
      }

      return { success: false, error: errorMessage };
    }

    const data = await response.json();
    console.log('[Beehiiv] Successfully subscribed:', email);
    return { success: true, subscriberId: data.data?.id };
  } catch (err) {
    console.error('[Beehiiv] Error subscribing:', err);
    return { success: false, error: String(err) };
  }
}

/**
 * Check if an email is already subscribed
 */
export async function checkSubscription(
  email: string
): Promise<{ subscribed: boolean; status?: string; error?: string }> {
  if (!isBeehiivConfigured()) {
    return { subscribed: false, error: 'Beehiiv not configured' };
  }

  try {
    const response = await fetch(
      `${BEEHIIV_API_URL}/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions?email=${encodeURIComponent(email)}`,
      {
        headers: {
          Authorization: `Bearer ${BEEHIIV_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      return { subscribed: false, error: `HTTP ${response.status}` };
    }

    const data = await response.json();
    const subscription = data.data?.[0];

    if (subscription) {
      return {
        subscribed: true,
        status: subscription.status, // 'active', 'inactive', etc.
      };
    }

    return { subscribed: false };
  } catch (err) {
    console.error('[Beehiiv] Error checking subscription:', err);
    return { subscribed: false, error: String(err) };
  }
}
