/**
 * Feature flags configuration for EmviApp
 * Centralized control for all app features and modals
 */

export const FLAGS = {
  // Global kill-switch for signup modals
  signupModalEnabled: false,
  
  // Individual modal controls
  premiumSignupModalEnabled: false,
  exitIntentModalEnabled: false,
  
  // Other feature flags can be added here
  enableAnalytics: true,
  enablePWAInstallPrompt: true,
} as const;

// Legacy compatibility - keep existing env flag but override with our config
export const ENABLE_SIGNUP_MODAL = FLAGS.signupModalEnabled;
