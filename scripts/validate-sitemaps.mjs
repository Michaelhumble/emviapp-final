#!/usr/bin/env node

/**
 * Sitemap Validation Script for EmviApp
 * 
 * Validates all sitemaps and their referenced URLs:
 * - Checks sitemap.xml structure and accessibility
 * - Validates all URLs in sitemaps return 200 status
 * - Handles HEAD/GET fallback for 405 responses
 * - Detects soft 404s (200 status but error content)
 * - Reports broken or problematic URLs
 */

import fs from 'fs/promises';
import path from 'path';

const CONFIG = {
  baseUrl: process.env.SITEMAP_BASE_URL || 'https://www.emvi.app',
  outputDir: './reports',
  concurrency: 10,
  timeout: 15000,
  userAgent: 'EmviApp-Sitemap-Validator/1.0'
};

class SitemapValidator {
  constructor() {
    this.results = {
      valid: [],
      broken: [],
      redirects: [],
      soft404s: [],
      errors: []
    };
    this.totalUrls = 0;
    this.checkedUrls = new Set();
  }

  async fetchWithRetry(url, options = {}) {
    const maxRetries = 2;
    let lastError;

    for (let i = 0; i < maxRetries; i++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), CONFIG.timeout);
        
        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
          headers: {
            'User-Agent': CONFIG.userAgent,
            ...options.headers
          }
        });
        
        clearTimeout(timeoutId);
        return response;
      } catch (error) {
        lastError = error;
        if (i < maxRetries - 1) {
          await new Promise(resolve => setTimeout(resolve, 500 * (i + 1)));
        }
      }
    }
    throw lastError;
  }

  async validateUrl(url) {
    if (this.checkedUrls.has(url)) {
      return; // Skip already checked URLs
    }
    this.checkedUrls.add(url);

    try {
      // Try HEAD first for efficiency
      let response = await this.fetchWithRetry(url, { method: 'HEAD' });
      
      // If HEAD returns 405, try GET
      if (response.status === 405) {
        response = await this.fetchWithRetry(url);
      }
      
      const status = response.status;
      const finalUrl = response.url;
      
      if (status >= 200 && status < 300) {
        // Check for soft 404s if it's HTML content
        if (response.headers.get('content-type')?.includes('text/html')) {
          const html = await response.text();
          if (this.isSoft404(html)) {
            this.results.soft404s.push({
              url,
              finalUrl,
              status,
              issue: 'Soft 404 detected - returns 200 but shows error content'
            });
            return;
          }
        }
        
        // Check for redirects
        if (url !== finalUrl) {
          this.results.redirects.push({
            url,
            finalUrl,
            status,
            type: status === 301 ? 'permanent' : 'temporary'
          });
        } else {
          this.results.valid.push({ url, status });
        }
        
      } else if (status >= 300 && status < 400) {
        this.results.redirects.push({
          url,
          finalUrl,
          status,
          type: status === 301 ? 'permanent' : 'temporary'
        });
        
      } else {
        this.results.broken.push({
          url,
          status,
          issue: this.getStatusMessage(status)
        });
      }
      
    } catch (error) {
      this.results.errors.push({
        url,
        error: error.message,
        issue: 'Network error or timeout'
      });
    }
  }

  isSoft404(html) {
    if (!html || html.length < 100) return true;
    
    const indicators = [
      /not found/i,
      /404/,
      /page.*not.*found/i,
      /this page doesn\'t exist/i,
      /<title[^>]*>.*404.*<\/title>/i,
      /error.*404/i
    ];
    
    return indicators.some(regex => regex.test(html));
  }

  getStatusMessage(status) {
    const messages = {
      400: 'Bad Request',
      401: 'Unauthorized',
      403: 'Forbidden',
      404: 'Not Found',
      405: 'Method Not Allowed',
      410: 'Gone',
      500: 'Internal Server Error',
      502: 'Bad Gateway',
      503: 'Service Unavailable',
      504: 'Gateway Timeout'
    };
    return messages[status] || `HTTP ${status}`;
  }

  async fetchSitemap(url) {
    try {
      console.log(`📄 Fetching sitemap: ${url}`);
      const response = await this.fetchWithRetry(url);
      
      if (!response.ok) {
        throw new Error(`Sitemap returned ${response.status}: ${this.getStatusMessage(response.status)}`);
      }
      
      const xml = await response.text();
      return this.parseSitemap(xml);
      
    } catch (error) {
      console.error(`❌ Failed to fetch sitemap ${url}: ${error.message}`);
      return [];
    }
  }

  parseSitemap(xml) {
    const urls = [];
    
    // Check if it's a sitemap index
    if (xml.includes('<sitemapindex')) {
      const sitemapMatches = xml.match(/<loc>([^<]+)<\/loc>/g) || [];
      return sitemapMatches.map(match => 
        match.replace('<loc>', '').replace('</loc>', '').trim()
      );
    }
    
    // Regular sitemap with URLs
    const urlMatches = xml.match(/<url>[\s\S]*?<\/url>/g) || [];
    
    for (const urlBlock of urlMatches) {
      const locMatch = urlBlock.match(/<loc>([^<]+)<\/loc>/);
      if (locMatch) {
        urls.push(locMatch[1].trim());
      }
    }
    
    return urls;
  }

  async validateAllSitemaps() {
    const mainSitemapUrl = `${CONFIG.baseUrl}/sitemap.xml`;
    console.log(`🚀 Starting sitemap validation for ${CONFIG.baseUrl}`);
    
    // Get all sitemap URLs
    const sitemapUrls = await this.fetchSitemap(mainSitemapUrl);
    const allUrls = new Set();
    
    // If main sitemap is an index, fetch all sub-sitemaps
    if (sitemapUrls.some(url => url.includes('sitemap'))) {
      console.log(`📋 Found sitemap index with ${sitemapUrls.length} sitemaps`);
      
      for (const sitemapUrl of sitemapUrls) {
        const urls = await this.fetchSitemap(sitemapUrl);
        urls.forEach(url => allUrls.add(url));
      }
    } else {
      // Main sitemap contains URLs directly
      sitemapUrls.forEach(url => allUrls.add(url));
    }
    
    this.totalUrls = allUrls.size;
    console.log(`🔍 Found ${this.totalUrls} URLs to validate`);
    
    // Validate URLs in batches
    const urlArray = Array.from(allUrls);
    const batches = [];
    
    for (let i = 0; i < urlArray.length; i += CONFIG.concurrency) {
      batches.push(urlArray.slice(i, i + CONFIG.concurrency));
    }
    
    let processed = 0;
    for (const batch of batches) {
      await Promise.all(batch.map(url => this.validateUrl(url)));
      processed += batch.length;
      console.log(`✅ Validated ${processed}/${this.totalUrls} URLs`);
    }
  }

  async generateReport() {
    await fs.mkdir(CONFIG.outputDir, { recursive: true });
    
    const report = {
      timestamp: new Date().toISOString(),
      baseUrl: CONFIG.baseUrl,
      summary: {
        total: this.totalUrls,
        valid: this.results.valid.length,
        broken: this.results.broken.length,
        redirects: this.results.redirects.length,
        soft404s: this.results.soft404s.length,
        errors: this.results.errors.length
      },
      results: this.results
    };
    
    // JSON Report
    await fs.writeFile(
      path.join(CONFIG.outputDir, 'sitemap-validation.json'),
      JSON.stringify(report, null, 2)
    );
    
    // CSV Report for broken links
    const csvHeaders = 'URL,Status,Issue,Type\n';
    const csvRows = [];
    
    this.results.broken.forEach(item => {
      csvRows.push(`"${item.url}","${item.status}","${item.issue}","broken"`);
    });
    
    this.results.soft404s.forEach(item => {
      csvRows.push(`"${item.url}","${item.status}","${item.issue}","soft404"`);
    });
    
    this.results.errors.forEach(item => {
      csvRows.push(`"${item.url}","error","${item.issue}","error"`);
    });
    
    await fs.writeFile(
      path.join(CONFIG.outputDir, 'sitemap-issues.csv'),
      csvHeaders + csvRows.join('\n')
    );
    
    // Console summary
    console.log('\n📊 Sitemap Validation Summary:');
    console.log(`   Total URLs: ${report.summary.total}`);
    console.log(`   ✅ Valid: ${report.summary.valid}`);
    console.log(`   🔀 Redirects: ${report.summary.redirects}`);
    console.log(`   ❌ Broken: ${report.summary.broken}`);
    console.log(`   ⚠️  Soft 404s: ${report.summary.soft404s}`);
    console.log(`   💥 Errors: ${report.summary.errors}`);
    
    if (report.summary.broken > 0 || report.summary.errors > 0) {
      console.log('\n🚨 Issues found:');
      
      [...this.results.broken, ...this.results.errors].slice(0, 10).forEach(item => {
        console.log(`   • ${item.url} - ${item.issue || item.error}`);
      });
      
      if (report.summary.broken + report.summary.errors > 10) {
        console.log(`   ... and ${report.summary.broken + report.summary.errors - 10} more`);
      }
    }
    
    console.log(`\n📄 Reports saved to: ${CONFIG.outputDir}/sitemap-validation.json`);
    
    return report;
  }

  async run() {
    try {
      await this.validateAllSitemaps();
      return await this.generateReport();
    } catch (error) {
      console.error('❌ Sitemap validation failed:', error.message);
      throw error;
    }
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const validator = new SitemapValidator();
  validator.run()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

export default SitemapValidator;