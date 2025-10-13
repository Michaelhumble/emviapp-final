#!/usr/bin/env node

/**
 * Verify EmviApp Logo Update Across All SEO Components
 * 
 * This script checks that all logo references have been updated
 * from Lovable AI branding to EmviApp heart logo.
 * 
 * Usage: node scripts/verify-logo-update.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

// Colors for terminal output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

const EXPECTED_LOGO_URL = 'https://www.emvi.app/meta/emvi-heart-og.png';
const EXPECTED_FAVICON = '/emvi-heart-icon.png';

console.log(`${colors.blue}🔍 EmviApp Logo Update Verification${colors.reset}\n`);

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;
const issues = [];

function check(description, condition, details = '') {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`${colors.green}✅ ${description}${colors.reset}`);
  } else {
    failedChecks++;
    console.log(`${colors.red}❌ ${description}${colors.reset}`);
    if (details) {
      issues.push({ description, details });
    }
  }
}

// Check 1: Public assets exist
console.log(`${colors.blue}\n📁 Checking Public Assets...${colors.reset}`);

const requiredAssets = [
  'public/emvi-heart-icon.png',
  'public/emvi-heart-og.png',
  'public/meta/emvi-heart-icon.png',
  'public/meta/emvi-heart-og.png'
];

requiredAssets.forEach(asset => {
  const fullPath = path.join(rootDir, asset);
  check(
    `${asset} exists`,
    fs.existsSync(fullPath),
    `File not found at ${fullPath}`
  );
});

// Check 2: GlobalSEOSchemas.tsx uses correct logo
console.log(`${colors.blue}\n🏢 Checking Organization Schema...${colors.reset}`);

const globalSEOPath = path.join(rootDir, 'src/components/seo/GlobalSEOSchemas.tsx');
if (fs.existsSync(globalSEOPath)) {
  const content = fs.readFileSync(globalSEOPath, 'utf-8');
  check(
    'GlobalSEOSchemas.tsx uses EmviApp heart logo',
    content.includes(EXPECTED_LOGO_URL),
    `Expected logo URL: ${EXPECTED_LOGO_URL}`
  );
} else {
  check('GlobalSEOSchemas.tsx exists', false, 'File not found');
}

// Check 3: index.html uses correct favicon
console.log(`${colors.blue}\n🌐 Checking HTML Head Tags...${colors.reset}`);

const indexPath = path.join(rootDir, 'index.html');
if (fs.existsSync(indexPath)) {
  const content = fs.readFileSync(indexPath, 'utf-8');
  check(
    'index.html uses EmviApp heart favicon',
    content.includes(EXPECTED_FAVICON),
    `Expected favicon: ${EXPECTED_FAVICON}`
  );
  check(
    'index.html has apple-touch-icon',
    content.includes('apple-touch-icon'),
    'Missing apple-touch-icon link'
  );
} else {
  check('index.html exists', false, 'File not found');
}

// Check 4: robots.txt includes all sitemaps
console.log(`${colors.blue}\n🤖 Checking robots.txt...${colors.reset}`);

const robotsPath = path.join(rootDir, 'public/robots.txt');
if (fs.existsSync(robotsPath)) {
  const content = fs.readFileSync(robotsPath, 'utf-8');
  const requiredSitemaps = [
    'sitemap.xml',
    'sitemap-static.xml',
    'jobs-sitemap.xml',
    'salons-sitemap.xml',
    'artists-sitemap.xml',
    'city-sitemap.xml',
    'blog-sitemap.xml'
  ];
  
  requiredSitemaps.forEach(sitemap => {
    check(
      `robots.txt includes ${sitemap}`,
      content.includes(`Sitemap: https://www.emvi.app/${sitemap}`),
      `Missing sitemap reference: ${sitemap}`
    );
  });
} else {
  check('robots.txt exists', false, 'File not found');
}

// Check 5: Sitemap index file
console.log(`${colors.blue}\n🗺️  Checking Sitemap Index...${colors.reset}`);

const sitemapIndexPath = path.join(rootDir, 'public/sitemap.xml');
if (fs.existsSync(sitemapIndexPath)) {
  const content = fs.readFileSync(sitemapIndexPath, 'utf-8');
  check(
    'sitemap.xml is a valid sitemapindex',
    content.includes('<sitemapindex') && content.includes('</sitemapindex>'),
    'Not a valid sitemap index format'
  );
  
  const expectedSubsitemaps = [
    'sitemap-static.xml',
    'jobs-sitemap.xml',
    'salons-sitemap.xml',
    'artists-sitemap.xml',
    'city-sitemap.xml',
    'blog-sitemap.xml'
  ];
  
  expectedSubsitemaps.forEach(subsitemap => {
    check(
      `sitemap.xml includes ${subsitemap}`,
      content.includes(`https://www.emvi.app/${subsitemap}`),
      `Missing subsitemap: ${subsitemap}`
    );
  });
} else {
  check('sitemap.xml exists', false, 'File not found');
}

// Check 6: Scan SEO components for old logo references
console.log(`${colors.blue}\n🔍 Scanning SEO Components...${colors.reset}`);

const seoDir = path.join(rootDir, 'src/components/seo');
const oldLogoPatterns = [
  'lovable',
  'og-default.jpg',
  'android-chrome-512x512.png'
];

if (fs.existsSync(seoDir)) {
  const seoFiles = fs.readdirSync(seoDir).filter(f => f.endsWith('.tsx'));
  let foundOldReferences = false;
  
  seoFiles.forEach(file => {
    const filePath = path.join(seoDir, file);
    const content = fs.readFileSync(filePath, 'utf-8').toLowerCase();
    
    oldLogoPatterns.forEach(pattern => {
      if (content.includes(pattern.toLowerCase())) {
        foundOldReferences = true;
        issues.push({
          description: `${file} contains old logo reference`,
          details: `Found pattern: "${pattern}"`
        });
      }
    });
  });
  
  check(
    'No old logo references in SEO components',
    !foundOldReferences,
    'Found references to old Lovable branding or default images'
  );
} else {
  check('SEO components directory exists', false, 'Directory not found');
}

// Summary
console.log(`${colors.blue}\n📊 Verification Summary${colors.reset}`);
console.log(`${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
console.log(`Total Checks: ${totalChecks}`);
console.log(`${colors.green}Passed: ${passedChecks}${colors.reset}`);
console.log(`${colors.red}Failed: ${failedChecks}${colors.reset}`);

if (failedChecks > 0) {
  console.log(`${colors.yellow}\n⚠️  Issues Found:${colors.reset}`);
  issues.forEach((issue, index) => {
    console.log(`${colors.yellow}\n${index + 1}. ${issue.description}${colors.reset}`);
    console.log(`   ${issue.details}`);
  });
  
  console.log(`${colors.yellow}\n💡 Next Steps:${colors.reset}`);
  console.log('   1. Fix the issues listed above');
  console.log('   2. Run this script again to verify');
  console.log('   3. Deploy changes to production');
  console.log('   4. Follow the re-indexing guide: docs/seo/FORCE-REINDEX-GUIDE.md');
  
  process.exit(1);
} else {
  console.log(`${colors.green}\n✅ All Checks Passed!${colors.reset}`);
  console.log(`${colors.green}\n🎉 Logo update is complete and ready for production.${colors.reset}`);
  console.log(`\n${colors.blue}📖 Next: Force Google re-index${colors.reset}`);
  console.log('   Read: docs/seo/FORCE-REINDEX-GUIDE.md');
  console.log('   Manual: Submit sitemaps in Google Search Console');
  console.log('   API: Use existing pingSitemaps() function in codebase\n');
  
  process.exit(0);
}
