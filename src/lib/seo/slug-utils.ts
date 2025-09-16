import { US_BEAUTY_ROLES, type BeautyRole } from '../../../data/roles.us';
import { US_CITIES, type USCity } from '../../../data/cities.us';

/**
 * Parse and validate city slug against US cities data
 * @param slug - City slug in format "los-angeles-ca"
 * @returns City object or null if not found
 */
export function parseCity(slug: string): USCity | null {
  if (!slug) return null;
  
  const normalizedSlug = slug.toLowerCase().trim();
  const match = US_CITIES.find(c => c.slug.toLowerCase() === normalizedSlug);
  return match || null;
}

/**
 * Parse and validate role/service slug against US beauty roles data
 * @param slug - Role slug in format "lash-artist" or "nails"
 * @returns Role object or null if not found
 */
export function parseRole(slug: string): BeautyRole | null {
  if (!slug) return null;
  
  const normalizedSlug = slug.toLowerCase().trim();
  
  // First try exact slug match
  let match = US_BEAUTY_ROLES.find(r => r.slug.toLowerCase() === normalizedSlug);
  
  // If no exact match, try synonyms
  if (!match) {
    match = US_BEAUTY_ROLES.find(r => 
      r.synonyms.some(synonym => 
        synonym.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') === normalizedSlug
      )
    );
  }
  
  return match || null;
}

/**
 * Get suggested alternatives for invalid slugs
 * @param type - "jobs" or "salons"
 * @returns Array of suggested city+role combinations
 */
export function getSuggestedAlternatives(type: 'jobs' | 'salons'): Array<{
  city: USCity;
  role: BeautyRole;
  url: string;
}> {
  // Get top 5 tier-1 cities and top 5 popular roles
  const topCities = US_CITIES.filter(c => c.tier === 1).slice(0, 5);
  const popularRoles = US_BEAUTY_ROLES.slice(0, 5); // First 5 are most popular
  
  const suggestions: Array<{
    city: USCity;
    role: BeautyRole;
    url: string;
  }> = [];
  
  // Create combinations
  for (let i = 0; i < Math.min(3, topCities.length); i++) {
    const city = topCities[i];
    const role = popularRoles[i % popularRoles.length];
    
    suggestions.push({
      city,
      role,
      url: `/${type}-in/${city.slug}/${role.slug}`
    });
  }
  
  return suggestions;
}

/**
 * Generate canonical URL for valid city+role combination
 * @param type - "jobs" or "salons"
 * @param citySlug - Valid city slug
 * @param roleSlug - Valid role slug
 * @returns Canonical URL
 */
export function generateCanonicalUrl(
  type: 'jobs' | 'salons',
  citySlug: string,
  roleSlug: string
): string {
  return `https://www.emvi.app/${type}-in/${citySlug}/${roleSlug}`;
}

/**
 * Generate search URLs for CTAs
 * @param type - Target page type
 * @param city - City object (optional)
 * @param role - Role object (optional)
 * @returns Search URL with parameters
 */
export function generateSearchUrl(
  type: 'jobs' | 'salons' | 'artists',
  city?: USCity | null,
  role?: BeautyRole | null
): string {
  const baseUrl = `/${type}`;
  const params = new URLSearchParams();
  
  if (city) {
    params.set('city', city.slug);
  }
  
  if (role) {
    if (type === 'jobs') {
      params.set('role', role.slug);
    } else if (type === 'salons') {
      params.set('service', role.slug);
    } else if (type === 'artists') {
      params.set('skill', role.slug);
    }
  }
  
  const queryString = params.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}

/**
 * Track SEO lander view for analytics
 * @param type - "jobs" or "salons"
 * @param city - City slug
 * @param role - Role slug
 */
export function trackSeoLanderView(
  type: 'jobs' | 'salons',
  city: string,
  role: string
): void {
  try {
    window.dispatchEvent(new CustomEvent('seo_lander_view', {
      detail: {
        type,
        city,
        role,
        timestamp: Date.now(),
        url: window.location.href
      }
    }));
  } catch (error) {
    // Silently fail - analytics should never break the page
    console.debug('SEO lander tracking failed:', error);
  }
}