// Comprehensive sitemap generator for EmviApp
// Generates main sitemap index that references all sub-sitemaps

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SUPABASE_URL = 'https://wwhqbjrhbajpabfdwnip.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3aHFianJoYmFqcGFiZmR3bmlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5OTk2OTMsImV4cCI6MjA1NzU3NTY5M30.1YGaLgfnwqmzn3f28IzmTxDKKX5NoJ1V8IbI3V4-WmM';
const BASE_URL = 'https://www.emvi.app';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function xmlHeader() {
  return '<?xml version="1.0" encoding="UTF-8"?>';
}

function formatDate(d: string | Date) {
  const date = typeof d === 'string' ? new Date(d) : d;
  return date.toISOString().split('T')[0];
}

// Update dynamic sitemap generation to include jobs and salons
async function generateDynamicSitemaps() {
  const today = formatDate(new Date());
  
  try {
    // Fetch active jobs
    const { data: jobs } = await supabase
      .from('jobs')
      .select('id, title, location, category, updated_at')
      .eq('status', 'active')
      .limit(1000);

    // Fetch salon sales  
    const { data: salons } = await supabase
      .from('salon_sales')
      .select('id, salon_name, city, state, updated_at')
      .eq('status', 'active')
      .limit(1000);

    const allUrls: Array<{ url: string; lastmod: string; priority: number; changefreq: string }> = [];

    // Add job URLs
    if (jobs) {
      jobs.forEach((job: any) => {
        if (job.id && job.title && job.location) {
          allUrls.push({
            url: `${BASE_URL}/jobs/${job.id}`,
            lastmod: formatDate(job.updated_at || new Date()),
            priority: 0.7,
            changefreq: 'weekly'
          });
        }
      });
    }

    // Add salon URLs
    if (salons) {
      salons.forEach((salon: any) => {
        if (salon.id && salon.salon_name) {
          allUrls.push({
            url: `${BASE_URL}/salons/${salon.id}`,
            lastmod: formatDate(salon.updated_at || new Date()),
            priority: 0.7,
            changefreq: 'weekly'
          });
        }
      });
    }

    return allUrls;
  } catch (error) {
    console.error('Error fetching dynamic URLs:', error);
    return [];
  }
}

async function generateCompleteSitemap() {
  const staticPages = [
    { url: '', priority: 1.0, changeFreq: 'daily' },
    { url: '/jobs', priority: 0.9, changeFreq: 'hourly' },
    { url: '/salons', priority: 0.9, changeFreq: 'hourly' },
    { url: '/artists', priority: 0.8, changeFreq: 'daily' },
    { url: '/nails', priority: 0.8, changeFreq: 'daily' },
    { url: '/hair', priority: 0.8, changeFreq: 'daily' },
    { url: '/barber', priority: 0.8, changeFreq: 'daily' },
    { url: '/massage', priority: 0.8, changeFreq: 'daily' },
    { url: '/makeup', priority: 0.8, changeFreq: 'daily' },
    { url: '/skincare', priority: 0.8, changeFreq: 'daily' },
    { url: '/tattoo', priority: 0.8, changeFreq: 'daily' },
    { url: '/brows-lashes', priority: 0.8, changeFreq: 'daily' },
    { url: '/booking-services', priority: 0.7, changeFreq: 'weekly' },
    { url: '/about', priority: 0.6, changeFreq: 'monthly' },
    { url: '/contact', priority: 0.6, changeFreq: 'monthly' },
    { url: '/pricing', priority: 0.7, changeFreq: 'weekly' },
    { url: '/blog', priority: 0.8, changeFreq: 'daily' },
    { url: '/press', priority: 0.5, changeFreq: 'monthly' },
    { url: '/for-salons', priority: 0.7, changeFreq: 'weekly' },
    { url: '/for-artists', priority: 0.7, changeFreq: 'weekly' },
    { url: '/beauty-jobs', priority: 0.7, changeFreq: 'weekly' },
    { url: '/hire-beauty-professionals', priority: 0.7, changeFreq: 'weekly' },
    { url: '/terms', priority: 0.3, changeFreq: 'yearly' },
    { url: '/privacy', priority: 0.3, changeFreq: 'yearly' },
    { url: '/cookies', priority: 0.3, changeFreq: 'yearly' }
  ];

  // Get dynamic URLs
  const dynamicUrls = await generateDynamicSitemaps();

  // Combine static and dynamic URLs
  const allUrls = [
    ...staticPages.map(page => ({
      url: `${BASE_URL}${page.url}`,
      lastmod: formatDate(new Date()),
      changefreq: page.changeFreq,
      priority: page.priority
    })),
    ...dynamicUrls.map(url => ({
      url: url.url,
      lastmod: url.lastmod,
      changefreq: url.changefreq,
      priority: url.priority
    }))
  ];

  const xml = [
    xmlHeader(),
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...allUrls.map(url => 
      `  <url>
    <loc>${url.url}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
    ),
    '</urlset>'
  ].join('\n');

  return xml;
}

async function generateSitemapIndex() {
  const today = formatDate(new Date());
  
  const sitemaps = [
    {
      loc: `${BASE_URL}/sitemap-static.xml`,
      lastmod: today
    },
    {
      loc: `${BASE_URL}/jobs-sitemap.xml`,
      lastmod: today
    },
    {
      loc: `${BASE_URL}/salons-sitemap.xml`,
      lastmod: today
    },
    {
      loc: `${BASE_URL}/artists-sitemap.xml`,
      lastmod: today
    },
    {
      loc: `${BASE_URL}/blog-sitemap.xml`,
      lastmod: today
    }
  ];

  const sitemapEntries = sitemaps.map(sitemap => 
    `  <sitemap>
    <loc>${sitemap.loc}</loc>
    <lastmod>${sitemap.lastmod}</lastmod>
  </sitemap>`
  );

  const xml = [
    xmlHeader(),
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...sitemapEntries,
    '</sitemapindex>'
  ].join('\n');

  return xml;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const pathname = url.pathname;

    const commonHeaders = {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=300, s-maxage=600',
      ...corsHeaders,
    };

    // HEAD support
    if (req.method === 'HEAD') {
      return new Response(null, { headers: commonHeaders });
    }

    // Handle different sitemap requests
    if (pathname.endsWith('/sitemap') || pathname.endsWith('/sitemap.xml')) {
      const xml = await generateSitemapIndex();
      return new Response(xml, { headers: commonHeaders });
    }
    
    if (pathname.endsWith('/sitemap-static.xml')) {
      const xml = await generateCompleteSitemap();
      return new Response(xml, { headers: commonHeaders });
    }

    // Ping search engines if requested
    if (url.searchParams.get('ping') === '1') {
      const sitemapUrl = `${BASE_URL}/sitemap.xml`;
      const encoded = encodeURIComponent(sitemapUrl);
      
      try {
        await Promise.all([
          fetch(`https://www.google.com/ping?sitemap=${encoded}`),
          fetch(`https://www.bing.com/ping?sitemap=${encoded}`)
        ]);
      } catch (error) {
        console.error('Error pinging search engines:', error);
      }
    }

    const xml = await generateSitemapIndex();
    return new Response(xml, { headers: commonHeaders });

  } catch (error) {
    console.error('Sitemap generation error:', error);
    return new Response('Internal Server Error', { 
      status: 500, 
      headers: corsHeaders 
    });
  }
});