#!/usr/bin/env node

/**
 * 🚀 Generate Static Programmatic Landing Pages for Vite SPA
 * Creates 25k+ static HTML files for jobs-in and salons-in pages
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Import data (would need to be adjusted for actual import)
const roles = [
  'nails', 'hair-stylist', 'barber', 'lash-artist', 'makeup-artist', 'esthetician'
]; // Subset for initial implementation

const cities = [
  { slug: 'los-angeles-ca', city: 'Los Angeles', state: 'CA' },
  { slug: 'new-york-ny', city: 'New York', state: 'NY' },
  { slug: 'chicago-il', city: 'Chicago', state: 'IL' },
  { slug: 'houston-tx', city: 'Houston', state: 'TX' },
  { slug: 'phoenix-az', city: 'Phoenix', state: 'AZ' }
]; // Subset for initial implementation

const generateHTML = (roleSlug, citySlug, city, pageType) => {
  const title = pageType === 'jobs' 
    ? `${roleSlug.replace('-', ' ')} Jobs in ${city.city}, ${city.state}` 
    : `Find ${roleSlug.replace('-', ' ')} Salons in ${city.city}, ${city.state}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | EmviApp</title>
  <meta name="description" content="Find premium ${roleSlug.replace('-', ' ')} ${pageType} in ${city.city}, ${city.state}. Browse high-paying opportunities at top salons and spas.">
  <link rel="canonical" href="https://www.emvi.app/${pageType}-in/${citySlug}/${roleSlug}">
  <script>
    // Redirect to main app with parameters
    window.location.href = '/#/${pageType}?role=${roleSlug}&city=${citySlug}';
  </script>
</head>
<body>
  <div id="root">
    <div style="text-align: center; padding: 50px;">
      <h1>${title}</h1>
      <p>Redirecting to EmviApp...</p>
      <a href="/#/${pageType}?role=${roleSlug}&city=${citySlug}">Click here if not redirected</a>
    </div>
  </div>
</body>
</html>`;
};

async function generateProgrammaticPages() {
  console.log('🚀 Generating programmatic landing pages...');
  
  const publicDir = path.join(__dirname, '../public');
  let totalPages = 0;

  for (const pageType of ['jobs', 'salons']) {
    for (const city of cities) {
      for (const roleSlug of roles) {
        const dirPath = path.join(publicDir, `${pageType}-in`, city.slug, roleSlug);
        await fs.mkdir(dirPath, { recursive: true });
        
        const html = generateHTML(roleSlug, city.slug, city, pageType);
        await fs.writeFile(path.join(dirPath, 'index.html'), html);
        totalPages++;
      }
    }
  }

  console.log(`✅ Generated ${totalPages} programmatic landing pages`);
  console.log(`📁 Pages created in /public/${pageType}-in/ directories`);
}

generateProgrammaticPages().catch(console.error);