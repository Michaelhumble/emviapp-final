
import { Job } from '@/types/job';
import { Salon } from '@/types/salon';
import { premiumSalons } from '@/data/mockPremiumSalons';
import { premiumJobs, getFeaturedJobs as getPremiumFeaturedJobs } from '@/data/mockPremiumJobs';
import { premiumBooths } from '@/data/mockPremiumBooths';

/**
 * Get a list of salons for sale
 * @param count Number of salons to return (default: all)
 * @returns Array of salon listings
 */
export const getSalonsForSale = (count?: number): Job[] => {
  // Use our premium salon data
  const salons = premiumSalons.filter(salon => salon.for_sale);
  return count ? salons.slice(0, count) : salons;
};

// Export additional helper functions if needed
export const getFeaturedSalonsForSale = (count: number = 3): Job[] => {
  const allSalons = getSalonsForSale();
  const featured = allSalons.filter(salon => salon.is_featured && salon.status !== 'expired');
  return featured.slice(0, count);
};

/**
 * Get featured salons (not for sale) - this is needed by home components
 * @param count Number of salons to return (default: 3)
 * @returns Array of featured salon listings
 */
export const getFeaturedSalons = (count: number = 3): Salon[] => {
  // Get salons that are not for sale and are featured
  const notForSale = premiumSalons.filter(salon => !salon.for_sale && salon.is_featured);
  
  // Convert to Salon type
  const featuredSalons: Salon[] = notForSale.slice(0, count).map((job, index) => ({
    id: job.id,
    name: job.company || `Premium Salon ${index + 1}`,
    location: job.location || 'Unknown Location',
    price: typeof job.price === 'string' ? parseFloat(job.price) : (job.price || 0), // Ensure price is always a number
    imageUrl: job.image || 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=800&q=60',
    description: job.description || 'Premier beauty salon offering exceptional services.',
    // Additional fields:
    image: job.image || 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=800&q=60',
    logo: job.image || `https://via.placeholder.com/64x64?text=${job.company?.charAt(0) || 'S'}`,
    specialty: job.salon_type || job.specialties?.[0] || 'Beauty Salon',
    city: job.location,
    hours: {
      monday: '9:00 AM - 7:00 PM',
      tuesday: '9:00 AM - 7:00 PM',
      wednesday: '9:00 AM - 7:00 PM',
      thursday: '9:00 AM - 7:00 PM',
      friday: '9:00 AM - 8:00 PM',
      saturday: '9:00 AM - 8:00 PM',
      sunday: '10:00 AM - 6:00 PM'
    },
    bio: job.description || 'Premier beauty salon offering exceptional services.',
    rating: 4.5 + (Math.random() * 0.5),
    reviewCount: Math.floor(Math.random() * 50) + 10,
    priceRange: '$$ - $$$',
    established: 2015 - Math.floor(Math.random() * 10),
    services: job.salon_features?.slice(0, 5) || ['Premium Services'],
    amenities: ['Free WiFi', 'Complimentary Drinks', 'Comfortable Seating'],
    socialMedia: {
      instagram: 'salonhandle',
      facebook: 'salonpage'
    },
    bookingLink: '/book',
    isHiring: Math.random() > 0.5,
    featured: true
  }));
  
  return featuredSalons;
};

/**
 * Get featured job listings
 * @param count Number of jobs to return (default: 3)
 * @returns Array of featured job listings
 */
export const getFeaturedJobs = (count: number = 3): Job[] => {
  return getPremiumFeaturedJobs(count);
};

/**
 * Get a specific salon by its ID
 * @param id The salon ID to find
 * @returns The salon object or undefined if not found
 */
export const getSalonById = (id: string): Job | undefined => {
  return premiumSalons.find(salon => salon.id === id);
};

/**
 * Get all premium jobs
 * @param count Number of jobs to return (default: all)
 * @returns Array of job listings
 */
export const getAllJobs = (count?: number): Job[] => {
  return count ? premiumJobs.slice(0, count) : premiumJobs;
};

/**
 * Get all premium booths
 * @param count Number of booths to return (default: all)
 * @returns Array of booth listings
 */
export const getAllBooths = (count?: number): Job[] => {
  return count ? premiumBooths.slice(0, count) : premiumBooths;
};

/**
 * Get featured booths
 * @param count Number of booths to return (default: 3)
 * @returns Array of featured booth listings
 */
export const getFeaturedBooths = (count: number = 3): Job[] => {
  // Filter premium booths for featured ones
  const featuredBooths = premiumBooths.filter(booth => booth.is_featured);
  return featuredBooths.slice(0, count);
};
