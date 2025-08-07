import { useState, useEffect, useMemo, useCallback } from 'react';
import { Job } from '@/types/job';
import { supabaseBypass } from '@/types/supabase-bypass';

// Performance optimized configuration
const JOBS_PER_PAGE = 20;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const DEBOUNCE_DELAY = 300;

interface JobsCache {
  data: Job[];
  timestamp: number;
  cursor?: string;
  hasMore: boolean;
}

interface UseOptimizedJobsDataProps {
  category?: string;
  location?: string;
  searchTerm?: string;
  enableCache?: boolean;
}

// Global cache for jobs data
const jobsCache = new Map<string, JobsCache>();

// Debounce utility
const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const useOptimizedJobsData = ({
  category,
  location,
  searchTerm,
  enableCache = true
}: UseOptimizedJobsDataProps = {}) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [cursor, setCursor] = useState<string | undefined>();

  // Create cache key based on filters
  const cacheKey = useMemo(() => {
    return JSON.stringify({ category, location, searchTerm });
  }, [category, location, searchTerm]);

  // Check cache validity
  const isCacheValid = useCallback((cached: JobsCache): boolean => {
    if (!enableCache) return false;
    return Date.now() - cached.timestamp < CACHE_DURATION;
  }, [enableCache]);

  // Optimized job fetching with cursor-based pagination
  const fetchJobs = useCallback(async (
    isLoadMore = false,
    currentCursor?: string
  ): Promise<void> => {
    // Check cache first for initial load
    if (!isLoadMore && enableCache) {
      const cached = jobsCache.get(cacheKey);
      if (cached && isCacheValid(cached)) {
        setJobs(cached.data);
        setHasMore(cached.hasMore);
        setCursor(cached.cursor);
        setInitialLoading(false);
        return;
      }
    }

    try {
      setLoading(true);
      setError(null);

      // Build optimized query with minimal data transfer
      let query = supabaseBypass
        .from('jobs')
        .select(`
          id,
          title,
          location,
          compensation_details,
          category,
          pricing_tier,
          created_at,
          expires_at,
          user_id,
          status,
          image_url
        `, { count: isLoadMore ? undefined : 'exact' })
        .eq('status', 'active')
        .gte('expires_at', new Date().toISOString())
        .order('pricing_tier', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(JOBS_PER_PAGE);

      // Apply filters
      if (category && category !== 'all') {
        query = query.eq('category', category);
      }

      if (location) {
        query = query.ilike('location', `%${location}%`);
      }

      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
      }

      // Cursor-based pagination for better performance
      if (currentCursor) {
        query = query.lt('created_at', currentCursor);
      }

      const { data: jobsData, error: fetchError, count } = await query;

      if (fetchError) {
        throw fetchError;
      }

      const transformedJobs: Job[] = (jobsData || []).map((job: any) => ({
        id: job.id,
        title: job.title || 'Job Title',
        company: job.title || 'Company Name',
        location: job.location || '',
        created_at: job.created_at,
        compensation_details: job.compensation_details || '',
        user_id: job.user_id,
        status: job.status,
        expires_at: job.expires_at,
        pricing_tier: job.pricing_tier || 'free',
        category: job.category || 'Other',
        image_url: job.image_url,
        // Minimal data for performance - full details loaded on demand
        description: '', // Loaded separately when needed
        requirements: '',
        contact_info: {}
      }));

      const newCursor = transformedJobs.length > 0 
        ? transformedJobs[transformedJobs.length - 1].created_at 
        : undefined;

      const newHasMore = transformedJobs.length === JOBS_PER_PAGE;

      if (isLoadMore) {
        setJobs(prev => [...prev, ...transformedJobs]);
      } else {
        setJobs(transformedJobs);
        setInitialLoading(false);
      }

      setHasMore(newHasMore);
      setCursor(newCursor);

      // Update cache for initial loads
      if (!isLoadMore && enableCache) {
        jobsCache.set(cacheKey, {
          data: transformedJobs,
          timestamp: Date.now(),
          cursor: newCursor,
          hasMore: newHasMore
        });
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load jobs');
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  }, [cacheKey, enableCache, isCacheValid, category, location, searchTerm]);

  // Debounced search to prevent excessive API calls
  const debouncedFetch = useMemo(
    () => debounce(fetchJobs, DEBOUNCE_DELAY),
    [fetchJobs]
  );

  // Load more function for infinite scroll
  const loadMore = useCallback(async (): Promise<void> => {
    if (!loading && hasMore && cursor) {
      await fetchJobs(true, cursor);
    }
  }, [loading, hasMore, cursor, fetchJobs]);

  // Refresh function with cache invalidation
  const refresh = useCallback(() => {
    jobsCache.delete(cacheKey);
    setCursor(undefined);
    fetchJobs(false);
  }, [cacheKey, fetchJobs]);

  // Initial load effect
  useEffect(() => {
    debouncedFetch(false);
  }, [debouncedFetch]);

  // Clear cache on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (jobsCache.size > 10) {
        // Keep only 10 most recent caches
        const entries = Array.from(jobsCache.entries());
        entries.sort((a, b) => b[1].timestamp - a[1].timestamp);
        jobsCache.clear();
        entries.slice(0, 10).forEach(([key, value]) => {
          jobsCache.set(key, value);
        });
      }
    };
  }, []);

  return {
    jobs,
    loading,
    initialLoading,
    error,
    hasMore,
    loadMore,
    refresh,
    // Performance metrics for monitoring
    cacheSize: jobsCache.size,
    cacheKey
  };
};
