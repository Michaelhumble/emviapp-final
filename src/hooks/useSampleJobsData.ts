
import { useState, useEffect } from "react";
import { Job } from "@/types/job";
import { mockJobs } from "@/utils/jobs/mockJobData";

export interface JobFilters {
  searchText?: string;
  location?: string;
  employmentType?: string;
  paymentPreference?: string[];
  language?: string;
}

const useSampleJobsData = (initialFilters: JobFilters = {}) => {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [filters, setFilters] = useState<JobFilters>(initialFilters);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Apply filters when they change
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      try {
        const filteredJobs = applyFilters(mockJobs, filters);
        setJobs(filteredJobs);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error occurred"));
      } finally {
        setIsLoading(false);
      }
    }, 300);
  }, [filters]);

  // Function to apply all filters
  const applyFilters = (jobs: Job[], filters: JobFilters): Job[] => {
    return jobs.filter(job => {
      // Apply text search filter
      if (filters.searchText && !matchesSearchText(job, filters.searchText)) {
        return false;
      }
      
      // Apply location filter
      if (filters.location && !matchesLocation(job, filters.location)) {
        return false;
      }
      
      // Apply employment type filter
      if (filters.employmentType && !matchesEmploymentType(job, filters.employmentType)) {
        return false;
      }
      
      // Apply payment preference filters
      if (filters.paymentPreference && filters.paymentPreference.length > 0 && 
          !matchesPaymentPreferences(job, filters.paymentPreference)) {
        return false;
      }
      
      // Apply language filter
      if (filters.language && !matchesLanguage(job, filters.language)) {
        return false;
      }
      
      return true;
    });
  };

  // Helper filter functions
  const matchesSearchText = (job: Job, searchText: string): boolean => {
    const text = searchText.toLowerCase();
    return (
      (job.title || '').toLowerCase().includes(text) ||
      (job.company || '').toLowerCase().includes(text) ||
      (job.description || '').toLowerCase().includes(text)
    );
  };

  const matchesLocation = (job: Job, location: string): boolean => {
    return (job.location || '').toLowerCase().includes(location.toLowerCase());
  };

  const matchesEmploymentType = (job: Job, employmentType: string): boolean => {
    return job.employment_type === employmentType;
  };

  const matchesPaymentPreferences = (job: Job, preferences: string[]): boolean => {
    // Check each preference
    return preferences.some(pref => {
      switch (pref) {
        case 'weekly':
          return job.weekly_pay === true;
        case 'housing':
          return job.has_housing === true;
        case 'training':
          return job.owner_will_train === true;
        default:
          return false;
      }
    });
  };

  const matchesLanguage = (job: Job, language: string): boolean => {
    if (language === 'vietnamese') {
      return job.vietnamese_description !== undefined && 
             job.vietnamese_description !== null && 
             job.vietnamese_description !== '';
    } else if (language === 'english') {
      return !job.vietnamese_description;
    }
    return true; // 'all' or any other value
  };

  // Function to update filters
  const updateFilters = (newFilters: Partial<JobFilters>) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters
    }));
  };

  // Calculate expirations for all jobs
  const expirations: Record<string, boolean> = {};
  jobs.forEach(job => {
    const isExpired = job.status === 'expired' || 
                    (job.expires_at && new Date(job.expires_at) < new Date());
    expirations[job.id] = isExpired;
  });

  return {
    jobs,
    isLoading,
    error,
    filters,
    updateFilters,
    expirations,
    totalPages: 1,
  };
};

export default useSampleJobsData;
