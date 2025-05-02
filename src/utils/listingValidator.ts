
import { getSalonById } from '@/utils/featuredContent';
import jobsData from '@/data/jobsData';

export type ListingType = 'salon' | 'job' | 'opportunity' | 'booth' | 'page';

/**
 * Validates if a listing exists with the given ID and type
 * @param id The ID of the listing to validate
 * @param type The type of listing (salon, job, opportunity, booth)
 * @returns Promise<boolean> True if the listing exists, false otherwise
 */
export const validateListingExists = async (id: string, type: ListingType): Promise<boolean> => {
  // For static page routes, we always return true
  if (type === 'page') return true;

  // Add a small delay to simulate API check (prevent UI flashing)
  await new Promise(resolve => setTimeout(resolve, 100));

  switch (type) {
    case 'salon':
      return !!getSalonById(id);
    
    case 'job':
    case 'opportunity':
      // Fix: Convert the job.id to string before comparing with the string id parameter
      return !!jobsData.find(job => job.id.toString() === id);
    
    case 'booth':
      // We could implement booth validation in the future
      return true;
    
    default:
      return false;
  }
};

/**
 * Validates listing data by checking required fields
 * @param data Listing data to validate
 * @param requiredFields Array of field names that must exist in data
 * @returns boolean True if the listing data is valid, false otherwise
 */
export const validateListingData = (data: any, requiredFields: string[]): boolean => {
  if (!data) return false;
  
  return requiredFields.every(field => {
    return data[field] !== undefined && data[field] !== null;
  });
};

/**
 * Generates a fallback route based on listing type
 * @param type The type of listing
 * @returns A fallback route for the listing type
 */
export const getFallbackRoute = (type: ListingType): string => {
  switch (type) {
    case 'salon': return '/salons';
    case 'job': return '/jobs'; 
    case 'opportunity': return '/jobs';
    case 'booth': return '/opportunities';
    case 'page': return '/';
    default: return '/';
  }
};
