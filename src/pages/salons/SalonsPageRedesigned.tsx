import React, { useState } from 'react';
import { useAuth } from '@/context/auth';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { realSalonListings, RealSalonListing, getFeaturedListings, getUrgentListings, getListingsByCategory, searchListings } from '@/data/salons/realSalonListings';
import PremiumSalonCard from '@/components/salons/PremiumSalonCard';
import SalonDetailModal from '@/components/salons/SalonDetailModal';
import { useNavigate } from 'react-router-dom';
import { Star, Crown, Sparkles, Search, MapPin, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SalonsPageRedesigned = () => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  
  // Modal state
  const [selectedSalon, setSelectedSalon] = useState<RealSalonListing | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  // Filter function
  const filterSalons = (salons: RealSalonListing[]) => {
    return salons.filter(salon => {
      const matchesSearch = !searchQuery || 
        salon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        salon.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        salon.description_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        salon.features.some(feature => feature.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesLocation = selectedLocation === "all" || 
        salon.location.toLowerCase().includes(selectedLocation.toLowerCase());
      
      const matchesCategory = selectedCategory === "all" || salon.category === selectedCategory;
      
      return matchesSearch && matchesLocation && matchesCategory;
    });
  };

  const handleViewDetails = (salon: RealSalonListing) => {
    setSelectedSalon(salon);
    setIsModalOpen(true);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedLocation("all");
    setSelectedCategory("all");
  };

  // Get filtered salons
  const filteredSalons = filterSalons(realSalonListings);
  const featuredSalons = filteredSalons.filter(s => s.featured);
  const urgentSalons = filteredSalons.filter(s => s.urgent);
  const vietnameseSalons = filteredSalons.filter(s => s.description_vi);

  return (
    <Layout>
      {/* Premium Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-blue-800 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center text-white">
          <div className="mb-6">
            <h1 className="text-6xl md:text-7xl font-bold mb-4 leading-tight">
              America's #1 Salon Marketplace
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-4xl mx-auto leading-relaxed">
              Where real beauty businesses change hands. Every listing is verified, premium, and powered by love and AI.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button size="lg" onClick={() => navigate('/sell-salon')} className="bg-white text-purple-700 hover:bg-purple-50 font-bold text-lg px-8 py-4">
              List Your Salon
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-purple-700 font-bold text-lg px-8 py-4">
              Browse Premium Listings
            </Button>
            <Button variant="outline" size="lg" className="border-purple-300 text-purple-100 hover:bg-purple-600 font-medium text-lg px-8 py-4">
              Why Sell on EmviApp?
            </Button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-purple-100">
            <div className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-yellow-300" />
              <span className="font-medium">3,200+ Salons Listed</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-300" />
              <span className="font-medium">Real Seller Direct</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-300" />
              <span className="font-medium">Premium Photos Only</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Bar */}
      <section className="bg-white py-6 border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search salons by name, location, or features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            
            <div className="flex gap-3">
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-48 h-12">
                  <MapPin className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="georgia">Georgia</SelectItem>
                  <SelectItem value="arkansas">Arkansas</SelectItem>
                  <SelectItem value="florida">Florida</SelectItem>
                  <SelectItem value="texas">Texas</SelectItem>
                  <SelectItem value="california">California</SelectItem>
                  <SelectItem value="new york">New York</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48 h-12">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="nails">Nail Salons</SelectItem>
                  <SelectItem value="hair">Hair Salons</SelectItem>
                  <SelectItem value="barber">Barber Shops</SelectItem>
                  <SelectItem value="massage">Massage Spas</SelectItem>
                  <SelectItem value="makeup">Beauty Studios</SelectItem>
                  <SelectItem value="brows">Brow & Lash</SelectItem>
                  <SelectItem value="tattoo">Tattoo Studios</SelectItem>
                </SelectContent>
              </Select>

              {(searchQuery || selectedLocation !== "all" || selectedCategory !== "all") && (
                <Button variant="outline" onClick={clearFilters} className="h-12">
                  Clear
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8" id="listings">
        {/* Urgent Listings */}
        {urgentSalons.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-red-100 p-2 rounded-lg">
                <Crown className="h-6 w-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">🔥 URGENT - Cần Sang Gấp</h2>
              <Badge className="bg-red-100 text-red-800 animate-pulse">Must Sell Fast</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* Featured Salons */}
        {featuredSalons.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Premium Featured Salons</h2>
              <Badge className="bg-purple-100 text-purple-800">Verified High-Value</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* Vietnamese Community */}
        {vietnameseSalons.length > 0 && (
          <section className="mb-12">
            <div className="border-t border-gray-200 pt-12 mb-8">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  🇻🇳 Tin Rao Vặt Tiệm Nail – Cộng Đồng Người Việt
                </h2>
                <p className="text-gray-600 text-lg">Real Vietnamese nail salon listings for our community</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vietnameseSalons.map(salon => (
                <PremiumSalonCard
                  key={salon.id}
                  salon={salon}
                  onViewDetails={() => handleViewDetails(salon)}
                />
              ))}
            </div>
          </section>
        )}

        {/* All Other Salons */}
        {filteredSalons.filter(s => !s.urgent && !s.description_vi).length > 0 && (
          <section className="mb-12">
            <div className="border-t border-gray-200 pt-12 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Sparkles className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">All Premium Salons</h2>
                <Badge className="bg-green-100 text-green-800">Verified Listings</Badge>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSalons.filter(s => !s.urgent && !s.description_vi).map(salon => (
                <PremiumSalonCard
                  key={salon.id}
                  salon={salon}
                  onViewDetails={() => handleViewDetails(salon)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Call to Action */}
        <section className="text-center mt-16 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to List Your Salon?
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of salon owners who've successfully sold their businesses on EmviApp. Premium exposure, verified buyers only.
          </p>
          <Button size="lg" onClick={() => navigate('/sell-salon')} className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-4">
            Post Your Salon Now
          </Button>
        </section>
      </div>
      {/* Detail Modal */}
      {selectedSalon && (
        <SalonDetailModal
          salon={selectedSalon}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </Layout>
  );
};

export default SalonsPageRedesigned;