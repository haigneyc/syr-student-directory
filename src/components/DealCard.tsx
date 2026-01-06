import Link from 'next/link';
import { DealWithRelations } from '@/types/database';
import { formatDate } from '@/lib/utils';
import VerificationBadge from './VerificationBadge';

interface DealCardProps {
  deal: DealWithRelations;
  featured?: boolean;
}

export default function DealCard({ deal, featured = false }: DealCardProps) {
  return (
    <Link
      href={`/deals/${deal.slug}`}
      className={`block bg-white rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all ${
        featured ? 'ring-2 ring-orange-500 ring-opacity-50' : ''
      }`}
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
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
          <VerificationBadge
            isVerified={deal.is_verified}
            verifiedAt={deal.verified_at}
          />
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
