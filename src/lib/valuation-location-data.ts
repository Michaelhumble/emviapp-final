/**
 * Comprehensive US Location Tier System for Salon Valuation
 * Expanded coverage with 4-tier system
 */

export type LocationTier = 1 | 2 | 3 | 4;

export interface LocationTierResult {
  tier: LocationTier;
  areaName: string;
  multiplierAdjustment: number; // Added to base multiple
}

// Tier 1: Super Premium Markets (+0.4 to multiple)
const TIER_1_ZIPS: Record<string, string> = {
  // New York City Metro
  '10001': 'New York City', '10002': 'New York City', '10003': 'New York City', '10004': 'New York City',
  '10005': 'New York City', '10006': 'New York City', '10007': 'New York City', '10008': 'New York City',
  '10009': 'New York City', '10010': 'New York City', '10011': 'New York City', '10012': 'New York City',
  '10013': 'New York City', '10014': 'New York City', '10016': 'New York City', '10017': 'New York City',
  '10018': 'New York City', '10019': 'New York City', '10020': 'New York City', '10021': 'New York City',
  '10022': 'New York City', '10023': 'New York City', '10024': 'New York City', '10025': 'New York City',
  '10026': 'New York City', '10027': 'New York City', '10028': 'New York City', '10029': 'New York City',
  '10030': 'New York City', '10031': 'New York City', '10032': 'New York City', '10033': 'New York City',
  '10034': 'New York City', '10035': 'New York City', '10036': 'New York City', '10037': 'New York City',
  '10038': 'New York City', '10039': 'New York City', '10040': 'New York City', '10044': 'New York City',
  '10065': 'New York City', '10075': 'New York City', '10128': 'New York City', '10280': 'New York City',
  // Brooklyn
  '11201': 'Brooklyn', '11205': 'Brooklyn', '11206': 'Brooklyn', '11211': 'Brooklyn', '11215': 'Brooklyn',
  '11217': 'Brooklyn', '11222': 'Brooklyn', '11231': 'Brooklyn', '11238': 'Brooklyn', '11249': 'Brooklyn',
  // San Francisco Bay Area
  '94102': 'San Francisco', '94103': 'San Francisco', '94104': 'San Francisco', '94105': 'San Francisco',
  '94107': 'San Francisco', '94108': 'San Francisco', '94109': 'San Francisco', '94110': 'San Francisco',
  '94111': 'San Francisco', '94112': 'San Francisco', '94114': 'San Francisco', '94115': 'San Francisco',
  '94116': 'San Francisco', '94117': 'San Francisco', '94118': 'San Francisco', '94121': 'San Francisco',
  '94122': 'San Francisco', '94123': 'San Francisco', '94124': 'San Francisco', '94127': 'San Francisco',
  '94129': 'San Francisco', '94131': 'San Francisco', '94132': 'San Francisco', '94133': 'San Francisco',
  // Palo Alto / Silicon Valley
  '94301': 'Palo Alto', '94302': 'Palo Alto', '94303': 'Palo Alto', '94304': 'Palo Alto', '94305': 'Palo Alto',
  '94040': 'Mountain View', '94041': 'Mountain View', '94043': 'Mountain View',
  '95014': 'Cupertino', '95030': 'Los Gatos', '95070': 'Saratoga',
  // Los Angeles Premium
  '90210': 'Beverly Hills', '90211': 'Beverly Hills', '90212': 'Beverly Hills',
  '90024': 'Westwood', '90025': 'West LA', '90049': 'Brentwood', '90077': 'Bel Air',
  '90272': 'Pacific Palisades', '90291': 'Venice', '90292': 'Marina del Rey',
  '90401': 'Santa Monica', '90402': 'Santa Monica', '90403': 'Santa Monica', '90404': 'Santa Monica',
  // Orange County Coastal
  '92625': 'Corona del Mar', '92660': 'Newport Beach', '92661': 'Newport Beach', '92662': 'Newport Beach',
  '92651': 'Laguna Beach', '92652': 'Laguna Beach', '92657': 'Newport Coast',
  '92603': 'Irvine', '92604': 'Irvine', '92612': 'Irvine', '92614': 'Irvine', '92618': 'Irvine', '92620': 'Irvine',
  // Seattle Premium
  '98101': 'Seattle', '98102': 'Seattle', '98103': 'Seattle', '98104': 'Seattle', '98105': 'Seattle',
  '98109': 'Seattle', '98112': 'Seattle', '98119': 'Seattle', '98121': 'Seattle', '98122': 'Seattle',
  '98004': 'Bellevue', '98005': 'Bellevue', '98006': 'Bellevue', '98039': 'Medina',
  // Boston Premium
  '02108': 'Boston', '02109': 'Boston', '02110': 'Boston', '02111': 'Boston', '02116': 'Boston',
  '02199': 'Boston', '02210': 'Boston', '02215': 'Boston',
  '02138': 'Cambridge', '02139': 'Cambridge', '02140': 'Cambridge', '02141': 'Cambridge',
  // Washington DC
  '20001': 'Washington DC', '20002': 'Washington DC', '20003': 'Washington DC', '20004': 'Washington DC',
  '20005': 'Washington DC', '20006': 'Washington DC', '20007': 'Washington DC', '20008': 'Washington DC',
  '20009': 'Washington DC', '20010': 'Washington DC', '20011': 'Washington DC', '20015': 'Washington DC',
  '20016': 'Washington DC', '20036': 'Washington DC', '20037': 'Washington DC',
  '22101': 'McLean', '22102': 'McLean', '22182': 'Vienna', '20814': 'Bethesda', '20815': 'Bethesda',
  // Chicago Premium
  '60601': 'Chicago Loop', '60602': 'Chicago Loop', '60603': 'Chicago Loop', '60604': 'Chicago Loop',
  '60605': 'South Loop', '60606': 'West Loop', '60607': 'West Loop', '60610': 'Gold Coast',
  '60611': 'Streeterville', '60614': 'Lincoln Park', '60622': 'Wicker Park', '60654': 'River North',
  '60657': 'Lakeview', '60661': 'Loop',
  // Miami Premium
  '33109': 'Miami Beach', '33139': 'South Beach', '33140': 'Miami Beach', '33141': 'Miami Beach',
  '33131': 'Brickell', '33132': 'Downtown Miami', '33133': 'Coconut Grove', '33146': 'Coral Gables',
  // Las Vegas Premium
  '89101': 'Las Vegas', '89102': 'Las Vegas', '89109': 'Las Vegas Strip', '89119': 'Paradise',
  '89134': 'Summerlin', '89135': 'Summerlin', '89144': 'Summerlin', '89145': 'Summerlin',
};

