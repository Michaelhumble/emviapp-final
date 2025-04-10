
import { Job } from "@/types/job";
import { Salon } from "@/types/salon";
import sampleJobs from "@/data/sampleJobs";
import sampleSalons from "@/data/sampleSalons";

/**
 * Retrieves featured salons for display on homepage and other prominent sections
 */
export const getFeaturedSalons = (limit = 6): Salon[] => {
  // First get all salons marked as featured
  const featuredSalons = sampleSalons.filter(salon => salon.featured);
  
  // If we don't have enough featured salons, add some non-featured ones
  if (featuredSalons.length < limit) {
    const nonFeatured = sampleSalons
      .filter(salon => !salon.featured)
      .slice(0, limit - featuredSalons.length);
    
    return [...featuredSalons, ...nonFeatured];
  }
  
  // If we have more than enough featured salons, just return the limit
  return featuredSalons.slice(0, limit);
};

/**
 * Retrieves featured job listings for display on homepage and other prominent sections
 */
export const getFeaturedJobs = (limit = 6): Job[] => {
  // First get all jobs marked as featured
  const featuredJobs = sampleJobs.filter(job => job.is_featured);
  
  // If we don't have enough featured jobs, add some non-featured ones
  if (featuredJobs.length < limit) {
    const nonFeatured = sampleJobs
      .filter(job => !job.is_featured)
      .slice(0, limit - featuredJobs.length);
    
    return [...featuredJobs, ...nonFeatured];
  }
  
  // If we have more than enough featured jobs, just return the limit
  return featuredJobs.slice(0, limit);
};

/**
 * Filters jobs by specialty type
 */
export const getJobsBySpecialty = (specialty: string, limit = 10): Job[] => {
  const filteredJobs = sampleJobs.filter(job => 
    job.specialties && 
    job.specialties.some(s => s.toLowerCase().includes(specialty.toLowerCase()))
  );
  
  return filteredJobs.slice(0, limit);
};

/**
 * Filters salons by specialty type
 */
export const getSalonsBySpecialty = (specialty: string, limit = 10): Salon[] => {
  const filteredSalons = sampleSalons.filter(salon => 
    salon.specialty.toLowerCase().includes(specialty.toLowerCase())
  );
  
  return filteredSalons.slice(0, limit);
};

/**
 * Gets random jobs for displaying in various sections
 */
export const getRandomJobs = (limit = 6): Job[] => {
  const shuffled = [...sampleJobs].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, limit);
};

/**
 * Gets random salons for displaying in various sections
 */
export const getRandomSalons = (limit = 6): Salon[] => {
  const shuffled = [...sampleSalons].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, limit);
};

/**
 * Gets salons by city
 */
export const getSalonsByCity = (city: string, limit = 10): Salon[] => {
  const filteredSalons = sampleSalons.filter(salon => 
    salon.city.toLowerCase().includes(city.toLowerCase())
  );
  
  return filteredSalons.slice(0, limit);
};

/**
 * Gets hiring salons
 */
export const getHiringSalons = (limit = 10): Salon[] => {
  const hiringSalons = sampleSalons.filter(salon => salon.isHiring);
  return hiringSalons.slice(0, limit);
};

/**
 * Gets recently added salons
 */
export const getRecentSalons = (limit = 10): Salon[] => {
  // In a real app, this would sort by created_at timestamp
  // For sample data, we'll just return a random subset
  return getRandomSalons(limit);
};

/**
 * Gets recently added jobs
 */
export const getRecentJobs = (limit = 10): Job[] => {
  // In a real app, this would sort by created_at timestamp
  // For sample data, we'll just return a random subset
  return getRandomJobs(limit);
};
