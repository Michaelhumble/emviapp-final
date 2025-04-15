
import { useState, useEffect, useCallback } from 'react';

/**
 * A higher-order hook that wraps any hook to provide error handling and fallback values
 * @param useHook The hook to wrap
 * @param fallbackValue Fallback value to use if the hook throws an error
 * @param errorCallback Optional callback to handle errors
 */
export function useSafeHook<T, Args extends any[]>(
  useHook: (...args: Args) => T,
  fallbackValue: T,
  errorCallback?: (error: Error) => void
) {
  return (...args: Args): T => {
    const [safeValue, setSafeValue] = useState<T>(fallbackValue);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
      try {
        // Attempt to use the hook
        const result = useHook(...args);
        setSafeValue(result);
      } catch (err: any) {
        console.error(`[useSafeHook] Error in hook:`, err);
        
        // Set the error and use fallback value
        setError(err instanceof Error ? err : new Error(String(err)));
        setSafeValue(fallbackValue);
        
        // Call error callback if provided
        if (errorCallback) {
          errorCallback(err instanceof Error ? err : new Error(String(err)));
        }
      }
    }, [args]);

    return safeValue;
  };
}

/**
 * A hook to safely execute an async function with error handling and fallback
 */
export function useSafeAsync<T>(
  asyncFn: () => Promise<T>,
  deps: any[] = [],
  options?: {
    fallbackData?: T;
    onError?: (error: Error) => void;
    onSuccess?: (data: T) => void;
    initialData?: T;
  }
) {
  const [data, setData] = useState<T | undefined>(options?.initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await asyncFn();
      setData(result);
      
      if (options?.onSuccess) {
        options.onSuccess(result);
      }
      
      return result;
    } catch (err: any) {
      console.error('[useSafeAsync] Error executing async function:', err);
      
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      
      if (options?.onError) {
        options.onError(error);
      }
      
      if (options?.fallbackData !== undefined) {
        setData(options.fallbackData);
      }
      
      return options?.fallbackData;
    } finally {
      setIsLoading(false);
    }
  }, [asyncFn, ...deps]);

  useEffect(() => {
    execute();
  }, [execute]);

  return {
    data,
    isLoading,
    error,
    execute,
    isError: error !== null
  };
}
