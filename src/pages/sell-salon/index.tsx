
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SalonSale } from "@/types/salonSale";
import { fetchSalonSales } from "@/utils/salonSales";
import SalonListingDetail from "@/components/sell-salon/SalonListingDetail";
import { SalonSalesFilters } from "@/components/sell-salon/SalonSalesFilters";
import { SalonSalesGrid } from "@/components/sell-salon/SalonSalesGrid";

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

        {/* Grid Component */}
        <SalonSalesGrid 
          salonSales={filteredSales} 
          isLoading={isLoading} 
          onViewDetails={handleViewDetails} 
        />
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
