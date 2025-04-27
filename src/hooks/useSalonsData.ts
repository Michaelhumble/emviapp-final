
import { useState } from "react";
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
  const [filters] = useState<SalonFilters>(defaultFilters);
  const [searchTerm, setSearchTerm] = useState("");
  const [featuredSalons, setFeaturedSalons] = useState<any[]>(
    salonData?.filter(salon => salon.is_featured) || []
  );
  // Add suggestedKeywords state
  const [suggestedKeywords] = useState<string[]>([
    "Nail Salon", 
    "Hair Salon", 
    "Day Spa", 
    "High Traffic"
  ]);

  // Simplified reset function
  const resetFilters = () => {
    console.log("Filters reset");
    setSearchTerm("");
  };

  // Simplified update function
  const updateFilters = () => {
    console.log("This function is temporarily disabled");
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
