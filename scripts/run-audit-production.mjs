#!/usr/bin/env node

/**
 * Production SEO + Broken Links Audit Runner
 * Runs all audits and generates comprehensive reports
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://www.emvi.app';
const REPORTS_DIR = 'reports';

// Ensure reports directory exists
if (!fs.existsSync(REPORTS_DIR)) {
  fs.mkdirSync(REPORTS_DIR, { recursive: true });
}

console.log('🔍 Running production SEO + Broken Links audit...');
console.log(`📍 Site: ${SITE_URL}`);
console.log(`📁 Reports: ${REPORTS_DIR}/`);

try {
  // Run main SEO audit
  console.log('\n1️⃣ Running SEO audit...');
  execSync(`node scripts/audit-seo.mjs --site=${SITE_URL} --out=${REPORTS_DIR} --maxDepth=6 --includeSitemaps`, {
    stdio: 'inherit'
  });

  // Run sitemap validation
  console.log('\n2️⃣ Validating sitemaps...');
  execSync(`node scripts/validate-sitemaps.mjs --site=${SITE_URL}/sitemap.xml --out=${REPORTS_DIR}`, {
    stdio: 'inherit'
  });

  // Run GSC pulls (if available)
  if (fs.existsSync('scripts/gsc-pulls.mjs')) {
    console.log('\n3️⃣ Pulling GSC data...');
    try {
      execSync(`node scripts/gsc-pulls.mjs --out=${REPORTS_DIR}`, {
        stdio: 'inherit'
      });
    } catch (error) {
      console.warn('⚠️ GSC pull failed (API key may not be configured)');
    }
  }

  // Run internal links analysis
  if (fs.existsSync('scripts/internal-links-suggest.mjs')) {
    console.log('\n4️⃣ Analyzing internal links...');
    try {
      execSync(`node scripts/internal-links-suggest.mjs --site=${SITE_URL} --out=${REPORTS_DIR}`, {
        stdio: 'inherit'
      });
    } catch (error) {
      console.warn('⚠️ Internal links analysis failed');
    }
  }

  console.log('\n✅ Audit complete! Check reports/ directory');
  console.log('📁 Generated files:');
  
  // List generated files
  const files = fs.readdirSync(REPORTS_DIR).filter(file => 
    file.endsWith('.html') || file.endsWith('.csv') || file.endsWith('.json')
  );
  
  files.forEach(file => {
    const fullPath = path.join(REPORTS_DIR, file);
    const stats = fs.statSync(fullPath);
    console.log(`   📄 ${file} (${Math.round(stats.size / 1024)}KB)`);
  });

  // Show broken links summary if available
  const brokenLinksFile = path.join(REPORTS_DIR, 'broken-links.csv');
  if (fs.existsSync(brokenLinksFile)) {
    const content = fs.readFileSync(brokenLinksFile, 'utf8');
    const lines = content.split('\n').filter(line => line.trim());
    const internalBroken = lines.filter(line => 
      line.includes('emvi.app') && !line.includes('Status Code,URL')
    );
    
    console.log(`\n🔗 Broken Links Summary: ${internalBroken.length} internal broken links`);
    if (internalBroken.length > 0) {
      console.log('❌ CRITICAL: Fix these internal broken links first:');
      internalBroken.slice(0, 5).forEach(line => {
        const [, url] = line.split(',');
        console.log(`   ${url}`);
      });
      if (internalBroken.length > 5) {
        console.log(`   ... and ${internalBroken.length - 5} more`);
      }
    }
  }

} catch (error) {
  console.error('❌ Audit failed:', error.message);
  process.exit(1);
}