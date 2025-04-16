
import { useState, useEffect, useCallback } from "react";
import { Job } from "@/types/job";

export interface SalonFilters {
  featured?: boolean;
  forSale?: boolean;
  location?: string;
  hasWaxRoom?: boolean;
  hasHousing?: boolean;
  salonType?: string;
  priceRange?: string;
  minStations?: number;
  maxStations?: number;
  stationsCount?: string;
  boosted?: boolean;
  status?: string;
  showExpired?: boolean;
}

export const useSalonsData = (initialFilters: SalonFilters = {}) => {
  // Mock salons data - in a real app this would come from an API
  const [salons, setSalons] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [filters, setFilters] = useState<SalonFilters>(initialFilters);
  const [searchTerm, setSearchTerm] = useState("");
  const [featuredSalons, setFeaturedSalons] = useState<Job[]>([]);
  const [suggestedKeywords, setSuggestedKeywords] = useState<string[]>([]);

  const fetchSalons = useCallback(async () => {
    setLoading(true);
    try {
      // In a real app, this would be an API call
      // For now, just mock the data
      
      // Simulate an API call with a timeout
      setTimeout(() => {
        const mockSalons: Job[] = [
          {
            id: "101",
            company: "Luxe Nail Spa",
            location: "San Jose, CA",
            image: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=800&q=60",
            for_sale: true,
            asking_price: "$120,000",
            monthly_rent: "$3,500",
            number_of_stations: "8",
            square_feet: "1,200",
            salon_features: ["Modern Equipment", "Prime Location", "Parking"],
            salon_type: "Nail Salon",
            description: "Well-established nail salon with loyal clientele. Great location in busy shopping center.",
            vietnamese_description: "Tiệm nail đã hoạt động lâu năm, có khách hàng quen. Vị trí tốt trong trung tâm mua sắm.",
            created_at: new Date().toISOString(),
            is_featured: true,
            status: "active",
            has_wax_room: true,
            has_housing: false,
            reason_for_selling: "Moving to another state",
            revenue: "$25,000/month"
          },
          // ... more salons would be here
        ];
        
        // Apply filters
        let filteredSalons = [...mockSalons];
        
        // Apply keyword search
        if (searchTerm) {
          const query = searchTerm.toLowerCase();
          filteredSalons = filteredSalons.filter(salon => 
            (salon.company && salon.company.toLowerCase().includes(query)) ||
            (salon.location && salon.location.toLowerCase().includes(query)) ||
            (salon.description && salon.description.toLowerCase().includes(query)) ||
            (salon.salon_features && salon.salon_features.some(feature => feature.toLowerCase().includes(query)))
          );
        }
        
        // Apply specific filters
        if (filters.featured) {
          filteredSalons = filteredSalons.filter(salon => salon.is_featured);
        }
        
        if (filters.forSale) {
          filteredSalons = filteredSalons.filter(salon => salon.for_sale);
        }
        
        if (filters.location && filters.location !== 'all') {
          filteredSalons = filteredSalons.filter(salon => 
            salon.location && salon.location.toLowerCase().includes(filters.location!.toLowerCase())
          );
        }
        
        if (filters.hasWaxRoom) {
          filteredSalons = filteredSalons.filter(salon => salon.has_wax_room);
        }
        
        if (filters.hasHousing) {
          filteredSalons = filteredSalons.filter(salon => salon.has_housing);
        }
        
        if (filters.salonType && filters.salonType !== 'all') {
          filteredSalons = filteredSalons.filter(salon => 
            salon.salon_type === filters.salonType
          );
        }
        
        // Only show active salons unless showExpired is true
        if (!filters.showExpired) {
          filteredSalons = filteredSalons.filter(salon => salon.status !== 'expired');
        }
        
        // Extract featured salons
        const featured = mockSalons.filter(salon => salon.is_featured).slice(0, 3);
        
        // Generate suggested keywords
        const keywords = new Set<string>();
        mockSalons.forEach(salon => {
          if (salon.salon_features) {
            salon.salon_features.forEach(f => keywords.add(f));
          }
          if (salon.salon_type) {
            keywords.add(salon.salon_type);
          }
          if (salon.location) {
            const city = salon.location.split(',')[0];
            keywords.add(city);
          }
        });
        
        setSalons(filteredSalons);
        setFeaturedSalons(featured);
        setSuggestedKeywords(Array.from(keywords));
        setLoading(false);
      }, 500);
      
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      setLoading(false);
    }
  }, [filters, searchTerm]);

  useEffect(() => {
    fetchSalons();
  }, [fetchSalons]);

  const updateFilters = (newFilters: Partial<SalonFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters({});
    setSearchTerm("");
  };

  return {
    salons,
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
