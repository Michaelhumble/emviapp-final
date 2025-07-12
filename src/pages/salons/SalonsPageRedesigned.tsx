import React, { useState } from 'react';
import { useAuth } from '@/context/auth';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { activeSalons } from '@/data/salons/active';
import { expiredSalons } from '@/data/salons/expired';
import { vietnameseSalons } from '@/data/salons/vietnamese';
import PremiumSalonCard from '@/components/salons/PremiumSalonCard';
import SalonDetailModal from '@/components/salons/SalonDetailModal';
import SalonFilterBar from '@/components/salons/SalonFilterBar';
import { Job } from '@/types/job';
import { useNavigate } from 'react-router-dom';
import { Star, Crown, Sparkles } from 'lucide-react';

const SalonsPageRedesigned = () => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  
  // Modal state
  const [selectedSalon, setSelectedSalon] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  // Filter function
  const filterSalons = (salons: Job[]) => {
    return salons.filter(salon => {
      const matchesSearch = !searchQuery || 
        salon.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        salon.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        salon.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        salon.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesLocation = selectedLocation === "all" || 
        salon.location?.toLowerCase().includes(selectedLocation.toLowerCase());
      
      return matchesSearch && matchesLocation;
    });
  };

  const handleViewDetails = (salon: Job) => {
    setSelectedSalon(salon);
    setIsModalOpen(true);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedLocation("all");
    setSelectedPriceRange("all");
  };

  // Get filtered salons by tier
  const filteredActive = filterSalons(activeSalons);
  const diamondSalons = filteredActive.filter(s => s.pricing_tier === 'diamond').slice(0, 3);
  const featuredSalons = filteredActive.filter(s => s.pricing_tier === 'featured').slice(0, 6);
  const premiumSalons = filteredActive.filter(s => s.pricing_tier === 'premium').slice(0, 9);
  const filteredExpired = filterSalons(expiredSalons).slice(0, 10);
  const filteredVietnamese = filterSalons(vietnameseSalons);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Premium Salon Marketplace
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover exclusive salon opportunities across America. Every listing is premium-verified with detailed financials and growth potential.
          </p>
          <div className="flex justify-center gap-4 mb-8">
            <Button size="lg" onClick={() => navigate('/salon-owners')} className="bg-purple-600 hover:bg-purple-700">
              Post Your Salon
            </Button>
            <Button variant="outline" size="lg" onClick={() => document.getElementById('listings')?.scrollIntoView()}>
              Browse Listings
            </Button>
          </div>
          <div className="text-sm text-gray-500">
            <Badge variant="outline" className="mr-2">Over 2,800 salons sold</Badge>
            <Badge variant="outline">Trusted marketplace since 2020</Badge>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <SalonFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
        selectedPriceRange={selectedPriceRange}
        onPriceRangeChange={setSelectedPriceRange}
        onClearFilters={clearFilters}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8" id="listings">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="all">All Categories</TabsTrigger>
            <TabsTrigger value="nails">Nail Salons</TabsTrigger>
            <TabsTrigger value="hair">Hair Salons</TabsTrigger>
            <TabsTrigger value="spa">Full Service</TabsTrigger>
            <TabsTrigger value="beauty">Beauty Bars</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-12">
            {/* Top Diamond Salons */}
            {diamondSalons.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Crown className="h-6 w-6 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Top Diamond Salons</h2>
                  <Badge className="bg-blue-100 text-blue-800">Ultra Luxury</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {diamondSalons.map(salon => (
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
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Star className="h-6 w-6 text-purple-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Featured Salons</h2>
                  <Badge className="bg-purple-100 text-purple-800">High Potential</Badge>
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

            {/* Premium Salons */}
            {premiumSalons.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="h-6 w-6 text-green-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Premium Salons</h2>
                  <Badge className="bg-green-100 text-green-800">Verified</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {premiumSalons.map(salon => (
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
            {filteredVietnamese.length > 0 && (
              <section>
                <div className="border-t border-gray-200 pt-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Tin Rao Vặt Tiệm Nail – Cộng Đồng Người Việt
                  </h2>
                  <p className="text-gray-600 mb-6">Vietnamese nail salon listings for our community</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredVietnamese.map(salon => (
                      <PremiumSalonCard
                        key={salon.id}
                        salon={salon}
                        onViewDetails={() => handleViewDetails(salon)}
                      />
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Recently Sold */}
            {filteredExpired.length > 0 && (
              <section>
                <div className="border-t border-gray-200 pt-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Recently Sold Salons</h2>
                  <p className="text-gray-600 mb-6">Don't miss the next opportunity - these sold quickly!</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredExpired.map(salon => (
                      <PremiumSalonCard
                        key={salon.id}
                        salon={salon}
                        onViewDetails={() => handleViewDetails(salon)}
                      />
                    ))}
                  </div>
                  <div className="text-center mt-8 bg-amber-50 border border-amber-200 rounded-lg p-6">
                    <p className="text-amber-700 font-medium mb-2">
                      💔 Missed Out? Sign Up to Unlock the Next Batch!
                    </p>
                    <p className="text-amber-600 text-sm mb-4">
                      Get notified when premium salons become available in your area.
                    </p>
                    <Button>Join Premium Alerts</Button>
                  </div>
                </div>
              </section>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Detail Modal */}
      <SalonDetailModal
        salon={selectedSalon}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Layout>
  );
};

export default SalonsPageRedesigned;