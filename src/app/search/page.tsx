'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import DealCard from '@/components/DealCard';
import { getAllDeals, getAllCategories } from '@/lib/data';
import { DealWithRelations } from '@/types/database';
import { Category } from '@/types/supabase';

type DiscountType = 'all' | 'percentage' | 'fixed' | 'special';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'all';

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [discountType, setDiscountType] = useState<DiscountType>('all');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'relevance' | 'newest' | 'discount'>('relevance');

  const allDeals = useMemo(() => getAllDeals(), []);
  const categories = useMemo(() => getAllCategories(), []);

  // Filter deals based on all criteria
  const filteredDeals = useMemo(() => {
    let results = allDeals;

    // Text search
    if (query.length >= 2) {
      const lowerQuery = query.toLowerCase();
      results = results.filter(
        (deal) =>
          deal.title.toLowerCase().includes(lowerQuery) ||
          deal.description.toLowerCase().includes(lowerQuery) ||
          deal.business.name.toLowerCase().includes(lowerQuery) ||
          deal.category.name.toLowerCase().includes(lowerQuery)
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      results = results.filter((deal) => deal.category.slug === selectedCategory);
    }

    // Discount type filter
    if (discountType !== 'all') {
      results = results.filter((deal) => deal.discount_type === discountType);
    }

    // Verified filter
    if (verifiedOnly) {
      results = results.filter((deal) => deal.is_verified);
    }

    // Sort
    if (sortBy === 'newest') {
      results = [...results].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } else if (sortBy === 'discount') {
      results = [...results].sort((a, b) => {
        const aValue = parseInt(a.discount_value.replace(/[^0-9]/g, '')) || 0;
        const bValue = parseInt(b.discount_value.replace(/[^0-9]/g, '')) || 0;
        return bValue - aValue;
      });
    }

    return results;
  }, [allDeals, query, selectedCategory, discountType, verifiedOnly, sortBy]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
    window.history.replaceState({}, '', newUrl);
  }, [query, selectedCategory]);

  const clearFilters = () => {
    setQuery('');
    setSelectedCategory('all');
    setDiscountType('all');
    setVerifiedOnly(false);
    setSortBy('relevance');
  };

  const hasActiveFilters =
    query ||
    selectedCategory !== 'all' ||
    discountType !== 'all' ||
    verifiedOnly;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <nav className="text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-orange-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Search</span>
        </nav>
        <h1 className="text-3xl font-bold text-gray-900">Search Deals</h1>
        <p className="text-gray-600 mt-2">
          Find the perfect student discount from our collection
        </p>
      </div>

      <div className="lg:grid lg:grid-cols-4 lg:gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">Filters</h2>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-orange-600 hover:text-orange-700"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Search Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search deals..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Discount Type Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount Type
              </label>
              <select
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value as DiscountType)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
              >
                <option value="all">All Types</option>
                <option value="percentage">Percentage Off</option>
                <option value="fixed">Fixed Amount Off</option>
                <option value="special">Special Offer</option>
              </select>
            </div>

            {/* Verified Only Toggle */}
            <div className="mb-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Verified deals only
                </span>
              </label>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as 'relevance' | 'newest' | 'discount')
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
              >
                <option value="relevance">Relevance</option>
                <option value="newest">Newest First</option>
                <option value="discount">Highest Discount</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Results */}
        <main className="lg:col-span-3 mt-8 lg:mt-0">
          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              {filteredDeals.length}{' '}
              {filteredDeals.length === 1 ? 'deal' : 'deals'} found
              {query && (
                <span>
                  {' '}
                  for &quot;<span className="font-medium">{query}</span>&quot;
                </span>
              )}
            </p>

            {/* Mobile filter indicator */}
            {hasActiveFilters && (
              <span className="lg:hidden text-sm text-orange-600">
                Filters active
              </span>
            )}
          </div>

          {/* Results Grid */}
          {filteredDeals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredDeals.map((deal) => (
                <DealCard key={deal.id} deal={deal} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No deals found
              </h3>
              <p className="text-gray-600 mb-6">
                {query
                  ? `We couldn't find any deals matching "${query}"`
                  : 'Try adjusting your filters to see more results'}
              </p>
              <button
                onClick={clearFilters}
                className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
