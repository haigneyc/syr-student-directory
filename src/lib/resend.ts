// Resend email client for transactional emails
// Used for: submission confirmations, admin notifications, deal approvals

import { Resend } from 'resend';

// Initialize Resend client
const resendApiKey = process.env.RESEND_API_KEY;

// Create client only if API key is available
export const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Email configuration
export const EMAIL_CONFIG = {
  // From addresses - use verified domain or Resend's onboarding address
  from: {
    noreply: 'Cuse Student Deals <noreply@orangediscounts.com>',
    // Fallback for development/testing without verified domain
    onboarding: 'Cuse Student Deals <onboarding@resend.dev>',
  },
  // Admin email for notifications
  adminEmail: process.env.ADMIN_EMAIL || 'syrAIcuse.automation@gmail.com',
  // Site info for emails
  siteName: 'Cuse Student Deals',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://orangediscounts.com',
} as const;

/**
 * Check if Resend is configured and ready to send emails
 */
export function isResendConfigured(): boolean {
  return !!resend;
}

/**
 * Get the appropriate "from" address
 * Uses verified domain if available, falls back to Resend onboarding address
 */
export function getFromAddress(): string {
  // In production with verified domain, use the real address
  // Otherwise use Resend's onboarding address for testing
  const useVerifiedDomain = process.env.RESEND_DOMAIN_VERIFIED === 'true';
  return useVerifiedDomain
    ? EMAIL_CONFIG.from.noreply
    : EMAIL_CONFIG.from.onboarding;
}

// Email types for type safety
export interface SubmissionConfirmationData {
  recipientEmail: string;
  recipientName: string;
  businessName: string;
  submitterType: 'student' | 'business';
}

export interface AdminNotificationData {
  businessName: string;
  contactName?: string;
  contactEmail: string;
  dealDescription: string;
  submitterType: 'student' | 'business';
  address?: string;
  submittedAt: string;
}

/**
 * Send submission confirmation email to the submitter
 */
export async function sendSubmissionConfirmation(
  data: SubmissionConfirmationData
): Promise<{ success: boolean; error?: string }> {
  if (!resend) {
    console.log('[Resend] Not configured - skipping submission confirmation email');
    return { success: false, error: 'Resend not configured' };
  }

  const { recipientEmail, recipientName, businessName, submitterType } = data;
  const isBusinessSubmission = submitterType === 'business';

  try {
    const { error } = await resend.emails.send({
      from: getFromAddress(),
      to: recipientEmail,
      subject: `We received your deal submission for ${businessName}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); padding: 30px; border-radius: 8px 8px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 24px;">🎓 ${EMAIL_CONFIG.siteName}</h1>
  </div>

  <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
    <h2 style="color: #1f2937; margin-top: 0;">Thank you for your submission!</h2>

    <p>Hi${recipientName ? ` ${recipientName}` : ''},</p>

    <p>We've received your ${isBusinessSubmission ? 'deal listing' : 'deal tip'} for <strong>${businessName}</strong>.</p>

    <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="margin-top: 0; color: #374151;">What happens next?</h3>
      <ul style="margin: 0; padding-left: 20px; color: #4b5563;">
        <li>Our team will review your submission within <strong>3-5 business days</strong></li>
        <li>We'll verify the deal details${isBusinessSubmission ? ' and may reach out if we have questions' : ''}</li>
        <li>Once approved, the deal will be live on our site</li>
      </ul>
    </div>

    ${isBusinessSubmission ? `
    <p style="color: #6b7280; font-size: 14px;">
      Interested in a featured listing? We'll follow up with more information about premium placement options.
    </p>
    ` : ''}

    <p>Questions? Reply to this email or contact us at <a href="mailto:${EMAIL_CONFIG.adminEmail}" style="color: #f97316;">${EMAIL_CONFIG.adminEmail}</a></p>

    <p style="margin-bottom: 0;">Thanks for helping Syracuse students save money!</p>
    <p style="color: #6b7280; margin-top: 5px;">— The ${EMAIL_CONFIG.siteName} Team</p>
  </div>

  <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
    <p style="margin: 0;">
      <a href="${EMAIL_CONFIG.siteUrl}" style="color: #f97316; text-decoration: none;">${EMAIL_CONFIG.siteName}</a>
    </p>
    <p style="margin: 5px 0 0 0;">Helping Syracuse students find the best local deals</p>
  </div>
</body>
</html>
      `.trim(),
      text: `
Thank you for your submission!

Hi${recipientName ? ` ${recipientName}` : ''},

We've received your ${isBusinessSubmission ? 'deal listing' : 'deal tip'} for ${businessName}.

What happens next?
- Our team will review your submission within 3-5 business days
- We'll verify the deal details${isBusinessSubmission ? ' and may reach out if we have questions' : ''}
- Once approved, the deal will be live on our site

Questions? Contact us at ${EMAIL_CONFIG.adminEmail}

Thanks for helping Syracuse students save money!
— The ${EMAIL_CONFIG.siteName} Team

${EMAIL_CONFIG.siteUrl}
      `.trim(),
    });

    if (error) {
      console.error('[Resend] Failed to send submission confirmation:', error);
      return { success: false, error: error.message };
    }

    console.log('[Resend] Submission confirmation sent to:', recipientEmail);
    return { success: true };
  } catch (err) {
    console.error('[Resend] Error sending submission confirmation:', err);
    return { success: false, error: String(err) };
  }
}

