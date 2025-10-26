// Public Edge Function to serve Blog sitemap
// Route: /blog-sitemap.xml

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function xmlHeader() {
  return '<?xml version="1.0" encoding="UTF-8"?>';
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  
  try {
    console.log('blog-sitemap generated successfully');
    
    const xml = [
      xmlHeader(),
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      '</urlset>'
    ].join('\n');

    const commonHeaders = {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=300, s-maxage=600',
      ...corsHeaders,
    };

    if (req.method === 'HEAD') {
      return new Response(null, { headers: commonHeaders });
    }

    return new Response(xml, { headers: commonHeaders });
  } catch (e) {
    console.error('Blog sitemap error', e);
    return new Response('Server Error', { status: 500, headers: corsHeaders });
  }
});
