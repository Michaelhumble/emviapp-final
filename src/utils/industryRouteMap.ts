/**
 * Central Industry Route Mapping
 * Maps job category names to their corresponding standalone page routes
 * This ensures consistent navigation across the entire application
 */

export const INDUSTRY_ROUTE_MAP: Record<string, string> = {
  // Nail Tech variations
  'Nail Tech': '/nails',
  'nail tech': '/nails',
  'Nail Technician': '/nails',
  'nail technician': '/nails',
  'Nails': '/nails',
  'nails': '/nails',
  
  // Hair Stylist variations
  'Hair Stylist': '/hair',
  'hair stylist': '/hair',
  'Hairstylist': '/hair',
  'hairstylist': '/hair',
  'Hair': '/hair',
  'hair': '/hair',
  
  // Barber variations
  'Barber': '/barber',
  'barber': '/barber',
  'Barbershop': '/barber',
  'barbershop': '/barber',
  
  // Massage variations
  'Massage Therapist': '/massage',
  'massage therapist': '/massage',
  'Massage': '/massage',
  'massage': '/massage',
  
  // Esthetician/Skincare variations
  'Esthetician': '/skincare',
  'esthetician': '/skincare',
  'Skincare': '/skincare',
  'skincare': '/skincare',
  'Skin Care': '/skincare',
  'skin care': '/skincare',
  
  // Makeup Artist variations
  'Makeup Artist': '/makeup',
  'makeup artist': '/makeup',
  'Makeup': '/makeup',
  'makeup': '/makeup',
  'MUA': '/makeup',
  'mua': '/makeup',
  
  // Lash/Brow Tech variations
  'Lash Tech': '/brows-lashes',
  'lash tech': '/brows-lashes',
  'Brow Tech': '/brows-lashes',
  'brow tech': '/brows-lashes',
  'Lash Technician': '/brows-lashes',
  'lash technician': '/brows-lashes',
  'Brow Technician': '/brows-lashes',
  'brow technician': '/brows-lashes',
  'Brows & Lashes': '/brows-lashes',
  'brows & lashes': '/brows-lashes',
  'Brows and Lashes': '/brows-lashes',
  'brows and lashes': '/brows-lashes',
  
  // Tattoo Artist variations
  'Tattoo Artist': '/tattoo',
  'tattoo artist': '/tattoo',
  'Tattoo': '/tattoo',
  'tattoo': '/tattoo',
  'Tattooist': '/tattoo',
  'tattooist': '/tattoo',
};

/**
 * Get the route for an industry category
 * @param category - The industry category name
 * @returns The corresponding route path or fallback to jobs page
 */
export const getIndustryRoute = (category: string): string => {
  // Direct lookup first
  if (INDUSTRY_ROUTE_MAP[category]) {
    return INDUSTRY_ROUTE_MAP[category];
  }
  
  // Try lowercase lookup
  const lowercaseRoute = INDUSTRY_ROUTE_MAP[category.toLowerCase()];
  if (lowercaseRoute) {
    return lowercaseRoute;
  }
  
  // Fallback to jobs page if no match found
  console.warn(`No route mapping found for industry: "${category}"`);
  return '/jobs';
};

/**
 * Validate that all mapped routes have corresponding pages
 * This should be called during development to ensure all routes are implemented
 */
export const validateIndustryRoutes = (): boolean => {
  const uniqueRoutes = [...new Set(Object.values(INDUSTRY_ROUTE_MAP))];
  const expectedRoutes = [
    '/nails',
    '/hair', 
    '/barber',
    '/massage',
    '/skincare',
    '/makeup',
    '/brows-lashes',
    '/tattoo'
  ];
  
  const missingRoutes = expectedRoutes.filter(route => !uniqueRoutes.includes(route));
  const extraRoutes = uniqueRoutes.filter(route => !expectedRoutes.includes(route));
  
  if (missingRoutes.length > 0) {
    console.error('Missing route mappings:', missingRoutes);
  }
  
  if (extraRoutes.length > 0) {
    console.warn('Extra route mappings (may need corresponding pages):', extraRoutes);
  }
  
  return missingRoutes.length === 0;
};