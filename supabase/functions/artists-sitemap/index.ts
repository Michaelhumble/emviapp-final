// Public Edge Function to serve Artists sitemap for programmatic city/role pages
// Routes:
//  - /artists-sitemap.xml (index)
//  - /artists-sitemaps/sitemap-YYYY-MM-DD.xml (daily shard)

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
  
  // Generate all 150 programmatic pages (25 cities × 6 roles)
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