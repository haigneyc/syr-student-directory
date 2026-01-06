import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import DealCard from '@/components/DealCard';
import CategoryCard from '@/components/CategoryCard';
import {
  getAllCategoriesCached,
  getFeaturedDealsCached,
  getLatestDealsCached,
  getDealsByCategoryCached,
} from '@/lib/cached-data';

export default async function Home() {
  // Fetch data in parallel with caching
  const [categories, featuredDeals, latestDeals] = await Promise.all([
    getAllCategoriesCached(),
    getFeaturedDealsCached(),
    getLatestDealsCached(6),
  ]);

  // Get deal counts per category in parallel
  const categoryDeals = await Promise.all(
    categories.map((cat) => getDealsByCategoryCached(cat.slug))
  );

  const categoriesWithCounts = categories.map((cat, index) => ({
    ...cat,
    dealCount: categoryDeals[index].length,
  }));

  const totalDeals = categoryDeals.reduce((sum, deals) => sum + deals.length, 0);

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero">
        {/* Floating Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -left-24 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-orange-300/10 rounded-full blur-2xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-stone-200/50 shadow-sm mb-6 animate-slide-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              <span className="text-sm font-medium text-stone-600">
                {totalDeals}+ verified deals for Syracuse students
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-stone-900 mb-6 tracking-tight animate-slide-up stagger-1">
              Student Discounts,{' '}
              <span className="text-gradient">Verified</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl md:text-2xl text-stone-600 mb-10 max-w-2xl mx-auto leading-relaxed animate-slide-up stagger-2">
              Every legit discount near Syracuse — local spots, national brands, all in one place.
            </p>

            {/* Search Bar */}
            <div className="animate-slide-up stagger-3">
              <SearchBar />
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-10 animate-slide-up stagger-4">
              <div className="flex items-center gap-2 text-stone-500">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Verified weekly</span>
              </div>
              <div className="flex items-center gap-2 text-stone-500">
                <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Local &amp; national</span>
              </div>
              <div className="flex items-center gap-2 text-stone-500">
                <svg className="w-5 h-5 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                <span className="text-sm font-medium">Made by students</span>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 60V30C240 50 480 10 720 30C960 50 1200 10 1440 30V60H0Z" fill="white" fillOpacity="0.5" />
            <path d="M0 60V40C240 55 480 25 720 40C960 55 1200 25 1440 40V60H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-stone-900 mb-2">
              Browse Categories
            </h2>
            <p className="text-stone-500">Find deals by what you need</p>
          </div>
          <Link
            href="/search"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors"
          >
            View all
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
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
        <section className="relative bg-white border-y border-stone-100">
          {/* Background Pattern */}
          <div className="absolute inset-0 gradient-mesh opacity-50" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold mb-3">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  TOP PICKS
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-stone-900 mb-2">
                  Featured Deals
                </h2>
                <p className="text-stone-500">Handpicked savings just for you</p>
              </div>
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-stone-900 mb-2">
              Recently Verified
            </h2>
            <p className="text-stone-500">Fresh deals, confirmed this week</p>
          </div>
          <Link
            href="/search"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors"
          >
            View all deals
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestDeals.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>

        {/* Mobile View All Link */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/search"
            className="btn btn-secondary"
          >
            View all deals
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden">
        {/* Dark Gradient Background */}
        <div className="absolute inset-0 gradient-dark" />

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center max-w-2xl mx-auto">
            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 mx-auto mb-6 flex items-center justify-center shadow-lg shadow-orange-500/30">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>

            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Know a Student Discount?
            </h2>
            <p className="text-stone-400 text-lg mb-10 leading-relaxed">
              Help fellow Syracuse students save money. Submit a deal and we&apos;ll verify it for the community.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/submit" className="btn btn-primary px-8 py-3.5 text-base">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Submit a Deal
              </Link>
              <Link
                href="/advertise"
                className="btn bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 px-8 py-3.5 text-base"
              >
                For Businesses
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
