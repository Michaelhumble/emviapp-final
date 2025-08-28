/**
 * Programmatic SEO utilities for EmviApp
 * Supports city x category landing pages and collections
 */

// Priority US metros for programmatic SEO
export const PRIORITY_CITIES = [
  { name: 'Los Angeles', state: 'CA', slug: 'los-angeles-ca', population: 3898747 },
  { name: 'New York', state: 'NY', slug: 'new-york-ny', population: 8175133 },
  { name: 'Chicago', state: 'IL', slug: 'chicago-il', population: 2695598 },
  { name: 'Houston', state: 'TX', slug: 'houston-tx', population: 2320268 },
  { name: 'Phoenix', state: 'AZ', slug: 'phoenix-az', population: 1608139 },
  { name: 'Philadelphia', state: 'PA', slug: 'philadelphia-pa', population: 1584064 },
  { name: 'San Antonio', state: 'TX', slug: 'san-antonio-tx', population: 1547253 },
  { name: 'San Diego', state: 'CA', slug: 'san-diego-ca', population: 1386932 },
  { name: 'Dallas', state: 'TX', slug: 'dallas-tx', population: 1304379 },
  { name: 'San Jose', state: 'CA', slug: 'san-jose-ca', population: 1021795 },
  { name: 'Austin', state: 'TX', slug: 'austin-tx', population: 978908 },
  { name: 'Jacksonville', state: 'FL', slug: 'jacksonville-fl', population: 949611 },
  { name: 'Fort Worth', state: 'TX', slug: 'fort-worth-tx', population: 918915 },
  { name: 'Columbus', state: 'OH', slug: 'columbus-oh', population: 898553 },
  { name: 'Charlotte', state: 'NC', slug: 'charlotte-nc', population: 885708 },
  { name: 'San Francisco', state: 'CA', slug: 'san-francisco-ca', population: 873965 },
  { name: 'Indianapolis', state: 'IN', slug: 'indianapolis-in', population: 876384 },
  { name: 'Seattle', state: 'WA', slug: 'seattle-wa', population: 753675 },
  { name: 'Denver', state: 'CO', slug: 'denver-co', population: 715522 },
  { name: 'Washington', state: 'DC', slug: 'washington-dc', population: 705749 },
  { name: 'Boston', state: 'MA', slug: 'boston-ma', population: 695506 },
  { name: 'Nashville', state: 'TN', slug: 'nashville-tn', population: 689447 },
  { name: 'Baltimore', state: 'MD', slug: 'baltimore-md', population: 585708 },
  { name: 'Oklahoma City', state: 'OK', slug: 'oklahoma-city-ok', population: 695755 },
  { name: 'Portland', state: 'OR', slug: 'portland-or', population: 652503 },
  { name: 'Las Vegas', state: 'NV', slug: 'las-vegas-nv', population: 641903 },
  { name: 'Milwaukee', state: 'WI', slug: 'milwaukee-wi', population: 577222 },
  { name: 'Albuquerque', state: 'NM', slug: 'albuquerque-nm', population: 564559 },
  { name: 'Tucson', state: 'AZ', slug: 'tucson-az', population: 548073 },
  { name: 'Fresno', state: 'CA', slug: 'fresno-ca', population: 542107 },
  { name: 'Sacramento', state: 'CA', slug: 'sacramento-ca', population: 524943 },
  { name: 'Mesa', state: 'AZ', slug: 'mesa-az', population: 518012 },
  { name: 'Kansas City', state: 'MO', slug: 'kansas-city-mo', population: 508090 },
  { name: 'Atlanta', state: 'GA', slug: 'atlanta-ga', population: 498715 },
  { name: 'Long Beach', state: 'CA', slug: 'long-beach-ca', population: 466742 },
  { name: 'Colorado Springs', state: 'CO', slug: 'colorado-springs-co', population: 478221 },
  { name: 'Raleigh', state: 'NC', slug: 'raleigh-nc', population: 474069 },
  { name: 'Miami', state: 'FL', slug: 'miami-fl', population: 461080 },
  { name: 'Virginia Beach', state: 'VA', slug: 'virginia-beach-va', population: 459470 },
  { name: 'Omaha', state: 'NE', slug: 'omaha-ne', population: 486051 },
  { name: 'Oakland', state: 'CA', slug: 'oakland-ca', population: 440646 },
  { name: 'Minneapolis', state: 'MN', slug: 'minneapolis-mn', population: 429954 },
  { name: 'Tulsa', state: 'OK', slug: 'tulsa-ok', population: 413066 },
  { name: 'Tampa', state: 'FL', slug: 'tampa-fl', population: 384959 },
  { name: 'Arlington', state: 'TX', slug: 'arlington-tx', population: 398854 },
  { name: 'New Orleans', state: 'LA', slug: 'new-orleans-la', population: 383997 }
];

