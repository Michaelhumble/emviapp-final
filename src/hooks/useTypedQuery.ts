
import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

/**
 * A wrapper around useQuery that explicitly types the result to avoid
 * "Type instantiation is excessively deep and possibly infinite" errors
 */
export function useTypedQuery<TData = unknown, TError = Error>(
  options: Omit<UseQueryOptions<TData, TError, TData>, "queryFn"> & {
    queryFn: () => Promise<TData>;
    enabled?: boolean;
  }
): { 
  data: TData | undefined; 
  isLoading: boolean;
  error: TError | null;
  refetch: () => Promise<UseQueryResult<TData, TError>>;
  isFetching: boolean;
} {
  // Completely separate the types to prevent deep instantiation
  const result = useQuery({
    ...options,
    queryKey: options.queryKey,
    queryFn: options.queryFn,
    enabled: options.enabled,
  });
  
  return {
    data: result.data as TData | undefined,
    isLoading: result.isLoading,
    error: result.error as TError | null,
    refetch: result.refetch,
    isFetching: result.isFetching
  };
}
