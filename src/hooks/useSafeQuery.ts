
import { UseQueryOptions, useQuery, UseQueryResult } from '@tanstack/react-query';
import { toast } from 'sonner';

// Extend the normal useQuery options with custom error handling options
type SafeQueryOptions<TData, TError> = Omit<UseQueryOptions<TData, TError, TData>, 'onError'> & {
  suppressErrorToast?: boolean;
  customErrorMessage?: string;
  retryMessage?: string;
  context?: string; // For providing context in error messages
  initialData?: TData;
};

/**
 * A wrapper around useQuery that provides standardized error handling
 */
export function useSafeQuery<TData, TError = Error>(queryOptions: SafeQueryOptions<TData, TError>): UseQueryResult<TData, TError> {
  const {
    suppressErrorToast = false,
    customErrorMessage,
    retryMessage,
    context,
    initialData,
    ...restOptions
  } = queryOptions;
  
  // Create a new options object with our error handler
  const options: UseQueryOptions<TData, TError, TData> = {
    ...restOptions,
    initialData,
  };
  
  // Use the query with our enhanced options
  const result = useQuery<TData, TError>(options);
  
  // Handle errors with toast notifications if needed
  if (result.isError && !suppressErrorToast) {
    const errorMessage = `${customErrorMessage || 'Error loading data'}${context ? ` for ${context}` : ''}. ${(result.error as Error).message || ''}`;
    
    toast.error(errorMessage, {
      duration: 5000,
      action: {
        label: retryMessage || 'Retry',
        onClick: () => {
          // Safely access the refetch function from the result
          result.refetch();
        }
      }
    });
  }
  
  // Return the query result
  return result;
}
