import { resetAllJobPostingState } from '@/utils/featureFlags/jobPostingFlags';

/**
 * Utility to handle rollback/recovery for job posting flow
 */

/**
 * Types of recovery actions
 */
export enum RecoveryAction {
  SWITCH_TO_LEGACY = 'switchToLegacy',
  CLEAR_STATE = 'clearState',
  RESTART_FLOW = 'restartFlow',
  FALLBACK_UI = 'fallbackUI'
}

/**
 * Initiate a recovery action for the job posting flow
 */
export function recoverJobPostingFlow(action: RecoveryAction): void {
  switch (action) {
    case RecoveryAction.SWITCH_TO_LEGACY:
      // Switch to legacy flow
      localStorage.setItem('useJobPostingLegacyFlow', 'true');
      // Reload page
      window.location.reload();
      break;
      
    case RecoveryAction.CLEAR_STATE:
      // Clear all state but keep flow preference
      localStorage.removeItem('emviapp_job_posting_state');
      localStorage.removeItem('selectedTemplateType');
      // Reload page
      window.location.reload();
      break;
      
    case RecoveryAction.RESTART_FLOW:
      // Clear all state and navigate to start
      resetAllJobPostingState();
      // Navigate to job posting start page
      window.location.href = '/post-job';
      break;
      
    case RecoveryAction.FALLBACK_UI:
      // Just show fallback UI, don't navigate
      // This is handled by the error boundary
      break;
      
    default:
      console.error('Unknown recovery action:', action);
  }
}

/**
 * Check if the job posting flow is in a recoverable error state
 */
export function isJobPostingInErrorState(): boolean {
  // Check for known error indicators
  const hasErrorFlag = localStorage.getItem('jobPostingError') === 'true';
  const hasIncompleteState = localStorage.getItem('emviapp_job_posting_state') !== null && 
                           !localStorage.getItem('jobPostingComplete');
  const hasExceededMaxRetries = parseInt(localStorage.getItem('jobPostingRetryCount') || '0') > 3;
  
  return hasErrorFlag || hasIncompleteState || hasExceededMaxRetries;
}

/**
 * Log an error in the job posting flow
 */
export function logJobPostingError(error: unknown): void {
  // Increment retry count
  const currentRetries = parseInt(localStorage.getItem('jobPostingRetryCount') || '0');
  localStorage.setItem('jobPostingRetryCount', (currentRetries + 1).toString());
  
  // Set error flag
  localStorage.setItem('jobPostingError', 'true');
  
  // Log error to console
  console.error('Job posting error:', error);
  
  // If exceeded max retries, try recovery
  if (currentRetries >= 3) {
    recoverJobPostingFlow(RecoveryAction.SWITCH_TO_LEGACY);
  }
}

/**
 * Reset error indicators
 */
export function resetJobPostingErrorState(): void {
  localStorage.removeItem('jobPostingError');
  localStorage.removeItem('jobPostingRetryCount');
}
