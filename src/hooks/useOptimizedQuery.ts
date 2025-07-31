import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useCallback, useRef } from 'react';

interface OptimizedQueryOptions<T> extends Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'> {
  queryKey: string[];
  queryFn: () => Promise<T>;
  dedupe?: boolean;
  throttle?: number;
}

// Cache for deduplication
const queryCache = new Map<string, Promise<any>>();
const lastQueryTime = new Map<string, number>();

export function useOptimizedQuery<T>({
  queryKey,
  queryFn,
  dedupe = true,
  throttle = 100,
  staleTime = 60000, // 1 minute default
  ...options
}: OptimizedQueryOptions<T>) {
  const abortControllerRef = useRef<AbortController | null>(null);

  const optimizedQueryFn = useCallback(async (): Promise<T> => {
    const cacheKey = queryKey.join('|');
    const now = Date.now();
    
    // Throttle rapid successive calls
    if (throttle > 0) {
      const lastTime = lastQueryTime.get(cacheKey) || 0;
      if (now - lastTime < throttle) {
        await new Promise(resolve => setTimeout(resolve, throttle - (now - lastTime)));
      }
      lastQueryTime.set(cacheKey, now);
    }

    // Deduplicate identical ongoing requests
    if (dedupe && queryCache.has(cacheKey)) {
      const cachedPromise = queryCache.get(cacheKey);
      if (cachedPromise) {
        return cachedPromise;
      }
    }

    // Abort previous request if still pending
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    abortControllerRef.current = new AbortController();

    const queryPromise = queryFn();
    
    if (dedupe) {
      queryCache.set(cacheKey, queryPromise);
      
      // Clean up cache after completion
      queryPromise.finally(() => {
        queryCache.delete(cacheKey);
      });
    }

    return queryPromise;
  }, [queryKey, queryFn, dedupe, throttle]);

  return useQuery({
    queryKey,
    queryFn: optimizedQueryFn,
    staleTime,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: (failureCount, error: any) => {
      // Don't retry on 404 or auth errors
      if (error?.status === 404 || error?.status === 401 || error?.status === 403) {
        return false;
      }
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    ...options,
  });
}