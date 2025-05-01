
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { toast } from 'sonner';

/**
 * Type-safe wrapper around useQuery with improved error handling
 * @description Provides consistent error handling and user feedback for queries
 */
export function useSafeQuery<TData, TError = Error>(
  options: UseQueryOptions<TData, TError> & { 
    context?: string;
    suppressErrorToast?: boolean; 
    customErrorMessage?: string;
    retryMessage?: string;
  }
): UseQueryResult<TData, TError> {
  const { 
    context = 'data', 
    suppressErrorToast = false,
    customErrorMessage,
    retryMessage = 'Please try again',
    ...queryOptions 
  } = options;

  return useQuery<TData, TError>({
    ...queryOptions,
    meta: {
      ...queryOptions.meta,
      onError: (error: TError) => {
        console.error(`Error fetching ${context}:`, error);
        
        if (!suppressErrorToast) {
          const errorMessage = customErrorMessage || 
            (error instanceof Error ? error.message : 'An unexpected error occurred');
            
          toast.error(`Failed to load ${context} - ${errorMessage} - ${retryMessage}`);
        }
        
        if (queryOptions.meta?.onError) {
          queryOptions.meta.onError(error);
        }
      }
    }
  });
}
