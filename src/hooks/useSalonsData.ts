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

// Mock salon data with required created_at property
const mockSalonsData: SalonListing[] = [
  {
    id: "101",
    name: "Luxe Nail Salon",
    location: "San Francisco, CA",
    type: "For Sale",
    price: 240000,
    priceUnit: "one-time",
    description: "Established nail salon in prime location with 10 chairs, 3 pedicure stations, and loyal clientele. Perfect opportunity for an owner-operator. Modern décor, all equipment included, and current owner will assist with transition.",
    shortDescription: "Established nail salon in prime San Francisco location",
    image: "https://preview--emviapp-final.lovable.app/lovable-uploads/17345deef1120-salon1.jpeg",
    features: ["10 Years Established", "Prime Location", "High Traffic Area", "All Equipment Included", "Owner Financing Available"],
    contactName: "John Davis",
    contactPhone: "415-555-7890",
    contactEmail: "john@luxesalon.com",
    website: "https://luxesalon.com",
    squareFeet: 1200,
    established: 2013,
    chairs: 10,
    created_at: "2023-06-15T08:00:00Z"
  },
  {
    id: "102",
    name: "Happy Nails Booth Rental",
    location: "Los Angeles, CA",
    type: "Booth Rental",
    price: 250,
    priceUnit: "weekly",
    description: "Beautiful booth rental available in upscale salon. Includes your own dedicated space with storage, use of all salon amenities, and a relaxing atmosphere. High foot traffic area with established clientele.",
    shortDescription: "Prime booth rental in upscale Los Angeles salon",
    image: "https://preview--emviapp-final.lovable.app/lovable-uploads/17345deef51c5-salon2.jpeg",
    features: ["Private Station", "Product Included", "Free WiFi", "Marketing Support", "Walk-in Clients"],
    contactName: "Maria Lopez",
    contactPhone: "213-555-1234",
    contactEmail: "maria@happynails.com",
    isFeatured: true,
    squareFeet: 800,
    created_at: "2023-09-22T10:30:00Z"
  },
  {
    id: "103",
    name: "Elite Nail Spa",
    location: "Miami, FL",
    type: "For Sale",
    price: 175000,
    priceUnit: "one-time",
    description: "Profitable nail spa for sale in Miami's luxury shopping district. Turnkey operation with 8 manicure stations, 6 pedicure chairs, and full waxing room. Established 5 years with excellent reputation and loyal clients.",
    shortDescription: "Turnkey nail spa in Miami's luxury shopping district",
    image: "https://preview--emviapp-final.lovable.app/lovable-uploads/17345deef920d-salon3.jpeg",
    features: ["Turnkey Operation", "Luxury Location", "Stable Revenue", "Loyal Clientele", "Training Available"],
    contactName: "Sarah Johnson",
    contactPhone: "305-555-9876",
    contactEmail: "sarah@elitenailspa.com",
    squareFeet: 1000,
    established: 2018,
    created_at: "2023-10-05T15:45:00Z"
  },
  {
    id: "104",
    name: "Nail Artist Station",
    location: "Chicago, IL",
    type: "Booth Rental",
    price: 200,
    priceUnit: "weekly",
    description: "Join our team of professional nail artists! We have a booth available in our popular downtown Chicago location. Ideal for experienced nail techs with their own clientele looking for a welcoming, collaborative environment.",
    shortDescription: "Nail artist booth in downtown Chicago",
    features: ["Flexible Hours", "High-End Products", "Collaborative Environment", "Great Location", "No Supply Costs"],
    contactName: "David Kim",
    contactPhone: "312-555-4567",
    contactEmail: "david@nailartistchicago.com",
    created_at: "2023-04-18T12:00:00Z"
  },
  {
    id: "105",
    name: "Serenity Nail Lounge",
    location: "Austin, TX",
    type: "Full Salon",
    description: "Full service nail salon available for lease takeover in growing Austin neighborhood. Beautiful space with 6 manicure tables, 4 pedicure thrones, and separate room for additional services. Established clientele and social media presence.",
    shortDescription: "Full service nail salon for lease takeover in Austin",
    image: "https://preview--emviapp-final.lovable.app/lovable-uploads/17345deefdb62-salon5.jpeg",
    features: ["Lease Takeover", "Established Clientele", "Modern Design", "Growing Area", "Additional Service Room"],
    contactName: "Jessica Martinez",
    contactPhone: "512-555-3210",
    contactEmail: "jessica@serenitynails.com",
    isFeatured: true,
    established: 2019,
    chairs: 6,
    created_at: "2023-09-30T09:15:00Z"
  }
];

export const useSalonsData = (initialFilters: Partial<SalonFilters> = {}) => {
  const [salons, setSalons] = useState<SalonListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [filters, setFilters] = useState<SalonFilters>({
    ...defaultFilters,
    ...initialFilters
  });
  const [filteredSalons, setFilteredSalons] = useState<SalonListing[]>([]);
  const [featuredSalons, setFeaturedSalons] = useState<SalonListing[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestedKeywords] = useState<string[]>([
    "Turnkey Business", 
    "High Traffic Area", 
    "Recently Renovated", 
    "Established Clientele",
    "Premium Location",
    "Modern Design",
    "Utilities Included"
  ]);

  const fetchSalons = useCallback(async () => {
    setLoading(true);
    try {
      console.log("Fetching salons with filters:", filters);
      
      // Use the new mockSalonsData with created_at property
      let filteredSalons = mockSalonsData;
      
      // For development, also merge with getSalonsForSale function
      const additionalSalons = getSalonsForSale(5).map(salon => {
        // Ensure all salons have created_at
        if (!salon.created_at) {
          salon.created_at = new Date().toISOString();
        }
        return salon;
      });
      
      filteredSalons = [...filteredSalons, ...additionalSalons];
      
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
        if (a.is_featured === b.is_featured) return 0;
        return a.is_featured ? -1 : 1;
      });

      // Set featured salons
      const featured = filteredSalons
        .filter(salon => salon.is_featured && salon.status !== 'expired')
        .slice(0, 3);
      
      setFeaturedSalons(featured);
      setSalons(filteredSalons);
      
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
  }, []);

  useEffect(() => {
    if (!salons.length) return;

    let result = [...salons];

    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(salon => 
        salon.name.toLowerCase().includes(term) || 
        salon.location.toLowerCase().includes(term) ||
        salon.description.toLowerCase().includes(term) ||
        salon.features?.some(feature => feature.toLowerCase().includes(term))
      );
    }

    // Apply location filter
    if (filters.location !== 'all') {
      result = result.filter(salon => 
        salon.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Apply price range filter
    result = result.filter(salon => {
      if (!salon.price) return true; // Keep items without price
      return salon.price >= filters.priceRange[0] && salon.price <= filters.priceRange[1];
    });

    // Apply listing type filter
    if (filters.listingType !== 'all') {
      result = result.filter(salon => salon.type === filters.listingType);
    }

    // Set featured salons
    const featured = salons.filter(salon => salon.isFeatured);
    setFeaturedSalons(featured);

    setFilteredSalons(result);
  }, [salons, filters, searchTerm]);

  const updateFilters = (newFilters: Partial<SalonFilters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    setSearchTerm('');
  };

  return { 
    salons: filteredSalons, 
    allSalons: salons,
    loading, 
    error, 
    filters, 
    searchTerm,
    setSearchTerm,
    updateFilters, 
    resetFilters,
    featuredSalons,
    suggestedKeywords
  };
};

export default useSalonsData;
export type { SalonFilters };
