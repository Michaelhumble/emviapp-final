
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { differenceInDays } from 'date-fns';
import { SalonListing, SalonFilters } from "@/types/salon";

// Use mock data for now
import { salonsForSaleJobs } from "@/utils/jobs/mockJobData";
import { getSalonsForSale } from "@/utils/featuredContent";

export const defaultFilters: SalonFilters = {
  location: 'all',
  priceRange: [0, 500000],
  listingType: 'all',
  searchTerm: ''
};

export const useSalonsData = (initialFilters: Partial<SalonFilters> = {}) => {
  const [salons, setSalons] = useState<SalonListing[]>([]);
  const [allSalons, setAllSalons] = useState<SalonListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [filters, setFilters] = useState<SalonFilters>({
    ...defaultFilters,
    ...initialFilters
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [featuredSalons, setFeaturedSalons] = useState<SalonListing[]>([]);
  const [suggestedKeywords, setSuggestedKeywords] = useState<string[]>([
    "7 Years Established", 
    "High Traffic Area", 
    "Parking Available", 
    "All Equipment Included", 
    "Denver, CO", 
    "Premium Equipment", 
    "Social Media Following", 
    "Recently Renovated"
  ]);

  const fetchSalons = useCallback(async () => {
    setLoading(true);
    try {
      console.log("Fetching salons with filters:", filters);
      
      // Use the new getSalonsForSale function to get more salon listings
      let filteredSalons = getSalonsForSale(30);
      
      // Apply keyword search
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        filteredSalons = filteredSalons.filter(salon => 
          (salon.company && salon.company.toLowerCase().includes(query)) ||
          (salon.description && salon.description.toLowerCase().includes(query)) ||
          (salon.vietnamese_description && salon.vietnamese_description.toLowerCase().includes(query)) ||
          (salon.location && salon.location.toLowerCase().includes(query)) ||
          (salon.salon_features && salon.salon_features.some(f => f.toLowerCase().includes(query)))
        );
      }
      
      // Apply location filter
      if (filters.location && filters.location !== 'all') {
        filteredSalons = filteredSalons.filter(salon => 
          salon.location && salon.location.toLowerCase().includes(filters.location!.toLowerCase())
        );
      }
      
      // Apply price range filter
      if (filters.priceRange) {
        filteredSalons = filteredSalons.filter(salon => {
          const priceString = salon.asking_price || "";
          const price = parseInt(priceString.replace(/[^0-9]/g, ""));
          return price >= filters.priceRange![0] && price <= filters.priceRange![1];
        });
      }
      
      // Filter by "has housing"
      if (filters.hasHousing) {
        filteredSalons = filteredSalons.filter(salon => salon.has_housing === true);
      }
      
      // Only show active salons unless showExpired is true
      if (!filters.showExpired) {
        filteredSalons = filteredSalons.filter(salon => {
          if (salon.status === 'expired') return false;
          
          const createdDate = new Date(salon.created_at);
          const now = new Date();
          return differenceInDays(now, createdDate) < 30;
        });
      }

      // Sort by featured status - featured listings first
      filteredSalons.sort((a, b) => {
        const aFeatured = a.is_featured || a.isFeatured;
        const bFeatured = b.is_featured || b.isFeatured;
        if (aFeatured === bFeatured) return 0;
        return aFeatured ? -1 : 1;
      });

      // Set featured salons
      const featured = getSalonsForSale(3)
        .filter(salon => (salon.is_featured || salon.isFeatured) && salon.status !== 'expired');
      
      setFeaturedSalons(featured);
      setSalons(filteredSalons);
      setAllSalons(filteredSalons);
      
      // Generate suggested keywords from actual data
      const keywords = new Set<string>(suggestedKeywords);
      filteredSalons.forEach(salon => {
        if (salon.salon_features) {
          salon.salon_features.forEach(f => keywords.add(f));
        }
      });
      
      setSuggestedKeywords(Array.from(keywords));
    } catch (err) {
      console.error("Error fetching salons:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
      toast.error("Failed to load salons. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [filters, searchTerm, suggestedKeywords]);

  useEffect(() => {
    fetchSalons();
  }, [fetchSalons]);

  const updateFilters = (newFilters: Partial<SalonFilters>) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  };

  const resetFilters = () => {
    setSearchTerm("");
    setFilters(defaultFilters);
  };

  return { 
    salons, 
    allSalons,
    loading, 
    error, 
    filters, 
    searchTerm, 
    updateFilters, 
    setSearchTerm, 
    resetFilters,
    fetchSalons,
    featuredSalons,
    suggestedKeywords
  };
};

export default useSalonsData;
