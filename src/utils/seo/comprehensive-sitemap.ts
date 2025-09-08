import { SEO_ROLES } from '@/data/seo-roles';
import { SEO_LOCATIONS } from '@/data/seo-locations';
import { SEO_KEYWORDS } from '@/data/seo-keywords';

export interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

const BASE_URL = 'https://www.emvi.app';
const now = new Date().toISOString();

/**
 * Generate all SEO programmatic page URLs for sitemap
 */
export function generateComprehensiveSitemap(): SitemapEntry[] {
  const urls: SitemapEntry[] = [];

  // Core static pages (highest priority)
  const staticPages = [
    { path: '', priority: 1.0 },
    { path: '/jobs', priority: 0.9 },
    { path: '/salons', priority: 0.9 },
    { path: '/artists', priority: 0.9 },
    { path: '/about', priority: 0.7 },
    { path: '/contact', priority: 0.7 },
    { path: '/post-job', priority: 0.8 }
  ];

  staticPages.forEach(page => {
    urls.push({
      url: `${BASE_URL}${page.path}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: page.priority
    });
  });

  // Industry category pages
  SEO_ROLES.forEach(role => {
    urls.push({
      url: `${BASE_URL}/${role.id}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8
    });
  });

  // SEO programmatic pages - Category only
  SEO_ROLES.forEach(role => {
    urls.push({
      url: `${BASE_URL}/seo/category/${role.id}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7
    });
  });

  // SEO programmatic pages - City only
  SEO_LOCATIONS.forEach(location => {
    urls.push({
      url: `${BASE_URL}/seo/city/${location.id}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7
    });
  });

  // SEO programmatic pages - Category + City combinations
  SEO_ROLES.forEach(role => {
    SEO_LOCATIONS.forEach(location => {
      urls.push({
        url: `${BASE_URL}/seo/${role.id}/${location.id}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8
      });
    });
  });

  // Existing artist pages
  SEO_ROLES.forEach(role => {
    urls.push({
      url: `${BASE_URL}/artists/${role.id}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7
    });
  });

  SEO_LOCATIONS.forEach(location => {
    urls.push({
      url: `${BASE_URL}/artists/cities/${location.id}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6
    });
  });

  SEO_ROLES.forEach(role => {
    SEO_LOCATIONS.forEach(location => {
      urls.push({
        url: `${BASE_URL}/artists/${role.id}/${location.id}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8
      });
    });
  });

  // Job category pages
  SEO_ROLES.forEach(role => {
    SEO_LOCATIONS.forEach(location => {
      urls.push({
        url: `${BASE_URL}/jobs/${role.id}/${location.id}`,
        lastModified: now,
        changeFrequency: 'daily',
        priority: 0.8
      });
    });
  });

  return urls.sort((a, b) => b.priority - a.priority);
}

/**
 * Generate XML sitemap content
 */
export function generateSitemapXml(entries: SitemapEntry[]): string {
  const urlElements = entries.map(entry => `
  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastModified}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
}

/**
 * Get comprehensive SEO statistics
 */
export function getSEOStats(): {
  totalPages: number;
  categoryPages: number;
  cityPages: number;
  categoryCityPages: number;
  artistPages: number;
  jobPages: number;
  staticPages: number;
} {
  const roleCount = SEO_ROLES.length;
  const locationCount = SEO_LOCATIONS.length;
  
  return {
    categoryPages: roleCount,
    cityPages: locationCount,
    categoryCityPages: roleCount * locationCount,
    artistPages: roleCount + locationCount + (roleCount * locationCount),
    jobPages: roleCount * locationCount,
    staticPages: 7,
    totalPages: 7 + (roleCount * 3) + (locationCount * 2) + (roleCount * locationCount * 3)
  };
}
