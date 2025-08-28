#!/usr/bin/env node

// Script to update the static sitemap with all 150 programmatic artist pages
import fs from 'fs';
import path from 'path';

const SEO_ROLES = [
  { id: 'nails', name: 'Nail', pluralName: 'Nail Artists' },
  { id: 'hair', name: 'Hair', pluralName: 'Hair Stylists' },
  { id: 'barber', name: 'Barber', pluralName: 'Barbers' },
  { id: 'lashes', name: 'Lash', pluralName: 'Lash Artists' },
  { id: 'massage', name: 'Massage', pluralName: 'Massage Therapists' },
  { id: 'skincare', name: 'Skincare', pluralName: 'Estheticians' }
];

const SEO_LOCATIONS = [
  // Texas
  { id: 'houston-tx', city: 'Houston', state: 'TX', fullName: 'Houston, TX' },
  { id: 'dallas-tx', city: 'Dallas', state: 'TX', fullName: 'Dallas, TX' },
  { id: 'austin-tx', city: 'Austin', state: 'TX', fullName: 'Austin, TX' },
  { id: 'san-antonio-tx', city: 'San Antonio', state: 'TX', fullName: 'San Antonio, TX' },
  
  // Georgia & North Carolina
  { id: 'atlanta-ga', city: 'Atlanta', state: 'GA', fullName: 'Atlanta, GA' },
  { id: 'charlotte-nc', city: 'Charlotte', state: 'NC', fullName: 'Charlotte, NC' },
  { id: 'raleigh-nc', city: 'Raleigh', state: 'NC', fullName: 'Raleigh, NC' },
  
  // Florida
  { id: 'orlando-fl', city: 'Orlando', state: 'FL', fullName: 'Orlando, FL' },
  { id: 'tampa-fl', city: 'Tampa', state: 'FL', fullName: 'Tampa, FL' },
  { id: 'miami-fl', city: 'Miami', state: 'FL', fullName: 'Miami, FL' },
  { id: 'jacksonville-fl', city: 'Jacksonville', state: 'FL', fullName: 'Jacksonville, FL' },
  
  // West Coast
  { id: 'phoenix-az', city: 'Phoenix', state: 'AZ', fullName: 'Phoenix, AZ' },
  { id: 'las-vegas-nv', city: 'Las Vegas', state: 'NV', fullName: 'Las Vegas, NV' },
  { id: 'denver-co', city: 'Denver', state: 'CO', fullName: 'Denver, CO' },
  { id: 'seattle-wa', city: 'Seattle', state: 'WA', fullName: 'Seattle, WA' },
  { id: 'portland-or', city: 'Portland', state: 'OR', fullName: 'Portland, OR' },
  
  // Midwest & Northeast
  { id: 'chicago-il', city: 'Chicago', state: 'IL', fullName: 'Chicago, IL' },
  { id: 'detroit-mi', city: 'Detroit', state: 'MI', fullName: 'Detroit, MI' },
  { id: 'philadelphia-pa', city: 'Philadelphia', state: 'PA', fullName: 'Philadelphia, PA' },
  { id: 'boston-ma', city: 'Boston', state: 'MA', fullName: 'Boston, MA' },
  { id: 'new-york-ny', city: 'New York', state: 'NY', fullName: 'New York, NY' },
  
  // California
  { id: 'san-francisco-ca', city: 'San Francisco', state: 'CA', fullName: 'San Francisco, CA' },
  { id: 'los-angeles-ca', city: 'Los Angeles', state: 'CA', fullName: 'Los Angeles, CA' },
  { id: 'san-diego-ca', city: 'San Diego', state: 'CA', fullName: 'San Diego, CA' },
  { id: 'sacramento-ca', city: 'Sacramento', state: 'CA', fullName: 'Sacramento, CA' }
];

const BASE_URL = 'https://www.emvi.app';

function generateArtistUrls() {
  const urls = [];
  const today = new Date().toISOString().split('T')[0];
  
  for (const role of SEO_ROLES) {
    for (const location of SEO_LOCATIONS) {
      urls.push(`  <url>
    <loc>${BASE_URL}/artists/${role.id}/${location.id}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`);
    }
  }
  
  return urls;
}

// Static pages that should be in the sitemap
const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/jobs', priority: '0.9', changefreq: 'hourly' },
  { url: '/salons', priority: '0.9', changefreq: 'hourly' },
  { url: '/artists', priority: '0.8', changefreq: 'daily' },
  { url: '/nails', priority: '0.8', changefreq: 'daily' },
  { url: '/hair', priority: '0.8', changefreq: 'daily' },
  { url: '/barber', priority: '0.8', changefreq: 'daily' },
  { url: '/massage', priority: '0.8', changefreq: 'daily' },
  { url: '/makeup', priority: '0.8', changefreq: 'daily' },
  { url: '/skincare', priority: '0.8', changefreq: 'daily' },
  { url: '/tattoo', priority: '0.8', changefreq: 'daily' },
  { url: '/brows-lashes', priority: '0.8', changefreq: 'daily' },
  { url: '/about', priority: '0.6', changefreq: 'monthly' },
  { url: '/contact', priority: '0.6', changefreq: 'monthly' },
  { url: '/terms', priority: '0.3', changefreq: 'yearly' },
  { url: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { url: '/blog', priority: '0.7', changefreq: 'daily' },
];

function generateStaticUrls() {
  const today = new Date().toISOString().split('T')[0];
  
  return staticPages.map(page => `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`);
}

function generateSitemap() {
  const staticUrls = generateStaticUrls();
  const artistUrls = generateArtistUrls();
  
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...staticUrls,
    ...artistUrls,
    '</urlset>'
  ].join('\n');
  
  return xml;
}

// Generate and write the sitemap
const sitemapXml = generateSitemap();
const sitemapPath = path.join(process.cwd(), 'public', 'sitemap-static.xml');

fs.writeFileSync(sitemapPath, sitemapXml, 'utf8');

console.log(`✅ Updated static sitemap with ${SEO_ROLES.length * SEO_LOCATIONS.length} programmatic artist pages`);
console.log(`📍 Total URLs: ${staticPages.length + (SEO_ROLES.length * SEO_LOCATIONS.length)}`);
console.log(`📁 Saved to: ${sitemapPath}`);