
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Crown, Plus, TrendingUp, Users, Star, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { SalonSale } from "@/types/salonSale";
import { fetchSalonSales } from "@/utils/salonSales";
import SalonListingDetail from "@/components/sell-salon/SalonListingDetail";
import { SalonSalesFilters } from "@/components/sell-salon/SalonSalesFilters";
import { EnhancedSalonSalesGrid } from "@/components/sell-salon/EnhancedSalonSalesGrid";

// Define filter and sort types
type SortOption = "newest" | "lowest_price" | "highest_price" | "featured_first";
type BusinessTypeFilter = "all" | "Hair" | "Nails" | "Spa" | "Barbershop" | "Other";

interface FilterState {
  searchTerm: string;
  businessType: BusinessTypeFilter;
  priceRange: {
    min: string;
    max: string;
  };
  sortBy: SortOption;
}

const SalonSalesPage = () => {
  const navigate = useNavigate();
  const [salonSales, setSalonSales] = useState<SalonSale[]>([]);
  const [filteredSales, setFilteredSales] = useState<SalonSale[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSalon, setSelectedSalon] = useState<SalonSale | null>(null);
  
  // Filter and sort state
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: "",
    businessType: "all",
    priceRange: {
      min: "",
      max: ""
    },
    sortBy: "featured_first"
  });

  useEffect(() => {
    const loadSalonSales = async () => {
      setIsLoading(true);
      try {
        const data = await fetchSalonSales();
        setSalonSales(data);
        setFilteredSales(data);
      } catch (error) {
        console.error("Error loading salon sales:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSalonSales();
  }, []);

  useEffect(() => {
    // Apply filters and sorting
    let filtered = [...salonSales];
    
    // Apply search filter
    if (filters.searchTerm.trim() !== "") {
      const term = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (salon) =>
          salon.salon_name.toLowerCase().includes(term) ||
          salon.city.toLowerCase().includes(term) ||
          salon.state.toLowerCase().includes(term) ||
          (salon.description && salon.description.toLowerCase().includes(term)) ||
          (salon.business_type && salon.business_type.toLowerCase().includes(term))
      );
    }
    
    // Apply business type filter
    if (filters.businessType !== "all") {
      filtered = filtered.filter(salon => salon.business_type === filters.businessType);
    }
    
    // Apply price range filter
    if (filters.priceRange.min) {
      const minPrice = parseFloat(filters.priceRange.min);
      filtered = filtered.filter(salon => salon.asking_price >= minPrice);
    }
    
    if (filters.priceRange.max) {
      const maxPrice = parseFloat(filters.priceRange.max);
      filtered = filtered.filter(salon => salon.asking_price <= maxPrice);
    }
    
    // Apply sorting
    switch (filters.sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case "lowest_price":
        filtered.sort((a, b) => a.asking_price - b.asking_price);
        break;
      case "highest_price":
        filtered.sort((a, b) => b.asking_price - a.asking_price);
        break;
      case "featured_first":
        filtered.sort((a, b) => {
          // First sort by featured status
          if (a.is_featured && !b.is_featured) return -1;
          if (!a.is_featured && b.is_featured) return 1;
          
          // Then sort by newest
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });
        break;
    }
    
    // If not sorting by featured_first, still put featured listings at the top
    if (filters.sortBy !== "featured_first") {
      const featured = filtered.filter(salon => salon.is_featured);
      const nonFeatured = filtered.filter(salon => !salon.is_featured);
      filtered = [...featured, ...nonFeatured];
    }
    
    setFilteredSales(filtered);
  }, [salonSales, filters]);

  const handleViewDetails = (salon: SalonSale) => {
    setSelectedSalon(salon);
  };

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative container mx-auto px-4 py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur rounded-full text-sm font-medium mb-6">
                <Crown className="h-4 w-4" />
                The Most Exclusive Salon Marketplace
              </div>
              
              <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">
                Premium Salons
                <br />
                <span className="bg-gradient-to-r from-yellow-300 to-amber-300 bg-clip-text text-transparent">
                  For Sale
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
                Discover hand-picked salon opportunities from verified owners. 
                Where serious buyers meet successful sellers.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  onClick={() => navigate("/sell-salon/new")}
                  className="bg-white text-purple-600 hover:bg-gray-100 shadow-xl px-8 py-4 text-lg"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  List Your Salon
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg backdrop-blur"
                >
                  Browse Opportunities
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="container mx-auto px-4 -mt-10 relative z-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/90 backdrop-blur rounded-2xl p-6 text-center shadow-xl">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">127</div>
              <div className="text-sm text-gray-600">Successful Sales</div>
            </div>
            <div className="bg-white/90 backdrop-blur rounded-2xl p-6 text-center shadow-xl">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">8.3k</div>
              <div className="text-sm text-gray-600">Verified Buyers</div>
            </div>
            <div className="bg-white/90 backdrop-blur rounded-2xl p-6 text-center shadow-xl">
              <Star className="h-8 w-8 text-amber-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">$2.1M</div>
              <div className="text-sm text-gray-600">Average Sale</div>
            </div>
            <div className="bg-white/90 backdrop-blur rounded-2xl p-6 text-center shadow-xl">
              <Shield className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">100%</div>
              <div className="text-sm text-gray-600">Secure & Private</div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-16">
          {/* Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <SalonSalesFilters 
              filters={filters} 
              onFilterChange={handleFilterChange} 
            />
          </motion.div>

          {/* Salon Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <EnhancedSalonSalesGrid 
              salonSales={filteredSales} 
              isLoading={isLoading} 
              onViewDetails={handleViewDetails} 
            />
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20"
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Ready to Sell Your Salon?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join hundreds of successful salon owners who've sold with EmviApp. 
              Get maximum exposure to qualified buyers.
            </p>
            <Button 
              size="lg"
              onClick={() => navigate("/sell-salon/new")}
              className="bg-white text-purple-600 hover:bg-gray-100 shadow-xl px-8 py-4 text-lg"
            >
              <Crown className="h-5 w-5 mr-2" />
              List Your Salon Now
            </Button>
          </div>
        </motion.div>
      </div>

      {selectedSalon && (
        <SalonListingDetail
          salon={selectedSalon}
          onClose={() => setSelectedSalon(null)}
        />
      )}
    </Layout>
  );
};

export default SalonSalesPage;
