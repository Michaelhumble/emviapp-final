
import { Job } from '@/types/job';
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

// Ensure we have placeholder implementations for other potential utilities
export const getSalonById = (id: string): Job | undefined => {
  const allSalons = getSalonsForSale();
  return allSalons.find(salon => salon.id === id);
};
