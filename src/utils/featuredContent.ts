
import { Job } from '@/types/job';
import { Salon } from '@/types/salon';
import { sampleSalons } from '@/data/sampleSalons';

// Mock featured salons data
const featuredSalons: Salon[] = sampleSalons.filter(salon => salon.featured);

// Mock salons for sale
const salonsForSale: Salon[] = sampleSalons.slice(0, 6);

// Mock featured jobs
const featuredJobs: Job[] = [
  {
    id: "job-1",
    title: "Senior Nail Technician",
    company: "Luxury Nail Spa",
    location: "Los Angeles, CA",
    created_at: new Date().toISOString(),
    is_featured: true,
    image: "/lovable-uploads/72f0f6c8-5793-4750-993d-f250b495146d.png",
  },
  {
    id: "job-2",
    title: "Hair Stylist",
    company: "Elegant Hair Studio",
    location: "New York, NY",
    created_at: new Date().toISOString(),
    is_featured: true,
    image: "/lovable-uploads/0c68659d-ebd4-4091-aa1a-9329f3690d68.png",
  },
  {
    id: "job-3",
    title: "Salon Manager",
    company: "Bliss Beauty Lounge",
    location: "Miami, FL",
    created_at: new Date().toISOString(),
    is_featured: true,
    image: "/lovable-uploads/bb5c8292-c127-4fd2-9663-c65d596b135d.png",
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
    image: salon.image || salon.imageUrl || '', // Preserve image URL if available
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
  return count ? featuredSalons.slice(0, count) : featuredSalons;
};

/**
 * Get all salons for sale, optionally limited by count
 */
export const getSalonsForSale = (count?: number): Salon[] => {
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
