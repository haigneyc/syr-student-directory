'use client';

import { useState } from 'react';
import Link from 'next/link';

type SubmitterType = 'student' | 'business';

export default function SubmitPage() {
  const [submitterType, setSubmitterType] = useState<SubmitterType>('student');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call - replace with actual API call later
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8">
          <span className="text-5xl mb-4 block">🎉</span>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Thanks for Submitting!
          </h1>
          <p className="text-gray-600 mb-6">
            We&apos;ll review your submission and verify the deal. Once approved,
            it will appear on the site within 24-48 hours.
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
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit a Deal</h1>
        <p className="text-gray-600">
          Know a student discount? Share it with the Syracuse community!
        </p>
      </div>

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

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          {/* Business Name */}
          <div className="mb-6">
            <label
              htmlFor="businessName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Business Name *
            </label>
            <input
              type="text"
              id="businessName"
              name="businessName"
              required
              placeholder="e.g., Varsity Pizza"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Deal Description */}
          <div className="mb-6">
            <label
              htmlFor="dealDescription"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Deal Description *
            </label>
            <textarea
              id="dealDescription"
              name="dealDescription"
              required
              rows={4}
              placeholder="Describe the discount (e.g., 15% off with student ID, valid weekdays only)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Category */}
          <div className="mb-6">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category *
            </label>
            <select
              id="category"
              name="category"
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

          {/* Location (for student submissions) */}
          {submitterType === 'student' && (
            <div className="mb-6">
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Location (optional)
              </label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="e.g., Marshall Street, Downtown Syracuse"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          )}

          {/* Business-specific fields */}
          {submitterType === 'business' && (
            <>
              <div className="mb-6">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Business Address *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  placeholder="123 Marshall St, Syracuse, NY 13210"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="(315) 555-0100"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="website"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Website
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  placeholder="https://yourbusiness.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </>
          )}

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Your Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="your@email.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              We&apos;ll only contact you if we need more information.
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
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
