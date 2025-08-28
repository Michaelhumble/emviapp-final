// Public Edge Function to serve Artists sitemap for programmatic city/role pages
// Routes:
//  - /artists-sitemap.xml (index)
//  - /artists-sitemaps/sitemap-YYYY-MM-DD.xml (daily shard)

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Inline data instead of imports for edge function compatibility
const SEO_ROLES = [
  { id: 'nails', name: 'Nail', pluralName: 'Nail Artists' },
  { id: 'hair', name: 'Hair', pluralName: 'Hair Stylists' },
  { id: 'barber', name: 'Barber', pluralName: 'Barbers' },
  { id: 'lashes', name: 'Lash', pluralName: 'Lash Artists' },
  { id: 'massage', name: 'Massage', pluralName: 'Massage Therapists' },
  { id: 'skincare', name: 'Skincare', pluralName: 'Estheticians' }
];

const SEO_LOCATIONS = [
  { id: 'houston-tx', city: 'Houston', state: 'TX', fullName: 'Houston, TX' },
  { id: 'dallas-tx', city: 'Dallas', state: 'TX', fullName: 'Dallas, TX' },
  { id: 'austin-tx', city: 'Austin', state: 'TX', fullName: 'Austin, TX' },
  { id: 'san-antonio-tx', city: 'San Antonio', state: 'TX', fullName: 'San Antonio, TX' },
  { id: 'atlanta-ga', city: 'Atlanta', state: 'GA', fullName: 'Atlanta, GA' },
  { id: 'charlotte-nc', city: 'Charlotte', state: 'NC', fullName: 'Charlotte, NC' },
  { id: 'raleigh-nc', city: 'Raleigh', state: 'NC', fullName: 'Raleigh, NC' },
  { id: 'orlando-fl', city: 'Orlando', state: 'FL', fullName: 'Orlando, FL' },
  { id: 'tampa-fl', city: 'Tampa', state: 'FL', fullName: 'Tampa, FL' },
  { id: 'miami-fl', city: 'Miami', state: 'FL', fullName: 'Miami, FL' },
  { id: 'jacksonville-fl', city: 'Jacksonville', state: 'FL', fullName: 'Jacksonville, FL' },
  { id: 'phoenix-az', city: 'Phoenix', state: 'AZ', fullName: 'Phoenix, AZ' },
  { id: 'las-vegas-nv', city: 'Las Vegas', state: 'NV', fullName: 'Las Vegas, NV' },
  { id: 'denver-co', city: 'Denver', state: 'CO', fullName: 'Denver, CO' },
  { id: 'seattle-wa', city: 'Seattle', state: 'WA', fullName: 'Seattle, WA' },
  { id: 'portland-or', city: 'Portland', state: 'OR', fullName: 'Portland, OR' },
  { id: 'chicago-il', city: 'Chicago', state: 'IL', fullName: 'Chicago, IL' },
  { id: 'detroit-mi', city: 'Detroit', state: 'MI', fullName: 'Detroit, MI' },
  { id: 'philadelphia-pa', city: 'Philadelphia', state: 'PA', fullName: 'Philadelphia, PA' },
  { id: 'boston-ma', city: 'Boston', state: 'MA', fullName: 'Boston, MA' },
  { id: 'new-york-ny', city: 'New York', state: 'NY', fullName: 'New York, NY' },
  { id: 'san-francisco-ca', city: 'San Francisco', state: 'CA', fullName: 'San Francisco, CA' },
  { id: 'los-angeles-ca', city: 'Los Angeles', state: 'CA', fullName: 'Los Angeles, CA' },
  { id: 'san-diego-ca', city: 'San Diego', state: 'CA', fullName: 'San Diego, CA' },
  { id: 'sacramento-ca', city: 'Sacramento', state: 'CA', fullName: 'Sacramento, CA' }
];

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const BASE_URL = 'https://www.emvi.app';

function xmlHeader() {
  return '<?xml version="1.0" encoding="UTF-8"?>';
}

function formatDate(d: string | Date) {
  const date = typeof d === 'string' ? new Date(d) : d;
  return date.toISOString();
}

