import { supabaseBypass } from '@/types/supabase-bypass';

export interface SitemapUrl {
  url: string;
  lastModified: string;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export async function generateSitemap(baseUrl: string = 'https://emvi.app'): Promise<string> {
  const urls: SitemapUrl[] = [];

  // Static pages
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
    { url: '/about', priority: 0.6, changeFreq: 'monthly' },
    { url: '/contact', priority: 0.6, changeFreq: 'monthly' },
    { url: '/terms', priority: 0.3, changeFreq: 'yearly' },
    { url: '/privacy', priority: 0.3, changeFreq: 'yearly' }
  ];

  staticPages.forEach(page => {
    urls.push({
      url: `${baseUrl}${page.url}`,
      lastModified: new Date().toISOString(),
      changeFrequency: page.changeFreq as any,
      priority: page.priority
    });
  });

  try {
    // Fetch active job listings
    const { data: jobs } = await supabaseBypass
      .from('jobs' as any)
      .select('id, title, location, category, updated_at')
      .eq('status' as any, 'active')
      .limit(1000);

    if (jobs) {
      jobs.forEach((job: any) => {
        const slug = generateSEOSlug(job.title, job.location, job.id);
        urls.push({
          url: `${baseUrl}/${job.category}/${slug}`,
          lastModified: job.updated_at,
          changeFrequency: 'weekly',
          priority: 0.7
        });
      });
    }

    // Fetch active salon listings (assuming they're also in jobs table with category 'salon')
    const { data: salons } = await supabaseBypass
      .from('jobs' as any)
      .select('id, title, location, updated_at')
      .eq('category' as any, 'salon')
      .eq('status' as any, 'active')
      .limit(1000);

    if (salons) {
      salons.forEach((salon: any) => {
        const slug = generateSEOSlug(salon.title, salon.location, salon.id);
        urls.push({
          url: `${baseUrl}/salons/${slug}`,
          lastModified: salon.updated_at,
          changeFrequency: 'weekly',
          priority: 0.7
        });
      });
    }

    // Add artist public profile URLs
    const { data: artists } = await supabaseBypass
      .from('profiles' as any)
      .select('username, updated_at, role')
      .in('role' as any, ['artist', 'freelancer', 'nail technician/artist'])
      .not('username' as any, 'is', null)
      .limit(2000);

    if (artists) {
      artists.forEach((artist: any) => {
        if (!artist.username) return;
        urls.push({
          url: `${baseUrl}/u/${artist.username}`,
          lastModified: artist.updated_at || new Date().toISOString(),
          changeFrequency: 'weekly',
          priority: 0.6
        });
      });
    }

  } catch (error) {
    console.error('Error generating sitemap:', error);
  }

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.url}</loc>
    <lastmod>${url.lastModified.split('T')[0]}</lastmod>
    <changefreq>${url.changeFrequency}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return xml;
}

function generateSEOSlug(title: string, location?: string, id?: string): string {
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