
import { validateListingExists, ListingType, getListingFallbackRoute } from '../listingValidator';

/**
 * Centralized route validation utilities
 */

// Available routes registry - consolidates all route paths
export const APP_ROUTES = {
  // Main sections
  HOME: '/',
  DASHBOARD: '/dashboard',
  SALONS: '/salons',
  JOBS: '/jobs',
  OPPORTUNITIES: '/opportunities',
  PROFILE: '/profile',
  
  // Dashboard variants
  DASHBOARD_ARTIST: '/dashboard/artist',
  DASHBOARD_SALON: '/dashboard/salon',
  DASHBOARD_CUSTOMER: '/dashboard/customer',
  DASHBOARD_FREELANCER: '/dashboard/freelancer',
  DASHBOARD_SUPPLIER: '/dashboard/supplier',
  DASHBOARD_OTHER: '/dashboard/other',
  DASHBOARD_MANAGER: '/dashboard/manager',
  
  // Artist-specific
  ARTIST_BOOKING_CALENDAR: '/dashboard/artist/booking-calendar',
  ARTIST_INBOX: '/dashboard/artist/inbox',
  
  // Other common paths
  AUTH_SIGNIN: '/auth/signin',
  AUTH_SIGNUP: '/auth/signup',
  PROFILE_EDIT: '/profile/edit',
  PROFILE_ROLE_SELECTION: '/profile/role-selection',
  
  // 404 pages
  NOT_FOUND: '/not-found',
  SALON_NOT_FOUND: '/salon-not-found',
  OPPORTUNITY_NOT_FOUND: '/opportunity-not-found',
  BOOTH_NOT_FOUND: '/booth-not-found',
};

/**
 * Check if a route exists in our defined routes
 */
export const isValidRoute = (pathname: string): boolean => {
  const normalizedPath = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  
  // Check for direct match in route registry
  if (Object.values(APP_ROUTES).includes(normalizedPath)) {
    return true;
  }
  
  // Check for dynamic routes (with parameters)
  const dynamicRoutePatterns = [
    /^\/u\/[^\/]+$/, // Artist profiles like /u/artist-name
    /^\/salon\/[^\/]+$/, // Salon details like /salon/123
    /^\/job\/[^\/]+$/, // Job details
    /^\/jobs\/[^\/]+$/, // Job details alternative route
    /^\/opportunity\/[^\/]+$/, // Opportunity details
    /^\/opportunities\/[^\/]+$/, // Opportunity details alternative route
    /^\/booth\/[^\/]+$/, // Booth details
  ];
  
  return dynamicRoutePatterns.some(pattern => pattern.test(normalizedPath));
};

/**
 * Get fallback route for invalid paths
 */
export const getFallbackRoute = (pathname: string): string => {
  // Logic to suggest closest route
  const segments = pathname.split('/').filter(Boolean);
  
  if (segments.length === 0) return APP_ROUTES.HOME;
  
  const rootSegment = segments[0];
  
  switch (rootSegment) {
    case 'dashboard': return APP_ROUTES.DASHBOARD;
    case 'salons': return APP_ROUTES.SALONS;
    case 'salon': return APP_ROUTES.SALONS;
    case 'jobs': return APP_ROUTES.JOBS;
    case 'job': return APP_ROUTES.JOBS;
    case 'opportunities': return APP_ROUTES.JOBS;
    case 'opportunity': return APP_ROUTES.JOBS;
    case 'profile': return APP_ROUTES.PROFILE;
    case 'u': return APP_ROUTES.SALONS;
    default: return APP_ROUTES.HOME;
  }
};

/**
 * Unified listing validation function 
 * Consolidates listing validation logic in one place
 */
export const validateListing = async (
  id: string, 
  listingType: ListingType
): Promise<{isValid: boolean, fallbackRoute: string}> => {
  try {
    const exists = await validateListingExists(id, listingType);
    
    if (!exists) {
      // Use the standardized fallback route function
      const fallbackRoute = getListingFallbackRoute(listingType);
      
      return { isValid: false, fallbackRoute };
    }
    
    return { isValid: true, fallbackRoute: '' };
  } catch (error) {
    console.error("Error validating listing:", error);
    return { isValid: false, fallbackRoute: APP_ROUTES.NOT_FOUND };
  }
};

/**
 * Log route access for debugging
 */
export const logRouteAccess = (pathname: string): void => {
  const isValid = isValidRoute(pathname);
  console.log(`Route accessed: ${pathname} - Valid: ${isValid}`);
  
  // Track invalid routes for analytics
  if (!isValid) {
    console.warn(`🚨 Invalid route accessed: ${pathname}`);
  }
};

/**
 * Verify all listings have valid routes
 */
export const runListingsVerification = async (): Promise<void> => {
  console.log("Running listings verification...");
  
  try {
    // Test cases for verification
    const testSalonId = "salon123";
    const testJobId = "job123";
    
    // Validate sample listings
    console.log(`Validating listing: ${testSalonId} of type: salon`);
    const salonResult = await validateListing(testSalonId, "salon");
    
    console.log(`Validating listing: ${testJobId} of type: job`);
    const jobResult = await validateListing(testJobId, "job");
    
    // Log verification results
    console.log("Verification results:", { salonResult, jobResult });
    console.log("Listings verification completed");
  } catch (error) {
    console.error("Error during listings verification:", error);
  }
};
