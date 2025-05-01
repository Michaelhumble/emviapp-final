
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface AuthErrorHandlerOptions {
  redirectOnPersistentError?: boolean;
  redirectPath?: string;
  showToasts?: boolean;
  autoRetry?: boolean;
  maxRetries?: number;
}

export const useAuthErrorHandler = (options: AuthErrorHandlerOptions = {}) => {
  const {
    redirectOnPersistentError = true,
    redirectPath = '/sign-in',
    showToasts = true,
    autoRetry = true,
    maxRetries = 2
  } = options;
  
  const navigate = useNavigate();
  const [retryCount, setRetryCount] = useState(0);
  const [isRecovering, setIsRecovering] = useState(false);
  
  /**
   * Handles authentication errors with appropriate UI feedback and recovery strategies
   */
  const handleAuthError = useCallback((error: Error | unknown, context: string = 'Authentication') => {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    
    console.error(`${context} error:`, error);
    
    // Map common error patterns to more user-friendly messages
    let userMessage = errorMessage;
    
    if (typeof errorMessage === 'string') {
      if (errorMessage.includes('JWT')) {
        userMessage = 'Your session has expired. Please sign in again.';
      } else if (errorMessage.includes('network')) {
        userMessage = 'Network error. Please check your connection and try again.';
      } else if (errorMessage.includes('permission denied')) {
        userMessage = 'You don\'t have permission to access this resource.';
      }
    }
    
    if (showToasts) {
      toast.error(`${context} Error - ${userMessage}`);
    }
    
    // Auto retry for JWT expired errors if enabled
    if (autoRetry && retryCount < maxRetries && 
        (errorMessage.includes('JWT') || errorMessage.includes('session expired'))) {
      setRetryCount(prevCount => prevCount + 1);
      setIsRecovering(true);
      
      setTimeout(async () => {
        try {
          await supabase.auth.refreshSession();
          const { data } = await supabase.auth.getSession();
          
          if (data.session) {
            toast.success("Session refreshed successfully");
          } else {
            throw new Error("Couldn't restore session");
          }
        } catch (refreshError) {
          console.error("Error refreshing session:", refreshError);
          
          if (redirectOnPersistentError) {
            // Redirect to sign in after failed retries
            const currentPath = encodeURIComponent(window.location.pathname + window.location.search);
            navigate(`${redirectPath}?redirect=${currentPath}&error=session_expired`);
          }
        } finally {
          setIsRecovering(false);
        }
      }, 500);
    }
    
    // Redirect on persistent errors after retries
    if (redirectOnPersistentError && retryCount >= maxRetries) {
      const currentPath = encodeURIComponent(window.location.pathname + window.location.search);
      navigate(`${redirectPath}?redirect=${currentPath}&error=persistent_auth_error`);
    }
  }, [retryCount, redirectOnPersistentError, redirectPath, navigate, showToasts, autoRetry, maxRetries]);
  
  /**
   * Reset retry counter and recovery state
   */
  const resetRecoveryState = useCallback(() => {
    setRetryCount(0);
    setIsRecovering(false);
  }, []);
  
  /**
   * Manually attempt session recovery
   */
  const attemptSessionRecovery = useCallback(async () => {
    setIsRecovering(true);
    try {
      await supabase.auth.refreshSession();
      const { data, error } = await supabase.auth.getSession();
      
      if (error) throw error;
      
      if (data.session) {
        toast.success("Session recovered successfully");
        return true;
      } else {
        throw new Error("No session available");
      }
    } catch (error) {
      console.error("Manual session recovery failed:", error);
      handleAuthError(error, 'Session Recovery');
      return false;
    } finally {
      setIsRecovering(false);
    }
  }, [handleAuthError]);
  
  return {
    handleAuthError,
    isRecovering,
    retryCount,
    resetRecoveryState,
    attemptSessionRecovery
  };
};
