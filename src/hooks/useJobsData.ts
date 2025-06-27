
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

      // Transform Supabase data to Job type with proper contact_info handling
      const transformedJobs: Job[] = data?.map(job => ({
        id: job.id,
        title: job.title,
        company: job.title,
        location: job.location || '',
        created_at: job.created_at,
        description: job.description || '',
        employment_type: job.compensation_type || '',
        compensation_details: job.compensation_details || '',
        contact_info: typeof job.contact_info === 'object' && job.contact_info !== null 
          ? job.contact_info as { owner_name?: string; phone?: string; email?: string; notes?: string; zalo?: string; }
          : {},
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

  const createJob = async (jobData: any) => {
    try {
      // Ensure all required fields are properly formatted
      const jobPayload = {
        title: jobData.title,
        description: jobData.description || '',
        location: jobData.location || '',
        compensation_type: jobData.compensation_type || jobData.employment_type || '',
        compensation_details: jobData.compensation_details || '',
        requirements: jobData.requirements || '',
        contact_info: jobData.contact_info || {},
        pricing_tier: jobData.pricing_tier || 'free',
        user_id: jobData.user_id,
        status: 'active'
      };

      const { data, error } = await supabase
        .from('jobs')
        .insert([jobPayload])
        .select()
        .single();

      if (error) {
        console.error('Error creating job:', error);
        throw error;
      }

      // Refresh jobs list to show the new job
      await fetchJobs();
      
      return { data, error: null };
    } catch (err) {
      console.error('Error in createJob:', err);
      return { data: null, error: err as Error };
    }
  };

  const updateJob = async (jobId: string, jobData: any) => {
    try {
      const jobPayload = {
        title: jobData.title,
        description: jobData.description || '',
        location: jobData.location || '',
        compensation_type: jobData.compensation_type || jobData.employment_type || '',
        compensation_details: jobData.compensation_details || '',
        requirements: jobData.requirements || '',
        contact_info: jobData.contact_info || {},
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('jobs')
        .update(jobPayload)
        .eq('id', jobId)
        .select()
        .single();

      if (error) {
        console.error('Error updating job:', error);
        throw error;
      }

      // Refresh jobs list to show the updated job
      await fetchJobs();
      
      return { data, error: null };
    } catch (err) {
      console.error('Error in updateJob:', err);
      return { data: null, error: err as Error };
    }
  };

  const getJobById = async (jobId: string) => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', jobId)
        .single();

      if (error) throw error;

      return {
        id: data.id,
        title: data.title,
        company: data.title,
        location: data.location || '',
        created_at: data.created_at,
        description: data.description || '',
        employment_type: data.compensation_type || '',
        compensation_details: data.compensation_details || '',
        contact_info: typeof data.contact_info === 'object' && data.contact_info !== null 
          ? data.contact_info as { owner_name?: string; phone?: string; email?: string; notes?: string; zalo?: string; }
          : {},
        pricing_tier: data.pricing_tier || 'free',
        user_id: data.user_id,
        status: data.status,
        expires_at: data.expires_at,
        requirements: data.requirements || ''
      } as Job;
    } catch (err) {
      console.error('Error fetching job by ID:', err);
      throw err;
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
    refetch: fetchJobs,
    createJob,
    updateJob,
    getJobById
  };
};

export default useJobsData;
