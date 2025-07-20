import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { realSalonListings, RealSalonListing, getFeaturedListings, getUrgentListings, getListingsByCategory, searchListings } from '@/data/salons/realSalonListings';
import PremiumSalonCard from '@/components/salons/PremiumSalonCard';
import SalonSaleCard from '@/components/salons/SalonSaleCard';
import SalonDetailModal from '@/components/salons/SalonDetailModal';
import { useNavigate } from 'react-router-dom';
import { Star, Crown, Sparkles, Search, MapPin, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { SalonSale } from '@/types/salonSale';
import PremiumSalonHero from '@/components/salons/PremiumSalonHero';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';

const SalonsPageRedesigned = () => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  
  // Modal state
  const [selectedSalon, setSelectedSalon] = useState<RealSalonListing | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Database salon sales state
  const [salonSales, setSalonSales] = useState<SalonSale[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  
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

  // Fetch salon sales from database with optimized pagination
  useEffect(() => {
    const fetchSalonSales = async () => {
      try {
        setLoading(true);
        
        // Use the optimized search function
        const { data, error } = await supabase
          .rpc('search_salon_sales_optimized', {
            search_text: searchQuery,
            location_filter: selectedLocation === 'all' ? '' : selectedLocation,
            price_min: 0,
            price_max: 10000000,
            business_type_filter: selectedCategory === 'all' ? '' : selectedCategory,
            page_limit: 20, // Production limit
            page_offset: 0
          });

        if (error) {
          console.error('Error fetching salon sales:', error);
          return;
        }

        if (data) {
          console.log('Fetched salon sales:', data.length, 'records');
          // Transform the data to match SalonSale interface
          const transformedData = data.map((item: any) => ({
            ...item,
            user_id: item.user_id || '',
            status: item.status || 'active',
            updated_at: item.updated_at || item.created_at
          }));
          setSalonSales(transformedData);
        }
      } catch (error) {
        console.error('Error loading salon sales:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalonSales();
  }, [searchQuery, selectedLocation, selectedCategory]);

  const handleViewDetails = (salon: RealSalonListing) => {
    setSelectedSalon(salon);
    setIsModalOpen(true);
  };

  const handleViewSalonSaleDetails = (salon: SalonSale) => {
    // Convert SalonSale to RealSalonListing format for modal compatibility
    const salonListing: RealSalonListing = {
      id: salon.id,
      name: salon.salon_name,
      location: salon.city && salon.state ? `${salon.city}, ${salon.state}` : salon.city || '',
      datePosted: new Date(salon.created_at).toLocaleDateString(),
      images: salon.images || [],
      price: `$${salon.asking_price.toLocaleString()}`,
      sqft: salon.square_feet ? parseInt(salon.square_feet) : undefined,
      description_en: salon.english_description || salon.description_combined || '',
      description_vi: salon.vietnamese_description,
      features: salon.features || [],
      contact: {
        phone: salon.contact_phone,
        email: salon.contact_email,
        name: salon.contact_name,
      },
      category: (salon.business_type?.toLowerCase() as any) || 'nails',
      featured: salon.is_featured,
      urgent: salon.is_urgent,
      monthlyRent: salon.monthly_rent || undefined,
    };
    
    setSelectedSalon(salonListing);
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

  // ✅ FIXED: Categorize salon sales by pricing tier for correct section placement
  const untilSoldSalons = salonSales.filter(salon => salon.selected_pricing_tier === 'annual');
  const premiumSalons = salonSales.filter(salon => salon.selected_pricing_tier === 'premium');
  const goldSalons = salonSales.filter(salon => salon.selected_pricing_tier === 'gold');
  const basicSalons = salonSales.filter(salon => salon.selected_pricing_tier === 'basic');
  
  // Featured listings are those with featured addon OR premium/gold tiers
  const featuredDbSalons = salonSales.filter(salon => 
    salon.is_featured || salon.featured_addon || salon.selected_pricing_tier === 'premium' || salon.selected_pricing_tier === 'gold'
  );
  
  // Get days remaining for any salon
  const getDaysRemaining = (salon: SalonSale) => {
    if (salon.selected_pricing_tier === 'annual') return 'Until Sold';
    if (!salon.expires_at) return '';
    const expiry = new Date(salon.expires_at);
    const now = new Date();
    const diffTime = expiry.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? `${diffDays} days left` : 'Expired';
  };

  return (
    <Layout>
      {/* New Premium Hero Section */}
      <PremiumSalonHero />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8" id="listings">
        
        {/* Until Sold Listings - Annual Plan ($149) */}
        {!loading && untilSoldSalons.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-2 rounded-lg">
                <Crown className="h-6 w-6 text-yellow-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">👑 Until Sold - Premium Unlimited</h2>
              <Badge className="bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border-yellow-200">
                No Expiration
              </Badge>
            </div>
            <p className="text-gray-600 mb-6 text-lg">Premium salons staying listed until they sell - maximum exposure</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {untilSoldSalons.map(salon => (
                <div key={salon.id} className="relative">
                  <SalonSaleCard
                    salon={salon}
                    onViewDetails={() => handleViewSalonSaleDetails(salon)}
                  />
                  <Badge className="absolute top-2 right-2 bg-yellow-500 text-white">
                    Until Sold
                  </Badge>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Premium Listings - Fast Sale Plan ($39.99) */}
        {!loading && premiumSalons.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-2 rounded-lg">
                <Crown className="h-6 w-6 text-purple-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">💎 Premium Listings (90 Days)</h2>
              <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-200">
                Fast Sale Plan
              </Badge>
            </div>
            <p className="text-gray-600 mb-6 text-lg">Premium visibility with top search placement for quick sales</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {premiumSalons.map(salon => (
                <div key={salon.id} className="relative">
                  <SalonSaleCard
                    salon={salon}
                    onViewDetails={() => handleViewSalonSaleDetails(salon)}
                  />
                  <Badge className="absolute top-2 right-2 bg-purple-500 text-white">
                    {getDaysRemaining(salon)}
                  </Badge>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Gold Listings - Standard Plan ($59.99) */}
        {!loading && goldSalons.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-2 rounded-lg">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">⭐ Featured Listings (60 Days)</h2>
              <Badge className="bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border-yellow-200">
                Standard Plan
              </Badge>
            </div>
            <p className="text-gray-600 mb-6 text-lg">Enhanced visibility with priority search placement</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {goldSalons.map(salon => (
                <div key={salon.id} className="relative">
                  <SalonSaleCard
                    salon={salon}
                    onViewDetails={() => handleViewSalonSaleDetails(salon)}
                  />
                  <Badge className="absolute top-2 right-2 bg-yellow-500 text-white">
                    {getDaysRemaining(salon)}
                  </Badge>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Basic Listings - Basic Plan ($19.99) */}
        {!loading && basicSalons.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-blue-100 to-blue-100 p-2 rounded-lg">
                <Sparkles className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">🔹 Standard Listings (30 Days)</h2>
              <Badge className="bg-gradient-to-r from-blue-100 to-blue-100 text-blue-800 border-blue-200">
                Basic Plan
              </Badge>
            </div>
            <p className="text-gray-600 mb-6 text-lg">Essential visibility for your salon listing</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {basicSalons.map(salon => (
                <div key={salon.id} className="relative">
                  <SalonSaleCard
                    salon={salon}
                    onViewDetails={() => handleViewSalonSaleDetails(salon)}
                  />
                  <Badge className="absolute top-2 right-2 bg-blue-500 text-white">
                    {getDaysRemaining(salon)}
                  </Badge>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Loading State with proper skeleton */}
        {loading && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-2 rounded-lg">
                <Crown className="h-6 w-6 text-purple-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">🔥 Loading Premium Salons...</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <LoadingSkeleton count={6} />
            </div>
          </section>
        )}

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
                  Tin Rao Vặt Tiệm Nail – Cộng Đồng Người Việt
                </h2>
                <p className="text-gray-600 text-lg">Vietnamese nail salon listings for our trusted community</p>
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

        {/* Pagination - temporarily commented out until we implement total count */}
        {/*
        {!loading && salonSales.length > 0 && totalPages > 1 && (
          <div className="mt-12">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              className="mb-8"
            />
          </div>
        )}
        */}

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