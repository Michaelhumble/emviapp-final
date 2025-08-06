import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, Star, Users, Calendar, ArrowRight, Sparkles, BarChart3, Award, Building2, Palette, Trophy } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import DynamicSEO from '@/components/seo/DynamicSEO';
import viralHeroImage from '@/assets/viral-article-hero-new.jpg';
import BlogArticleGrid from '@/components/blog/BlogArticleGrid';
import BlogArticleCard from '@/components/blog/BlogArticleCard';
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
  const recentArticles = getRecentArticles(9);
  const dynamicCategories = getAllCategories();
  const allTags = getAllTags();
  
  // Always use viral article as hero
  const heroArticle = viralArticle;
  
  // Get trending topics from most popular tags
  const trendingTopics = allTags.slice(0, 8).map(tag => tag.name);

  // Map dynamic categories to display format with icons and colors
  const categories = dynamicCategories.length > 0 ? dynamicCategories.map((cat, index) => {
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
                    <div className="aspect-[5/4] overflow-hidden">
                      <img 
                        src={heroArticle.image}
                        alt={heroArticle.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                    </div>
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

        {/* Categories Grid */}
        {categories.length > 0 && (
          <Container className="py-16">
            <h2 className="text-3xl font-bold mb-12 text-center">Explore Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Link
                    key={category.slug}
                    to={`/blog/categories/${category.slug}`}
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
        )}

        {/* Trending Articles */}
        {trendingArticles.length > 0 && (
          <Container className="py-16">
            <div className="text-center mb-12">
              <TrendingUp className="h-8 w-8 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Trending Now</h2>
              <p className="text-muted-foreground">The hottest topics in the beauty industry</p>
            </div>
            <BlogArticleGrid
              articles={trendingArticles.slice(0, 3)}
              variant="default"
              columns={3}
              showCategory={true}
              showAuthor={true}
              showImage={true}
            />
          </Container>
        )}

        {/* Trending Topics Tags */}
        {trendingTopics.length > 0 && (
          <Container className="py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Popular Topics</h2>
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
                  <Link to={`/blog?tag=${encodeURIComponent(topic)}`}>
                    #{topic}
                  </Link>
                </Button>
              ))}
            </div>
          </Container>
        )}

        {/* Featured Articles Grid */}
        {featuredArticles.length > 1 && (
          <Container className="py-16">
            <div className="text-center mb-12">
              <Star className="h-8 w-8 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Featured Articles</h2>
              <p className="text-muted-foreground">Hand-picked insights from industry experts</p>
            </div>
            <BlogArticleGrid
              articles={featuredArticles.slice(1, 4)} // Skip hero article
              variant="featured"
              columns={3}
              showCategory={true}
              showAuthor={true}
              showImage={true}
            />
          </Container>
        )}

        {/* Recent Articles */}
        <Container className="py-16">
          <div className="text-center mb-12">
            <Calendar className="h-8 w-8 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Latest Articles</h2>
            <p className="text-muted-foreground">Stay updated with the freshest content</p>
          </div>
          <BlogArticleGrid
            articles={recentArticles}
            variant="default"
            columns={3}
            showCategory={true}
            showAuthor={true}
            showImage={true}
          />
          
          {/* Strategic Sign-Up CTA Section */}
          <div className="mt-16 mb-8">
            <div className="bg-gradient-to-br from-purple-50 via-white to-pink-50 rounded-3xl p-8 md:p-12 border border-purple-100 shadow-lg">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200/50 rounded-full px-6 py-3 mb-6">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <span className="text-purple-700 font-medium text-sm tracking-wide">EXCLUSIVE ACCESS</span>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-gray-900">
                  Ready to Transform Your Beauty Career?
                </h3>
                
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                  Join thousands of beauty professionals who've found their dream opportunities through EmviApp. 
                  Start your journey today with premium job matching and industry connections.
                </p>
                
                {/* Dual CTA Implementation */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to="/auth/signup?redirect=%2F">
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      ✨ Create Your Free Account
                    </Button>
                  </Link>
                  
                  <Link to="/auth/signin?redirect=%2F">
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="border-purple-200 text-purple-700 hover:bg-purple-50 font-semibold px-8 py-4 rounded-xl"
                    >
                      Welcome Back! Sign In
                    </Button>
                  </Link>
                </div>
                
                {/* Browse Jobs Alternative */}
                <div className="mt-6">
                  <Link to="/jobs">
                    <Button 
                      variant="ghost" 
                      className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 font-medium"
                    >
                      See All Jobs – No Account Needed
                    </Button>
                  </Link>
                </div>
                
                {/* Trust Indicators */}
                <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-purple-600" />
                    <span>15,000+ professionals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-purple-600" />
                    <span>Premium opportunities</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-purple-600" />
                    <span>Trusted by top salons</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </Container>

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