
/**
 * Feature flag utilities for job posting flow
 */

/**
 * Check if the new context-based flow should be used
 */
export function useContextBasedFlow(): boolean {
  // Check for debug flag first
  const urlParams = new URLSearchParams(window.location.search);
  const forceContext = urlParams.get('useContextFlow');
  const forceLegacy = urlParams.get('useLegacyFlow');
  
  // Debug flags override storage preferences
  if (forceContext === 'true') return true;
  if (forceLegacy === 'true') return false;
  
  // Check local storage preference
  const storedPreference = localStorage.getItem('useJobPostingLegacyFlow');
  if (storedPreference === 'true') return false;
  
  // Default to context flow in production, configurable in dev
  return process.env.NODE_ENV === 'production' 
    ? true 
    : localStorage.getItem('debugUseContextFlow') !== 'false';
}

/**
 * Set the flow preference
 */
export function setJobPostingFlowPreference(useContext: boolean): void {
  if (useContext) {
    localStorage.removeItem('useJobPostingLegacyFlow');
  } else {
    localStorage.setItem('useJobPostingLegacyFlow', 'true');
  }
}

/**
 * Check if debug panel should be shown
 */
export function shouldShowDebugPanel(): boolean {
  // Always show in dev unless explicitly disabled
  if (process.env.NODE_ENV === 'development') {
    return localStorage.getItem('hideJobPostingDebugPanel') !== 'true';
  }
  
  // In production, only show with flag
  return localStorage.getItem('showJobPostingDebugPanel') === 'true' || 
         window.location.search.includes('debug=true');
}

/**
 * Reset all job posting state and preferences
 */
export function resetAllJobPostingState(): void {
  // Clear all job posting related storage
  localStorage.removeItem('emviapp_job_posting_state');
  localStorage.removeItem('useJobPostingLegacyFlow');
  localStorage.removeItem('selectedTemplateType');
  localStorage.removeItem('hideJobPostingDebugPanel');
  localStorage.removeItem('showJobPostingDebugPanel');
}
