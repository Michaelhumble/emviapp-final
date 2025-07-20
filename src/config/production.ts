// Production Environment Configuration
export const PRODUCTION_CONFIG = {
  // Environment checks
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  
  // Performance settings
  MAX_RESULTS_PER_PAGE: 20,
  SEARCH_DEBOUNCE_MS: 300,
  IMAGE_LAZY_LOADING: true,
  
  // Rate limiting
  API_RATE_LIMITS: {
    SEARCH: { requests: 50, windowMinutes: 60 },
    BOOKING: { requests: 10, windowMinutes: 60 },
    PROFILE_UPDATE: { requests: 5, windowMinutes: 60 },
    SALON_LISTING: { requests: 3, windowMinutes: 60 }
  },
  
  // Feature flags
  FEATURES: {
    ADMIN_PANEL: false, // Hidden in production
    DEV_TOOLS: false,   // Hidden in production
    BETA_FEATURES: false,
    ANALYTICS: true,
    ERROR_REPORTING: true
  },
  
  // Security settings
  SECURITY: {
    REQUIRE_HTTPS: true,
    SECURE_COOKIES: true,
    CSRF_PROTECTION: true,
    XSS_PROTECTION: true
  },
  
  // Performance monitoring
  MONITORING: {
    TRACK_SLOW_QUERIES: true,
    SLOW_QUERY_THRESHOLD_MS: 1000,
    MEMORY_MONITORING: true,
    PERFORMANCE_BUDGETS: {
      FCP: 1800, // First Contentful Paint
      LCP: 2500, // Largest Contentful Paint
      FID: 100,  // First Input Delay
      CLS: 0.1   // Cumulative Layout Shift
    }
  }
};

// Production route whitelist - only these routes are accessible in production
export const PRODUCTION_ROUTES = [
  // Public pages
  '/',
  '/artists',
  '/booking-services', 
  '/salons',
  '/community',
  '/about',
  '/contact',
  
  // Authentication
  '/auth/signin',
  '/auth/signup',
  '/auth/reset-password',
  
  // Protected dashboards
  '/dashboard',
  '/dashboard/artist',
  '/dashboard/customer',
  '/dashboard/salon',
  
  // User functionality
  '/profile',
  '/settings',
  '/notifications',
  '/messages',
  
  // Legal pages
  '/privacy',
  '/terms',
  '/cookies'
];

// Blocked routes in production (dev/admin/test routes)
export const BLOCKED_PRODUCTION_ROUTES = [
  '/admin',
  '/debug',
  '/test',
  '/dev',
  '/api-test',
  '/db-admin',
  '/logs',
  '/metrics'
];

// Check if a route is allowed in production
export const isRouteAllowed = (path: string): boolean => {
  if (!PRODUCTION_CONFIG.IS_PRODUCTION) return true;
  
  // Check if route is explicitly blocked
  if (BLOCKED_PRODUCTION_ROUTES.some(blocked => path.startsWith(blocked))) {
    return false;
  }
  
  // Check if route is in whitelist or is a dynamic route variant
  return PRODUCTION_ROUTES.some(allowed => {
    // Exact match
    if (allowed === path) return true;
    
    // Dynamic route matching (e.g., /salons/123)
    if (allowed.includes('/:') || path.startsWith(allowed + '/')) return true;
    
    return false;
  });
};

// Production security headers
export const PRODUCTION_SECURITY_HEADERS = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://wwhqbjrhbajpabfdwnip.supabase.co;"
};

export default PRODUCTION_CONFIG;