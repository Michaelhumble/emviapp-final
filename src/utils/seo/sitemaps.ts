import { SEO_ROLES } from '@/data/seo-roles';
import { SEO_LOCATIONS } from '@/data/seo-locations';

export interface SitemapUrl {
  url: string;
  lastModified?: string;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

/**
 * Generate all programmatic artist pages URLs for sitemap
 */
export function generateArtistSitemapUrls(): SitemapUrl[] {
  const baseUrl = 'https://www.emvi.app';
  const urls: SitemapUrl[] = [];
  
  // Role index pages (/artists/{role})
  SEO_ROLES.forEach(role => {
    urls.push({
      url: `${baseUrl}/artists/${role.id}`,
      changeFrequency: 'weekly',
      priority: 0.7
    });
  });
  
  // City index pages (/artists/cities/{cityState})
  SEO_LOCATIONS.forEach(location => {
    urls.push({
      url: `${baseUrl}/artists/cities/${location.id}`,
      changeFrequency: 'weekly',
      priority: 0.6
    });
  });
  
  // Role-city combination pages (/artists/{role}/{cityState})
  SEO_ROLES.forEach(role => {
    SEO_LOCATIONS.forEach(location => {
      urls.push({
        url: `${baseUrl}/artists/${role.id}/${location.id}`,
        changeFrequency: 'weekly',
        priority: 0.8
      });
    });
  });
  
  return urls;
}

/**
 * Generate artist sitemap XML content
 */
export function generateArtistSitemapXml(): string {
  const urls = generateArtistSitemapUrls();
  const now = new Date().toISOString();
  
  const urlElements = urls.map(url => `
  <url>
    <loc>${url.url}</loc>
    <lastmod>${url.lastModified || now}</lastmod>
    <changefreq>${url.changeFrequency || 'weekly'}</changefreq>
    <priority>${url.priority || 0.5}</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
}

/**
 * Get count of programmatic artist pages
 */
export function getArtistPagesCount(): {
  rolePages: number;
  cityPages: number;
  roleCityPages: number;
  total: number;
} {
  const rolePages = SEO_ROLES.length;
  const cityPages = SEO_LOCATIONS.length;
  const roleCityPages = SEO_ROLES.length * SEO_LOCATIONS.length;
  
  return {
    rolePages,
    cityPages,
    roleCityPages,
    total: rolePages + cityPages + roleCityPages
  };
}

/**
 * Check if a URL should be indexed (not thin content)
 */
export function shouldIndexUrl(url: string): boolean {
  // For now, index all programmatic pages
  // In the future, could check for actual data availability
  return true;
}

/**
 * Filter URLs that should be included in sitemap
 */
export function getIndexableArtistUrls(): SitemapUrl[] {
  return generateArtistSitemapUrls().filter(url => shouldIndexUrl(url.url));
}