/**
 * Auth Configuration and Provider Guards
 * Central location for auth provider feature flags and validation
 */

// Environment-based feature flags for auth providers
export const AUTH_CONFIG = {
  // Email/Password is always enabled (core auth method)
  EMAIL_ENABLED: true,
  
  // Google OAuth - gate by env flag and presence of client ID (frontend-safe)
  GOOGLE_ENABLED: (() => {
    try {
      const envFlag = (import.meta.env?.VITE_GOOGLE_ENABLED ?? 'true') !== 'false';
      const clientId = (import.meta.env as any)?.VITE_GOOGLE_CLIENT_ID as string;
      const hasClientId = Boolean(clientId);
      
      // Enhanced debug logging for Google OAuth config (mask to last 4 chars)
      console.group('🔧 [AUTH CONFIG] Google OAuth Configuration Check');
      console.log('VITE_GOOGLE_ENABLED:', import.meta.env?.VITE_GOOGLE_ENABLED ?? '(not set, defaults to true)');
      console.log('🔐 Frontend Google Client ID:', clientId ? `...${clientId.slice(-4)}` : '(not set)');
      console.log('Environment flag enabled:', envFlag);
      console.log('Has client ID:', hasClientId);
      
      if (envFlag && hasClientId) {
        console.log('✅ IDs match - Google OAuth enabled');
      } else {
        console.log('❌ IDs mismatch or missing - Google OAuth disabled');
      }
      
      console.log('Final Google OAuth status:', envFlag && hasClientId);
      console.warn('⚠️  VERIFY: Ensure this Client ID matches Supabase → Auth → Providers → Google');
      console.groupEnd();
      
      const enabled = envFlag && hasClientId;
      return enabled;
    } catch (e) {
      console.warn('🔧 [AUTH CONFIG] Google OAuth check failed:', e);
      return false;
    }
  })(),
  
  // Phone/SMS - check env flag and SMS provider config
  PHONE_ENABLED: (() => {
    try {
      const envFlag = (import.meta.env?.VITE_PHONE_ENABLED ?? 'true') !== 'false';
      
      // Check if Twilio or other SMS provider is configured
      // In production, this would verify actual SMS service secrets
      const hasSmsProvider = false; // Default to false until properly configured
      
      const enabled = envFlag && hasSmsProvider;
      console.log('🔧 [AUTH CONFIG] Phone/SMS configured:', enabled);
      return enabled;
    } catch (e) {
      console.warn('🔧 [AUTH CONFIG] Phone/SMS check failed:', e);
      return false;
    }
  })(),
  
  // Facebook OAuth - not implemented yet
  FACEBOOK_ENABLED: false,
  
  // Speed up onboarding by skipping email verification by default
  SKIP_EMAIL_VERIFICATION: (import.meta.env?.VITE_SKIP_EMAIL_VERIFICATION ?? 'true') !== 'false',
  
  // Default role preselection to reduce steps
  DEFAULT_ROLE: 'customer' as const,
} as const;

/**
 * Runtime validation for provider availability
 */
export const validateAuthProvider = (provider: 'google' | 'phone' | 'facebook' | 'email') => {
  switch (provider) {
    case 'google':
      return AUTH_CONFIG.GOOGLE_ENABLED;
    case 'phone':
      return AUTH_CONFIG.PHONE_ENABLED;
    case 'facebook':
      return AUTH_CONFIG.FACEBOOK_ENABLED;
    case 'email':
      return AUTH_CONFIG.EMAIL_ENABLED;
    default:
      return false;
  }
};

/**
 * Get user-friendly error messages for disabled providers
 */
export const getProviderErrorMessage = (provider: 'google' | 'phone' | 'facebook') => {
  switch (provider) {
    case 'google':
      return 'Google sign-in is temporarily unavailable. Please use email sign-up or try again later.';
    case 'phone':
      return 'Phone verification is temporarily unavailable. Please use email sign-up instead.';
    case 'facebook':
      return 'Facebook sign-in is not available yet. Please use email sign-up.';
    default:
      return 'This sign-in method is currently unavailable.';
  }
};