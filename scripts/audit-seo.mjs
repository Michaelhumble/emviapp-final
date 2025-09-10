#!/usr/bin/env node

/**
 * 🔍 Complete SEO Audit Script
 * Comprehensive analysis of EmviApp's SEO health
 */

import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import https from 'https';
import { URL } from 'url';

const SITE_URL = process.env.AUDIT_URL || 'https://www.emvi.app';
const REPORTS_DIR = 'reports';

// Skip hosts to avoid false positives from Google Fonts + JS pseudo-URLs
const SKIP_HOSTS = new Set(['fonts.googleapis.com', 'fonts.gstatic.com']);

const AUDIT_CONFIG = {
  baseUrl: SITE_URL,
  skipHosts: SKIP_HOSTS
};

// Ensure reports directory exists
if (!fsSync.existsSync(REPORTS_DIR)) {
  fsSync.mkdirSync(REPORTS_DIR, { recursive: true });
}

console.log(`🔍 Starting SEO Audit for ${SITE_URL}`);

const auditResults = {
  timestamp: new Date().toISOString(),
  site: SITE_URL,
  pages: {},
  summary: {
    total: 0,
    passed: 0,
    warnings: 0,
    errors: 0
  },
  issues: []
};

// Load URLs from data file
async function loadAuditUrls() {
  try {
    const urlsData = await fs.readFile('data/audit-urls.json', 'utf8');
    const urls = JSON.parse(urlsData);
    console.log(`📄 Loaded ${urls.length} URLs from data/audit-urls.json`);
    return urls.map(url => {
      // Convert full URLs to relative paths for existing logic
      return url.replace(SITE_URL, '');
    });
  } catch (error) {
    console.warn('⚠️ Could not load data/audit-urls.json, using fallback URLs');
    return [
      '/',
      '/jobs',
      '/salons',
      '/artists',
      '/blog'
    ];
  }
}

