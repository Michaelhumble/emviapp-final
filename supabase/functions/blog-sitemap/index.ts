import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

// Blog articles data - Single source of truth
const BLOG_ARTICLES = [
  {
    slug: 'top-nail-salon-jobs-us-2025',
    publishedAt: '2025-01-01',
    updatedAt: '2025-01-26',
    priority: 0.9,
    changefreq: 'weekly' as const,
    featured: true
  },
  {
    slug: 'weekly-pay-nail-artists',
    publishedAt: '2025-01-01',
    updatedAt: '2025-01-26',
    priority: 0.9,
    changefreq: 'weekly' as const,
    featured: true
  },
  {
    slug: 'sell-nail-salon-smart',
    publishedAt: '2025-01-01',
    updatedAt: '2025-01-26',
    priority: 0.9,
    changefreq: 'weekly' as const,
    featured: true
  },
  {
    slug: 'nail-industry-trends-2025',
    publishedAt: '2025-01-01',
    updatedAt: '2025-01-26',
    priority: 0.9,
    changefreq: 'weekly' as const,
    featured: true
  }
];

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

/**
 * Generates blog sitemap XML from article data
 */
function generateBlogSitemap(baseUrl: string, articles: typeof BLOG_ARTICLES): string {
  // Filter out any invalid articles
  const validArticles = articles.filter(article => 
    article.slug && 
    article.slug.trim() && 
    !article.slug.includes('placeholder') &&
    !article.slug.includes('example')
  );

  console.log(`Generating blog sitemap with ${validArticles.length} articles`);

  // Generate XML entries for each article
  const urlEntries = validArticles.map(article => {
    const loc = `${baseUrl}/blog/${article.slug}`;
    
    // Use updatedAt if available, otherwise publishedAt, otherwise current date
    const lastMod = article.updatedAt || article.publishedAt || new Date().toISOString();
    const lastModFormatted = lastMod.split('T')[0]; // Format as YYYY-MM-DD
    
    const priority = article.priority ?? 0.7;
    const changefreq = article.changefreq ?? 'weekly';

    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastModFormatted}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`;
  }).join('\n');

  // Generate complete XML sitemap
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;

  return xml;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Blog sitemap request received');
    
    const baseUrl = 'https://www.emvi.app';
    
    // Generate sitemap XML
    const sitemapXml = generateBlogSitemap(baseUrl, BLOG_ARTICLES);
    
    console.log(`Blog sitemap generated successfully with ${BLOG_ARTICLES.length} articles`);
    
    // Return XML with proper headers
    return new Response(sitemapXml, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=300, s-maxage=900', // 5 min browser, 15 min CDN
        'X-Content-Type-Options': 'nosniff',
        'X-Generated-At': new Date().toISOString(),
        'X-Articles-Count': BLOG_ARTICLES.length.toString()
      },
    });
    
  } catch (error) {
    console.error('Error generating blog sitemap:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate blog sitemap',
        message: error.message,
        timestamp: new Date().toISOString()
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});