// Beauty service categories for programmatic pages
export const BEAUTY_CATEGORIES = [
  { 
    name: 'Nail Artists', 
    slug: 'nail-artists',
    description: 'Professional nail technicians specializing in manicures, pedicures, nail art, and extensions',
    keywords: ['nail technician', 'manicurist', 'nail artist', 'nail salon jobs']
  },
  { 
    name: 'Hair Stylists', 
    slug: 'hair-stylists',
    description: 'Licensed cosmetologists providing cuts, coloring, styling, and hair treatments',
    keywords: ['hair stylist', 'cosmetologist', 'colorist', 'hair salon jobs']
  },
  { 
    name: 'Barbers', 
    slug: 'barbers',
    description: 'Licensed barbers specializing in men\'s haircuts, beard styling, and traditional grooming',
    keywords: ['barber', 'mens haircuts', 'beard styling', 'barbershop jobs']
  },
  { 
    name: 'Estheticians', 
    slug: 'estheticians',
    description: 'Skincare specialists providing facials, treatments, and skin analysis services',
    keywords: ['esthetician', 'skincare specialist', 'facial treatments', 'spa jobs']
  },
  { 
    name: 'Makeup Artists', 
    slug: 'makeup-artists',
    description: 'Professional makeup artists for special events, bridal, editorial, and everyday looks',
    keywords: ['makeup artist', 'bridal makeup', 'special events', 'cosmetics professional']
  },
  { 
    name: 'Massage Therapists', 
    slug: 'massage-therapists',
    description: 'Licensed massage therapists providing therapeutic and relaxation services',
    keywords: ['massage therapist', 'therapeutic massage', 'spa services', 'wellness jobs']
  },
  { 
    name: 'Lash Technicians', 
    slug: 'lash-technicians',
    description: 'Certified lash artists specializing in extensions, lifts, and brow services',
    keywords: ['lash technician', 'eyelash extensions', 'lash artist', 'brow services']
  },
  { 
    name: 'Tattoo Artists', 
    slug: 'tattoo-artists',
    description: 'Professional tattoo artists creating custom designs and body art',
    keywords: ['tattoo artist', 'body art', 'custom tattoos', 'tattoo parlor jobs']
  }
];

// Generate city + category combinations
export function generateProgrammaticUrls() {
  const urls: Array<{
    type: 'city-category';
    city: typeof PRIORITY_CITIES[0];
    category: typeof BEAUTY_CATEGORIES[0];
    url: string;
    title: string;
    description: string;
  }> = [];

  PRIORITY_CITIES.forEach(city => {
    BEAUTY_CATEGORIES.forEach(category => {
      urls.push({
        type: 'city-category',
        city,
        category,
        url: `/cities/${city.slug}/${category.slug}`,
        title: `${category.name} in ${city.name}, ${city.state} - EmviApp`,
        description: `Find top ${category.name.toLowerCase()} opportunities in ${city.name}, ${city.state}. ${category.description} Connect with leading salons and beauty businesses.`
      });
    });
  });

  return urls;
}

// Generate collection pages
export const COLLECTION_PAGES = [
  {
    type: 'top-service' as const,
    slug: 'top-nail-salons',
    title: 'Top Nail Salons in America - EmviApp',
    description: 'Discover the highest-rated nail salons across the United States. Premium locations offering exceptional nail services, professional opportunities, and career growth.',
    h1: 'America\'s Top Nail Salons',
    category: 'nails'
  },
  {
    type: 'top-service' as const,
    slug: 'top-hair-salons', 
    title: 'Top Hair Salons in America - EmviApp',
    description: 'Find the best hair salons nationwide. Premium locations known for exceptional stylists, innovative techniques, and outstanding career opportunities.',
    h1: 'America\'s Premier Hair Salons',
    category: 'hair'
  },
  {
    type: 'best-in-city' as const,
    slug: 'best-beauty-professionals-los-angeles',
    title: 'Best Beauty Professionals in Los Angeles - EmviApp',
    description: 'Connect with Los Angeles\' most talented beauty professionals. Top-rated nail artists, hair stylists, and makeup artists in the entertainment capital.',
    h1: 'Los Angeles\' Elite Beauty Professionals',
    city: 'los-angeles-ca'
  },
  {
    type: 'best-in-city' as const,
    slug: 'best-beauty-professionals-new-york',
    title: 'Best Beauty Professionals in New York City - EmviApp',
    description: 'Discover New York\'s finest beauty talent. Award-winning stylists, nail artists, and makeup professionals in America\'s fashion capital.',
    h1: 'NYC\'s Premier Beauty Talent',
    city: 'new-york-ny'
  }
];

// SEO utility functions
export function generatePageMeta(city: typeof PRIORITY_CITIES[0], category: typeof BEAUTY_CATEGORIES[0]) {
  const title = `${category.name} Jobs in ${city.name}, ${city.state} | EmviApp`;
  const description = `Find ${category.name.toLowerCase()} jobs in ${city.name}, ${city.state}. ${category.description} Apply to premium salons and beauty businesses. Start your career today.`;
  
  return {
    title,
    description,
    canonical: `https://www.emvi.app/cities/${city.slug}/${category.slug}`,
    keywords: [
      ...category.keywords,
      `${city.name} beauty jobs`,
      `${city.slug} ${category.slug}`,
      `${city.state} beauty careers`
    ]
  };
}

export function generateBreadcrumbs(city: typeof PRIORITY_CITIES[0], category: typeof BEAUTY_CATEGORIES[0]) {
  return [
    { name: 'Home', url: '/' },
    { name: 'Cities', url: '/cities' },
    { name: `${city.name}, ${city.state}`, url: `/cities/${city.slug}` },
    { name: category.name, url: `/cities/${city.slug}/${category.slug}` }
  ];
}

// Content threshold for indexing (avoid thin content)
export const CONTENT_THRESHOLD = {
  MIN_JOBS: 3,
  MIN_SALONS: 2,
  MIN_CONTENT_LENGTH: 500
};

// Check if page meets content threshold
export function meetsContentThreshold(data: {
  jobCount?: number;
  salonCount?: number;
  contentLength?: number;
}) {
  return (
    (data.jobCount || 0) >= CONTENT_THRESHOLD.MIN_JOBS ||
    (data.salonCount || 0) >= CONTENT_THRESHOLD.MIN_SALONS ||
    (data.contentLength || 0) >= CONTENT_THRESHOLD.MIN_CONTENT_LENGTH
  );
}