async function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const fullUrl = new URL(url, SITE_URL);
    
    https.get(fullUrl.toString(), {
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
    twitterTags: {},
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

  // Extract Twitter Card tags
  const twitterMatches = html.match(/<meta[^>]+name=["\']twitter:([^"\']+)["\'][^>]+content=["\']([^"\']+)["\'][^>]*>/gi);
  if (twitterMatches) {
    twitterMatches.forEach(match => {
      const nameMatch = match.match(/name=["\']twitter:([^"\']+)["\'][^>]+content=["\']([^"\']+)["\']/i);
      if (nameMatch) {
        analysis.twitterTags[nameMatch[1]] = nameMatch[2];
      }
    });
  }

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

  // Check for required JSON-LD based on page type
  if (url === '/') {
    const hasOrganization = analysis.jsonLd.some(ld => ld['@type'] === 'Organization');
    const hasWebSite = analysis.jsonLd.some(ld => ld['@type'] === 'WebSite');
    if (!hasOrganization) analysis.issues.push('Missing Organization schema');
    if (!hasWebSite) analysis.issues.push('Missing WebSite schema');
  }

  // Extract robots meta tag
  const robotsMatch = html.match(/<meta[^>]+name=["\']robots["\'][^>]+content=["\']([^"\']+)["\'][^>]*>/i);
  if (robotsMatch) {
    analysis.robotsTag = robotsMatch[1];
  }

  // Check robots tag for specific pages
  if (url.includes('/signin') || url.includes('/account')) {
    if (!analysis.robotsTag || !analysis.robotsTag.includes('noindex')) {
      analysis.issues.push('Auth pages should be noindex');
    }
  }

  // Count links with enhanced validation
  const linkMatches = html.match(/<a[^>]+href=["\']([^"\']+)["\'][^>]*>/gi);
  if (linkMatches) {
    linkMatches.forEach(link => {
      const hrefMatch = link.match(/href=["\']([^"\']+)["\']/i);
      if (hrefMatch) {
        const href = hrefMatch[1];
        
        // Skip non-http URLs and code artifacts
        if (!href.startsWith('http') && !href.startsWith('/')) return;
        if (href.includes('/assets/Href=new')) return;
        
        // Validate external links and skip problematic hosts
        if (href.startsWith('http') && !href.includes('emvi.app')) {
          try {
            const linkUrl = new URL(href);
            if (!SKIP_HOSTS.has(linkUrl.hostname)) {
              analysis.externalLinks++;
            }
          } catch (e) {
            // Skip invalid URLs
          }
        } else if (href.startsWith('/') || href.includes('emvi.app')) {
          analysis.internalLinks++;
        }
      }
    });
  }

  // Check internal link count
  if (analysis.internalLinks < 3 && url !== '/signin') {
    analysis.issues.push(`Low internal link count (${analysis.internalLinks})`);
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

  // Estimate body text length (rough approximation)
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  if (bodyMatch) {
    const bodyText = bodyMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    analysis.bodyTextLength = bodyText.length;
  }

  if (analysis.bodyTextLength < 300 && !url.includes('/signin')) {
    analysis.issues.push(`Low content length (${analysis.bodyTextLength} chars)`);
  }

  return analysis;
}

async function auditPage(url) {
  console.log(`  Auditing: ${url}`);
  
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
    console.error(`  Error auditing ${url}:`, error.message);
    auditResults.issues.push(`${url}: Failed to fetch - ${error.message}`);
    auditResults.summary.errors++;
  }
}

async function generateReport() {
  console.log('📊 Generating SEO report...');
  
  auditResults.summary.total = pagesToAudit.length;
  
  // Generate CSV report
  const csvHeaders = [
    'URL', 'Status', 'Title Length', 'Meta Desc Length', 'H1 Count', 
    'Canonical', 'OG Tags', 'JSON-LD Types', 'Internal Links', 'Issues Count'
  ];
  
  const csvRows = [csvHeaders.join(',')];
  
  Object.entries(auditResults.pages).forEach(([url, data]) => {
    const ogTagsCount = Object.keys(data.ogTags).length;
    const jsonLdTypes = data.jsonLd.map(ld => ld['@type']).filter(Boolean).join(';');
    
    csvRows.push([
      url,
      data.statusCode,
      data.titleLength,
      data.metaDescriptionLength,
      data.h1Tags.length,
      data.canonicalUrl ? 'Yes' : 'No',
      ogTagsCount,
      jsonLdTypes || 'None',
      data.internalLinks,
      data.issues.length
    ].join(','));
  });
  
  fsSync.writeFileSync(path.join(REPORTS_DIR, 'seo-audit.csv'), csvRows.join('\n'));
  
  // Generate detailed HTML report
  const htmlReport = `<!DOCTYPE html>
<html>
<head>
    <title>SEO Audit Report - EmviApp</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .summary { background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
        .passed { color: #28a745; }
        .warning { color: #ffc107; }
        .error { color: #dc3545; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        th { background-color: #f2f2f2; }
        .issue-list { max-width: 300px; }
    </style>
</head>
<body>
    <h1>🔍 EmviApp SEO Audit Report</h1>
    
    <div class="summary">
        <h2>📊 Summary</h2>
        <p><strong>Site:</strong> ${SITE_URL}</p>
        <p><strong>Audit Date:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Pages Audited:</strong> ${auditResults.summary.total}</p>
        <p><span class="passed">✅ Passed: ${auditResults.summary.passed}</span></p>
        <p><span class="warning">⚠️ Warnings: ${auditResults.summary.warnings}</span></p>
        <p><span class="error">❌ Errors: ${auditResults.summary.errors}</span></p>
    </div>

    <h2>📋 Detailed Results</h2>
    <table>
        <tr>
            <th>URL</th>
            <th>Title</th>
            <th>Meta Description</th>
            <th>H1</th>
            <th>Canonical</th>
            <th>OG Tags</th>
            <th>Issues</th>
        </tr>
        ${Object.entries(auditResults.pages).map(([url, data]) => `
        <tr>
            <td><strong>${url}</strong></td>
            <td>${data.title || 'Missing'}<br><small>${data.titleLength} chars</small></td>
            <td>${data.metaDescription || 'Missing'}<br><small>${data.metaDescriptionLength} chars</small></td>
            <td>${data.h1Tags.join(', ') || 'Missing'}</td>
            <td>${data.canonicalUrl ? '✅' : '❌'}</td>
            <td>${Object.keys(data.ogTags).length} tags</td>
            <td class="issue-list">${data.issues.map(issue => `<div class="error">• ${issue}</div>`).join('')}</td>
        </tr>
        `).join('')}
    </table>

    <h2>🚨 All Issues Found</h2>
    <ul>
        ${auditResults.issues.map(issue => `<li class="error">${issue}</li>`).join('')}
    </ul>

    <h2>🎯 Recommendations</h2>
    <ul>
        <li><strong>Fix Missing Meta Tags:</strong> Add proper title and meta description to all pages</li>
        <li><strong>Implement Structured Data:</strong> Add JSON-LD schema markup for better rich snippets</li>
        <li><strong>Optimize Content:</strong> Ensure all pages have sufficient content (300+ chars)</li>
        <li><strong>Internal Linking:</strong> Add more relevant internal links to improve navigation</li>
        <li><strong>Image Optimization:</strong> Add alt text to all images for accessibility and SEO</li>
    </ul>
</body>
</html>`;
  
  fsSync.writeFileSync(path.join(REPORTS_DIR, 'seo-audit.html'), htmlReport);
  
  // Generate JSON summary
  fsSync.writeFileSync(
    path.join(REPORTS_DIR, 'seo-audit-summary.json'), 
    JSON.stringify(auditResults, null, 2)
  );
  
  console.log(`✅ Reports generated:`);
  console.log(`   📊 ${REPORTS_DIR}/seo-audit.html`);
  console.log(`   📄 ${REPORTS_DIR}/seo-audit.csv`); 
  console.log(`   🔧 ${REPORTS_DIR}/seo-audit-summary.json`);
}

async function main() {
  try {
    // Load URLs from data file
    const pagesToAudit = await loadAuditUrls();
    
    console.log(`🔍 Auditing ${pagesToAudit.length} pages...`);
    
    for (const page of pagesToAudit) {
      await auditPage(page);
    }
    
    await generateReport();
    
    console.log(`\n📈 AUDIT COMPLETE:`);
    console.log(`   ✅ Passed: ${auditResults.summary.passed}/${auditResults.summary.total}`);
    console.log(`   ⚠️ Warnings: ${auditResults.summary.warnings}`);
    console.log(`   ❌ Errors: ${auditResults.summary.errors}`);
    
    if (auditResults.summary.errors > 0) {
      console.log(`\n🚨 Critical SEO issues found! Check ${REPORTS_DIR}/seo-audit.html`);
      process.exit(1);
    }
    
  } catch (error) {
    console.error('❌ Audit failed:', error.message);
    process.exit(1);
  }
}

main();