async function handleIndex(url: URL) {
  const today = new Date();
  const y = today.getUTCFullYear();
  const m = String(today.getUTCMonth() + 1).padStart(2, '0');
  const d = String(today.getUTCDate()).padStart(2, '0');
  const shardPath = `${BASE_URL}/artists-sitemaps/sitemap-${y}-${m}-${d}.xml`;

  const xml = [
    xmlHeader(),
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    `  <sitemap>`,
    `    <loc>${shardPath}</loc>`,
    `    <lastmod>${formatDate(today)}</lastmod>`,
    `  </sitemap>`,
    '</sitemapindex>'
  ].join('\n');

  return new Response(xml, { 
    headers: { 
      'Content-Type': 'application/xml; charset=utf-8', 
      'Cache-Control': 'public, max-age=3600, s-maxage=7200',
      ...corsHeaders 
    } 
  });
}

async function handleDaily(dateStr: string) {
  const urls: string[] = [];
  const lastmod = formatDate(new Date());
  
  // Generate all programmatic specialty/location combinations
  for (const role of SEO_ROLES) {
    for (const location of SEO_LOCATIONS) {
      const loc = `${BASE_URL}/artists/${role.id}/${location.id}`;
      urls.push(`  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`);
    }
  }

  const xml = [
    xmlHeader(),
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>'
  ].join('\n');

  return new Response(xml, { 
    headers: { 
      'Content-Type': 'application/xml; charset=utf-8', 
      'Cache-Control': 'public, max-age=3600, s-maxage=7200',
      ...corsHeaders 
    } 
  });
}

async function fetchValidArtistCombinations() {
  const SUPABASE_URL = 'https://wwhqbjrhbajpabfdwnip.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3aHFianJoYmFqcGFiZmR3bmlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5OTk2OTMsImV4cCI6MjA1NzU3NTY5M30.1YGaLgfnwqmzn3f28IzmTxDKKX5NoJ1V8IbI3V4-WmM';
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  
  const { data, error } = await supabase
    .from('profiles')
    .select('role, specialty, location')
    .in('role', ['artist', 'nail technician/artist'])
    .not('location', 'is', null)
    .neq('location', '');

  if (error) {
    console.error('Error fetching artists:', error);
    return [];
  }

  const combinations = new Map();
  
  (data || []).forEach(profile => {
    // Map role/specialty to sitemap categories
    let specialty = 'other';
    const roleText = (profile.role || '').toLowerCase();
    const specialtyText = (profile.specialty || '').toLowerCase();
    
    if (roleText.includes('nail') || specialtyText.includes('nail')) {
      specialty = 'nails';
    } else if (roleText.includes('hair') || specialtyText.includes('hair')) {
      specialty = 'hair';
    } else if (roleText.includes('barber') || specialtyText.includes('barber')) {
      specialty = 'barber';
    } else if (roleText.includes('lash') || specialtyText.includes('lash')) {
      specialty = 'lashes';
    } else if (roleText.includes('massage') || specialtyText.includes('massage')) {
      specialty = 'massage';
    } else if (roleText.includes('esthetic') || specialtyText.includes('skincare')) {
      specialty = 'skincare';
    }
    
    // Convert location to URL slug format
    const location = profile.location || '';
    const locationSlug = location.toLowerCase()
      .replace(/[^a-zA-Z0-9\s,-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/,-/g, '-')
      .replace(/-+/g, '-')
      .trim();
    
    if (specialty !== 'other' && locationSlug) {
      const key = `${specialty}-${locationSlug}`;
      combinations.set(key, { specialty, location_slug: locationSlug });
    }
  });
  
  return Array.from(combinations.values());
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  
  try {
    const url = new URL(req.url);
    const pathname = url.pathname;

    const isIndex = (
      pathname === '/artists-sitemap' ||
      pathname.endsWith('/artists-sitemap') ||
      pathname.endsWith('/artists-sitemap.xml')
    );

    let dateMatch: RegExpMatchArray | null = null;
    if (pathname.includes('/artists-sitemaps/')) {
      dateMatch = pathname.match(/sitemap-(\d{4}-\d{2}-\d{2})\.xml$/);
    }

    const commonHeaders = {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=7200',
      ...corsHeaders,
    };

    // HEAD support
    if (req.method === 'HEAD') {
      if (isIndex || dateMatch) {
        return new Response(null, { headers: commonHeaders });
      }
    }

    if (isIndex) {
      return await handleIndex(url);
    }

    if (dateMatch) {
      const dateStr = dateMatch[1];
      return await handleDaily(dateStr);
    }

    return new Response('Not Found', { status: 404, headers: corsHeaders });
  } catch (e) {
    console.error('Artists sitemap error', e);
    return new Response('Server Error', { status: 500, headers: corsHeaders });
  }
});