
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Plus, Store, MapPin, DollarSign, Building, Loader2, Star } from "lucide-react";
import { SalonSale } from "@/types/salonSale";
import { fetchSalonSales, formatCurrency } from "@/utils/salonSales";
import SalonListingDetail from "@/components/sell-salon/SalonListingDetail";
import { SalonSalesFilters } from "@/components/sell-salon/SalonSalesFilters";

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
    sortBy: "newest"
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

  const getBusinessTypeIcon = (type?: string) => {
    switch (type) {
      case "Nails":
        return <Store className="h-4 w-4" />;
      case "Hair":
        return <Store className="h-4 w-4" />;
      case "Spa":
        return <Building className="h-4 w-4" />;
      case "Barbershop":
        return <Store className="h-4 w-4" />;
      default:
        return <Store className="h-4 w-4" />;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif mb-2">Salons For Sale</h1>
            <p className="text-gray-600">
              Find the perfect salon opportunity for your next business venture
            </p>
          </div>
          <Button 
            className="mt-4 md:mt-0" 
            onClick={() => navigate("/sell-salon/new")}
          >
            <Plus className="mr-2 h-4 w-4" /> List Your Salon
          </Button>
        </div>

        {/* Filter Bar Component */}
        <SalonSalesFilters 
          filters={filters} 
          onFilterChange={handleFilterChange} 
        />

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredSales.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Store className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-medium mb-2">No Salon Listings Found</h2>
            <p className="text-gray-600 mb-6">
              There are currently no salon listings that match your search criteria.
            </p>
            <Button onClick={() => navigate("/sell-salon/new")}>
              List Your Salon
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSales.map((salon) => (
              <Card 
                key={salon.id} 
                className={`overflow-hidden transition-shadow hover:shadow-md ${
                  salon.is_urgent ? "border-amber-400" : ""
                } ${
                  salon.is_featured ? "border-2 border-yellow-300 bg-yellow-50" : ""
                }`}
              >
                <div className="aspect-video bg-gray-200 relative">
                  {salon.is_urgent && (
                    <div className="absolute top-2 right-2 bg-amber-400 text-white py-1 px-2 rounded-md text-xs font-medium">
                      Urgent
                    </div>
                  )}
                  {salon.is_featured && (
                    <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 py-1 px-2 rounded-md text-xs font-medium flex items-center">
                      <Star className="h-3 w-3 mr-1 fill-yellow-900" /> Featured
                    </div>
                  )}
                  <img
                    src="https://placehold.co/600x400/e2e8f0/64748b?text=Salon+Image"
                    alt={salon.salon_name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-xl font-semibold mb-2 truncate">
                    {salon.salon_name}
                  </h3>
                  <div className="flex items-center text-gray-500 mb-1">
                    <MapPin className="h-4 w-4 mr-1 shrink-0" />
                    <span className="text-sm truncate">
                      {salon.city}, {salon.state}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-500 mb-3">
                    {getBusinessTypeIcon(salon.business_type)}
                    <span className="text-sm ml-1">{salon.business_type || 'Salon'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-primary font-semibold">
                      <DollarSign className="h-4 w-4 shrink-0" />
                      {formatCurrency(salon.asking_price)}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewDetails(salon)}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
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
