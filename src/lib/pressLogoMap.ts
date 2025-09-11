// Mapping from publisher names/domains to logo files
export const PRESS_LOGO_MAP: Record<string, string> = {
  // Primary outlets
  'AP News': '/press-logos/ap.svg',
  'Yahoo': '/press-logos/yahoo.svg',
  'Google': '/press-logos/google.svg',
  'CBS': '/press-logos/cbs.svg',
  'Bing': '/press-logos/bing.svg',
  'KRON 4': '/press-logos/kron4.svg',
  'KGET 17': '/press-logos/kget17.svg',
  'WGN 9': '/press-logos/wgn9.svg',
  'WFLA 8': '/press-logos/wfla8.svg',
  'FOX 40': '/press-logos/fox40.svg',
  'KXAN': '/press-logos/kxan.svg',
  
  // Additional outlets
  'FOX59': '/press-logos/fox59.svg',
  'WFLA': '/press-logos/wfla.svg',
  'CBS13': '/press-logos/cbs13.svg',
  'KDVR': '/press-logos/kdvr.svg',
  'KTSM': '/press-logos/ktsm.svg',
  'WGNO': '/press-logos/wgno.svg',
  'KRQE': '/press-logos/krqe.svg',
  
  // Domain mappings
  'google.com': '/press-logos/google.svg',
  'yahoo.com': '/press-logos/yahoo.svg',
  'cbs.com': '/press-logos/cbs.svg',
  'fox40.com': '/press-logos/fox40.svg',
  'kron4.com': '/press-logos/kron4.svg',
  'kxan.com': '/press-logos/kxan.svg',
  'bing.com': '/press-logos/bing.svg',
  'wfla.com': '/press-logos/wfla.svg',
  'wgntv.com': '/press-logos/wgn9.svg',
  'kget.com': '/press-logos/kget17.svg',
  'apnews.com': '/press-logos/ap.svg',
  'wrbl.com': '/press-logos/cbs.svg',
};

// Get logo source for a publisher name or domain
export const getLogoSource = (publisherName: string): string => {
  // Direct name match
  if (PRESS_LOGO_MAP[publisherName]) {
    return PRESS_LOGO_MAP[publisherName];
  }
  
  // Try to extract domain from publisher name or URL
  const lowercaseName = publisherName.toLowerCase();
  for (const [key, logoSrc] of Object.entries(PRESS_LOGO_MAP)) {
    if (lowercaseName.includes(key.toLowerCase())) {
      return logoSrc;
    }
  }
  
  // Fallback to placeholder
  return '/press-logos/placeholder-logo.svg';
};