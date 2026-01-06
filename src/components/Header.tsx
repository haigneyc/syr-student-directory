'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🍊</span>
              <span className="font-bold text-xl text-gray-900">
                Cuse Student Deals
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/categories/food"
              className="text-gray-600 hover:text-orange-600 transition-colors"
            >
              Food
            </Link>
            <Link
              href="/categories/retail"
              className="text-gray-600 hover:text-orange-600 transition-colors"
            >
              Retail
            </Link>
            <Link
              href="/categories/entertainment"
              className="text-gray-600 hover:text-orange-600 transition-colors"
            >
              Entertainment
            </Link>
            <Link
              href="/categories/services"
              className="text-gray-600 hover:text-orange-600 transition-colors"
            >
              Services
            </Link>
            <Link
              href="/categories/online"
              className="text-gray-600 hover:text-orange-600 transition-colors"
            >
              Online
            </Link>
            <Link
              href="/submit"
              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
            >
              Submit a Deal
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 p-2"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              <Link
                href="/categories/food"
                className="text-gray-600 hover:text-orange-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Food & Drink
              </Link>
              <Link
                href="/categories/retail"
                className="text-gray-600 hover:text-orange-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Retail
              </Link>
              <Link
                href="/categories/entertainment"
                className="text-gray-600 hover:text-orange-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Entertainment
              </Link>
              <Link
                href="/categories/services"
                className="text-gray-600 hover:text-orange-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/categories/online"
                className="text-gray-600 hover:text-orange-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Online
              </Link>
              <Link
                href="/submit"
                className="bg-orange-600 text-white px-4 py-2 rounded-lg text-center hover:bg-orange-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Submit a Deal
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
