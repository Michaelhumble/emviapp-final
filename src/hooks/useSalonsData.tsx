
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { differenceInDays } from 'date-fns';
import { SalonFilters, SalonListing } from "@/types/salon";
import { getSalonsForSale } from "@/utils/featuredContent";

// Define default filters
export const defaultFilters: SalonFilters = {
  location: 'all',
  priceRange: [0, 500000],
  listingType: 'all',
  searchTerm: ''
};

export const useSalonsData = (initialFilters: Partial<SalonFilters> = {}) => {
  // Primary state
  const [salons, setSalons] = useState<SalonListing[]>([]);
  const [allSalons, setAllSalons] = useState<SalonListing[]>([]);
  const [featuredSalons, setFeaturedSalons] = useState<SalonListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Filter state
  const [filters, setFilters] = useState<SalonFilters>({
    ...defaultFilters,
    ...initialFilters
  });
  const [searchTerm, setSearchTerm] = useState("");
  
  // Keywords state
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
      
      // Get all salon data and filter for SalonListing type only
      const allData = getSalonsForSale(30);
      
      // Filter to ensure we only have SalonListing types
      const salonListings = allData.filter((item): item is SalonListing => {
        // Ensure the item has the required properties of a SalonListing
        return (
          ('name' in item || 'company' in item) && 
          ('type' in item || item.type === 'For Sale' || item.type === 'Booth Rental' || item.type === 'Full Salon')
        );
      }).map(salon => {
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
        filteredSalons = filteredSalons.filter(salon => 
          (salon.name && salon.name.toLowerCase().includes(query)) ||
          (salon.description && salon.description.toLowerCase().includes(query)) ||
          (salon.vietnamese_description && salon.vietnamese_description.toLowerCase().includes(query)) ||
          (salon.location && salon.location.toLowerCase().includes(query)) ||
          (salon.salon_features && salon.salon_features.some(f => f.toLowerCase().includes(query)))
        );
      }
      
      // Location filter
      if (filters.location && filters.location !== 'all') {
        filteredSalons = filteredSalons.filter(salon => 
          salon.location && salon.location.toLowerCase().includes(filters.location!.toLowerCase())
        );
      }
      
      // Price range filter
      if (filters.priceRange) {
        filteredSalons = filteredSalons.filter(salon => {
          let priceValue: number = 0;
          
          if ('asking_price' in salon && salon.asking_price) {
            priceValue = typeof salon.asking_price === 'string' 
              ? parseFloat(salon.asking_price.replace(/[^0-9.]/g, "")) || 0
              : Number(salon.asking_price) || 0;
          } else if ('price' in salon && salon.price) {
            priceValue = typeof salon.price === 'string'
              ? parseFloat(salon.price.replace(/[^0-9.]/g, "")) || 0
              : Number(salon.price) || 0;
          }
          
          // Safe comparison between numbers
          return !isNaN(priceValue) && 
            priceValue >= filters.priceRange![0] && 
            priceValue <= filters.priceRange![1];
        });
      }
      
      // Housing filter
      if (filters.hasHousing) {
        filteredSalons = filteredSalons.filter(salon => salon.has_housing === true);
      }
      
      // Expired filter
      if (!filters.showExpired) {
        filteredSalons = filteredSalons.filter(salon => {
          if (salon.status === 'expired') return false;
          
          const createdDate = new Date(salon.created_at);
          const now = new Date();
          return differenceInDays(now, createdDate) < 30;
        });
      }

      // Sort featured salons first
      filteredSalons.sort((a, b) => {
        if (a.is_featured === b.is_featured) return 0;
        return a.is_featured ? -1 : 1;
      });

      // Get featured salons separately
      const featured = salonListings
        .filter(salon => salon.is_featured && salon.status !== 'expired')
        .map(salon => {
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
      filteredSalons.forEach(salon => {
        if (salon.salon_features) {
          salon.salon_features.forEach(feature => newKeywords.add(feature));
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
