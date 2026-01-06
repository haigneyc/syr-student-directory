'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { trackSubmissionStarted, trackSubmissionCompleted } from '@/lib/analytics';

type SubmitterType = 'student' | 'business';
type Eligibility = 'syracuse' | 'all_college' | 'high_school_college' | 'other';
type Availability = 'anytime' | 'certain_days' | 'limited_time';
type FeaturedInterest = 'yes' | 'maybe' | 'no';

interface BusinessFormData {
  // Section 1: Business Information
  businessName: string;
  website: string;
  address: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  // Section 2: Discount Details
  discountDescription: string;
  eligibility: Eligibility;
  eligibilityOther: string;
  redemptionMethods: string[];
  redemptionOther: string;
  availability: Availability;
  availabilityDetails: string;
  // Section 3: Terms
  restrictions: string;
  startDate: string;
  hasExpiration: boolean;
  expirationDate: string;
  // Section 4: Enhancements
  interestedFeatured: FeaturedInterest;
  interestedNotifications: boolean;
  // Section 5: Confirmation
  permissionGranted: boolean;
  referralSource: string;
  additionalNotes: string;
}

interface StudentFormData {
  businessName: string;
  dealDescription: string;
  category: string;
  location: string;
  email: string;
}

const initialBusinessForm: BusinessFormData = {
  businessName: '',
  website: '',
  address: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  discountDescription: '',
  eligibility: 'syracuse',
  eligibilityOther: '',
  redemptionMethods: [],
  redemptionOther: '',
  availability: 'anytime',
  availabilityDetails: '',
  restrictions: '',
  startDate: '',
  hasExpiration: false,
  expirationDate: '',
  interestedFeatured: 'maybe',
  interestedNotifications: false,
  permissionGranted: false,
  referralSource: '',
  additionalNotes: '',
};

const initialStudentForm: StudentFormData = {
  businessName: '',
  dealDescription: '',
  category: '',
  location: '',
  email: '',
};

