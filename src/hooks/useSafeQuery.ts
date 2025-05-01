
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
export function useSafeQuery<TData, TError = Error>({
  suppressErrorToast = false,
  customErrorMessage,
  retryMessage,
  context,
  onError,
  ...queryOptions
}: SafeQueryOptions<TData, TError>) {
  // Allow custom onError handling while still showing toast
  const handleError = (error: TError) => {
    if (!suppressErrorToast) {
      // Use string template literal instead of JSX
      toast.error(`${customErrorMessage || 'Error loading data'}${context ? ` for ${context}` : ''}. ${(error as Error).message || ''}`, {
        duration: 5000,
        action: {
          label: retryMessage || 'Retry',
          onClick: () => queryOptions.refetch?.()
        }
      });
    }
    
    // Call passed onError handler if it exists
    if (onError) {
      onError(error);
    }
  };

  return useQuery<TData, TError>({
    ...queryOptions,
    onError: handleError
  });
}
