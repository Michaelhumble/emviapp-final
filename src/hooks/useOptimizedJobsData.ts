import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Job } from '@/types/job';

export const useOptimizedJobsData = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Optimized data fetching with selective fields for faster initial load
  const fetchJobsOptimized = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // First load: Get only essential fields for fast initial render
      const { data: quickJobs, error: quickError } = await supabase
        .from('jobs')
        .select(`
          id,
          title,
          location,
          pricing_tier,
          status,
          created_at,
          expires_at,
          category,
          description,
          compensation_type,
          compensation_details,
          vietnamese_title,
          working_hours,
          benefits,
          requirements,
          image_url,
          user_id,
          contact_info
        `)
        .eq('status', 'active')
        .gte('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false })
        .limit(20); // Limit initial load for speed

      if (quickError) {
        console.error('Error fetching jobs (quick):', quickError);
        setError(quickError.message);
        return;
      }

      // Set initial jobs with basic data - type cast for compatibility
      setJobs((quickJobs as any) || []);
      setLoading(false);

      // Background load: Get full job details
      setTimeout(async () => {
        const { data: fullJobs, error: fullError } = await supabase
          .from('jobs')
          .select('*')
          .eq('status', 'active')
          .gte('expires_at', new Date().toISOString())
          .order('created_at', { ascending: false });

        if (!fullError && fullJobs) {
          setJobs(fullJobs as any);
        }
      }, 100); // Load full data after initial render

    } catch (err) {
      console.error('Error in useOptimizedJobsData:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setLoading(false);
    }
  }, []);

  const refreshJobs = useCallback(() => {
    fetchJobsOptimized();
  }, [fetchJobsOptimized]);

  useEffect(() => {
    fetchJobsOptimized();
  }, [fetchJobsOptimized]);

  return {
    jobs,
    loading,
    error,
    refreshJobs
  };
};