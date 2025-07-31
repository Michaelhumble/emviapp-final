import React from 'react';
import { BlogArticle } from '@/data/blogArticles';
import BlogArticleCard from './BlogArticleCard';

interface BlogArticleGridProps {
  articles: BlogArticle[];
  variant?: 'default' | 'featured' | 'compact';
  showCategory?: boolean;
  showAuthor?: boolean;
  showImage?: boolean;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

const BlogArticleGrid: React.FC<BlogArticleGridProps> = ({
  articles,
  variant = 'default',
  showCategory = true,
  showAuthor = true,
  showImage = true,
  columns = 3,
  className = ''
}) => {
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
    <div className={`grid ${gridClasses[columns]} gap-8 ${className}`}>
      {articles.map((article) => (
        <BlogArticleCard
          key={article.id}
          article={article}
          variant={variant}
          showCategory={showCategory}
          showAuthor={showAuthor}
          showImage={showImage}
        />
      ))}
    </div>
  );
};

export default BlogArticleGrid;