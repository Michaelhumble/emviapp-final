import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BlogArticle, getRelatedArticles } from '@/data/blogArticles';

interface RelatedArticlesProps {
  currentArticle: BlogArticle;
  limit?: number;
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({ currentArticle, limit = 3 }) => {
  const relatedArticles = getRelatedArticles(currentArticle, limit);

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Related Articles</h2>
          <p className="text-muted-foreground">Continue exploring beauty industry insights</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {relatedArticles.map((article) => (
            <Card key={article.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
                
                <h3 className="font-semibold text-lg mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {article.description}
                </p>
                
                <Button variant="ghost" asChild className="p-0 h-auto font-medium group">
                  <Link to={`/blog/${article.slug}`} className="flex items-center gap-2">
                    Read More
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {relatedArticles.length >= limit && (
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link to="/blog">View All Articles</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default RelatedArticles;