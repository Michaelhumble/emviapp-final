
import { useState, useEffect, useMemo } from 'react';
import { Job } from '@/types/job';
import { getSalonsForSale, getFeaturedSalonsForSale } from '@/utils/featuredContent';

interface SalonsFilters {
  location: string;
  priceRange: [number, number];
  sizeRange: [number, number];
  features: string[];
  businessType: string;
}

// Helper function to get a realistic salon price range
const getSalonPriceRange = (): [number, number] => {
  return [30000, 300000];
};

// Helper function to get a realistic salon size range
const getSalonSizeRange = (): [number, number] => {
  return [500, 4000];
};

// List of suggested keywords for salon search
const SUGGESTED_KEYWORDS = [
  "Nail Salon", "Hair Studio", "Spa & Waxing", "Barber Shop", "Beauty Lounge",
  "Westminster", "Garden Grove", "Houston", "San Jose", "Atlanta",
  "For Sale", "New Listing", "Premium", "Modern", "Established"
];

const useSalonsData = () => {
  const [salons, setSalons] = useState<Job[]>([]);
  const [featuredSalons, setFeaturedSalons] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>(getSalonPriceRange());
  const [sizeRange, setSizeRange] = useState<[number, number]>(getSalonSizeRange());
  const [filters, setFilters] = useState<SalonsFilters>({
    location: '',
    priceRange: getSalonPriceRange(),
    sizeRange: getSalonSizeRange(),
    features: [],
    businessType: 'all'
  });

  // Suggested keywords for search, combining static and dynamic keywords
  const suggestedKeywords = useMemo(() => {
    const dynamicKeywords: string[] = [];
    
    // Add top locations from the data
    const locations = salons
      .map(salon => salon.location?.split(',')[0]?.trim())
      .filter(Boolean) as string[];
    
    const uniqueLocations = [...new Set(locations)];
    dynamicKeywords.push(...uniqueLocations.slice(0, 5));
    
    // Add top salon types
    const salonTypes = salons
      .map(salon => salon.salon_type)
      .filter(Boolean) as string[];
    
    const uniqueTypes = [...new Set(salonTypes)];
    dynamicKeywords.push(...uniqueTypes.slice(0, 5));
    
    // Combine with static keywords and remove duplicates
    return [...new Set([...SUGGESTED_KEYWORDS, ...dynamicKeywords])];
  }, [salons]);

  // Fetch salon data
  useEffect(() => {
    const fetchSalons = async () => {
      try {
        setLoading(true);
        
        // Get premium salon data
        const allSalons = getSalonsForSale();
        const featured = getFeaturedSalonsForSale(6);
        
        setSalons(allSalons);
        setFeaturedSalons(featured);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching salons:', err);
        setError(err);
        setLoading(false);
      }
    };

    fetchSalons();
  }, []);

  // Filter salons based on search and filters
  const filteredSalons = useMemo(() => {
    if (!salons.length) return [];

    return salons.filter(salon => {
      // Search term filter
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = !searchTerm || 
        (salon.company && salon.company.toLowerCase().includes(searchLower)) ||
        (salon.location && salon.location.toLowerCase().includes(searchLower)) ||
        (salon.description && salon.description.toLowerCase().includes(searchLower)) ||
        (salon.salon_type && salon.salon_type.toLowerCase().includes(searchLower));

      // Location filter
      const matchesLocation = !filters.location || 
        (salon.location && salon.location.toLowerCase().includes(filters.location.toLowerCase()));

      // Price range filter
      const salonPrice = salon.asking_price ? parseInt(salon.asking_price.replace(/[^0-9]/g, '')) : 0;
      const matchesPrice = salonPrice >= filters.priceRange[0] && salonPrice <= filters.priceRange[1];

      // Size range filter
      const salonSize = salon.square_feet ? parseInt(salon.square_feet.replace(/[^0-9]/g, '')) : 0;
      const matchesSize = salonSize >= filters.sizeRange[0] && salonSize <= filters.sizeRange[1];

      // Features filter
      const matchesFeatures = filters.features.length === 0 || 
        filters.features.every(feature => 
          salon.salon_features?.some(f => f.toLowerCase().includes(feature.toLowerCase()))
        );

      // Business type filter
      const matchesType = filters.businessType === 'all' || 
        (salon.salon_type && salon.salon_type.toLowerCase() === filters.businessType.toLowerCase());

      return matchesSearch && matchesLocation && matchesPrice && matchesSize && matchesFeatures && matchesType;
    });
  }, [salons, searchTerm, filters]);

  // Update filters function
  const updateFilters = (newFilters: Partial<SalonsFilters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };

  // Reset filters function
  const resetFilters = () => {
    setFilters({
      location: '',
      priceRange: getSalonPriceRange(),
      sizeRange: getSalonSizeRange(),
      features: [],
      businessType: 'all'
    });
    setSearchTerm('');
  };

  // Refresh salons data
  const refreshSalons = async () => {
    try {
      setLoading(true);
      
      // Get premium salon data again
      const allSalons = getSalonsForSale();
      const featured = getFeaturedSalonsForSale(6);
      
      setSalons(allSalons);
      setFeaturedSalons(featured);
      setLoading(false);
    } catch (err) {
      console.error('Error refreshing salons:', err);
      setError(err);
      setLoading(false);
    }
  };

  return {
    salons: filteredSalons,
    featuredSalons,
    loading,
    error,
    filters,
    searchTerm,
    setSearchTerm,
    updateFilters,
    resetFilters,
    refreshSalons,
    suggestedKeywords,
    priceRange,
    setPriceRange,
    sizeRange,
    setSizeRange
  };
};

export default useSalonsData;
