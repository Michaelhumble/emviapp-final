/**
 * Chat Route Validator
 * Ensures all chatbot CTA routes are valid and won't cause 404 errors
 */

import { chatSuggestions } from './chatSuggestions';
import { detectUserIntent } from './chatIntentDetection';

// All valid routes in the application based on App.tsx and routes.tsx
const VALID_ROUTES = [
  '/',
  '/jobs',
  '/post-job',
  '/salons',
  '/sell-salon',
  '/about',
  '/contact',
  '/auth/signin',
  '/auth/signup',
  '/community',
  '/salon-listing',
  '/pricing',
  '/dashboard',
  '/profile',
  '/artists',
  '/early-access',
  '/terms',
  '/privacy',
  '/cookies',
  '/booking',
  '/my-bookings',
  '/booths',
  '/salon-marketplace',
  '/customers',
  '/suppliers',
  '/freelancers',
  '/salon-owners',
  '/welcome'
];

/**
 * Extract routes from CTA buttons
 */
const extractRoutes = (buttons: Array<{ route: string }>) => {
  return buttons.map(button => {
    // Remove query parameters for validation
    const cleanRoute = button.route.split('?')[0];
    return cleanRoute;
  });
};

/**
 * Validate that all chat suggestion routes exist
 */
export const validateChatSuggestionRoutes = (): { valid: boolean; issues: string[] } => {
  const issues: string[] = [];
  
  chatSuggestions.forEach(suggestion => {
    if (suggestion.ctaButtons) {
      const routes = extractRoutes(suggestion.ctaButtons);
      routes.forEach(route => {
        if (!VALID_ROUTES.includes(route)) {
          issues.push(`Invalid route in suggestion "${suggestion.id}": ${route}`);
        }
      });
    }
  });
  
  return {
    valid: issues.length === 0,
    issues
  };
};

/**
 * Validate intent detection routes
 */
export const validateIntentDetectionRoutes = (): { valid: boolean; issues: string[] } => {
  const issues: string[] = [];
  
  // Test common user messages to see what routes are generated
  const testMessages = [
    'I want to sign up',
    'How do I post a job',
    'I want to sell my salon', 
    'Where can I browse jobs',
    'How do I find salons',
    'Contact support',
    'Tell me about EmviApp'
  ];
  
  testMessages.forEach(message => {
    const buttons = detectUserIntent(message);
    const routes = extractRoutes(buttons);
    
    routes.forEach(route => {
      if (!VALID_ROUTES.includes(route)) {
        issues.push(`Invalid route from intent detection for "${message}": ${route}`);
      }
    });
  });
  
  return {
    valid: issues.length === 0,
    issues
  };
};

/**
 * Run complete validation of all chatbot routes
 */
export const validateAllChatRoutes = () => {
  console.log('🔍 Validating all chatbot CTA routes...');
  
  const suggestionValidation = validateChatSuggestionRoutes();
  const intentValidation = validateIntentDetectionRoutes();
  
  const allValid = suggestionValidation.valid && intentValidation.valid;
  const allIssues = [...suggestionValidation.issues, ...intentValidation.issues];
  
  if (allValid) {
    console.log('✅ All chatbot routes are valid!');
  } else {
    console.error('❌ Found invalid chatbot routes:');
    allIssues.forEach(issue => console.error(`  - ${issue}`));
  }
  
  return {
    valid: allValid,
    issues: allIssues,
    validRoutes: VALID_ROUTES
  };
};

// Run validation in development
if (process.env.NODE_ENV === 'development') {
  setTimeout(() => {
    validateAllChatRoutes();
  }, 2000);
}