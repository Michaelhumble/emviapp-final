
import { useState, useEffect } from "react";
import salonData from "@/data/salonData";

// Enhanced salon filters with additional filter options
export const defaultFilters: SalonFilters = {
  searchTerm: "",
  category: "",
  priceRange: [0, 500000],
  location: "",
  features: [],
  sortBy: "Newest"
};

// Define the SalonFilters type and export it
export interface SalonFilters {
  searchTerm: string;
  category: string;
  priceRange: number[];
  location: string;
  features: string[];
  sortBy: string;
}

// Placeholder images for salons without images
const placeholderImages = [
  "https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // Nail salon
  "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // Spa
  "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // Hair salon
  "https://images.unsplash.com/photo-1595476108010-b4d1db79bd01?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // Beauty salon
  "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // Modern salon interior
];

// Enhanced salon hook with full filtering functionality
export const useSalonsData = () => {
  // Add placeholder images to salons that don't have images
  const enhancedSalonData = salonData.map((salon, index) => {
    if (!salon.image) {
      // Use modulo to cycle through placeholder images
      const imageIndex = index % placeholderImages.length;
      return { ...salon, image: placeholderImages[imageIndex] };
    }
    return salon;
  });

  const [salons, setSalons] = useState<any[]>(enhancedSalonData || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [filters, setFilters] = useState<SalonFilters>(defaultFilters);
  const [searchTerm, setSearchTerm] = useState("");
  const [featuredSalons, setFeaturedSalons] = useState<any[]>(
    enhancedSalonData?.filter(salon => salon.is_featured) || []
  );
  const [suggestedKeywords] = useState<string[]>([
    "Nail Salon", 
    "Hair Salon", 
    "Day Spa", 
    "High Traffic",
    "Parking Available",
    "Equipment Included"
  ]);

  useEffect(() => {
    console.log("Salon filters updated:", filters);
    console.log("Current search term:", searchTerm);
    
    try {
      setLoading(true);
      
      // Apply filters to salon data
      const filtered = enhancedSalonData.filter(salon => {
        // Filter by search term (company name or location)
        if (searchTerm && 
            !salon.company?.toLowerCase().includes(searchTerm.toLowerCase()) && 
            !salon.location?.toLowerCase().includes(searchTerm.toLowerCase())) {
          return false;
        }
        
        // Filter by category/type
        if (filters.category && 
            !salon.salon_type?.toLowerCase().includes(filters.category.toLowerCase()) &&
            !salon.salon_features?.some((feature: string) => 
              feature.toLowerCase().includes(filters.category.toLowerCase()))) {
          return false;
        }
        
        // Filter by location
        if (filters.location && 
            !salon.location?.toLowerCase().includes(filters.location.toLowerCase())) {
          return false;
        }
        
        // Filter by price range
        if (filters.priceRange && filters.priceRange.length === 2) {
          const price = parseFloat(salon.asking_price?.replace(/[^0-9.-]+/g, "") || "0");
          if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
            return false;
          }
        }
        
        // Filter by features
        if (filters.features && filters.features.length > 0) {
          if (!salon.salon_features || !Array.isArray(salon.salon_features)) {
            return false;
          }
          
          // Check if the salon has at least one of the selected features
          const hasSelectedFeatures = filters.features.some(feature => 
            salon.salon_features?.some((salonFeature: string) => 
              salonFeature.toLowerCase().includes(feature.toLowerCase())
            )
          );
          
          if (!hasSelectedFeatures) {
            return false;
          }
        }
        
        return true;
      });
      
      // Apply sorting
      let sortedResults = [...filtered];
      
      if (filters.sortBy === "Newest") {
        sortedResults.sort((a, b) => {
          const dateA = new Date(a.created_at || a.posted_at || "");
          const dateB = new Date(b.created_at || b.posted_at || "");
          return dateB.getTime() - dateA.getTime();
        });
      }
      else if (filters.sortBy === "Price: Low to High") {
        sortedResults.sort((a, b) => {
          const priceA = parseFloat(a.asking_price?.replace(/[^0-9.-]+/g, "") || "0");
          const priceB = parseFloat(b.asking_price?.replace(/[^0-9.-]+/g, "") || "0");
          return priceA - priceB;
        });
      }
      else if (filters.sortBy === "Price: High to Low") {
        sortedResults.sort((a, b) => {
          const priceA = parseFloat(a.asking_price?.replace(/[^0-9.-]+/g, "") || "0");
          const priceB = parseFloat(b.asking_price?.replace(/[^0-9.-]+/g, "") || "0");
          return priceB - priceA;
        });
      }
      
      setSalons(sortedResults);
      console.log(`Found ${sortedResults.length} salons matching current filters`);
      setLoading(false);
    } catch (err) {
      console.error("Error filtering salons:", err);
      setError(err as Error);
      setLoading(false);
    }
  }, [filters, searchTerm]);

  const resetFilters = () => {
    console.log("Resetting all filters");
    setFilters(defaultFilters);
    setSearchTerm("");
  };

  const updateFilters = (newFilters: Partial<SalonFilters>) => {
    console.log("Updating filters:", newFilters);
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return { 
    salons, 
    loading, 
    error, 
    filters, 
    searchTerm, 
    updateFilters, 
    setSearchTerm, 
    resetFilters,
    featuredSalons,
    suggestedKeywords
  };
};

export default useSalonsData;
