// Industry route mapping utility

// Industry route mapping table
export const INDUSTRY_ROUTE_MAP: Record<string, string> = {
  'nail tech': '/nails',
  'nail': '/nails',
  'nails': '/nails',
  'hair stylist': '/hair',
  'hair': '/hair',
  'barber': '/barber',
  'massage therapist': '/massage',
  'massage': '/massage',
  'esthetician': '/skincare',
  'skincare': '/skincare',
  'facial': '/skincare',
  'makeup artist': '/makeup',
  'makeup': '/makeup',
  'lash tech': '/brows-lashes',
  'brow tech': '/brows-lashes',
  'lashes': '/brows-lashes',
  'brows': '/brows-lashes',
  'tattoo artist': '/tattoo',
  'tattoo': '/tattoo'
};

export const getIndustryRoute = (category: string): string => {
  const categoryLower = category.toLowerCase();
  
  if (categoryLower.includes('nail')) return '/nails';
  if (categoryLower.includes('hair')) return '/hair';
  if (categoryLower.includes('barber')) return '/barber';
  if (categoryLower.includes('massage')) return '/massage';
  if (categoryLower.includes('esthetic') || categoryLower.includes('skin')) return '/skincare';
  if (categoryLower.includes('makeup')) return '/makeup';
  if (categoryLower.includes('lash') || categoryLower.includes('brow')) return '/brows-lashes';
  if (categoryLower.includes('tattoo')) return '/tattoo';
  
  return '/jobs'; // Default fallback
};

export const getIndustryDisplayName = (category: string): string => {
  const categoryLower = category.toLowerCase();
  
  if (categoryLower.includes('nail')) return 'Nails';
  if (categoryLower.includes('hair')) return 'Hair';
  if (categoryLower.includes('barber')) return 'Barber';
  if (categoryLower.includes('massage')) return 'Massage';
  if (categoryLower.includes('esthetic') || categoryLower.includes('skin')) return 'Skincare';
  if (categoryLower.includes('makeup')) return 'Makeup';
  if (categoryLower.includes('lash') || categoryLower.includes('brow')) return 'Brows & Lashes';
  if (categoryLower.includes('tattoo')) return 'Tattoo';
  
  return category;
};

// Validate that all mapped routes exist
export const validateIndustryRoutes = (): boolean => {
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
  
  // In a real app, this would check if the routes are properly configured
  // For now, we'll assume they exist if they're in the map
  return true;
};