#!/usr/bin/env node

/**
 * 🗺️ Sitemap Auto-Fixer
 * Removes 3xx/4xx/5xx URLs from sitemaps
 */

import fs from 'fs';
import path from 'path';
import { XMLParser, XMLBuilder } from 'fast-xml-parser';

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

console.log(`🗺️ Sitemap Fixer (${dryRun ? 'DRY RUN' : 'LIVE MODE'})`);

const results = {
  sitemaps_processed: 0,
  urls_checked: 0,
  urls_removed: 0,
  errors: []
};

const xmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_'
});

const xmlBuilder = new XMLBuilder({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  format: true
});

async function checkUrlStatus(url) {
  try {
    const response = await fetch(url, {
      method: 'HEAD',
      timeout: 5000
    });
    return response.status;
  } catch (error) {
    console.warn(`  ⚠️ Could not check ${url}: ${error.message}`);
    return 500; // Treat unreachable URLs as errors
  }
}

async function processSitemap(sitemapPath) {
  console.log(`📄 Processing ${sitemapPath}...`);
  
  if (!fs.existsSync(sitemapPath)) {
    console.log(`  ⚠️ File not found: ${sitemapPath}`);
    return;
  }
  
  try {
    const content = fs.readFileSync(sitemapPath, 'utf8');
    const parsed = xmlParser.parse(content);
    
    let urls = [];
    let modified = false;
    
    // Handle different sitemap formats
    if (parsed.urlset && parsed.urlset.url) {
      urls = Array.isArray(parsed.urlset.url) ? parsed.urlset.url : [parsed.urlset.url];
    } else if (parsed.sitemapindex && parsed.sitemapindex.sitemap) {
      // This is a sitemap index - check sub-sitemaps
      const sitemaps = Array.isArray(parsed.sitemapindex.sitemap) 
        ? parsed.sitemapindex.sitemap 
        : [parsed.sitemapindex.sitemap];
      
      for (const sitemap of sitemaps) {
        const subSitemapUrl = sitemap.loc;
        if (subSitemapUrl) {
          const status = await checkUrlStatus(subSitemapUrl);
          results.urls_checked++;
          
          if (status >= 300) {
            console.log(`  ❌ Sub-sitemap returns ${status}: ${subSitemapUrl}`);
            // Would remove from index
            modified = true;
            results.urls_removed++;
          }
        }
      }
      
      return; // Skip URL checking for index files
    }
    
    if (urls.length === 0) {
      console.log(`  ℹ️ No URLs found in sitemap`);
      return;
    }
    
    console.log(`  🔍 Checking ${urls.length} URLs...`);
    
    const validUrls = [];
    
    for (const urlEntry of urls) {
      const url = urlEntry.loc;
      if (!url) continue;
      
      results.urls_checked++;
      
      // Check URL status
      const status = await checkUrlStatus(url);
      
      if (status >= 200 && status < 300) {
        validUrls.push(urlEntry);
      } else {
        console.log(`  ❌ Removing ${status}: ${url}`);
        modified = true;
        results.urls_removed++;
      }
      
      // Add small delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Update the sitemap if we removed URLs
    if (modified && !dryRun) {
      if (parsed.urlset) {
        parsed.urlset.url = validUrls;
      }
      
      const updatedXml = xmlBuilder.build(parsed);
      fs.writeFileSync(sitemapPath, updatedXml);
      console.log(`  ✅ Updated sitemap with ${validUrls.length} valid URLs`);
    } else if (modified) {
      console.log(`  📝 Would update sitemap with ${validUrls.length} valid URLs`);
    } else {
      console.log(`  ✅ Sitemap is clean`);
    }
    
    results.sitemaps_processed++;
    
  } catch (error) {
    console.error(`  ❌ Error processing ${sitemapPath}:`, error.message);
    results.errors.push({ file: sitemapPath, error: error.message });
  }
}

async function findSitemaps() {
  const sitemapFiles = [];
  
  // Check common sitemap locations
  const commonPaths = [
    'public/sitemap.xml',
    'public/sitemap-index.xml',
    'public/jobs-sitemap.xml',
    'public/blog-sitemap.xml',
    'public/artists-sitemap.xml',
    'public/salons-sitemap.xml'
  ];
  
  for (const path of commonPaths) {
    if (fs.existsSync(path)) {
      sitemapFiles.push(path);
    }
  }
  
  // Also check for generated sitemaps in other locations
  try {
    const publicFiles = fs.readdirSync('public');
    for (const file of publicFiles) {
      if (file.endsWith('-sitemap.xml') && !sitemapFiles.includes(`public/${file}`)) {
        sitemapFiles.push(`public/${file}`);
      }
    }
  } catch (error) {
    console.warn('Could not scan public directory');
  }
  
  return sitemapFiles;
}

async function validateRobotsTxt() {
  console.log('\n🤖 Checking robots.txt for sitemap references...');
  
  const robotsPath = 'public/robots.txt';
  if (!fs.existsSync(robotsPath)) {
    console.log('  ⚠️ robots.txt not found');
    return;
  }
  
  const content = fs.readFileSync(robotsPath, 'utf8');
  const sitemapLines = content.split('\n').filter(line => 
    line.toLowerCase().startsWith('sitemap:')
  );
  
  console.log(`  📋 Found ${sitemapLines.length} sitemap references in robots.txt`);
  
  for (const line of sitemapLines) {
    const url = line.split(':', 2)[1]?.trim();
    if (url) {
      const status = await checkUrlStatus(url);
      if (status >= 300) {
        console.log(`  ❌ robots.txt references broken sitemap (${status}): ${url}`);
      } else {
        console.log(`  ✅ Valid sitemap reference: ${url}`);
      }
    }
  }
}

async function main() {
  console.log('🚀 Starting sitemap cleanup...');
  
  const sitemaps = await findSitemaps();
  
  if (sitemaps.length === 0) {
    console.log('⚠️ No sitemaps found to process');
    return;
  }
  
  console.log(`📋 Found ${sitemaps.length} sitemaps to process`);
  
  for (const sitemap of sitemaps) {
    await processSitemap(sitemap);
  }
  
  await validateRobotsTxt();
  
  console.log('\n📊 Sitemap Cleanup Summary:');
  console.log(`   Sitemaps Processed: ${results.sitemaps_processed}`);
  console.log(`   URLs Checked: ${results.urls_checked}`);
  console.log(`   URLs Removed: ${results.urls_removed}`);
  console.log(`   Errors: ${results.errors.length}`);
  
  if (results.urls_removed > 0) {
    console.log(`\n🗑️ Removed ${results.urls_removed} broken URLs from sitemaps`);
    if (dryRun) {
      console.log('💡 Run with --dry-run=false to apply changes');
    }
  } else {
    console.log('\n✅ All sitemap URLs are valid');
  }
  
  if (results.errors.length > 0) {
    console.log('\n❌ Errors encountered:');
    results.errors.forEach(error => {
      console.log(`   ${error.file}: ${error.error}`);
    });
  }
}

main();