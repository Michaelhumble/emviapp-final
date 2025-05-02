
import { Job } from "@/types/job";

/**
 * Formats a job listing from the database to match the Job interface
 * Handles potential missing fields and defaults
 */
export const formatJobListings = (dbJob: any): Job => {
  return {
    id: dbJob.id || '',
    title: dbJob.title || '',
    company: dbJob.company || '',
    name: dbJob.title || dbJob.name || '',  // For Salon compatibility
    location: dbJob.location || '',
    created_at: dbJob.created_at || new Date().toISOString(),
    description: dbJob.description || '',
    vietnamese_description: dbJob.vietnamese_description || '',
    employment_type: dbJob.employment_type || '',
    compensation_type: dbJob.compensation_type || '',
    compensation_details: dbJob.compensation_details || '',
    status: dbJob.status || 'active',
    expires_at: dbJob.expires_at || '',
    is_featured: dbJob.is_featured || false,
    is_remote: dbJob.is_remote || false,
    is_vietnamese_listing: !!dbJob.vietnamese_description,
    weekly_pay: dbJob.weekly_pay || false,
    has_housing: dbJob.has_housing || false,
    owner_will_train: dbJob.owner_will_train || false,
    no_supply_deduction: dbJob.no_supply_deduction || false,
    salary_range: dbJob.salary_range || '',
    specialties: dbJob.specialties || [],
    imageUrl: dbJob.image || dbJob.imageUrl || getDefaultJobImage(dbJob.employment_type || ''),
    image: dbJob.image || dbJob.imageUrl || getDefaultJobImage(dbJob.employment_type || ''),
    price: dbJob.price || dbJob.asking_price || '',
    monthly_rent: dbJob.monthly_rent || '',
    monthly_revenue: dbJob.monthly_revenue || dbJob.revenue || '',
    yearly_revenue: dbJob.yearly_revenue || '',
    established: dbJob.established || '',
    website: dbJob.website || '',
    type: dbJob.type || 'job'
  };
};

/**
 * Returns a default image URL based on job type
 */
const getDefaultJobImage = (jobType: string): string => {
  // Choose appropriate default images based on job type
  if (jobType.toLowerCase().includes('nail')) {
    return '/lovable-uploads/bb5c8292-c127-4fd2-9663-c65d596b135d.png';
  } else if (jobType.toLowerCase().includes('hair')) {
    return '/lovable-uploads/fa1b4f95-ebc9-452c-a18b-9d4e78db84bb.png';
  } else {
    return '/lovable-uploads/5a1ba245-85f7-4036-95f9-0e08ada34602.png';
  }
};

/**
 * Determines if a job is expired
 */
export const isJobExpired = (job: Job): boolean => {
  if (job.status === 'expired') {
    return true;
  }
  
  if (job.expires_at) {
    const expiryDate = new Date(job.expires_at);
    const now = new Date();
    return expiryDate < now;
  }
  
  // For jobs without explicit expiration, check if they're over 30 days old
  if (job.created_at) {
    const creationDate = new Date(job.created_at);
    const now = new Date();
    const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
    return (now.getTime() - creationDate.getTime()) > thirtyDaysInMs;
  }
  
  return false;
};

/**
 * Determines if a job is expiring soon (within 5 days)
 */
export const isJobExpiringSoon = (job: Job): boolean => {
  if (job.status === 'expired') {
    return false;
  }
  
  if (job.expires_at) {
    const expiryDate = new Date(job.expires_at);
    const now = new Date();
    const fiveDaysInMs = 5 * 24 * 60 * 60 * 1000;
    return !isJobExpired(job) && (expiryDate.getTime() - now.getTime()) < fiveDaysInMs;
  }
  
  return false;
};
