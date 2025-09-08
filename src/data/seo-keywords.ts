// High-volume beauty industry keywords for SEO targeting
export const SEO_KEYWORDS = {
  // Primary service keywords (high volume)
  services: [
    { keyword: 'nail technician jobs', volume: 14800, difficulty: 'medium' },
    { keyword: 'hair stylist jobs', volume: 12100, difficulty: 'medium' },
    { keyword: 'barber jobs', volume: 9900, difficulty: 'medium' },
    { keyword: 'massage therapist jobs', volume: 8100, difficulty: 'medium' },
    { keyword: 'makeup artist jobs', volume: 6600, difficulty: 'high' },
    { keyword: 'esthetician jobs', volume: 5400, difficulty: 'medium' },
    { keyword: 'cosmetologist jobs', volume: 4400, difficulty: 'medium' },
    { keyword: 'lash technician jobs', volume: 3600, difficulty: 'low' },
    { keyword: 'brow artist jobs', volume: 2400, difficulty: 'low' }
  ],
  
  // Location-based keywords (combine with cities)
  locationModifiers: [
    'jobs near me',
    'careers',
    'hiring',
    'employment',
    'opportunities',
    'positions available',
    'now hiring',
    'part time',
    'full time',
    'freelance'
  ],
  
  // Long-tail keywords (lower competition)
  longTail: [
    'entry level nail technician jobs',
    'experienced hair stylist positions',
    'high paying barber jobs',
    'luxury salon careers',
    'spa massage therapist jobs',
    'freelance makeup artist work',
    'booth rental opportunities',
    'salon manager positions',
    'beauty instructor jobs',
    'mobile beauty services jobs'
  ],
  
  // Salary-related keywords
  salary: [
    'nail technician salary',
    'hair stylist pay',
    'barber income',
    'massage therapist wages',
    'beauty professional earnings',
    'cosmetologist hourly rate'
  ],
  
  // Training/education keywords
  education: [
    'beauty school requirements',
    'cosmetology license',
    'nail technician certification',
    'barber training programs',
    'continuing education beauty',
    'state board requirements'
  ]
};

