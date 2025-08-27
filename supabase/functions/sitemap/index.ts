import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      'https://wwhqbjrhbajpabfdwnip.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3aHFianJoYmFqcGFiZmR3bmlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5OTk2OTMsImV4cCI6MjA1NzU3NTY5M30.1YGaLgfnwqmzn3f28IzmTxDKKX5NoJ1V8IbI3V4-WmM'
    )

    const baseUrl = 'https://www.emvi.app'
    const currentDate = new Date().toISOString()

    // Static routes with their priorities and change frequencies
    const staticRoutes = [
      { url: '/', changefreq: 'daily', priority: '1.0', lastmod: currentDate },
      { url: '/jobs', changefreq: 'daily', priority: '0.9', lastmod: currentDate },
      { url: '/salons', changefreq: 'weekly', priority: '0.8', lastmod: currentDate },
      { url: '/artists', changefreq: 'weekly', priority: '0.8', lastmod: currentDate },
      { url: '/blog', changefreq: 'weekly', priority: '0.8', lastmod: currentDate },
      
      // Industry pages
      { url: '/nails', changefreq: 'weekly', priority: '0.7', lastmod: currentDate },
      { url: '/hair', changefreq: 'weekly', priority: '0.7', lastmod: currentDate },
      { url: '/barber', changefreq: 'weekly', priority: '0.7', lastmod: currentDate },
      { url: '/massage', changefreq: 'weekly', priority: '0.6', lastmod: currentDate },
      { url: '/skincare', changefreq: 'weekly', priority: '0.6', lastmod: currentDate },
      { url: '/makeup', changefreq: 'weekly', priority: '0.6', lastmod: currentDate },
      { url: '/brows-lashes', changefreq: 'weekly', priority: '0.6', lastmod: currentDate },
      { url: '/tattoo', changefreq: 'weekly', priority: '0.6', lastmod: currentDate },
      
      // Content hub pages
      { url: '/beauty-jobs', changefreq: 'weekly', priority: '0.7', lastmod: currentDate },
      { url: '/hire-beauty-professionals', changefreq: 'weekly', priority: '0.7', lastmod: currentDate },
      { url: '/for-salons', changefreq: 'weekly', priority: '0.7', lastmod: currentDate },
      { url: '/for-artists', changefreq: 'weekly', priority: '0.7', lastmod: currentDate },
      
      // Core pages
      { url: '/about', changefreq: 'monthly', priority: '0.5', lastmod: currentDate },
      { url: '/contact', changefreq: 'monthly', priority: '0.5', lastmod: currentDate },
      { url: '/pricing', changefreq: 'monthly', priority: '0.6', lastmod: currentDate },
      { url: '/partners', changefreq: 'monthly', priority: '0.4', lastmod: currentDate },
      { url: '/press', changefreq: 'monthly', priority: '0.4', lastmod: currentDate },
      
      // Legal pages
      { url: '/terms', changefreq: 'yearly', priority: '0.2', lastmod: currentDate },
      { url: '/privacy', changefreq: 'yearly', priority: '0.2', lastmod: currentDate },
      { url: '/refund', changefreq: 'yearly', priority: '0.2', lastmod: currentDate },
      { url: '/cookies', changefreq: 'yearly', priority: '0.2', lastmod: currentDate },
      
      // Blog categories
      { url: '/blog/categories/trends', changefreq: 'weekly', priority: '0.6', lastmod: currentDate },
      { url: '/blog/categories/beauty-tips', changefreq: 'weekly', priority: '0.6', lastmod: currentDate },
      { url: '/blog/categories/industry', changefreq: 'weekly', priority: '0.6', lastmod: currentDate },
      { url: '/blog/categories/artist-spotlights', changefreq: 'weekly', priority: '0.6', lastmod: currentDate },
      { url: '/blog/categories/success-stories', changefreq: 'weekly', priority: '0.6', lastmod: currentDate },
      { url: '/blog/categories/salon-management', changefreq: 'weekly', priority: '0.6', lastmod: currentDate },
      
      // Specific blog articles
      { url: '/blog/the-beauty-revolution', changefreq: 'monthly', priority: '0.5', lastmod: currentDate },
      { url: '/article/from-invisible-to-unstoppable', changefreq: 'monthly', priority: '0.5', lastmod: currentDate },
      { url: '/guides/nail-jobs-in-the-us', changefreq: 'monthly', priority: '0.6', lastmod: currentDate },
      { url: '/blog/nail-tech-salary-by-city-2025', changefreq: 'monthly', priority: '0.6', lastmod: currentDate },
      { url: '/blog/nail-artist-portfolio-examples', changefreq: 'monthly', priority: '0.5', lastmod: currentDate },
      { url: '/blog/how-to-get-more-nail-clients', changefreq: 'monthly', priority: '0.5', lastmod: currentDate },
      { url: '/blog/nail-salon-interview-questions-answers', changefreq: 'monthly', priority: '0.5', lastmod: currentDate },
    ]

    let dynamicRoutes: any[] = []

    try {
      // Fetch active jobs for dynamic job detail pages
      const { data: jobs, error: jobsError } = await supabaseClient
        .from('jobs')
        .select('id, updated_at, status')
        .eq('status', 'active')
        .order('updated_at', { ascending: false })
        .limit(1000) // Limit to prevent sitemap bloat

      if (!jobsError && jobs) {
        const jobRoutes = jobs.map(job => ({
          url: `/jobs/${job.id}`,
          changefreq: 'weekly',
          priority: '0.6',
          lastmod: job.updated_at || currentDate
        }))
        dynamicRoutes = [...dynamicRoutes, ...jobRoutes]
      }

      // Fetch artists for dynamic artist detail pages
      const { data: artists, error: artistsError } = await supabaseClient
        .from('profiles')
        .select('id, updated_at')
        .not('full_name', 'is', null)
        .order('updated_at', { ascending: false })
        .limit(500) // Limit to prevent sitemap bloat

      if (!artistsError && artists) {
        const artistRoutes = artists.map(artist => ({
          url: `/artists/${artist.id}`,
          changefreq: 'weekly',
          priority: '0.5',
          lastmod: artist.updated_at || currentDate
        }))
        dynamicRoutes = [...dynamicRoutes, ...artistRoutes]
      }

    } catch (error) {
      console.warn('Error fetching dynamic routes:', error)
      // Continue with static routes only
    }

    // Combine all routes
    const allRoutes = [...staticRoutes, ...dynamicRoutes]

    // Generate XML sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`

    console.log(`📍 Generated sitemap with ${allRoutes.length} URLs (${staticRoutes.length} static, ${dynamicRoutes.length} dynamic)`)

    return new Response(sitemap, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    })

  } catch (error) {
    console.error('Sitemap generation error:', error)
    
    return new Response(JSON.stringify({ 
      error: 'Failed to generate sitemap',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})