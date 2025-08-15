#!/usr/bin/env node

/**
 * Google Search Console Data Puller
 * 
 * Pulls top queries, CTR data, and performance metrics from GSC API
 * for title/meta testing and content optimization.
 * 
 * Usage: node scripts/gsc-pulls.mjs [--days=90] [--limit=1000]
 */

import fs from 'fs/promises';
import path from 'path';

const CONFIG = {
  siteUrl: process.env.GSC_SITE_URL || 'https://www.emvi.app',
  days: parseInt(process.argv.find(arg => arg.startsWith('--days='))?.split('=')[1] || '90'),
  limit: parseInt(process.argv.find(arg => arg.startsWith('--limit='))?.split('=')[1] || '1000'),
  outputDir: './reports',
  apiKey: process.env.GOOGLE_API_KEY,
  oauth: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN
  }
};

class GSCDataPuller {
  constructor() {
    this.accessToken = null;
    this.baseUrl = 'https://www.googleapis.com/webmasters/v3';
  }

  async init() {
    await fs.mkdir(CONFIG.outputDir, { recursive: true });
    console.log(`📊 GSC Data Puller for ${CONFIG.siteUrl}`);
    console.log(`📅 Date range: Last ${CONFIG.days} days`);
    console.log(`📄 Limit: ${CONFIG.limit} queries`);
  }

