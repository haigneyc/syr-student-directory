import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How We Verify Deals - Our Process',
  description:
    'Learn how Cuse Student Deals verifies every discount to ensure Syracuse students only see legitimate, current offers.',
};

export default function HowWeVerifyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          How We Verify Deals
        </h1>
        <p className="text-xl text-gray-600">
          No fake coupons. No expired offers. Every deal is checked.
        </p>
      </div>

      {/* Why Verification Matters */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Why Verification Matters
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-gray-600 leading-relaxed mb-4">
            We&apos;ve all been there: you find a &quot;student discount&quot; online, show up
            excited to save money, and the cashier says &quot;We don&apos;t do that anymore&quot;
            or &quot;That&apos;s not a real offer.&quot;
          </p>
          <p className="text-gray-600 leading-relaxed">
            That&apos;s why we verify every single deal before it goes live. When you see
            a discount on Cuse Student Deals, you can trust it&apos;s real and current.
          </p>
        </div>
      </section>

      {/* Our Verification Process */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Our Verification Process
        </h2>
        <div className="space-y-6">
          {/* Step 1 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-orange-600 font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Initial Research
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  When a deal is submitted or discovered, we first check the business&apos;s
                  official channels:
                </p>
                <ul className="text-gray-600 text-sm space-y-1 ml-4">
                  <li>• Official website for posted discounts</li>
                  <li>• Social media accounts for current promotions</li>
                  <li>• Google Maps listing for business hours and info</li>
                  <li>• Student discount aggregators for cross-reference</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-orange-600 font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Direct Confirmation
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  For local businesses, we confirm deals directly:
                </p>
                <ul className="text-gray-600 text-sm space-y-1 ml-4">
                  <li>• Phone call to verify the discount exists</li>
                  <li>• Ask about conditions (valid ID, minimum purchase, etc.)</li>
                  <li>• Confirm if it&apos;s ongoing or limited-time</li>
                  <li>• Note any restrictions (dine-in only, certain days, etc.)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-orange-600 font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Community Testing
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  Real students help validate deals:
                </p>
                <ul className="text-gray-600 text-sm space-y-1 ml-4">
                  <li>• Students report their experiences using deals</li>
                  <li>• We collect feedback on ease of redemption</li>
                  <li>• Issues are flagged for immediate review</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-orange-600 font-bold">4</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Regular Re-verification
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  Deals don&apos;t stay verified forever:
                </p>
                <ul className="text-gray-600 text-sm space-y-1 ml-4">
                  <li>• All deals are re-verified at least once per semester</li>
                  <li>• High-traffic deals are checked more frequently</li>
                  <li>• Seasonal deals are reviewed at the start of each season</li>
                  <li>• Last verified date is always displayed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Badge */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          What the Verified Badge Means
        </h2>
        <div className="bg-green-50 rounded-xl border border-green-200 p-6">
          <div className="flex items-start gap-4">
            <div className="text-3xl">✓</div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Verified Deals
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                When you see a green checkmark on a deal, it means:
              </p>
              <ul className="text-gray-600 text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>We&apos;ve confirmed the discount exists with the business</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>The conditions and requirements are accurately listed</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>It was verified within the last semester</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Students have successfully used it</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Report Issues */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Found a Problem?
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-gray-600 leading-relaxed mb-4">
            If you try a deal and it doesn&apos;t work as listed, please let us know
            immediately. Every deal page has a &quot;Report Issue&quot; button that goes
            directly to our team.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            When you report an issue, please include:
          </p>
          <ul className="text-gray-600 text-sm space-y-1 ml-4 mb-4">
            <li>• When you tried to use the deal</li>
            <li>• What the business told you</li>
            <li>• Whether the deal is expired or never existed</li>
          </ul>
          <p className="text-gray-600 leading-relaxed">
            We typically review reports within 24-48 hours and update or remove
            incorrect deals immediately.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="mb-12">
        <div className="bg-gray-100 rounded-xl p-6 text-center">
          <h3 className="font-semibold text-gray-900 mb-2">Questions?</h3>
          <p className="text-gray-600 text-sm mb-4">
            Have questions about our verification process or want to report a deal issue?
          </p>
          <a
            href="mailto:syracuse.automation@gmail.com"
            className="text-orange-600 hover:text-orange-700 font-medium"
          >
            syracuse.automation@gmail.com
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to Find Deals?
        </h2>
        <p className="text-gray-600 mb-6">
          Browse our verified student discounts for Syracuse.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-block bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
          >
            Browse Deals
          </Link>
          <Link
            href="/submit"
            className="inline-block bg-white text-orange-600 border border-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
          >
            Submit a Deal
          </Link>
        </div>
      </section>
    </div>
  );
}
