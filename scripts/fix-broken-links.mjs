#!/usr/bin/env node

/**
 * 🔗 Broken Links Auto-Fixer
 * Automatically fixes internal broken links
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

const args = process.argv.slice(2);
let fixPlan = null;
let dryRun = true;

for (const arg of args) {
  if (arg.startsWith('--plan=')) {
    try {
      fixPlan = JSON.parse(arg.substring(7));
    } catch (error) {
      console.error('❌ Invalid JSON in --plan argument');
      process.exit(1);
    }
  }
  if (arg === '--dry-run=false') {
    dryRun = false;
  }
}

console.log(`🔗 Broken Links Fixer (${dryRun ? 'DRY RUN' : 'LIVE MODE'})`);

const results = {
  analyzed: 0,
  fixed: 0,
  redirects_added: 0,
  errors: []
};

async function findFilesWithBrokenLinks() {
  const files = await glob('src/**/*.{tsx,ts,jsx,js,md}', { 
    ignore: ['**/node_modules/**', '**/dist/**', '**/__tests__/**'] 
  });
  
  return files;
}

async function analyzeBrokenLink(brokenUrl, sourceUrl) {
  console.log(`🔍 Analyzing: ${brokenUrl} (from ${sourceUrl})`);
  
  // Parse the broken URL to understand the issue
  const url = new URL(brokenUrl, 'https://www.emvi.app');
  const pathname = url.pathname;
  
  // Common fix patterns
  const fixes = [
    // Fix double slashes
    {
      pattern: /\/\/+/g,
      replacement: '/',
      description: 'Remove double slashes'
    },
    // Fix common route misspellings
    {
      pattern: /\/artits\//g,
      replacement: '/artists/',
      description: 'Fix artists typo'
    },
    {
      pattern: /\/salon\//g,
      replacement: '/salons/',
      description: 'Fix salon -> salons'
    },
    // Fix case issues
    {
      pattern: /\/Jobs\//g,
      replacement: '/jobs/',
      description: 'Fix case'
    }
  ];
  
  let fixedUrl = pathname;
  let appliedFix = null;
  
  for (const fix of fixes) {
    if (fix.pattern.test(fixedUrl)) {
      fixedUrl = fixedUrl.replace(fix.pattern, fix.replacement);
      appliedFix = fix.description;
      break;
    }
  }
  
  return {
    original: pathname,
    fixed: fixedUrl,
    needsRedirect: fixedUrl !== pathname,
    appliedFix,
    confidence: appliedFix ? 'high' : 'low'
  };
}

async function updateFileLinks(filePath, originalUrl, fixedUrl) {
  if (dryRun) {
    console.log(`  📝 Would update ${filePath}: ${originalUrl} → ${fixedUrl}`);
    return;
  }
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace the broken URL with the fixed one
    const updated = content.replace(
      new RegExp(originalUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
      fixedUrl
    );
    
    if (updated !== content) {
      fs.writeFileSync(filePath, updated);
      console.log(`  ✅ Updated ${filePath}`);
      results.fixed++;
    }
    
  } catch (error) {
    console.error(`  ❌ Failed to update ${filePath}:`, error.message);
    results.errors.push({ file: filePath, error: error.message });
  }
}

async function addRedirect(fromPath, toPath) {
  const vercelConfigPath = 'vercel.json';
  
  if (dryRun) {
    console.log(`  🔄 Would add redirect: ${fromPath} → ${toPath}`);
    return;
  }
  
  try {
    let config = {};
    
    if (fs.existsSync(vercelConfigPath)) {
      config = JSON.parse(fs.readFileSync(vercelConfigPath, 'utf8'));
    }
    
    if (!config.redirects) {
      config.redirects = [];
    }
    
    // Check if redirect already exists
    const exists = config.redirects.some(r => 
      r.source === fromPath || r.destination === toPath
    );
    
    if (!exists) {
      config.redirects.push({
        source: fromPath,
        destination: toPath,
        permanent: true
      });
      
      fs.writeFileSync(vercelConfigPath, JSON.stringify(config, null, 2));
      console.log(`  ✅ Added redirect: ${fromPath} → ${toPath}`);
      results.redirects_added++;
    }
    
  } catch (error) {
    console.error(`  ❌ Failed to add redirect:`, error.message);
    results.errors.push({ redirect: `${fromPath} → ${toPath}`, error: error.message });
  }
}

async function main() {
  if (!fixPlan || !Array.isArray(fixPlan)) {
    console.error('❌ Invalid fix plan provided');
    process.exit(1);
  }
  
  console.log(`📊 Processing ${fixPlan.length} broken links...`);
  
  for (const issue of fixPlan) {
    if (issue.type !== 'broken_link') continue;
    
    results.analyzed++;
    
    try {
      const analysis = await analyzeBrokenLink(issue.url, issue.sourceUrl);
      
      if (analysis.needsRedirect && analysis.confidence === 'high') {
        // Add redirect for this broken URL
        await addRedirect(analysis.original, analysis.fixed);
        
        // Update any files that reference the broken URL
        const files = await findFilesWithBrokenLinks();
        for (const file of files) {
          const content = fs.readFileSync(file, 'utf8');
          if (content.includes(analysis.original)) {
            await updateFileLinks(file, analysis.original, analysis.fixed);
          }
        }
      } else if (analysis.confidence === 'low') {
        console.log(`  ⚠️ Low confidence fix for ${issue.url} - manual review needed`);
      }
      
    } catch (error) {
      console.error(`  ❌ Failed to process ${issue.url}:`, error.message);
      results.errors.push({ url: issue.url, error: error.message });
    }
  }
  
  // Summary
  console.log('\n📊 Broken Links Fix Summary:');
  console.log(`   Analyzed: ${results.analyzed}`);
  console.log(`   Files Updated: ${results.fixed}`);
  console.log(`   Redirects Added: ${results.redirects_added}`);
  console.log(`   Errors: ${results.errors.length}`);
  
  if (results.errors.length > 0) {
    console.log('\n❌ Errors encountered:');
    results.errors.forEach(error => {
      console.log(`   ${error.file || error.url || error.redirect}: ${error.error}`);
    });
  }
  
  // Return results for the main agent
  console.log(JSON.stringify(results));
}

main();