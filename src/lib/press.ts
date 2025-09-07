// Legacy press system - kept for existing components compatibility
// The main "AS SEEN ON" section now uses @/data/pressOutlets

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

// Empty array - this system is being phased out in favor of @/data/pressOutlets
export const OUTLETS: Outlet[] = [];

// Get logo URL with Clearbit fallback and final fallback
export const getLogoUrl = (outlet: Outlet): string => {
  // Use local logo first
  if (outlet.logo && outlet.logo.trim()) {
    return outlet.logo;
  }
  
  // Use Clearbit API with domain
  return `https://logo.clearbit.com/${outlet.domain}?size=256`;
};

// Priority order for marquee display - deprecated
const PRIORITY_ORDER = ['ap', 'yahoo', 'googlenews', 'bingnews', 'benzinga', 'kron4', 'fox40', 'kget17', 'wfla', 'cbs13', 'wgn9', 'kxan'];

// Get weighted outlets for marquee display with priority order - deprecated
export const getWeightedOutlets = (count: number = 10): Outlet[] => {
  return [];
};

// Get outlet by key - deprecated
export const getOutletByKey = (key: string): Outlet | undefined => {
  return undefined;
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