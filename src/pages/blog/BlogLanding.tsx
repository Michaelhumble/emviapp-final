import React from 'react';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, Star, Users, Calendar, ArrowRight, Sparkles, BarChart3, Award, Building2, Palette, Trophy } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import DynamicSEO from '@/components/seo/DynamicSEO';

const BlogLanding = () => {
  const featuredArticle = {
    title: "The Beauty Industry's Missing Piece: How EmviApp is Revolutionizing Salons Worldwide",
    slug: "the-beauty-industrys-missing-piece-emviapp",
    category: "industry",
    excerpt: "Discover why EmviApp is redefining success for nail, hair, and beauty salons—AI-powered, free booking, unlimited talent. See why the industry is making the switch.",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    readTime: "8 min read",
    publishedAt: "March 15, 2024",
    featured: true
  };

  const categories = [
    { 
      name: "Beauty Tips", 
      slug: "beauty-tips",
      count: 47,
      color: "bg-gradient-to-br from-pink-500/10 to-purple-500/10",
      icon: Sparkles,
      iconColor: "text-pink-600"
    },
    { 
      name: "Industry News", 
      slug: "industry",
      count: 23,
      color: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10",
      icon: BarChart3,
      iconColor: "text-blue-600"
    },
    { 
      name: "Artist Spotlights", 
      slug: "artist-spotlights",
      count: 31,
      color: "bg-gradient-to-br from-yellow-500/10 to-orange-500/10",
      icon: Award,
      iconColor: "text-yellow-600"
    },
    { 
      name: "Salon Management", 
      slug: "salon-management",
      count: 19,
      color: "bg-gradient-to-br from-green-500/10 to-emerald-500/10",
      icon: Building2,
      iconColor: "text-green-600"
    },
    { 
      name: "Trends", 
      slug: "trends",
      count: 56,
      color: "bg-gradient-to-br from-violet-500/10 to-purple-500/10",
      icon: Palette,
      iconColor: "text-violet-600"
    },
    { 
      name: "Success Stories", 
      slug: "success-stories",
      count: 12,
      color: "bg-gradient-to-br from-rose-500/10 to-pink-500/10",
      icon: Trophy,
      iconColor: "text-rose-600"
    }
  ];

  const trendingTopics = [
    "AI in Beauty Industry",
    "Sustainable Salon Practices",
    "Mobile Booking Trends",
    "Nail Art Innovations",
    "Hair Color Techniques",
    "Lash Extension Safety"
  ];

  const spotlightArtists = [
    {
      name: "Sofia Martinez",
      specialty: "Nail Artist",
      location: "Miami, FL",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5.0,
      reviews: 127
    },
    {
      name: "Marcus Chen",
      specialty: "Hair Stylist",
      location: "Los Angeles, CA",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 4.9,
      reviews: 203
    },
    {
      name: "Emma Thompson",
      specialty: "Makeup Artist",
      location: "New York, NY",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5.0,
      reviews: 89
    }
  ];

  return (
    <>
      <DynamicSEO
        title="Beauty Industry Blog | Expert Tips, Trends & Success Stories"
        description="Discover the latest beauty industry insights, expert tips, and success stories. Stay ahead with EmviApp's comprehensive beauty blog for professionals and enthusiasts."
        url="https://emviapp.com/blog"
        type="website"
        tags={['beauty blog', 'industry news', 'beauty tips', 'salon management', 'artist spotlights']}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "EmviApp Beauty Blog",
          "description": "The ultimate resource for beauty industry professionals, featuring expert tips, industry news, and success stories.",
          "url": "https://emviapp.com/blog",
          "publisher": {
            "@type": "Organization",
            "name": "EmviApp",
            "logo": {
              "@type": "ImageObject",
              "url": "https://emviapp.com/logo.png"
            }
          }
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        {/* Hero Section */}
        <Container className="py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 leading-tight">
              The Beauty Industry's Power Source
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Insider secrets, growth strategies, and the latest trends trusted by thousands of salons and artists nationwide.
            </p>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Join a community where real salon owners and artists level up, share wins, and get the inside track on every game-changing beauty innovation. Don't just keep up—get ahead, starting now.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-md mx-auto mb-16">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input 
                placeholder="Search articles, tips, trends..." 
                className="pl-10 h-12 text-lg bg-white/50 backdrop-blur-sm border-white/20"
              />
            </div>
          </div>
        </Container>

        {/* Featured Article */}
        <Container className="py-16">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Story</h2>
            <Link 
              to={`/blog/${featuredArticle.category}/${featuredArticle.slug}`}
              className="group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="grid md:grid-cols-2 gap-0">
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                    <span className="text-muted-foreground text-sm">{featuredArticle.readTime}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                    {featuredArticle.title}
                  </h3>
                  <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{featuredArticle.publishedAt}</span>
                    <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </Container>

        {/* Categories Grid */}
        <Container className="py-16">
          <h2 className="text-3xl font-bold mb-12 text-center">Explore Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Link
                  key={category.slug}
                  to={category.slug === 'salon-management' ? '/blog/salon-management/increase-salon-bookings-2025' : `/blog/category/${category.slug}`}
                  className={`${category.color} p-6 rounded-xl hover:scale-105 transition-all duration-300 group border border-white/20 backdrop-blur-sm`}
                >
                  <div className="mb-4">
                    <IconComponent className={`h-8 w-8 ${category.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {category.count} articles
                  </p>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
              );
            })}
          </div>
        </Container>

        {/* Trending Topics */}
        <Container className="py-16">
          <div className="text-center mb-12">
            <TrendingUp className="h-8 w-8 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Trending Now</h2>
            <p className="text-muted-foreground">What the beauty community is talking about</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {trendingTopics.map((topic, index) => (
              <Button
                key={index}
                variant="outline"
                className="rounded-full hover:bg-primary hover:text-white transition-colors"
                asChild
              >
                <Link to={`/blog/search?q=${encodeURIComponent(topic)}`}>
                  {topic}
                </Link>
              </Button>
            ))}
          </div>
        </Container>

        {/* Artist Spotlight */}
        <Container className="py-16">
          <div className="text-center mb-12">
            <Star className="h-8 w-8 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Artist Spotlight</h2>
            <p className="text-muted-foreground">Meet the talented professionals making waves in the beauty industry</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {spotlightArtists.map((artist, index) => (
              <Link
                key={index}
                to={`/u/${artist.name.toLowerCase().replace(' ', '-')}`}
                className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 group"
              >
                <img 
                  src={artist.image}
                  alt={artist.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 group-hover:scale-110 transition-transform"
                />
                <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                  {artist.name}
                </h3>
                <p className="text-primary text-sm mb-1">{artist.specialty}</p>
                <p className="text-muted-foreground text-sm mb-3">{artist.location}</p>
                <div className="flex items-center justify-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{artist.rating}</span>
                  <span className="text-muted-foreground">({artist.reviews})</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" className="rounded-full">
              <Link to="/artists">
                <Users className="h-5 w-5 mr-2" />
                Explore All Artists
              </Link>
            </Button>
          </div>
        </Container>

        {/* Newsletter CTA */}
        <Container className="py-16">
          <div className="bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-8 md:p-12 text-center">
            <Calendar className="h-12 w-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Stay Ahead of the Curve</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Get the latest beauty industry insights, expert tips, and exclusive content delivered to your inbox weekly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                placeholder="Enter your email" 
                className="flex-1 h-12 bg-white/50 backdrop-blur-sm"
              />
              <Button size="lg" className="h-12 px-8 rounded-lg">
                🚀 Subscribe for free tips and exclusive insights—get the tools top pros are using, before anyone else.
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default BlogLanding;