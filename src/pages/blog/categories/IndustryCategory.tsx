import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BarChart3, Clock, Calendar } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import BaseSEO from '@/components/seo/BaseSEO';
import { buildBreadcrumbJsonLd } from '@/components/seo/jsonld';
import BlogImage from '@/components/blog/BlogImage';

const IndustryCategory = () => {
  const articles = [
    {
      title: "The Beauty Industry's Missing Piece: How EmviApp is Revolutionizing Salons Worldwide",
      slug: "the-beauty-industrys-missing-piece-emviapp",
      category: "industry",
      excerpt: "Discover why EmviApp is redefining success for nail, hair, and beauty salons—AI-powered, free booking, unlimited talent. See why the industry is making the switch.",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      readTime: "8 min read",
      publishedAt: "March 15, 2024",
      featured: true
    },
    {
      title: "Beauty Industry Report 2025: Market Trends and Growth Opportunities", 
      slug: "beauty-industry-report-2025",
      category: "industry",
      excerpt: "Comprehensive analysis of the global beauty market, emerging trends, and the most promising growth opportunities for beauty professionals in 2025.",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      readTime: "12 min read",
      publishedAt: "January 5, 2025"
    }
  ];

  return (
    <>
      <BaseSEO 
        title="Beauty Industry News & Analysis | Market Trends & Insights"
        description="Stay informed with the latest beauty industry news, market analysis, and professional insights. Get data-driven perspectives on trends shaping the beauty business."
        canonical="https://www.emvi.app/blog/categories/industry"
        type="website"
        jsonLd={[
          buildBreadcrumbJsonLd([
            { name: 'Home', url: 'https://www.emvi.app' },
            { name: 'Blog', url: 'https://www.emvi.app/blog' },
            { name: 'Industry News', url: 'https://www.emvi.app/blog/categories/industry' }
          ]),
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What are the current trends in the beauty industry?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The beauty industry is seeing growth in personalized services, AI-powered tools, sustainable practices, and mobile-first experiences that prioritize convenience and quality."
                }
              },
              {
                "@type": "Question", 
                "name": "How is technology changing the beauty industry?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Technology is revolutionizing beauty through virtual try-ons, AI-powered recommendations, automated booking systems, and digital platforms that connect professionals with clients."
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
              <BarChart3 className="h-8 w-8 text-blue-600" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-primary to-purple-600 bg-clip-text text-transparent">
                Industry News
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Stay informed with the latest beauty industry developments, market analysis, and insights that shape the future of beauty business.
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
                      <span className="bg-blue-500/10 text-blue-600 px-3 py-1 rounded-full font-medium">
                        {article.featured ? "Featured" : "Industry News"}
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

export default IndustryCategory;