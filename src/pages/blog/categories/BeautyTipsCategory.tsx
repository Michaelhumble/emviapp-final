import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Clock, Calendar } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import DynamicSEO from '@/components/seo/DynamicSEO';

const BeautyTipsCategory = () => {
  const articles = [
    {
      title: "The Ultimate Guide to Long-Lasting Nail Art: Pro Tips from Top Artists",
      slug: "long-lasting-nail-art-guide",
      category: "beauty-tips",
      excerpt: "Master the techniques that professional nail artists use to create stunning, durable nail art that lasts weeks, not days.",
      image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      readTime: "8 min read",
      publishedAt: "January 12, 2025"
    },
    {
      title: "Hair Color Maintenance: Keep Your Color Vibrant for Months",
      slug: "hair-color-maintenance-guide",
      category: "beauty-tips", 
      excerpt: "Professional colorists share their secrets for maintaining vibrant hair color, from the right products to styling techniques that preserve your investment.",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      readTime: "6 min read",
      publishedAt: "January 8, 2025"
    }
  ];

  return (
    <>
      <DynamicSEO
        title="Beauty Tips & Tutorials | Expert Advice for Professional Results"
        description="Get professional beauty tips and tutorials from industry experts. Learn techniques for hair, nails, makeup, and skincare that deliver salon-quality results at home."
        url="https://emviapp.com/blog/category/beauty-tips"
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
            {articles.map((article, index) => (
              <Link
                key={index}
                to={`/blog/${article.category}/${article.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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

export default BeautyTipsCategory;