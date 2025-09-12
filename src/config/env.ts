/**
 * Centralized environment configuration
 * Single source of truth for all environment variables
 */

export const ENV = {
  // Supabase Configuration
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL || 'https://wwhqbjrhbajpabfdwnip.supabase.co',
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3aHFianJoYmFqcGFiZmR3bmlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5OTk2OTMsImV4cCI6MjA1NzU3NTY5M30.1YGaLgfnwqmzn3f28IzmTxDKKX5NoJ1V8IbI3V4-WmM',
  SUPABASE_PROJECT_ID: import.meta.env.VITE_SUPABASE_PROJECT_ID || 'wwhqbjrhbajpabfdwnip',
  
  // Google OAuth Configuration
  GOOGLE_ENABLED: String(import.meta.env.VITE_GOOGLE_ENABLED) === 'true',
  GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
  
  // Auth Settings
  SKIP_EMAIL_VERIFICATION: String(import.meta.env.VITE_SKIP_EMAIL_VERIFICATION || 'true') === 'true',
} as const;

/**
 * Mask sensitive values for logging (shows only last 4 characters)
 */
export const mask = (value?: string): string => {
  if (!value) return 'missing';
  return `…${value.slice(-4)}`;
};

/**
 * Validate required environment variables
 */
export const validateEnv = () => {
  const missing: string[] = [];
  
  if (!ENV.SUPABASE_URL) missing.push('VITE_SUPABASE_URL');
  if (!ENV.SUPABASE_ANON_KEY) missing.push('VITE_SUPABASE_ANON_KEY');
  
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:', missing);
    return false;
  }
  
  return true;
};

/**
 * Log current environment configuration (with masked secrets)
 */
export const logEnvStatus = () => {
  console.group('[AUTH CONFIG]');
  console.log('GOOGLE_ENABLED:', ENV.GOOGLE_ENABLED);
  console.log('GOOGLE_CLIENT_ID:', mask(ENV.GOOGLE_CLIENT_ID));
  console.log('SUPABASE_URL:', ENV.SUPABASE_URL);
  console.log('SUPABASE_PROJECT_ID:', ENV.SUPABASE_PROJECT_ID);
  console.groupEnd();
};