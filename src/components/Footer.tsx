'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle'
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    // Simulate signup (replace with actual API call when email service is set up)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For now, just show success message
    setStatus('success');
    setEmail('');

    // Reset after 5 seconds
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🍊</span>
              <span className="font-bold text-xl text-white">
                Cuse Student Deals
              </span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Every legit student discount in Syracuse — verified, local, and
              updated. Your one-stop directory for saving money as a Syracuse
              University student.
            </p>

            {/* Newsletter Signup */}
            <div className="mb-4">
              <h4 className="font-semibold text-white mb-2">
                Get new deals in your inbox
              </h4>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
              {status === 'success' && (
                <p className="text-green-400 text-sm mt-2">
                  Thanks for subscribing! We&apos;ll keep you posted.
                </p>
              )}
              {status === 'error' && (
                <p className="text-red-400 text-sm mt-2">
                  Something went wrong. Please try again.
                </p>
              )}
            </div>

            <p className="text-sm text-gray-500">
              Not affiliated with Syracuse University.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-white mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/categories/food"
                  className="hover:text-orange-400 transition-colors"
                >
                  Food & Drink
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/retail"
                  className="hover:text-orange-400 transition-colors"
                >
                  Retail
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/entertainment"
                  className="hover:text-orange-400 transition-colors"
                >
                  Entertainment
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/services"
                  className="hover:text-orange-400 transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/online"
                  className="hover:text-orange-400 transition-colors"
                >
                  Online
                </Link>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/submit"
                  className="hover:text-orange-400 transition-colors"
                >
                  Submit a Deal
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-orange-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/advertise"
                  className="hover:text-orange-400 transition-colors"
                >
                  Advertise
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-orange-400 transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Cuse Student Deals. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-orange-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-orange-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
