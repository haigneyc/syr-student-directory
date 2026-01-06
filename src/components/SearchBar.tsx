'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { searchDeals } from '@/lib/data';
import { DealWithRelations } from '@/types/database';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<DealWithRelations[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length >= 2) {
      const searchResults = searchDeals(query);
      setTotalResults(searchResults.length);
      setResults(searchResults.slice(0, 5));
      setIsOpen(true);
    } else {
      setResults([]);
      setTotalResults(0);
      setIsOpen(false);
    }
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (slug: string) => {
    setQuery('');
    setIsOpen(false);
    router.push(`/deals/${slug}`);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.length >= 2) {
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleViewAll = () => {
    setIsOpen(false);
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-xl">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for deals, businesses, or categories..."
          className="w-full px-5 py-3 pl-12 text-gray-900 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm"
        />
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </form>

      {/* Dropdown Results */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden z-50">
          {results.map((deal) => (
            <button
              key={deal.id}
              onClick={() => handleSelect(deal.slug)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 border-b border-gray-100"
            >
              <span className="text-xl">{deal.category.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">
                  {deal.business.name}
                </p>
                <p className="text-sm text-gray-500 truncate">{deal.title}</p>
              </div>
              <span className="flex-shrink-0 text-orange-600 font-semibold text-sm">
                {deal.discount_value}
              </span>
            </button>
          ))}
          {totalResults > 5 && (
            <button
              onClick={handleViewAll}
              className="w-full px-4 py-3 text-center text-orange-600 hover:bg-orange-50 font-medium text-sm border-t border-gray-100"
            >
              View all {totalResults} results
            </button>
          )}
        </div>
      )}

      {isOpen && query.length >= 2 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-gray-200 shadow-lg p-4 text-center text-gray-500 z-50">
          No deals found for &quot;{query}&quot;
        </div>
      )}
    </div>
  );
}
