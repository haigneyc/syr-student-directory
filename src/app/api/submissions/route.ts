import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import {
  checkRateLimit,
  getClientIdentifier,
  createRateLimitHeaders,
  SUBMISSION_RATE_LIMIT,
} from '@/lib/rate-limit';
import {
  sendSubmissionConfirmation,
  sendAdminNotification,
  isResendConfigured,
} from '@/lib/resend';

interface StudentSubmission {
  submitterType: 'student';
  businessName: string;
  dealDescription: string;
  category: string;
  location?: string;
  email: string;
}

interface BusinessSubmission {
  submitterType: 'business';
  // Section 1: Business Information
  businessName: string;
  website?: string;
  address: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  // Section 2: Discount Details
  discountDescription: string;
  eligibility: 'syracuse' | 'all_college' | 'high_school_college' | 'other';
  eligibilityOther?: string;
  redemptionMethods: string[];
  redemptionOther?: string;
  availability: 'anytime' | 'certain_days' | 'limited_time';
  availabilityDetails?: string;
  // Section 3: Terms
  restrictions?: string;
  startDate?: string;
  hasExpiration: boolean;
  expirationDate?: string;
  // Section 4: Enhancements
  interestedFeatured: 'yes' | 'maybe' | 'no';
  interestedNotifications: boolean;
  // Section 5: Confirmation
  permissionGranted: boolean;
  referralSource?: string;
  additionalNotes?: string;
}

type SubmissionPayload = StudentSubmission | BusinessSubmission;

export async function POST(request: NextRequest) {
  // Rate limit check to prevent spam submissions
  const identifier = getClientIdentifier(request);
  const rateLimitResult = checkRateLimit(identifier, 'submissions', SUBMISSION_RATE_LIMIT);

  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { error: 'Too many submissions. Please try again later.' },
      {
        status: 429,
        headers: createRateLimitHeaders(rateLimitResult),
      }
    );
  }

  try {
    const body: SubmissionPayload = await request.json();

    // Validate based on submitter type
    if (body.submitterType === 'student') {
      const { businessName, dealDescription, category, email } = body;
      if (!businessName || !dealDescription || !category || !email) {
        return NextResponse.json(
          { error: 'Missing required fields for student submission' },
          { status: 400 }
        );
      }
    } else if (body.submitterType === 'business') {
      const {
        businessName,
        address,
        contactName,
        contactEmail,
        discountDescription,
        permissionGranted,
      } = body;
      if (
        !businessName ||
        !address ||
        !contactName ||
        !contactEmail ||
        !discountDescription ||
        !permissionGranted
      ) {
        return NextResponse.json(
          { error: 'Missing required fields for business submission' },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { error: 'Invalid submitter type' },
        { status: 400 }
      );
    }

    // Prepare the database record
    const submissionRecord = body.submitterType === 'student'
      ? {
          submitter_type: 'student',
          business_name: body.businessName,
          deal_description: body.dealDescription,
          category: body.category,
          location: body.location || null,
          email: body.email,
          status: 'pending',
          submitted_at: new Date().toISOString(),
        }
      : {
          submitter_type: 'business',
          business_name: body.businessName,
          website: body.website || null,
          address: body.address,
          contact_name: body.contactName,
          contact_email: body.contactEmail,
          contact_phone: body.contactPhone || null,
          deal_description: body.discountDescription,
          eligibility: body.eligibility,
          eligibility_other: body.eligibilityOther || null,
          redemption_methods: body.redemptionMethods,
          redemption_other: body.redemptionOther || null,
          availability: body.availability,
          availability_details: body.availabilityDetails || null,
          restrictions: body.restrictions || null,
          start_date: body.startDate || null,
          has_expiration: body.hasExpiration,
          expiration_date: body.expirationDate || null,
          interested_featured: body.interestedFeatured,
          interested_notifications: body.interestedNotifications,
          permission_granted: body.permissionGranted,
          referral_source: body.referralSource || null,
          additional_notes: body.additionalNotes || null,
          status: 'pending',
          submitted_at: new Date().toISOString(),
        };

    // Try to save to Supabase if available
    try {
      const supabase = createServerClient();
      const { error } = await supabase
        .from('submissions')
        .insert(submissionRecord);

      if (error) {
        console.error('Supabase insert error:', error);
        // Fall through to success response - we'll log the submission
      }
    } catch (dbError) {
      // Database not available, log the submission for manual processing
      console.log('Database unavailable. Submission logged:', submissionRecord);
    }

    // Log the submission for tracking
    const submittedAt = new Date().toISOString();
    const recipientEmail = body.submitterType === 'student' ? body.email : body.contactEmail;
    const recipientName = body.submitterType === 'business' ? body.contactName : undefined;

    console.log('New submission received:', {
      type: body.submitterType,
      businessName: body.businessName,
      email: recipientEmail,
      submittedAt,
    });

    // Send confirmation and notification emails (non-blocking)
    if (isResendConfigured()) {
      // Send confirmation to submitter
      sendSubmissionConfirmation({
        recipientEmail,
        recipientName: recipientName || '',
        businessName: body.businessName,
        submitterType: body.submitterType,
      }).catch((err) => {
        console.error('Failed to send submission confirmation:', err);
      });

      // Send notification to admin
      sendAdminNotification({
        businessName: body.businessName,
        contactName: body.submitterType === 'business' ? body.contactName : undefined,
        contactEmail: recipientEmail,
        dealDescription: body.submitterType === 'student' ? body.dealDescription : body.discountDescription,
        submitterType: body.submitterType,
        address: body.submitterType === 'business' ? body.address : body.location,
        submittedAt,
      }).catch((err) => {
        console.error('Failed to send admin notification:', err);
      });
    }

    return NextResponse.json(
      { success: true, message: 'Submission received successfully' },
      {
        status: 201,
        headers: createRateLimitHeaders(rateLimitResult),
      }
    );
  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    );
  }
}
