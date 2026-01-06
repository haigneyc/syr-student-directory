import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      businessName,
      dealDescription,
      category,
      email,
      source,
      // Business-specific fields
      address,
      phone,
      website,
      // Student-specific fields
      location,
    } = body;

    // Validate required fields
    if (!businessName || !dealDescription || !category || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // In production, this would save to Supabase
    // For now, just log the submission
    console.log('New submission:', {
      businessName,
      dealDescription,
      category,
      email,
      source: source || 'student',
      address,
      phone,
      website,
      location,
      submittedAt: new Date().toISOString(),
    });

    // TODO: Send notification email to admin
    // TODO: Add to Supabase submissions table

    return NextResponse.json(
      { success: true, message: 'Submission received' },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    );
  }
}
