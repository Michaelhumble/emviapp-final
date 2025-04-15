
import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

type ErrorLoggerFunction = (error: any, context: string) => void;

// Default error logger that logs to console
const defaultErrorLogger: ErrorLoggerFunction = (error, context) => {
  console.error(`[SafeQuery:${context}] Error:`, error);
};

/**
 * A safe wrapper around useQuery that handles common failure modes
 * and provides fallback data to prevent UI crashes
 */
export function useSafeQuery<TData = unknown, TError = Error>(
  options: Omit<UseQueryOptions<TData, TError, TData>, "queryFn"> & {
    queryFn: () => Promise<TData>;
    enabled?: boolean;
    fallbackData?: TData;
    context?: string; // For error logging context
    errorLogger?: ErrorLoggerFunction;
    retryCount?: number;
  }
): { 
  data: TData | undefined; 
  isLoading: boolean;
  error: TError | null;
  refetch: () => Promise<any>;
  isFetching: boolean;
  isError: boolean;
} {
  const {
    fallbackData,
    context = "unknown",
    errorLogger = defaultErrorLogger,
    retryCount = 3,
    ...queryOptions
  } = options;

  // IMPORTANT: Break the type inference chain by NOT using generic type parameters here
  // Instead, we'll cast types after the query is executed
  const result = useQuery({
    ...queryOptions,
    queryKey: queryOptions.queryKey,
    queryFn: async () => {
      try {
        // Execute the query function WITHOUT type information propagation
        const data = await queryOptions.queryFn();
        
        // Handle null/undefined result
        if (data === null || data === undefined) {
          throw new Error("Query returned null or undefined");
        }
        
        // Return data as unknown to break type inference chain
        return data as any;
      } catch (error: any) {
        // Log the error with context
        errorLogger(error, context);
        
        // If supabase error contains 'not found' or 'does not exist'
        if (
          error?.message?.includes('not found') || 
          error?.message?.includes('does not exist') ||
          error?.message?.includes('failed') ||
          error?.code === 'PGRST116'  // PostgREST not found code
        ) {
          // Return fallback data if provided
          if (fallbackData !== undefined) {
            console.warn(`[SafeQuery:${context}] Using fallback data due to resource not found`);
            return fallbackData as any;
          }
        }
        
        // Re-throw to let React Query handle retry logic
        throw error;
      }
    },
    retry: retryCount,
    enabled: queryOptions.enabled
  });
  
  // Handle error states with fallback data when needed
  useEffect(() => {
    if (result.error && fallbackData !== undefined) {
      console.warn(`[SafeQuery:${context}] Using fallback data due to error:`, result.error);
    }
  }, [result.error, fallbackData, context]);

  return {
    data: result.error && fallbackData !== undefined ? fallbackData : result.data,
    isLoading: result.isLoading,
    error: result.error as TError | null,
    refetch: result.refetch,
    isFetching: result.isFetching,
    isError: result.isError
  };
}
