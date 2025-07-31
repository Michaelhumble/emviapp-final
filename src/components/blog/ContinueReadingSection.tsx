import React from 'react';
import { BlogArticle, getRelatedArticles } from '@/data/blogArticles';
import BlogArticleGrid from './BlogArticleGrid';

interface ContinueReadingSectionProps {
  currentArticle: BlogArticle;
  limit?: number;
  title?: string;
  className?: string;
}

const ContinueReadingSection: React.FC<ContinueReadingSectionProps> = ({
  currentArticle,
  limit = 3,
  title = "Continue Reading",
  className = ''
}) => {
  const relatedArticles = getRelatedArticles(currentArticle, limit);

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover more insights and strategies to grow your beauty business
          </p>
        </div>

        <BlogArticleGrid
          articles={relatedArticles}
          variant="default"
          showCategory={true}
          showAuthor={true}
          showImage={true}
          columns={relatedArticles.length === 1 ? 1 : relatedArticles.length === 2 ? 2 : 3}
        />
      </div>
    </section>
  );
};

export default ContinueReadingSection;