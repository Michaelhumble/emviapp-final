
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
      // Start with a base query
      let query = supabase.from("jobs").select("*");

      // Apply filters one by one
      if (filters.featured) {
        query = query.eq('is_featured', true);
      }

      if (filters.remote) {
        query = query.eq('is_remote', true);
      }

      if (filters.fullTime) {
        query = query.eq('type', 'Full-time');
      }

      if (filters.partTime) {
        query = query.eq('type', 'Part-time');
      }

      // Location filter
      if (filters.location && filters.location !== 'all') {
        query = query.ilike('location', `%${filters.location}%`);
      }

      const { data, error: apiError } = await query;

      if (apiError) throw apiError;

      // Map the raw database jobs to our Job type with all required properties
      const formattedJobs = data ? formatJobListings(data as any) : [];
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
