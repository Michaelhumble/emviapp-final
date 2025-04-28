
import { Job } from '@/types/job';
import { salonListings } from '@/data/salonData';

/**
 * Fetches a job or salon listing by ID
 * @param id The ID of the job or salon to fetch
 * @returns The job/salon data or null if not found
 */
export const fetchJob = async (id: string): Promise<Job> => {
  // In a real app, this would be an API call
  // For now, we'll use the mock data
  const job = salonListings.find(listing => listing.id === id);
  
  if (!job) {
    throw new Error(`Job with ID ${id} not found`);
  }
  
  return {
    id: job.id,
    title: job.name,
    company: job.name,
    location: job.location,
    created_at: new Date().toISOString(),
    description: job.description,
    price: job.price.toString(),
    image: job.imageUrl,
    salon_features: job.features || [],
    contact_info: {
      owner_name: "Salon Owner",
      phone: "(555) 123-4567",
      email: "contact@emviapp.com"
    },
    // Add any other fields needed
  };
};

/**
 * Fetches a list of jobs with optional filtering
 */
export const fetchJobs = async (): Promise<Job[]> => {
  // In a real app, this would be an API call with filters
  const jobs = salonListings.map(listing => ({
    id: listing.id,
    title: listing.name,
    company: listing.name,
    location: listing.location,
    created_at: new Date().toISOString(),
    description: listing.description,
    price: listing.price.toString(),
    image: listing.imageUrl,
    // Add any other fields needed
  }));
  
  return jobs;
};
