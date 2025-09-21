#!/usr/bin/env node

/**
 * 🎯 Quick SEO Meta Description & H1 Audit
 * Validates EmviApp's programmatic pages for proper SEO optimization
 */

import { execSync } from 'child_process';
import fs from 'fs';

const AUDIT_RESULTS = {
  metaDescriptions: [],
  h1Tags: [],
  issues: [],
  fixed: [],
  totalPages: 0
};

const PROGRAMMATIC_URLS = [
  // Main role+city combinations (sample for testing)
  'https://www.emvi.app/seo/nails/houston-tx',
  'https://www.emvi.app/seo/hair/dallas-tx', 
  'https://www.emvi.app/seo/barber/austin-tx',
  'https://www.emvi.app/seo/massage/atlanta-ga',
  'https://www.emvi.app/jobs-in/houston-tx/nail-artist',
  'https://www.emvi.app/jobs-in/dallas-tx/hair-stylist',
  'https://www.emvi.app/salons-in/houston-tx/nail-salon',
  'https://www.emvi.app/seo/category/nails',
  'https://www.emvi.app/seo/city/houston-tx'
];

async function checkURL(url) {
  try {
    // Use curl to fetch the page
    const html = execSync(`curl -s "${url}"`, { encoding: 'utf8', timeout: 10000 });
    
    const analysis = {
      url,
      title: null,
      titleLength: 0,
      metaDescription: null,
      metaDescriptionLength: 0,
      h1Tags: [],
      issues: []
    };

    // Extract title
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    if (titleMatch) {
      analysis.title = titleMatch[1].trim();
      analysis.titleLength = analysis.title.length;
    } else {
      analysis.issues.push('Missing title tag');
    }

    // Extract meta description
    const metaDescMatch = html.match(/<meta[^>]+name=["\']description["\'][^>]+content=["\']([^"\']+)["\'][^>]*>/i);
    if (metaDescMatch) {
      analysis.metaDescription = metaDescMatch[1].trim();
      analysis.metaDescriptionLength = analysis.metaDescription.length;
    } else {
      analysis.issues.push('Missing meta description');
    }

    // Check meta description length
    if (analysis.metaDescriptionLength > 0) {
      if (analysis.metaDescriptionLength < 150) {
        analysis.issues.push(`Meta description too short: ${analysis.metaDescriptionLength} chars (need 150-160)`);
      } else if (analysis.metaDescriptionLength > 160) {
        analysis.issues.push(`Meta description too long: ${analysis.metaDescriptionLength} chars (need 150-160)`);
      } else {
        AUDIT_RESULTS.fixed.push(`✅ Meta description optimized: ${analysis.metaDescriptionLength} chars`);
      }
    }

    // Extract H1 tags
    const h1Matches = html.match(/<h1[^>]*>([^<]+)<\/h1>/gi);
    if (h1Matches) {
      analysis.h1Tags = h1Matches.map(h1 => {
        // Clean HTML tags and extract text
        return h1.replace(/<[^>]+>/g, '').trim();
      });
    }

    // Check H1 format for programmatic pages
    if (analysis.h1Tags.length === 0) {
      analysis.issues.push('Missing H1 tag');
    } else if (analysis.h1Tags.length > 1) {
      analysis.issues.push(`Multiple H1 tags found: ${analysis.h1Tags.length}`);
    } else {
      const h1Text = analysis.h1Tags[0];
      // Check if it follows the "Find the Best [Role] in [City, State] | EmviApp" format for role+city pages
      if (url.includes('/seo/') && url.split('/').length >= 5) {
        if (h1Text.includes('Find the Best') && h1Text.includes('| EmviApp')) {
          AUDIT_RESULTS.fixed.push(`✅ H1 format correct: "${h1Text}"`);
        } else {
          analysis.issues.push(`H1 format incorrect: "${h1Text}" (should be "Find the Best [Role] in [City, State] | EmviApp")`);
        }
      }
    }

    AUDIT_RESULTS.totalPages++;
    return analysis;
    
  } catch (error) {
    console.error(`Error checking ${url}:`, error.message);
    AUDIT_RESULTS.issues.push(`Failed to fetch ${url}: ${error.message}`);
    return null;
  }
}

async function runQuickAudit() {
  console.log('🔍 Running Quick SEO Audit for Programmatic Pages...\n');
  
  for (const url of PROGRAMMATIC_URLS) {
    console.log(`Checking: ${url}`);
    const result = await checkURL(url);
    
    if (result) {
      console.log(`  Title: ${result.title} (${result.titleLength} chars)`);
      console.log(`  Meta Description: ${result.metaDescription?.substring(0, 50)}... (${result.metaDescriptionLength} chars)`);
      console.log(`  H1: ${result.h1Tags.join(', ')}`);
      if (result.issues.length > 0) {
        console.log(`  Issues: ${result.issues.join(', ')}`);
        AUDIT_RESULTS.issues.push(...result.issues.map(issue => `${url}: ${issue}`));
      }
      console.log('');
    }
  }
  
  // Generate summary report
  console.log('📊 AUDIT SUMMARY:');
  console.log(`Total pages checked: ${AUDIT_RESULTS.totalPages}`);
  console.log(`Issues found: ${AUDIT_RESULTS.issues.length}`);
  console.log(`Optimizations confirmed: ${AUDIT_RESULTS.fixed.length}\n`);
  
  if (AUDIT_RESULTS.issues.length > 0) {
    console.log('🚨 ISSUES TO FIX:');
    AUDIT_RESULTS.issues.forEach((issue, i) => {
      console.log(`${i + 1}. ${issue}`);
    });
    console.log('');
  }
  
  if (AUDIT_RESULTS.fixed.length > 0) {
    console.log('✅ CONFIRMED OPTIMIZATIONS:');
    AUDIT_RESULTS.fixed.forEach((fix, i) => {
      console.log(`${i + 1}. ${fix}`);
    });
    console.log('');
  }
  
  // Save detailed report
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalPages: AUDIT_RESULTS.totalPages,
      issuesFound: AUDIT_RESULTS.issues.length,
      optimizationsConfirmed: AUDIT_RESULTS.fixed.length
    },
    issues: AUDIT_RESULTS.issues,
    fixed: AUDIT_RESULTS.fixed
  };
  
  if (!fs.existsSync('reports')) {
    fs.mkdirSync('reports');
  }
  
  fs.writeFileSync('reports/seo-quick-audit.json', JSON.stringify(report, null, 2));
  console.log('📄 Report saved to reports/seo-quick-audit.json');
  
  // Exit with error if critical issues found
  if (AUDIT_RESULTS.issues.length > 0) {
    console.log('\n❌ Audit failed: SEO issues detected');
    process.exit(1);
  } else {
    console.log('\n✅ Audit passed: All SEO elements optimized');
    process.exit(0);
  }
}

runQuickAudit().catch(error => {
  console.error('Audit failed:', error);
  process.exit(1);
});