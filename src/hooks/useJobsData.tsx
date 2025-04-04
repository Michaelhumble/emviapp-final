
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  salary: string;
  posted_date: string;
  closing_date: string | null;
  contact_email: string;
  company_logo?: string;
  is_featured: boolean;
  is_remote: boolean;
  experience_level: string;
  created_at: string;
};

interface JobFilters {
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

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        // Start with a base query
        let query = supabase.from("jobs").select("*");

        // Apply filters one by one with explicit type checking
        if (filters.featured === true) {
          query = query.eq('is_featured', true);
        }

        if (filters.remote === true) {
          query = query.eq('is_remote', true);
        }

        if (filters.fullTime === true) {
          query = query.eq('type', 'Full-time');
        }

        if (filters.partTime === true) {
          query = query.eq('type', 'Part-time');
        }

        // Location filter
        if (filters.location && typeof filters.location === 'string' && filters.location !== 'all') {
          query = query.ilike('location', `%${filters.location}%`);
        }

        const { data, error } = await query;

        if (error) throw error;
        setJobs(data || []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [filters]);

  const updateFilters = (newFilters: Partial<JobFilters>) => {
    setFilters({ ...filters, ...newFilters });
  };

  return { jobs, loading, error, filters, updateFilters };
};
