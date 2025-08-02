import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, Star, Users, Calendar, ArrowRight, Sparkles, BarChart3, Award, Building2, Palette, Trophy } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import DynamicSEO from '@/components/seo/DynamicSEO';
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

  const featuredArticles = getFeaturedArticles();
  const trendingArticles = getTrendingArticles();
  const recentArticles = getRecentArticles(9);
  const dynamicCategories = getAllCategories();
  const allTags = getAllTags();
  
  // Get hero article
  const heroArticle = featuredArticles[0] || recentArticles[0];
  
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
        image="/assets/blog-landing-hero.jpg"
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

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
        {/* Hero Section */}
        <Container className="pt-20 pb-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Beauty Industry
              </span>
              <br />
              <span className="text-gray-900">Insights & Tips</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Expert insights, proven strategies, and success stories from the world's leading beauty professionals
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search articles, tips, and insights..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-primary bg-white/80 backdrop-blur-sm"
                />
              </div>
              
              {isSearching && searchResults.length > 0 && (
                <div className="mt-4 bg-white rounded-xl shadow-lg border p-4 max-h-96 overflow-y-auto">
                  <h3 className="font-semibold mb-3">Search Results ({searchResults.length})</h3>
                  <div className="space-y-2">
                    {searchResults.slice(0, 5).map((article) => (
                      <Link
                        key={article.id}
                        to={article.url}
                        className="block p-3 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <h4 className="font-medium text-sm">{article.title}</h4>
                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">{article.description}</p>
                      </Link>
                    ))}
                    {searchResults.length > 5 && (
                      <p className="text-xs text-gray-500 text-center pt-2">
                        +{searchResults.length - 5} more results
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>10,000+ Industry Professionals</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Updated Daily</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                <span>Expert-Vetted Content</span>
              </div>
            </div>
          </div>

          {/* Featured Article Hero */}
          {heroArticle && (
            <div className="mb-16">
              <Link
                to={heroArticle.url}
                className="group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={heroArticle.image}
                      alt={heroArticle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </span>
                      <span className="text-muted-foreground text-sm">{heroArticle.readTime}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {heroArticle.title}
                    </h3>
                    <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                      {heroArticle.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{heroArticle.publishedAt}</span>
                      <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
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