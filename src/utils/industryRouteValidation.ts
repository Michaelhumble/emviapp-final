/**
 * Industry Route Validation Utility
 * Tests all CTA routing to ensure no 404s occur
 */

import { getIndustryRoute, INDUSTRY_ROUTE_MAP, validateIndustryRoutes } from './industryRouteMap';

/**
 * Test all common industry category variations that appear in the jobs
 */
export const testIndustryRouting = () => {
  console.log('🔍 Testing Industry Route Mapping...');
  
  const testCases = [
    'Nail Tech',
    'Hair Stylist', 
    'Barber',
    'Massage Therapist',
    'Esthetician',
    'Makeup Artist',
    'Lash Tech',
    'Brow Tech',
    'Tattoo Artist'
  ];
  
  const results: { category: string; route: string; valid: boolean }[] = [];
  
  testCases.forEach(category => {
    const route = getIndustryRoute(category);
    const valid = route !== '/jobs'; // '/jobs' is the fallback, so it means mapping failed
    
    results.push({ category, route, valid });
    
    if (valid) {
      console.log(`✅ ${category} → ${route}`);
    } else {
      console.warn(`❌ ${category} → ${route} (fallback used)`);
    }
  });
  
  const allValid = results.every(r => r.valid);
  const validCount = results.filter(r => r.valid).length;
  
  console.log(`\n📊 Route Mapping Results: ${validCount}/${results.length} valid`);
  
  if (allValid) {
    console.log('🎉 All industry categories have valid route mappings!');
  } else {
    console.warn('⚠️ Some categories are falling back to /jobs page');
  }
  
  // Validate all routes have corresponding pages
  console.log('\n🔍 Validating route consistency...');
  const routeValidation = validateIndustryRoutes();
  
  if (routeValidation) {
    console.log('✅ All mapped routes have corresponding page implementations');
  } else {
    console.warn('❌ Some mapped routes may not have corresponding pages');
  }
  
  return { results, allValid, routeValidation };
};

/**
 * Expected routes that should exist based on the app structure
 */
export const EXPECTED_INDUSTRY_ROUTES = [
  '/nails',
  '/hair', 
  '/barber',
  '/massage',
  '/skincare',
  '/makeup',
  '/brows-lashes',
  '/tattoo'
];

/**
 * Log all available routes for debugging
 */
export const logRouteMapping = () => {
  console.log('📋 Complete Industry Route Mapping:');
  console.table(INDUSTRY_ROUTE_MAP);
  
  console.log('\n📋 Expected Industry Routes:');
  EXPECTED_INDUSTRY_ROUTES.forEach(route => {
    console.log(`• ${route}`);
  });
};

// Run validation in development
if (process.env.NODE_ENV === 'development') {
  // Only run once when module loads
  setTimeout(() => {
    logRouteMapping();
    testIndustryRouting();
  }, 1000);
}