
import { Job } from '@/types/job';
import { generateVietnameseNailJobs } from './vietnameseJobSamples';

// Mock function to generate a random salon for jobs without salon info
const generateRandomSalon = () => {
  return {
    id: `salon-${Math.random().toString(36).substring(2, 9)}`,
    name: `Beauty Salon ${Math.floor(Math.random() * 100)}`,
    location: 'Los Angeles, CA',
    rating: (Math.random() * 5).toFixed(1)
  };
};

// Format a single job listing
export const formatJobListing = (job: Job): Job => {
  const isVietnamese = job.title.toLowerCase().includes('vietnamese') || 
                      (job.description && job.description.toLowerCase().includes('vietnamese'));

  if (isVietnamese) {
    const vietnameseJobs = generateVietnameseNailJobs(1);
    if (vietnameseJobs.length > 0) {
      const sampleJob = vietnameseJobs[0];
      // Return a new job object without modifying the original job
      return {
        ...job,
        // We don't use salary directly as it's not in the Job type
        // Instead we put it in the compensation_details if needed
        compensation_details: sampleJob.salary || job.compensation_details,
        specialties: sampleJob.specialties || job.specialties,
        // Any other fields we want to enhance
      };
    }
  }

  // Add salon details if missing (we use a separate variable since 'salon' isn't in the Job type)
  const randomSalonInfo = generateRandomSalon();
  
  // Return the original job or enhance it with generated data
  return {
    ...job
  };
};

// Format an array of job listings
export const formatJobListings = (jobs: Job[]): Job[] => {
  return jobs.map(job => formatJobListing(job));
};

// Ensure we have the single item function and array function both exported
export { formatJobListing as formatSingleJobListing };
