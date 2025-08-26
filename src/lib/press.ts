import outletsData from '@/data/outlets.json';

export interface Outlet {
  key: string;
  name: string;
  tier: 'national' | 'finance' | 'local_tv' | 'search' | 'other';
  market: string;
  city: string;
  domain: string;
  logo?: string;
  logoAlt?: string;
  url: string;
  altUrls: string[];
  headline: string;
  dateISO: string;
  type: 'article';
}

export const OUTLETS: Outlet[] = outletsData as Outlet[];

// Get logo URL with Clearbit fallback
export const getLogoUrl = (outlet: Outlet): string => {
  // Use local logo first
  if (outlet.logo) {
    return outlet.logo;
  }
  
  // Use Clearbit API with domain
  return `https://logo.clearbit.com/${outlet.domain}?size=256`;
};

// Tier weights for marquee rotation
const TIER_WEIGHTS = {
  national: 4,
  finance: 3,
  search: 2,
  local_tv: 1,
  other: 1
};

// Get weighted outlets for marquee display
export const getWeightedOutlets = (count: number = 16): Outlet[] => {
  const weighted: Outlet[] = [];
  
  // Add outlets based on tier weights
  OUTLETS.forEach(outlet => {
    const weight = TIER_WEIGHTS[outlet.tier] || 1;
    for (let i = 0; i < weight; i++) {
      weighted.push(outlet);
    }
  });
  
  // Shuffle and take unique outlets (no duplicates on screen)
  const shuffled = weighted.sort(() => Math.random() - 0.5);
  const unique = Array.from(new Set(shuffled.map(o => o.key)))
    .map(key => OUTLETS.find(o => o.key === key)!)
    .slice(0, count);
  
  return unique;
};

// Get outlet by key
export const getOutletByKey = (key: string): Outlet | undefined => {
  return OUTLETS.find(outlet => outlet.key === key);
};

// Format date for display
export const formatDate = (dateISO: string): string => {
  const date = new Date(dateISO);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

// Get tier display name
export const getTierDisplayName = (tier: string): string => {
  const tierMap: Record<string, string> = {
    national: 'National',
    finance: 'Finance',
    search: 'Search',
    local_tv: 'Local TV',
    other: 'Business'
  };
  return tierMap[tier] || 'Business';
};

// Get host from URL for display
export const getHostFromUrl = (url: string): string => {
  try {
    const hostname = new URL(url).hostname;
    // Clean up common patterns
    return hostname
      .replace(/^www\./, '')
      .replace(/\.com$/, '')
      .replace(/\.net$/, '')
      .replace(/\.org$/, '')
      .replace(/tv\./, '')
      .replace(/news\./, '');
  } catch {
    return 'External Site';
  }
};