import Link from 'next/link';
import { DealWithRelations } from '@/types/database';
import { isDealExpired } from '@/lib/expiration';
import VerificationBadge from './VerificationBadge';
import ExpirationBadge from './ExpirationBadge';
import BusinessLogo from './BusinessLogo';

interface DealCardProps {
  deal: DealWithRelations;
  featured?: boolean;
}

export default function DealCard({ deal, featured = false }: DealCardProps) {
  const isExpired = isDealExpired(deal.expires_at);

  return (
    <Link
      href={`/deals/${deal.slug}`}
      className={`group block relative bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
        featured
          ? 'border-orange-200 shadow-md shadow-orange-100/50'
          : 'border-stone-200/60 hover:border-orange-200'
      } ${isExpired ? 'opacity-50 grayscale-[30%]' : 'hover:shadow-xl hover:shadow-stone-200/50 hover:-translate-y-1'}`}
    >
      {/* Featured Indicator */}
      {featured && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600" />
      )}

      <div className="p-5">
        {/* Header Row */}
        <div className="flex items-start gap-3.5 mb-4">
          {/* Business Logo */}
          <div className="relative flex-shrink-0">
            <BusinessLogo
              src={deal.business.logo_url}
              alt={deal.business.name}
              size="sm"
            />
            {/* Category Icon Overlay */}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full shadow-sm border border-stone-100 flex items-center justify-center text-sm">
              {deal.category.icon}
            </div>
          </div>

          {/* Business Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs font-medium text-stone-500 uppercase tracking-wide">
                {deal.category.name}
              </span>
              {featured && (
                <span className="badge badge-orange text-[10px] py-0.5 px-2">
                  Featured
                </span>
              )}
            </div>
            <h3 className="font-display font-semibold text-stone-900 text-lg truncate group-hover:text-orange-600 transition-colors">
              {deal.business.name}
            </h3>
          </div>

          {/* Discount Badge */}
          <div className="flex-shrink-0">
            <div className="relative">
              <span className="badge badge-orange text-sm py-1.5 px-3 group-hover:scale-105 transition-transform">
                {deal.discount_value}
              </span>
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-orange-500 rounded-full blur-lg opacity-0 group-hover:opacity-20 transition-opacity" />
            </div>
          </div>
        </div>

        {/* Deal Title */}
        <p className="font-medium text-stone-800 mb-2 line-clamp-1">
          {deal.title}
        </p>

        {/* Description */}
        <p className="text-stone-500 text-sm line-clamp-2 mb-4 leading-relaxed">
          {deal.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-stone-100">
          <div className="flex items-center gap-2">
            <VerificationBadge
              isVerified={deal.is_verified}
              verifiedAt={deal.verified_at}
            />
            <ExpirationBadge expiresAt={deal.expires_at} />
          </div>

          {/* Redemption Method Tag */}
          <span className="inline-flex items-center gap-1 text-xs text-stone-400 font-medium">
            {deal.redemption_method === 'show_id' && (
              <>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                </svg>
                Show ID
              </>
            )}
            {deal.redemption_method === 'online_code' && (
              <>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                Online
              </>
            )}
            {deal.redemption_method === 'app' && (
              <>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                App
              </>
            )}
          </span>
        </div>
      </div>

      {/* Hover Arrow */}
      <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white shadow-lg">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
