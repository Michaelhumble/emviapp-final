
/**
 * Utility functions to ensure consistent path handling for assets
 */

/**
 * Gets the correct path for an asset considering the base URL in different environments
 * @param assetPath The relative path of the asset
 * @returns The properly formatted asset path
 */
export const getAssetPath = (assetPath: string): string => {
  // Remove leading slash if present for consistency
  const normalizedPath = assetPath.startsWith('/') ? assetPath.substring(1) : assetPath;
  
  // Always use direct paths without prefixes for simplicity
  return normalizedPath;
};

/**
 * Gets the correct base URL path prefix for the current environment
 * @returns The base path prefix
 */
export const getBasePath = (): string => {
  return '';
};

/**
 * Validates that a path exists and logs a warning if it doesn't
 * Useful for debugging asset loading issues
 */
export const validateAssetPath = (path: string): void => {
  if (import.meta.env.DEV) {
    fetch(path)
      .then(response => {
        if (!response.ok) {
          console.warn(`Asset at path ${path} returned status ${response.status}`);
        }
      })
      .catch(error => {
        console.warn(`Failed to load asset at ${path}:`, error);
      });
  }
};

/**
 * Add additional asset loading validation to track all loaded assets
 */
export const initializeAssetLoadingTracker = (): void => {
  // Run in both development and production to debug preview issues
  console.info('🔍 Asset path tracker initialized');
  
  // Track script loading
  document.addEventListener('DOMContentLoaded', () => {
    const scripts = document.querySelectorAll('script');
    scripts.forEach(script => {
      if (script.src) {
        console.info(`📁 Script: ${script.src}`);
      }
    });
    
    // Track stylesheet loading
    const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
    stylesheets.forEach(stylesheet => {
      console.info(`📁 Stylesheet: ${stylesheet.getAttribute('href')}`);
    });

    // Check if main resources were loaded
    console.info('📑 Checking main resources loaded status...');
  });
};

/**
 * Check if path is an absolute URL
 */
export const isAbsoluteUrl = (url: string): boolean => {
  return /^(?:[a-z+]+:)?\/\//i.test(url);
};
