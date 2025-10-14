import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const BASE_URL = 'https://www.emvi.app';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get all active cities
    const { data: cities, error } = await supabase
      .from('seo_cities')
      .select('city_name, state, state_code, slug, priority, updated_at')
      .eq('is_active', true)
      .order('priority', { ascending: false });

    if (error) {
      throw error;
    }

    // Generate sitemap XML
    const urls = [];

    for (const city of cities || []) {
      const lastmod = city.updated_at ? new Date(city.updated_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
      
      // Add job listing pages for each city
      urls.push({
        loc: `${BASE_URL}/jobs/${city.slug}`,
        lastmod,
        priority: city.priority,
        changefreq: 'daily'
      });

      // Add industry-specific pages
      const industries = ['nail-tech', 'hair-stylist', 'barber', 'massage', 'skincare', 'makeup', 'brows-lashes'];
      for (const industry of industries) {
        urls.push({
          loc: `${BASE_URL}/${industry}/${city.slug}`,
          lastmod,
          priority: (city.priority * 0.9).toFixed(1),
          changefreq: 'daily'
        });
      }

      // Add salon pages
      urls.push({
        loc: `${BASE_URL}/salons/${city.slug}`,
        lastmod,
        priority: (city.priority * 0.8).toFixed(1),
        changefreq: 'weekly'
      });
    }

    // Build XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        ...corsHeaders
      },
      status: 200
    });

  } catch (error) {
    console.error('City sitemap generation error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
        status: 500
      }
    );
  }
});
