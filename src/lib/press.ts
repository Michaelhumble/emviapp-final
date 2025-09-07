import outletsData from '@/data/outlets.json';

export interface Outlet {
  key: string;
  name: string;
  tier: 'national' | 'finance' | 'local_tv' | 'search' | 'business' | 'aggregator';
  domain: string;
  logo?: string;
  city: string;
  dateISO: string;
  headline: string;
  url: string;
  altUrls: string[];
  type: 'article' | 'aggregator';
}

export const OUTLETS: Outlet[] = outletsData as Outlet[];

// Get logo URL with Clearbit fallback and final fallback
export const getLogoUrl = (outlet: Outlet): string => {
  // Use local logo first
  if (outlet.logo && outlet.logo.trim()) {
    return outlet.logo;
  }
  
  // Use Clearbit API with domain
  return `https://logo.clearbit.com/${outlet.domain}?size=256`;
};

// Priority order for marquee display
const PRIORITY_ORDER = ['ap', 'yahoo', 'googlenews', 'bingnews', 'kron4', 'fox40', 'kget17', 'wfla', 'cbs13', 'wgn9', 'kxan'];

// Tier weights for marquee rotation
const TIER_WEIGHTS = {
  national: 4,
  finance: 3,
  search: 2,
  local_tv: 1,
  business: 1,
  aggregator: 1
};

// Get weighted outlets for marquee display with priority order
export const getWeightedOutlets = (count: number = 10): Outlet[] => {
  // Start with priority outlets in order
  const priorityOutlets = PRIORITY_ORDER
    .map(key => OUTLETS.find(o => o.key === key))
    .filter(Boolean) as Outlet[];
  
  // Add remaining outlets if needed
  const remaining = OUTLETS.filter(o => !PRIORITY_ORDER.includes(o.key));
  const allOutlets = [...priorityOutlets, ...remaining];
  
  return allOutlets.slice(0, count);
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
    business: 'Business',
    aggregator: 'Aggregator'
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