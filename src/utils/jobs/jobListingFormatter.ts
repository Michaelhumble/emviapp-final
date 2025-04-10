import { Job } from '@/types/job';
import { generateVietnameseNailJobs } from './vietnameseNailJobSamples';

// Mock function to generate a random salon for jobs without salon info
const generateRandomSalon = () => {
  return {
    id: `salon-${Math.random().toString(36).substring(2, 9)}`,
    name: `Beauty Salon ${Math.floor(Math.random() * 100)}`,
    location: 'Los Angeles, CA',
    rating: (Math.random() * 5).toFixed(1)
  };
};

// Format a single job listing from database object to our Job type
export const formatJobListing = (dbJob: any): Job => {
  // Get basic properties that should exist in database
  const { id, title, compensation_type, compensation_details, description, requirements, status, created_at, expires_at } = dbJob;
  
  // Default values for required properties that might not exist in the database
  const job: Job = {
    id: id || `job-${Math.random().toString(36).substring(2, 9)}`,
    title: title || "Job Title",
    role: title || "Job Title", // Adding role property
    company: dbJob.company || "Company Name",
    location: dbJob.location || "Remote",
    employment_type: dbJob.employment_type || "Full-time",
    description: description || "",
    salary_range: dbJob.salary_range || compensation_details || "Competitive",
    posted_at: created_at || new Date().toISOString(),
    contact_email: dbJob.contact_email || "contact@example.com",
    is_featured: dbJob.is_featured || false,
    is_remote: dbJob.is_remote || false,
    experience_level: dbJob.experience_level || "Not specified",
    created_at: created_at || new Date().toISOString(),
    compensation_type: compensation_type || "hourly",
    compensation_details: compensation_details || "",
    status: status || "active",
    expires_at: expires_at || new Date(Date.now() + 30 * 86400000).toISOString(),
    requirements: requirements || [],
  };

  // If it's a Vietnamese job, enhance with additional data
  const isVietnamese = title?.toLowerCase().includes('vietnamese') || 
                     description?.toLowerCase().includes('vietnamese');

  if (isVietnamese) {
    const vietnameseJobs = generateVietnameseNailJobs(1);
    if (vietnameseJobs.length > 0) {
      const sampleJob = vietnameseJobs[0];
      // Enhance with Vietnamese-specific fields
      return {
        ...job,
        specialties: sampleJob.specialties,
        vietnamese_description: sampleJob.vietnamese_description,
        contact_info: sampleJob.contact_info,
        tip_range: sampleJob.tip_range,
        weekly_pay: sampleJob.weekly_pay,
        owner_will_train: sampleJob.owner_will_train,
        has_housing: sampleJob.has_housing,
        no_supply_deduction: sampleJob.no_supply_deduction
      };
    }
  }

  return job;
};

// Format an array of job listings
export const formatJobListings = (dbJobs: any[]): Job[] => {
  return dbJobs.map(job => formatJobListing(job));
};

// Ensure we have the single item function exported
export { formatJobListing as formatSingleJobListing };
