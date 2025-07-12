import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Job } from '@/types/job';
import { Star, Crown, Sparkles, Scissors, Hand, Droplets, Palette, Eye, Brush, TrendingUp, MapPin } from 'lucide-react';

// Import all salon data
import { activeSalons } from '@/data/salons/active';
import { expiredSalons } from '@/data/salons/expired';
import { vietnameseSalons } from '@/data/salons/vietnamese';
import { realVietnameseSalons, featuredRealSalons } from '@/data/salons/realListings';

// Import components
import UniversalSalonCard from '@/components/salons/UniversalSalonCard';
import SalonDetailModalRedesigned from '@/components/salons/SalonDetailModalRedesigned';
import SalonSearchFilter from '@/components/salons/SalonSearchFilter';

const SalonsPageCompleteRedesign = () => {
  const { isSignedIn, user } = useAuth();
  const navigate = useNavigate();
  
  // Modal state
  const [selectedSalon, setSelectedSalon] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("all");

  // Industry tabs configuration
  const industryTabs = [
    { id: 'all', label: 'All Salons', icon: Star },
    { id: 'nails', label: 'Nail Salons', icon: Sparkles },
    { id: 'hair', label: 'Hair Salons', icon: Scissors },
    { id: 'spa', label: 'Full Service', icon: Hand },
    { id: 'skincare', label: 'Skincare', icon: Droplets },
    { id: 'makeup', label: 'Beauty Bars', icon: Palette },
    { id: 'brows', label: 'Brows & Lashes', icon: Eye },
    { id: 'tattoo', label: 'Tattoo Studios', icon: Brush }
  ];

  // Filter function
  const filterSalons = (salons: Job[]) => {
    return salons.filter(salon => {
      // Search query filter
      const matchesSearch = !searchQuery || 
        salon.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        salon.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        salon.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        salon.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        salon.salon_features?.some(feature => 
          feature.toLowerCase().includes(searchQuery.toLowerCase())
        );
      
      // Location filter
      const matchesLocation = selectedLocation === "all" || 
        salon.location?.toLowerCase().includes(selectedLocation.toLowerCase());
      
      // Price range filter
      const matchesPrice = selectedPriceRange === "all" || (() => {
        const price = salon.price?.replace(/[^\\d]/g, '') || '0';
        const priceNum = parseInt(price);
        switch (selectedPriceRange) {
          case 'under-200k': return priceNum < 200000;
          case '200k-500k': return priceNum >= 200000 && priceNum <= 500000;
          case '500k-1m': return priceNum >= 500000 && priceNum <= 1000000;
          case 'over-1m': return priceNum > 1000000;
          default: return true;
        }
      })();
      
      // Category filter
      const matchesCategory = selectedCategory === "all" || 
        salon.category?.toLowerCase().includes(selectedCategory.toLowerCase());
      
      // Tags filter
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => 
          salon.salon_features?.some(feature => 
            feature.toLowerCase().includes(tag.toLowerCase())
          ) ||
          salon.description?.toLowerCase().includes(tag.toLowerCase())
        );
      
      return matchesSearch && matchesLocation && matchesPrice && matchesCategory && matchesTags;
    });
  };

  // Handle modal
  const handleViewDetails = (salon: Job) => {
    setSelectedSalon(salon);
    setIsModalOpen(true);
  };

  // Clear filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedLocation("all");
    setSelectedPriceRange("all");
    setSelectedCategory("all");
    setSelectedTags([]);
  };

  // Handle tag toggle
  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // Get filtered data by tier
  const allActiveSalons = [...featuredRealSalons, ...activeSalons];
  const filteredActive = filterSalons(allActiveSalons);
  const diamondSalons = filteredActive.filter(s => s.pricing_tier === 'diamond').slice(0, 3);
  const featuredSalons = [...filterSalons(realVietnameseSalons), ...filteredActive.filter(s => s.pricing_tier === 'featured')].slice(0, 8);
  const premiumSalons = filteredActive.filter(s => s.pricing_tier === 'premium').slice(0, 9);
  const filteredExpired = filterSalons(expiredSalons).slice(0, 12);
  const filteredVietnamese = filterSalons([...vietnameseSalons, ...realVietnameseSalons]);

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* WORLD-CLASS HERO SECTION */}
      <section className="relative bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative z-10">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm border border-purple-200 rounded-full px-6 py-3 mb-8 shadow-lg">
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-gray-700">Trusted by 3,200+ Salon Owners Nationwide</span>
          </div>
          
          {/* Hero Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight">
            <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Premium Salon
            </span>
            <span className="block">Marketplace</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 sm:mb-10 md:mb-12 max-w-4xl mx-auto leading-relaxed px-4">
            Discover exclusive salon opportunities across America. Every listing is premium-verified with detailed financials, photo galleries, and direct owner contact.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-10 sm:mb-12 md:mb-16 px-4">
            <Button 
              size="lg" 
              onClick={() => navigate('/salon-owners')} 
              className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 text-base sm:text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
            >
              List Your Salon
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-bold py-3 sm:py-4 px-6 sm:px-8 text-base sm:text-lg transition-all duration-300"
            >
              Browse Premium Listings
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 text-xs sm:text-sm text-gray-500 px-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="font-medium">Over 3,200 salons sold</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="font-medium">Verified listings only</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="font-medium">Direct owner contact</span>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH & FILTER BAR */}
      <SalonSearchFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
        selectedPriceRange={selectedPriceRange}
        onPriceRangeChange={setSelectedPriceRange}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedTags={selectedTags}
        onTagToggle={handleTagToggle}
        onClearFilters={clearFilters}
        isSticky={true}
      />

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12 md:pt-4" id="listings">
        {/* Industry Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8 sm:mb-10 md:mb-12">
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="w-full max-w-4xl overflow-x-auto">
              <TabsList className="grid grid-cols-4 lg:grid-cols-8 bg-white shadow-lg rounded-xl border-0 p-1 min-w-max lg:min-w-0">
                {industryTabs.map(tab => (
                  <TabsTrigger 
                    key={tab.id} 
                    value={tab.id} 
                    className="flex items-center gap-1 sm:gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-lg py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm whitespace-nowrap"
                  >
                    <tab.icon className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline lg:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </div>

          <TabsContent value="all" className="space-y-16">
            {/* FEATURED REAL-LIFE LISTINGS */}
            <section>
              <div className="flex items-center gap-4 mb-8">
                <TrendingUp className="h-8 w-8 text-red-500" />
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Featured Salon Opportunities</h2>
                  <p className="text-gray-600">Real listings from verified sellers - Act fast, these won't last!</p>
                </div>
                <Badge className="bg-red-100 text-red-800 text-sm font-bold px-3 py-1">
                  HIGH DEMAND
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                {featuredSalons.slice(0, 8).map(salon => (
                  <UniversalSalonCard
                    key={salon.id}
                    salon={salon}
                    onViewDetails={() => handleViewDetails(salon)}
                    showAdmin={isSignedIn && user?.role === 'admin'}
                  />
                ))}
              </div>
              
              {/* FOMO Banner */}
              <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-2xl p-8 text-center">
                <h3 className="text-2xl font-bold mb-2">⚡ Don't Miss Out!</h3>
                <p className="text-lg mb-4">Premium salons sell within 48 hours on average. Set up alerts to get notified instantly.</p>
                <Button className="bg-white text-red-600 hover:bg-gray-100 font-bold px-8 py-3">
                  Set Up Premium Alerts
                </Button>
              </div>
            </section>

            {/* DIAMOND TIER */}
            {diamondSalons.length > 0 && (
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <Crown className="h-8 w-8 text-blue-600" />
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">Diamond Tier Salons</h2>
                    <p className="text-gray-600">Ultra-luxury opportunities with $1M+ revenue potential</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 text-sm font-bold px-3 py-1">
                    ULTRA LUXURY
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                  {diamondSalons.map(salon => (
                    <UniversalSalonCard
                      key={salon.id}
                      salon={salon}
                      onViewDetails={() => handleViewDetails(salon)}
                      showAdmin={isSignedIn && user?.role === 'admin'}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* PREMIUM SALONS */}
            {premiumSalons.length > 0 && (
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <Sparkles className="h-8 w-8 text-green-600" />
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">Premium Salon Listings</h2>
                    <p className="text-gray-600">Verified opportunities with proven track records</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 text-sm font-bold px-3 py-1">
                    VERIFIED
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {premiumSalons.map(salon => (
                    <UniversalSalonCard
                      key={salon.id}
                      salon={salon}
                      onViewDetails={() => handleViewDetails(salon)}
                      showAdmin={isSignedIn && user?.role === 'admin'}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* VIETNAMESE COMMUNITY */}
            {filteredVietnamese.length > 0 && (
              <section>
                <div className="border-t border-gray-200 pt-16">
                  <div className="flex items-center gap-4 mb-8">
                    <MapPin className="h-8 w-8 text-orange-600" />
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">
                        Tin Rao Vặt Tiệm Nail – Cộng Đồng Người Việt
                      </h2>
                      <p className="text-gray-600">Vietnamese nail salon listings for our community</p>
                    </div>
                    <Badge className="bg-orange-100 text-orange-800 text-sm font-bold px-3 py-1">
                      VIETNAMESE COMMUNITY
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {filteredVietnamese.map(salon => (
                      <UniversalSalonCard
                        key={salon.id}
                        salon={salon}
                        onViewDetails={() => handleViewDetails(salon)}
                        showAdmin={isSignedIn && user?.role === 'admin'}
                      />
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* RECENTLY SOLD */}
            {filteredExpired.length > 0 && (
              <section>
                <div className="border-t border-gray-200 pt-16">
                  <div className="flex items-center gap-4 mb-8">
                    <Star className="h-8 w-8 text-gray-600" />
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">Recently Sold Salons</h2>
                      <p className="text-gray-600">Don't miss the next opportunity - these sold quickly!</p>
                    </div>
                    <Badge className="bg-gray-100 text-gray-800 text-sm font-bold px-3 py-1">
                      SHOWCASE
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {filteredExpired.map(salon => (
                      <UniversalSalonCard
                        key={salon.id}
                        salon={salon}
                        onViewDetails={() => handleViewDetails(salon)}
                      />
                    ))}
                  </div>
                  
                  {/* FOMO Call-to-Action */}
                  <div className="text-center mt-12 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-8">
                    <div className="text-6xl mb-4">💔</div>
                    <h3 className="text-2xl font-bold text-amber-800 mb-2">
                      Missed Out? Don't Let It Happen Again!
                    </h3>
                    <p className="text-amber-700 mb-6 text-lg">
                      Get instant notifications when premium salons become available in your area.
                    </p>
                    <Button className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-8 py-3 text-lg">
                      Join Premium Alert List
                    </Button>
                  </div>
                </div>
              </section>
            )}
          </TabsContent>

          {/* Other tab contents would follow similar pattern */}
          {industryTabs.slice(1).map(tab => (
            <TabsContent key={tab.id} value={tab.id} className="space-y-8">
              <div className="text-center py-16">
                <tab.icon className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{tab.label} Coming Soon</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  We're curating premium {tab.label.toLowerCase()} opportunities. Sign up to be notified when they become available.
                </p>
                <Button className="mt-6 bg-purple-600 hover:bg-purple-700">
                  Get Notified
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* SALON DETAIL MODAL */}
      <SalonDetailModalRedesigned
        salon={selectedSalon}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default SalonsPageCompleteRedesign;
