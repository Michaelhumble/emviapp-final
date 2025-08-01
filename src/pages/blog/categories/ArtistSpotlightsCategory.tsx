import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Award, Clock, Calendar, Star } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import DynamicSEO from '@/components/seo/DynamicSEO';
import BlogImage from '@/components/blog/BlogImage';

const ArtistSpotlightsCategory = () => {
  const articles = [
    {
      title: "Building Client Loyalty: Proven Strategies for Lash Technicians",
      slug: "client-loyalty-lash-techs",
      category: "artist-spotlights",
      excerpt: "Master the art of client retention with strategies that turn first-time customers into lifelong advocates for your lash business.",
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      readTime: "7 min read",
      publishedAt: "January 31, 2025",
      artistName: "Industry Expert",
      specialty: "Lash Technician",
      rating: 5.0
    },
    {
      title: "Rising Star: Maria Rodriguez's Journey from Apprentice to Award-Winning Nail Artist",
      slug: "maria-rodriguez-nail-artist-spotlight",
      category: "artist-spotlights",
      excerpt: "From struggling to find clients to winning national nail art competitions, Maria's inspiring journey shows how dedication and the right platform can transform a career.",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      readTime: "5 min read",
      publishedAt: "January 18, 2025",
      artistName: "Maria Rodriguez",
      specialty: "Nail Artist",
      rating: 5.0
    },
    {
      title: "Master Colorist Sarah Chen: Redefining Hair Color Artistry in Beverly Hills",
      slug: "sarah-chen-hair-colorist-spotlight",
      category: "artist-spotlights",
      excerpt: "Meet the innovative colorist whose unique techniques have celebrities flying across the country for her signature color transformations.",
      image: "https://images.unsplash.com/photo-1560264280-88b68371db39?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      readTime: "7 min read",
      publishedAt: "January 14, 2025",
      artistName: "Sarah Chen",
      specialty: "Hair Colorist",
      rating: 4.9
    }
  ];

  return (
    <>
      <DynamicSEO
        title="Artist Spotlights | Meet the Beauty Industry's Rising Stars"
        description="Discover inspiring stories from talented beauty professionals making their mark in the industry. Get behind-the-scenes insights from artists who are redefining beauty standards."
        url="https://emvi.app/blog/category/artist-spotlights"
        type="website"
        tags={['artist spotlights', 'beauty professionals', 'success stories', 'artist interviews']}
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
              <Award className="h-8 w-8 text-yellow-600" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-600 via-orange-500 to-primary bg-clip-text text-transparent">
                Artist Spotlights
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Meet the exceptional artists who are pushing boundaries and setting new standards in the beauty industry. Get inspired by their stories and techniques.
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
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                      <span className="bg-yellow-500/10 text-yellow-600 px-3 py-1 rounded-full font-medium">
                        Artist Spotlight
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
                      <span className="text-primary font-semibold">{article.artistName}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{article.specialty}</span>
                      <span className="text-muted-foreground">•</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-muted-foreground">{article.rating}</span>
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
              Load More Spotlights
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
};

export default ArtistSpotlightsCategory;