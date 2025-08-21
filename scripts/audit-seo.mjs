#!/usr/bin/env node

/**
 * EmviApp SEO Audit Script
 * 
 * Comprehensive SEO audit tool that:
 * - Crawls site for broken links and SEO issues
 * - Validates meta tags, structured data, canonicals
 * - Generates HTML and CSV reports
 * - Checks Lighthouse performance metrics
 */

import fs from 'fs/promises';
import path from 'path';
import { execSync } from 'child_process';
import { URL } from 'url';

const AUDIT_CONFIG = {
  baseUrl: process.env.AUDIT_URL || 'https://www.emvi.app',
  fallbackUrl: 'https://emvi.app',
  outputDir: './reports',
  maxDepth: 3,
  concurrency: 5,
  userAgent: 'EmviApp-SEO-Audit/1.0',
  timeout: 30000
};

class SEOAuditor {
  constructor() {
    this.brokenLinks = [];
    this.seoIssues = [];
    this.crawledUrls = new Set();
    this.toVisit = [];
    this.structuredDataIssues = [];
    this.performanceMetrics = {};
  }

  async init() {
    await fs.mkdir(AUDIT_CONFIG.outputDir, { recursive: true });
    console.log(`🔍 Starting SEO audit for ${AUDIT_CONFIG.baseUrl}`);
  }

