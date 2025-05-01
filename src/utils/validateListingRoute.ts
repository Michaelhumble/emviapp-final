
import { validateListingExists, ListingType } from './listingValidator';

interface RouteValidationResult {
  isValid: boolean;
  fallbackRoute?: string;
  reason?: string;
}

/**
 * Validates a listing route before navigation
 * Can be used in route guards or link click handlers
 */
export async function validateListingRoute(
  id: string, 
  listingType: ListingType
): Promise<RouteValidationResult> {
  try {
    // Skip validation in development if needed for testing
    if (process.env.NODE_ENV === 'development' && process.env.SKIP_LISTING_VALIDATION === 'true') {
      return { isValid: true };
    }
    
    // Check if listing exists
    const exists = await validateListingExists(id, listingType);
    
    if (!exists) {
      // Determine appropriate fallback route
      let fallbackRoute: string;
      let reason = "Listing not found";
      
      switch (listingType) {
        case 'salon':
          fallbackRoute = '/salon-not-found';
          break;
        case 'job':
        case 'opportunity':
          fallbackRoute = '/opportunity-not-found';
          break;
        case 'booth':
          fallbackRoute = '/booth-not-found';
          break;
        default:
          fallbackRoute = '/not-found';
      }
      
      return {
        isValid: false,
        fallbackRoute,
        reason
      };
    }
    
    return { isValid: true };
  } catch (error) {
    return {
      isValid: false,
      fallbackRoute: '/not-found',
      reason: error instanceof Error ? error.message : 'Unknown error during route validation'
    };
  }
}

/**
 * Hook-compatible version for route guards in React components
 */
export function useListingRouteValidation() {
  return {
    validateRoute: validateListingRoute,
  };
}
