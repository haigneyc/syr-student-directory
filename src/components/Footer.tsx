'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { trackNewsletterSignup } from '@/lib/analytics';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle'
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, source: 'footer' }),
      });

      const data = await response.json();

      if (response.ok) {
        // Track newsletter signup
        trackNewsletterSignup();
        setStatus('success');
        setEmail('');
      } else {
        console.error('Newsletter signup failed:', data.error);
        setStatus('error');
      }
    } catch (err) {
      console.error('Newsletter signup error:', err);
      setStatus('error');
    }

    // Reset after 5 seconds
    setTimeout(() => setStatus('idle'), 5000);
  };

  const categories = [
    { name: 'Food & Drink', href: '/categories/food' },
    { name: 'Retail', href: '/categories/retail' },
    { name: 'Entertainment', href: '/categories/entertainment' },
    { name: 'Services', href: '/categories/services' },
    { name: 'Online', href: '/categories/online' },
  ];

  const quickLinks = [
    { name: 'Submit a Deal', href: '/submit' },
    { name: 'About Us', href: '/about' },
    { name: 'How We Verify', href: '/how-we-verify' },
    { name: 'For Businesses', href: '/advertise' },
    { name: 'FAQ', href: '/faq' },
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-dark" />

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-5">
              {/* Logo */}
              <Link href="/" className="inline-flex items-center gap-3 group mb-6">
                <div className="relative">
                  <span className="text-3xl transition-transform duration-300 group-hover:scale-110 inline-block">
                    🍊
                  </span>
                  <div className="absolute -inset-1 bg-orange-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-bold text-xl text-white">
                    Cuse Deals
                  </span>
                  <span className="text-xs text-stone-500 font-medium tracking-wide uppercase">
                    Syracuse Students
                  </span>
                </div>
              </Link>

              <p className="text-stone-400 mb-6 max-w-sm leading-relaxed">
                Every legit student discount in Syracuse — verified, local, and
                updated. Your one-stop directory for saving money.
              </p>

              {/* Newsletter Signup */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-orange-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Get new deals in your inbox
                </h4>
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 px-4 py-2.5 bg-white/10 border border-white/10 rounded-xl text-white placeholder-stone-500 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all"
                    required
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn btn-primary py-2.5 px-5 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <svg
                        className="w-5 h-5 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                    ) : (
                      'Subscribe'
                    )}
                  </button>
                </form>
                {status === 'success' && (
                  <p className="text-green-400 text-sm mt-3 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Thanks! We&apos;ll keep you posted.
                  </p>
                )}
                {status === 'error' && (
                  <p className="text-red-400 text-sm mt-3">
                    Something went wrong. Please try again.
                  </p>
                )}
              </div>

              <p className="text-xs text-stone-600 mt-4">
                Not affiliated with Syracuse University.
              </p>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                {/* Categories */}
                <div>
                  <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                    Categories
                  </h3>
                  <ul className="space-y-3">
                    {categories.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="text-stone-400 hover:text-orange-400 transition-colors text-sm inline-flex items-center gap-1 group"
                        >
                          {item.name}
                          <svg
                            className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
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
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quick Links */}
                <div>
                  <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                    Quick Links
                  </h3>
                  <ul className="space-y-3">
                    {quickLinks.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="text-stone-400 hover:text-orange-400 transition-colors text-sm inline-flex items-center gap-1 group"
                        >
                          {item.name}
                          <svg
                            className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
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
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact */}
                <div>
                  <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                    Get in Touch
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <a
                        href="mailto:syracuse.automation@gmail.com"
                        className="text-stone-400 hover:text-orange-400 transition-colors text-sm inline-flex items-center gap-2"
                      >
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
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        Contact Us
                      </a>
                    </li>
                    <li>
                      <Link
                        href="/submit"
                        className="text-stone-400 hover:text-orange-400 transition-colors text-sm inline-flex items-center gap-2"
                      >
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
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        Submit a Deal
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/advertise"
                        className="text-stone-400 hover:text-orange-400 transition-colors text-sm inline-flex items-center gap-2"
                      >
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
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                        Partner with Us
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-stone-500 text-sm">
                &copy; {new Date().getFullYear()} Cuse Student Deals. All rights
                reserved.
              </p>
              <div className="flex items-center gap-6">
                <Link
                  href="/privacy"
                  className="text-stone-500 hover:text-stone-300 transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-stone-500 hover:text-stone-300 transition-colors text-sm"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
