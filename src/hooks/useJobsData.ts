
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Job } from '@/types/job';

export const useJobsData = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchJobs = async () => {
    try {
      console.log('🔍 [JOBS-DATA] Starting job fetch...');
      
      // EXACT QUERY: Fetch ALL active jobs regardless of pricing_tier
      const { data: jobsData, error: fetchError } = await supabase
        .from('jobs')
        .select(`
          id,
          title,
          category,
          location,
          description,
          compensation_type,
          compensation_details,
          contact_info,
          user_id,
          status,
          expires_at,
          requirements,
          pricing_tier,
          created_at
        `)
        .eq('status', 'active')  // ONLY filter by status = 'active'
        .order('created_at', { ascending: false });

      console.log('🔍 [JOBS-DATA] Raw Supabase response:', { jobsData, fetchError });
      console.log('🔍 [JOBS-DATA] Query executed: SELECT * FROM jobs WHERE status = "active" ORDER BY created_at DESC');

      if (fetchError) {
        console.error('❌ [JOBS-DATA] Supabase fetch error:', fetchError);
        throw fetchError;
      }

      if (!jobsData) {
        console.log('⚠️ [JOBS-DATA] No jobs data returned');
        setJobs([]);
        return;
      }

      console.log('✅ [JOBS-DATA] Jobs fetched successfully:', {
        count: jobsData.length,
        jobs: jobsData.map(j => ({
          id: j.id,
          title: j.title,
          status: j.status,
          pricing_tier: j.pricing_tier,
          user_id: j.user_id,
          created_at: j.created_at
        }))
      });

      // Transform to Job interface
      const transformedJobs: Job[] = jobsData.map(job => ({
        id: job.id,
        title: job.title || 'Untitled Job',
        category: job.category || 'Other',
        location: job.location || '',
        description: job.description || '',
        compensation_type: job.compensation_type || '',
        compensation_details: job.compensation_details || '',
        contact_info: job.contact_info || {},
        user_id: job.user_id || '',
        status: job.status || 'active',
        expires_at: job.expires_at || '',
        requirements: job.requirements || '',
        pricing_tier: job.pricing_tier || 'free',
        created_at: job.created_at || new Date().toISOString()
      }));

      setJobs(transformedJobs);
      console.log('🎯 [JOBS-DATA] Final transformed jobs:', transformedJobs.length);

    } catch (err) {
      console.error('💥 [JOBS-DATA] Error in fetchJobs:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    console.log('🔄 [JOBS-DATA] Manual refetch triggered');
    setLoading(true);
    setError(null);
    fetchJobs();
  };

  useEffect(() => {
    console.log('🚀 [JOBS-DATA] Hook initialized, fetching jobs...');
    fetchJobs();

    // Set up real-time subscription for job inserts
    const channel = supabase
      .channel('jobs-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'jobs'
        },
        (payload) => {
          console.log('⚡ [JOBS-DATA] Real-time INSERT detected:', payload);
          // Immediately refetch to get the new job
          fetchJobs();
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'jobs'
        },
        (payload) => {
          console.log('⚡ [JOBS-DATA] Real-time UPDATE detected:', payload);
          // Refetch on updates (like status changes)
          fetchJobs();
        }
      )
      .subscribe();

    console.log('🔗 [JOBS-DATA] Real-time subscription established');

    return () => {
      console.log('🔌 [JOBS-DATA] Cleaning up real-time subscription');
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    jobs,
    loading,
    error,
    refetch
  };
};
