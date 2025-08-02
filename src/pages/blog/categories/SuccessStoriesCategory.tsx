import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trophy, Clock, Calendar, TrendingUp } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import DynamicSEO from '@/components/seo/DynamicSEO';
import BlogImage from '@/components/blog/BlogImage';

const SuccessStoriesCategory = () => {
  const articles = [
    {
      title: "Client Retention Secrets: Keep Them Coming Back",
      slug: "client-retention-secrets-2025",
      category: "success-stories",
      excerpt: "Learn the insider strategies that top beauty professionals use to build lasting relationships and ensure clients return again and again.",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=2126&q=80",
      readTime: "6 min read",
      publishedAt: "January 30, 2025",
      businessName: "Industry Best Practices",
      growth: "90%+ client retention"
    }
  ];

  return (
    <>
      <DynamicSEO
        title="Success Stories | Real Beauty Business Transformations"
        description="Read inspiring success stories from beauty professionals who transformed their careers and businesses. Discover proven strategies for building a thriving beauty business."
        url="https://emvi.app/blog/category/success-stories"
        type="website"
        tags={['success stories', 'beauty business', 'entrepreneur stories', 'salon success']}
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
              <Trophy className="h-8 w-8 text-rose-600" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-primary bg-clip-text text-transparent">
                Success Stories
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Get inspired by real entrepreneurs who built thriving beauty businesses. Learn the strategies, mindset, and tools that led to their success.
            </p>
          </div>
        </Container>

        {/* Articles Grid */}
        <Container className="py-8">
          <div className="grid gap-8 max-w-4xl mx-auto">
            {articles.map((article, index) => (
              <Link
                key={index}
                to={`/blog/${article.category}/${article.slug}`}
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
                      <span className="bg-rose-500/10 text-rose-600 px-3 py-1 rounded-full font-medium">
                        Success Story
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
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-primary font-semibold">{article.businessName}</span>
                      <span className="text-muted-foreground">•</span>
                      <div className="flex items-center gap-1 text-green-600">
                        <TrendingUp className="h-4 w-4" />
                        <span className="font-medium">{article.growth}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-16">
            <Button size="lg" variant="outline" className="rounded-full">
              Load More Stories
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
};

export default SuccessStoriesCategory;