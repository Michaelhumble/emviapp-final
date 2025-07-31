import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { analytics } from '@/lib/analytics';

interface RetryConfig {
  maxRetries?: number;
  initialDelay?: number;
  maxDelay?: number;
  backoffFactor?: number;
  retryCondition?: (error: any) => boolean;
}

interface RetryState {
  isLoading: boolean;
  isRetrying: boolean;
  retryCount: number;
  error: Error | null;
  lastRetryAt: number | null;
}

export function useRetryableFetch<T>(
  fetchFn: () => Promise<T>,
  config: RetryConfig = {}
) {
  const {
    maxRetries = 3,
    initialDelay = 1000,
    maxDelay = 10000,
    backoffFactor = 2,
    retryCondition = (error) => {
      // Retry on network errors, 5xx, 404s (mobile intermittent), timeouts
      return (
        error?.code === 'NETWORK_ERROR' ||
        error?.status >= 500 ||
        error?.status === 404 ||
        error?.status === 408 ||
        error?.status === 429 ||
        error?.message?.includes('timeout') ||
        error?.message?.includes('NetworkError') ||
        error?.message?.includes('Failed to fetch')
      );
    }
  } = config;

  const [state, setState] = useState<RetryState>({
    isLoading: false,
    isRetrying: false,
    retryCount: 0,
    error: null,
    lastRetryAt: null
  });

  const [data, setData] = useState<T | null>(null);

  const calculateDelay = useCallback((retryCount: number) => {
    const delay = Math.min(initialDelay * Math.pow(backoffFactor, retryCount), maxDelay);
    // Add jitter to prevent thundering herd
    return delay + Math.random() * 1000;
  }, [initialDelay, backoffFactor, maxDelay]);

  const execute = useCallback(async (isRetry = false): Promise<T | null> => {
    setState(prev => ({
      ...prev,
      isLoading: true,
      isRetrying: isRetry,
      error: null
    }));

    try {
      console.log(`🔄 [RETRY-FETCH] ${isRetry ? 'Retrying' : 'Executing'} fetch (attempt ${state.retryCount + 1})`);
      
      const result = await fetchFn();
      
      setData(result);
      setState(prev => ({
        ...prev,
        isLoading: false,
        isRetrying: false,
        error: null,
        retryCount: 0 // Reset on success
      }));

      // Track successful fetch
      if (isRetry) {
        analytics.trackEvent({
          action: 'retry_success',
          category: 'error_handling',
          label: 'fetch_retry_success',
          custom_parameters: {
            retry_count: state.retryCount,
            final_attempt: true
          }
        });
      }

      return result;
    } catch (error: any) {
      console.error('🚨 [RETRY-FETCH] Fetch failed:', error);

      const shouldRetry = retryCondition(error) && state.retryCount < maxRetries;

      setState(prev => ({
        ...prev,
        isLoading: false,
        isRetrying: false,
        error,
        retryCount: prev.retryCount + 1,
        lastRetryAt: Date.now()
      }));

      // Track error
      analytics.trackError('fetch_error', error.message, {
        retry_count: state.retryCount,
        will_retry: shouldRetry,
        error_code: error.code,
        error_status: error.status,
        route: window.location.pathname
      });

      if (shouldRetry) {
        const delay = calculateDelay(state.retryCount);
        
        console.log(`⏱️ [RETRY-FETCH] Retrying in ${delay}ms...`);
        
        toast.info(`Connection issue detected. Retrying in ${Math.round(delay / 1000)}s...`, {
          duration: delay
        });

        setTimeout(() => {
          execute(true);
        }, delay);
      } else {
        // Max retries exceeded or non-retryable error
        const errorMessage = state.retryCount >= maxRetries 
          ? `Failed after ${maxRetries} attempts. Please check your connection and try again.`
          : `Request failed: ${error.message}`;

        toast.error(errorMessage, {
          action: {
            label: 'Retry',
            onClick: () => execute(true)
          }
        });
      }

      return null;
    }
  }, [fetchFn, state.retryCount, maxRetries, retryCondition, calculateDelay]);

  const retry = useCallback(() => {
    execute(true);
  }, [execute]);

  const reset = useCallback(() => {
    setState({
      isLoading: false,
      isRetrying: false,
      retryCount: 0,
      error: null,
      lastRetryAt: null
    });
    setData(null);
  }, []);

  // Auto-retry on network reconnection
  useEffect(() => {
    const handleOnline = () => {
      if (state.error && retryCondition(state.error)) {
        console.log('🌐 [RETRY-FETCH] Network reconnected, auto-retrying...');
        retry();
      }
    };

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [state.error, retry, retryCondition]);

  return {
    data,
    execute,
    retry,
    reset,
    ...state,
    canRetry: state.retryCount < maxRetries && state.error && retryCondition(state.error),
    isOnline: navigator.onLine
  };
}