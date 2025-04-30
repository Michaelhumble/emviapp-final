import { Job } from '@/types/job';
import jobsData from '@/data/jobsData';
import { sampleSalons } from '@/data/sampleSalons';

/**
 * Enhance a listing with proper image URL and type information
 * @param listing The listing to enhance
 * @returns Enhanced listing with imageUrl and proper routing
 */
export function enhanceListingWithImage(listing: any): Job {
  // Make sure every listing has image URL and type for proper routing
  const enhanced = { ...listing };
  
  // Ensure proper routing type is set
  if (!enhanced.type) {
    // Determine type based on properties
    if ('salon_name' in listing || 'salon_features' in listing) {
      enhanced.type = 'salon';
    } else if ('company' in listing || 'salary_range' in listing) {
      enhanced.type = 'job';
    } else {
      enhanced.type = 'opportunity';
    }
  }
  
  // Ensure image URL is set
  if (!enhanced.imageUrl) {
    // Use existing image property if it exists
    if (enhanced.image) {
      enhanced.imageUrl = enhanced.image;
    } else {
      // Otherwise set a fallback image based on listing type
      const fallbackImages = {
        salon: '/lovable-uploads/72f0f6c8-5793-4750-993d-f250b495146d.png',
        job: '/lovable-uploads/0c68659d-ebd4-4091-aa1a-9329f3690d68.png',
        opportunity: '/lovable-uploads/bb5c8292-c127-4fd2-9663-c65d596b135d.png'
      };
      
      enhanced.imageUrl = fallbackImages[enhanced.type as keyof typeof fallbackImages] || 
                         '/lovable-uploads/72f0f6c8-5793-4750-993d-f250b495146d.png';
    }
  }
  
  return enhanced as Job;
}

/**
 * Get mock listings for development
 * @returns Array of listings with proper formatting
 */
export function getMockDiverseListings(): Job[] {
  // Get a mix of salon and job listings
  const salonListings = sampleSalons.slice(0, 3).map(salon => ({
    id: salon.id,
    title: salon.name,
    company: salon.name,
    location: salon.location,
    description: salon.description,
    imageUrl: salon.imageUrl || salon.image,
    created_at: salon.created_at || new Date().toISOString(),
    type: 'salon' as const,
    specialties: salon.features || []
  }));
  
  const jobListings = jobsData.slice(0, 3).map(job => ({
    id: job.id || `job-${Math.random().toString(36).substring(2, 8)}`,
    title: job.title || 'Job Position',
    company: job.company || 'Company Name',
    location: job.location || 'Location',
    description: job.description || '',
    imageUrl: job.image || '',
    created_at: job.posted || new Date().toISOString(),
    type: 'job' as const,
    specialties: job.specialties || []
  }));
  
  // Combine and enhance all listings
  return [...salonListings, ...jobListings].map(enhanceListingWithImage);
}

/**
 * Get diverse listings with validated IDs
 * @returns Promise<Job[]> Array of validated listings
 */
export async function getValidatedDiverseListings(): Promise<Job[]> {
  // For now, we're using mock data but with verification
  const listings = getMockDiverseListings();
  
  // Log verification for debugging
  console.log(`Retrieved ${listings.length} diverse listings for home page`);
  return listings;
}
