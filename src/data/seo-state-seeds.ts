// State-level SEO data for /jobs/us/{state-slug} hub pages
import { CITY_ROLE_SEEDS } from './seo-city-role-seeds';

export interface StateInfo {
  id: string;
  name: string;
  slug: string;
  code: string;
}

// Top 10 states for initial rollout
export const STATE_HUB_SEEDS: StateInfo[] = [
  { id: 'california', name: 'California', slug: 'california', code: 'CA' },
  { id: 'texas', name: 'Texas', slug: 'texas', code: 'TX' },
  { id: 'florida', name: 'Florida', slug: 'florida', code: 'FL' },
  { id: 'new-york', name: 'New York', slug: 'new-york', code: 'NY' },
  { id: 'washington', name: 'Washington', slug: 'washington', code: 'WA' },
  { id: 'illinois', name: 'Illinois', slug: 'illinois', code: 'IL' },
  { id: 'georgia', name: 'Georgia', slug: 'georgia', code: 'GA' },
  { id: 'north-carolina', name: 'North Carolina', slug: 'north-carolina', code: 'NC' },
  { id: 'massachusetts', name: 'Massachusetts', slug: 'massachusetts', code: 'MA' },
  { id: 'arizona', name: 'Arizona', slug: 'arizona', code: 'AZ' }
];

// Generate city-to-state mapping from existing city seeds
export function getCitiesByState(stateCode: string) {
  return CITY_ROLE_SEEDS.cities.filter(city => city.state === stateCode);
}

export function getStateBySlug(slug: string): StateInfo | undefined {
  return STATE_HUB_SEEDS.find(state => state.slug === slug);
}

export function getStateByCode(code: string): StateInfo | undefined {
  return STATE_HUB_SEEDS.find(state => state.code === code);
}

export function generateStateHubContent(stateName: string, stateCode: string) {
  const cities = getCitiesByState(stateCode);
  const topCities = cities.slice(0, 6); // Top 6 cities
  
  return {
    intro: `Explore thousands of beauty job opportunities across ${stateName}. From nail technicians to hair stylists, massage therapists to salon managers, EmviApp connects talented professionals with leading salons, spas, and studios throughout ${stateName}. Whether you're in ${cities.map(c => c.name).slice(0, 3).join(', ')}, or any of our ${cities.length} covered cities, find your next career move with verified employers and competitive compensation packages.`,
    
    topCities: topCities.map(city => ({
      id: city.id,
      name: city.name,
      state: city.state,
      jobCount: Math.floor(Math.random() * 150) + 50 // Mock count; replace with real data
    })),
    
    searchTips: [
      `Browse ${CITY_ROLE_SEEDS.roles.length} specialized beauty categories`,
      `Filter by full-time, part-time, or booth rental`,
      `Connect directly with verified salon owners`,
      `Upload your portfolio and get discovered by top employers`
    ],
    
    ctaText: `Start your beauty career journey in ${stateName} today`,
    
    relatedLinks: [
      { text: 'All Beauty Jobs', url: '/jobs' },
      { text: 'Browse Salons', url: '/salons' },
      { text: 'Create Your Profile', url: '/signup' },
      { text: 'Post a Job', url: '/jobs/post' }
    ],
    
    // Optional UGC fields (only rendered if data exists)
    trendingCities: undefined as Array<{ id: string; name: string }> | undefined,
    successStories: undefined as Array<{ text: string; author?: string }> | undefined
  };
}
