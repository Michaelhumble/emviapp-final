#!/usr/bin/env node

/**
 * 📋 JSON-LD Auto-Fixer
 * Ensures proper structured data across the site
 */

import fs from 'fs';
import { glob } from 'glob';

const args = process.argv.slice(2);
let dryRun = true;
let siteUrl = 'https://www.emvi.app';

for (const arg of args) {
  if (arg === '--dry-run=false') {
    dryRun = false;
  }
  if (arg.startsWith('--site=')) {
    siteUrl = arg.substring(7);
  }
}

console.log(`📋 JSON-LD Fixer (${dryRun ? 'DRY RUN' : 'LIVE MODE'})`);

const results = {
  scanned: 0,
  missing: 0,
  duplicates: 0,
  fixed: 0,
  errors: []
};

const SCHEMA_RULES = {
  job_detail: {
    pattern: /\/jobs\/[^\/]+$/,
    required: ['JobPosting'],
    forbidden: ['Article', 'WebPage']
  },
  blog_article: {
    pattern: /\/blog\/.+$/,
    required: ['Article', 'BreadcrumbList'],
    forbidden: ['JobPosting']
  },
  home_page: {
    pattern: /^\/$|^\/index$/,
    required: ['Organization', 'WebSite'],
    forbidden: []
  },
  listing_pages: {
    pattern: /^\/(jobs|artists|salons)$/,
    required: ['WebPage'],
    forbidden: ['JobPosting', 'Article']
  }
};

function detectPageType(filePath) {
  // Convert file path to likely URL pattern
  let urlPattern = filePath
    .replace(/^src\/pages\//, '/')
    .replace(/\.tsx?$/, '')
    .replace(/\/index$/, '')
    .replace(/\[([^\]]+)\]/g, 'placeholder');
  
  if (urlPattern === '') urlPattern = '/';
  
  for (const [type, rule] of Object.entries(SCHEMA_RULES)) {
    if (rule.pattern.test(urlPattern)) {
      return { type, rule, urlPattern };
    }
  }
  
  return null;
}

function extractJsonLd(content) {
  const jsonLdBlocks = [];
  const regex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/gis;
  
  let match;
  while ((match = regex.exec(content)) !== null) {
    try {
      const jsonData = JSON.parse(match[1]);
      jsonLdBlocks.push({
        raw: match[0],
        data: jsonData,
        type: jsonData['@type'] || 'Unknown'
      });
    } catch (error) {
      console.warn(`  ⚠️ Invalid JSON-LD found: ${error.message}`);
    }
  }
  
  return jsonLdBlocks;
}

function generateMissingJsonLd(pageType, rule, urlPattern) {
  const schemas = [];
  
  if (rule.required.includes('JobPosting')) {
    schemas.push({
      type: 'JobPosting',
      component: 'JobSEO',
      usage: `import JobSEO from '@/components/seo/JobSEO';\n// Add: <JobSEO job={job} />`
    });
  }
  
  if (rule.required.includes('Article')) {
    schemas.push({
      type: 'Article',
      component: 'BlogSEO',
      usage: `import BaseSEO from '@/components/seo/BaseSEO';\nimport { buildArticleJsonLd } from '@/components/seo/jsonld';\n// Add article JSON-LD`
    });
  }
  
  if (rule.required.includes('Organization')) {
    schemas.push({
      type: 'Organization',
      component: 'GlobalSEOInjection',
      usage: `import GlobalSEOInjection from '@/components/seo/GlobalSEOInjection';\n// Add: <GlobalSEOInjection />`
    });
  }
  
  return schemas;
}

