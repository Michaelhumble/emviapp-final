
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { Job } from "@/types/job";
import { formatJobListings } from "@/utils/jobs/jobListingFormatter";

export interface JobFilters {
  featured?: boolean;
  remote?: boolean;
  fullTime?: boolean;
  partTime?: boolean;
  location?: string;
}

export const useJobsData = (initialFilters: JobFilters = {}) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [filters, setFilters] = useState<JobFilters>(initialFilters);
  const { user } = useAuth();

  const fetchJobs = async () => {
    setLoading(true);
    try {
      // Execute the base query first
      const { data, error: apiError } = await supabase
        .from("jobs")
        .select("*");

      if (apiError) throw apiError;

      // Apply filters in JavaScript instead of database queries to avoid nesting issues
      let filteredData = data || [];
      
      if (filters.featured) {
        filteredData = filteredData.filter(job => job.is_featured === true);
      }
      
      if (filters.remote) {
        filteredData = filteredData.filter(job => job.is_remote === true);
      }
      
      if (filters.fullTime) {
        filteredData = filteredData.filter(job => job.employment_type === 'Full-time');
      }
      
      if (filters.partTime) {
        filteredData = filteredData.filter(job => job.employment_type === 'Part-time');
      }
      
      if (filters.location && filters.location !== 'all') {
        filteredData = filteredData.filter(job => 
          job.location && job.location.toLowerCase().includes(filters.location!.toLowerCase())
        );
      }

      // Format the filtered jobs
      const formattedJobs = formatJobListings(filteredData);
      setJobs(formattedJobs);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const updateFilters = (newFilters: Partial<JobFilters>) => {
    setFilters({ ...filters, ...newFilters });
  };

  return { jobs, loading, error, filters, updateFilters, fetchJobs };
};
