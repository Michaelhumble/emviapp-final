/**
 * BILLION-DOLLAR CTA URL STANDARDIZATION
 * Ensures all "Post Job" CTAs use consistent URLs with industry context
 */

/**
 * Get standardized post job URL with industry context
 */
export const getPostJobUrl = (industry?: string): string => {
  const baseUrl = 'http://emviapp-final.lovable.app/post-job';
  
  if (!industry) return baseUrl;
  
  // Normalize industry name
  const normalizedIndustry = normalizeIndustryName(industry);
  return `${baseUrl}?industry=${normalizedIndustry}`;
};

/**
 * Get post job URL based on current page context
 */
export const getContextualPostJobUrl = (currentPath?: string): string => {
  if (!currentPath) return getPostJobUrl();
  
  // Extract industry from current path
  const industryFromPath = extractIndustryFromPath(currentPath);
  return getPostJobUrl(industryFromPath);
};

/**
 * Normalize industry names to standard format
 */
const normalizeIndustryName = (industry: string): string => {
  const normalized = industry.toLowerCase().trim();
  
  // Map variations to standard names
  const industryMap: Record<string, string> = {
    'nail': 'nails',
    'nail tech': 'nails',
    'nail technician': 'nails',
    'hair stylist': 'hair',
    'hairstylist': 'hair',
    'hair tech': 'hair',
    'barber': 'barber',
    'barbershop': 'barber',
    'massage': 'massage',
    'massage therapist': 'massage',
    'esthetician': 'skincare',
    'skincare': 'skincare',
    'skin care': 'skincare',
    'makeup': 'makeup',
    'makeup artist': 'makeup',
    'mua': 'makeup',
    'lash': 'brows-lashes',
    'lash tech': 'brows-lashes',
    'brow': 'brows-lashes',
    'brow tech': 'brows-lashes',
    'brows & lashes': 'brows-lashes',
    'brows and lashes': 'brows-lashes',
    'tattoo': 'tattoo',
    'tattoo artist': 'tattoo',
    'tattooist': 'tattoo'
  };
  
  return industryMap[normalized] || normalized;
};

/**
 * Extract industry from current page path
 */
const extractIndustryFromPath = (path: string): string | undefined => {
  // Check for industry-specific paths
  if (path.includes('/nails')) return 'nails';
  if (path.includes('/hair')) return 'hair';
  if (path.includes('/barber')) return 'barber';
  if (path.includes('/massage')) return 'massage';
  if (path.includes('/skincare')) return 'skincare';
  if (path.includes('/makeup')) return 'makeup';
  if (path.includes('/brows-lashes')) return 'brows-lashes';
  if (path.includes('/tattoo')) return 'tattoo';
  
  return undefined;
};

/**
 * Get all possible CTA variations for testing
 */
export const getAllPostJobUrls = (): Record<string, string> => {
  const industries = ['nails', 'hair', 'barber', 'massage', 'skincare', 'makeup', 'brows-lashes', 'tattoo'];
  const urls: Record<string, string> = {};
  
  urls['general'] = getPostJobUrl();
  industries.forEach(industry => {
    urls[industry] = getPostJobUrl(industry);
  });
  
  return urls;
};