import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import { getRelatedArticles, getArticleBySlug } from '@/data/blogArticles';
import OptimizedBlogImage from './OptimizedBlogImage';

interface RelatedPostsProps {
  currentSlug: string;
  maxPosts?: number;
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ currentSlug, maxPosts = 3 }) => {
  const currentArticle = getArticleBySlug(currentSlug);
  
  if (!currentArticle) {
    return null;
  }

  const relatedArticles = getRelatedArticles(currentArticle, maxPosts);

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <div className="mt-16 pt-12 border-t-2 border-gray-200">
      <div className="flex items-center gap-3 mb-8">
        <BookOpen className="w-8 h-8 text-primary" />
        <h2 className="text-3xl font-bold text-gray-900">Further Reading</h2>
      </div>
      
      <p className="text-lg text-gray-600 mb-8">
        Continue exploring these related articles to deepen your knowledge and discover more strategies for success.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {relatedArticles.map((article) => (
          <Link
            key={article.id}
            to={article.url}
            className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <OptimizedBlogImage
              src={article.image}
              alt={article.title}
              className="group-hover:scale-105 transition-transform duration-300"
              aspectRatio="16/10"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-gradient-to-r from-purple-100 to-pink-100 text-primary px-3 py-1 rounded-full text-xs font-medium">
                  {article.category}
                </span>
                <span className="text-gray-500 text-xs">{article.readTime}</span>
              </div>
              
              <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors leading-tight line-clamp-2">
                {article.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                {article.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{article.publishedAt}</span>
                <div className="flex items-center gap-2 text-primary text-sm font-semibold">
                  <span>Read more</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-lg transition-colors"
        >
          <span>View all articles</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default RelatedPosts;
