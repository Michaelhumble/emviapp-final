#!/usr/bin/env node

/**
 * 🚀 GSC URL Indexing Request Tool
 * 
 * Submits high-priority URLs to Google Search Console for immediate indexing.
 * Uses the GSC Indexing API with quota-aware batching and rate limiting.
 * 
 * Usage: 
 *   node scripts/gsc-indexing-request.mjs [--batch-size=10] [--delay=2000]
 *   
 * Environment Variables Required:
 *   GOOGLE_API_KEY or GOOGLE_SERVICE_ACCOUNT_KEY (JSON)
 *   
 * Quota Limits (per day):
 *   - Standard: 200 URL submissions
 *   - With service account: 200 URL submissions
 *   
 * Reference: https://developers.google.com/search/apis/indexing-api/v3/quota-usage
 */

import fs from 'fs/promises';
import path from 'path';

const CONFIG = {
  siteUrl: 'https://www.emvi.app',
  urlsFile: './reports/seo/priority-indexing-urls.txt',
  outputDir: './reports/seo',
  batchSize: parseInt(process.argv.find(arg => arg.startsWith('--batch-size='))?.split('=')[1] || '10'),
  delay: parseInt(process.argv.find(arg => arg.startsWith('--delay='))?.split('=')[1] || '2000'), // 2 second delay
  dryRun: process.argv.includes('--dry-run'),
  maxDaily: 180, // Conservative limit to avoid quota exhaustion
  apiKey: process.env.GOOGLE_API_KEY,
  serviceAccount: process.env.GOOGLE_SERVICE_ACCOUNT_KEY // JSON string
};

class GSCIndexingRequester {
  constructor() {
    this.accessToken = null;
    this.baseUrl = 'https://indexing.googleapis.com/v3';
    this.results = {
      requested: 0,
      success: 0,
      failed: 0,
      skipped: 0,
      errors: []
    };
  }

  async init() {
    await fs.mkdir(CONFIG.outputDir, { recursive: true });
    console.log(`🚀 GSC Indexing Request Tool`);
    console.log(`📁 URLs file: ${CONFIG.urlsFile}`);
    console.log(`📊 Batch size: ${CONFIG.batchSize}`);
    console.log(`⏱️  Delay: ${CONFIG.delay}ms`);
    console.log(`🔒 Dry run: ${CONFIG.dryRun ? 'YES' : 'NO'}`);
    console.log(`⚠️  Daily quota limit: ${CONFIG.maxDaily} requests`);
  }

  async authenticate() {
    try {
      let authData;
      
      if (CONFIG.serviceAccount) {
        // Service Account authentication (recommended)
        console.log('🔐 Using service account authentication...');
        const serviceAccount = JSON.parse(CONFIG.serviceAccount);
        authData = await this.getServiceAccountToken(serviceAccount);
      } else if (CONFIG.apiKey) {
        // API Key authentication (limited)
        console.log('🔑 Using API key authentication...');
        this.accessToken = CONFIG.apiKey;
        return true;
      } else {
        console.error('❌ Missing authentication credentials');
        console.log('Provide one of:');
        console.log('  GOOGLE_API_KEY=your_api_key');
        console.log('  GOOGLE_SERVICE_ACCOUNT_KEY=\'{"type":"service_account",...}\'');
        console.log('');
        console.log('🔗 Setup guide: https://developers.google.com/search/apis/indexing-api/v3/prereqs');
        return false;
      }
      
      this.accessToken = authData.access_token;
      console.log('✅ Successfully authenticated with Google Indexing API');
      return true;
    } catch (error) {
      console.error('❌ Authentication failed:', error.message);
      return false;
    }
  }

