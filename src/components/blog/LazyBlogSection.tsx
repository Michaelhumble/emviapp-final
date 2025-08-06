import React, { Suspense, lazy } from 'react';

// Lazy load blog sections for better performance
const BlogCategoriesGrid = lazy(() => import('./BlogCategoriesGrid'));
const BlogTrendingSection = lazy(() => import('./BlogTrendingSection'));
const BlogFeaturedSection = lazy(() => import('./BlogFeaturedSection'));
const BlogRecentSection = lazy(() => import('./BlogRecentSection'));
const BlogTopicsSection = lazy(() => import('./BlogTopicsSection'));

interface LazyBlogSectionProps {
  type: 'categories' | 'trending' | 'featured' | 'recent' | 'topics';
  data?: any;
  className?: string;
}

const SectionSkeleton = ({ type }: { type: string }) => (
  <div className="py-16 animate-pulse">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="w-8 h-8 bg-gray-200 rounded-full mx-auto mb-4"></div>
        <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(type === 'categories' ? 6 : 3)].map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-xl p-6">
            <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const LazyBlogSection: React.FC<LazyBlogSectionProps> = ({
  type,
  data,
  className = ''
}) => {
  const renderSection = () => {
    switch (type) {
      case 'categories':
        return <BlogCategoriesGrid categories={data} className={className} />;
      case 'trending':
        return <BlogTrendingSection articles={data} className={className} />;
      case 'featured':
        return <BlogFeaturedSection articles={data} className={className} />;
      case 'recent':
        return <BlogRecentSection articles={data} className={className} />;
      case 'topics':
        return <BlogTopicsSection topics={data} className={className} />;
      default:
        return null;
    }
  };

  return (
    <Suspense fallback={<SectionSkeleton type={type} />}>
      {renderSection()}
    </Suspense>
  );
};

export default LazyBlogSection;