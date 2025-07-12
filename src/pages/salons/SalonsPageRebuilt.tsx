import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, DollarSign, Filter, Star, Crown, Sparkles, Scissors, Hand, Droplets, Palette, Eye, Brush } from 'lucide-react';
import { realSalonListings, RealSalonListing, getFeaturedListings, getListingsByCategory, searchListings } from '@/data/salons/realSalonListings';
import PremiumSalonCard from '@/components/salons/PremiumSalonCard';

const SalonsPageRebuilt = () => {
  const navigate = useNavigate();
  
  // State for filters and search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSalon, setSelectedSalon] = useState<RealSalonListing | null>(null);

  // Filter functions
  const filterSalons = (salons: RealSalonListing[]) => {
    return salons.filter(salon => {
      // Search query filter
      const matchesSearch = !searchQuery || 
        salon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        salon.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        salon.description_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        salon.features.some(feature => 
          feature.toLowerCase().includes(searchQuery.toLowerCase())
        );
      
      // Location filter
      const matchesLocation = selectedLocation === "all" || 
        salon.location.toLowerCase().includes(selectedLocation.toLowerCase());
      
      // Price range filter
      const matchesPrice = selectedPriceRange === "all" || (() => {
        const price = salon.price.replace(/[^\\d]/g, '') || '0';
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
      const matchesCategory = selectedCategory === "all" || salon.category === selectedCategory;
      
      return matchesSearch && matchesLocation && matchesPrice && matchesCategory;
    });
  };

  // Handle modal
  const handleViewDetails = (salon: RealSalonListing) => {
    setSelectedSalon(salon);
    // TODO: Open modal or navigate to detail page
    console.log('View details for:', salon.name);
  };

  // Clear filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedLocation("all");
    setSelectedPriceRange("all");
    setSelectedCategory("all");
  };

  // Get filtered data
  const filteredSalons = filterSalons(realSalonListings);
  const featuredSalons = filterSalons(getFeaturedListings());
  const urgentSalons = filteredSalons.filter(s => s.urgent);

  // Category tabs
  const categoryTabs = [
    { id: 'all', label: 'All Salons', icon: Star },
    { id: 'nails', label: 'Nail Salons', icon: Sparkles },
    { id: 'hair', label: 'Hair Salons', icon: Scissors },
    { id: 'barber', label: 'Barbershops', icon: Scissors },
    { id: 'massage', label: 'Massage & Spa', icon: Hand },
    { id: 'facial', label: 'Skincare', icon: Droplets },
    { id: 'makeup', label: 'Beauty Bars', icon: Palette },
    { id: 'brows', label: 'Brows & Lashes', icon: Eye },
    { id: 'tattoo', label: 'Tattoo Studios', icon: Brush }
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* BILLION-DOLLAR HERO SECTION */}
      <section className="relative bg-gradient-to-br from-purple-50 via-white to-blue-50 py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-gradient-to-br from-purple-300/10 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative z-10">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm border border-purple-200 rounded-full px-6 py-3 mb-8 shadow-lg">
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-gray-700">Trusted by 3,200+ Salon Owners Nationwide</span>
          </div>
          
          {/* Hero Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-playfair font-bold text-gray-900 mb-6 sm:mb-8 leading-tight">
            <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              America's #1
            </span>
            <span className="block text-gray-900">Salon Marketplace</span>
          </h1>
          
          <p className="text-xl sm:text-2xl md:text-3xl text-gray-600 mb-8 sm:mb-10 md:mb-12 max-w-5xl mx-auto leading-relaxed">
            Where real beauty businesses change hands. Every listing is verified, premium, and powered by love and AI.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16">
            <Button 
              size="lg" 
              onClick={() => navigate('/salon-owners')} 
              className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
            >
              List Your Salon
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-bold py-4 px-8 text-lg transition-all duration-300"
            >
              Browse Premium Listings
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto border-2 border-gray-300 text-gray-700 hover:bg-gray-100 font-bold py-4 px-8 text-lg transition-all duration-300"
            >
              Why Sell on EmviApp?
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="font-medium">3,200+ salons listed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="font-medium">Real seller direct</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="font-medium">Premium photos only</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="font-medium">Secure transactions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="font-medium">5-star rated</span>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH & FILTER BAR - Non-sticky */}
      <section className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search salon name, location, or features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
            
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Location Filter */}
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-full sm:w-48 h-12">
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="california">California</SelectItem>
                  <SelectItem value="texas">Texas</SelectItem>
                  <SelectItem value="florida">Florida</SelectItem>
                  <SelectItem value="new york">New York</SelectItem>
                  <SelectItem value="georgia">Georgia</SelectItem>
                  <SelectItem value="arkansas">Arkansas</SelectItem>
                  <SelectItem value="arizona">Arizona</SelectItem>
                  <SelectItem value="tennessee">Tennessee</SelectItem>
                </SelectContent>
              </Select>

              {/* Price Range Filter */}
              <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                <SelectTrigger className="w-full sm:w-48 h-12">
                  <SelectValue placeholder="All Prices" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under-200k">Under $200K</SelectItem>
                  <SelectItem value="200k-500k">$200K - $500K</SelectItem>
                  <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                  <SelectItem value="over-1m">Over $1M</SelectItem>
                </SelectContent>
              </Select>

              {/* Clear Filters */}
              {(searchQuery || selectedLocation !== "all" || selectedPriceRange !== "all" || selectedCategory !== "all") && (
                <Button 
                  variant="outline" 
                  onClick={clearFilters}
                  className="h-12 px-4"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY TABS */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex overflow-x-auto scrollbar-hide gap-2">
            {categoryTabs.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2 whitespace-nowrap min-w-fit"
              >
                <category.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{category.label}</span>
                <span className="sm:hidden">{category.label.split(' ')[0]}</span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8" id="listings">
        {/* URGENT LISTINGS */}
        {urgentSalons.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <Crown className="h-8 w-8 text-red-500" />
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">🚨 Urgent Opportunities</h2>
                <p className="text-gray-600">Act fast - these won't last!</p>
              </div>
              <Badge className="bg-red-100 text-red-800 text-sm font-bold px-3 py-1">
                LIMITED TIME
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {urgentSalons.map(salon => (
                <PremiumSalonCard
                  key={salon.id}
                  salon={salon}
                  onViewDetails={() => handleViewDetails(salon)}
                />
              ))}
            </div>
          </section>
        )}

        {/* FEATURED LISTINGS */}
        {featuredSalons.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <Sparkles className="h-8 w-8 text-purple-500" />
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">✨ Featured Premium Salons</h2>
                <p className="text-gray-600">Verified opportunities from trusted sellers</p>
              </div>
              <Badge className="bg-purple-100 text-purple-800 text-sm font-bold px-3 py-1">
                PREMIUM
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {featuredSalons.map(salon => (
                <PremiumSalonCard
                  key={salon.id}
                  salon={salon}
                  onViewDetails={() => handleViewDetails(salon)}
                />
              ))}
            </div>
          </section>
        )}

        {/* ALL LISTINGS */}
        {filteredSalons.length > 0 ? (
          <section>
            <div className="flex items-center gap-4 mb-6">
              <Star className="h-8 w-8 text-gray-600" />
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">All Available Salons</h2>
                <p className="text-gray-600">
                  {filteredSalons.length} listing{filteredSalons.length !== 1 ? 's' : ''} found
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredSalons.map(salon => (
                <PremiumSalonCard
                  key={salon.id}
                  salon={salon}
                  onViewDetails={() => handleViewDetails(salon)}
                />
              ))}
            </div>
          </section>
        ) : (
          /* NO RESULTS */
          <section className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No salons found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <Button onClick={clearFilters} className="bg-purple-600 hover:bg-purple-700">
              Clear All Filters
            </Button>
          </section>
        )}

        {/* CALL TO ACTION */}
        <section className="mt-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-8 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Sell Your Salon?</h3>
          <p className="text-xl mb-6">Join thousands of successful salon owners who've sold on EmviApp</p>
          <Button 
            size="lg"
            onClick={() => navigate('/salon-owners')}
            className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-8 py-4 text-lg"
          >
            List Your Salon Today
          </Button>
        </section>
      </div>
    </div>
  );
};

export default SalonsPageRebuilt;