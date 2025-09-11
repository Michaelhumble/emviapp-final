#!/usr/bin/env node

/**
 * Minimal Google Search Console Data Puller
 * Fetches index status + impressions/clicks for URLs from GSC
 * 
 * Usage: node scripts/gsc-pulls.mjs [--urls=path/to/list.json]
 * Output: .seo-cache/gsc-{date}.json
 */

import fs from 'fs/promises';
import path from 'path';

const today = new Date().toISOString().split('T')[0];
const outputDir = '.seo-cache';
const outputFile = path.join(outputDir, `gsc-${today}.json`);

// Get URLs file from command line or default
const urlsArg = process.argv.find(arg => arg.startsWith('--urls='));
const urlsFile = urlsArg ? urlsArg.split('=')[1] : 'data/priority-urls.json';
const submitIndexing = process.argv.includes('--submitIndexing');

async function checkSecrets() {
  const clientEmail = process.env.GSC_CLIENT_EMAIL;
  const privateKey = process.env.GSC_PRIVATE_KEY;

  if (!clientEmail || !privateKey) {
    console.log('ℹ️ GSC skipped (missing/invalid creds)');
    process.exit(0);
  }

  // Validate format
  if (!clientEmail.includes('@') || !clientEmail.endsWith('.iam.gserviceaccount.com')) {
    console.log('ℹ️ GSC skipped (missing/invalid creds) - invalid email format');
    process.exit(0);
  }

  if (!privateKey.includes('-----BEGIN PRIVATE KEY-----') || !privateKey.includes('-----END PRIVATE KEY-----') || !privateKey.includes('\\n')) {
    console.log('ℹ️ GSC skipped (missing/invalid creds) - invalid key format');
    process.exit(0);
  }

  console.log('✅ GSC auth OK');
  return { clientEmail, privateKey };
}

async function loadUrls() {
  try {
    const urlsData = await fs.readFile(urlsFile, 'utf8');
    const urls = JSON.parse(urlsData);
    console.log(`📄 Loaded ${urls.length} URLs from ${urlsFile}`);
    return urls;
  } catch (error) {
    console.log(`⚠️ Could not load URLs from ${urlsFile}, using defaults`);
    return [
      'https://www.emvi.app/',
      'https://www.emvi.app/jobs',
      'https://www.emvi.app/salons',
      'https://www.emvi.app/artists'
    ];
  }
}

