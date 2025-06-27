
import { useState, useEffect } from 'react';
import { Job } from '@/types/job';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { premiumJobs } from '@/data/jobs/premiumJobs';
import { diamondJobs } from '@/data/jobs/diamondJobs';
import { vietnameseJobs } from '@/data/protected/vietnameseJobs';
import { expiredListings } from '@/data/expiredListings';
import { vietnameseExpiredJobs } from '@/data/vietnameseExpiredJobs';

export const useJobsData = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [renewalJobId, setActiveRenewalJobId] = useState<string | null>(null);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      
      // Fetch jobs from Supabase
      const { data: supabaseJobs, error: supabaseError } = await supabase
        .from('jobs')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (supabaseError) {
        console.error('Error fetching jobs from Supabase:', supabaseError);
      }

      // Transform Supabase jobs to match Job interface
      const transformedSupabaseJobs: Job[] = (supabaseJobs || []).map(job => ({
        id: job.id,
        title: job.title || 'Job Title',
        category: job.category || "Other",
        created_at: job.created_at || new Date().toISOString(),
        company: job.title || 'Company',
        location: job.location || '',
        description: job.description || '',
        compensation_type: job.compensation_type || '',
        compensation_details: job.compensation_details || '',
        contact_info: typeof job.contact_info === 'object' && job.contact_info ? job.contact_info as any : {},
        user_id: job.user_id || '',
        status: job.status || 'active',
        expires_at: job.expires_at || '',
        requirements: job.requirements || ''
      }));

      // Combine all job sources with default categories
      const allJobs: Job[] = [
        ...transformedSupabaseJobs,
        ...premiumJobs.map(job => ({ ...job, category: job.category || "Other" })),
        ...diamondJobs.map(job => ({ ...job, category: job.category || "Other" })),
        ...vietnameseJobs.map(job => ({ ...job, category: job.category || "Other" })),
        ...expiredListings.map(job => ({ ...job, category: job.category || "Other" })),
        ...vietnameseExpiredJobs.map(job => ({ ...job, category: job.category || "Other" }))
      ];

      setJobs(allJobs);
    } catch (err) {
      console.error('Error in fetchJobs:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const createJob = async (jobData: any) => {
    try {
      const jobToInsert = {
        ...jobData,
        category: jobData.category || "Other",
        status: 'active'
      };

      const { data, error } = await supabase
        .from('jobs')
        .insert([jobToInsert])
        .select()
        .single();

      if (error) throw error;

      await fetchJobs();
      
      return { data, error: null };
    } catch (error) {
      console.error('Error creating job:', error);
      return { data: null, error };
    }
  };

  const refetch = fetchJobs;

  useEffect(() => {
    fetchJobs();
  }, []);

  return {
    jobs,
    loading,
    error,
    renewalJobId,
    setActiveRenewalJobId,
    refetch,
    createJob
  };
};
