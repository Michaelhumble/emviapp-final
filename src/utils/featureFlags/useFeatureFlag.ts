
/**
 * Feature flag hook to check if a feature is enabled
 */

export const useFeatureFlag = (flagName: string): boolean => {
  // Check for debug flag first
  const urlParams = typeof window !== 'undefined' 
    ? new URLSearchParams(window.location.search) 
    : null;
  
  // URL parameters override storage settings
  if (urlParams) {
    const enableFlag = urlParams.get(`enable_${flagName}`);
    const disableFlag = urlParams.get(`disable_${flagName}`);
    
    if (enableFlag === 'true') return true;
    if (disableFlag === 'true') return false;
  }
  
  // Check localStorage for feature flag
  if (typeof window !== 'undefined') {
    const storedValue = localStorage.getItem(flagName);
    if (storedValue !== null) {
      return storedValue === 'true';
    }
  }
  
  // Default values for specific flags
  if (flagName === 'useJobPostingLegacyFlow') {
    // Default to false - use new flow by default
    return false; 
  }
  
  if (flagName === 'showJobPostingDebugPanel') {
    // Show debug panel in development by default
    return process.env.NODE_ENV === 'development';
  }
  
  // Default to false for unknown flags
  return false;
};

/**
 * Set a feature flag value
 */
export const setFeatureFlag = (flagName: string, enabled: boolean): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(flagName, enabled.toString());
  }
};

/**
 * Reset a feature flag to its default value
 */
export const resetFeatureFlag = (flagName: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(flagName);
  }
};