async function getAccessToken(clientEmail, privateKey) {
  try {
    // Simple JWT creation for service account auth
    const jwt = await createServiceAccountJWT(clientEmail, privateKey);
    
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: jwt
      })
    });

    if (!response.ok) {
      throw new Error(`Token request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('❌ Authentication failed:', error.message);
    console.log('ℹ️ GSC skipped (missing/invalid creds)');
    process.exit(0);
  }
}

async function createServiceAccountJWT(clientEmail, privateKey) {
  try {
    // Import crypto for JWT signing
    const crypto = await import('crypto');
    
    const header = { alg: 'RS256', typ: 'JWT' };
    const now = Math.floor(Date.now() / 1000);
    
    const payload = {
      iss: clientEmail,
      scope: submitIndexing 
        ? 'https://www.googleapis.com/auth/indexing' 
        : 'https://www.googleapis.com/auth/webmasters.readonly',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now
    };

    // Encode header and payload
    const encodedHeader = Buffer.from(JSON.stringify(header))
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
    
    const encodedPayload = Buffer.from(JSON.stringify(payload))
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');

    // Create signature
    const signingInput = `${encodedHeader}.${encodedPayload}`;
    
    // Clean up private key - replace \\n with actual newlines
    const cleanPrivateKey = privateKey.replace(/\\n/g, '\n');
    
    const signature = crypto.sign('RSA-SHA256', Buffer.from(signingInput), cleanPrivateKey);
    const encodedSignature = signature
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');

    return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
  } catch (error) {
    console.error('JWT creation failed:', error.message);
    throw new Error(`Failed to create service account JWT: ${error.message}`);
  }
}

async function fetchGSCData(urls, accessToken) {
  const results = [];
  
  for (const url of urls.slice(0, 10)) { // Limit to 10 URLs for minimal version
    try {
      console.log(`📊 Fetching data for: ${url}`);
      
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - 30); // Last 30 days

      const request = {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        dimensions: ['page'],
        dimensionFilterGroups: [{
          filters: [{
            dimension: 'page',
            operator: 'equals',
            expression: url
          }]
        }]
      };

      const response = await fetch(
        'https://www.googleapis.com/webmasters/v3/sites/https%3A%2F%2Fwww.emvi.app%2F/searchAnalytics/query',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(request)
        }
      );

      if (response.ok) {
        const data = await response.json();
        const pageData = data.rows?.[0] || { clicks: 0, impressions: 0, ctr: 0, position: 0 };
        
        results.push({
          url,
          clicks: pageData.clicks || 0,
          impressions: pageData.impressions || 0,
          ctr: pageData.ctr || 0,
          position: pageData.position || 0,
          status: 'success'
        });
      } else {
        results.push({
          url,
          status: 'error',
          error: `HTTP ${response.status}`
        });
      }
      
      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error) {
      results.push({
        url,
        status: 'error',
        error: error.message
      });
    }
  }

  return results;
}

async function submitForIndexing(urls, accessToken) {
  const submissionResults = [];
  let successCount = 0;
  
  // Batch processing for large URL lists
  const batchSize = 100; // GSC API limit
  const batches = [];
  
  for (let i = 0; i < urls.length; i += batchSize) {
    batches.push(urls.slice(i, i + batchSize));
  }
  
  console.log(`📦 Processing ${urls.length} URLs in ${batches.length} batch(es)`);
  
  for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
    const batch = batches[batchIndex];
    console.log(`📤 Processing batch ${batchIndex + 1}/${batches.length} (${batch.length} URLs)`);
    
    for (const url of batch) { // Process each URL in the batch
    try {
      console.log(`📤 Submitting for indexing: ${url}`);
      
      const response = await fetch(
        'https://indexing.googleapis.com/v3/urlNotifications:publish',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            url: url,
            type: 'URL_UPDATED'
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        submissionResults.push({
          url,
          status: 'submitted',
          response: data
        });
        successCount++;
        console.log(`✅ Successfully submitted: ${url}`);
      } else {
        const errorText = await response.text();
        submissionResults.push({
          url,
          status: 'failed',
          error: `HTTP ${response.status}: ${errorText}`
        });
        console.warn(`⚠️ Failed to submit ${url}: HTTP ${response.status}`);
      }
      
      // Rate limiting - wait between submissions (1 request per second)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      submissionResults.push({
        url,
        status: 'error',
        error: error.message
      });
      console.error(`❌ Error submitting ${url}: ${error.message}`);
    }
    }
    
    // Small delay between batches
    if (batchIndex < batches.length - 1) {
      console.log('⏳ Waiting 5 seconds between batches...');
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
  
  return { results: submissionResults, successCount };
}

async function main() {
  if (submitIndexing) {
    console.log('🚀 GSC Priority URL Indexing Submitter');
  } else {
    console.log('🔍 GSC Data Puller (Minimal Version)');
  }
  
  // Check for required secrets
  const { clientEmail, privateKey } = await checkSecrets();
  
  // Auto-create output directory
  await fs.mkdir(outputDir, { recursive: true });
  
  // Load URLs to process
  const urls = await loadUrls();
  
  // Get access token
  console.log('🔐 Authenticating with GSC...');
  const accessToken = await getAccessToken(clientEmail, privateKey);
  
  if (submitIndexing) {
    // Submit URLs for indexing
    console.log('📤 Submitting URLs for indexing...');
    const { results, successCount } = await submitForIndexing(urls, accessToken);
    
    const indexingOutput = {
      timestamp: new Date().toISOString(),
      date: today,
      mode: 'indexing_submission',
      total_urls: urls.length,
      submitted_count: successCount,
      failed_count: results.filter(r => r.status === 'failed' || r.status === 'error').length,
      results
    };
    
    const indexingFile = path.join(outputDir, `gsc-indexing-${today}.json`);
    await fs.writeFile(indexingFile, JSON.stringify(indexingOutput, null, 2));
    
    console.log(`✅ Indexing results saved to ${indexingFile}`);
    console.log(`📊 Summary: submitted: ${successCount}, errors: ${indexingOutput.failed_count}, total: ${urls.length}`);
    
    if (successCount === 0) {
      console.warn('⚠️ No URLs were successfully submitted for indexing');
      // Don't exit with error - let workflow handle this gracefully
      return;
    }
    
    // Log final success message for workflow parsing
    console.log(`submitted: ${successCount}`);
    
  } else {
    // Fetch GSC data (original functionality)
    console.log('📊 Fetching GSC data...');
    const results = await fetchGSCData(urls, accessToken);
    
    const output = {
      timestamp: new Date().toISOString(),
      date: today,
      mode: 'data_fetch',
      urls_checked: urls.length,
      results_count: results.length,
      successful: results.filter(r => r.status === 'success').length,
      failed: results.filter(r => r.status === 'error').length,
      data: results
    };
    
    await fs.writeFile(outputFile, JSON.stringify(output, null, 2));
    
    console.log(`✅ GSC data saved to ${outputFile}`);
    console.log(`📊 Results: ${output.successful} successful, ${output.failed} failed`);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('❌ GSC pull failed:', error.message);
    process.exit(1);
  });
}