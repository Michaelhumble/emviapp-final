#!/usr/bin/env node

/**
 * 🔍 Lighthouse Audit Script for Core Pages
 * Optimized for EmviApp's 6-month growth strategy
 */

import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import pLimit from 'p-limit';

const SITE_URL = process.env.AUDIT_URL || 'https://www.emvi.app';
const REPORTS_DIR = 'reports';

// Ensure reports directory exists
if (!fs.existsSync(REPORTS_DIR)) {
  fs.mkdirSync(REPORTS_DIR, { recursive: true });
}

// Core pages for Lighthouse audit (as specified in requirements)
const CORE_PAGES = [
  { url: '/', name: 'homepage' },
  { url: '/blog', name: 'blog' },
  { url: '/press', name: 'press' },
  { url: '/jobs', name: 'jobs' },
  { url: '/salons', name: 'salons' },
  { url: '/artists', name: 'artists' }
];

const auditResults = {
  timestamp: new Date().toISOString(),
  site: SITE_URL,
  pages: {},
  summary: {
    totalPages: CORE_PAGES.length,
    passedPerformance: 0,
    passedSEO: 0,
    avgPerformanceScore: 0,
    avgSEOScore: 0,
    coreWebVitals: {}
  }
};

async function runLighthouseAudit(pageUrl, pageName) {
  return new Promise((resolve, reject) => {
    const fullUrl = `${SITE_URL}${pageUrl}`;
    const outputFile = path.join(REPORTS_DIR, `lighthouse-${pageName}.json`);
    
    console.log(`🔍 Auditing: ${fullUrl}`);
    
    // Optimized Lighthouse command for performance + SEO only
    // Use streaming spawn instead of exec to avoid ENOBUFS
    const args = [
      fullUrl,
      '--output=json',
      `--output-path=${outputFile}`,
      '--quiet',
      '--only-categories=performance,seo',
      '--chromium-flags=--headless=new',
      '--throttling-method=provided',
      '--disable-full-page-screenshot'
    ];

    const ps = spawn('lighthouse', args, { 
      stdio: ['ignore', 'pipe', 'pipe'] 
    });

    ps.stderr.on('data', d => process.stderr.write(d));
    
    ps.on('close', (code) => {
      if (code !== 0) {
        console.error(`❌ Lighthouse failed for ${pageName}: exit code ${code}`);
        resolve({
          url: pageUrl,
          name: pageName,
          error: `lighthouse exited ${code}`,
          scores: null
        });
        return;
      }

      try {
        // Read and parse Lighthouse results
        const reportData = JSON.parse(fs.readFileSync(outputFile, 'utf8'));
        
        const scores = {
          performance: Math.round(reportData.lhr.categories.performance.score * 100),
          seo: Math.round(reportData.lhr.categories.seo.score * 100)
        };

        // Extract Core Web Vitals
        const audits = reportData.lhr.audits;
        const coreWebVitals = {
          lcp: audits['largest-contentful-paint']?.numericValue || 0,
          fid: audits['max-potential-fid']?.numericValue || 0,  
          cls: audits['cumulative-layout-shift']?.numericValue || 0
        };

        console.log(`✅ ${pageName}: Performance ${scores.performance}%, SEO ${scores.seo}%`);
        
        resolve({
          url: pageUrl,
          name: pageName,
          scores,
          coreWebVitals,
          timestamp: new Date().toISOString(),
          reportFile: outputFile
        });

      } catch (parseError) {
        console.error(`❌ Failed to parse Lighthouse report for ${pageName}:`, parseError.message);
        resolve({
          url: pageUrl,
          name: pageName,
          error: parseError.message,
          scores: null
        });
      }
    });
  });
}

