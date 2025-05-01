
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
export function useSafeQuery<TData, TError = Error>(queryOptions: SafeQueryOptions<TData, TError>) {
  const {
    suppressErrorToast = false,
    customErrorMessage,
    retryMessage,
    context,
    initialData,
    ...restOptions
  } = queryOptions;
  
  // Create a new onError handler that includes toast notifications
  const handleError = (error: TError) => {
    if (!suppressErrorToast) {
      // Use string template literal instead of JSX
      toast.error(`${customErrorMessage || 'Error loading data'}${context ? ` for ${context}` : ''}. ${(error as Error).message || ''}`, {
        duration: 5000,
        action: {
          label: retryMessage || 'Retry',
          onClick: () => {
            // Safely access the refetch function from the result later
            refetch();
          }
        }
      });
    }
  };

  // Pass all options except our custom ones, plus our enhanced onError handler
  const result = useQuery<TData, TError>({
    ...restOptions,
    initialData,
    onError: handleError,
  });
  
  const { refetch } = result;

  // Return the query result
  return result;
}