  async fetchWithRetry(url, options = {}) {
    const maxRetries = 3;
    let lastError;

    for (let i = 0; i < maxRetries; i++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), AUDIT_CONFIG.timeout);
        
        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
          headers: {
            'User-Agent': AUDIT_CONFIG.userAgent,
            ...options.headers
          }
        });
        
        clearTimeout(timeoutId);
        return response;
      } catch (error) {
        lastError = error;
        if (i < maxRetries - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        }
      }
    }
    throw lastError;
  }

  async validateUrl(url, source = 'unknown') {
    try {
      const response = await this.fetchWithRetry(url, { method: 'HEAD' });
      const status = response.status;
      
      if (status >= 400) {
        // Try GET if HEAD fails with 405
        if (status === 405) {
          const getResponse = await this.fetchWithRetry(url);
          return this.analyzeResponse(getResponse, url, source);
        }
        
        this.brokenLinks.push({
          source,
          target: url,
          status,
          type: 'broken',
          suggestion: status === 404 ? 'remove or redirect' : 'check server config'
        });
        return false;
      }
      
      return true;
    } catch (error) {
      this.brokenLinks.push({
        source,
        target: url,
        status: 'timeout/error',
        type: 'broken',
        error: error.message,
        suggestion: 'check connectivity or server'
      });
      return false;
    }
  }

  async analyzeResponse(response, url, source) {
    const status = response.status;
    const contentType = response.headers.get('content-type') || '';
    
    if (status >= 400) {
      this.brokenLinks.push({
        source,
        target: url,
        status,
        type: 'broken',
        suggestion: 'fix or redirect'
      });
      return false;
    }

    // Check for soft 404s
    if (status === 200 && contentType.includes('text/html')) {
      const html = await response.text();
      if (this.isSoft404(html)) {
        this.brokenLinks.push({
          source,
          target: url,
          status: '200 (soft 404)',
          type: 'soft-404',
          suggestion: 'return proper 404 status'
        });
      }
    }

    return true;
  }

  isSoft404(html) {
    const soft404Indicators = [
      /not found/i,
      /404/,
      /page not found/i,
      /this page doesn\'t exist/i,
      /<title[^>]*>.*404.*<\/title>/i
    ];
    
    const lowercaseHtml = html.toLowerCase();
    return soft404Indicators.some(regex => regex.test(lowercaseHtml)) && html.length < 1000;
  }

  async crawlPage(url, depth = 0) {
    if (depth > AUDIT_CONFIG.maxDepth || this.crawledUrls.has(url)) {
      return;
    }

    this.crawledUrls.add(url);
    console.log(`📄 Crawling: ${url} (depth: ${depth})`);

    try {
      const response = await this.fetchWithRetry(url);
      const html = await response.text();
      
      // Analyze SEO elements
      await this.analyzeSEO(url, html, response);
      
      // Extract links for further crawling
      const links = this.extractLinks(html, url);
      
      // Validate extracted links
      for (const link of links) {
        if (!this.crawledUrls.has(link) && this.isInternalUrl(link)) {
          this.toVisit.push({ url: link, depth: depth + 1, source: url });
        }
        await this.validateUrl(link, url);
      }
      
    } catch (error) {
      this.seoIssues.push({
        url,
        type: 'crawl-error',
        message: error.message
      });
    }
  }

  async analyzeSEO(url, html, response) {
    const issues = [];
    
    // Parse HTML for meta analysis
    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : '';
    
    const descMatch = html.match(/<meta[^>]*name=["\']description["\'][^>]*content=["\']([^"\']*)["\'][^>]*>/i);
    const description = descMatch ? descMatch[1] : '';
    
    const canonicalMatch = html.match(/<link[^>]*rel=["\']canonical["\'][^>]*href=["\']([^"\']*)["\'][^>]*>/i);
    const canonical = canonicalMatch ? canonicalMatch[1] : '';
    
    // Validate title
    if (!title) {
      issues.push({ type: 'missing-title', message: 'Page missing title tag' });
    } else if (title.length > 60) {
      issues.push({ type: 'long-title', message: `Title too long: ${title.length} chars (limit: 60)` });
    }
    
    // Validate description
    if (!description) {
      issues.push({ type: 'missing-description', message: 'Page missing meta description' });
    } else if (description.length > 160) {
      issues.push({ type: 'long-description', message: `Description too long: ${description.length} chars (limit: 160)` });
    }
    
    // Validate canonical
    if (canonical) {
      const isValidCanonical = await this.validateUrl(canonical, url);
      if (!isValidCanonical) {
        issues.push({ type: 'broken-canonical', message: `Canonical URL returns error: ${canonical}` });
      }
    } else {
      issues.push({ type: 'missing-canonical', message: 'Page missing canonical URL' });
    }
    
    // Check H1 tags
    const h1Matches = html.match(/<h1[^>]*>([^<]*)<\/h1>/gi);
    if (!h1Matches || h1Matches.length === 0) {
      issues.push({ type: 'missing-h1', message: 'Page missing H1 tag' });
    } else if (h1Matches.length > 1) {
      issues.push({ type: 'multiple-h1', message: `Multiple H1 tags found: ${h1Matches.length}` });
    }
    
    // Check for images without alt text
    const imgMatches = html.match(/<img[^>]*>/gi) || [];
    const imagesWithoutAlt = imgMatches.filter(img => !img.includes('alt='));
    if (imagesWithoutAlt.length > 0) {
      issues.push({ 
        type: 'missing-alt-text', 
        message: `${imagesWithoutAlt.length} images missing alt text` 
      });
    }
    
    // Check Open Graph tags
    const ogTitleMatch = html.match(/<meta[^>]*property=["\']og:title["\'][^>]*content=["\']([^"\']*)["\'][^>]*>/i);
    const ogDescMatch = html.match(/<meta[^>]*property=["\']og:description["\'][^>]*content=["\']([^"\']*)["\'][^>]*>/i);
    const ogImageMatch = html.match(/<meta[^>]*property=["\']og:image["\'][^>]*content=["\']([^"\']*)["\'][^>]*>/i);
    
    if (!ogTitleMatch) issues.push({ type: 'missing-og-title', message: 'Missing og:title' });
    if (!ogDescMatch) issues.push({ type: 'missing-og-description', message: 'Missing og:description' });
    if (!ogImageMatch) issues.push({ type: 'missing-og-image', message: 'Missing og:image' });
    
    // Check structured data
    const jsonLdMatches = html.match(/<script[^>]*type=["\']application\/ld\+json["\'][^>]*>([^<]*)<\/script>/gi);
    if (jsonLdMatches) {
      for (const jsonLd of jsonLdMatches) {
        try {
          const content = jsonLd.replace(/<script[^>]*>/, '').replace(/<\/script>/, '');
          const data = JSON.parse(content);
          this.validateStructuredData(url, data);
        } catch (error) {
          issues.push({ type: 'invalid-json-ld', message: `Invalid JSON-LD: ${error.message}` });
        }
      }
    }
    
    // Store issues for this URL
    if (issues.length > 0) {
      this.seoIssues.push({
        url,
        title,
        description,
        canonical,
        issues
      });
    }
  }

  validateStructuredData(url, data) {
    if (data['@type'] === 'JobPosting') {
      const required = ['title', 'description', 'datePosted', 'hiringOrganization'];
      const missing = required.filter(field => !data[field]);
      
      if (missing.length > 0) {
        this.structuredDataIssues.push({
          url,
          type: 'JobPosting',
          missing,
          message: `Missing required JobPosting fields: ${missing.join(', ')}`
        });
      }
    }
    
    if (data['@type'] === 'Article') {
      const required = ['headline', 'author', 'datePublished'];
      const missing = required.filter(field => !data[field]);
      
      if (missing.length > 0) {
        this.structuredDataIssues.push({
          url,
          type: 'Article',
          missing,
          message: `Missing required Article fields: ${missing.join(', ')}`
        });
      }
    }
  }

  extractLinks(html, baseUrl) {
    const links = new Set();
    const base = new URL(baseUrl);
    
    // Extract href links
    const hrefMatches = html.match(/href=["\']([^"\']*)["\']|href=([^\s>]*)/gi) || [];
    
    for (const match of hrefMatches) {
      try {
        const url = match.replace(/href=["\']*/, '').replace(/["\']*$/, '');
        if (url && !url.startsWith('#') && !url.startsWith('mailto:') && !url.startsWith('tel:')) {
          const absoluteUrl = new URL(url, base).toString();
          links.add(absoluteUrl);
        }
      } catch (error) {
        // Skip invalid URLs
      }
    }
    
    return Array.from(links);
  }

  isInternalUrl(url) {
    try {
      const urlObj = new URL(url);
      const baseObj = new URL(AUDIT_CONFIG.baseUrl);
      return urlObj.hostname === baseObj.hostname;
    } catch {
      return false;
    }
  }

  async generateReports() {
    console.log('📊 Generating reports...');
    
    // Generate HTML report
    const htmlReport = this.generateHTMLReport();
    await fs.writeFile(path.join(AUDIT_CONFIG.outputDir, 'seo-report.html'), htmlReport);
    
    // Generate CSV reports
    const brokenLinksCSV = this.generateBrokenLinksCSV();
    await fs.writeFile(path.join(AUDIT_CONFIG.outputDir, 'broken-links.csv'), brokenLinksCSV);
    
    const seoIssuesCSV = this.generateSEOIssuesCSV();
    await fs.writeFile(path.join(AUDIT_CONFIG.outputDir, 'seo-issues.csv'), seoIssuesCSV);
    
    console.log(`✅ Reports generated in ${AUDIT_CONFIG.outputDir}/`);
  }

  generateHTMLReport() {
    const totalPages = this.crawledUrls.size;
    const brokenLinksCount = this.brokenLinks.length;
    const seoIssuesCount = this.seoIssues.reduce((sum, page) => sum + page.issues.length, 0);
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EmviApp SEO Audit Report</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #333; border-bottom: 3px solid #8B5CF6; padding-bottom: 10px; }
        h2 { color: #555; margin-top: 30px; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 20px 0; }
        .metric { background: #f8f9fa; padding: 20px; border-radius: 6px; text-align: center; }
        .metric h3 { margin: 0; font-size: 2em; color: #8B5CF6; }
        .metric p { margin: 5px 0 0; color: #666; }
        .issue { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 10px 0; border-radius: 4px; }
        .error { background: #f8d7da; border-left-color: #dc3545; }
        .warning { background: #d1ecf1; border-left-color: #17a2b8; }
        .good { background: #d4edda; border-left-color: #28a745; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background: #f8f9fa; font-weight: 600; }
        .url { font-family: 'Monaco', 'Consolas', monospace; font-size: 0.9em; }
        .status-error { color: #dc3545; font-weight: bold; }
        .status-warning { color: #ffc107; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔍 EmviApp SEO Audit Report</h1>
        <p><strong>Audit Date:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Base URL:</strong> ${AUDIT_CONFIG.baseUrl}</p>
        
        <div class="summary">
            <div class="metric">
                <h3>${totalPages}</h3>
                <p>Pages Crawled</p>
            </div>
            <div class="metric">
                <h3>${brokenLinksCount}</h3>
                <p>Broken Links</p>
            </div>
            <div class="metric">
                <h3>${seoIssuesCount}</h3>
                <p>SEO Issues</p>
            </div>
            <div class="metric">
                <h3>${this.structuredDataIssues.length}</h3>
                <p>Schema Issues</p>
            </div>
        </div>

        <h2>🔗 Broken Links Summary</h2>
        ${brokenLinksCount === 0 ? 
          '<div class="issue good">✅ No broken links found!</div>' :
          `<table>
            <thead>
                <tr>
                    <th>Source Page</th>
                    <th>Target URL</th>
                    <th>Status</th>
                    <th>Type</th>
                    <th>Suggestion</th>
                </tr>
            </thead>
            <tbody>
                ${this.brokenLinks.slice(0, 50).map(link => `
                    <tr>
                        <td class="url">${link.source}</td>
                        <td class="url">${link.target}</td>
                        <td class="status-error">${link.status}</td>
                        <td>${link.type}</td>
                        <td>${link.suggestion || 'Review manually'}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>`
        }

        <h2>🎯 SEO Issues by Page</h2>
        ${this.seoIssues.length === 0 ? 
          '<div class="issue good">✅ No major SEO issues found!</div>' :
          this.seoIssues.slice(0, 20).map(page => `
            <div class="issue ${page.issues.some(i => ['missing-title', 'missing-description'].includes(i.type)) ? 'error' : 'warning'}">
                <h4 class="url">${page.url}</h4>
                <p><strong>Title:</strong> ${page.title || '❌ Missing'}</p>
                <p><strong>Description:</strong> ${page.description || '❌ Missing'}</p>
                <ul>
                    ${page.issues.map(issue => `<li><strong>${issue.type}:</strong> ${issue.message}</li>`).join('')}
                </ul>
            </div>
          `).join('')
        }

        <h2>📊 Structured Data Issues</h2>
        ${this.structuredDataIssues.length === 0 ?
          '<div class="issue good">✅ No structured data issues found!</div>' :
          this.structuredDataIssues.map(issue => `
            <div class="issue warning">
                <h4 class="url">${issue.url}</h4>
                <p><strong>Schema Type:</strong> ${issue.type}</p>
                <p><strong>Issue:</strong> ${issue.message}</p>
            </div>
          `).join('')
        }

        <h2>💡 Recommendations</h2>
        <div class="issue">
            <h4>Priority Fixes:</h4>
            <ul>
                <li>Fix all broken internal links (${this.brokenLinks.filter(l => this.isInternalUrl(l.target)).length} found)</li>
                <li>Add missing title tags and meta descriptions</li>
                <li>Implement proper canonical URLs for all pages</li>
                <li>Add alt text to all images</li>
                <li>Fix structured data validation errors</li>
            </ul>
        </div>
        
        <p><em>Generated by EmviApp SEO Audit Tool v1.0</em></p>
    </div>
</body>
</html>`;
  }

  generateBrokenLinksCSV() {
    const headers = 'Source Page,Target URL,HTTP Status,Issue Type,Anchor Text,Suggestion\n';
    const rows = this.brokenLinks.map(link => 
      `"${link.source}","${link.target}","${link.status}","${link.type}","${link.anchorText || ''}","${link.suggestion || ''}"`
    ).join('\n');
    return headers + rows;
  }

  generateSEOIssuesCSV() {
    const headers = 'URL,Title,Description,Issue Type,Issue Message\n';
    const rows = [];
    
    for (const page of this.seoIssues) {
      for (const issue of page.issues) {
        rows.push(`"${page.url}","${page.title}","${page.description}","${issue.type}","${issue.message}"`);
      }
    }
    
    return headers + rows.join('\n');
  }

  async runLighthouseAudit() {
    const keyPages = [
      '/',
      '/jobs',
      '/salons', 
      '/artists',
      '/blog',
      '/contact'
    ];

    console.log('🚀 Running Lighthouse audits...');
    
    for (const page of keyPages) {
      try {
        const url = `${AUDIT_CONFIG.baseUrl}${page}`;
        console.log(`  Auditing: ${url}`);
        
        // Run Lighthouse CLI
        const result = execSync(
          `npx lighthouse ${url} --output json --chrome-flags="--headless" --quiet`,
          { encoding: 'utf8' }
        );
        
        const report = JSON.parse(result);
        
        // Defensive guard for undefined categories - prevent crashes
        const categories = report?.lhr?.categories || {};
        const audits = report?.lhr?.audits || {};
        
        this.performanceMetrics[page] = {
          performance: categories.performance?.score ? Math.round(categories.performance.score * 100) : null,
          seo: categories.seo?.score ? Math.round(categories.seo.score * 100) : null,
          lcp: audits['largest-contentful-paint']?.numericValue || null,
          cls: audits['cumulative-layout-shift']?.numericValue || null,
          fid: audits['max-potential-fid']?.numericValue || null,
          error: (!categories.performance && !categories.seo) ? 'Lighthouse categories undefined' : null
        };
        
      } catch (error) {
        console.warn(`❌ Lighthouse failed for ${page}: ${error.message}`);
        // Record error in metrics but continue processing
        this.performanceMetrics[page] = {
          performance: null,
          seo: null,
          lcp: null,
          cls: null,
          fid: null,
          error: `Lighthouse execution failed: ${error.message}`
        };
      }
    }
  }

  async run() {
    await this.init();
    
    // Start crawling from homepage
    this.toVisit.push({ url: AUDIT_CONFIG.baseUrl, depth: 0, source: 'start' });
    
    // Add sitemap URLs
    try {
      const sitemapResponse = await this.fetchWithRetry(`${AUDIT_CONFIG.baseUrl}/sitemap.xml`);
      const sitemapText = await sitemapResponse.text();
      const sitemapUrls = this.extractSitemapUrls(sitemapText);
      
      for (const url of sitemapUrls.slice(0, 100)) { // Limit to first 100 for performance
        this.toVisit.push({ url, depth: 0, source: 'sitemap' });
      }
    } catch (error) {
      console.warn('⚠️ Could not fetch sitemap');
    }
    
    // Process crawl queue
    while (this.toVisit.length > 0) {
      const batch = this.toVisit.splice(0, AUDIT_CONFIG.concurrency);
      await Promise.all(batch.map(({ url, depth, source }) => 
        this.crawlPage(url, depth).catch(console.error)
      ));
    }
    
    // Run Lighthouse audits
    await this.runLighthouseAudit();
    
    // Generate reports
    await this.generateReports();
    
    console.log(`\n📋 Audit Complete!`);
    console.log(`   Pages crawled: ${this.crawledUrls.size}`);
    console.log(`   Broken links: ${this.brokenLinks.length}`);
    console.log(`   SEO issues: ${this.seoIssues.reduce((sum, page) => sum + page.issues.length, 0)}`);
    console.log(`   Reports saved to: ${AUDIT_CONFIG.outputDir}/`);
  }

  extractSitemapUrls(sitemapXml) {
    const urls = [];
    const locMatches = sitemapXml.match(/<loc>([^<]+)<\/loc>/g) || [];
    
    for (const match of locMatches) {
      const url = match.replace('<loc>', '').replace('</loc>', '');
      if (url && !url.includes('sitemap')) { // Skip sitemap index files
        urls.push(url);
      }
    }
    
    return urls;
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const auditor = new SEOAuditor();
  auditor.run().catch(console.error);
}

export default SEOAuditor;