async function generateSummaryReport() {
  console.log('\n📊 Generating summary report...');
  
  // Calculate averages and pass rates
  const validResults = Object.values(auditResults.pages).filter(page => page.scores);
  const performanceScores = validResults.map(page => page.scores.performance);
  const seoScores = validResults.map(page => page.scores.seo);
  
  auditResults.summary = {
    ...auditResults.summary,
    passedPerformance: performanceScores.filter(score => score >= 90).length,
    passedSEO: seoScores.filter(score => score >= 90).length,
    avgPerformanceScore: performanceScores.reduce((a, b) => a + b, 0) / performanceScores.length || 0,
    avgSEOScore: seoScores.reduce((a, b) => a + b, 0) / seoScores.length || 0
  };

  // Generate HTML summary report
  const htmlReport = `<!DOCTYPE html>
<html>
<head>
    <title>Lighthouse Audit Summary - EmviApp</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; }
        .summary { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
        .metric { display: inline-block; margin: 10px 20px; text-align: center; }
        .score { font-size: 2em; font-weight: bold; }
        .score.good { color: #28a745; }
        .score.ok { color: #ffc107; }
        .score.poor { color: #dc3545; }
        .page-results { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
        .page-card { border: 1px solid #ddd; border-radius: 8px; padding: 20px; }
        .cwv { display: flex; gap: 20px; margin-top: 10px; }
        .cwv-item { text-align: center; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 EmviApp Lighthouse Audit Report</h1>
        
        <div class="summary">
            <h2>📊 Performance Summary</h2>
            <div class="metric">
                <div class="score ${auditResults.summary.avgPerformanceScore >= 90 ? 'good' : auditResults.summary.avgPerformanceScore >= 70 ? 'ok' : 'poor'}">${Math.round(auditResults.summary.avgPerformanceScore)}%</div>
                <div>Avg Performance</div>
            </div>
            <div class="metric">
                <div class="score ${auditResults.summary.avgSEOScore >= 90 ? 'good' : auditResults.summary.avgSEOScore >= 70 ? 'ok' : 'poor'}">${Math.round(auditResults.summary.avgSEOScore)}%</div>
                <div>Avg SEO</div>
            </div>
            <div class="metric">
                <div class="score">${auditResults.summary.passedPerformance}/${auditResults.summary.totalPages}</div>
                <div>Performance ≥90%</div>
            </div>
            <div class="metric">
                <div class="score">${auditResults.summary.passedSEO}/${auditResults.summary.totalPages}</div>
                <div>SEO ≥90%</div>
            </div>
        </div>

        <h2>📋 Page-by-Page Results</h2>
        <div class="page-results">
            ${Object.values(auditResults.pages).map(page => `
            <div class="page-card">
                <h3>${page.name}</h3>
                <p><code>${page.url}</code></p>
                ${page.scores ? `
                    <div style="display: flex; gap: 20px;">
                        <div class="metric">
                            <div class="score ${page.scores.performance >= 90 ? 'good' : page.scores.performance >= 70 ? 'ok' : 'poor'}">${page.scores.performance}%</div>
                            <div>Performance</div>
                        </div>
                        <div class="metric">
                            <div class="score ${page.scores.seo >= 90 ? 'good' : page.scores.seo >= 70 ? 'ok' : 'poor'}">${page.scores.seo}%</div>
                            <div>SEO</div>
                        </div>
                    </div>
                    ${page.coreWebVitals ? `
                    <div class="cwv">
                        <div class="cwv-item">
                            <strong>LCP:</strong><br>
                            <span class="${page.coreWebVitals.lcp <= 2500 ? 'good' : page.coreWebVitals.lcp <= 4000 ? 'ok' : 'poor'}">${Math.round(page.coreWebVitals.lcp)}ms</span>
                        </div>
                        <div class="cwv-item">
                            <strong>FID:</strong><br>
                            <span class="${page.coreWebVitals.fid <= 100 ? 'good' : page.coreWebVitals.fid <= 300 ? 'ok' : 'poor'}">${Math.round(page.coreWebVitals.fid)}ms</span>
                        </div>
                        <div class="cwv-item">
                            <strong>CLS:</strong><br>
                            <span class="${page.coreWebVitals.cls <= 0.1 ? 'good' : page.coreWebVitals.cls <= 0.25 ? 'ok' : 'poor'}">${page.coreWebVitals.cls.toFixed(3)}</span>
                        </div>
                    </div>
                    ` : ''}
                ` : `
                    <div style="color: #dc3545;">❌ ${page.error}</div>
                `}
            </div>
            `).join('')}
        </div>

        <div style="margin-top: 40px; padding: 20px; background: #e9ecef; border-radius: 8px;">
            <h3>🎯 Recommendations</h3>
            <ul>
                <li><strong>Performance Target:</strong> All pages should achieve ≥90% performance score</li>
                <li><strong>SEO Target:</strong> All pages should achieve ≥90% SEO score</li>
                <li><strong>Core Web Vitals:</strong> LCP ≤2.5s, FID ≤100ms, CLS ≤0.1</li>
                <li><strong>Priority:</strong> Focus on pages scoring below 80% first</li>
            </ul>
        </div>

        <footer style="text-align: center; margin-top: 40px; color: #666; font-size: 0.9em;">
            Generated on ${new Date().toLocaleString()} | Site: ${SITE_URL}
        </footer>
    </div>
</body>
</html>`;

  // Write reports
  fs.writeFileSync(path.join(REPORTS_DIR, 'lighthouse-summary.html'), htmlReport);
  fs.writeFileSync(path.join(REPORTS_DIR, 'lighthouse-results.json'), JSON.stringify(auditResults, null, 2));

  // Generate CSV for tracking
  const csvData = [
    ['Page', 'URL', 'Performance', 'SEO', 'LCP', 'FID', 'CLS', 'Status'].join(','),
    ...Object.values(auditResults.pages).map(page => [
      page.name,
      page.url,
      page.scores?.performance || 'Error',
      page.scores?.seo || 'Error', 
      page.coreWebVitals?.lcp ? Math.round(page.coreWebVitals.lcp) : 'N/A',
      page.coreWebVitals?.fid ? Math.round(page.coreWebVitals.fid) : 'N/A',
      page.coreWebVitals?.cls ? page.coreWebVitals.cls.toFixed(3) : 'N/A',
      page.scores && page.scores.performance >= 90 && page.scores.seo >= 90 ? 'PASS' : 'FAIL'
    ].join(','))
  ].join('\n');
  
  fs.writeFileSync(path.join(REPORTS_DIR, 'lighthouse-summary.csv'), csvData);
  
  console.log(`✅ Reports generated:`);
  console.log(`   📊 ${REPORTS_DIR}/lighthouse-summary.html`);
  console.log(`   📄 ${REPORTS_DIR}/lighthouse-summary.csv`);
  console.log(`   🔧 ${REPORTS_DIR}/lighthouse-results.json`);
}

