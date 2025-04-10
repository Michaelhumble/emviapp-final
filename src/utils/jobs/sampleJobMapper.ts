
import { Job } from '@/types/job';

/**
 * Maps sample job data to ensure all required fields are present
 * This is a utility function to help with TypeScript compliance
 */
export const mapSampleJobData = (jobData: any): Job => {
  return {
    ...jobData,
    role: jobData.role || jobData.title || 'Job Role',
    posted_at: jobData.posted_at || jobData.created_at || new Date().toISOString(),
    // Convert any numeric values that should be strings
    asking_price: typeof jobData.asking_price === 'number' ? 
      String(jobData.asking_price) : jobData.asking_price,
    number_of_stations: typeof jobData.number_of_stations === 'number' ? 
      String(jobData.number_of_stations) : jobData.number_of_stations,
    square_feet: typeof jobData.square_feet === 'number' ? 
      String(jobData.square_feet) : jobData.square_feet,
    monthly_rent: typeof jobData.monthly_rent === 'number' ? 
      String(jobData.monthly_rent) : jobData.monthly_rent,
    revenue: typeof jobData.revenue === 'number' ? 
      String(jobData.revenue) : jobData.revenue,
  };
};

/**
 * Use this function to fix an array of sample jobs
 */
export const fixSampleJobsData = (jobs: any[]): Job[] => {
  return jobs.map(job => mapSampleJobData(job));
};
