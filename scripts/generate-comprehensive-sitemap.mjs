#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SEO data (replicated for standalone script)
const SEO_ROLES = [
  { id: 'nails', name: 'Nail Technician', pluralName: 'Nail Technicians' },
  { id: 'hair', name: 'Hair Stylist', pluralName: 'Hair Stylists' },
  { id: 'barber', name: 'Barber', pluralName: 'Barbers' },
  { id: 'massage', name: 'Massage Therapist', pluralName: 'Massage Therapists' },
  { id: 'makeup', name: 'Makeup Artist', pluralName: 'Makeup Artists' },
  { id: 'skincare', name: 'Esthetician', pluralName: 'Estheticians' },
  { id: 'tattoo', name: 'Tattoo Artist', pluralName: 'Tattoo Artists' },
  { id: 'brows-lashes', name: 'Brow & Lash Technician', pluralName: 'Brow & Lash Technicians' }
];

const SEO_LOCATIONS = [
  { id: 'new-york-ny', city: 'New York', state: 'NY', fullName: 'New York, NY' },
  { id: 'los-angeles-ca', city: 'Los Angeles', state: 'CA', fullName: 'Los Angeles, CA' },
  { id: 'chicago-il', city: 'Chicago', state: 'IL', fullName: 'Chicago, IL' },
  { id: 'houston-tx', city: 'Houston', state: 'TX', fullName: 'Houston, TX' },
  { id: 'phoenix-az', city: 'Phoenix', state: 'AZ', fullName: 'Phoenix, AZ' },
  { id: 'philadelphia-pa', city: 'Philadelphia', state: 'PA', fullName: 'Philadelphia, PA' },
  { id: 'san-antonio-tx', city: 'San Antonio', state: 'TX', fullName: 'San Antonio, TX' },
  { id: 'san-diego-ca', city: 'San Diego', state: 'CA', fullName: 'San Diego, CA' },
  { id: 'dallas-tx', city: 'Dallas', state: 'TX', fullName: 'Dallas, TX' },
  { id: 'austin-tx', city: 'Austin', state: 'TX', fullName: 'Austin, TX' },
  { id: 'san-francisco-ca', city: 'San Francisco', state: 'CA', fullName: 'San Francisco, CA' },
  { id: 'seattle-wa', city: 'Seattle', state: 'WA', fullName: 'Seattle, WA' },
  { id: 'denver-co', city: 'Denver', state: 'CO', fullName: 'Denver, CO' },
  { id: 'boston-ma', city: 'Boston', state: 'MA', fullName: 'Boston, MA' },
  { id: 'atlanta-ga', city: 'Atlanta', state: 'GA', fullName: 'Atlanta, GA' },
  { id: 'miami-fl', city: 'Miami', state: 'FL', fullName: 'Miami, FL' },
  { id: 'las-vegas-nv', city: 'Las Vegas', state: 'NV', fullName: 'Las Vegas, NV' },
  { id: 'portland-or', city: 'Portland', state: 'OR', fullName: 'Portland, OR' },
  { id: 'nashville-tn', city: 'Nashville', state: 'TN', fullName: 'Nashville, TN' },
  { id: 'charlotte-nc', city: 'Charlotte', state: 'NC', fullName: 'Charlotte, NC' }
];

const BASE_URL = 'https://www.emvi.app';
const now = new Date().toISOString();

function generateSitemapEntries() {
  const urls = [];

  // Core static pages (highest priority)
  const staticPages = [
    { path: '', priority: 1.0, freq: 'weekly' },
    { path: '/jobs', priority: 0.9, freq: 'daily' },
    { path: '/salons', priority: 0.9, freq: 'weekly' },
    { path: '/artists', priority: 0.9, freq: 'weekly' },
    { path: '/about', priority: 0.7, freq: 'monthly' },
    { path: '/contact', priority: 0.7, freq: 'monthly' },
    { path: '/post-job', priority: 0.8, freq: 'weekly' },
    { path: '/beauty-jobs', priority: 0.8, freq: 'weekly' },
    { path: '/hire-beauty-professionals', priority: 0.8, freq: 'weekly' },
    { path: '/for-salons', priority: 0.8, freq: 'weekly' },
    { path: '/for-artists', priority: 0.8, freq: 'weekly' }
  ];

  staticPages.forEach(page => {
    urls.push({
      url: `${BASE_URL}${page.path}`,
      lastModified: now,
      changeFrequency: page.freq,
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

  // Existing artist programmatic pages
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

function generateSitemapXml(entries) {
  const urlElements = entries.map(entry => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastModified}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
}

async function generateSitemap() {
  try {
    console.log('🚀 Generating comprehensive SEO sitemap...');
    
    const entries = generateSitemapEntries();
    const xml = generateSitemapXml(entries);
    
    // Ensure public directory exists
    const publicDir = path.join(__dirname, '..', 'public');
    await fs.mkdir(publicDir, { recursive: true });
    
    // Write sitemap
    const sitemapPath = path.join(publicDir, 'seo-sitemap.xml');
    await fs.writeFile(sitemapPath, xml, 'utf8');
    
    // Generate stats
    const stats = {
      totalUrls: entries.length,
      staticPages: entries.filter(e => e.priority >= 0.9).length,
      categoryPages: SEO_ROLES.length,
      cityPages: SEO_LOCATIONS.length,
      categoryCityPages: SEO_ROLES.length * SEO_LOCATIONS.length,
      artistPages: SEO_ROLES.length + SEO_LOCATIONS.length + (SEO_ROLES.length * SEO_LOCATIONS.length),
      jobPages: SEO_ROLES.length * SEO_LOCATIONS.length
    };
    
    console.log('\n✅ SEO Sitemap Generated Successfully!');
    console.log('📊 Statistics:');
    console.log(`   Total URLs: ${stats.totalUrls}`);
    console.log(`   Static Pages: ${stats.staticPages}`);
    console.log(`   Category Pages: ${stats.categoryPages}`);
    console.log(`   City Pages: ${stats.cityPages}`);
    console.log(`   Category+City Pages: ${stats.categoryCityPages}`);
    console.log(`   Artist Pages: ${stats.artistPages}`);
    console.log(`   Job Pages: ${stats.jobPages}`);
    console.log(`\n📁 Sitemap saved to: ${sitemapPath}`);
    console.log(`🌐 Sample URLs:`);
    console.log(`   ${entries[0]?.url}`);
    console.log(`   ${entries[1]?.url}`);
    console.log(`   ${entries[2]?.url}`);
    
    return stats;
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  generateSitemap();
}

export { generateSitemap, generateSitemapEntries, generateSitemapXml };
