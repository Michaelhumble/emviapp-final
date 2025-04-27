
import { useState, useEffect } from "react";
import { SalonListing, SalonFilters } from "@/types/salon";

// Sample data for salon listings
const sampleSalonListings: SalonListing[] = [
  {
    id: "salon-1",
    name: "Elegant Nails & Spa",
    location: "Denver, CO",
    type: "For Sale",
    price: 125000,
    priceUnit: "one-time",
    description: "Established nail salon with strong clientele base. This turnkey business features 6 manicure stations, 6 pedicure chairs, and a dedicated waxing room. Located in a high-traffic shopping center with ample parking. Current owner retiring after 12 successful years. All equipment included and recently renovated interior. Perfect opportunity for an experienced nail technician looking to own their own business.",
    shortDescription: "Established nail salon for sale in prime Denver location. 12 years in business with loyal clientele.",
    image: "https://images.unsplash.com/photo-1607008829749-c0f284a49841?q=80&w=2070&auto=format&fit=crop",
    features: ["Turnkey Business", "High Traffic Area", "Recently Renovated", "Established Clientele", "All Equipment Included"],
    contactName: "Lisa Chen",
    contactPhone: "(720) 555-8899",
    contactEmail: "lisa.chen@example.com",
    isFeatured: true,
    squareFeet: 1200,
    established: 2011,
    chairs: 12
  },
  {
    id: "salon-2",
    name: "Modern Beauty Booths",
    location: "Austin, TX",
    type: "Booth Rental",
    price: 350,
    priceUnit: "weekly",
    description: "Premium booth rental available in upscale salon located in trendy South Congress district. Our modern facility features high ceilings, natural lighting, and a sleek contemporary design. Booth rental includes access to premium salon software, towel service, and shared assistant. Build your business in this established location with walk-in traffic and collaborative atmosphere. Ideal for experienced professionals with existing clientele looking for an upscale environment.",
    shortDescription: "Premium booth rental in upscale South Congress salon. Modern facilities with premium amenities.",
    image: "https://images.unsplash.com/photo-1470259078422-826894b933aa?q=80&w=2074&auto=format&fit=crop",
    features: ["Premium Location", "Modern Design", "Utilities Included", "Flexible Schedule", "High-End Products Available"],
    contactName: "Michael Torres",
    contactPhone: "(512) 555-3344",
    contactEmail: "michael@modernbeauty.com",
    isFeatured: true,
    squareFeet: 80,
  },
  {
    id: "salon-3",
    name: "Serenity Day Spa",
    location: "Atlanta, GA",
    type: "For Sale",
    price: 230000,
    priceUnit: "one-time",
    description: "Profitable day spa business for sale in affluent Atlanta suburb. This established spa includes 5 treatment rooms, relaxation lounge, and dedicated retail area. Offering massage therapy, facials, body treatments, and nail services. Strong local reputation built over 8 years with excellent online reviews (4.9 stars). Seller will assist with transition and staff is expected to remain. Sale includes all equipment, products, and custom booking software with 3,500+ client database.",
    shortDescription: "Profitable day spa for sale in affluent Atlanta suburb. Established 8 years with excellent reputation.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop",
    features: ["Profitable Business", "Excellent Reviews", "Established Clientele", "Full Staff in Place", "Premium Location"],
    contactName: "Samantha Jenkins",
    contactPhone: "(404) 555-7788",
    contactEmail: "sam@serenityspa.com",
    squareFeet: 2100,
    established: 2015,
  },
  {
    id: "salon-4",
    name: "Hair Studio Booth",
    location: "Chicago, IL",
    type: "Booth Rental",
    price: 250,
    priceUnit: "weekly",
    description: "Stylish booth available in downtown Chicago hair studio. Our welcoming space is perfect for hair stylists looking for independence with the support of an established salon. Month-to-month rental with no long-term commitment required. Space includes styling station, storage cabinet, and shared shampooing area. Great opportunity to grow your business in a central location with high foot traffic. WiFi, utilities, and basic supplies included.",
    shortDescription: "Stylish booth available in downtown Chicago hair studio. No long-term commitment required.",
    features: ["Downtown Location", "Month-to-Month", "Supplies Included", "Free WiFi", "New Equipment"],
    contactName: "David Wilson",
    contactPhone: "(312) 555-6677",
    contactEmail: "david@hairstudio.com",
  },
  {
    id: "salon-5",
    name: "Luxe Nail Bar",
    location: "Miami, FL",
    type: "Full Salon",
    description: "Upscale nail salon in Miami's trendy Wynwood district. Our salon specializes in luxury manicures, pedicures, nail art, and waxing services. Modern, Instagram-worthy interior with custom lighting and comfortable seating. Currently not for sale but accepting applications for skilled nail technicians and partnerships. Great opportunity to join an established brand with strong social media presence (over 15k followers) and celebrity clientele.",
    shortDescription: "Upscale nail salon in Miami's trendy Wynwood district seeking skilled technicians and partnerships.",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2074&auto=format&fit=crop",
    features: ["Trendy Location", "Strong Social Media", "Celebrity Clientele", "Modern Design", "High-End Products"],
    contactName: "Isabella Rodriguez",
    contactPhone: "(305) 555-1122",
    contactEmail: "info@luxenailbar.com",
    isFeatured: true,
    established: 2019,
    chairs: 8
  }
];

export const defaultFilters: SalonFilters = {
  location: 'all',
  priceRange: [0, 250000],
  listingType: 'all',
  searchTerm: ''
};

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

  // Fetch salons data (simulated with timeout)
  useEffect(() => {
    const fetchSalons = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setSalons(sampleSalonListings);
      } catch (err) {
        console.error("Error fetching salons:", err);
        setError(err instanceof Error ? err : new Error("Failed to fetch salons"));
      } finally {
        setLoading(false);
      }
    };

    fetchSalons();
  }, []);

  // Apply filters whenever salons or filters change
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
