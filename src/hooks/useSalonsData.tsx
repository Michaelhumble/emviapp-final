
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { differenceInDays } from 'date-fns';
import { SalonFilters, SalonListing, Job, BaseListingType } from "@/types/salon";
import { salonsForSaleJobs } from "@/utils/jobs/mockJobData";
import { getSalonsForSale } from "@/utils/featuredContent";

export const defaultFilters: SalonFilters = {
  location: 'all',
  priceRange: [0, 500000],
  listingType: 'all',
  searchTerm: ''
};

export const useSalonsData = (initialFilters: Partial<SalonFilters> = {}) => {
  // Explicitly define state types to accept both SalonListing and Job
  const [salons, setSalons] = useState<(SalonListing | Job)[]>([]);
  const [allSalons, setAllSalons] = useState<(SalonListing | Job)[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [filters, setFilters] = useState<SalonFilters>({
    ...defaultFilters,
    ...initialFilters
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [featuredSalons, setFeaturedSalons] = useState<(SalonListing | Job)[]>([]);
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
      
      let filteredSalons: (SalonListing | Job)[] = getSalonsForSale(30);

      filteredSalons = filteredSalons.map(salon => {
        if (!salon.created_at) {
          return {
            ...salon,
            created_at: new Date().toISOString()
          };
        }
        return salon;
      });
      
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
      
      if (filters.location && filters.location !== 'all') {
        filteredSalons = filteredSalons.filter(salon => 
          salon.location && salon.location.toLowerCase().includes(filters.location!.toLowerCase())
        );
      }
      
      if (filters.priceRange) {
        filteredSalons = filteredSalons.filter(salon => {
          let priceValue = 0;
          
          if ('asking_price' in salon && salon.asking_price) {
            priceValue = typeof salon.asking_price === 'string' 
              ? parseInt(salon.asking_price.replace(/[^0-9]/g, ""), 10) || 0
              : Number(salon.asking_price) || 0;
          } else if ('price' in salon && salon.price) {
            priceValue = typeof salon.price === 'string'
              ? parseInt(salon.price.replace(/[^0-9]/g, ""), 10) || 0
              : Number(salon.price) || 0;
          }
          
          return priceValue >= filters.priceRange![0] && priceValue <= filters.priceRange![1];
        });
      }
      
      if (filters.hasHousing) {
        filteredSalons = filteredSalons.filter(salon => salon.has_housing === true);
      }
      
      if (!filters.showExpired) {
        filteredSalons = filteredSalons.filter(salon => {
          if (salon.status === 'expired') return false;
          
          const createdDate = new Date(salon.created_at);
          const now = new Date();
          return differenceInDays(now, createdDate) < 30;
        });
      }

      filteredSalons.sort((a, b) => {
        if (a.is_featured === b.is_featured) return 0;
        return a.is_featured ? -1 : 1;
      });

      const featured = getSalonsForSale(3)
        .filter(salon => salon.is_featured && salon.status !== 'expired')
        .map(salon => {
          if (!salon.created_at) {
            return {
              ...salon,
              created_at: new Date().toISOString()
            };
          }
          return salon;
        });
      
      setFeaturedSalons(featured);
      setSalons(filteredSalons);
      setAllSalons(filteredSalons);
      
      // Create a new Set to store unique keywords
      const newKeywords = new Set<string>(suggestedKeywords);
      filteredSalons.forEach(salon => {
        if (salon.salon_features) {
          salon.salon_features.forEach(f => newKeywords.add(f));
        }
      });
      setSuggestedKeywords(Array.from(newKeywords));
      
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
    setSearchTerm,
    updateFilters,
    resetFilters,
    fetchSalons,
    featuredSalons,
    suggestedKeywords
  };
};

export default useSalonsData;
