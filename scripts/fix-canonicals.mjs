#!/usr/bin/env node

/**
 * 🔗 Canonical URLs Auto-Fixer
 * Ensures all canonicals use https://www.emvi.app
 */

import fs from 'fs';
import { glob } from 'glob';
import path from 'path';

const CANONICAL_HOST = 'https://www.emvi.app';
const args = process.argv.slice(2);

let dryRun = true;
let siteUrl = CANONICAL_HOST;

for (const arg of args) {
  if (arg === '--dry-run=false') {
    dryRun = false;
  }
  if (arg.startsWith('--site=')) {
    siteUrl = arg.substring(7);
  }
}

console.log(`🔗 Canonical URLs Fixer (${dryRun ? 'DRY RUN' : 'LIVE MODE'})`);
console.log(`🎯 Target host: ${CANONICAL_HOST}`);

const results = {
  scanned: 0,
  issues_found: 0,
  fixed: 0,
  errors: []
};

const CANONICAL_PATTERNS = [
  // React/JSX patterns
  {
    pattern: /<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/gi,
    type: 'jsx_link'
  },
  {
    pattern: /<meta\s+property=["']og:url["']\s+content=["']([^"']+)["']/gi,
    type: 'og_url'
  },
  // BaseSEO component usage
  {
    pattern: /canonical=["']([^"']+)["']/gi,
    type: 'base_seo_prop'
  },
  // Direct canonical calls
  {
    pattern: /toAbs\(["']([^"']+)["']\)/gi,
    type: 'to_abs_call'
  }
];

function normalizeUrl(url) {
  if (!url) return null;
  
  // Remove any leading/trailing whitespace
  url = url.trim();
  
  // Handle relative URLs
  if (url.startsWith('/')) {
    return `${CANONICAL_HOST}${url}`;
  }
  
  // Handle protocol-relative URLs
  if (url.startsWith('//')) {
    return `https:${url}`;
  }
  
  // Handle wrong domains
  if (url.includes('emviapp.com') || url.match(/^https?:\/\/emvi\.app/)) {
    const path = url.replace(/^https?:\/\/[^\/]+/, '');
    return `${CANONICAL_HOST}${path}`;
  }
  
  // Handle bare domain
  if (url === 'emvi.app' || url === 'www.emvi.app') {
    return CANONICAL_HOST;
  }
  
  // If already correct, return as-is
  if (url.startsWith(CANONICAL_HOST)) {
    return url;
  }
  
  // For other external URLs, don't change
  if (url.startsWith('http')) {
    return null; // Don't fix external URLs
  }
  
  return `${CANONICAL_HOST}${url.startsWith('/') ? '' : '/'}${url}`;
}

async function scanFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let updatedContent = content;
    let fileHasIssues = false;
    
    for (const { pattern, type } of CANONICAL_PATTERNS) {
      const matches = [...content.matchAll(pattern)];
      
      for (const match of matches) {
        const fullMatch = match[0];
        const currentUrl = match[1];
        const normalizedUrl = normalizeUrl(currentUrl);
        
        if (normalizedUrl && normalizedUrl !== currentUrl) {
          fileHasIssues = true;
          results.issues_found++;
          
          console.log(`  🔍 ${type}: ${currentUrl} → ${normalizedUrl}`);
          
          if (!dryRun) {
            const fixedMatch = fullMatch.replace(currentUrl, normalizedUrl);
            updatedContent = updatedContent.replace(fullMatch, fixedMatch);
          }
        }
      }
    }
    
    // Write the file if we made changes
    if (!dryRun && fileHasIssues && updatedContent !== content) {
      fs.writeFileSync(filePath, updatedContent);
      results.fixed++;
      console.log(`  ✅ Fixed canonical URLs in ${filePath}`);
    }
    
    return fileHasIssues;
    
  } catch (error) {
    console.error(`  ❌ Error scanning ${filePath}:`, error.message);
    results.errors.push({ file: filePath, error: error.message });
    return false;
  }
}

async function checkSEOComponents() {
  console.log('\n🔍 Scanning SEO components...');
  
  const seoFiles = await glob('src/components/seo/**/*.{tsx,ts}');
  let totalIssues = 0;
  
  for (const file of seoFiles) {
    console.log(`📄 Checking ${file}...`);
    results.scanned++;
    
    const hasIssues = await scanFile(file);
    if (hasIssues) totalIssues++;
  }
  
  return totalIssues;
}

async function checkPageComponents() {
  console.log('\n🔍 Scanning page components...');
  
  const pageFiles = await glob('src/pages/**/*.{tsx,ts}', {
    ignore: ['**/auth/**', '**/__tests__/**']
  });
  
  let totalIssues = 0;
  
  for (const file of pageFiles) {
    console.log(`📄 Checking ${file}...`);
    results.scanned++;
    
    const hasIssues = await scanFile(file);
    if (hasIssues) totalIssues++;
  }
  
  return totalIssues;
}

async function checkConfigFiles() {
  console.log('\n🔍 Checking configuration files...');
  
  const configFiles = ['vercel.json', 'public/robots.txt'];
  
  for (const file of configFiles) {
    if (fs.existsSync(file)) {
      console.log(`📄 Checking ${file}...`);
      results.scanned++;
      await scanFile(file);
    }
  }
}

async function main() {
  console.log('🚀 Starting canonical URL audit...');
  
  const seoIssues = await checkSEOComponents();
  const pageIssues = await checkPageComponents();
  await checkConfigFiles();
  
  console.log('\n📊 Canonical URLs Summary:');
  console.log(`   Files Scanned: ${results.scanned}`);
  console.log(`   Issues Found: ${results.issues_found}`);
  console.log(`   Files Fixed: ${results.fixed}`);
  console.log(`   Errors: ${results.errors.length}`);
  
  if (results.issues_found > 0) {
    console.log(`\n⚠️ Found ${results.issues_found} canonical URL issues`);
    if (dryRun) {
      console.log('💡 Run with --dry-run=false to apply fixes');
    }
  } else {
    console.log('\n✅ All canonical URLs are properly formatted');
  }
  
  if (results.errors.length > 0) {
    console.log('\n❌ Errors encountered:');
    results.errors.forEach(error => {
      console.log(`   ${error.file}: ${error.error}`);
    });
  }
  
  // Output for automation
  if (results.issues_found > 0) {
    console.log(`\n${results.issues_found} issues found`);
  }
}

main();