#!/usr/bin/env node

/**
 * 🗺️ Sitemap Validation Script
 * Validates all sitemaps and checks URL health
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { URL } from 'url';

const SITE_URL = process.env.SITEMAP_BASE_URL || 'https://www.emvi.app';
const REPORTS_DIR = 'reports';

// Ensure reports directory exists
if (!fs.existsSync(REPORTS_DIR)) {
  fs.mkdirSync(REPORTS_DIR, { recursive: true });
}

console.log(`🗺️ Validating sitemaps for ${SITE_URL}`);

const validationResults = {
  timestamp: new Date().toISOString(),
  site: SITE_URL,
  sitemaps: {},
  summary: {
    total: 0,
    valid: 0,
    redirects: 0,
    broken: 0,
    soft404s: 0,
    errors: 0
  },
  issues: []
};

const sitemapsToCheck = [
  '/sitemap.xml',
  '/sitemap-static.xml', 
  '/jobs-sitemap.xml',
  '/salons-sitemap.xml',
  '/artists-sitemap.xml',
  '/blog-sitemap.xml'
];

async function fetchUrl(url) {
  return new Promise((resolve) => {
    const fullUrl = new URL(url, SITE_URL);
    
    https.get(fullUrl.toString(), {
      headers: {
        'User-Agent': 'EmviApp-Sitemap-Validator/1.0'
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
          content: data,
          finalUrl: res.url || fullUrl.toString()
        });
      });
    }).on('error', (err) => {
      resolve({
        statusCode: 0,
        error: err.message,
        content: null
      });
    });
  });
}

function parseSitemap(xml) {
  const urls = [];
  
  // Handle sitemap index files
  const sitemapMatches = xml.match(/<loc>([^<]+)<\/loc>/g);
  if (sitemapMatches) {
    sitemapMatches.forEach(match => {
      const url = match.replace('<loc>', '').replace('</loc>', '').trim();
      urls.push({
        url: url,
        lastmod: null,
        priority: null,
        changefreq: null
      });
    });
  }
  
  // Handle regular sitemap files with full URL entries
  const urlsetMatches = xml.match(/<url>([\s\S]*?)<\/url>/g);
  if (urlsetMatches) {
    urlsetMatches.forEach(urlBlock => {
      const locMatch = urlBlock.match(/<loc>([^<]+)<\/loc>/);
      const lastmodMatch = urlBlock.match(/<lastmod>([^<]+)<\/lastmod>/);
      const priorityMatch = urlBlock.match(/<priority>([^<]+)<\/priority>/);
      const changefreqMatch = urlBlock.match(/<changefreq>([^<]+)<\/changefreq>/);
      
      if (locMatch) {
        urls.push({
          url: locMatch[1].trim(),
          lastmod: lastmodMatch ? lastmodMatch[1] : null,
          priority: priorityMatch ? parseFloat(priorityMatch[1]) : null,
          changefreq: changefreqMatch ? changefreqMatch[1] : null
        });
      }
    });
  }
  
  return urls;
}

async function validateSitemap(sitemapPath) {
  console.log(`  Checking sitemap: ${sitemapPath}`);
  
  const sitemapResult = {
    path: sitemapPath,
    accessible: false,
    valid: false,
    urlCount: 0,
    urls: [],
    issues: []
  };
  
  try {
    const response = await fetchUrl(sitemapPath);
    
    if (response.statusCode === 200) {
      sitemapResult.accessible = true;
      
      if (response.content && response.content.includes('<?xml')) {
        sitemapResult.valid = true;
        
        const urls = parseSitemap(response.content);
        sitemapResult.urlCount = urls.length;
        sitemapResult.urls = urls;
        
        console.log(`    Found ${urls.length} URLs`);
        
      } else {
        sitemapResult.issues.push('Invalid XML format');
      }
    } else {
      sitemapResult.issues.push(`HTTP ${response.statusCode}`);
    }
    
  } catch (error) {
    sitemapResult.issues.push(`Error: ${error.message}`);
  }
  
  validationResults.sitemaps[sitemapPath] = sitemapResult;
  return sitemapResult;
}

async function validateUrls(urls, sitemapPath) {
  console.log(`  Validating ${urls.length} URLs from ${sitemapPath}...`);
  
  const brokenLinks = [];
  const sample = urls.slice(0, 50); // Sample first 50 URLs to avoid overwhelming
  
  for (const urlData of sample) {
    const response = await fetchUrl(urlData.url);
    validationResults.summary.total++;
    
    if (response.statusCode === 200) {
      validationResults.summary.valid++;
    } else if (response.statusCode >= 300 && response.statusCode < 400) {
      validationResults.summary.redirects++;
      validationResults.issues.push(`Redirect: ${urlData.url} -> ${response.statusCode}`);
    } else if (response.statusCode === 404) {
      validationResults.summary.broken++;
      brokenLinks.push({
        url: urlData.url,
        status: response.statusCode,
        sitemap: sitemapPath
      });
    } else if (response.statusCode >= 400) {
      validationResults.summary.soft404s++;
      validationResults.issues.push(`Soft 404: ${urlData.url} (${response.statusCode})`);
    } else {
      validationResults.summary.errors++;
      brokenLinks.push({
        url: urlData.url,
        error: response.error || 'Unknown error',
        sitemap: sitemapPath
      });
    }
  }
  
  return brokenLinks;
}

async function generateReport() {
  console.log('📊 Generating sitemap validation report...');
  
  // Generate broken links CSV
  const brokenLinksFile = path.join(REPORTS_DIR, 'broken-links.csv');
  const csvHeaders = ['Status Code', 'URL', 'Sitemap'];
  const csvRows = [csvHeaders.join(',')];
  
  // Add broken links from validation
  Object.values(validationResults.sitemaps).forEach(sitemap => {
    sitemap.urls.forEach(urlData => {
      // This is a simplified version - in a full implementation,
      // we'd track the actual validation results per URL
    });
  });
  
  if (validationResults.issues.length > 0) {
    validationResults.issues.forEach(issue => {
      if (issue.includes('404') || issue.includes('Broken')) {
        const parts = issue.split(': ');
        if (parts.length >= 2) {
          csvRows.push(['404', parts[1], 'Unknown'].join(','));
        }
      }
    });
  }
  
  fs.writeFileSync(brokenLinksFile, csvRows.join('\n'));
  
  // Generate main validation report
  const report = {
    timestamp: validationResults.timestamp,
    site: validationResults.site,
    summary: validationResults.summary,
    sitemaps: Object.values(validationResults.sitemaps).map(sm => ({
      path: sm.path,
      accessible: sm.accessible,
      valid: sm.valid,
      urlCount: sm.urlCount,
      issues: sm.issues
    })),
    recommendations: []
  };
  
  // Add recommendations based on findings
  if (validationResults.summary.broken > 0) {
    report.recommendations.push(`Fix ${validationResults.summary.broken} broken URLs in sitemaps`);
  }
  
  if (validationResults.summary.redirects > 5) {
    report.recommendations.push(`Update ${validationResults.summary.redirects} redirecting URLs to final destinations`);
  }
  
  Object.values(validationResults.sitemaps).forEach(sitemap => {
    if (!sitemap.accessible) {
      report.recommendations.push(`Fix inaccessible sitemap: ${sitemap.path}`);
    }
    if (!sitemap.valid) {
      report.recommendations.push(`Fix invalid XML in sitemap: ${sitemap.path}`);
    }
  });
  
  fs.writeFileSync(
    path.join(REPORTS_DIR, 'sitemap-validation.json'),
    JSON.stringify(report, null, 2)
  );
  
  // Generate HTML report
  const htmlReport = `<!DOCTYPE html>
<html>
<head>
    <title>Sitemap Validation Report - EmviApp</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .summary { background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
        .good { color: #28a745; }
        .warning { color: #ffc107; }
        .error { color: #dc3545; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <h1>🗺️ EmviApp Sitemap Validation Report</h1>
    
    <div class="summary">
        <h2>📊 Summary</h2>
        <p><strong>Site:</strong> ${validationResults.site}</p>
        <p><strong>Validation Date:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>URLs Checked:</strong> ${validationResults.summary.total}</p>
        <p><span class="good">✅ Valid: ${validationResults.summary.valid}</span></p>
        <p><span class="warning">🔀 Redirects: ${validationResults.summary.redirects}</span></p>
        <p><span class="error">❌ Broken: ${validationResults.summary.broken}</span></p>
        <p><span class="error">⚠️ Errors: ${validationResults.summary.errors}</span></p>
    </div>

    <h2>📋 Sitemap Details</h2>
    <table>
        <tr>
            <th>Sitemap</th>
            <th>Status</th>
            <th>URLs</th>
            <th>Issues</th>
        </tr>
        ${Object.values(validationResults.sitemaps).map(sitemap => `
        <tr>
            <td><strong>${sitemap.path}</strong></td>
            <td>${sitemap.accessible ? '✅ Accessible' : '❌ Not accessible'}</td>
            <td>${sitemap.urlCount}</td>
            <td>${sitemap.issues.length > 0 ? sitemap.issues.map(issue => `<div class="error">${issue}</div>`).join('') : '✅ No issues'}</td>
        </tr>
        `).join('')}
    </table>

    <h2>🚨 Issues Found</h2>
    ${validationResults.issues.length > 0 ? 
      `<ul>${validationResults.issues.map(issue => `<li class="error">${issue}</li>`).join('')}</ul>` :
      '<p class="good">✅ No critical issues found!</p>'
    }

    <h2>🎯 Recommendations</h2>
    <ul>
        ${report.recommendations.map(rec => `<li>${rec}</li>`).join('') || '<li class="good">All sitemaps are healthy!</li>'}
    </ul>
</body>
</html>`;
  
  fs.writeFileSync(path.join(REPORTS_DIR, 'sitemap-validation.html'), htmlReport);
  
  console.log(`✅ Sitemap validation reports generated:`);
  console.log(`   📊 ${REPORTS_DIR}/sitemap-validation.html`);
  console.log(`   📄 ${REPORTS_DIR}/broken-links.csv`);
  console.log(`   🔧 ${REPORTS_DIR}/sitemap-validation.json`);
}

async function main() {
  try {
    console.log(`🗺️ Checking ${sitemapsToCheck.length} sitemaps...`);
    
    for (const sitemapPath of sitemapsToCheck) {
      const sitemap = await validateSitemap(sitemapPath);
      
      if (sitemap.valid && sitemap.urls.length > 0) {
        await validateUrls(sitemap.urls, sitemapPath);
      }
    }
    
    await generateReport();
    
    console.log(`\n📈 VALIDATION COMPLETE:`);
    console.log(`   🗺️ Sitemaps: ${Object.keys(validationResults.sitemaps).length}`);
    console.log(`   ✅ Valid URLs: ${validationResults.summary.valid}`);
    console.log(`   ❌ Broken URLs: ${validationResults.summary.broken}`);
    console.log(`   ⚠️ Issues: ${validationResults.issues.length}`);
    
    if (validationResults.summary.broken > 5 || validationResults.summary.errors > 5) {
      console.log(`\n🚨 Too many broken URLs detected! Check ${REPORTS_DIR}/sitemap-validation.html`);
      process.exit(1);
    }
    
  } catch (error) {
    console.error('❌ Sitemap validation failed:', error.message);
    process.exit(1);
  }
}

main();