// Major US cities for location-based SEO
export const TARGET_CITIES = [
  // Top 50 US cities by population
  { city: 'New York', state: 'NY', slug: 'new-york-ny', population: 8336817 },
  { city: 'Los Angeles', state: 'CA', slug: 'los-angeles-ca', population: 3979576 },
  { city: 'Chicago', state: 'IL', slug: 'chicago-il', population: 2693976 },
  { city: 'Houston', state: 'TX', slug: 'houston-tx', population: 2320268 },
  { city: 'Phoenix', state: 'AZ', slug: 'phoenix-az', population: 1680992 },
  { city: 'Philadelphia', state: 'PA', slug: 'philadelphia-pa', population: 1584064 },
  { city: 'San Antonio', state: 'TX', slug: 'san-antonio-tx', population: 1547253 },
  { city: 'San Diego', state: 'CA', slug: 'san-diego-ca', population: 1423851 },
  { city: 'Dallas', state: 'TX', slug: 'dallas-tx', population: 1343573 },
  { city: 'San Jose', state: 'CA', slug: 'san-jose-ca', population: 1021795 },
  { city: 'Austin', state: 'TX', slug: 'austin-tx', population: 978908 },
  { city: 'Jacksonville', state: 'FL', slug: 'jacksonville-fl', population: 911507 },
  { city: 'Fort Worth', state: 'TX', slug: 'fort-worth-tx', population: 909585 },
  { city: 'Columbus', state: 'OH', slug: 'columbus-oh', population: 898553 },
  { city: 'Charlotte', state: 'NC', slug: 'charlotte-nc', population: 885708 },
  { city: 'San Francisco', state: 'CA', slug: 'san-francisco-ca', population: 881549 },
  { city: 'Indianapolis', state: 'IN', slug: 'indianapolis-in', population: 876384 },
  { city: 'Seattle', state: 'WA', slug: 'seattle-wa', population: 753675 },
  { city: 'Denver', state: 'CO', slug: 'denver-co', population: 715522 },
  { city: 'Washington', state: 'DC', slug: 'washington-dc', population: 689545 },
  { city: 'Boston', state: 'MA', slug: 'boston-ma', population: 685094 },
  { city: 'El Paso', state: 'TX', slug: 'el-paso-tx', population: 681728 },
  { city: 'Detroit', state: 'MI', slug: 'detroit-mi', population: 672662 },
  { city: 'Nashville', state: 'TN', slug: 'nashville-tn', population: 670820 },
  { city: 'Portland', state: 'OR', slug: 'portland-or', population: 650380 },
  { city: 'Memphis', state: 'TN', slug: 'memphis-tn', population: 633104 },
  { city: 'Oklahoma City', state: 'OK', slug: 'oklahoma-city-ok', population: 695167 },
  { city: 'Las Vegas', state: 'NV', slug: 'las-vegas-nv', population: 641676 },
  { city: 'Louisville', state: 'KY', slug: 'louisville-ky', population: 633045 },
  { city: 'Baltimore', state: 'MD', slug: 'baltimore-md', population: 576498 },
  { city: 'Milwaukee', state: 'WI', slug: 'milwaukee-wi', population: 577222 },
  { city: 'Albuquerque', state: 'NM', slug: 'albuquerque-nm', population: 564559 },
  { city: 'Tucson', state: 'AZ', slug: 'tucson-az', population: 548073 },
  { city: 'Fresno', state: 'CA', slug: 'fresno-ca', population: 542107 },
  { city: 'Sacramento', state: 'CA', slug: 'sacramento-ca', population: 524943 },
  { city: 'Kansas City', state: 'MO', slug: 'kansas-city-mo', population: 508090 },
  { city: 'Mesa', state: 'AZ', slug: 'mesa-az', population: 504258 },
  { city: 'Atlanta', state: 'GA', slug: 'atlanta-ga', population: 498715 },
  { city: 'Omaha', state: 'NE', slug: 'omaha-ne', population: 486051 },
  { city: 'Colorado Springs', state: 'CO', slug: 'colorado-springs-co', population: 478961 },
  { city: 'Raleigh', state: 'NC', slug: 'raleigh-nc', population: 474069 },
  { city: 'Virginia Beach', state: 'VA', slug: 'virginia-beach-va', population: 459470 },
  { city: 'Long Beach', state: 'CA', slug: 'long-beach-ca', population: 456062 },
  { city: 'Miami', state: 'FL', slug: 'miami-fl', population: 442241 },
  { city: 'Oakland', state: 'CA', slug: 'oakland-ca', population: 440646 },
  { city: 'Minneapolis', state: 'MN', slug: 'minneapolis-mn', population: 429954 },
  { city: 'Tampa', state: 'FL', slug: 'tampa-fl', population: 399700 },
  { city: 'Tulsa', state: 'OK', slug: 'tulsa-ok', population: 413066 },
  { city: 'Arlington', state: 'TX', slug: 'arlington-tx', population: 398854 },
  { city: 'New Orleans', state: 'LA', slug: 'new-orleans-la', population: 383997 }
];

// Generate SEO-optimized page titles and descriptions
export function generateSEOTitle(service: string, city?: string, state?: string): string {
  const serviceMap: Record<string, string> = {
    'nails': 'Nail Technician',
    'hair': 'Hair Stylist',
    'barber': 'Barber',
    'massage': 'Massage Therapist',
    'makeup': 'Makeup Artist',
    'skincare': 'Esthetician',
    'tattoo': 'Tattoo Artist',
    'brows-lashes': 'Brow & Lash Technician'
  };
  
  const serviceName = serviceMap[service] || service.charAt(0).toUpperCase() + service.slice(1);
  
  if (city && state) {
    return `${serviceName} Jobs in ${city}, ${state} | EmviApp`;
  } else if (city) {
    return `${serviceName} Jobs in ${city} | EmviApp`;
  } else {
    return `${serviceName} Jobs | Find Beauty Careers | EmviApp`;
  }
}

export function generateSEODescription(service: string, city?: string, state?: string): string {
  const serviceMap: Record<string, string> = {
    'nails': 'nail technician',
    'hair': 'hair stylist',
    'barber': 'barber',
    'massage': 'massage therapist',
    'makeup': 'makeup artist',
    'skincare': 'esthetician',
    'tattoo': 'tattoo artist',
    'brows-lashes': 'brow & lash technician'
  };
  
  const serviceName = serviceMap[service] || service;
  const location = city && state ? `in ${city}, ${state}` : city ? `in ${city}` : 'nationwide';
  
  return `Find premium ${serviceName} jobs ${location}. Browse high-paying opportunities at top salons and spas. Apply today for full-time, part-time, and freelance positions.`;
}