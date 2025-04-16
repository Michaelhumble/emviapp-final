
import { useState, useEffect } from "react";
import { Job } from "@/types/job";
import { SalonFilters } from "@/components/salons/types";

// Default filters
export const defaultFilters: SalonFilters = {
  searchTerm: "",
  category: "",
  priceRange: [0, 1000000],
  location: "",
  features: [],
  sortBy: "Newest"
};

export const useSalonsData = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [salons, setSalons] = useState<Job[]>([]);
  const [filters, setFilters] = useState<SalonFilters>(defaultFilters);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Function to fetch salons data
  const fetchSalons = async () => {
    try {
      setLoading(true);
      // In a real app, this would be an API call with the filters
      // For now, we'll simulate a delay and return mock data
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Placeholder for API call to get salons
      const mockSalons: Job[] = Array.from({ length: 10 }, (_, i) => ({
        id: `salon-${i + 1}`,
        title: `Sample Salon ${i + 1}`,
        location: ['California', 'New York', 'Texas', 'Florida'][i % 4],
        created_at: new Date().toISOString(),
        description: "A beautiful salon for sale in a prime location",
        asking_price: `${(Math.random() * 500000 + 50000).toFixed(0)}`,
        monthly_rent: `${(Math.random() * 5000 + 1000).toFixed(0)}`,
        square_feet: `${(Math.random() * 2000 + 500).toFixed(0)}`,
        number_of_stations: `${Math.floor(Math.random() * 10 + 2)}`,
        for_sale: true,
        salon_type: ['Nail Salon', 'Hair Salon', 'Day Spa', 'Barbershop'][i % 4],
        has_housing: i % 5 === 0,
        has_wax_room: i % 3 === 0,
        has_dining_room: i % 4 === 0,
        has_laundry: i % 6 === 0,
        revenue: `${(Math.random() * 300000 + 80000).toFixed(0)}`,
      }));
      
      setSalons(mockSalons);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch salons on component mount
  useEffect(() => {
    fetchSalons();
  }, []);
  
  // Function to filter salons based on criteria
  const getFilteredSalons = () => {
    if (!salons) return [];
    
    return salons.filter(salon => {
      // Search term filter
      const searchTermMatch = !searchTerm || 
        salon.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        salon.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        salon.description?.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Category filter
      const categoryMatch = !filters.category || salon.salon_type === filters.category;
      
      // Price range filter
      const price = Number(salon.asking_price) || 0;
      const priceMatch = price >= filters.priceRange[0] && price <= filters.priceRange[1];
      
      // Location filter
      const locationMatch = !filters.location || 
        salon.location?.toLowerCase().includes(filters.location.toLowerCase());
      
      // Features filter
      const featuresMatch = filters.features.length === 0 || filters.features.every(feature => {
        if (feature === 'Has Housing') return salon.has_housing;
        if (feature === 'Wax Room') return salon.has_wax_room;
        if (feature === 'Dining Room') return salon.has_dining_room;
        if (feature === 'Laundry') return salon.has_laundry;
        return true;
      });
      
      return searchTermMatch && categoryMatch && priceMatch && locationMatch && featuresMatch;
    });
  };
  
  // Function to sort filtered salons
  const getSortedSalons = (filteredSalons: Job[]) => {
    if (!filteredSalons.length) return [];
    
    return [...filteredSalons].sort((a, b) => {
      if (filters.sortBy === 'Newest') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      
      if (filters.sortBy === 'Price: Low to High') {
        return (Number(a.asking_price) || 0) - (Number(b.asking_price) || 0);
      }
      
      if (filters.sortBy === 'Price: High to Low') {
        return (Number(b.asking_price) || 0) - (Number(a.asking_price) || 0);
      }
      
      return 0;
    });
  };
  
  // Update filters function
  const updateFilters = (newFilters: Partial<SalonFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };
  
  // Reset filters function
  const resetFilters = () => {
    setFilters(defaultFilters);
    setSearchTerm("");
  };
  
  // Get suggested keywords
  const suggestedKeywords = [
    "Nail Salon", 
    "Hair Salon", 
    "California", 
    "New York", 
    "Under $200K"
  ];
  
  // Get final filtered and sorted salons
  const filteredSalons = getSortedSalons(getFilteredSalons());
  
  return {
    salons: filteredSalons,
    loading,
    error,
    filters,
    searchTerm,
    setSearchTerm,
    updateFilters,
    resetFilters,
    suggestedKeywords
  };
};