async function main() {
  try {
    console.log(`🚀 Starting Lighthouse audit for ${CORE_PAGES.length} core pages...`);
    
    // Run audits with limited concurrency to avoid ENOBUFS
    const limit = pLimit(2);
    const auditTasks = CORE_PAGES.map(page => 
      limit(() => runLighthouseAudit(page.url, page.name))
    );
    
    const results = await Promise.all(auditTasks);
    results.forEach((result, i) => {
      auditResults.pages[CORE_PAGES[i].name] = result;
    });
    
    await generateSummaryReport();
    
    console.log(`\n🎯 AUDIT COMPLETE:`);
    console.log(`   Performance ≥90%: ${auditResults.summary.passedPerformance}/${auditResults.summary.totalPages}`);
    console.log(`   SEO ≥90%: ${auditResults.summary.passedSEO}/${auditResults.summary.totalPages}`);
    console.log(`   Avg Performance: ${Math.round(auditResults.summary.avgPerformanceScore)}%`);
    console.log(`   Avg SEO: ${Math.round(auditResults.summary.avgSEOScore)}%`);
    
    // Exit with error if critical thresholds not met
    if (auditResults.summary.avgPerformanceScore < 80 || auditResults.summary.avgSEOScore < 90) {
      console.log(`\n⚠️ Performance/SEO targets not met. Check ${REPORTS_DIR}/lighthouse-summary.html`);
      process.exit(1);
    }
    
  } catch (error) {
    console.error('❌ Lighthouse audit failed:', error.message);
    process.exit(1);
  }
}

main();