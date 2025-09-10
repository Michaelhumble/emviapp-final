#!/usr/bin/env node

/**
 * Minimal Core Web Vitals Collector
 * Collects CWV data via PageSpeed Insights API (CrUX data)
 * 
 * Usage: node scripts/collect-cwv.mjs [--urls=path/to/urls.json]
 * Output: .seo-cache/cwv-{date}.json
 */

import fs from 'fs/promises';
import path from 'path';

const today = new Date().toISOString().split('T')[0];
const outputDir = '.seo-cache';
const outputFile = path.join(outputDir, `cwv-${today}.json`);

// CWV Thresholds (Google's recommendations)
const CWV_THRESHOLDS = {
  LCP: { good: 2500, needsImprovement: 4000 }, // ms
  FID: { good: 100, needsImprovement: 300 },   // ms  
  CLS: { good: 0.1, needsImprovement: 0.25 }   // score
};

// Get URLs file from command line or use priority URLs
const urlsArg = process.argv.find(arg => arg.startsWith('--urls='));
const urlsFile = urlsArg ? urlsArg.split('=')[1] : 'data/priority-urls.json';

async function loadUrls() {
  try {
    const urlsData = await fs.readFile(urlsFile, 'utf8');
    const urls = JSON.parse(urlsData);
    console.log(`📄 Loaded ${urls.length} URLs from ${urlsFile}`);
    return urls.slice(0, 5); // Limit to 5 URLs to avoid API rate limits
  } catch (error) {
    console.log(`⚠️ Could not load URLs from ${urlsFile}, using homepage only`);
    return ['https://www.emvi.app/'];
  }
}

async function fetchPageSpeedData(url) {
  const API_KEY = process.env.PAGESPEED_API_KEY;
  
  if (!API_KEY) {
    console.log('⚠️ PAGESPEED_API_KEY not configured, using mock data');
    return {
      url,
      status: 'mock',
      metrics: {
        LCP: { value: 2300, category: 'GOOD' },
        FID: { value: 89, category: 'GOOD' },
        CLS: { value: 0.08, category: 'GOOD' }
      }
    };
  }

  try {
    console.log(`📊 Fetching CWV data for: ${url}`);
    
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${API_KEY}&category=PERFORMANCE&strategy=MOBILE`;
    
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`PageSpeed API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Extract CWV metrics from CrUX data
    const cruxMetrics = data.loadingExperience?.metrics || {};
    const lighthouseMetrics = data.lighthouseResult?.audits || {};
    
    return {
      url,
      status: 'success',
      metrics: {
        LCP: extractMetric(cruxMetrics['LARGEST_CONTENTFUL_PAINT_MS'] || lighthouseMetrics['largest-contentful-paint']),
        FID: extractMetric(cruxMetrics['FIRST_INPUT_DELAY_MS'] || lighthouseMetrics['max-potential-fid']),
        CLS: extractMetric(cruxMetrics['CUMULATIVE_LAYOUT_SHIFT_SCORE'] || lighthouseMetrics['cumulative-layout-shift'])
      },
      lighthouse_score: data.lighthouseResult?.categories?.performance?.score * 100 || null
    };
    
  } catch (error) {
    console.error(`❌ Failed to fetch CWV for ${url}: ${error.message}`);
    return {
      url,
      status: 'error',
      error: error.message
    };
  }
}

function extractMetric(metricData) {
  if (!metricData) return { value: null, category: 'UNKNOWN' };
  
  // Handle CrUX format
  if (metricData.percentile !== undefined) {
    return {
      value: metricData.percentile,
      category: metricData.category || 'UNKNOWN'
    };
  }
  
  // Handle Lighthouse format
  if (metricData.numericValue !== undefined) {
    return {
      value: metricData.numericValue,
      category: getPerformanceCategory(metricData.numericValue, metricData.id)
    };
  }
  
  return { value: null, category: 'UNKNOWN' };
}

