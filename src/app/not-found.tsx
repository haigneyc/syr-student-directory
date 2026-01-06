import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Page not found
        </h1>
        <p className="text-gray-600 mb-6">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. The deal
          may have been removed or the URL might be incorrect.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors"
          >
            Go home
          </Link>
          <Link
            href="/categories/food"
            className="bg-gray-100 text-gray-900 px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Browse deals
          </Link>
        </div>
      </div>
    </div>
  );
}
