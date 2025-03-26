
const BlogDetailSkeleton = () => {
  return (
    <div className="font-exo flex mt-6">
      <div className="w-3/4 animate-pulse">
        {/* Header Skeleton */}
        <div className="space-y-3">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="flex gap-4">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
        </div>

        {/* Image Skeleton */}
        <div className="mt-8 w-full h-96 bg-gray-200 rounded-2xl"></div>

        {/* Content Skeleton */}
        <div className="mt-8 space-y-4">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>

        {/* Tags Skeleton */}
        <div className="mt-8 flex gap-2">
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className="h-6 bg-gray-200 rounded w-16"></div>
          ))}
        </div>

        {/* Recent Blogs Skeleton */}
        <div className="mt-8">
          <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
          <div className="flex gap-4">
            {[1, 2].map((_, index) => (
              <div key={index} className="w-1/2">
                <div className="h-40 bg-gray-200 rounded-lg mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Comments Section Skeleton */}
        <div className="mt-8">
          <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="flex gap-4 mb-6">
              <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/4"></div>
    </div>
  );
};

export default BlogDetailSkeleton;