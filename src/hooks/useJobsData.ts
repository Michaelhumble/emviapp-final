
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

      console.log('🔍 [JOBS-FETCH] Starting to fetch jobs from Supabase...');
      console.log('🔍 [JOBS-FETCH] Supabase client configured for URL:', supabase.supabaseUrl);

      // Query only active jobs
      const { data, error: fetchError } = await supabase
        .from('jobs')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      console.log('📊 [JOBS-FETCH] Supabase query completed');
      console.log('📊 [JOBS-FETCH] - Raw data from Supabase:', data);
      console.log('📊 [JOBS-FETCH] - Error from Supabase:', fetchError);
      console.log('📊 [JOBS-FETCH] - Jobs count:', data?.length || 0);
      console.log('📊 [JOBS-FETCH] - Query used: SELECT * FROM jobs WHERE status = "active" ORDER BY created_at DESC');

      if (fetchError) {
        console.error('❌ [JOBS-FETCH-ERROR] Fetch error details:', {
          message: fetchError.message,
          details: fetchError.details,
          hint: fetchError.hint,
          code: fetchError.code,
          fullError: fetchError
        });
        setError('Failed to load jobs: ' + fetchError.message);
        return;
      }

      if (!data) {
        console.log('⚠️ [JOBS-FETCH] No data returned from query');
        setJobs([]);
        return;
      }

      console.log('📋 [JOBS-FETCH] Raw jobs data structure analysis:');
      data.forEach((job, index) => {
        console.log(`📋 [JOB-${index}] Job details:`, {
          id: job.id,
          title: job.title,
          user_id: job.user_id,
          status: job.status,
          created_at: job.created_at,
          pricing_tier: job.pricing_tier,
          fullJobData: job
        });
      });

      // Process and type the jobs correctly
      const processedJobs: Job[] = (data || []).map((job, index) => {
        console.log(`🔄 [JOBS-PROCESS] Transforming job ${index + 1}:`, job.id, job.title);
        
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
        };

        console.log(`✅ [JOBS-PROCESS] Processed job ${index + 1}:`, {
          id: processedJob.id,
          title: processedJob.title,
          category: processedJob.category,
          pricing_tier: processedJob.pricing_tier
        });

        return processedJob;
      });

      console.log('✅ [JOBS-FETCH-SUCCESS] Final processed jobs:', {
        totalCount: processedJobs.length,
        jobIds: processedJobs.map(j => j.id),
        jobTitles: processedJobs.map(j => j.title),
        fullJobsArray: processedJobs
      });
      
      setJobs(processedJobs);

    } catch (error) {
      console.error('💥 [JOBS-FETCH-CATCH] Unexpected error during job fetch:', {
        error,
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      setError('An unexpected error occurred while loading jobs');
    } finally {
      setLoading(false);
      console.log('🏁 [JOBS-FETCH] Job fetching process completed');
    }
  };

  useEffect(() => {
    console.log('🔄 [JOBS-DATA] useEffect triggered - starting initial job fetch');
    fetchJobs();

    // Set up real-time subscription for job changes
    console.log('🔄 [JOBS-DATA] Setting up real-time subscription for job changes');
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
          console.log('⚡ [JOBS-REALTIME] Real-time update received:', {
            eventType: payload.eventType,
            newData: payload.new,
            oldData: payload.old,
            fullPayload: payload
          });
          
          console.log('⚡ [JOBS-REALTIME] Triggering refresh due to real-time update');
          fetchJobs(); // Refresh jobs when changes occur
        }
      )
      .subscribe();

    console.log('🔄 [JOBS-DATA] Real-time subscription set up successfully');

    return () => {
      console.log('🔄 [JOBS-DATA] Cleaning up real-time subscription');
      supabase.removeChannel(channel);
    };
  }, []);

  // Manual refresh function
  const refreshJobs = () => {
    console.log('🔄 [JOBS-DATA] Manual refresh triggered by user');
    fetchJobs();
  };

  console.log('📊 [JOBS-DATA] Current hook state:', {
    jobsCount: jobs.length,
    loading,
    error,
    totalJobs: jobs.length
  });

  return {
    jobs,
    loading,
    error,
    refreshJobs,
    totalJobs: jobs.length
  };
};
