import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Job } from '@/types/job';
import { useAuth } from '@/context/auth';
import { analytics } from '@/lib/analytics';

// Simple in-memory cache
const jobsCache: Record<string, { data: Job[]; ts: number }> = {};

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
  const [hasMore] = useState(true);

  const { isSignedIn: authSignedIn } = useAuth();
  const inputLimit = params?.limit ?? 50;
  const fomoEnabled = getFomoEnabled();
  const effectiveSignedIn = fomoEnabled === false ? true : (params?.isSignedIn ?? authSignedIn);
  const cacheKey = `${effectiveSignedIn ? 'jobs:authed' : 'jobs:public'}:${inputLimit}`;
  const staleMs = effectiveSignedIn ? 30 * 1000 : 5 * 1000; // Authed=30s, Public=5s

  const fetchJobs = useCallback(async () => {
    try {
      setError('');

      // Serve from cache if fresh
      const cacheEntry = jobsCache[cacheKey];
      if (cacheEntry && Date.now() - cacheEntry.ts < staleMs) {
        setJobs(cacheEntry.data);
        setLoading(false);
        return;
      }

      setLoading(true);

      const nowISO = new Date().toISOString();
      const thirtyDaysAgoISO = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

      let query = (supabase as any)
        .from('jobs')
        .select('id,title,location,description,compensation_details,category,status,pricing_tier,created_at,updated_at,user_id,expires_at,contact_info')
        .eq('status' as any, 'active');

      if (effectiveSignedIn) {
        // ACTIVE: expires_at > now OR (expires_at IS NULL AND created_at > now()-30d)
        query = query
          .or(`expires_at.gt.${nowISO},and(expires_at.is.null,created_at.gt.${thirtyDaysAgoISO})`)
          .order('pricing_tier' as any, { ascending: false })
          .order('created_at' as any, { ascending: false })
          .limit(inputLimit);
      } else {
        // EXPIRED (Public FOMO): expires_at <= now OR (expires_at IS NULL AND created_at <= now()-30d)
        query = query
          .or(`expires_at.lte.${nowISO},and(expires_at.is.null,created_at.lte.${thirtyDaysAgoISO})`)
          .order('expires_at' as any, { ascending: false })
          .order('created_at' as any, { ascending: false })
          .limit(inputLimit);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        throw fetchError;
      }

      const transformedJobs: Job[] = (data || []).map((job: any): Job => ({
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
      jobsCache[cacheKey] = { data: transformedJobs, ts: Date.now() };
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
    analytics.trackEvent?.({ action: 'jobs_funnel_step', category: 'data', label: 'fetch_start' });
    fetchJobs();
  }, [fetchJobs]);

  return {
    jobs,
    loading,
    initialLoading: loading,
    error,
    hasMore,
    loadMore: async () => {},
    refresh,
    cacheSize: jobs.length,
    cacheKey
  };
}