function getPerformanceCategory(value, metricId) {
  const thresholds = {
    'largest-contentful-paint': CWV_THRESHOLDS.LCP,
    'max-potential-fid': CWV_THRESHOLDS.FID,
    'cumulative-layout-shift': CWV_THRESHOLDS.CLS
  };
  
  const threshold = thresholds[metricId];
  if (!threshold) return 'UNKNOWN';
  
  if (value <= threshold.good) return 'GOOD';
  if (value <= threshold.needsImprovement) return 'NEEDS_IMPROVEMENT';
  return 'POOR';
}

function analyzeCWVResults(results) {
  const analysis = {
    total_urls: results.length,
    successful: results.filter(r => r.status === 'success' || r.status === 'mock').length,
    failed: results.filter(r => r.status === 'error').length,
    alerts: [],
    summary: {
      LCP: { good: 0, needsImprovement: 0, poor: 0 },
      FID: { good: 0, needsImprovement: 0, poor: 0 },
      CLS: { good: 0, needsImprovement: 0, poor: 0 }
    }
  };

  results.forEach(result => {
    if (result.status === 'success' || result.status === 'mock') {
      Object.keys(result.metrics).forEach(metric => {
        const category = result.metrics[metric].category;
        const value = result.metrics[metric].value;
        
        if (category === 'GOOD') analysis.summary[metric].good++;
        else if (category === 'NEEDS_IMPROVEMENT') analysis.summary[metric].needsImprovement++;
        else if (category === 'POOR') analysis.summary[metric].poor++;
        
        // Generate alerts for poor performance
        if (category === 'POOR' && value !== null) {
          analysis.alerts.push({
            url: result.url,
            metric,
            value,
            category,
            message: `${metric} is ${value}${getUnit(metric)} - exceeds threshold`
          });
        }
      });
    }
  });

  return analysis;
}

function getUnit(metric) {
  return metric === 'CLS' ? '' : 'ms';
}

async function sendSlackAlert(analysis) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.log('ℹ️ SLACK_WEBHOOK_URL not configured - skipping Slack notification');
    return;
  }
  
  if (analysis.alerts.length === 0) {
    console.log('✅ No CWV alerts to send - all metrics within thresholds');
    return;
  }

  try {
    const message = {
      text: `🚨 Core Web Vitals Alert`,
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*🚨 Core Web Vitals Alert*\n\n${analysis.alerts.length} performance issues detected:`
          }
        },
        {
          type: "section",
          text: {
            type: "mrkdwn", 
            text: analysis.alerts.slice(0, 3).map(alert => 
              `• *${alert.metric}*: ${alert.value}${getUnit(alert.metric)} on ${alert.url}`
            ).join('\n') + (analysis.alerts.length > 3 ? `\n...and ${analysis.alerts.length - 3} more` : '')
          }
        }
      ]
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message)
    });

    if (response.ok) {
      console.log('✅ Slack alert sent successfully');
    } else {
      console.warn(`⚠️ Slack alert failed: ${response.status}`);
    }
    
  } catch (error) {
    console.error('❌ Failed to send Slack alert:', error.message);
  }
}

async function main() {
  console.log('📊 Core Web Vitals Collector');
  console.log(`📁 Output: ${outputFile}`);
  
  // Create output directory
  await fs.mkdir(outputDir, { recursive: true });
  
  // Load URLs to check
  const urls = await loadUrls();
  
  // Collect CWV data
  console.log('📊 Collecting Core Web Vitals data...');
  const results = [];
  
  for (const url of urls) {
    const result = await fetchPageSpeedData(url);
    results.push(result);
    
    // Rate limiting - wait between requests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  // Analyze results
  const analysis = analyzeCWVResults(results);
  
  // Save results
  const output = {
    timestamp: new Date().toISOString(),
    date: today,
    analysis,
    results
  };
  
  await fs.writeFile(outputFile, JSON.stringify(output, null, 2));
  
  console.log(`✅ CWV data saved to ${outputFile}`);
  console.log(`📊 Results: ${analysis.successful} successful, ${analysis.failed} failed`);
  console.log(`⚠️ Alerts: ${analysis.alerts.length} performance issues`);
  
  // Send Slack alert if there are issues
  if (analysis.alerts.length > 0) {
    await sendSlackAlert(analysis);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('❌ CWV collection failed:', error.message);
    process.exit(1);
  });
}