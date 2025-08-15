#!/usr/bin/env node

/**
 * Run EmviApp SEO Audit against production
 * Usage: node run-audit.mjs [--site=URL] [--out=DIR]
 */

import SEOAuditor from './audit-seo.mjs';
import SitemapValidator from './validate-sitemaps.mjs';
import fs from 'fs/promises';
import path from 'path';

const config = {
  site: process.argv.find(arg => arg.startsWith('--site='))?.split('=')[1] || 'https://www.emvi.app',
  output: process.argv.find(arg => arg.startsWith('--out='))?.split('=')[1] || './reports',
  maxDepth: parseInt(process.argv.find(arg => arg.startsWith('--maxDepth='))?.split('=')[1] || '3'),
  includeSitemaps: process.argv.includes('--includeSitemaps')
};

async function runFullAudit() {
  console.log('🚀 Starting EmviApp SEO Audit...');
  console.log(`📍 Target: ${config.site}`);
  console.log(`📁 Output: ${config.output}`);
  
  await fs.mkdir(config.output, { recursive: true });
  
  try {
    // 1. Run SEO Audit
    console.log('\n1️⃣ Running SEO audit...');
    process.env.AUDIT_URL = config.site;
    const seoAuditor = new SEOAuditor();
    await seoAuditor.run();
    
    // 2. Validate Sitemaps
    console.log('\n2️⃣ Validating sitemaps...');
    process.env.SITEMAP_BASE_URL = config.site;
    const sitemapValidator = new SitemapValidator();
    const sitemapReport = await sitemapValidator.run();
    
    // 3. Generate summary
    console.log('\n3️⃣ Generating audit summary...');
    const summary = {
      timestamp: new Date().toISOString(),
      site: config.site,
      seo: {
        pagesFound: seoAuditor.crawledUrls?.size || 0,
        brokenLinks: seoAuditor.brokenLinks?.length || 0,
        seoIssues: seoAuditor.seoIssues?.length || 0,
        structuredDataIssues: seoAuditor.structuredDataIssues?.length || 0
      },
      sitemap: {
        totalUrls: sitemapReport.summary.total,
        validUrls: sitemapReport.summary.valid,
        brokenUrls: sitemapReport.summary.broken,
        redirects: sitemapReport.summary.redirects,
        errors: sitemapReport.summary.errors
      },
      status: 'completed'
    };
    
    await fs.writeFile(
      path.join(config.output, 'audit-summary.json'),
      JSON.stringify(summary, null, 2)
    );
    
    // 4. Print results
    console.log('\n📊 Audit Results Summary:');
    console.log(`   SEO Issues: ${summary.seo.seoIssues}`);
    console.log(`   Broken Links: ${summary.seo.brokenLinks}`);
    console.log(`   Sitemap Broken URLs: ${summary.sitemap.brokenUrls}`);
    console.log(`   Pages Crawled: ${summary.seo.pagesFound}`);
    
    const hasIssues = summary.seo.brokenLinks > 0 || 
                     summary.sitemap.brokenUrls > 0 ||
                     summary.seo.seoIssues > 5;
    
    if (hasIssues) {
      console.log('\n🚨 Issues detected! Review reports for details.');
      process.exit(1);
    } else {
      console.log('\n✅ Audit passed! No critical issues detected.');
      process.exit(0);
    }
    
  } catch (error) {
    console.error('\n❌ Audit failed:', error.message);
    process.exit(1);
  }
}

runFullAudit();