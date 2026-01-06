import Link from 'next/link';

export default function Footer() {
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
              Every legit student discount in Syracuse — verified, local, and updated.
              Your one-stop directory for saving money as a Syracuse University student.
            </p>
            <p className="text-sm text-gray-500">
              Not affiliated with Syracuse University.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-white mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/categories/food" className="hover:text-orange-400 transition-colors">
                  Food & Drink
                </Link>
              </li>
              <li>
                <Link href="/categories/retail" className="hover:text-orange-400 transition-colors">
                  Retail
                </Link>
              </li>
              <li>
                <Link href="/categories/entertainment" className="hover:text-orange-400 transition-colors">
                  Entertainment
                </Link>
              </li>
              <li>
                <Link href="/categories/services" className="hover:text-orange-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/categories/online" className="hover:text-orange-400 transition-colors">
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
                <Link href="/submit" className="hover:text-orange-400 transition-colors">
                  Submit a Deal
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-orange-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/advertise" className="hover:text-orange-400 transition-colors">
                  Advertise
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Cuse Student Deals. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
