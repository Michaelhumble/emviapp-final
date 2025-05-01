
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

// Extend the normal useQuery options with custom error handling options
type SafeQueryOptions<TData, TError> = UseQueryOptions<TData, TError> & {
  suppressErrorToast?: boolean;
  customErrorMessage?: string;
  retryMessage?: string;
  context?: string; // For providing context in error messages
};

/**
 * A wrapper around useQuery that provides standardized error handling
 */
export function useSafeQuery<TData, TError = Error>(queryOptions: SafeQueryOptions<TData, TError>) {
  const {
    suppressErrorToast = false,
    customErrorMessage,
    retryMessage,
    context,
    ...restOptions
  } = queryOptions;
  
  // Separate the onError callback from the options
  const userOnError = restOptions.onError;
  
  // Create a new onError handler that includes toast notifications
  const handleError = (error: TError) => {
    if (!suppressErrorToast) {
      // Use string template literal instead of JSX
      toast.error(`${customErrorMessage || 'Error loading data'}${context ? ` for ${context}` : ''}. ${(error as Error).message || ''}`, {
        duration: 5000,
        action: {
          label: retryMessage || 'Retry',
          onClick: () => {
            // Safely access the refetch function
            if (typeof restOptions.queryFn === 'function') {
              queryOptions.refetch?.();
            }
          }
        }
      });
    }
    
    // Call original onError handler if provided
    if (userOnError) {
      userOnError(error);
    }
  };

  // Pass all options except our custom ones, plus our enhanced onError handler
  return useQuery<TData, TError>({
    ...restOptions,
    onError: handleError
  });
}
