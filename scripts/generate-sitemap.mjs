#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get project root directory
const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

/**
 * Generate sitemap.xml for EmviApp
 */
function generateSitemap() {
  const baseUrl = 'https://emvi.app';
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Core static pages
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'daily', lastmod: currentDate },
    { url: '/jobs', priority: '0.9', changefreq: 'hourly', lastmod: currentDate },
    { url: '/salons', priority: '0.9', changefreq: 'hourly', lastmod: currentDate },
    { url: '/artists', priority: '0.8', changefreq: 'daily', lastmod: currentDate },
    { url: '/auth/signup', priority: '0.7', changefreq: 'weekly', lastmod: currentDate },
    { url: '/blog', priority: '0.8', changefreq: 'daily', lastmod: currentDate },
    { url: '/nails', priority: '0.8', changefreq: 'daily', lastmod: currentDate },
    { url: '/hair', priority: '0.8', changefreq: 'daily', lastmod: currentDate },
    { url: '/barber', priority: '0.8', changefreq: 'daily', lastmod: currentDate },
    { url: '/massage', priority: '0.8', changefreq: 'daily', lastmod: currentDate },
    { url: '/makeup', priority: '0.8', changefreq: 'daily', lastmod: currentDate },
    { url: '/skincare', priority: '0.8', changefreq: 'daily', lastmod: currentDate },
    { url: '/tattoo', priority: '0.8', changefreq: 'daily', lastmod: currentDate },
    { url: '/brows-lashes', priority: '0.8', changefreq: 'daily', lastmod: currentDate },
    { url: '/about', priority: '0.6', changefreq: 'monthly', lastmod: currentDate },
    { url: '/contact', priority: '0.6', changefreq: 'monthly', lastmod: currentDate },
    { url: '/terms', priority: '0.3', changefreq: 'yearly', lastmod: currentDate },
    { url: '/privacy', priority: '0.3', changefreq: 'yearly', lastmod: currentDate }
  ];

  // Blog posts from blogArticles.ts (simplified approach)
  const blogPosts = [
    { url: '/blog/salon-guide/los-angeles-nail-salon-guide', lastmod: '2025-09-14', priority: '0.8' },
    { url: '/blog/career-guide/become-lash-artist-2025', lastmod: '2025-09-14', priority: '0.8' },
    { url: '/blog/marketing/salon-marketing-facebook-instagram', lastmod: '2025-09-14', priority: '0.8' },
    { url: '/blog/career-guide/beauty-jobs-usa-2025', lastmod: '2025-09-14', priority: '0.8' },
    { url: '/blog/wedding-guide/wedding-hair-makeup-checklist', lastmod: '2025-09-14', priority: '0.8' },
    { url: '/blog/tim-viec-nail-california-bi-quyet-nguoi-viet', lastmod: '2025-01-23', priority: '0.7' },
    { url: '/blog/cach-sang-tiem-nail-houston-nhanh-duoc-gia', lastmod: '2025-01-23', priority: '0.7' },
    { url: '/blog/dang-tin-tuyen-tho-nail-mien-phi-emviapp', lastmod: '2025-01-23', priority: '0.7' },
    { url: '/blog/viec-nail-nguoi-viet-moi-sang-my-bat-dau', lastmod: '2025-01-23', priority: '0.7' },
    { url: '/blog/ung-dung-emviapp-ket-noi-nguoi-viet-nghe-nail', lastmod: '2025-01-23', priority: '0.7' }
  ];

  // Generate XML
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Add static pages
  staticPages.forEach(page => {
    xml += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  });

  // Add blog posts
  blogPosts.forEach(post => {
    xml += `
  <url>
    <loc>${baseUrl}${post.url}</loc>
    <lastmod>${post.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${post.priority}</priority>
  </url>`;
  });

  // Add programmatic jobs-in pages
  const programmaticRoles = ['nails', 'hair-stylist', 'barber', 'lash-artist', 'makeup-artist', 'esthetician'];
  const programmaticCities = ['los-angeles-ca', 'new-york-ny', 'chicago-il', 'houston-tx', 'phoenix-az'];
  
  programmaticCities.forEach(citySlug => {
    programmaticRoles.forEach(roleSlug => {
      // Jobs-in pages
      xml += `
  <url>
    <loc>${baseUrl}/jobs-in/${citySlug}/${roleSlug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
      
      // Salons-in pages  
      xml += `
  <url>
    <loc>${baseUrl}/salons-in/${citySlug}/${roleSlug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });
  });

  xml += `
</urlset>`;

  // Write sitemap.xml
  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml);
  console.log('✅ Generated sitemap.xml');
}

// Run the generator
try {
  generateSitemap();
} catch (error) {
  console.error('❌ Error generating sitemap:', error);
  process.exit(1);
}