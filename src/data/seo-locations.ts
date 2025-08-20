// SEO locations for programmatic artist pages
export const SEO_LOCATIONS = [
  // Texas
  { id: 'houston-tx', city: 'Houston', state: 'TX', fullName: 'Houston, TX' },
  { id: 'dallas-tx', city: 'Dallas', state: 'TX', fullName: 'Dallas, TX' },
  { id: 'austin-tx', city: 'Austin', state: 'TX', fullName: 'Austin, TX' },
  { id: 'san-antonio-tx', city: 'San Antonio', state: 'TX', fullName: 'San Antonio, TX' },
  
  // Georgia & North Carolina
  { id: 'atlanta-ga', city: 'Atlanta', state: 'GA', fullName: 'Atlanta, GA' },
  { id: 'charlotte-nc', city: 'Charlotte', state: 'NC', fullName: 'Charlotte, NC' },
  { id: 'raleigh-nc', city: 'Raleigh', state: 'NC', fullName: 'Raleigh, NC' },
  
  // Florida
  { id: 'orlando-fl', city: 'Orlando', state: 'FL', fullName: 'Orlando, FL' },
  { id: 'tampa-fl', city: 'Tampa', state: 'FL', fullName: 'Tampa, FL' },
  { id: 'miami-fl', city: 'Miami', state: 'FL', fullName: 'Miami, FL' },
  { id: 'jacksonville-fl', city: 'Jacksonville', state: 'FL', fullName: 'Jacksonville, FL' },
  
  // West Coast
  { id: 'phoenix-az', city: 'Phoenix', state: 'AZ', fullName: 'Phoenix, AZ' },
  { id: 'las-vegas-nv', city: 'Las Vegas', state: 'NV', fullName: 'Las Vegas, NV' },
  { id: 'denver-co', city: 'Denver', state: 'CO', fullName: 'Denver, CO' },
  { id: 'seattle-wa', city: 'Seattle', state: 'WA', fullName: 'Seattle, WA' },
  { id: 'portland-or', city: 'Portland', state: 'OR', fullName: 'Portland, OR' },
  
  // Midwest & Northeast
  { id: 'chicago-il', city: 'Chicago', state: 'IL', fullName: 'Chicago, IL' },
  { id: 'detroit-mi', city: 'Detroit', state: 'MI', fullName: 'Detroit, MI' },
  { id: 'philadelphia-pa', city: 'Philadelphia', state: 'PA', fullName: 'Philadelphia, PA' },
  { id: 'boston-ma', city: 'Boston', state: 'MA', fullName: 'Boston, MA' },
  { id: 'new-york-ny', city: 'New York', state: 'NY', fullName: 'New York, NY' },
  
  // California
  { id: 'san-francisco-ca', city: 'San Francisco', state: 'CA', fullName: 'San Francisco, CA' },
  { id: 'los-angeles-ca', city: 'Los Angeles', state: 'CA', fullName: 'Los Angeles, CA' },
  { id: 'san-diego-ca', city: 'San Diego', state: 'CA', fullName: 'San Diego, CA' },
  { id: 'sacramento-ca', city: 'Sacramento', state: 'CA', fullName: 'Sacramento, CA' }
] as const;

export type LocationId = typeof SEO_LOCATIONS[number]['id'];

// Helper function to get nearby cities for internal linking
export function getNearbyLocations(locationId: LocationId, count: number = 3): typeof SEO_LOCATIONS[number][] {
  const location = SEO_LOCATIONS.find(loc => loc.id === locationId);
  if (!location) return [];
  
  // Group by state first, then pick from same state if available
  const sameState = SEO_LOCATIONS.filter(loc => loc.state === location.state && loc.id !== locationId);
  const otherStates = SEO_LOCATIONS.filter(loc => loc.state !== location.state);
  
  const nearby = [...sameState.slice(0, 2), ...otherStates.slice(0, count - sameState.slice(0, 2).length)];
  return nearby.slice(0, count);
}