export default function SubmitPage() {
  const [submitterType, setSubmitterType] = useState<SubmitterType>('business');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [businessForm, setBusinessForm] = useState<BusinessFormData>(initialBusinessForm);
  const [studentForm, setStudentForm] = useState<StudentFormData>(initialStudentForm);
  const hasTrackedStart = useRef(false);

  // Track when user starts filling form (on first input focus)
  const handleFormInteraction = () => {
    if (!hasTrackedStart.current) {
      hasTrackedStart.current = true;
      trackSubmissionStarted(submitterType);
    }
  };

  // Reset tracking when switching between student/business
  useEffect(() => {
    hasTrackedStart.current = false;
  }, [submitterType]);

  const handleBusinessChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setBusinessForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setBusinessForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRedemptionMethodChange = (method: string, checked: boolean) => {
    setBusinessForm((prev) => ({
      ...prev,
      redemptionMethods: checked
        ? [...prev.redemptionMethods, method]
        : prev.redemptionMethods.filter((m) => m !== method),
    }));
  };

  const handleStudentChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setStudentForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload =
        submitterType === 'business'
          ? { ...businessForm, submitterType: 'business' }
          : { ...studentForm, submitterType: 'student' };

      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      // Track successful submission
      trackSubmissionCompleted(submitterType);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your deal. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8">
          <span className="text-5xl mb-4 block">🎉</span>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Thank You for Submitting!
          </h1>
          <p className="text-gray-600 mb-4">
            We typically verify and publish listings within 3–5 business days.
          </p>
          <p className="text-gray-600 mb-6">
            If we need clarification, we&apos;ll reach out using the contact
            information you provided. We appreciate your support of local students!
          </p>
          <Link
            href="/"
            className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header - Business Value Proposition */}
      {submitterType === 'business' && (
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Business Submission Form
          </h1>
          <p className="text-xl text-orange-600 font-medium mb-4">
            Reach Syracuse University students with a verified discount
          </p>
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-4 text-left">
            <p className="text-gray-700 text-sm mb-3">
              We run a local directory that highlights exclusive student discounts for
              Syracuse University and nearby college students.
            </p>
            <p className="text-gray-700 text-sm mb-3">
              <strong>Submitting a deal is free.</strong> We verify all listings and
              feature them on our website so students can easily discover and use them.
            </p>
            <p className="text-gray-700 text-sm font-medium">You&apos;ll also receive:</p>
            <ul className="text-gray-600 text-sm mt-1 ml-4 list-disc">
              <li>A shareable link to your listing</li>
              <li>Optional opportunities for featured placement</li>
            </ul>
          </div>
          <p className="text-sm text-gray-500">
            ⏱️ Average submission time: 3–5 minutes
          </p>
        </div>
      )}

      {/* Header - Student */}
      {submitterType === 'student' && (
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit a Deal</h1>
          <p className="text-gray-600">
            Know a student discount? Share it with the Syracuse community!
          </p>
        </div>
      )}

      {/* Submitter Type Toggle */}
      <div className="flex gap-2 mb-8 p-1 bg-gray-100 rounded-lg">
        <button
          type="button"
          onClick={() => setSubmitterType('student')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            submitterType === 'student'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          I&apos;m a Student
        </button>
        <button
          type="button"
          onClick={() => setSubmitterType('business')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            submitterType === 'business'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          I&apos;m a Business
        </button>
      </div>

      <form onSubmit={handleSubmit} onFocus={handleFormInteraction} className="space-y-6">
        {/* ========== BUSINESS FORM ========== */}
        {submitterType === 'business' && (
          <>
            {/* Section 1: Business Information */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                1. Business Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    value={businessForm.businessName}
                    onChange={handleBusinessChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                    Business Website
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={businessForm.website}
                    onChange={handleBusinessChange}
                    placeholder="https://yourbusiness.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Business Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={businessForm.address}
                    onChange={handleBusinessChange}
                    required
                    placeholder="123 Marshall St, Syracuse, NY 13210"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">
                    Primary Contact Name *
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    value={businessForm.contactName}
                    onChange={handleBusinessChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Email *
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    value={businessForm.contactEmail}
                    onChange={handleBusinessChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Used only for verification and updates — not shared or spammed.
                  </p>
                </div>

                <div>
                  <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Phone Number
                  </label>
                  <input
                    type="tel"
                    id="contactPhone"
                    name="contactPhone"
                    value={businessForm.contactPhone}
                    onChange={handleBusinessChange}
                    placeholder="(315) 555-0100"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Student Discount Details */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                2. Student Discount Details
              </h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="discountDescription" className="block text-sm font-medium text-gray-700 mb-1">
                    What student discount are you offering? *
                  </label>
                  <textarea
                    id="discountDescription"
                    name="discountDescription"
                    value={businessForm.discountDescription}
                    onChange={handleBusinessChange}
                    required
                    rows={3}
                    placeholder='Example: "10% off entire purchase" or "Free drink with entrée"'
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Who is eligible for this discount? *
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: 'syracuse', label: 'Syracuse University students' },
                      { value: 'all_college', label: 'All college students' },
                      { value: 'high_school_college', label: 'High school + college students' },
                      { value: 'other', label: 'Other (please specify)' },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="eligibility"
                          value={option.value}
                          checked={businessForm.eligibility === option.value}
                          onChange={handleBusinessChange}
                          className="text-orange-600 focus:ring-orange-500"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                  {businessForm.eligibility === 'other' && (
                    <input
                      type="text"
                      name="eligibilityOther"
                      value={businessForm.eligibilityOther}
                      onChange={handleBusinessChange}
                      placeholder="Please specify eligibility"
                      className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How do students redeem this discount? *
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: 'show_id', label: 'Show valid student ID in person' },
                      { value: 'promo_code', label: 'Use a promo code online' },
                      { value: 'mention', label: 'Mention the deal at checkout' },
                      { value: 'other', label: 'Other (please explain)' },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={businessForm.redemptionMethods.includes(option.value)}
                          onChange={(e) =>
                            handleRedemptionMethodChange(option.value, e.target.checked)
                          }
                          className="text-orange-600 focus:ring-orange-500 rounded"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                  {businessForm.redemptionMethods.includes('other') && (
                    <input
                      type="text"
                      name="redemptionOther"
                      value={businessForm.redemptionOther}
                      onChange={handleBusinessChange}
                      placeholder="Please explain redemption method"
                      className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Is this discount available at all times? *
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: 'anytime', label: 'Yes, anytime' },
                      { value: 'certain_days', label: 'Only on certain days/times' },
                      { value: 'limited_time', label: 'Limited-time promotion' },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="availability"
                          value={option.value}
                          checked={businessForm.availability === option.value}
                          onChange={handleBusinessChange}
                          className="text-orange-600 focus:ring-orange-500"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                  {businessForm.availability !== 'anytime' && (
                    <input
                      type="text"
                      name="availabilityDetails"
                      value={businessForm.availabilityDetails}
                      onChange={handleBusinessChange}
                      placeholder="Please specify days, times, or promotion details"
                      className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Section 3: Terms & Verification */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                3. Terms & Verification
              </h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="restrictions" className="block text-sm font-medium text-gray-700 mb-1">
                    Are there any restrictions or exclusions?
                  </label>
                  <textarea
                    id="restrictions"
                    name="restrictions"
                    value={businessForm.restrictions}
                    onChange={handleBusinessChange}
                    rows={2}
                    placeholder='Examples: "Not valid with other promotions", "Dine-in only"'
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                    When would you like this deal to start?
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={businessForm.startDate}
                    onChange={handleBusinessChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Does this deal have an expiration date?
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="hasExpiration"
                        checked={!businessForm.hasExpiration}
                        onChange={() =>
                          setBusinessForm((prev) => ({ ...prev, hasExpiration: false }))
                        }
                        className="text-orange-600 focus:ring-orange-500"
                      />
                      <span className="text-sm text-gray-700">No expiration</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="hasExpiration"
                        checked={businessForm.hasExpiration}
                        onChange={() =>
                          setBusinessForm((prev) => ({ ...prev, hasExpiration: true }))
                        }
                        className="text-orange-600 focus:ring-orange-500"
                      />
                      <span className="text-sm text-gray-700">Yes (please specify)</span>
                    </label>
                  </div>
                  {businessForm.hasExpiration && (
                    <input
                      type="date"
                      name="expirationDate"
                      value={businessForm.expirationDate}
                      onChange={handleBusinessChange}
                      className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Section 4: Listing Enhancements (Monetization Seed) */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                4. Listing Enhancements
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                These options are optional and can be discussed later. Submitting a deal
                does not require payment.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Would you be interested in optional featured placement?
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: 'yes', label: 'Yes, tell me more' },
                      { value: 'maybe', label: 'Maybe later' },
                      { value: 'no', label: 'No' },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="interestedFeatured"
                          value={option.value}
                          checked={businessForm.interestedFeatured === option.value}
                          onChange={handleBusinessChange}
                          className="text-orange-600 focus:ring-orange-500"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Would you like us to notify you when students view or click your listing?
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="interestedNotifications"
                        checked={businessForm.interestedNotifications}
                        onChange={() =>
                          setBusinessForm((prev) => ({
                            ...prev,
                            interestedNotifications: true,
                          }))
                        }
                        className="text-orange-600 focus:ring-orange-500"
                      />
                      <span className="text-sm text-gray-700">Yes</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="interestedNotifications"
                        checked={!businessForm.interestedNotifications}
                        onChange={() =>
                          setBusinessForm((prev) => ({
                            ...prev,
                            interestedNotifications: false,
                          }))
                        }
                        className="text-orange-600 focus:ring-orange-500"
                      />
                      <span className="text-sm text-gray-700">No</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5: Confirmation & Permission */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                5. Confirmation & Permission
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="permissionGranted"
                      checked={businessForm.permissionGranted}
                      onChange={handleBusinessChange}
                      required
                      className="mt-1 text-orange-600 focus:ring-orange-500 rounded"
                    />
                    <span className="text-sm text-gray-700">
                      I give permission for this deal to be displayed on Cuse Student Deals
                      and in marketing materials. *
                    </span>
                  </label>
                </div>

                <div>
                  <label htmlFor="referralSource" className="block text-sm font-medium text-gray-700 mb-1">
                    How did you hear about us?
                  </label>
                  <input
                    type="text"
                    id="referralSource"
                    name="referralSource"
                    value={businessForm.referralSource}
                    onChange={handleBusinessChange}
                    placeholder="e.g., Another business, Google, social media"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 mb-1">
                    Anything else we should know?
                  </label>
                  <textarea
                    id="additionalNotes"
                    name="additionalNotes"
                    value={businessForm.additionalNotes}
                    onChange={handleBusinessChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {/* ========== STUDENT FORM ========== */}
        {submitterType === 'student' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="studentBusinessName" className="block text-sm font-medium text-gray-700 mb-1">
                  Business Name *
                </label>
                <input
                  type="text"
                  id="studentBusinessName"
                  name="businessName"
                  value={studentForm.businessName}
                  onChange={handleStudentChange}
                  required
                  placeholder="e.g., Varsity Pizza"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="studentDealDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  Deal Description *
                </label>
                <textarea
                  id="studentDealDescription"
                  name="dealDescription"
                  value={studentForm.dealDescription}
                  onChange={handleStudentChange}
                  required
                  rows={4}
                  placeholder="Describe the discount (e.g., 15% off with student ID, valid weekdays only)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="studentCategory" className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  id="studentCategory"
                  name="category"
                  value={studentForm.category}
                  onChange={handleStudentChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select a category</option>
                  <option value="food">Food & Drink</option>
                  <option value="retail">Retail</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="services">Services</option>
                  <option value="online">Online</option>
                </select>
              </div>

              <div>
                <label htmlFor="studentLocation" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  id="studentLocation"
                  name="location"
                  value={studentForm.location}
                  onChange={handleStudentChange}
                  placeholder="e.g., Marshall Street, Downtown Syracuse"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="studentEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Email *
                </label>
                <input
                  type="email"
                  id="studentEmail"
                  name="email"
                  value={studentForm.email}
                  onChange={handleStudentChange}
                  required
                  placeholder="your@syr.edu"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  We&apos;ll only contact you if we need more information.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || (submitterType === 'business' && !businessForm.permissionGranted)}
          className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Deal'}
        </button>

        <p className="text-center text-sm text-gray-500">
          By submitting, you confirm this is a real student discount.
        </p>
      </form>
    </div>
  );
}
