
import { useState, useEffect } from "react";
import salonData from "@/data/salonData";

// Simple default filters
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

// Simplified salon hook with minimal functionality
export const useSalonsData = () => {
  const [salons, setSalons] = useState<any[]>(salonData || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [filters, setFilters] = useState<SalonFilters>(defaultFilters);
  const [searchTerm, setSearchTerm] = useState("");
  const [featuredSalons, setFeaturedSalons] = useState<any[]>(
    salonData?.filter(salon => salon.is_featured) || []
  );
  const [suggestedKeywords] = useState<string[]>([
    "Nail Salon", 
    "Hair Salon", 
    "Day Spa", 
    "High Traffic"
  ]);

  useEffect(() => {
    console.log("Salon filters updated:", filters);
    console.log("Current search term:", searchTerm);
    
    try {
      // Apply filters to salon data
      const filtered = salonData.filter(salon => {
        if (searchTerm && !salon.company?.toLowerCase().includes(searchTerm.toLowerCase())) {
          return false;
        }
        // Add more filter logic here
        return true;
      });
      
      setSalons(filtered);
      console.log(`Found ${filtered.length} salons matching current filters`);
    } catch (err) {
      console.error("Error filtering salons:", err);
      setError(err as Error);
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
