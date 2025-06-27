import { Job } from '@/types/job';
import { Salon } from '@/types/salon';
import { sampleSalons } from '@/data/sampleSalons';

// 🚨 DO NOT REMOVE, HIDE, OR EDIT THESE MOCKUP LISTINGS.
// These demo/sample listings must remain visible in production until at least June 26, 2026.
// Only the project owner (Michael) can approve any removal or update of these mockups.

// Mock featured salons data
const featuredSalons: Salon[] = sampleSalons.filter(salon => salon.featured);

// Mock salons for sale
const salonsForSale: Salon[] = sampleSalons.slice(0, 6);

// Mock featured jobs
const featuredJobs: Job[] = [
  {
    id: "featured-1",
    title: "Senior Nail Technician",
    company: "Luxury Nails & Spa",
    location: "Beverly Hills, CA",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    is_featured: true,
    image: "/lovable-uploads/583cdb14-9991-4d8f-8d00-711aa760fdeb.png",
    category: "Nail Tech" // Added category
  },
  {
    id: "featured-2", 
    title: "Hair Stylist Wanted",
    company: "Elite Hair Studio",
    location: "Manhattan, NY",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    is_featured: true,
    image: "/lovable-uploads/7dd3d7e2-dc6b-4d9a-9feb-9e3b023a9f28.png",
    category: "Hair Stylist" // Added category
  },
  {
    id: "featured-3",
    title: "Lash Technician",
    company: "Beauty Bar",
    location: "Miami, FL", 
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    is_featured: true,
    image: "/lovable-uploads/5f8eaed6-4a17-4992-a270-6394aad0f43b.png",
    category: "Lash Tech" // Added category
  }
];

// Mock booths data
const boothlListings = [
  {
    id: "booth-1",
    title: "Premium Booth for Rent",
    company: "Luxury Salon Space",
    location: "Beverly Hills, CA",
    created_at: new Date().toISOString(),
    price: "500",
    description: "Luxury booth available in high-end salon",
    image: "/lovable-uploads/72f0f6c8-5793-4750-993d-f250b495146d.png"
  },
  {
    id: "booth-2",
    title: "Nail Station Available",
    company: "Nail Paradise",
    location: "Newport Beach, CA",
    created_at: new Date().toISOString(),
    price: "350",
    description: "Well-equipped nail station in busy location",
    image: "/lovable-uploads/fa1b4f95-ebc9-452c-a18b-9d4e78db84bb.png"
  }
];

/**
 * Get a specific salon by ID and convert it to a Job format for compatibility
 */
export const getSalonById = (id: string): Salon | undefined => {
  return sampleSalons.find(salon => salon.id === id);
};

/**
 * Convert a Salon object to a Job object
 * This ensures proper type compatibility when displaying salon details with job components
 * IMPORTANT: This preserves all original image URLs
 */
export const getSalonByIdAsJob = (id: string): Job | null => {
  const salon = getSalonById(id);
  if (!salon) return null;
  
  // Convert salon to job format with all required fields
  const salonAsJob: Job = {
    id: salon.id,
    title: salon.name || '',
    company: salon.name || '',
    location: salon.location || '',
    created_at: salon.created_at || new Date().toISOString(),
    description: salon.description || '',
    price: salon.price?.toString() || '',
    
    // PRESERVE ORIGINAL IMAGES - Do not override or provide defaults
    // This ensures we keep the original image URLs
    image: salon.image || salon.imageUrl || '',
    
    salon_features: salon.features || [],
    contact_info: {
      owner_name: salon.contact_info?.owner_name || "Salon Owner",
      phone: salon.contact_info?.phone || "(555) 123-4567",
      email: salon.contact_info?.email || "contact@emviapp.com"
    },
    type: 'salon'
  };
  
  return salonAsJob;
};

/**
 * Get all featured salons, optionally limited by count
 */
export const getFeaturedSalons = (count?: number): Salon[] => {
  // Return unmodified featured salons - preserve all image URLs
  return count ? featuredSalons.slice(0, count) : featuredSalons;
};

/**
 * Get all salons for sale, optionally limited by count
 */
export const getSalonsForSale = (count?: number): Salon[] => {
  // Return unmodified salons for sale - preserve all image URLs
  return count ? salonsForSale.slice(0, count) : salonsForSale;
};

/**
 * Get featured job listings, optionally limited by count
 */
export const getFeaturedJobs = (count?: number): Job[] => {
  return count ? featuredJobs.slice(0, count) : featuredJobs;
};

/**
 * Get all booth listings
 */
export const getAllBooths = (): Job[] => {
  return boothlListings;
};

// Mock function to get trending salons data
export const getTrendingSalons = (): Job[] => {
  return [
    // ... keep existing code for trending salons ...
  ];
};

// Featured salon for sale
export const featuredSalonForSale: Job = {
  id: "featured-salon-1",
  title: "Premium Nail Salon for Sale",
  company: "Golden Touch Nails",
  location: "Orange County, CA",
  created_at: new Date().toISOString(),
  description: "Established nail salon with loyal clientele in prime location. Fully equipped with modern amenities.",
  price: "$180,000",
  image: "/salon-banner.png",
  salon_features: [
    "20 Nail Stations",
    "4 Pedicure Chairs", 
    "VIP Room",
    "Modern Equipment"
  ],
  contact_info: {
    owner_name: "Maria Johnson",
    phone: "(714) 555-0123",
    email: "maria@goldentouchnails.com"
  },
  type: "salon",
  category: "Salon" // Added category
};

// Get featured opportunities
export const getFeaturedOpportunities = (): Job[] => {
  const opportunities: Job[] = [
    {
      id: "opp-1",
      title: "Chair Rental Available",
      company: "Upscale Salon",
      location: "Dallas, TX",
      created_at: new Date().toISOString(),
      price: "$150/week",
      description: "Prime chair rental in busy upscale salon.",
      image: "/salon-banner.png",
      category: "Other" // Added category
    },
    {
      id: "opp-2", 
      title: "Booth Rental - Hair Stylist",
      company: "Modern Studio",
      location: "Austin, TX",
      created_at: new Date().toISOString(),
      price: "$200/week",
      description: "Modern booth rental for experienced hair stylist.",
      image: "/salon-banner.png",
      category: "Hair Stylist" // Added category
    },
    {
      id: "opp-3",
      title: "Spa Room Rental",
      company: "Wellness Center", 
      location: "Phoenix, AZ",
      created_at: new Date().toISOString(),
      price: "$300/week",
      description: "Private spa room for esthetician or massage therapist.",
      image: "/salon-banner.png",
      category: "Spa" // Added category
    }
  ];

  return opportunities;
};
