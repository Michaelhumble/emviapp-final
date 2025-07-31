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
      title: "From Zero to 6-Figure Salon: How EmviApp Transformed One Entrepreneur's Dream",
      slug: "zero-to-six-figure-salon-success",
      category: "success-stories",
      excerpt: "Follow Jessica's incredible journey from a one-chair startup to a thriving 6-figure salon empire, and discover the strategies that made it possible.",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      readTime: "9 min read",
      publishedAt: "January 20, 2025",
      businessName: "Luxe Beauty Studio",
      growth: "400% increase in bookings"
    },
    {
      title: "Mobile Nail Artist Goes Viral: 50K Followers in 3 Months",
      slug: "mobile-nail-artist-viral-success",
      category: "success-stories", 
      excerpt: "Discover how one creative nail artist leveraged EmviApp's platform to build a massive social following and turn her passion into a 6-figure business.",
      image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      readTime: "6 min read",
      publishedAt: "January 16, 2025",
      businessName: "Nails by Natalie",
      growth: "50K social media followers"
    }
  ];

  return (
    <>
      <DynamicSEO
        title="Success Stories | Real Beauty Business Transformations"
        description="Read inspiring success stories from beauty professionals who transformed their careers and businesses. Discover proven strategies for building a thriving beauty business."
        url="https://emviapp.com/blog/category/success-stories"
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