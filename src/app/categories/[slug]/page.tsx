import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import DealCard from '@/components/DealCard';
import AdUnit from '@/components/AdUnit';
import {
  getCategoryBySlugCached,
  getDealsByCategoryCached,
  getAllCategoriesCached,
} from '@/lib/cached-data';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = await getAllCategoriesCached();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlugCached(slug);

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  // Truncate description for meta tags (150-160 chars ideal)
  const description = category.description || `Find ${category.name.toLowerCase()} student discounts near Syracuse University.`;
  const shortDescription = description.length > 155
    ? description.substring(0, 152) + '...'
    : description;

  return {
    title: `${category.name} Student Discounts Near Syracuse University | Cuse Deals`,
    description: shortDescription,
    keywords: [
      `${category.name.toLowerCase()} student discount syracuse`,
      `SU student ${category.name.toLowerCase()} deals`,
      `Syracuse University ${category.name.toLowerCase()}`,
      `${category.name.toLowerCase()} near syracuse university`,
    ],
    openGraph: {
      title: `${category.name} Student Discounts - Syracuse University`,
      description: shortDescription,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `${category.name} Student Discounts - Syracuse University`,
      description: shortDescription,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  // Fetch data in parallel with caching
  const [category, deals, categories] = await Promise.all([
    getCategoryBySlugCached(slug),
    getDealsByCategoryCached(slug),
    getAllCategoriesCached(),
  ]);

  if (!category) {
    notFound();
  }

  // Schema.org structured data for category
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.name} Student Discounts - Syracuse University`,
    description: category.description,
    url: `https://orangediscounts.com/categories/${category.slug}`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: deals.length,
      itemListElement: deals.slice(0, 10).map((deal, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Offer',
          name: deal.title,
          description: deal.description,
          offeredBy: {
            '@type': 'LocalBusiness',
            name: deal.business.name,
          },
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
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

      {/* Ad Unit */}
      <div className="mt-10">
        <AdUnit slot="category-page-bottom" format="horizontal" className="w-full" />
      </div>
    </div>
    </>
  );
}
