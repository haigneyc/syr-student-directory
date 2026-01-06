import Link from 'next/link';
import { DealWithRelations } from '@/types/database';
import { formatDate } from '@/lib/utils';
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
      className={`block bg-white rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all ${
        featured ? 'ring-2 ring-orange-500 ring-opacity-50' : ''
      } ${isExpired ? 'opacity-60' : ''}`}
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <BusinessLogo
            src={deal.business.logo_url}
            alt={deal.business.name}
            size="sm"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{deal.category.icon}</span>
              <span className="text-sm text-gray-500">{deal.category.name}</span>
              {featured && (
                <span className="bg-orange-100 text-orange-700 text-xs font-medium px-2 py-0.5 rounded">
                  Featured
                </span>
              )}
            </div>
            <h3 className="font-semibold text-gray-900 text-lg truncate">
              {deal.business.name}
            </h3>
          </div>
          <div className="flex-shrink-0">
            <span className="inline-flex items-center justify-center bg-orange-600 text-white font-bold text-sm px-3 py-1.5 rounded-lg">
              {deal.discount_value}
            </span>
          </div>
        </div>

        {/* Title */}
        <p className="text-gray-700 font-medium mb-2">{deal.title}</p>

        {/* Description */}
        <p className="text-gray-500 text-sm line-clamp-2 mb-3">
          {deal.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <VerificationBadge
              isVerified={deal.is_verified}
              verifiedAt={deal.verified_at}
            />
            <ExpirationBadge expiresAt={deal.expires_at} />
          </div>
          <span className="text-xs text-gray-400">
            {deal.redemption_method === 'show_id'
              ? 'Show ID'
              : deal.redemption_method === 'online_code'
              ? 'Online'
              : 'App'}
          </span>
        </div>
      </div>
    </Link>
  );
}
