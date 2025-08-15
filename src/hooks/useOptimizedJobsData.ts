import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Job } from '@/types/job';

import { useAuth } from '@/context/auth';

// Optional feature flag: if explicitly false, disable FOMO and show active to everyone
const getFomoEnabled = (): boolean | undefined => {
  try {
    const flag = (window as any)?.__env?.FOMO_LISTING_MODE;
    if (flag === false || flag === 'false') return false;
    if (flag === true || flag === 'true') return true;
  } catch {}
  return undefined;
};

export function useOptimizedJobsData(params?: { isSignedIn: boolean; limit?: number }) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [hasMore, setHasMore] = useState(true);

  const { isSignedIn: authSignedIn } = useAuth();
  const inputLimit = params?.limit ?? 50;
  const fomoEnabled = getFomoEnabled();
  const effectiveSignedIn = fomoEnabled === false ? true : (params?.isSignedIn ?? authSignedIn);

  // Guards to avoid double-fetch/subscriptions in React Strict Mode
  const initRef = useRef(false);
  const channelRef = useRef<any>(null);

  const isStale = (job: Job) => {
    const now = Date.now();
    const cutoff = now - 30 * 24 * 60 * 60 * 1000; // 30 days
    const createdAt = job.created_at ? new Date(job.created_at).getTime() : 0;
    const expiresAt = job.expires_at ? new Date(job.expires_at as any).getTime() : null;
    if (expiresAt) return expiresAt <= now;
    return createdAt <= cutoff;
  };

  const fetchJobs = useCallback(async () => {
    try {
      setError('');
      setLoading(true);

      const nowISO = new Date().toISOString();
      const thirtyDaysAgoISO = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

      let query = (supabase as any)
        .from('jobs')
        .select('*')
        .eq('status' as any, 'active');

      // Unified query: Show active jobs to all users (contact info gated by auth state in UI)
      query = query
        .or(`expires_at.gt.${nowISO},and(expires_at.is.null,created_at.gt.${thirtyDaysAgoISO})`)
        .order('pricing_tier' as any, { ascending: false })
        .order('created_at' as any, { ascending: false })
        .limit(inputLimit);

      const { data, error: fetchError } = await query;

      if (fetchError) {
        console.error('Error fetching jobs:', fetchError);
        setError(fetchError.message);
        return;
      }

      const transformedJobs = (data || []).map((job: any): Job => ({
        id: job.id,
        title: job.title,
        description: job.description,
        company: job.title,
        location: job.location,
        compensation_details: job.compensation_details,
        salary_range: job.compensation_details,
        specialties: [],
        category: job.category,
        status: job.status,
        pricing_tier: job.pricing_tier || 'free',
        created_at: job.created_at,
        updated_at: job.updated_at,
        user_id: job.user_id,
        expires_at: job.expires_at,
        contact_info: typeof job.contact_info === 'object' ? (job.contact_info as any) : {},
      }));

      setJobs(transformedJobs);
      console.log(`✅ [OPTIMIZED-JOBS] Loaded ${transformedJobs.length} jobs (${effectiveSignedIn ? 'active' : 'FOMO'})`);
      
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  }, [effectiveSignedIn, inputLimit]);

  const refresh = useCallback(() => {
    fetchJobs();
  }, [fetchJobs]);

  // Initial load
  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;
    fetchJobs();
  }, [fetchJobs]);

  // Real-time subscriptions for new jobs
  useEffect(() => {
    // Ensure we don't create duplicate channels in Strict Mode
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
      channelRef.current = null;
    }

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
          if (!effectiveSignedIn) return; // Only inject into active view
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
          if (!effectiveSignedIn) return; // Ignore updates in public FOMO view
          const updatedJob = payload.new as Job;
          setJobs(prev => prev.map(job => 
            job.id === updatedJob.id ? updatedJob : job
          ));
        }
      )
      .subscribe();

    channelRef.current = channel;

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [effectiveSignedIn]);

  return {
    jobs,
    loading,
    initialLoading: loading,
    error,
    hasMore,
    loadMore: async () => {}, // Placeholder for pagination
    refresh,
    cacheSize: jobs.length,
    cacheKey: `${effectiveSignedIn ? 'jobs:authed' : 'jobs:public'}:${inputLimit}`
  };
}