// Tier 2: Large Metro Areas (+0.2 to multiple)
const TIER_2_ZIPS: Record<string, string> = {
  // San Diego
  '92101': 'San Diego', '92102': 'San Diego', '92103': 'San Diego', '92104': 'San Diego',
  '92106': 'Point Loma', '92107': 'Ocean Beach', '92109': 'Pacific Beach', '92037': 'La Jolla',
  '92014': 'Del Mar', '92024': 'Encinitas', '92075': 'Solana Beach',
  // Austin
  '78701': 'Austin', '78702': 'Austin', '78703': 'Austin', '78704': 'Austin', '78705': 'Austin',
  '78731': 'Austin', '78746': 'Westlake Hills', '78756': 'Austin', '78757': 'Austin',
  // Denver
  '80202': 'Denver', '80203': 'Denver', '80204': 'Denver', '80205': 'Denver', '80206': 'Denver',
  '80209': 'Denver', '80210': 'Denver', '80211': 'Denver', '80212': 'Denver',
  '80220': 'Denver', '80222': 'Denver', '80246': 'Cherry Creek',
  // Atlanta
  '30303': 'Atlanta', '30305': 'Buckhead', '30306': 'Virginia-Highland', '30307': 'Inman Park',
  '30308': 'Midtown', '30309': 'Midtown', '30318': 'West Midtown', '30324': 'Buckhead',
  '30326': 'Buckhead', '30327': 'Buckhead', '30342': 'Buckhead',
  // Dallas
  '75201': 'Dallas', '75202': 'Dallas', '75204': 'Uptown', '75205': 'Highland Park',
  '75206': 'Lakewood', '75209': 'Oak Lawn', '75219': 'Turtle Creek', '75225': 'University Park',
  // Houston
  '77002': 'Houston', '77003': 'Houston', '77004': 'Montrose', '77005': 'West University',
  '77006': 'Montrose', '77007': 'Heights', '77008': 'Heights', '77019': 'River Oaks',
  '77024': 'Memorial', '77027': 'Galleria', '77056': 'Galleria', '77057': 'Galleria',
  // Phoenix / Scottsdale
  '85251': 'Scottsdale', '85253': 'Paradise Valley', '85254': 'Scottsdale', '85255': 'Scottsdale',
  '85257': 'Scottsdale', '85258': 'Scottsdale', '85260': 'Scottsdale', '85262': 'Scottsdale',
  // Nashville
  '37201': 'Nashville', '37203': 'Nashville', '37204': 'Nashville', '37205': 'Belle Meade',
  '37206': 'East Nashville', '37209': 'The Nations', '37212': 'Midtown', '37215': 'Green Hills',
  // Charlotte
  '28202': 'Charlotte', '28203': 'Charlotte', '28204': 'Charlotte', '28205': 'Charlotte',
  '28207': 'Myers Park', '28209': 'Myers Park', '28210': 'SouthPark', '28211': 'SouthPark',
  // Portland
  '97201': 'Portland', '97202': 'Portland', '97204': 'Downtown Portland', '97205': 'Pearl District',
  '97209': 'Pearl District', '97210': 'Northwest Portland', '97212': 'Irvington', '97214': 'Hawthorne',
  // Minneapolis
  '55401': 'Minneapolis', '55402': 'Minneapolis', '55403': 'Minneapolis', '55404': 'Minneapolis',
  '55405': 'Minneapolis', '55408': 'Uptown', '55410': 'Lake Harriet', '55416': 'Edina',
  // Philadelphia
  '19102': 'Philadelphia', '19103': 'Philadelphia', '19106': 'Society Hill', '19107': 'Washington Square',
  '19123': 'Northern Liberties', '19130': 'Fairmount', '19146': 'Graduate Hospital', '19147': 'Queen Village',
  // San Jose
  '95110': 'San Jose', '95112': 'San Jose', '95113': 'San Jose', '95125': 'Willow Glen', '95126': 'San Jose',
};

