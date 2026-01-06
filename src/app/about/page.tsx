import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us - Trust & Verification',
  description:
    'Learn about Cuse Student Deals, how we verify discounts, and our mission to help Syracuse students save money.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          About Cuse Student Deals
        </h1>
        <p className="text-xl text-gray-600">
          Every legit student discount in Syracuse — verified, local, and updated.
        </p>
      </div>

      {/* Mission */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-gray-600 leading-relaxed mb-4">
            Student discounts exist everywhere, but they&apos;re scattered across old
            blog posts, word-of-mouth recommendations, business Instagram pages, and
            unofficial Reddit threads. Students routinely overpay simply because they
            don&apos;t know discounts exist.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Cuse Student Deals is a centralized, always-updated directory that focuses
            specifically on Syracuse students, highlighting local, real-world savings
            that are verified and easy to use.
          </p>
        </div>
      </section>

      {/* Verification Process */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How We Verify Deals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="text-3xl mb-3">🔍</div>
            <h3 className="font-semibold text-gray-900 mb-2">Research</h3>
            <p className="text-gray-600 text-sm">
              We research each deal through business websites, direct contact, and
              community feedback.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="text-3xl mb-3">📞</div>
            <h3 className="font-semibold text-gray-900 mb-2">Confirm</h3>
            <p className="text-gray-600 text-sm">
              We call or email businesses to confirm current offers and any
              conditions or restrictions.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="text-3xl mb-3">🔄</div>
            <h3 className="font-semibold text-gray-900 mb-2">Re-verify</h3>
            <p className="text-gray-600 text-sm">
              We re-verify deals periodically (at least once per semester) to ensure
              they&apos;re still valid.
            </p>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          What Makes Us Different
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <div className="flex items-start gap-4">
            <span className="text-green-500 text-xl">✓</span>
            <div>
              <h3 className="font-semibold text-gray-900">Local Focus</h3>
              <p className="text-gray-600 text-sm">
                We focus on Syracuse-area businesses, not generic national coupon
                sites.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-green-500 text-xl">✓</span>
            <div>
              <h3 className="font-semibold text-gray-900">Verified Discounts</h3>
              <p className="text-gray-600 text-sm">
                Every deal shows when it was last verified, so you know it&apos;s
                current.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-green-500 text-xl">✓</span>
            <div>
              <h3 className="font-semibold text-gray-900">No Spam</h3>
              <p className="text-gray-600 text-sm">
                Clean, simple interface without pop-ups, coupon codes that don&apos;t
                work, or misleading offers.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-green-500 text-xl">✓</span>
            <div>
              <h3 className="font-semibold text-gray-900">Community-Driven</h3>
              <p className="text-gray-600 text-sm">
                Students can submit deals they discover, helping grow the directory
                for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="mb-12">
        <div className="bg-gray-100 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-2">Disclaimer</h3>
          <p className="text-gray-600 text-sm">
            Cuse Student Deals is not affiliated with Syracuse University. We are an
            independent resource created to help students save money. Deals are
            subject to change and we recommend confirming with the business before
            making a purchase based on an expected discount.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Know a Deal We&apos;re Missing?
        </h2>
        <p className="text-gray-600 mb-6">
          Help your fellow students save money by submitting deals you discover.
        </p>
        <Link
          href="/submit"
          className="inline-block bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
        >
          Submit a Deal
        </Link>
      </section>
    </div>
  );
}
