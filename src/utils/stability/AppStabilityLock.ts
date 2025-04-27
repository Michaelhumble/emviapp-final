

/**
 * APP STABILITY LOCK - v1.0.0
 * 
 * This file serves as documentation for the current stable state of the EmviApp.
 * Do not modify this file unless explicitly updating the stability version.
 * 
 * Created: April 27, 2025
 * 
 * STABLE COMPONENTS:
 * ✅ Homepage - All sections including hero, features, testimonials
 * ✅ Industry Opportunities section - Complete and functional
 * ✅ Jobs page - Working filters, listings, and details
 * ✅ Dashboards - All role-based dashboards (Artist, Customer, Salon, etc.)
 * 
 * UNDER DEVELOPMENT:
 * ⚠️ Salon Pages - Type issues being resolved
 * ⚠️ SalonFilter component - Needs refactoring (204 lines)
 * 
 * CRITICAL TYPE ISSUES:
 * - SalonListing and SalonFilters type imports
 * - EmptyState props consistency
 * 
 * DO NOT MODIFY STABLE COMPONENTS WITHOUT PRIOR APPROVAL
 */

// Export version info for potential programmatic use
export const STABILITY_VERSION = '1.0.0';
export const STABLE_COMPONENTS = [
  'Homepage',
  'Industry Opportunities',
  'Jobs Page',
  'Dashboards (All Roles)'
];
export const DEVELOPMENT_AREAS = [
  'Salon Pages',
  'SalonFilter Component'
];

/**
 * Use this function to check if a component should be modified
 * @param componentName The name of the component being modified
 * @returns boolean indicating if modification is allowed
 */
export const canModify = (componentName: string): boolean => {
  // Only development areas can be modified
  return DEVELOPMENT_AREAS.includes(componentName);
};
