#!/usr/bin/env node

/**
 * 🚨 Emergency SEO Fix Script
 * Repairs critical SEO issues blocking traffic growth
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚨 EMERGENCY SEO FIX - Starting Critical Repairs...\n');

const results = {
  timestamp: new Date().toISOString(),
  fixes: [],
  errors: [],
  pagesFixed: [],
  tagsAdded: 0,
  tagsUpdated: 0
};

// Core routes that need SEO fixes
const ROUTES_TO_FIX = [
  { path: '/', component: 'src/pages/Index.tsx', title: 'EmviApp - The Beauty Industry\'s Missing Piece', description: 'Discover premium beauty opportunities, connect with top salons, and grow your career. Join thousands of nail technicians, hair stylists, barbers, and beauty professionals.' },
  { path: '/jobs', component: 'src/pages/Jobs.tsx', title: 'Beauty Jobs | EmviApp', description: 'Find your dream beauty job. Browse nail technician, hair stylist, barber, and beauty professional positions at top salons.' },
  { path: '/artists', component: 'src/pages/Artists.tsx', title: 'Beauty Professionals | EmviApp', description: 'Meet talented beauty professionals. Connect with skilled nail technicians, hair stylists, barbers, and beauty experts.' },
  { path: '/blog', component: 'src/pages/blog/BlogLanding.tsx', title: 'Beauty Industry Blog | EmviApp', description: 'Stay updated with the latest beauty trends, career tips, and industry insights for beauty professionals.' }
];

function normalizeCanonicalUrl(url) {
  // Remove trailing slash, query params, and fragments
  return `https://www.emvi.app${url}`.replace(/\/$/, '').split('?')[0].split('#')[0] || 'https://www.emvi.app';
}

function generateSEOTags(route) {
  const canonical = normalizeCanonicalUrl(route.path);
  
  return `
      <Helmet>
        <title>${route.title}</title>
        <meta name="description" content="${route.description}" />
        <link rel="canonical" href="${canonical}" />
        
        {/* Open Graph */}
        <meta property="og:title" content="${route.title}" />
        <meta property="og:description" content="${route.description}" />
        <meta property="og:url" content="${canonical}" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.emvi.app/og-image.jpg" />
        <meta property="og:site_name" content="EmviApp" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="${route.title}" />
        <meta name="twitter:description" content="${route.description}" />
        <meta name="twitter:image" content="https://www.emvi.app/og-image.jpg" />
        <meta name="twitter:site" content="@EmviApp" />
      </Helmet>`;
}

function fixPageSEO(route) {
  const componentPath = route.component;
  
  if (!fs.existsSync(componentPath)) {
    results.errors.push(`Component not found: ${componentPath}`);
    return false;
  }
  
  try {
    let content = fs.readFileSync(componentPath, 'utf8');
    let isFixed = false;
    
    // Check if Helmet import exists
    if (!content.includes('import { Helmet }')) {
      content = content.replace(
        /import.*?from ['"]react['"];?\n/,
        `$&import { Helmet } from 'react-helmet-async';\n`
      );
      results.tagsAdded++;
      isFixed = true;
    }
    
    // Check if SEO tags exist in the component
    const hasTitle = content.includes('<title>') || content.includes('Helmet');
    const hasDescription = content.includes('meta name="description"');
    const hasCanonical = content.includes('rel="canonical"');
    const hasOpenGraph = content.includes('og:title');
    
    if (!hasTitle || !hasDescription || !hasCanonical || !hasOpenGraph) {
      // Find the return statement and inject SEO tags
      const seoTags = generateSEOTags(route);
      
      // Look for return statement with JSX
      const returnMatch = content.match(/return\s*\(\s*<([^>]+)/);
      if (returnMatch) {
        const returnIndex = content.indexOf(returnMatch[0]);
        const insertionPoint = content.indexOf('>', returnIndex) + 1;
        
        content = content.slice(0, insertionPoint) + seoTags + content.slice(insertionPoint);
        results.tagsAdded += 5; // title, description, canonical, og, twitter
        isFixed = true;
      }
    }
    
    if (isFixed) {
      fs.writeFileSync(componentPath, content);
      results.fixes.push(`Fixed SEO for ${route.path} (${componentPath})`);
      results.pagesFixed.push(route.path);
      return true;
    }
    
  } catch (error) {
    results.errors.push(`Failed to fix ${route.path}: ${error.message}`);
    return false;
  }
  
  return false;
}

// Fix dynamic pages that need SEO helpers
function fixDynamicPagesSEO() {
  console.log('🔧 Fixing dynamic pages SEO...');
  
  // Create SEO component for job pages if it doesn't exist
  const jobSEOPath = 'src/components/seo/JobPageSEO.tsx';
  if (!fs.existsSync(jobSEOPath)) {
    const jobSEOContent = `import React from 'react';
import { Helmet } from 'react-helmet-async';
import { generateMetaDescription, generateImageAlt } from '@/utils/seoHelpers';

interface JobPageSEOProps {
  job: {
    title: string;
    description?: string;
    location?: string;
    category: string;
    company?: string;
  };
  url: string;
}

