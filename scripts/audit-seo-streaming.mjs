#!/usr/bin/env node

/**
 * 🔍 Streaming SEO Audit Script (ENOBUFS-proof)
 * Uses streaming spawn with low concurrency to avoid buffer overflows
 */

import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import { createWriteStream, statSync, readFileSync } from 'node:fs';
import path from 'node:path';
import https from 'https';
import { URL } from 'url';
import pLimit from 'p-limit';

const SITE_URL = process.env.AUDIT_URL || 'https://www.emvi.app';
const REPORTS_DIR = 'reports';

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

const toAbsolute = (u) => {
  try {
    if (/^https?:\/\//i.test(u)) return new URL(u).toString();
    return new URL(u, 'https://www.emvi.app/').toString();
  } catch { return u; }
};

const waitForStable = async (p) => {
  let size=-1, same=0;
  for (let i=0;i<10;i++){
    try {
      const s = statSync(p).size;
      if (s===size) { same++; if (same>=2) break; }
      else { same=0; size=s; }
    } catch {}
    await new Promise(r=>setTimeout(r,150));
  }
};

// Low concurrency to avoid ENOBUFS - set to 1 for stability
const limit = pLimit(1);

// Check for single URL mode
const singleUrlIndex = process.argv.indexOf('--url');
const singleUrl = singleUrlIndex !== -1 ? process.argv[singleUrlIndex + 1] : null;

// Key pages to audit - focused on core landing pages
const defaultUrls = [
  '/',
  '/blog', 
  '/press',
  '/jobs',
  '/salons',
  '/artists'
];

// Set up URLs to audit
const pagesToAudit = singleUrl ? [singleUrl] : defaultUrls.map(toAbsolute);

if (singleUrl) {
  console.log(`🎯 Single URL mode: auditing ${singleUrl}`);
}

const auditResults = {
  timestamp: new Date().toISOString(),
  site: SITE_URL,
  pages: {},
  lighthouse: {},
  summary: {
    total: 0,
    passed: 0,
    warnings: 0,
    errors: 0,
    lighthouse_passed: 0
  },
  issues: []
};

// Ensure reports directory exists
await fs.mkdir(REPORTS_DIR, { recursive: true });

console.log(`🔍 Starting streaming SEO Audit for ${SITE_URL}`);

async function runLighthouse(url, outPath) {
  console.log("🚀 Lighthouse auditing:", url);
  
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  
  const args = [
    url,
    '--output=json',
    `--output-path=${outPath}`,
    '--quiet',
    '--only-categories=performance,seo',
    '--preset=desktop',
    '--emulated-form-factor=desktop',
    '--max-wait-for-load=60000',
    '--chrome-flags=--headless=new --no-sandbox --disable-gpu --disable-storage-reset --disable-storage-quota-enforcement'
  ];

  return new Promise(async (resolve, reject) => {
    const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
    const ps = spawn(npx, ['lighthouse', ...args], { 
      stdio: ['ignore', 'pipe', 'pipe'] 
    });

    let stderrOutput = '';
    
    ps.stderr.on('data', (data) => {
      const output = data.toString();
      stderrOutput += output;
      
      // Filter out common Puppeteer/Target errors but show other errors
      if (!output.includes('Target.closeTarget') && 
          !output.includes('Session closed') && 
          !output.includes('Page.enable') && 
          !output.includes('Protocol error')) {
        process.stderr.write(data);
      }
    });
    
    ps.on('close', async (code) => {
      // Accept success or common Puppeteer errors as success if report was written
      const isPuppeteerError = stderrOutput.includes('Target.closeTarget') || 
                              stderrOutput.includes('Session closed') || 
                              stderrOutput.includes('Page.enable') ||
                              stderrOutput.includes('Protocol error');
      
      if (code === 0 || (code !== 0 && isPuppeteerError)) {
        // Wait for file to be stable
        await waitForStable(outPath);
        
        // Validate JSON
        try {
          const json = JSON.parse(readFileSync(outPath, 'utf8'));
          console.log(`  ✅ Lighthouse completed: ${url}`);
          resolve();
        } catch (parseError) {
          console.log(`  ❌ Lighthouse JSON parse error for ${url}: ${parseError.message}`);
          reject(new Error(`JSON parse error: ${parseError.message}`));
        }
      } else {
        console.log(`  ❌ Lighthouse failed (${code}): ${url}`);
        reject(new Error(`lighthouse exited ${code}`));
      }
    });
  });
}

async function runWithRetry(url, tries = 2) {
  const outPath = path.join(REPORTS_DIR, `lighthouse-${encodeURIComponent(url)}.json`);
  
  for (let i = 0; i < tries; i++) {
    try {
      await runLighthouse(url, outPath);
      
      // Parse results if successful
      try {
        const reportData = JSON.parse(await fs.readFile(outPath, 'utf8'));
        const scores = {
          performance: Math.round(reportData.lhr.categories.performance.score * 100),
          seo: Math.round(reportData.lhr.categories.seo.score * 100)
        };
        
        auditResults.lighthouse[url] = {
          ...scores,
          reportFile: outPath,
          timestamp: new Date().toISOString()
        };
        
        if (scores.performance >= 90 && scores.seo >= 90) {
          auditResults.summary.lighthouse_passed++;
        }
        
        console.log(`  📊 ${url}: Performance ${scores.performance}%, SEO ${scores.seo}%`);
        
      } catch (parseError) {
        console.error(`  ❌ Failed to parse Lighthouse report for ${url}`);
      }
      
      return;
      
    } catch (e) { 
      // Handle transient Puppeteer errors gracefully
      const isPuppeteerError = e.message && (
        e.message.includes('Target.closeTarget') ||
        e.message.includes('Session closed') ||
        e.message.includes('Page.enable') ||
        e.message.includes('Protocol error')
      );
      
      if (isPuppeteerError && i === tries - 1) {
        console.log(`  ⚠️ Puppeteer error for ${url}, continuing audit: ${e.message}`);
        return; // Don't abort whole audit for transient errors
      }
      
      if (i === tries - 1) throw e;
      console.log(`  ⚠️ Retry ${i + 1} for ${url}`);
    } finally {
      await sleep(1000);
    }
  }
}

async function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'EmviApp-SEO-Auditor/1.0'
      }
    }, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          html: data
        });
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

