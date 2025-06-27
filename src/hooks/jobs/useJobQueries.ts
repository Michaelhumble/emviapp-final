
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Job } from '@/types/job';

export const useJobQueries = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchJobs = async (filters?: { pricingTier?: string; status?: string; userId?: string }) => {
    setLoading(true);
    try {
      let query = supabase.from('jobs').select('*');

      if (filters?.pricingTier) {
        query = query.eq('pricing_tier', filters.pricingTier);
      }
      if (filters?.status) {
        query = query.eq('status', filters.status);
      }
      if (filters?.userId) {
        query = query.eq('user_id', filters.userId);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;

      // Transform the data to match our Job interface
      const transformedJobs = (data || []).map(job => ({
        ...job,
        contact_info: typeof job.contact_info === 'object' && job.contact_info !== null 
          ? job.contact_info as { [key: string]: any; owner_name?: string; phone?: string; email?: string; notes?: string; zalo?: string; }
          : {}
      })) as Job[];

      setJobs(transformedJobs);
      return transformedJobs;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchJobById = async (jobId: string): Promise<Job | null> => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', jobId)
        .single();

      if (error) throw error;
      
      // Transform the data to match our Job interface
      const transformedJob = {
        ...data,
        contact_info: typeof data.contact_info === 'object' && data.contact_info !== null 
          ? data.contact_info as { [key: string]: any; owner_name?: string; phone?: string; email?: string; notes?: string; zalo?: string; }
          : {}
      } as Job;

      return transformedJob;
    } catch (error) {
      console.error('Error fetching job by ID:', error);
      return null;
    }
  };

  return {
    jobs,
    loading,
    fetchJobs,
    fetchJobById
  };
};
