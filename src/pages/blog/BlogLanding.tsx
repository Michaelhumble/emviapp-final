import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, Star, Users, Calendar, ArrowRight, Sparkles, BarChart3, Award, Building2, Palette, Trophy } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import DynamicSEO from '@/components/seo/DynamicSEO';
import viralHeroImage from '@/assets/viral-article-hero-new.jpg';
import OptimizedBlogImage from '@/components/blog/OptimizedBlogImage';
import LazyBlogSection from '@/components/blog/LazyBlogSection';
import { 
  getFeaturedArticles, 
  getTrendingArticles, 
  getRecentArticles, 
  getAllCategories,
  searchArticles,
  getAllTags 
} from '@/data/blogArticles';

const BlogLanding = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Always feature the viral article at the top
  const viralArticle = {
    id: 'viral-article-1',
    title: 'From Invisible to Unstoppable: How EmviApp Is Changing the Future of Beauty—for Everyone',
    description: 'Discover how EmviApp is transforming lives, building community, and making beauty visible—for everyone. Real stories of empowerment, AI innovation, and human connection.',
    url: '/article/from-invisible-to-unstoppable',
    image: viralHeroImage,
    publishedAt: 'Today',
    readTime: '12 min read',
    category: 'Featured Story',
    author: 'EmviApp Editorial Team',
    isFeatured: true,
    isViral: true
  };

  const featuredArticles = getFeaturedArticles();
  const trendingArticles = getTrendingArticles();
  const recentArticles = getRecentArticles().sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  ); // Sort by newest first
  const dynamicCategories = getAllCategories();
  const allTags = getAllTags();
  
  // Always use viral article as hero
  const heroArticle = viralArticle;
  
  // Get trending topics from most popular tags
  const trendingTopics = allTags.slice(0, 8).map(tag => tag.name);

  // Filter categories to only show those with articles, map to display format with icons and colors
  const validCategories = dynamicCategories.filter(cat => cat.count > 0);
  const categories = validCategories.length > 0 ? validCategories.map((cat, index) => {
    const icons = [Sparkles, BarChart3, Award, Building2, Palette, Trophy];
    const colors = [
      "bg-gradient-to-br from-pink-500/10 to-purple-500/10",
      "bg-gradient-to-br from-blue-500/10 to-cyan-500/10", 
      "bg-gradient-to-br from-yellow-500/10 to-orange-500/10",
      "bg-gradient-to-br from-green-500/10 to-emerald-500/10",
      "bg-gradient-to-br from-purple-500/10 to-indigo-500/10",
      "bg-gradient-to-br from-red-500/10 to-pink-500/10"
    ];
    const iconColors = ["text-pink-600", "text-blue-600", "text-yellow-600", "text-green-600", "text-purple-600", "text-red-600"];
    
    return {
      name: cat.name,
      slug: cat.slug,
      count: cat.count,
      color: colors[index % colors.length],
      icon: icons[index % icons.length],
      iconColor: iconColors[index % iconColors.length]
    };
  }) : [];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setIsSearching(true);
      const results = searchArticles(query);
      setSearchResults(results);
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  };

  return (
    <>
      <DynamicSEO
        title="EmviApp Blog - Beauty Industry Insights & Tips"
        description="Discover the latest beauty industry trends, salon management tips, artist spotlights, and success stories. Expert insights for beauty professionals."
        url="https://emvi.app/blog"
        type="website"
        image="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "EmviApp Blog",
          "description": "Beauty industry insights, salon management tips, and success stories",
          "url": "https://emvi.app/blog",
          "publisher": {
            "@type": "Organization",
            "name": "EmviApp",
            "logo": {
              "@type": "ImageObject",
              "url": "https://emvi.app/logo.png"
            }
          }
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
        {/* Hero Section */}
        <Container className="pt-20 pb-16">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200/50 rounded-full px-6 py-3 mb-8">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span className="text-purple-700 font-medium text-sm tracking-wide">WORLD-CLASS BEAUTY INSIGHTS</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-playfair font-bold leading-tight mb-8">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                The Future of
              </span>
              <br />
              <span className="text-gray-900">Beauty Business</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-10 leading-relaxed">
              Exclusive insights, proven strategies, and cutting-edge trends from the world's most successful beauty professionals and industry leaders.
            </p>
            
            {/* Enhanced Search Bar */}
            <div className="max-w-2xl mx-auto mb-10">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
                  <Input
                    type="text"
                    placeholder="Search premium beauty insights..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-14 pr-6 py-6 text-lg border-2 border-gray-200/50 rounded-2xl focus:border-purple-400 bg-white/80 backdrop-blur-sm shadow-lg transition-all duration-300 focus:shadow-xl"
                  />
                </div>
              </div>
              
              {isSearching && searchResults.length > 0 && (
                <div className="mt-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6 max-h-96 overflow-y-auto">
                  <h3 className="font-semibold text-gray-900 mb-4">Search Results ({searchResults.length})</h3>
                  <div className="space-y-3">
                    {searchResults.slice(0, 5).map((article) => (
                      <Link
                        key={article.id}
                        to={article.url}
                        className="block p-4 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 rounded-xl transition-all duration-200 group"
                      >
                        <h4 className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">{article.title}</h4>
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{article.description}</p>
                      </Link>
                    ))}
                    {searchResults.length > 5 && (
                      <p className="text-sm text-gray-500 text-center pt-3 border-t border-gray-100">
                        +{searchResults.length - 5} more premium articles
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Premium Stats */}
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-200/50">
                <Users className="h-5 w-5 text-purple-600" />
                <span className="font-medium">15,000+ Industry Leaders</span>
              </div>
              <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-200/50">
                <Calendar className="h-5 w-5 text-purple-600" />
                <span className="font-medium">Daily Expert Content</span>
              </div>
              <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-200/50">
                <Star className="h-5 w-5 text-purple-600" />
                <span className="font-medium">Industry-Leading Insights</span>
              </div>
            </div>
          </div>

          {/* Premium Featured Article Hero */}
          {heroArticle && (
            <div className="mb-20">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500"></div>
                <Link
                  to={heroArticle.url}
                  className="relative block bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-200/50"
                >
                  <div className="grid md:grid-cols-2 gap-0">
                    <OptimizedBlogImage
                      src={heroArticle.image}
                      alt={heroArticle.title}
                      className="group-hover:scale-110 transition-transform duration-700"
                      priority={true}
                      aspectRatio="5/4"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="p-10 md:p-16 flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-6">
                        <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold tracking-wide animate-pulse">
                          🔥 VIRAL ARTICLE
                        </span>
                        <span className="text-gray-500 text-sm font-medium">{heroArticle.readTime}</span>
                      </div>
                      <h3 className="text-3xl md:text-4xl font-playfair font-bold mb-6 group-hover:text-purple-700 transition-colors leading-tight">
                        {heroArticle.title}
                      </h3>
                      <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                        {heroArticle.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 font-medium">{heroArticle.publishedAt}</span>
                        <div className="flex items-center gap-2 text-purple-600 font-semibold">
                          <span>Read Article</span>
                          <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          )}
        </Container>

        {/* Categories Grid - Lazy Loaded */}
        {categories.length > 0 && (
          <LazyBlogSection 
            type="categories" 
            data={categories}
          />
        )}

        {/* Trending Articles - Lazy Loaded */}
        {trendingArticles.length > 0 && (
          <LazyBlogSection 
            type="trending" 
            data={trendingArticles}
          />
        )}

        {/* Trending Topics Tags - Lazy Loaded */}
        {trendingTopics.length > 0 && (
          <LazyBlogSection 
            type="topics" 
            data={trendingTopics}
          />
        )}

        {/* Featured Articles Grid - Lazy Loaded */}
        {featuredArticles.length > 1 && (
          <LazyBlogSection 
            type="featured" 
            data={featuredArticles}
          />
        )}

        {/* All Recent Articles - Complete Collection */}
        {recentArticles.length > 0 && (
          <LazyBlogSection 
            type="recent" 
            data={recentArticles}
          />
        )}


        {/* Newsletter Signup */}
        <Container className="py-16">
          <div className="bg-gradient-to-r from-primary to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Stay Ahead of the Curve</h2>
            <p className="text-xl mb-8 opacity-90">
              Get weekly insights, tips, and industry updates delivered to your inbox
            </p>
            <div className="max-w-md mx-auto">
              <div className="flex gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                />
                <Button variant="secondary" size="lg">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default BlogLanding;