import { STATE_HUB_SEEDS } from '../../../src/data/seo-state-seeds.ts';

const BASE_URL = 'https://www.emvi.app';

Deno.serve(async (req) => {
  try {
    const urls: string[] = [];
    
    // Generate state hub URLs
    for (const state of STATE_HUB_SEEDS) {
      urls.push(`${BASE_URL}/jobs/us/${state.slug}`);
    }
    
    // Build sitemap XML
    const lastmod = new Date().toISOString().split('T')[0];
    
    const urlEntries = urls.map(url => `
  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('');
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
    
    console.log(`✅ Generated state hub sitemap with ${urls.length} URLs`);
    
    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=86400'
      },
      status: 200
    });
    
  } catch (error) {
    console.error('State hub sitemap error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500
    });
  }
});
