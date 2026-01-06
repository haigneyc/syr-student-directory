import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getDealBySlug, getAllDeals } from '@/lib/data';
import { formatDate } from '@/lib/utils';
import VerificationBadge from '@/components/VerificationBadge';
import ShareButtons from '@/components/ShareButtons';
import MapEmbed from '@/components/MapEmbed';
import ExpirationBadge from '@/components/ExpirationBadge';
import ReportIssueButton from '@/components/ReportIssueButton';
import { isDealExpired } from '@/lib/expiration';

interface DealPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const deals = getAllDeals();
  return deals.map((deal) => ({
    slug: deal.slug,
  }));
}

export async function generateMetadata({
  params,
}: DealPageProps): Promise<Metadata> {
  const { slug } = await params;
  const deal = getDealBySlug(slug);

  if (!deal) {
    return {
      title: 'Deal Not Found',
    };
  }

  const title = `${deal.discount_value} Off at ${deal.business.name} – Syracuse Student Discount`;
  const description = `Save at ${deal.business.name} with your Syracuse University student ID. ${deal.description}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}

export default async function DealPage({ params }: DealPageProps) {
  const { slug } = await params;
  const deal = getDealBySlug(slug);

  if (!deal) {
    notFound();
  }

  // Schema.org structured data
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: deal.business.name,
    address: deal.business.address,
    telephone: deal.business.phone,
    url: deal.business.website,
    offers: {
      '@type': 'Offer',
      description: deal.title,
      eligibleCustomerType: 'Student',
      price: deal.discount_value,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-orange-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link
            href={`/categories/${deal.category.slug}`}
            className="hover:text-orange-600"
          >
            {deal.category.name}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{deal.business.name}</span>
        </nav>

        {/* Expiration Warning */}
        {deal.expires_at && isDealExpired(deal.expires_at) && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3">
            <svg
              className="w-6 h-6 text-red-500 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <p className="font-semibold text-red-800">This deal has expired</p>
              <p className="text-sm text-red-600">
                This offer is no longer available. Check back for new deals!
              </p>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className={`bg-white rounded-2xl border border-gray-200 overflow-hidden ${deal.expires_at && isDealExpired(deal.expires_at) ? 'opacity-75' : ''}`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{deal.category.icon}</span>
                  <span className="text-orange-100">{deal.category.name}</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  {deal.business.name}
                </h1>
                <p className="text-xl text-orange-100">{deal.title}</p>
              </div>
              <div className="flex-shrink-0">
                <span className="inline-flex items-center justify-center bg-white text-orange-600 font-bold text-xl md:text-2xl px-4 py-2 rounded-xl">
                  {deal.discount_value}
                </span>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 md:p-8">
            {/* Description */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                About This Deal
              </h2>
              <p className="text-gray-600 leading-relaxed">{deal.description}</p>
            </div>

            {/* Conditions */}
            {deal.conditions && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Conditions
                </h2>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-800">{deal.conditions}</p>
                </div>
              </div>
            )}

            {/* How to Redeem */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                How to Redeem
              </h2>
              <div className="bg-gray-50 rounded-lg p-4">
                {deal.redemption_method === 'show_id' && (
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🪪</span>
                    <p className="text-gray-700">
                      Show your valid Syracuse University student ID at checkout
                    </p>
                  </div>
                )}
                {deal.redemption_method === 'online_code' && (
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💻</span>
                    <div>
                      <p className="text-gray-700">
                        Redeem online through the business website
                      </p>
                      {deal.code && (
                        <p className="mt-2">
                          Use code:{' '}
                          <code className="bg-gray-200 px-2 py-1 rounded font-mono">
                            {deal.code}
                          </code>
                        </p>
                      )}
                    </div>
                  </div>
                )}
                {deal.redemption_method === 'app' && (
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📱</span>
                    <p className="text-gray-700">
                      Download the business app to access this discount
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Business Info */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Business Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {deal.business.address && (
                  <div className="flex items-start gap-3">
                    <span className="text-gray-400">📍</span>
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="text-gray-900">{deal.business.address}</p>
                    </div>
                  </div>
                )}
                {deal.business.phone && (
                  <div className="flex items-start gap-3">
                    <span className="text-gray-400">📞</span>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-gray-900">{deal.business.phone}</p>
                    </div>
                  </div>
                )}
                {deal.business.website && (
                  <div className="flex items-start gap-3">
                    <span className="text-gray-400">🌐</span>
                    <div>
                      <p className="text-sm text-gray-500">Website</p>
                      <a
                        href={deal.business.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-600 hover:underline"
                      >
                        Visit Website →
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Map */}
              {deal.business.address && (
                <MapEmbed
                  address={deal.business.address}
                  businessName={deal.business.name}
                  latitude={deal.business.latitude}
                  longitude={deal.business.longitude}
                />
              )}
            </div>

            {/* Share */}
            <div className="border-t border-gray-200 pt-6 mt-8">
              <ShareButtons
                url={`https://orangediscounts.com/deals/${deal.slug}`}
                title={`${deal.discount_value} Off at ${deal.business.name} - Syracuse Student Discount`}
                description={deal.description}
              />
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 pt-6 mt-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <VerificationBadge
                  isVerified={deal.is_verified}
                  verifiedAt={deal.verified_at}
                />
                <ExpirationBadge expiresAt={deal.expires_at} />
              </div>
              <ReportIssueButton
                dealSlug={deal.slug}
                businessName={deal.business.name}
              />
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Link
            href={`/categories/${deal.category.slug}`}
            className="text-orange-600 hover:text-orange-700 font-medium"
          >
            ← Browse more {deal.category.name} deals
          </Link>
        </div>
      </div>
    </>
  );
}
