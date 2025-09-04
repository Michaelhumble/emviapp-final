import { getRecentNewsItems, generateNewsSitemapXML } from '@/lib/sitemaps/news';

// API route handler for news sitemap
export async function GET() {
  try {
    console.log('🗞️ Generating news sitemap...');
    
    // Get recent items from the database
    const recentItems = await getRecentNewsItems();
    
    // Generate XML
    const xml = generateNewsSitemapXML(recentItems);
    
    // Return XML response with proper headers
    return new Response(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=300', // 5 minutes cache
        'X-Robots-Tag': 'noindex' // Don't index the sitemap itself
      }
    });
    
  } catch (error) {
    console.error('❌ Error generating news sitemap:', error);
    
    // Return empty sitemap on error
    const emptyXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;
    
    return new Response(emptyXml, {
      status: 500,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=60' // Shorter cache on error
      }
    });
  }
}