const BASE_URL = 'https://www.emvi.app';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const now = new Date().toISOString();
    
    const urls = [
      { loc: `${BASE_URL}/product`, lastmod: now, changefreq: 'monthly', priority: '0.9' },
      { loc: `${BASE_URL}/press`, lastmod: now, changefreq: 'weekly', priority: '0.8' },
      { loc: `${BASE_URL}/press/launch-ai-agents`, lastmod: now, changefreq: 'monthly', priority: '0.8' },
      { loc: `${BASE_URL}/about`, lastmod: now, changefreq: 'monthly', priority: '0.8' },
      { loc: `${BASE_URL}/privacy`, lastmod: now, changefreq: 'yearly', priority: '0.5' },
      { loc: `${BASE_URL}/terms`, lastmod: now, changefreq: 'yearly', priority: '0.5' }
    ];

    const urlElements = urls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;

    return new Response(xml, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=86400'
      }
    });
  } catch (error) {
    console.error('Error generating product sitemap:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate sitemap' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
