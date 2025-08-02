import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Clock, Calendar } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import DynamicSEO from '@/components/seo/DynamicSEO';
import BlogImage from '@/components/blog/BlogImage';
import { getArticlesByCategory } from '@/data/blogArticles';

const BeautyTipsCategory = () => {
  const [visibleArticles, setVisibleArticles] = useState(6);
  const allArticles = getArticlesByCategory('beauty-tips');
  const displayedArticles = allArticles.slice(0, visibleArticles);
  const hasMoreArticles = allArticles.length > visibleArticles;

  const loadMoreArticles = () => {
    setVisibleArticles(prev => Math.min(prev + 6, allArticles.length));
  };

  return (
    <>
      <DynamicSEO
        title="Beauty Tips & Tutorials | Expert Advice for Professional Results"
        description="Get professional beauty tips and tutorials from industry experts. Learn techniques for hair, nails, makeup, and skincare that deliver salon-quality results at home."
        url="https://emvi.app/blog/categories/beauty-tips"
        type="website"
        tags={['beauty tips', 'beauty tutorials', 'professional techniques', 'beauty advice']}
      />

      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        {/* Header Navigation */}
        <Container className="py-6">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/blog" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </Container>

        {/* Category Header */}
        <Container className="py-8">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Sparkles className="h-8 w-8 text-pink-600" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-primary bg-clip-text text-transparent">
                Beauty Tips
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Master professional techniques with expert tips and tutorials from top beauty professionals. Learn the secrets that create stunning, long-lasting results.
            </p>
          </div>
        </Container>

        {/* Articles Grid */}
        <Container className="py-8">
          <div className="grid gap-8 max-w-4xl mx-auto">
            {displayedArticles.map((article, index) => (
              <Link
                key={article.id}
                to={article.url}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="aspect-[4/3] overflow-hidden">
                    <BlogImage 
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                      <span className="bg-pink-500/10 text-pink-600 px-3 py-1 rounded-full font-medium">
                        Beauty Tips
                      </span>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {article.publishedAt}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {article.readTime}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {article.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More */}
          {hasMoreArticles && (
            <div className="text-center mt-16">
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-full"
                onClick={loadMoreArticles}
              >
                Load More Articles ({allArticles.length - visibleArticles} remaining)
              </Button>
            </div>
          )}
        </Container>
      </div>
    </>
  );
};

export default BeautyTipsCategory;