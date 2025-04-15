
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
  // Use type assertion to avoid deep instantiation
  const result = useQuery(options) as UseQueryResult<TData, TError>;
  
  return {
    data: result.data,
    isLoading: result.isLoading,
    error: result.error,
    refetch: result.refetch,
    isFetching: result.isFetching
  };
}
