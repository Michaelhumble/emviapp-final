// Public Edge Function to serve City/Role Job Landing Pages sitemap
// Route: /city-role-sitemap.xml

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const BASE_URL = 'https://www.emvi.app';

const CITIES = [
  { id: 'los-angeles-ca', name: 'Los Angeles', state: 'CA' },
  { id: 'new-york-ny', name: 'New York', state: 'NY' },
  { id: 'chicago-il', name: 'Chicago', state: 'IL' },
  { id: 'houston-tx', name: 'Houston', state: 'TX' },
  { id: 'phoenix-az', name: 'Phoenix', state: 'AZ' },
  { id: 'philadelphia-pa', name: 'Philadelphia', state: 'PA' },
  { id: 'san-antonio-tx', name: 'San Antonio', state: 'TX' },
  { id: 'san-diego-ca', name: 'San Diego', state: 'CA' },
  { id: 'dallas-tx', name: 'Dallas', state: 'TX' },
  { id: 'austin-tx', name: 'Austin', state: 'TX' },
  { id: 'jacksonville-fl', name: 'Jacksonville', state: 'FL' },
  { id: 'fort-worth-tx', name: 'Fort Worth', state: 'TX' },
  { id: 'columbus-oh', name: 'Columbus', state: 'OH' },
  { id: 'charlotte-nc', name: 'Charlotte', state: 'NC' },
  { id: 'san-francisco-ca', name: 'San Francisco', state: 'CA' },
  { id: 'seattle-wa', name: 'Seattle', state: 'WA' },
  { id: 'denver-co', name: 'Denver', state: 'CO' },
  { id: 'boston-ma', name: 'Boston', state: 'MA' },
  { id: 'detroit-mi', name: 'Detroit', state: 'MI' },
  { id: 'portland-or', name: 'Portland', state: 'OR' },
  { id: 'las-vegas-nv', name: 'Las Vegas', state: 'NV' },
  { id: 'miami-fl', name: 'Miami', state: 'FL' },
  { id: 'atlanta-ga', name: 'Atlanta', state: 'GA' },
  { id: 'orlando-fl', name: 'Orlando', state: 'FL' },
  { id: 'tampa-fl', name: 'Tampa', state: 'FL' }
];

const ROLES = [
  { id: 'nail-technician', name: 'Nail Technician' },
  { id: 'hair-stylist', name: 'Hair Stylist' },
  { id: 'salon-manager', name: 'Salon Manager' },
  { id: 'massage-therapist', name: 'Massage Therapist' },
  { id: 'barber', name: 'Barber' },
  { id: 'esthetician', name: 'Esthetician' }
];

function xmlHeader() {
  return '<?xml version="1.0" encoding="UTF-8"?>';
}

function formatDate(d: Date) {
  return d.toISOString();
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  
  try {
    console.log('city-role-sitemap generated successfully');
    
    const urls: string[] = [];
    const now = formatDate(new Date());

    // Generate all city/role combinations (25 cities × 6 roles = 150 pages)
    for (const role of ROLES) {
      for (const city of CITIES) {
        const loc = `${BASE_URL}/jobs/${role.id}/${city.id}`;
        urls.push(`  <url>
    <loc>${loc}</loc>
    <lastmod>${now}</lastmod>
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

    const commonHeaders = {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400', // 24 hours
      ...corsHeaders,
    };

    if (req.method === 'HEAD') {
      return new Response(null, { headers: commonHeaders });
    }

    return new Response(xml, { headers: commonHeaders });
  } catch (e) {
    console.error('City/Role sitemap error', e);
    return new Response('Server Error', { status: 500, headers: corsHeaders });
  }
});
