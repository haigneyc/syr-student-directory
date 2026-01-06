'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { searchDeals } from '@/lib/data';
import { DealWithRelations } from '@/types/database';

interface SearchBarProps {
  variant?: 'hero' | 'compact';
}

export default function SearchBar({ variant = 'hero' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<DealWithRelations[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
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
        setIsFocused(false);
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

  const isHero = variant === 'hero';

  return (
    <div ref={wrapperRef} className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        {/* Search Input */}
        <div
          className={`relative transition-all duration-300 ${
            isFocused ? 'transform scale-[1.02]' : ''
          }`}
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder="Search pizza, gym, movies..."
            className={`w-full bg-white text-stone-900 placeholder-stone-400 rounded-2xl transition-all duration-300 focus:outline-none ${
              isHero
                ? 'px-6 py-4 pl-14 text-lg shadow-xl shadow-stone-200/50 border-2 border-transparent focus:border-orange-300 focus:shadow-2xl focus:shadow-orange-100/50'
                : 'px-5 py-3 pl-12 text-base border border-stone-200 focus:border-orange-400 focus:shadow-lg focus:shadow-orange-100/30'
            }`}
          />

          {/* Search Icon */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 transition-colors ${
              isHero ? 'left-5' : 'left-4'
            } ${isFocused ? 'text-orange-500' : 'text-stone-400'}`}
          >
            <svg
              className={isHero ? 'w-6 h-6' : 'w-5 h-5'}
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
          </div>

          {/* Submit Button */}
          {query.length >= 2 && (
            <button
              type="submit"
              className={`absolute right-2 top-1/2 -translate-y-1/2 btn btn-primary animate-scale-in ${
                isHero ? 'py-2.5 px-5' : 'py-2 px-4 text-sm'
              }`}
            >
              Search
            </button>
          )}
        </div>

        {/* Glow effect when focused */}
        {isHero && (
          <div
            className={`absolute -inset-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-2xl blur-xl transition-opacity duration-500 -z-10 ${
              isFocused ? 'opacity-20' : 'opacity-0'
            }`}
          />
        )}
      </form>

      {/* Dropdown Results */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl border border-stone-200 shadow-2xl shadow-stone-200/50 overflow-hidden z-50 animate-scale-in">
          <div className="p-2">
            {results.map((deal, index) => (
              <button
                key={deal.id}
                onClick={() => handleSelect(deal.slug)}
                className="w-full px-4 py-3 text-left hover:bg-orange-50 rounded-xl flex items-center gap-4 transition-colors group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Category Icon */}
                <div className="w-10 h-10 rounded-xl bg-stone-100 group-hover:bg-orange-100 flex items-center justify-center flex-shrink-0 transition-colors">
                  <span className="text-xl">{deal.category.icon}</span>
                </div>

                {/* Deal Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-stone-900 truncate group-hover:text-orange-600 transition-colors">
                    {deal.business.name}
                  </p>
                  <p className="text-sm text-stone-500 truncate">{deal.title}</p>
                </div>

                {/* Discount Badge */}
                <span className="badge badge-orange text-sm py-1 px-2.5 flex-shrink-0">
                  {deal.discount_value}
                </span>
              </button>
            ))}
          </div>

          {/* View All Button */}
          {totalResults > 5 && (
            <div className="border-t border-stone-100 p-2">
              <button
                onClick={handleViewAll}
                className="w-full py-3 text-center text-orange-600 hover:bg-orange-50 rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-2"
              >
                View all {totalResults} results
                <svg
                  className="w-4 h-4"
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
              </button>
            </div>
          )}
        </div>
      )}

      {/* No Results State */}
      {isOpen && query.length >= 2 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl border border-stone-200 shadow-xl p-6 text-center z-50 animate-scale-in">
          <div className="w-12 h-12 rounded-full bg-stone-100 mx-auto mb-3 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-stone-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-stone-600 font-medium">No deals found</p>
          <p className="text-stone-400 text-sm mt-1">
            Try searching for &quot;pizza&quot; or &quot;gym&quot;
          </p>
        </div>
      )}
    </div>
  );
}
