import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Building2, Clock, Calendar, TrendingUp } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import DynamicSEO from '@/components/seo/DynamicSEO';
import BlogArticleGrid from '@/components/blog/BlogArticleGrid';
import { getArticlesByCategory } from '@/data/blogArticles';
import BlogImage from '@/components/blog/BlogImage';

const SalonManagementCategory = () => {
  // Use actual articles from the registry instead of hardcoded data
  const articles = getArticlesByCategory('salon-management');

  return (
    <>
      <DynamicSEO
        title="Salon Management | Business Growth & Operations Guide"
        description="Master salon management with expert strategies for operations, marketing, staff management, and growth. Get the insights successful salon owners use to thrive."
        url="https://emvi.app/blog/categories/salon-management"
        type="website"
        tags={['salon management', 'business operations', 'salon marketing', 'staff management']}
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
              <Building2 className="h-8 w-8 text-green-600" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-primary bg-clip-text text-transparent">
                Salon Management
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Master the business side of beauty with proven strategies for operations, marketing, staff management, and sustainable growth.
            </p>
          </div>
        </Container>

        {/* Articles Grid */}
        <Container className="py-8">
          <div className="grid gap-8 max-w-4xl mx-auto">
            {articles.map((article, index) => (
              <Link
                key={index}
                to={`/blog/${article.categorySlug}/${article.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="aspect-[4/3] overflow-hidden">
                    <BlogImage 
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                      <span className="bg-green-500/10 text-green-600 px-3 py-1 rounded-full font-medium">
                        Salon Management
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

export default SalonManagementCategory;