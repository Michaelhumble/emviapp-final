
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { toast } from 'sonner';

// Type-safe wrapper around useQuery with improved error handling
export function useSafeQuery<TData, TError = Error>(
  options: UseQueryOptions<TData, TError> & { 
    context?: string;
    suppressErrorToast?: boolean; 
  }
): UseQueryResult<TData, TError> {
  const { context = 'data', suppressErrorToast = false, ...queryOptions } = options;

  return useQuery<TData, TError>({
    ...queryOptions,
    meta: {
      ...queryOptions.meta,
      onError: (error: TError) => {
        console.error(`Error fetching ${context}:`, error);
        if (!suppressErrorToast) {
          toast.error(`Failed to load ${context}. Please try again.`);
        }
        if (queryOptions.meta?.onError) {
          queryOptions.meta.onError(error);
        }
      }
    }
  });
}
