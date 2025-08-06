import React, { useState, useEffect, useMemo } from 'react';
import { BlogArticle } from '@/data/blogArticles';
import BlogArticleCard from './BlogArticleCard';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface VirtualizedBlogGridProps {
  articles: BlogArticle[];
  variant?: 'default' | 'featured' | 'compact';
  showCategory?: boolean;
  showAuthor?: boolean;
  showImage?: boolean;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
  initialLoad?: number;
  loadMore?: number;
}

const VirtualizedBlogGrid: React.FC<VirtualizedBlogGridProps> = ({
  articles,
  variant = 'default',
  showCategory = true,
  showAuthor = true,
  showImage = true,
  columns = 3,
  className = '',
  initialLoad = 6,
  loadMore = 6
}) => {
  const [visibleCount, setVisibleCount] = useState(initialLoad);
  const [isLoading, setIsLoading] = useState(false);

  // Memoize visible articles to prevent unnecessary re-renders
  const visibleArticles = useMemo(() => 
    articles.slice(0, visibleCount), 
    [articles, visibleCount]
  );

  const hasMore = visibleCount < articles.length;

  const handleLoadMore = async () => {
    setIsLoading(true);
    
    // Simulate network delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setVisibleCount(prev => Math.min(prev + loadMore, articles.length));
    setIsLoading(false);
  };

  // Intersection observer for auto-loading when user scrolls near bottom
  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          handleLoadMore();
        }
      },
      { 
        rootMargin: '100px',
        threshold: 0.1
      }
    );

    const loadMoreTrigger = document.querySelector('[data-load-more-trigger]');
    if (loadMoreTrigger) {
      observer.observe(loadMoreTrigger);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoading]);

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No articles found</h3>
        <p className="text-gray-500">Check back later for more content!</p>
      </div>
    );
  }

  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  };

  return (
    <div className={className}>
      <div className={`grid ${gridClasses[columns]} gap-8`}>
        {visibleArticles.map((article, index) => (
          <BlogArticleCard
            key={article.id}
            article={article}
            variant={variant}
            showCategory={showCategory}
            showAuthor={showAuthor}
            showImage={showImage}
            priority={index < 3} // Prioritize first 3 images
          />
        ))}
      </div>

      {/* Load More Trigger */}
      {hasMore && (
        <div className="text-center mt-12" data-load-more-trigger>
          <div className="mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-purple-600 mr-3" />
              <span className="text-gray-600 font-medium">Loading more articles...</span>
            </div>
          ) : (
            <Button
              onClick={handleLoadMore}
              variant="outline"
              size="lg"
              className="bg-white hover:bg-purple-50 border-purple-200 text-purple-700 hover:text-purple-800 px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Load More Articles ({articles.length - visibleCount} remaining)
            </Button>
          )}
        </div>
      )}

      {/* Performance indicator for development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-4 text-xs text-gray-400 text-center">
          Showing {visibleCount} of {articles.length} articles
        </div>
      )}
    </div>
  );
};

export default VirtualizedBlogGrid;