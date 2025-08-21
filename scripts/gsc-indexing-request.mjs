#!/usr/bin/env node

/**
 * 🚀 GSC URL Indexing Request Tool - Jobs Only
 * 
 * Submits ONLY JobPosting URLs to Google Search Console Indexing API.
 * Uses Service Account authentication with proper JWT tokens.
 * 
 * Usage: 
 *   node scripts/gsc-indexing-request.mjs [--dry-run]
 *   
 * Environment Variables:
 *   GOOGLE_APPLICATION_CREDENTIALS (path to service account JSON file)
 *   
 * Quota Limits (per day):
 *   - Standard: 200 URL submissions
 *   - Safety limit: 180 requests to avoid quota exhaustion
 *   
 * Reference: https://developers.google.com/search/apis/indexing-api/v3/quota-usage
 */

import fs from 'fs/promises';
import path from 'path';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const CONFIG = {
  siteUrl: 'https://www.emvi.app',
  urlsFile: './reports/seo/priority-indexing-urls-jobs.txt',
  outputDir: './reports/seo/indexing-logs',
  delay: 2000, // 2 seconds between requests
  dryRun: process.argv.includes('--dry-run'),
  maxDaily: 180, // Conservative limit to avoid quota exhaustion
  serviceAccountPath: process.env.GOOGLE_APPLICATION_CREDENTIALS || './secrets/google-service-account.json'
};

class GSCIndexingRequester {
  constructor() {
    this.accessToken = null;
    this.baseUrl = 'https://indexing.googleapis.com/v3';
    this.results = {
      requested: 0,
      success: 0,
      failed: 0,
      errors: [],
      responses: []
    };
  }

  async init() {
    await fs.mkdir(CONFIG.outputDir, { recursive: true });
    console.log(`🚀 GSC Indexing Request Tool - Jobs Only`);
    console.log(`📁 Jobs URLs file: ${CONFIG.urlsFile}`);
    console.log(`⏱️  Rate limit: ${CONFIG.delay}ms between requests`);
    console.log(`🔒 Mode: ${CONFIG.dryRun ? 'DRY RUN' : 'LIVE SUBMISSION'}`);
    console.log(`⚠️  Daily quota limit: ${CONFIG.maxDaily} requests`);
    console.log(`🔐 Service Account: ${CONFIG.serviceAccountPath}`);
  }

  async authenticate() {
    try {
      console.log('🔐 Authenticating with Google Service Account...');
      
      // Check if service account file exists
      const serviceAccountData = await fs.readFile(CONFIG.serviceAccountPath, 'utf8');
      const serviceAccount = JSON.parse(serviceAccountData);
      
      // Validate service account structure
      if (!serviceAccount.client_email || !serviceAccount.private_key) {
        throw new Error('Invalid service account JSON - missing client_email or private_key');
      }
      
      console.log(`📧 Service Account Email: ${serviceAccount.client_email}`);
      console.log('⚠️  IMPORTANT: Ensure this service account email is added as an OWNER in Google Search Console');
      console.log('   Visit: https://search.google.com/search-console/users');
      console.log('   Add as Owner (not just User) for domain verification.');
      
      // Get OAuth2 token using JWT
      const authData = await this.getServiceAccountToken(serviceAccount);
      
      if (!authData.access_token) {
        throw new Error(`OAuth2 token request failed: ${JSON.stringify(authData)}`);
      }
      
      this.accessToken = authData.access_token;
      console.log('✅ Successfully authenticated with Google Indexing API');
      return true;
    } catch (error) {
      console.error('❌ Authentication failed:', error.message);
      
      if (error.code === 'ENOENT') {
        console.log('');
        console.log('🔧 To fix this:');
        console.log('1. Create a Google Service Account: https://console.cloud.google.com/');
        console.log('2. Download the JSON key file');
        console.log(`3. Save it as: ${CONFIG.serviceAccountPath}`);
        console.log('4. Add the service account email as OWNER in Google Search Console');
      }
      
      return false;
    }
  }

