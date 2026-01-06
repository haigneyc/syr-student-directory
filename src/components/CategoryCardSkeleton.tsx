export default function CategoryCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
      <div className="w-10 h-10 bg-gray-200 rounded mb-3" />
      <div className="w-24 h-5 bg-gray-200 rounded mb-1" />
      <div className="w-full h-4 bg-gray-200 rounded mb-2" />
      <div className="w-16 h-4 bg-gray-200 rounded" />
    </div>
  );
}

export function CategoryCardSkeletonGrid({ count = 5 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <CategoryCardSkeleton key={i} />
      ))}
    </div>
  );
}
