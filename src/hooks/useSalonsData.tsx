
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { differenceInDays } from 'date-fns';
import { SalonFilters, SalonListing } from "@/types/salon";
import { Job } from "@/types/job";
import { getSalonsForSale } from "@/utils/featuredContent";

// Define default filters
export const defaultFilters: SalonFilters = {
  location: 'all',
  priceRange: [0, 500000],
  listingType: 'all',
  searchTerm: ''
};

export const useSalonsData = (initialFilters: Partial<SalonFilters> = {}) => {
  // Primary state - using any[] to avoid TypeScript errors until proper refactoring
  const [salons, setSalons] = useState<any[]>([]); 
  const [allSalons, setAllSalons] = useState<any[]>([]);
  const [featuredSalons, setFeaturedSalons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Filter state
  const [filters, setFilters] = useState<SalonFilters>({
    ...defaultFilters,
    ...initialFilters
  });
  const [searchTerm, setSearchTerm] = useState("");
  
  // Keywords state - properly initialized to avoid undefined error
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
      
      // Get all salon data
      const allData = getSalonsForSale(30);
      
      // TODO: Proper type handling needed in future refactoring
      // Temporarily using any[] to suppress type errors
      const salonListings = allData.filter((item: any) => {
        // Ensure the item has the required properties of a SalonListing
        return (
          ('name' in item || 'company' in item) && 
          ('type' in item || item.type === 'For Sale' || item.type === 'Booth Rental' || item.type === 'Full Salon')
        );
      }).map((salon: any) => {
        // Ensure all salons have created_at
        if (!salon.created_at) {
          return {
            ...salon,
            created_at: new Date().toISOString(),
            // Ensure name property exists
            name: salon.name || salon.company || salon.title || 'Unnamed Salon'
          };
        }
        // Ensure name property exists
        if (!salon.name) {
          return {
            ...salon,
            name: salon.company || salon.title || 'Unnamed Salon'
          };
        }
        return salon;
      });
      
      // Apply filters
      let filteredSalons = salonListings;
      
      // Search term filter
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        filteredSalons = filteredSalons.filter((salon: any) => 
          (salon.name && salon.name.toLowerCase().includes(query)) ||
          (salon.description && salon.description.toLowerCase().includes(query)) ||
          (salon.vietnamese_description && salon.vietnamese_description.toLowerCase().includes(query)) ||
          (salon.location && salon.location.toLowerCase().includes(query)) ||
          (salon.salon_features && salon.salon_features.some((f: string) => f.toLowerCase().includes(query)))
        );
      }
      
      // Location filter
      if (filters.location && filters.location !== 'all') {
        filteredSalons = filteredSalons.filter((salon: any) => 
          salon.location && salon.location.toLowerCase().includes(filters.location!.toLowerCase())
        );
      }
      
      // Price range filter - safely handling type conversion
      if (filters.priceRange) {
        filteredSalons = filteredSalons.filter((salon: any) => {
          let priceValue = 0;
          
          if ('asking_price' in salon && salon.asking_price) {
            priceValue = typeof salon.asking_price === 'string' 
              ? parseFloat(salon.asking_price.replace(/[^0-9.]/g, "")) || 0
              : Number(salon.asking_price) || 0;
          } else if ('price' in salon && salon.price) {
            priceValue = typeof salon.price === 'string'
              ? parseFloat(salon.price.replace(/[^0-9.]/g, "")) || 0
              : Number(salon.price) || 0;
          }
          
          // Safe comparison between numbers - ensuring all values are valid numbers
          const min = Number(filters.priceRange[0]);
          const max = Number(filters.priceRange[1]);
          return priceValue >= min && priceValue <= max;
        });
      }
      
      // Housing filter
      if (filters.hasHousing) {
        filteredSalons = filteredSalons.filter((salon: any) => salon.has_housing === true);
      }
      
      // Expired filter
      if (!filters.showExpired) {
        filteredSalons = filteredSalons.filter((salon: any) => {
          if (salon.status === 'expired') return false;
          
          const createdDate = new Date(salon.created_at);
          const now = new Date();
          return differenceInDays(now, createdDate) < 30;
        });
      }

      // Sort featured salons first
      filteredSalons.sort((a: any, b: any) => {
        if (a.is_featured === b.is_featured) return 0;
        return a.is_featured ? -1 : 1;
      });

      // Get featured salons separately
      const featured = salonListings
        .filter((salon: any) => salon.is_featured && salon.status !== 'expired')
        .map((salon: any) => {
          if (!salon.created_at) {
            return {
              ...salon,
              created_at: new Date().toISOString(),
              name: salon.name || salon.company || salon.title || 'Featured Salon'
            };
          }
          if (!salon.name) {
            return {
              ...salon,
              name: salon.company || salon.title || 'Featured Salon'
            };
          }
          return salon;
        });
      
      // Update state with filtered data
      setSalons(filteredSalons);
      setAllSalons(filteredSalons);
      setFeaturedSalons(featured);
      
      // Gather keywords from salon features
      const newKeywords = new Set<string>();
      
      // Add existing suggested keywords
      suggestedKeywords.forEach(keyword => newKeywords.add(keyword));
      
      // Add salon features as keywords
      filteredSalons.forEach((salon: any) => {
        if (salon.salon_features) {
          salon.salon_features.forEach((feature: string) => newKeywords.add(feature));
        }
      });
      
      // Update suggested keywords
      setSuggestedKeywords(Array.from(newKeywords));
      
    } catch (err) {
      console.error("Error fetching salons:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
      toast.error("Failed to load salons. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [filters, searchTerm, suggestedKeywords]);

  // Initial fetch on mount and when dependencies change
  useEffect(() => {
    fetchSalons();
  }, [fetchSalons]);

  // Filter updater functions
  const updateFilters = (newFilters: Partial<SalonFilters>) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  };

  const resetFilters = () => {
    setSearchTerm("");
    setFilters(defaultFilters);
  };

  // Return the hook's API
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
