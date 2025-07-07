
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Job } from '@/types/job';

export const useJobsData = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = async () => {
    console.log('🔍 [JOBS-DATA] Starting jobs fetch...');
    
    try {
      setLoading(true);
      setError(null);

      // Query only active jobs
      const { data, error: fetchError } = await supabase
        .from('jobs')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      console.log('🔍 [JOBS-DATA] Raw Supabase response:', {
        dataCount: data?.length || 0,
        fetchError,
        rawData: data?.slice(0, 3) // Show first 3 for debugging
      });

      if (fetchError) {
        console.error('❌ [JOBS-DATA] Fetch error:', fetchError);
        setError('Failed to load jobs');
        return;
      }

      // Process and type the jobs correctly
      const processedJobs: Job[] = (data || []).map(job => ({
        ...job,
        // Ensure all required fields are present with correct types
        id: job.id,
        title: job.title || 'Job Title',
        category: job.category,
        location: job.location || '',
        description: job.description || '',
        user_id: job.user_id || '',
        status: job.status || 'active',
        created_at: job.created_at || new Date().toISOString(),
        compensation_type: job.compensation_type || '',
        compensation_details: job.compensation_details || '',
        requirements: job.requirements || '', // Always string
        pricing_tier: job.pricing_tier || 'free',
        // Handle contact_info as object
        contact_info: typeof job.contact_info === 'object' && job.contact_info ? 
          job.contact_info as Job['contact_info'] : {},
        // Legacy fields for compatibility
        role: job.role || job.title || 'Job Role',
        posted_at: job.posted_at || job.created_at || new Date().toISOString(),
      }));

      console.log('📊 [JOBS-DATA] Processed jobs count:', processedJobs.length);
      console.log('📝 [JOBS-DATA] Sample jobs:', processedJobs.slice(0, 2).map(job => ({
        id: job.id,
        title: job.title,
        status: job.status,
        pricing_tier: job.pricing_tier,
        user_id: job.user_id,
        created_at: job.created_at,
        contact_info: job.contact_info
      })));

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
    console.log('⚡ [JOBS-DATA] Setting up real-time subscription');
    
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
      console.log('⚡ [JOBS-DATA] Cleaning up subscription');
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
