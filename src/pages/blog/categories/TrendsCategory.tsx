import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Clock, Calendar } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import BaseSEO from '@/components/seo/BaseSEO';
import { buildBreadcrumbJsonLd } from '@/components/seo/jsonld';
import BlogImage from '@/components/blog/BlogImage';

const TrendsCategory = () => {
  const articles = [
    {
      title: "Mobile-First Beauty Business: Why Your Salon Needs to Go Digital Now",
      slug: "mobile-first-beauty-business-2025",
      category: "salon-management",
      excerpt: "The beauty industry is rapidly shifting toward mobile-first experiences. Learn why salons that don't adapt risk losing 60% of potential clients and how to make the transition seamlessly.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      readTime: "7 min read",
      publishedAt: "January 15, 2025"
    },
    {
      title: "AI is Revolutionizing Beauty: 17 Tools Every Salon Owner Needs in 2025",
      slug: "ai-beauty-revolution-2025",
      category: "trends",
      excerpt: "Discover the 17 game-changing AI tools that are transforming the beauty industry. From automated booking to AI-powered color matching, stay ahead of the competition.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      readTime: "18 min read",
      publishedAt: "January 4, 2025"
    }
  ];

  return (
    <>
      <BaseSEO 
        title="Beauty Trends 2025 | Latest Industry Insights & Innovations"
        description="Stay ahead of the latest beauty industry trends. Discover emerging techniques, technology innovations, and consumer preferences shaping the beauty world in 2025."
        canonical="https://www.emvi.app/blog/categories/trends"
        type="website"
        jsonLd={[
          buildBreadcrumbJsonLd([
            { name: 'Home', url: 'https://www.emvi.app' },
            { name: 'Blog', url: 'https://www.emvi.app/blog' },
            { name: 'Beauty Trends', url: 'https://www.emvi.app/blog/categories/trends' }
          ]),
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What are the biggest beauty trends for 2025?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The biggest beauty trends for 2025 include AI-powered beauty tools, mobile-first salon experiences, personalized skincare, and sustainable beauty practices."
                }
              },
              {
                "@type": "Question", 
                "name": "How can beauty professionals stay updated on trends?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Beauty professionals can stay updated through industry publications, social media, trade shows, continuing education courses, and platforms like EmviApp that curate the latest insights."
                }
              }
            ]
          }
        ]}
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
              <TrendingUp className="h-8 w-8 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Beauty Trends
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Stay ahead of the curve with the latest beauty industry trends, innovations, and emerging techniques that are shaping the future of beauty.
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
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                        Trends
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
              Load More Articles
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
};

export default TrendsCategory;