
import { Job } from '@/types/job';
import { Salon } from '@/types/salon';
import salonData from '@/data/salonData';
import { fixSampleJobsData } from '@/utils/jobs/sampleJobMapper';
import generateMixedSalons from '@/utils/salons/vietnameseSalonGenerator';

// Set this to true to use the new Vietnamese salon generator
const USE_VIETNAMESE_GENERATOR = true;

// Cache the generated salons
let cachedSalons: Job[] | null = null;

/**
 * Get a list of salons for sale
 * @param count Number of salons to return (default: all)
 * @returns Array of salon listings
 */
export const getSalonsForSale = (count?: number): Job[] => {
  if (USE_VIETNAMESE_GENERATOR) {
    // Generate or use cached salons with 60% Vietnamese representation
    if (!cachedSalons) {
      cachedSalons = generateMixedSalons(40, 0.6); // Generate 40 salons, 60% Vietnamese
    }
    
    // Return all or a subset
    return count ? cachedSalons.slice(0, count) : cachedSalons;
  } else {
    // Use the original salon data
    const salons = fixSampleJobsData(salonData);
    return count ? salons.slice(0, count) : salons;
  }
};

// Export additional helper functions if needed
export const getFeaturedSalonsForSale = (count: number = 3): Job[] => {
  const allSalons = getSalonsForSale();
  const featured = allSalons.filter(salon => salon.is_featured && salon.status !== 'expired');
  return featured.slice(0, count);
};

// Add the missing functions that are being imported by other components

/**
 * Get featured salons (not for sale) - this is needed by home components
 * @param count Number of salons to return (default: 3)
 * @returns Array of featured salon listings
 */
export const getFeaturedSalons = (count: number = 3): Salon[] => {
  // This is just a placeholder implementation until we have real data
  // We'll convert some of the salon-for-sale listings to regular salon listings
  const salonJobs = getSalonsForSale(10);
  const featuredSalons: Salon[] = salonJobs.slice(0, count).map((job, index) => ({
    id: job.id,
    name: job.company,
    image: job.image || 'https://via.placeholder.com/500x300',
    logo: `https://via.placeholder.com/64x64?text=${job.company.charAt(0)}`,
    specialty: job.specialties?.[0] || 'Nail Salon',
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
    bio: job.description,
    rating: 4.5 + (Math.random() * 0.5),
    reviewCount: Math.floor(Math.random() * 50) + 10,
    priceRange: '$$ - $$$',
    established: 2015 - Math.floor(Math.random() * 10),
    services: job.salon_features?.slice(0, 5) || ['Manicure', 'Pedicure', 'Gel Polish', 'Nail Art'],
    amenities: ['Free WiFi', 'Complimentary Drinks', 'TV'],
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
  const allSalons = getSalonsForSale(20);
  
  // Create job listings from salon data
  const jobs = allSalons.map(salon => {
    return {
      ...salon,
      title: `${salon.specialties?.[0] || 'Nail'} Technician`,
      employment_type: Math.random() > 0.5 ? 'Full-time' : 'Part-time',
      compensation_details: `$${Math.floor(Math.random() * 30) + 20}/hr + tips`,
      for_sale: false, // These are job listings, not salons for sale
      weekly_pay: Math.random() > 0.7,
      has_housing: Math.random() > 0.8,
      owner_will_train: Math.random() > 0.6,
    };
  });
  
  const featured = jobs.filter(job => Math.random() > 0.7); // Randomly select some as featured
  return featured.slice(0, count);
};

// Ensure we have placeholder implementations for other potential utilities
export const getSalonById = (id: string): Job | undefined => {
  const allSalons = getSalonsForSale();
  return allSalons.find(salon => salon.id === id);
};
