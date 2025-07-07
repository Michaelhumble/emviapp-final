
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Job } from '@/types/job';

export const useJobsData = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔍 [JOBS-DATA] Fetching jobs from Supabase...');

      // Query only active jobs
      const { data, error: fetchError } = await supabase
        .from('jobs')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (fetchError) {
        console.error('❌ [JOBS-DATA] Fetch error:', fetchError);
        setError('Failed to load jobs');
        return;
      }

      console.log('📊 [JOBS-DATA] Raw data from Supabase:', data);

      // Process and type the jobs correctly
      const processedJobs: Job[] = (data || []).map(job => {
        const processedJob: Job = {
          // Core required fields
          id: job.id,
          title: job.title || 'Job Title',
          category: job.category || 'Other',
          location: job.location || '',
          description: job.description || '',
          user_id: job.user_id || '',
          status: job.status || 'active',
          created_at: job.created_at || new Date().toISOString(),
          
          // Job-specific fields
          compensation_type: job.compensation_type || '',
          compensation_details: job.compensation_details || '',
          requirements: job.requirements || '', // Always string
          pricing_tier: job.pricing_tier || 'free',
          
          // Handle contact_info as object
          contact_info: typeof job.contact_info === 'object' && job.contact_info ? 
            job.contact_info as Job['contact_info'] : {},
          
          // Legacy fields for compatibility
          role: job.title || 'Job Role',
          posted_at: job.created_at || new Date().toISOString(),
        };

        return processedJob;
      });

      console.log('✅ [JOBS-DATA] Processed jobs:', processedJobs);
      setJobs(processedJobs);

    } catch (error) {
      console.error('💥 [JOBS-DATA] Unexpected error:', error);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();

    // Set up real-time subscription for job changes
    const channel = supabase
      .channel('jobs-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'jobs',
          filter: 'status=eq.active'
        },
        (payload) => {
          console.log('⚡ [JOBS-DATA] Real-time update received:', payload);
          fetchJobs(); // Refresh jobs when changes occur
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Manual refresh function
  const refreshJobs = () => {
    fetchJobs();
  };

  return {
    jobs,
    loading,
    error,
    refreshJobs,
    totalJobs: jobs.length
  };
};
