import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Job } from '@/types/job';
import { useDebounce } from '@/hooks/useDebounce';

export function useOptimizedJobsData() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [hasMore, setHasMore] = useState(true);

  const fetchJobs = useCallback(async () => {
    try {
      setError('');
      setLoading(true);

      // Optimized query with proper indexing
      const { data, error: fetchError } = await supabase
        .from('jobs')
        .select('*')
        .eq('status', 'active')
        .order('pricing_tier', { ascending: false }) // Diamond/Gold first
        .order('created_at', { ascending: false })
        .limit(50); // Limit initial load

      if (fetchError) {
        console.error('Error fetching jobs:', fetchError);
        setError(fetchError.message);
        return;
      }

      const transformedJobs = (data || []).map((job): Job => ({
        id: job.id,
        title: job.title,
        description: job.description,
        company: job.title, // Use title as company fallback
        location: job.location,
        compensation_details: job.compensation_details,
        salary_range: job.compensation_details, // Map to available field
        specialties: [], // Default empty array
        category: job.category,
        status: job.status,
        pricing_tier: job.pricing_tier || 'free',
        created_at: job.created_at,
        updated_at: job.updated_at,
        user_id: job.user_id,
        expires_at: job.expires_at,
        contact_info: typeof job.contact_info === 'object' ? job.contact_info as any : {},
      }));

      setJobs(transformedJobs);
      console.log(`✅ [OPTIMIZED-JOBS] Loaded ${transformedJobs.length} jobs`);
      
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  }, []);

  const refresh = useCallback(() => {
    fetchJobs();
  }, [fetchJobs]);

  // Initial load
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // Real-time subscriptions for new jobs
  useEffect(() => {
    const channel = supabase
      .channel('jobs_channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'jobs',
          filter: 'status=eq.active'
        },
        (payload) => {
          console.log('🔔 [OPTIMIZED-JOBS] New job inserted:', payload.new);
          const newJob = payload.new as Job;
          setJobs(prev => [newJob, ...prev]);
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
          console.log('🔄 [OPTIMIZED-JOBS] Job updated:', payload.new);
          const updatedJob = payload.new as Job;
          setJobs(prev => prev.map(job => 
            job.id === updatedJob.id ? updatedJob : job
          ));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    jobs,
    loading,
    initialLoading: loading,
    error,
    hasMore,
    loadMore: async () => {}, // Placeholder for pagination
    refresh,
    cacheSize: jobs.length,
    cacheKey: 'optimized-jobs'
  };
}
