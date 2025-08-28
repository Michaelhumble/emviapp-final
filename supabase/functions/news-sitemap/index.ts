import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/xml; charset=utf-8'
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('🗞️ Generating news sitemap...')
    
    // Get press mentions from the last 48 hours for Google News
    const twoDaysAgo = new Date()
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)
    const dateThreshold = twoDaysAgo.toISOString()
    
    // For now, using static data - in production this would fetch from database
    const pressData = [
      {
        slug: 'ap-news-ai-beauty-platform-launch',
        headline: 'EmviApp Launches the First AI-Powered Growth Engine for the Global Beauty Industry',
        datePublished: '2025-08-24T10:00:00.000Z',
        outletName: 'Associated Press'
      },
      {
        slug: 'benzinga-beauty-tech-revolution',
        headline: 'EmviApp Launches First AI-Powered Growth Engine for the Global Beauty Industry', 
        datePublished: '2025-08-25T09:00:00.000Z',
        outletName: 'Benzinga'
      },
      {
        slug: 'yahoo-news-beauty-industry-transformation',
        headline: 'EmviApp Launches the First AI-Powered Growth Engine for the Global Beauty Industry',
        datePublished: '2025-08-24T11:30:00.000Z', 
        outletName: 'Yahoo News'
      }
    ]

    // Filter to news from last 48 hours
    const recentNews = pressData.filter(item => 
      new Date(item.datePublished) > twoDaysAgo
    )

    // Generate news sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${recentNews.map(item => `  <url>
    <loc>https://www.emvi.app/press/${item.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>EmviApp</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${item.datePublished}</news:publication_date>
      <news:title><![CDATA[${item.headline}]]></news:title>
    </news:news>
    <lastmod>${item.datePublished}</lastmod>
    <changefreq>never</changefreq>
    <priority>1.0</priority>
  </url>`).join('\n')}
</urlset>`

    console.log(`✅ Generated news sitemap with ${recentNews.length} recent articles`)

    return new Response(sitemap, { 
      headers: corsHeaders,
      status: 200 
    })
    
  } catch (error) {
    console.error('❌ Error generating news sitemap:', error)
    
    return new Response(
      '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>',
      { 
        headers: corsHeaders,
        status: 500 
      }
    )
  }
})