/**
 * Send admin notification when a new deal is submitted
 */
export async function sendAdminNotification(
  data: AdminNotificationData
): Promise<{ success: boolean; error?: string }> {
  if (!resend) {
    console.log('[Resend] Not configured - skipping admin notification email');
    return { success: false, error: 'Resend not configured' };
  }

  const {
    businessName,
    contactName,
    contactEmail,
    dealDescription,
    submitterType,
    address,
    submittedAt,
  } = data;

  const isBusinessSubmission = submitterType === 'business';

  try {
    const { error } = await resend.emails.send({
      from: getFromAddress(),
      to: EMAIL_CONFIG.adminEmail,
      subject: `🆕 New ${isBusinessSubmission ? 'Business' : 'Student'} Submission: ${businessName}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: ${isBusinessSubmission ? '#059669' : '#3b82f6'}; padding: 20px; border-radius: 8px 8px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 20px;">
      ${isBusinessSubmission ? '🏢 New Business Submission' : '👤 New Student Tip'}
    </h1>
  </div>

  <div style="background: #ffffff; padding: 25px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
    <h2 style="color: #1f2937; margin-top: 0; margin-bottom: 20px;">${businessName}</h2>

    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px 0; color: #6b7280; width: 120px;">Contact:</td>
        <td style="padding: 8px 0;">${contactName || 'Not provided'}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #6b7280;">Email:</td>
        <td style="padding: 8px 0;"><a href="mailto:${contactEmail}" style="color: #f97316;">${contactEmail}</a></td>
      </tr>
      ${address ? `
      <tr>
        <td style="padding: 8px 0; color: #6b7280;">Address:</td>
        <td style="padding: 8px 0;">${address}</td>
      </tr>
      ` : ''}
      <tr>
        <td style="padding: 8px 0; color: #6b7280;">Submitted:</td>
        <td style="padding: 8px 0;">${new Date(submittedAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</td>
      </tr>
    </table>

    <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin-top: 20px;">
      <h3 style="margin: 0 0 10px 0; color: #374151; font-size: 14px;">Deal Description:</h3>
      <p style="margin: 0; color: #4b5563;">${dealDescription}</p>
    </div>

    <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
      <p style="margin: 0; color: #6b7280; font-size: 14px;">
        Review this submission in the admin dashboard or reply directly to the submitter.
      </p>
    </div>
  </div>
</body>
</html>
      `.trim(),
      text: `
New ${isBusinessSubmission ? 'Business' : 'Student'} Submission: ${businessName}

Contact: ${contactName || 'Not provided'}
Email: ${contactEmail}
${address ? `Address: ${address}` : ''}
Submitted: ${new Date(submittedAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}

Deal Description:
${dealDescription}

Review this submission in the admin dashboard.
      `.trim(),
    });

    if (error) {
      console.error('[Resend] Failed to send admin notification:', error);
      return { success: false, error: error.message };
    }

    console.log('[Resend] Admin notification sent for:', businessName);
    return { success: true };
  } catch (err) {
    console.error('[Resend] Error sending admin notification:', err);
    return { success: false, error: String(err) };
  }
}
