import React from 'react';
import Layout from '@/components/layout/Layout';
import BaseSEO from '@/components/seo/BaseSEO';
import { buildBreadcrumbJsonLd } from '@/components/seo/jsonld';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const BlogIndex = () => {
  const title = 'EmviApp Beauty Industry Blog - Expert Insights & Career Tips';
  const description = 'Discover expert insights on beauty industry trends, professional development, salon management, and career growth strategies for nail artists, hair stylists, and beauty professionals.';
  const canonical = '/blog';

  const breadcrumbData = [
    { name: "Blog", url: "https://www.emvi.app/blog" }
  ];

  const blogPosts = [
    {
      title: 'How AI Marketing is Changing the Beauty Industry',
      excerpt: 'Discover how AI agents help salons grow visibility, bookings, and brand loyalty through smart automation. Real strategies from Vietnamese-American beauty professionals.',
      url: '/blog/ai-marketing-beauty-industry',
      badge: '🔥 Pinned',
      readTime: '10 min read',
      publishedAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    },
    {
      title: 'How to Find the Best Beauty Professionals in the US (2025 Guide)',
      excerpt: 'Complete guide to finding top nail artists, hair stylists, lash techs, and beauty professionals in major US cities. Expert tips, red flags to avoid, and insider secrets.',
      url: '/blog/how-to-find-the-best-beauty-professionals',
      badge: 'Complete Guide',
      readTime: '15 min read',
      publishedAt: 'January 18, 2025'
    },
    {
      title: 'Why Weekly Pay Attracts Better Artists: The Salon Staffing Secret',
      excerpt: 'Discover how weekly payment schedules attract higher-quality beauty professionals, improve retention rates, and boost salon performance.',
      url: '/blog/why-weekly-pay-attracts-better-artists',
      badge: 'Salon Management',
      readTime: '8 min read',
      publishedAt: 'January 17, 2025'
    },
    {
      title: 'Top 7 Salon Staffing Mistakes to Avoid (2025 Guide)',
      excerpt: 'Avoid costly salon staffing mistakes that hurt your business. Learn the top hiring errors salon owners make and proven strategies to build a successful beauty team.',
      url: '/blog/top-salon-staffing-mistakes-to-avoid',
      badge: 'Avoid These Mistakes',
      readTime: '10 min read',
      publishedAt: 'January 16, 2025'
    },
    {
      title: 'How to Get More Clients as a Nail Tech: 12 Proven Strategies',
      excerpt: 'Boost your nail tech client base with proven marketing strategies, social media tips, and retention techniques. Complete guide for nail artists to grow their business.',
      url: '/blog/how-to-get-more-clients-as-a-nail-tech',
      badge: 'Business Growth',
      readTime: '12 min read',
      publishedAt: 'January 15, 2025'
    },
    {
      title: 'The Future of Beauty Industry in 2025: Trends Shaping Tomorrow',
      excerpt: 'Explore the future of beauty industry in 2025. Discover emerging trends in technology, sustainability, personalization, and career opportunities.',
      url: '/blog/the-future-of-beauty-industry-in-2025',
      badge: 'Industry Trends',
      readTime: '14 min read',
      publishedAt: 'January 14, 2025'
    }
  ];

  return (
    <Layout>
      <BaseSEO
        title={title}
        description={description}
        canonical={canonical}
        jsonLd={[
          buildBreadcrumbJsonLd(breadcrumbData)
        ]}
        type="website"
      />

      <div className="py-16">
        <Container>
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
              Beauty Industry Blog
            </h1>
            <p className="text-xl text-muted-foreground mb-4 max-w-3xl mx-auto">
              Expert insights, career tips, and industry trends for beauty professionals, salon owners, and aspiring artists
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="mb-4">
                    <Badge variant={index === 0 ? "default" : "secondary"} className="mb-3">
                      {post.badge}
                    </Badge>
                    <h2 className="text-xl font-bold mb-3 line-clamp-2">
                      <a href={post.url} className="hover:text-primary transition-colors">
                        {post.title}
                      </a>
                    </h2>
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
                    <span>{post.publishedAt}</span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <a 
                    href={post.url}
                    className="inline-flex items-center text-primary hover:underline text-sm font-medium mt-3"
                  >
                    Read More →
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Get the latest insights on beauty industry trends, career development, and professional growth delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default BlogIndex;