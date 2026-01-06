import Link from 'next/link';
import { Category } from '@/types/database';

interface CategoryCardProps {
  category: Category;
  dealCount?: number;
}

export default function CategoryCard({ category, dealCount }: CategoryCardProps) {
  // Assign unique gradient backgrounds for each category
  const gradientMap: Record<string, string> = {
    food: 'from-orange-400 to-red-500',
    retail: 'from-violet-400 to-purple-600',
    entertainment: 'from-pink-400 to-rose-500',
    services: 'from-cyan-400 to-blue-500',
    online: 'from-emerald-400 to-teal-500',
  };

  const gradient = gradientMap[category.slug] || 'from-orange-400 to-orange-600';

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group block relative overflow-hidden rounded-2xl bg-white border border-stone-200/60 hover:border-transparent transition-all duration-300 hover:shadow-xl hover:shadow-stone-200/50 hover:-translate-y-1"
    >
      {/* Gradient Background on Hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />

      {/* Content */}
      <div className="relative p-5 md:p-6">
        {/* Icon Container */}
        <div className="mb-3">
          <div className="w-12 h-12 rounded-xl bg-stone-100 group-hover:bg-white/20 flex items-center justify-center transition-colors duration-300">
            <span className="text-2xl group-hover:scale-110 transition-transform duration-300 inline-block">
              {category.icon}
            </span>
          </div>
        </div>

        {/* Category Name */}
        <h3 className="font-display font-semibold text-stone-900 group-hover:text-white text-lg mb-1 transition-colors duration-300">
          {category.name}
        </h3>

        {/* Description - Hidden on small screens */}
        <p className="text-stone-500 group-hover:text-white/80 text-sm mb-3 line-clamp-2 transition-colors duration-300 hidden sm:block">
          {category.description}
        </p>

        {/* Deal Count */}
        {dealCount !== undefined && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-orange-600 group-hover:text-white transition-colors duration-300">
              {dealCount} {dealCount === 1 ? 'deal' : 'deals'}
            </span>

            {/* Arrow */}
            <div className="w-6 h-6 rounded-full bg-stone-100 group-hover:bg-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
              <svg
                className="w-3.5 h-3.5 text-stone-600 group-hover:text-white transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Shine effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute -inset-full top-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 group-hover:animate-[shimmer_2s_ease-in-out]" />
      </div>
    </Link>
  );
}
