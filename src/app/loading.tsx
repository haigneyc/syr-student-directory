export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-orange-600 border-r-transparent mb-4" />
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
