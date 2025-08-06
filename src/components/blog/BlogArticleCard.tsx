import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, User, ArrowRight } from 'lucide-react';
import { BlogArticle } from '@/data/blogArticles';
import OptimizedBlogImage from './OptimizedBlogImage';

interface BlogArticleCardProps {
  article: BlogArticle;
  variant?: 'default' | 'featured' | 'compact';
  showCategory?: boolean;
  showAuthor?: boolean;
  showImage?: boolean;
  className?: string;
  priority?: boolean;
}

const BlogArticleCard: React.FC<BlogArticleCardProps> = ({
  article,
  variant = 'default',
  showCategory = true,
  showAuthor = true,
  showImage = true,
  className = '',
  priority = false
}) => {
  const isFeatured = variant === 'featured';
  const isCompact = variant === 'compact';

  return (
    <article className={`group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 ${className}`}>
      {showImage && (
        <div className={`relative overflow-hidden ${isFeatured ? 'aspect-[16/9]' : isCompact ? 'aspect-[4/3]' : 'aspect-[3/2]'}`}>
          <Link to={article.url} className="block h-full">
            <OptimizedBlogImage
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              priority={priority}
              aspectRatio={isFeatured ? '16/9' : isCompact ? '4/3' : '3/2'}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {article.featured && (
              <div className="absolute top-4 left-4">
                <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </span>
              </div>
            )}
            {article.trending && (
              <div className="absolute top-4 right-4">
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Trending
                </span>
              </div>
            )}
          </Link>
        </div>
      )}

      <div className={`p-6 ${isCompact ? 'p-4' : ''}`}>
        {/* Category & Meta */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          {showCategory && (
            <Link 
              to={`/blog/categories/${article.categorySlug}`}
              className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium hover:bg-primary/20 transition-colors"
            >
              {article.category}
            </Link>
          )}
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {article.publishedAt}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {article.readTime}
          </div>
        </div>

        {/* Title */}
        <h3 className={`font-bold leading-tight mb-3 group-hover:text-primary transition-colors ${
          isFeatured ? 'text-2xl' : isCompact ? 'text-lg' : 'text-xl'
        }`}>
          <Link to={article.url} className="block">
            {article.title}
          </Link>
        </h3>

        {/* Description */}
        <p className={`text-muted-foreground mb-4 ${isCompact ? 'line-clamp-2' : 'line-clamp-3'}`}>
          {article.description}
        </p>

        {/* Tags */}
        {!isCompact && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.slice(0, 3).map((tag, index) => (
              <Link
                key={index}
                to={`/blog?tag=${encodeURIComponent(tag)}`}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full hover:bg-gray-200 transition-colors"
              >
                #{tag}
              </Link>
            ))}
            {article.tags.length > 3 && (
              <span className="text-xs text-gray-500 px-2 py-1">
                +{article.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          {showAuthor && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                E
              </div>
              <div>
                <p className="text-sm font-medium">{article.author}</p>
              </div>
            </div>
          )}

          <Link
            to={article.url}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
          >
            Continue Reading
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogArticleCard;