import Link from 'next/link';
import { Category } from '@/types/database';

interface CategoryCardProps {
  category: Category;
  dealCount?: number;
}

export default function CategoryCard({ category, dealCount }: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="block bg-white rounded-xl border border-gray-200 p-6 hover:border-orange-300 hover:shadow-md transition-all group"
    >
      <div className="text-4xl mb-3">{category.icon}</div>
      <h3 className="font-semibold text-gray-900 text-lg mb-1 group-hover:text-orange-600 transition-colors">
        {category.name}
      </h3>
      <p className="text-gray-500 text-sm mb-2">{category.description}</p>
      {dealCount !== undefined && (
        <p className="text-orange-600 text-sm font-medium">
          {dealCount} {dealCount === 1 ? 'deal' : 'deals'}
        </p>
      )}
    </Link>
  );
}