// City name matching for broader coverage
const TIER_1_CITIES = new Set([
  'new york', 'nyc', 'manhattan', 'brooklyn', 'san francisco', 'palo alto', 'cupertino',
  'mountain view', 'menlo park', 'beverly hills', 'santa monica', 'bel air', 'malibu',
  'newport beach', 'laguna beach', 'corona del mar', 'seattle', 'bellevue', 'boston',
  'cambridge', 'washington dc', 'dc', 'mclean', 'bethesda', 'chicago', 'miami beach',
  'south beach', 'brickell', 'coral gables', 'las vegas', 'summerlin'
]);

const TIER_2_CITIES = new Set([
  'san diego', 'la jolla', 'del mar', 'austin', 'denver', 'atlanta', 'buckhead',
  'dallas', 'highland park', 'houston', 'river oaks', 'scottsdale', 'paradise valley',
  'nashville', 'charlotte', 'portland', 'minneapolis', 'philadelphia', 'san jose',
  'los angeles', 'irvine', 'pasadena', 'long beach', 'oakland', 'honolulu',
  'phoenix', 'tampa', 'st petersburg', 'fort lauderdale', 'west palm beach',
  'raleigh', 'durham', 'salt lake city', 'indianapolis', 'columbus', 'cincinnati',
  'pittsburgh', 'cleveland', 'detroit', 'baltimore', 'milwaukee', 'kansas city',
  'st louis', 'new orleans', 'orlando', 'jacksonville', 'memphis', 'louisville',
  'oklahoma city', 'tucson', 'albuquerque', 'sacramento', 'fresno', 'mesa',
  'omaha', 'colorado springs', 'virginia beach', 'reno', 'boise'
]);

/**
 * Get location tier based on ZIP code or city name
 * Returns tier (1-4) and multiplier adjustment
 */
export function getLocationTier(input: string): LocationTierResult {
  const cleanInput = input.trim().toLowerCase();
  
  // Check if it's a ZIP code (5 digits)
  const zipMatch = cleanInput.match(/^\d{5}/);
  if (zipMatch) {
    const zip = zipMatch[0];
    
    // Check Tier 1 ZIPs
    if (TIER_1_ZIPS[zip]) {
      return {
        tier: 1,
        areaName: TIER_1_ZIPS[zip],
        multiplierAdjustment: 0.4
      };
    }
    
    // Check Tier 2 ZIPs
    if (TIER_2_ZIPS[zip]) {
      return {
        tier: 2,
        areaName: TIER_2_ZIPS[zip],
        multiplierAdjustment: 0.2
      };
    }
  }
  
  // Check city name matching
  const cityLower = cleanInput.replace(/[,\d]/g, '').trim();
  
  // Check Tier 1 cities
  for (const city of TIER_1_CITIES) {
    if (cityLower.includes(city)) {
      return {
        tier: 1,
        areaName: city.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        multiplierAdjustment: 0.4
      };
    }
  }
  
  // Check Tier 2 cities
  for (const city of TIER_2_CITIES) {
    if (cityLower.includes(city)) {
      return {
        tier: 2,
        areaName: city.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        multiplierAdjustment: 0.2
      };
    }
  }
  
  // Default: Tier 3 (neutral market)
  return {
    tier: 3,
    areaName: 'Standard Market',
    multiplierAdjustment: 0
  };
}

/**
 * Legacy function for backwards compatibility
 * @deprecated Use getLocationTier instead
 */
export function calculateLocationPremium(baseValue: number, zipCode: string): {
  premium: number;
  multiplier: number;
  areaName: string;
} {
  const tierResult = getLocationTier(zipCode);
  // Convert tier adjustment to legacy multiplier format
  const multiplier = 1 + (tierResult.multiplierAdjustment * 0.5); // Scale adjustment to percentage
  const premium = baseValue * (multiplier - 1.0);
  
  return {
    premium: Math.round(premium),
    multiplier,
    areaName: tierResult.areaName
  };
}
