import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4'

interface NewsItem {
  loc: string;
  lastmod: string;
  title?: string;
  type: 'blog' | 'press' | 'job' | 'artist';
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/xml; charset=utf-8',
  'Cache-Control': 'public, max-age=300', // 5 minutes cache
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('🗞️ Generating comprehensive news sitemap...')
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    const twoDaysAgo = new Date()
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)
    const dateThreshold = twoDaysAgo.toISOString()
    
    // Get recent blog posts
    const blogPosts: NewsItem[] = [
      {
        loc: 'https://www.emvi.app/blog/nail-salon-growth-2025',
        lastmod: new Date().toISOString(),
        title: 'Nail Salon Growth Strategies for 2025',
        type: 'blog' as const
      },
      {
        loc: 'https://www.emvi.app/blog/hiring-nail-artists',
        lastmod: new Date().toISOString(),
        title: 'Complete Guide to Hiring Top Nail Artists',
        type: 'blog' as const
      },
      {
        loc: 'https://www.emvi.app/blog/5-star-reviews',
        lastmod: new Date().toISOString(),
        title: 'How to Get More 5-Star Reviews for Your Salon',
        type: 'blog' as const
      },
      {
        loc: 'https://www.emvi.app/blog/salon-marketing-2025',
        lastmod: new Date().toISOString(),
        title: 'Salon Marketing Strategies That Actually Work in 2025',
        type: 'blog' as const
      }
    ].filter(post => new Date(post.lastmod) > twoDaysAgo);
    
    // Get recent press items
    const pressItems: NewsItem[] = [
      {
        loc: 'https://www.emvi.app/press/ap-news-ai-beauty-platform-launch',
        lastmod: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
        title: 'EmviApp Launches the First AI-Powered Growth Engine for the Global Beauty Industry',
        type: 'press' as const
      },
      {
        loc: 'https://www.emvi.app/press/benzinga-beauty-tech-revolution',
        lastmod: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
        title: 'EmviApp Launches First AI-Powered Growth Engine for the Global Beauty Industry',
        type: 'press' as const
      }
    ].filter(item => new Date(item.lastmod) > twoDaysAgo);

    // Get recent artist profiles
    let artistPages: NewsItem[] = []
    try {
      const { data: artists } = await supabase
        .from('profiles')
        .select('id, full_name, location, specialty, updated_at, created_at')
        .in('role', ['artist', 'nail technician/artist'])
        .gte('created_at', dateThreshold)
        .order('created_at', { ascending: false })
        .limit(25)

      if (artists) {
        artistPages = artists.map((artist: any) => ({
          loc: `https://www.emvi.app/u/${artist.id}`,
          lastmod: artist.updated_at || artist.created_at,
          title: `${artist.full_name} - ${artist.specialty || 'Beauty Artist'} in ${artist.location || 'Multiple Locations'}`,
          type: 'artist' as const
        }))
      }
    } catch (error) {
      console.error('Error fetching recent artist pages:', error)
    }

    // Get recent job postings
    let jobPostings: NewsItem[] = []
    try {
      const { data: jobs } = await supabase
        .from('jobs')
        .select('id, title, location, category, updated_at, created_at')
        .eq('status', 'active')
        .gte('created_at', dateThreshold)
        .order('created_at', { ascending: false })
        .limit(50)

      if (jobs) {
        jobPostings = jobs.map((job: any) => ({
          loc: `https://www.emvi.app/${job.category || 'jobs'}/${generateJobSlug(job.title, job.location, job.id)}`,
          lastmod: job.updated_at || job.created_at,
          title: `${job.title} in ${job.location || 'Multiple Locations'}`,
          type: 'job' as const
        }))
      }
    } catch (error) {
      console.error('Error fetching recent job postings:', error)
    }

    // Helper function to generate SEO-friendly job slug
    function generateJobSlug(title: string, location?: string, id?: string): string {
      const titleSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
      
      const locationSlug = location
        ? location.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-')
        : null
      
      let slug = titleSlug
      if (locationSlug) slug += `-${locationSlug}`
      if (id) slug += `-${id}`
      
      return slug
    }

    // Combine all items and limit to 200 total
    const allItems = [
      ...blogPosts,
      ...pressItems,
      ...artistPages,
      ...jobPostings
    ]

    // Sort by last modified date (newest first) and limit to 200
    const recentItems = allItems
      .sort((a, b) => new Date(b.lastmod).getTime() - new Date(a.lastmod).getTime())
      .slice(0, 200)

    // Generate comprehensive news sitemap XML
    const urlElements = recentItems.map(item => {
      const isNews = item.type === 'press' || item.type === 'blog'
      
      if (isNews) {
        return `  <url>
    <loc>${item.loc}</loc>
    <news:news>
      <news:publication>
        <news:name>EmviApp</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${item.lastmod}</news:publication_date>
      <news:title><![CDATA[${item.title || ''}]]></news:title>
    </news:news>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>never</changefreq>
    <priority>1.0</priority>
  </url>`
      } else {
        // Regular sitemap entry for jobs and artist pages
        return `  <url>
    <loc>${item.loc}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
      }
    }).join('\n')

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urlElements}
</urlset>`

    console.log(`✅ Generated comprehensive news sitemap with ${recentItems.length} recent items`)

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