  async getServiceAccountToken(serviceAccount) {
    // JWT-based service account authentication
    const jwt = require('jsonwebtoken');
    const now = Math.floor(Date.now() / 1000);
    
    const payload = {
      iss: serviceAccount.client_email,
      scope: 'https://www.googleapis.com/auth/indexing',
      aud: 'https://oauth2.googleapis.com/token',
      iat: now,
      exp: now + 3600
    };
    
    const token = jwt.sign(payload, serviceAccount.private_key, { algorithm: 'RS256' });
    
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: token
      })
    });
    
    return await response.json();
  }

  async loadUrls() {
    try {
      const content = await fs.readFile(CONFIG.urlsFile, 'utf8');
      const urls = content
        .split('\n')
        .map(line => line.trim())
        .filter(line => line && !line.startsWith('#') && line.startsWith('http'));
      
      console.log(`📋 Loaded ${urls.length} URLs for indexing`);
      
      // Respect daily quota limit
      if (urls.length > CONFIG.maxDaily) {
        console.log(`⚠️  Limiting to ${CONFIG.maxDaily} URLs due to quota constraints`);
        return urls.slice(0, CONFIG.maxDaily);
      }
      
      return urls;
    } catch (error) {
      console.error('❌ Failed to load URLs:', error.message);
      return [];
    }
  }

  async requestIndexing(url) {
    if (CONFIG.dryRun) {
      console.log(`  🧪 DRY RUN: Would request indexing for ${url}`);
      this.results.success++;
      return { success: true, dryRun: true };
    }

    try {
      const requestBody = {
        url: url,
        type: 'URL_UPDATED'
      };

      const response = await fetch(`${this.baseUrl}/urlNotifications:publish`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (response.ok) {
        console.log(`  ✅ Requested indexing: ${url}`);
        this.results.success++;
        return { success: true };
      } else {
        const error = await response.text();
        console.log(`  ❌ Failed: ${url} - ${response.status} ${error}`);
        this.results.failed++;
        this.results.errors.push({ url, error: `${response.status}: ${error}` });
        return { success: false, error };
      }
    } catch (error) {
      console.log(`  ❌ Error: ${url} - ${error.message}`);
      this.results.failed++;
      this.results.errors.push({ url, error: error.message });
      return { success: false, error: error.message };
    }
  }

  async processBatch(urls) {
    console.log(`\n🔄 Processing batch of ${urls.length} URLs...`);
    
    for (const url of urls) {
      this.results.requested++;
      await this.requestIndexing(url);
      
      // Rate limiting delay
      if (CONFIG.delay > 0) {
        await new Promise(resolve => setTimeout(resolve, CONFIG.delay));
      }
    }
  }

  async generateReport() {
    const timestamp = new Date().toISOString().split('T')[0];
    const reportFile = path.join(CONFIG.outputDir, `gsc-indexing-report-${timestamp}.json`);
    
    const report = {
      timestamp: new Date().toISOString(),
      site: CONFIG.siteUrl,
      dry_run: CONFIG.dryRun,
      batch_size: CONFIG.batchSize,
      delay_ms: CONFIG.delay,
      results: this.results,
      quota_info: {
        daily_limit: CONFIG.maxDaily,
        requests_made: this.results.requested,
        remaining_estimate: CONFIG.maxDaily - this.results.requested
      }
    };

    await fs.writeFile(reportFile, JSON.stringify(report, null, 2));
    console.log(`📄 Report saved: ${reportFile}`);
    return report;
  }

  async run() {
    try {
      await this.init();
      
      if (!await this.authenticate()) {
        process.exit(1);
      }

      const urls = await this.loadUrls();
      if (urls.length === 0) {
        console.log('❌ No URLs to process');
        process.exit(1);
      }

      // Process URLs in batches
      for (let i = 0; i < urls.length; i += CONFIG.batchSize) {
        const batch = urls.slice(i, i + CONFIG.batchSize);
        await this.processBatch(batch);
        
        // Progress update
        const progress = Math.round(((i + batch.length) / urls.length) * 100);
        console.log(`📊 Progress: ${progress}% (${i + batch.length}/${urls.length})`);
        
        // Longer delay between batches to respect API limits
        if (i + CONFIG.batchSize < urls.length) {
          console.log(`⏳ Waiting before next batch...`);
          await new Promise(resolve => setTimeout(resolve, CONFIG.delay * 2));
        }
      }

      // Generate final report
      const report = await this.generateReport();
      
      console.log('\n📊 Indexing Request Summary:');
      console.log(`   URLs Processed: ${this.results.requested}`);
      console.log(`   Successful: ${this.results.success}`);
      console.log(`   Failed: ${this.results.failed}`);
      console.log(`   Success Rate: ${Math.round((this.results.success / this.results.requested) * 100)}%`);
      
      if (this.results.errors.length > 0) {
        console.log('\n❌ Errors encountered:');
        this.results.errors.slice(0, 5).forEach(error => {
          console.log(`   ${error.url}: ${error.error}`);
        });
        if (this.results.errors.length > 5) {
          console.log(`   ... and ${this.results.errors.length - 5} more errors`);
        }
      }

      if (CONFIG.dryRun) {
        console.log('\n🧪 This was a dry run. No actual requests were sent to Google.');
        console.log('Remove --dry-run flag to submit real indexing requests.');
      } else {
        console.log('\n✅ Indexing requests completed.');
        console.log('⏰ Google typically processes requests within minutes to hours.');
        console.log('📊 Monitor status in Google Search Console.');
      }

    } catch (error) {
      console.error('❌ Indexing request process failed:', error.message);
      process.exit(1);
    }
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const requester = new GSCIndexingRequester();
  requester.run().catch(console.error);
}

export default GSCIndexingRequester;