async function scanPageFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const pageInfo = detectPageType(filePath);
    
    if (!pageInfo) {
      return; // Skip files that don't match our patterns
    }
    
    const { type, rule } = pageInfo;
    const existingJsonLd = extractJsonLd(content);
    const existingTypes = existingJsonLd.map(block => block.type);
    
    console.log(`📄 ${filePath} (${type})`);
    console.log(`   Current JSON-LD: ${existingTypes.join(', ') || 'None'}`);
    
    // Check for missing required schemas
    const missingSchemas = rule.required.filter(schema => !existingTypes.includes(schema));
    if (missingSchemas.length > 0) {
      results.missing++;
      console.log(`   ❌ Missing: ${missingSchemas.join(', ')}`);
      
      const suggestions = generateMissingJsonLd(type, rule, pageInfo.urlPattern);
      suggestions.forEach(suggestion => {
        console.log(`   💡 Add ${suggestion.type}: ${suggestion.usage}`);
      });
    }
    
    // Check for forbidden schemas
    const forbiddenPresent = existingTypes.filter(type => rule.forbidden.includes(type));
    if (forbiddenPresent.length > 0) {
      results.duplicates++;
      console.log(`   ⚠️ Forbidden schemas present: ${forbiddenPresent.join(', ')}`);
    }
    
    // Check for duplicates
    const duplicates = existingTypes.filter((type, index) => existingTypes.indexOf(type) !== index);
    if (duplicates.length > 0) {
      results.duplicates++;
      console.log(`   🔄 Duplicate schemas: ${duplicates.join(', ')}`);
    }
    
    if (missingSchemas.length === 0 && forbiddenPresent.length === 0 && duplicates.length === 0) {
      console.log(`   ✅ JSON-LD correct`);
    }
    
  } catch (error) {
    console.error(`  ❌ Error scanning ${filePath}:`, error.message);
    results.errors.push({ file: filePath, error: error.message });
  }
}

async function checkSEOComponents() {
  console.log('\n🔍 Checking SEO components for proper JSON-LD...');
  
  const seoFiles = await glob('src/components/seo/**/*.{tsx,ts}');
  
  for (const file of seoFiles) {
    results.scanned++;
    
    try {
      const content = fs.readFileSync(file, 'utf8');
      
      // Check for proper JSON-LD builder usage
      if (file.includes('JobSEO') && !content.includes('buildJobPostingJsonLd')) {
        console.log(`⚠️ ${file}: Missing JobPosting JSON-LD builder`);
        results.missing++;
      }
      
      if (file.includes('BaseSEO') && content.includes('jsonLd') && !content.includes('JSON.stringify')) {
        console.log(`✅ ${file}: Proper JSON-LD handling`);
      }
      
    } catch (error) {
      results.errors.push({ file, error: error.message });
    }
  }
}

async function checkPageFiles() {
  console.log('\n🔍 Scanning page files for JSON-LD compliance...');
  
  const pageFiles = await glob('src/pages/**/*.{tsx,ts}', {
    ignore: ['**/auth/**', '**/__tests__/**']
  });
  
  for (const file of pageFiles) {
    results.scanned++;
    await scanPageFile(file);
  }
}

async function main() {
  console.log('🚀 Starting JSON-LD audit...');
  
  await checkSEOComponents();
  await checkPageFiles();
  
  console.log('\n📊 JSON-LD Summary:');
  console.log(`   Files Scanned: ${results.scanned}`);
  console.log(`   Missing Schemas: ${results.missing}`);
  console.log(`   Duplicate/Forbidden: ${results.duplicates}`);
  console.log(`   Errors: ${results.errors.length}`);
  
  if (results.missing > 0) {
    console.log(`\n⚠️ Found ${results.missing} pages missing required JSON-LD`);
    console.log('💡 Review the suggestions above to add proper structured data');
  }
  
  if (results.duplicates > 0) {
    console.log(`\n🔄 Found ${results.duplicates} pages with duplicate/forbidden schemas`);
    console.log('💡 Remove duplicate JSON-LD blocks or move to appropriate pages');
  }
  
  if (results.missing === 0 && results.duplicates === 0) {
    console.log('\n✅ All JSON-LD schemas are properly implemented');
  }
  
  if (results.errors.length > 0) {
    console.log('\n❌ Errors encountered:');
    results.errors.forEach(error => {
      console.log(`   ${error.file}: ${error.error}`);
    });
  }
  
  // Output for automation
  if (results.missing > 0 || results.duplicates > 0) {
    console.log(`\nmissing: ${results.missing}, duplicates: ${results.duplicates}`);
  }
}

main();