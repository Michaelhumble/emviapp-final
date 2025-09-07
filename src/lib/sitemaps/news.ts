import { supabaseBypass } from '@/types/supabase-bypass';

export interface NewsItem {
  loc: string;
  lastmod: string;
  title?: string;
  type: 'blog' | 'press' | 'job' | 'artist';
}

/**
 * Get recent blog posts from the last 48 hours
 */
async function getRecentBlogPosts(): Promise<NewsItem[]> {
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  
  // For now, return static blog data since we don't have a blog table yet
  // In production, this would query a blog_posts table
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
    }
  ].filter(post => new Date(post.lastmod) > twoDaysAgo);
  
  return blogPosts;
}

/**
 * Get recent press items from the last 48 hours
 */
async function getRecentPressItems(): Promise<NewsItem[]> {
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  
  // Static press data matching what's in the edge function
  const pressItems: NewsItem[] = [
    {
      loc: 'https://www.emvi.app/press/ap-news-ai-beauty-platform-launch',
      lastmod: '2025-01-20T10:00:00.000Z',
      title: 'EmviApp Launches the First AI-Powered Growth Engine for the Global Beauty Industry',
      type: 'press' as const
    }
  ].filter(item => new Date(item.lastmod) > twoDaysAgo);
  
  return pressItems;
}

/**
 * Get recently added artist city/role pages (sample of latest 50)
 */
async function getRecentArtistPages(): Promise<NewsItem[]> {
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  
  try {
    // Get recently created artist profiles as a proxy for new artist pages
    const { data: artists } = await supabaseBypass
      .from('profiles' as any)
      .select('id, full_name, location, specialty, updated_at, created_at')
      .in('role' as any, ['artist', 'nail technician/artist'])
      .gte('created_at' as any, twoDaysAgo.toISOString())
      .order('created_at' as any, { ascending: false })
      .limit(50);

    if (!artists) return [];

    return artists.map((artist: any) => ({
      loc: `https://www.emvi.app/u/${artist.id}`,
      lastmod: artist.updated_at || artist.created_at,
      title: `${artist.full_name} - ${artist.specialty || 'Beauty Artist'} in ${artist.location || 'Multiple Locations'}`,
      type: 'artist' as const
    }));
  } catch (error) {
    console.error('Error fetching recent artist pages:', error);
    return [];
  }
}

/**
 * Get recently added job postings (sample of latest 50)
 */
async function getRecentJobPostings(): Promise<NewsItem[]> {
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  
  try {
    const { data: jobs } = await supabaseBypass
      .from('jobs' as any)
      .select('id, title, location, category, updated_at, created_at')
      .eq('status' as any, 'active')
      .gte('created_at' as any, twoDaysAgo.toISOString())
      .order('created_at' as any, { ascending: false })
      .limit(50);

    if (!jobs) return [];

    return jobs.map((job: any) => ({
      loc: `https://www.emvi.app/${job.category}/${generateJobSlug(job.title, job.location, job.id)}`,
      lastmod: job.updated_at || job.created_at,
      title: `${job.title} in ${job.location || 'Multiple Locations'}`,
      type: 'job' as const
    }));
  } catch (error) {
    console.error('Error fetching recent job postings:', error);
    return [];
  }
}

/**
 * Generate SEO-friendly job slug
 */
function generateJobSlug(title: string, location?: string, id?: string): string {
  const titleSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
  
  const locationSlug = location
    ? location.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-')
    : null;
  
  let slug = titleSlug;
  if (locationSlug) slug += `-${locationSlug}`;
  if (id) slug += `-${id}`;
  
  return slug;
}

/**
 * Get all recent content items for news sitemap
 */
export async function getRecentNewsItems(): Promise<NewsItem[]> {
  try {
    const [blogPosts, pressItems, artistPages, jobPostings] = await Promise.all([
      getRecentBlogPosts(),
      getRecentPressItems(),
      getRecentArtistPages(),
      getRecentJobPostings()
    ]);

    // Combine all items and limit to 200 total
    const allItems = [
      ...blogPosts,
      ...pressItems,
      ...artistPages,
      ...jobPostings
    ];

    // Sort by last modified date (newest first) and limit to 200
    return allItems
      .sort((a, b) => new Date(b.lastmod).getTime() - new Date(a.lastmod).getTime())
      .slice(0, 200);
  } catch (error) {
    console.error('Error gathering recent news items:', error);
    return [];
  }
}

/**
 * Generate news sitemap XML content
 */
export function generateNewsSitemapXML(items: NewsItem[]): string {
  const now = new Date().toISOString();
  
  const urlElements = items.map(item => {
    const isNews = item.type === 'press' || item.type === 'blog';
    
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
  </url>`;
    } else {
      // Regular sitemap entry for jobs and artist pages
      return `  <url>
    <loc>${item.loc}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    }
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urlElements}
</urlset>`;
}