function analyzeHTML(html, url) {
  const analysis = {
    title: null,
    titleLength: 0,
    metaDescription: null,
    metaDescriptionLength: 0,
    h1Tags: [],
    canonicalUrl: null,
    ogTags: {},
    jsonLd: [],
    internalLinks: 0,
    externalLinks: 0,
    images: 0,
    imagesWithoutAlt: 0,
    robotsTag: null,
    bodyTextLength: 0,
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

  // Check title length
  if (analysis.titleLength < 30 || analysis.titleLength > 65) {
    analysis.issues.push(`Title length ${analysis.titleLength} chars (optimal: 30-65)`);
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
  if (analysis.metaDescriptionLength < 120 || analysis.metaDescriptionLength > 160) {
    analysis.issues.push(`Meta description length ${analysis.metaDescriptionLength} chars (optimal: 120-160)`);
  }

  // Extract H1 tags
  const h1Matches = html.match(/<h1[^>]*>([^<]+)<\/h1>/gi);
  if (h1Matches) {
    analysis.h1Tags = h1Matches.map(h1 => h1.replace(/<[^>]+>/g, '').trim());
  }

  if (analysis.h1Tags.length === 0) {
    analysis.issues.push('Missing H1 tag');
  } else if (analysis.h1Tags.length > 1) {
    analysis.issues.push(`Multiple H1 tags found (${analysis.h1Tags.length})`);
  }

  // Extract canonical URL
  const canonicalMatch = html.match(/<link[^>]+rel=["\']canonical["\'][^>]+href=["\']([^"\']+)["\'][^>]*>/i);
  if (canonicalMatch) {
    analysis.canonicalUrl = canonicalMatch[1];
  } else {
    analysis.issues.push('Missing canonical URL');
  }

  // Extract Open Graph tags
  const ogMatches = html.match(/<meta[^>]+property=["\']og:([^"\']+)["\'][^>]+content=["\']([^"\']+)["\'][^>]*>/gi);
  if (ogMatches) {
    ogMatches.forEach(match => {
      const propertyMatch = match.match(/property=["\']og:([^"\']+)["\'][^>]+content=["\']([^"\']+)["\']/i);
      if (propertyMatch) {
        analysis.ogTags[propertyMatch[1]] = propertyMatch[2];
      }
    });
  }

  // Check essential OG tags
  const requiredOgTags = ['title', 'description', 'url', 'image'];
  requiredOgTags.forEach(tag => {
    if (!analysis.ogTags[tag]) {
      analysis.issues.push(`Missing og:${tag}`);
    }
  });

  // Extract JSON-LD structured data
  const jsonLdMatches = html.match(/<script[^>]+type=["\']application\/ld\+json["\'][^>]*>([^<]+)<\/script>/gi);
  if (jsonLdMatches) {
    jsonLdMatches.forEach(match => {
      const jsonMatch = match.match(/<script[^>]*>([^<]+)<\/script>/i);
      if (jsonMatch) {
        try {
          const jsonData = JSON.parse(jsonMatch[1]);
          analysis.jsonLd.push(jsonData);
        } catch (e) {
          analysis.issues.push('Invalid JSON-LD markup');
        }
      }
    });
  }

  // Count images and alt attributes
  const imageMatches = html.match(/<img[^>]*>/gi);
  if (imageMatches) {
    analysis.images = imageMatches.length;
    imageMatches.forEach(img => {
      if (!img.includes('alt=')) {
        analysis.imagesWithoutAlt++;
      }
    });
  }

  if (analysis.imagesWithoutAlt > 0) {
    analysis.issues.push(`${analysis.imagesWithoutAlt} images without alt text`);
  }

  return analysis;
}

async function auditPage(url) {
  console.log(`  📄 Auditing: ${url}`);
  
  try {
    const response = await fetchPage(url);
    
    if (response.statusCode !== 200) {
      auditResults.issues.push(`${url}: HTTP ${response.statusCode}`);
      auditResults.summary.errors++;
      return;
    }

    const analysis = analyzeHTML(response.html, url);
    auditResults.pages[url] = {
      ...analysis,  
      statusCode: response.statusCode,
      lastAudited: new Date().toISOString()
    };

    // Categorize issues
    if (analysis.issues.length === 0) {
      auditResults.summary.passed++;
    } else if (analysis.issues.some(issue => 
      issue.includes('Missing') || 
      issue.includes('Multiple H1') ||
      issue.includes('Low content')
    )) {
      auditResults.summary.errors++;
    } else {
      auditResults.summary.warnings++;
    }

    // Add to global issues
    analysis.issues.forEach(issue => {
      auditResults.issues.push(`${url}: ${issue}`);
    });

  } catch (error) {
    console.error(`  ❌ Error auditing ${url}:`, error.message);
    auditResults.issues.push(`${url}: Failed to fetch - ${error.message}`);
    auditResults.summary.errors++;
  }
}

async function generateReport() {
  console.log('📊 Generating combined report...');
  
  auditResults.summary.total = pagesToAudit.length;
  
  // Generate HTML report with both SEO and Lighthouse data
  const htmlReport = `<!DOCTYPE html>
<html>
<head>
    <title>Complete SEO + Lighthouse Audit - EmviApp</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .summary { background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
        .passed { color: #28a745; }
        .warning { color: #ffc107; } 
        .error { color: #dc3545; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        th { background-color: #f2f2f2; }
        .metrics { display: flex; gap: 20px; }
        .metric { text-align: center; }
        .score { font-size: 1.5em; font-weight: bold; }
    </style>
</head>
<body>
    <h1>🔍 EmviApp Complete Audit Report</h1>
    
    <div class="summary">
        <h2>📊 Summary</h2>
        <p><strong>Site:</strong> ${SITE_URL}</p>
        <p><strong>Audit Date:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Pages Audited:</strong> ${auditResults.summary.total}</p>
        
        <div class="metrics">
          <div class="metric">
            <div class="score passed">SEO</div>
            <p>✅ Passed: ${auditResults.summary.passed}</p>
            <p>⚠️ Warnings: ${auditResults.summary.warnings}</p>
            <p>❌ Errors: ${auditResults.summary.errors}</p>
          </div>
          <div class="metric">
            <div class="score passed">Lighthouse</div>
            <p>✅ Passed ≥90%: ${auditResults.summary.lighthouse_passed}/${auditResults.summary.total}</p>
          </div>
        </div>
    </div>

    <h2>📋 Page Results</h2>
    <table>
        <tr>
            <th>URL</th>
            <th>SEO Issues</th>
            <th>Lighthouse Performance</th>
            <th>Lighthouse SEO</th>
            <th>Status</th>
        </tr>
        ${pagesToAudit.map(url => {
          const seoData = auditResults.pages[url];
          const lighthouseData = auditResults.lighthouse[url];
          return `
        <tr>
            <td><strong>${url}</strong></td>
            <td>${seoData ? seoData.issues.length : 'Error'}</td>
            <td class="${!lighthouseData ? 'error' : lighthouseData.performance >= 90 ? 'passed' : lighthouseData.performance >= 70 ? 'warning' : 'error'}">${lighthouseData ? lighthouseData.performance + '%' : 'Failed'}</td>
            <td class="${!lighthouseData ? 'error' : lighthouseData.seo >= 90 ? 'passed' : lighthouseData.seo >= 70 ? 'warning' : 'error'}">${lighthouseData ? lighthouseData.seo + '%' : 'Failed'}</td>
            <td>${seoData && lighthouseData && seoData.issues.length === 0 && lighthouseData.performance >= 90 && lighthouseData.seo >= 90 ? '✅ PASS' : '❌ ISSUES'}</td>
        </tr>
          `;
        }).join('')}
    </table>

    <h2>🚨 Issues Found</h2>
    <ul>
        ${auditResults.issues.map(issue => `<li class="error">${issue}</li>`).join('')}
    </ul>

</body>
</html>`;
  
  await fs.writeFile(path.join(REPORTS_DIR, 'complete-audit.html'), htmlReport);
  await fs.writeFile(
    path.join(REPORTS_DIR, 'complete-audit.json'), 
    JSON.stringify(auditResults, null, 2)
  );
  
  console.log(`✅ Reports generated:`);
  console.log(`   📊 ${REPORTS_DIR}/complete-audit.html`);
  console.log(`   🔧 ${REPORTS_DIR}/complete-audit.json`);
}

async function main() {
  try {
    console.log(`🔍 Auditing ${pagesToAudit.length} pages...`);
    
    // Run SEO analysis for all pages
    console.log('\n1️⃣ Running SEO analysis...');
    for (const page of pagesToAudit) {
      await auditPage(page);
    }
    
    // Run Lighthouse audits with concurrency control
    console.log('\n2️⃣ Running Lighthouse audits...');
    const lighthouseTasks = pagesToAudit.map(url => 
      limit(() => runWithRetry(url))
    );
    await Promise.all(lighthouseTasks);
    
    await generateReport();
    
    console.log(`\n📈 AUDIT COMPLETE:`);
    console.log(`   ✅ SEO Passed: ${auditResults.summary.passed}/${auditResults.summary.total}`);
    console.log(`   ⚠️ SEO Warnings: ${auditResults.summary.warnings}`);
    console.log(`   ❌ SEO Errors: ${auditResults.summary.errors}`);
    console.log(`   🚀 Lighthouse ≥90%: ${auditResults.summary.lighthouse_passed}/${auditResults.summary.total}`);
    
    const hasIssues = auditResults.summary.errors > 0 || auditResults.summary.lighthouse_passed < auditResults.summary.total;
    if (hasIssues) {
      console.log(`\n🚨 Issues detected! Check ${REPORTS_DIR}/complete-audit.html`);
      process.exit(1);
    } else {
      console.log('\n✅ All checks passed!');
      process.exit(0);
    }
    
  } catch (error) {
    console.error('❌ Audit failed:', error.message);
    process.exit(1);
  }
}

main();