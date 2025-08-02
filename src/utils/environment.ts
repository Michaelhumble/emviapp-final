// Environment configuration utility
export const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT || 'development';

// Check if we're in different environments
export const isDevelopment = ENVIRONMENT === 'development';
export const isStaging = ENVIRONMENT === 'staging';
export const isProduction = ENVIRONMENT === 'production';

// API URLs based on environment
export const getApiUrl = () => {
  switch (ENVIRONMENT) {
    case 'production':
      return 'https://api.emviapp.com';
    case 'staging':
      return 'https://staging-api.emviapp.com';
    default:
      return 'http://localhost:3000';
  }
};

// Supabase configuration
export const getSupabaseConfig = () => {
  return {
    url: import.meta.env.VITE_SUPABASE_URL,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  };
};

// Feature flags based on environment
export const getFeatureFlags = () => {
  return {
    enableAnalytics: isProduction,
    enableDebugMode: isDevelopment,
    enableBetaFeatures: isStaging || isDevelopment,
    enableErrorReporting: isProduction || isStaging,
  };
};

// Logging configuration
export const getLogLevel = () => {
  switch (ENVIRONMENT) {
    case 'production':
      return 'error';
    case 'staging':
      return 'warn';
    default:
      return 'debug';
  }
};

// Environment banner for staging
export const shouldShowEnvironmentBanner = () => isStaging;

export const getEnvironmentBanner = () => {
  if (isStaging) {
    return {
      message: '🚧 This is the staging environment - Changes here do not affect production',
      type: 'warning' as const,
      color: 'bg-yellow-500 text-white'
    };
  }
  return null;
};