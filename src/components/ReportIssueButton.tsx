'use client';

import { useState, FormEvent } from 'react';

interface ReportIssueButtonProps {
  dealSlug: string;
  businessName: string;
}

type IssueType =
  | 'expired'
  | 'incorrect_discount'
  | 'business_closed'
  | 'wrong_info'
  | 'other';

const issueTypes: { value: IssueType; label: string }[] = [
  { value: 'expired', label: 'Deal has expired' },
  { value: 'incorrect_discount', label: 'Discount amount is wrong' },
  { value: 'business_closed', label: 'Business is closed' },
  { value: 'wrong_info', label: 'Business info is incorrect' },
  { value: 'other', label: 'Other issue' },
];

export default function ReportIssueButton({
  dealSlug,
  businessName,
}: ReportIssueButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [issueType, setIssueType] = useState<IssueType>('expired');
  const [details, setDetails] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle'
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          deal_slug: dealSlug,
          business_name: businessName,
          issue_type: issueType,
          details,
          reporter_email: email || null,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
          setIsOpen(false);
          setStatus('idle');
          setIssueType('expired');
          setDetails('');
          setEmail('');
        }, 2000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-sm text-gray-500 hover:text-orange-600 transition-colors"
      >
        Report an issue with this deal
      </button>

      {/* Modal Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          {/* Modal Content */}
          <div
            className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Report an Issue
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Help us keep our deals accurate. Report any issues with the{' '}
              <strong>{businessName}</strong> discount.
            </p>

            {status === 'success' ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <svg
                  className="w-8 h-8 text-green-500 mx-auto mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p className="text-green-800 font-medium">
                  Thank you for your report!
                </p>
                <p className="text-green-600 text-sm">
                  We&apos;ll review this issue soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Issue Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What&apos;s wrong?
                  </label>
                  <select
                    value={issueType}
                    onChange={(e) => setIssueType(e.target.value as IssueType)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
                    required
                  >
                    {issueTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Details */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional details (optional)
                  </label>
                  <textarea
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    rows={3}
                    placeholder="Tell us more about the issue..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your email (optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@syr.edu"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    We&apos;ll only contact you if we need more information
                  </p>
                </div>

                {status === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-800 text-sm">
                      Something went wrong. Please try again.
                    </p>
                  </div>
                )}

                {/* Submit */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? 'Submitting...' : 'Submit Report'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
