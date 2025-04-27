
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { differenceInDays } from 'date-fns';
import { SalonFilters, SalonListing, Job } from "@/types/salon";
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
  const [salons, setSalons] = useState<(SalonListing | Job)[]>([]); 
  const [allSalons, setAllSalons] = useState<(SalonListing | Job)[]>([]);
  const [featuredSalons, setFeaturedSalons] = useState<(SalonListing | Job)[]>([]);
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
      
      // Type guard to validate salon listings
      const salonListings = allData.map((item: any) => {
        const listing: SalonListing = {
          ...item,
          created_at: item.created_at || new Date().toISOString(),
          name: item.name || item.title || (item.company ? String(item.company) : '') || 'Unnamed Salon',
          price: typeof item.price === 'string' ? parseFloat(item.price) : item.price || 0,
          square_feet: item.squareFeet || item.square_feet,
          listing_type: (item.type === 'For Sale' || item.type === 'Booth Rental' || item.type === 'Partnership') 
            ? item.type as 'For Sale' | 'Booth Rental' | 'Partnership'
            : 'For Sale',
          contact_hidden: item.contact_hidden || false,
          is_featured: item.is_featured || false
        };
        return listing;
      });
      
      // Apply filters with proper type handling
      let filteredSalons = salonListings;
      
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        filteredSalons = filteredSalons.filter(salon => 
          (salon.name && salon.name.toLowerCase().includes(query)) ||
          (salon.description && salon.description.toLowerCase().includes(query)) ||
          (salon.vietnamese_description && salon.vietnamese_description.toLowerCase().includes(query)) ||
          (salon.location && salon.location.toLowerCase().includes(query))
        );
      }
      
      // Location filter
      if (filters.location && filters.location !== 'all') {
        filteredSalons = filteredSalons.filter(salon => 
          salon.location && salon.location.toLowerCase().includes(filters.location!.toLowerCase())
        );
      }
      
      // Price range filter with proper type handling
      if (filters.priceRange) {
        filteredSalons = filteredSalons.filter(salon => {
          const price = typeof salon.price === 'string' ? parseFloat(salon.price) : salon.price || 0;
          return price >= filters.priceRange[0] && price <= filters.priceRange[1];
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
      filteredSalons.sort((a: SalonListing | Job, b: SalonListing | Job) => {
        if (a.is_featured === b.is_featured) return 0;
        return a.is_featured ? -1 : 1;
      });

      // Get featured salons separately
      const featured = filteredSalons.filter(s => s.is_featured).slice(0, 3);
      
      // Update state with filtered data
      setSalons(filteredSalons);
      setAllSalons(filteredSalons);
      setFeaturedSalons(featured);
      
      // Gather keywords from salon features
      const keywords = new Set<string>();
      
      // Add existing suggested keywords
      suggestedKeywords.forEach(keyword => keywords.add(keyword));
      
      // Add salon features as keywords
      filteredSalons.forEach(salon => {
        if ('salon_features' in salon && salon.salon_features) {
          salon.salon_features.forEach(feature => keywords.add(feature));
        }
      });
      
      // Update suggested keywords
      setSuggestedKeywords(Array.from(keywords));
      
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
