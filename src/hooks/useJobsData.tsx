
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { Job } from "@/types/job";
import { formatJobListings } from "@/utils/jobs/jobListingFormatter";
import { mockJobs } from "@/utils/jobs/mockJobData";

export interface JobFilters {
  featured?: boolean;
  remote?: boolean;
  fullTime?: boolean;
  partTime?: boolean;
  location?: string;
  weeklyPay?: boolean;
  ownerWillTrain?: boolean;
  employmentType?: string;
  showExpired?: boolean;
  hasHousing?: boolean;
  noSupplyDeduction?: boolean;
}

export const useJobsData = (initialFilters: JobFilters = {}) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [filters, setFilters] = useState<JobFilters>(initialFilters);
  const { user } = useAuth();

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      // Use mock data for now instead of Supabase
      let filteredJobs = [...mockJobs];
      
      // Apply filters in JavaScript
      if (filters.featured) {
        filteredJobs = filteredJobs.filter(job => job.is_featured);
      }
      
      if (filters.remote) {
        filteredJobs = filteredJobs.filter(job => job.is_remote);
      }
      
      if (filters.fullTime) {
        filteredJobs = filteredJobs.filter(job => job.employment_type === 'Full-Time');
      }
      
      if (filters.partTime) {
        filteredJobs = filteredJobs.filter(job => job.employment_type === 'Part-Time');
      }
      
      if (filters.location && filters.location !== 'all') {
        filteredJobs = filteredJobs.filter(job => 
          job.location && job.location.toLowerCase().includes(filters.location!.toLowerCase())
        );
      }
      
      if (filters.weeklyPay) {
        filteredJobs = filteredJobs.filter(job => job.weekly_pay === true);
      }
      
      if (filters.ownerWillTrain) {
        filteredJobs = filteredJobs.filter(job => job.owner_will_train === true);
      }
      
      if (filters.hasHousing) {
        filteredJobs = filteredJobs.filter(job => job.has_housing === true);
      }
      
      if (filters.noSupplyDeduction) {
        filteredJobs = filteredJobs.filter(job => job.no_supply_deduction === true);
      }
      
      if (filters.employmentType && filters.employmentType !== 'all') {
        filteredJobs = filteredJobs.filter(job => job.employment_type === filters.employmentType);
      }
      
      // Only show active jobs unless showExpired is true
      if (!filters.showExpired) {
        filteredJobs = filteredJobs.filter(job => job.status !== 'expired');
      }

      setJobs(filteredJobs);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const updateFilters = (newFilters: Partial<JobFilters>) => {
    setFilters({ ...filters, ...newFilters });
  };

  return { jobs, loading, error, filters, updateFilters, fetchJobs };
};