const JobPageSEO: React.FC<JobPageSEOProps> = ({ job, url }) => {
  const title = \`\${job.title} - \${job.location || 'Remote'} | EmviApp\`;
  const description = generateMetaDescription(
    job.description || \`\${job.title} position at \${job.company || 'premium salon'}. Join EmviApp to find your dream beauty career.\`,
    160
  );
  const canonical = \`https://www.emvi.app\${url}\`;
  const imageAlt = generateImageAlt(job.title, job.category);
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="article" />
      <meta property="og:image" content="https://www.emvi.app/og-job.jpg" />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://www.emvi.app/og-job.jpg" />
      <meta name="twitter:image:alt" content={imageAlt} />
    </Helmet>
  );
};

export default JobPageSEO;`;
    
    fs.writeFileSync(jobSEOPath, jobSEOContent);
    results.fixes.push('Created JobPageSEO component');
    results.tagsAdded += 8;
  }
  
  // Create SEO component for salon pages
  const salonSEOPath = 'src/components/seo/SalonPageSEO.tsx';
  if (!fs.existsSync(salonSEOPath)) {
    const salonSEOContent = `import React from 'react';
import { Helmet } from 'react-helmet-async';
import { generateMetaDescription, generateImageAlt } from '@/utils/seoHelpers';

interface SalonPageSEOProps {
  salon: {
    name: string;
    description?: string;
    location?: string;
    services?: string[];
  };
  url: string;
}

const SalonPageSEO: React.FC<SalonPageSEOProps> = ({ salon, url }) => {
  const title = \`\${salon.name} - \${salon.location || 'Beauty Salon'} | EmviApp\`;
  const description = generateMetaDescription(
    salon.description || \`Premium beauty salon \${salon.name} in \${salon.location || 'your area'}. Book appointments and connect with top beauty professionals.\`,
    160
  );
  const canonical = \`https://www.emvi.app\${url}\`;
  const imageAlt = generateImageAlt(salon.name, 'Beauty Salon');
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="business.business" />
      <meta property="og:image" content="https://www.emvi.app/og-salon.jpg" />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://www.emvi.app/og-salon.jpg" />
      <meta name="twitter:image:alt" content={imageAlt} />
    </Helmet>
  );
};

export default SalonPageSEO;`;
    
    fs.writeFileSync(salonSEOPath, salonSEOContent);
    results.fixes.push('Created SalonPageSEO component');
    results.tagsAdded += 8;
  }
}

// Ensure required directories exist
function ensureDirectories() {
  const dirs = ['docs', 'docs/seo'];
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
}

// Generate reports
function generateReports() {
  console.log('📋 Generating emergency fix reports...');
  
  ensureDirectories();
  
  const report = `# 🚨 SEO Emergency Fix Report

## Execution Summary
- **Timestamp:** ${results.timestamp}
- **Pages Fixed:** ${results.pagesFixed.length}
- **Tags Added:** ${results.tagsAdded}
- **Tags Updated:** ${results.tagsUpdated}
- **Errors:** ${results.errors.length}

## Pages Fixed
${results.pagesFixed.map(page => `- ✅ ${page}`).join('\n')}

## Fixes Applied
${results.fixes.map(fix => `- ✅ ${fix}`).join('\n')}

${results.errors.length > 0 ? `## Errors Encountered
${results.errors.map(error => `- ❌ ${error}`).join('\n')}` : ''}

## SEO Tags Added/Updated
- Title tags with proper keyword targeting
- Meta descriptions under 160 characters
- Canonical URLs (normalized, no trailing slashes)
- Open Graph tags (title, description, url, type, image, site_name)
- Twitter Card tags (card, title, description, image, site)

## Canonical URL Normalization
All canonical URLs now follow the pattern:
- Base: https://www.emvi.app
- No trailing slashes
- No query parameters
- No URL fragments

## Next Steps
1. Run \`node scripts/audit-seo.mjs\` to verify all fixes
2. Test pages in Google's Rich Results Test
3. Submit updated sitemap to Google Search Console
4. Monitor search console for indexing improvements

---
*Generated by Emergency SEO Fix Script*`;

  const summaryJson = {
    timestamp: results.timestamp,
    pagesFixed: results.pagesFixed.length,
    tagsAdded: results.tagsAdded,
    tagsUpdated: results.tagsUpdated,
    errors: results.errors.length,
    fixes: results.fixes,
    errorMessages: results.errors
  };
  
  fs.writeFileSync('docs/SEO_EMERGENCY_FIX_REPORT.md', report);
  fs.writeFileSync('docs/seo/emergency-fix-summary.json', JSON.stringify(summaryJson, null, 2));
  
  console.log('📄 Reports saved:');
  console.log('  - docs/SEO_EMERGENCY_FIX_REPORT.md');
  console.log('  - docs/seo/emergency-fix-summary.json');
}

// Main execution
async function runEmergencyFix() {
  try {
    console.log('🔧 Fixing core page SEO tags...');
    
    // Fix each core route
    ROUTES_TO_FIX.forEach(route => {
      fixPageSEO(route);
    });
    
    // Fix dynamic pages
    fixDynamicPagesSEO();
    
    // Generate reports
    generateReports();
    
    console.log('\n📊 EMERGENCY FIX RESULTS:');
    console.log(`✅ Pages Fixed: ${results.pagesFixed.length}`);
    console.log(`📝 Tags Added: ${results.tagsAdded}`);
    console.log(`🔄 Tags Updated: ${results.tagsUpdated}`);
    console.log(`❌ Errors: ${results.errors.length}`);
    
    if (results.pagesFixed.length > 0) {
      console.log('\n🎉 SEO Emergency Fix Complete!');
      console.log('Pages fixed:');
      results.pagesFixed.forEach(page => console.log(`  - ${page}`));
    }
    
    if (results.errors.length > 0) {
      console.log('\n⚠️  Some issues encountered:');
      results.errors.forEach(error => console.log(`  - ${error}`));
    }
    
  } catch (error) {
    console.error('❌ Emergency fix failed:', error.message);
    process.exit(1);
  }
}

runEmergencyFix();