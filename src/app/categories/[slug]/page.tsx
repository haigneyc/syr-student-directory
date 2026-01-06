import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import DealCard from '@/components/DealCard';
import { getCategoryBySlug, getDealsByCategory, getAllCategories } from '@/lib/data';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${category.name} Student Discounts - Syracuse University`,
    description: `Find ${category.name.toLowerCase()} student discounts near Syracuse University. ${category.description}`,
    openGraph: {
      title: `${category.name} Student Discounts - Syracuse University`,
      description: `Find ${category.name.toLowerCase()} student discounts near Syracuse University.`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const deals = getDealsByCategory(slug);
  const categories = getAllCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{category.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">{category.icon}</span>
          <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
        </div>
        <p className="text-gray-600">{category.description}</p>
        <p className="text-sm text-orange-600 font-medium mt-2">
          {deals.length} {deals.length === 1 ? 'deal' : 'deals'} available
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/categories/${cat.slug}`}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              cat.slug === slug
                ? 'bg-orange-600 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-orange-300'
            }`}
          >
            {cat.icon} {cat.name}
          </Link>
        ))}
      </div>

      {/* Deals Grid */}
      {deals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.map((deal) => (
            <DealCard key={deal.id} deal={deal} featured={deal.is_featured} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 mb-4">
            No deals in this category yet.
          </p>
          <Link
            href="/submit"
            className="text-orange-600 hover:text-orange-700 font-medium"
          >
            Know a deal? Submit it here →
          </Link>
        </div>
      )}
    </div>
  );
}