  async getServiceAccountToken(serviceAccount) {
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
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`OAuth2 request failed: ${response.status} ${JSON.stringify(data)}`);
    }
    
    return data;
  }

  async loadUrls() {
    try {
      const content = await fs.readFile(CONFIG.urlsFile, 'utf8');
      const urls = content
        .split('\n')
        .map(line => line.trim())
        .filter(line => line && !line.startsWith('#') && line.startsWith('http'));
      
      console.log(`📋 Loaded ${urls.length} job URLs for indexing`);
      
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
      this.results.responses.push({ url, status: 'dry_run', timestamp: new Date().toISOString() });
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

      const responseData = await response.text();
      
      if (response.ok) {
        console.log(`  ✅ Success: ${url}`);
        this.results.success++;
        this.results.responses.push({ 
          url, 
          status: 'success', 
          timestamp: new Date().toISOString(),
          response: responseData 
        });
        return { success: true };
      } else {
        console.log(`  ❌ Failed: ${url} - ${response.status} ${responseData}`);
        this.results.failed++;
        this.results.errors.push({ url, error: `${response.status}: ${responseData}` });
        this.results.responses.push({ 
          url, 
          status: 'failed', 
          timestamp: new Date().toISOString(),
          error: `${response.status}: ${responseData}` 
        });
        return { success: false, error: responseData };
      }
    } catch (error) {
      console.log(`  ❌ Error: ${url} - ${error.message}`);
      this.results.failed++;
      this.results.errors.push({ url, error: error.message });
      this.results.responses.push({ 
        url, 
        status: 'error', 
        timestamp: new Date().toISOString(),
        error: error.message 
      });
      return { success: false, error: error.message };
    }
  }

  async processUrls(urls) {
    console.log(`\n🔄 Processing ${urls.length} job URLs...`);
    
    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      this.results.requested++;
      
      console.log(`[${i + 1}/${urls.length}] Processing: ${url}`);
      await this.requestIndexing(url);
      
      // Rate limiting delay (except for last URL)
      if (i < urls.length - 1) {
        console.log(`  ⏳ Waiting ${CONFIG.delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, CONFIG.delay));
      }
      
      // Progress update every 10 URLs
      if ((i + 1) % 10 === 0) {
        const progress = Math.round(((i + 1) / urls.length) * 100);
        console.log(`📊 Progress: ${progress}% (${i + 1}/${urls.length})`);
      }
    }
  }

  async generateReport() {
    const timestamp = new Date().toISOString().split('T')[0];
    const reportFile = path.join(CONFIG.outputDir, `${timestamp}.json`);
    
    const report = {
      timestamp: new Date().toISOString(),
      site: CONFIG.siteUrl,
      mode: CONFIG.dryRun ? 'dry_run' : 'live',
      job_urls_only: true,
      rate_limit_ms: CONFIG.delay,
      daily_limit: CONFIG.maxDaily,
      results: {
        total_requested: this.results.requested,
        successful: this.results.success,
        failed: this.results.failed,
        success_rate_percent: this.results.requested > 0 ? Math.round((this.results.success / this.results.requested) * 100) : 0
      },
      quota_usage: {
        requests_made: this.results.requested,
        daily_limit: CONFIG.maxDaily,
        remaining_estimate: CONFIG.maxDaily - this.results.requested
      },
      errors: this.results.errors.slice(0, 20), // Limit error details
      detailed_responses: this.results.responses
    };

    await fs.writeFile(reportFile, JSON.stringify(report, null, 2));
    console.log(`📄 Detailed log saved: ${reportFile}`);
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
        console.log('❌ No job URLs to process');
        process.exit(1);
      }

      // Show first 10 URLs in dry-run mode
      if (CONFIG.dryRun) {
        console.log('\n🧪 DRY RUN - First 10 URLs that would be submitted:');
        urls.slice(0, 10).forEach((url, i) => {
          console.log(`  ${i + 1}. ${url}`);
        });
        if (urls.length > 10) {
          console.log(`  ... and ${urls.length - 10} more URLs`);
        }
        console.log('');
      }

      // Process all URLs
      await this.processUrls(urls);

      // Generate final report
      const report = await this.generateReport();
      
      console.log('\n📊 Indexing Request Summary:');
      console.log(`   URLs Processed: ${this.results.requested}`);
      console.log(`   Successful: ${this.results.success}`);
      console.log(`   Failed: ${this.results.failed}`);
      console.log(`   Success Rate: ${report.results.success_rate_percent}%`);
      
      if (this.results.errors.length > 0) {
        console.log('\n❌ First 5 errors:');
        this.results.errors.slice(0, 5).forEach(error => {
          console.log(`   ${error.url}: ${error.error}`);
        });
        if (this.results.errors.length > 5) {
          console.log(`   ... and ${this.results.errors.length - 5} more errors (see log file)`);
        }
      }

      if (CONFIG.dryRun) {
        console.log('\n🧪 This was a dry run. No actual requests were sent to Google.');
        console.log('Remove --dry-run flag to submit real indexing requests.');
      } else {
        console.log('\n✅ Job indexing requests completed.');
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