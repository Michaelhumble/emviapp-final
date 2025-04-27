
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
      let filteredSalons = getSalonsForSale(30).map(salon => {
        return {
          ...salon,
          // Required SalonListing fields with defaults if missing
          id: salon.id || '',
          name: salon.salon_name || salon.name || '',
          location: salon.location || `${salon.city || ''}, ${salon.state || ''}`,
          listing_type: salon.type as 'For Sale' | 'Booth Rental' | 'Partnership' || 'For Sale',
          description: salon.description || '',
          price: typeof salon.price === 'number' ? salon.price : 
                 typeof salon.asking_price === 'number' ? salon.asking_price :
                 parseFloat((salon.asking_price || '0').toString().replace(/[^0-9.-]+/g, '') || '0'),
          contact_hidden: salon.contact_hidden || false,
          created_at: salon.created_at || new Date().toISOString(),
          
          // Optional fields with proper typing
          is_featured: salon.is_featured || salon.isFeatured || false,
          image_url: salon.image_url || salon.image || undefined,
          image: salon.image || undefined,
          type: salon.type || 'For Sale',
          priceUnit: salon.priceUnit || 'one-time',
          shortDescription: salon.shortDescription || salon.description?.substring(0, 100) || '',
          features: salon.features || salon.salon_features || [],
          contactName: salon.contactName || salon.contact_info?.name || '',
          contactPhone: salon.contactPhone || salon.contact_info?.phone || '',
          contactEmail: salon.contactEmail || salon.contact_info?.email || '',
          website: salon.website || '',
          tags: salon.tags || [],
          squareFeet: salon.squareFeet || 
                     (salon.square_feet ? (typeof salon.square_feet === 'string' ? 
                     parseInt(salon.square_feet, 10) : salon.square_feet) : 0),
          established: salon.established || 0,
          chairs: salon.chairs || salon.number_of_stations || 0,
          has_wax_room: salon.has_wax_room || false,
          has_dining_room: salon.has_dining_room || false,
          has_laundry: salon.has_laundry || false,
          owner_will_train: salon.owner_will_train || false,
          reason_for_selling: salon.reason_for_selling || '',
          salon_features: salon.salon_features || [],
          asking_price: salon.asking_price || 0,
          has_housing: salon.has_housing || false,
          vietnamese_description: salon.vietnamese_description || '',
          status: salon.status || 'active',
          isFeatured: salon.isFeatured || salon.is_featured || false
        } as SalonListing;
      });
      
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
          const price = typeof salon.price === 'number' ? salon.price : 0;
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
        .filter(salon => (salon.is_featured || salon.isFeatured) && salon.status !== 'expired')
        .map(salon => {
          return {
            ...salon,
            // Required SalonListing fields
            id: salon.id || '',
            name: salon.salon_name || salon.name || '',
            location: salon.location || `${salon.city || ''}, ${salon.state || ''}`,
            listing_type: salon.type as 'For Sale' | 'Booth Rental' | 'Partnership' || 'For Sale',
            description: salon.description || '',
            price: typeof salon.price === 'number' ? salon.price : 
                 typeof salon.asking_price === 'number' ? salon.asking_price :
                 parseFloat((salon.asking_price || '0').toString().replace(/[^0-9.-]+/g, '') || '0'),
            contact_hidden: salon.contact_hidden || false,
            created_at: salon.created_at || new Date().toISOString(),
            
            // Optional fields
            is_featured: true,
            image: salon.image || undefined,
          } as SalonListing;
        });
      
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
