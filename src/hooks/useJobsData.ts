
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

      console.log('🔍 [JOBS-DATA] Fetching jobs from new table structure...');

      // Query all active jobs (no RLS for now)
      const { data, error: fetchError } = await supabase
        .from('jobs')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (fetchError) {
        console.error('❌ [JOBS-DATA] Fetch error:', fetchError);
        setError(`Failed to load jobs: ${fetchError.message}`);
        return;
      }

      console.log('📊 [JOBS-DATA] Raw data from Supabase:', data);
      console.log('📊 [JOBS-DATA] Number of jobs fetched:', data?.length || 0);

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
          updated_at: job.updated_at || new Date().toISOString(),
          expires_at: job.expires_at || '',
          
          // Job-specific fields
          compensation_type: job.compensation_type || '',
          compensation_details: job.compensation_details || '',
          requirements: job.requirements || '',
          pricing_tier: job.pricing_tier || 'free',
          
          // Handle contact_info as object
          contact_info: typeof job.contact_info === 'object' && job.contact_info ? 
            job.contact_info as Job['contact_info'] : {},
          
          // Legacy fields for compatibility
          role: job.title || 'Job Role',
          company: job.title || 'Company Name',
          posted_at: job.created_at || new Date().toISOString(),
        };

        return processedJob;
      });

      console.log('✅ [JOBS-DATA] Processed jobs:', processedJobs.length);
      console.log('✅ [JOBS-DATA] Sample job:', processedJobs[0] || 'No jobs');
      setJobs(processedJobs);

    } catch (error) {
      console.error('💥 [JOBS-DATA] Unexpected error:', error);
      setError(`An unexpected error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();

    // Set up real-time subscription for job changes
    console.log('📡 [JOBS-DATA] Setting up real-time subscription...');
    
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
      .subscribe((status) => {
        console.log('📡 [JOBS-DATA] Subscription status:', status);
      });

    return () => {
      console.log('📡 [JOBS-DATA] Cleaning up subscription');
      supabase.removeChannel(channel);
    };
  }, []);

  // Manual refresh function
  const refreshJobs = () => {
    console.log('🔄 [JOBS-DATA] Manual refresh triggered');
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
