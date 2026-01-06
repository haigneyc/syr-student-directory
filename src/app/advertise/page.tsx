import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Advertise Your Business',
  description:
    'List your student discount on Cuse Student Deals and reach thousands of Syracuse University students looking for deals.',
};

export default function AdvertisePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Reach Syracuse Students
        </h1>
        <p className="text-xl text-gray-600">
          List your student discount and connect with 20,000+ Syracuse University
          students actively looking for deals.
        </p>
      </div>

      {/* Why List */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Why List Your Business?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="font-semibold text-gray-900 mb-2">Targeted Audience</h3>
            <p className="text-gray-600 text-sm">
              Reach students who are actively searching for local discounts and ready
              to spend.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="text-3xl mb-3">🔄</div>
            <h3 className="font-semibold text-gray-900 mb-2">Recurring Customers</h3>
            <p className="text-gray-600 text-sm">
              Students become loyal customers. A discount today means repeat business
              for years.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="text-3xl mb-3">🔍</div>
            <h3 className="font-semibold text-gray-900 mb-2">SEO Benefits</h3>
            <p className="text-gray-600 text-sm">
              Each listing is a dedicated page that ranks for searches like
              &quot;student discount [your business]&quot;.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="text-3xl mb-3">📈</div>
            <h3 className="font-semibold text-gray-900 mb-2">Word of Mouth</h3>
            <p className="text-gray-600 text-sm">
              Students share deals with friends. Your listing spreads through dorms
              and group chats.
            </p>
          </div>
        </div>
      </section>

      {/* Listing Options */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Listing Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Free Listing */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Basic Listing</h3>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                Free
              </span>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2 text-gray-600">
                <span className="text-green-500">✓</span>
                Dedicated deal page
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <span className="text-green-500">✓</span>
                Category listing
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <span className="text-green-500">✓</span>
                Search visibility
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <span className="text-green-500">✓</span>
                Business info & contact
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <span>✗</span>
                Featured placement
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <span>✗</span>
                Homepage visibility
              </li>
            </ul>
            <Link
              href="/submit"
              className="block text-center bg-gray-100 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Submit Free Listing
            </Link>
          </div>

          {/* Featured Listing */}
          <div className="bg-orange-50 rounded-xl border-2 border-orange-500 p-6 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Most Popular
              </span>
            </div>
            <div className="flex items-center justify-between mb-4 mt-2">
              <h3 className="text-xl font-bold text-gray-900">Featured Listing</h3>
              <span className="text-orange-600 font-bold">
                $25<span className="text-sm font-normal">/month</span>
              </span>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2 text-gray-600">
                <span className="text-green-500">✓</span>
                Everything in Basic
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <span className="text-orange-500">★</span>
                Featured badge on listing
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <span className="text-orange-500">★</span>
                Homepage featured section
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <span className="text-orange-500">★</span>
                Priority in category pages
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <span className="text-orange-500">★</span>
                &quot;Deal of the Week&quot; eligibility
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <span className="text-orange-500">★</span>
                Analytics & click tracking
              </li>
            </ul>
            <a
              href="mailto:advertise@cusestudentdeals.com?subject=Featured Listing Inquiry"
              className="block text-center bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
            >
              Get Started
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mb-12">
        <div className="bg-gray-900 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Syracuse University by the Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-orange-400">20K+</div>
              <div className="text-gray-400 text-sm">Undergraduate Students</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-400">5K+</div>
              <div className="text-gray-400 text-sm">Graduate Students</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-400">4 Yrs</div>
              <div className="text-gray-400 text-sm">Average Stay</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-400">New</div>
              <div className="text-gray-400 text-sm">Students Every Year</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">
              How do I update my listing?
            </h3>
            <p className="text-gray-600 text-sm">
              Just email us with your changes and we&apos;ll update your listing
              within 24 hours. Featured listings get priority updates.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">
              Can I cancel my featured listing?
            </h3>
            <p className="text-gray-600 text-sm">
              Yes, you can cancel anytime. Your listing will revert to a free basic
              listing at the end of your billing period.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">
              What makes a good student discount?
            </h3>
            <p className="text-gray-600 text-sm">
              The best discounts are simple (% off or $ off), always available (not
              limited to specific days), and easy to redeem (just show student ID).
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center bg-white rounded-xl border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
        <p className="text-gray-600 mb-6">
          Submit your free listing today, or contact us to discuss featured placement.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/submit"
            className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
          >
            Submit Free Listing
          </Link>
          <a
            href="mailto:advertise@cusestudentdeals.com"
            className="bg-gray-100 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}
