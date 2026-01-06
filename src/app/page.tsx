import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import DealCard from '@/components/DealCard';
import CategoryCard from '@/components/CategoryCard';
import {
  getAllCategories,
  getFeaturedDeals,
  getLatestDeals,
  getDealsByCategory,
} from '@/lib/data';

export default function Home() {
  const categories = getAllCategories();
  const featuredDeals = getFeaturedDeals();
  const latestDeals = getLatestDeals(6);

  // Get deal counts per category
  const categoriesWithCounts = categories.map((cat) => ({
    ...cat,
    dealCount: getDealsByCategory(cat.slug).length,
  }));

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Syracuse Student Discounts
            </h1>
            <p className="text-xl md:text-2xl text-orange-100 mb-8">
              Every legit student discount in Syracuse — verified, local, and
              updated.
            </p>
            <SearchBar />
            <p className="text-sm text-orange-200 mt-4">
              Search for pizza, gym, movies, and more...
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Browse by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categoriesWithCounts.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              dealCount={category.dealCount}
            />
          ))}
        </div>
      </section>

      {/* Featured Deals Section */}
      {featuredDeals.length > 0 && (
        <section className="bg-white border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Featured Deals
              </h2>
              <span className="text-sm text-orange-600 font-medium">
                Top picks this week
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredDeals.map((deal) => (
                <DealCard key={deal.id} deal={deal} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Verified Deals Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Recently Verified
          </h2>
          <Link
            href="/categories/food"
            className="text-orange-600 hover:text-orange-700 font-medium text-sm"
          >
            View all deals →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestDeals.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Know a Student Discount?</h2>
            <p className="text-gray-400 mb-8">
              Help fellow Syracuse students save money. Submit a deal and we&apos;ll
              verify it for the community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/submit"
                className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
              >
                Submit a Deal
              </Link>
              <Link
                href="/advertise"
                className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                For Businesses
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
