
import { useState, useEffect } from "react";
import { Job } from "@/types/job";
import { supabase } from "@/integrations/supabase/client";

export interface JobFilters {
  location?: string;
  employmentType?: string;
  salaryRange?: [number, number];
}

export const useJobsData = (initialFilters: JobFilters = {}) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [renewalJobId, setRenewalJobId] = useState<string | null>(null);
  const [filters, setFilters] = useState<JobFilters>(initialFilters);
  const [sortOption, setSortOption] = useState("recent");

  const fetchJobs = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('jobs')
        .select('*')
        .eq('status', 'active');

      // Apply filters
      if (filters.location) {
        query = query.ilike('location', `%${filters.location}%`);
      }
      
      if (filters.employmentType) {
        query = query.eq('compensation_type', filters.employmentType);
      }

      // Sort
      if (sortOption === 'recent') {
        query = query.order('created_at', { ascending: false });
      } else if (sortOption === 'location') {
        query = query.order('location', { ascending: true });
      }

      const { data, error } = await query;

      if (error) throw error;

      // Transform Supabase data to Job type
      const transformedJobs: Job[] = data?.map(job => ({
        id: job.id,
        title: job.title,
        company: job.title,
        location: job.location || '',
        created_at: job.created_at,
        description: job.description || '',
        employment_type: job.compensation_type || '',
        compensation_details: job.compensation_details || '',
        contact_info: job.contact_info || {},
        pricing_tier: job.pricing_tier || 'free',
        user_id: job.user_id,
        status: job.status,
        expires_at: job.expires_at
      })) || [];

      setJobs(transformedJobs);
      setError(null);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [filters, sortOption]);

  const updateSearchTerm = (term: string) => {
    setSearchTerm(term);
  };

  const updateFilters = (newFilters: Partial<JobFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const setActiveRenewalJobId = (jobId: string | null) => {
    setRenewalJobId(jobId);
  };

  // Filter jobs by search term
  const filteredJobs = jobs.filter(job => 
    job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    jobs: filteredJobs,
    loading,
    error,
    searchTerm,
    updateSearchTerm,
    filters,
    updateFilters,
    sortOption,
    setSortOption,
    renewalJobId,
    setActiveRenewalJobId,
    refetch: fetchJobs
  };
};

export default useJobsData;
export type { JobFilters };