  async authenticate() {
    if (!CONFIG.oauth.refreshToken) {
      console.error('❌ Missing Google OAuth credentials');
      console.log('Set these environment variables:');
      console.log('  GOOGLE_CLIENT_ID=your_client_id');
      console.log('  GOOGLE_CLIENT_SECRET=your_client_secret');
      console.log('  GOOGLE_REFRESH_TOKEN=your_refresh_token');
      console.log('');
      console.log('🔗 Setup guide: https://developers.google.com/webmaster-tools/search-console-api-original/v3/quickstart');
      return false;
    }

    try {
      const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: CONFIG.oauth.clientId,
          client_secret: CONFIG.oauth.clientSecret,
          refresh_token: CONFIG.oauth.refreshToken,
          grant_type: 'refresh_token'
        })
      });

      const tokenData = await tokenResponse.json();
      
      if (!tokenResponse.ok) {
        throw new Error(`OAuth error: ${tokenData.error_description || tokenData.error}`);
      }

      this.accessToken = tokenData.access_token;
      console.log('✅ Successfully authenticated with Google Search Console');
      return true;
    } catch (error) {
      console.error('❌ Authentication failed:', error.message);
      return false;
    }
  }

  async makeGSCRequest(endpoint, body = null) {
    const url = `${this.baseUrl}${endpoint}`;
    const options = {
      method: body ? 'POST' : 'GET',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json'
      }
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`GSC API error: ${response.status} ${error}`);
    }

    return await response.json();
  }

  async getTopQueries() {
    console.log('🔍 Fetching top queries...');
    
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - CONFIG.days);

    const request = {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      dimensions: ['query', 'page'],
      rowLimit: CONFIG.limit,
      startRow: 0
    };

    try {
      const response = await this.makeGSCRequest(
        `/sites/${encodeURIComponent(CONFIG.siteUrl)}/searchAnalytics/query`,
        request
      );

      const queries = response.rows || [];
      console.log(`✅ Retrieved ${queries.length} query-page combinations`);
      
      return queries.map(row => ({
        query: row.keys[0],
        page: row.keys[1],
        clicks: row.clicks,
        impressions: row.impressions,
        ctr: row.ctr,
        position: row.position
      }));
    } catch (error) {
      console.error('❌ Failed to fetch queries:', error.message);
      return [];
    }
  }

  async getPagePerformance() {
    console.log('📄 Fetching page performance...');
    
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - CONFIG.days);

    const request = {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      dimensions: ['page'],
      rowLimit: CONFIG.limit,
      startRow: 0
    };

    try {
      const response = await this.makeGSCRequest(
        `/sites/${encodeURIComponent(CONFIG.siteUrl)}/searchAnalytics/query`,
        request
      );

      const pages = response.rows || [];
      console.log(`✅ Retrieved performance for ${pages.length} pages`);
      
      return pages.map(row => ({
        page: row.keys[0],
        clicks: row.clicks,
        impressions: row.impressions,
        ctr: row.ctr,
        position: row.position
      }));
    } catch (error) {
      console.error('❌ Failed to fetch page performance:', error.message);
      return [];
    }
  }

  async identifyOptimizationOpportunities(queries, pages) {
    console.log('🎯 Identifying optimization opportunities...');
    
    const opportunities = [];

    // High impression, low CTR queries (title/meta optimization targets)
    const lowCtrQueries = queries.filter(q => 
      q.impressions > 100 && q.ctr < 0.05 && q.position <= 10
    ).sort((a, b) => b.impressions - a.impressions);

    // High position, low clicks (click-through optimization)
    const highPositionLowClicks = queries.filter(q =>
      q.position <= 3 && q.clicks < 50 && q.impressions > 500
    ).sort((a, b) => b.impressions - a.impressions);

    // Pages with declining performance (need investigation)
    const underperformingPages = pages.filter(p =>
      p.position > 10 && p.impressions > 1000
    ).sort((a, b) => b.impressions - a.impressions);

    return {
      titleOptimization: lowCtrQueries.slice(0, 20),
      ctOptimization: highPositionLowClicks.slice(0, 15),
      contentOptimization: underperformingPages.slice(0, 25)
    };
  }

  async generateReports(queries, pages, opportunities) {
    console.log('📝 Generating reports...');
    
    // Top Queries CSV
    const queriesCsv = [
      'Query,Page,Clicks,Impressions,CTR,Position',
      ...queries.slice(0, 100).map(q => 
        `"${q.query}","${q.page}",${q.clicks},${q.impressions},${(q.ctr * 100).toFixed(2)}%,${q.position.toFixed(1)}`
      )
    ].join('\n');

    await fs.writeFile(
      path.join(CONFIG.outputDir, 'gsc-top-queries.csv'),
      queriesCsv
    );

    // Page Performance CSV  
    const pagesCsv = [
      'Page,Clicks,Impressions,CTR,Position',
      ...pages.slice(0, 100).map(p =>
        `"${p.page}",${p.clicks},${p.impressions},${(p.ctr * 100).toFixed(2)}%,${p.position.toFixed(1)}`
      )
    ].join('\n');

    await fs.writeFile(
      path.join(CONFIG.outputDir, 'gsc-page-performance.csv'),
      pagesCsv
    );

    // Optimization Opportunities JSON
    await fs.writeFile(
      path.join(CONFIG.outputDir, 'gsc-optimization-opportunities.json'),
      JSON.stringify(opportunities, null, 2)
    );

    // Summary Report
    const summary = {
      generated: new Date().toISOString(),
      period: `${CONFIG.days} days`,
      totals: {
        queries: queries.length,
        pages: pages.length,
        totalClicks: queries.reduce((sum, q) => sum + q.clicks, 0),
        totalImpressions: queries.reduce((sum, q) => sum + q.impressions, 0),
        avgCtr: queries.reduce((sum, q) => sum + q.ctr, 0) / queries.length,
        avgPosition: queries.reduce((sum, q) => sum + q.position, 0) / queries.length
      },
      opportunities: {
        titleOptimization: opportunities.titleOptimization.length,
        ctOptimization: opportunities.ctOptimization.length,
        contentOptimization: opportunities.contentOptimization.length
      }
    };

    await fs.writeFile(
      path.join(CONFIG.outputDir, 'gsc-summary.json'),
      JSON.stringify(summary, null, 2)
    );

    console.log(`✅ Reports generated:`);
    console.log(`   📄 ${CONFIG.outputDir}/gsc-top-queries.csv`);
    console.log(`   📊 ${CONFIG.outputDir}/gsc-page-performance.csv`);
    console.log(`   🎯 ${CONFIG.outputDir}/gsc-optimization-opportunities.json`);
    console.log(`   📋 ${CONFIG.outputDir}/gsc-summary.json`);

    return summary;
  }

  async run() {
    try {
      await this.init();
      
      if (!await this.authenticate()) {
        return;
      }

      const [queries, pages] = await Promise.all([
        this.getTopQueries(),
        this.getPagePerformance()
      ]);

      if (queries.length === 0 && pages.length === 0) {
        console.log('⚠️ No data retrieved. Check your site verification and permissions.');
        return;
      }

      const opportunities = await this.identifyOptimizationOpportunities(queries, pages);
      const summary = await this.generateReports(queries, pages, opportunities);

      console.log('\n📊 GSC Data Summary:');
      console.log(`   Total Queries: ${summary.totals.queries}`);
      console.log(`   Total Pages: ${summary.totals.pages}`);
      console.log(`   Total Clicks: ${summary.totals.totalClicks.toLocaleString()}`);
      console.log(`   Total Impressions: ${summary.totals.totalImpressions.toLocaleString()}`);
      console.log(`   Average CTR: ${(summary.totals.avgCtr * 100).toFixed(2)}%`);
      console.log(`   Average Position: ${summary.totals.avgPosition.toFixed(1)}`);
      
      console.log('\n🎯 Optimization Opportunities:');
      console.log(`   Title/Meta Tests: ${opportunities.titleOptimization.length} candidates`);
      console.log(`   CTR Optimization: ${opportunities.ctOptimization.length} pages`);
      console.log(`   Content Updates: ${opportunities.contentOptimization.length} pages`);

    } catch (error) {
      console.error('❌ GSC data pull failed:', error.message);
      process.exit(1);
    }
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const puller = new GSCDataPuller();
  puller.run().catch(console.error);
}

export default GSCDataPuller;