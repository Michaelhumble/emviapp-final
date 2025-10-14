/**
 * EmviApp Load Testing Script (k6)
 * 
 * Tests system capacity for 1M+ daily visitors
 * Simulates realistic user behavior and traffic patterns
 * 
 * Usage:
 *   k6 run load-test.js                    # Run default test
 *   k6 run --vus 10000 load-test.js        # 10K concurrent users
 *   k6 run --duration 30m load-test.js     # 30-minute test
 * 
 * Scenarios:
 *   - Baseline: 10K users over 30 minutes
 *   - Spike: 1K → 100K users in 1 minute
 *   - Stress: Find breaking point
 */

import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { Rate, Trend, Counter } from 'k6/metrics';

// ============================================================================
// CUSTOM METRICS
// ============================================================================

const errorRate = new Rate('errors');
const pageLoadTime = new Trend('page_load_time');
const apiResponseTime = new Trend('api_response_time');
const dbQueryCount = new Counter('db_query_count');

// ============================================================================
// TEST CONFIGURATION
// ============================================================================

export const options = {
  scenarios: {
    // Baseline Load Test: 10K concurrent users
    baseline: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '5m', target: 10000 },  // Ramp up to 10K
        { duration: '20m', target: 10000 }, // Stay at 10K
        { duration: '5m', target: 0 },      // Ramp down
      ],
      gracefulRampDown: '2m',
    },
    
    // Spike Test: Sudden traffic spike
    spike: {
      executor: 'ramping-vus',
      startVUs: 1000,
      stages: [
        { duration: '10s', target: 1000 },   // Normal load
        { duration: '1m', target: 100000 },  // Spike to 100K
        { duration: '3m', target: 100000 },  // Sustain
        { duration: '2m', target: 1000 },    // Recovery
      ],
      startTime: '35m', // Run after baseline
    },
    
    // Stress Test: Find breaking point
    stress: {
      executor: 'ramping-arrival-rate',
      startRate: 1000,
      timeUnit: '1s',
      preAllocatedVUs: 50000,
      maxVUs: 200000,
      stages: [
        { duration: '5m', target: 10000 },  // 10K req/s
        { duration: '5m', target: 50000 },  // 50K req/s
        { duration: '5m', target: 100000 }, // 100K req/s
        { duration: '5m', target: 200000 }, // 200K req/s (find limit)
      ],
      startTime: '50m', // Run after spike test
    }
  },
  
  // Performance thresholds
  thresholds: {
    // 95% of requests should complete in <500ms
    http_req_duration: ['p(95)<500'],
    
    // 99% of requests should complete in <1000ms
    'http_req_duration{scenario:baseline}': ['p(99)<1000'],
    
    // Error rate should be <1%
    http_req_failed: ['rate<0.01'],
    
    // Specific page performance
    'page_load_time{page:home}': ['p(95)<800'],
    'page_load_time{page:jobs}': ['p(95)<1000'],
    'page_load_time{page:artists}': ['p(95)<1000'],
    
    // API performance
    'api_response_time{endpoint:search}': ['p(95)<300'],
    'api_response_time{endpoint:profile}': ['p(95)<200'],
  },
};

// ============================================================================
// BASE URL CONFIGURATION
// ============================================================================

const BASE_URL = 'https://www.emvi.app';

// ============================================================================
// TEST DATA
// ============================================================================

const searchQueries = [
  'nails Houston',
  'hair stylist Miami',
  'barber New York',
  'nail technician Los Angeles',
  'makeup artist Dallas',
];

const locations = [
  'Houston, TX',
  'Miami, FL',
  'New York, NY',
  'Los Angeles, CA',
  'Dallas, TX',
  'Chicago, IL',
  'Phoenix, AZ',
  'Philadelphia, PA',
];

const jobCategories = [
  'nails',
  'hair',
  'barber',
  'massage',
  'skincare',
  'makeup',
  'brows-lashes',
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function measurePageLoad(name, response) {
  pageLoadTime.add(response.timings.duration, { page: name });
  check(response, {
    [`${name}: status 200`]: (r) => r.status === 200,
    [`${name}: load time <2s`]: (r) => r.timings.duration < 2000,
  });
}

function measureApiCall(endpoint, response) {
  apiResponseTime.add(response.timings.duration, { endpoint });
  const success = response.status === 200;
  errorRate.add(!success);
  return success;
}

// ============================================================================
// USER SCENARIOS
// ============================================================================

/**
 * Visitor browsing jobs
 * Weight: 40% of traffic
 */
export function browseJobs() {
  group('Browse Jobs', function () {
    // Visit jobs page
    const jobsPage = http.get(`${BASE_URL}/jobs`);
    measurePageLoad('jobs', jobsPage);
    sleep(2);
    
    // Filter by category
    const category = randomItem(jobCategories);
    const categoryPage = http.get(`${BASE_URL}/jobs?category=${category}`);
    measureApiCall('search', categoryPage);
    sleep(3);
    
    // Filter by location
    const location = randomItem(locations);
    const locationPage = http.get(`${BASE_URL}/jobs?category=${category}&location=${encodeURIComponent(location)}`);
    measureApiCall('search', locationPage);
    sleep(2);
    
    // View job details (simulate clicking a job)
    // Note: Would need actual job IDs from response
    sleep(1);
  });
}

/**
 * Visitor browsing artists
 * Weight: 30% of traffic
 */
export function browseArtists() {
  group('Browse Artists', function () {
    // Visit artists page
    const artistsPage = http.get(`${BASE_URL}/artists`);
    measurePageLoad('artists', artistsPage);
    sleep(2);
    
    // Search artists
    const query = randomItem(searchQueries);
    const searchPage = http.get(`${BASE_URL}/artists?search=${encodeURIComponent(query)}`);
    measureApiCall('search', searchPage);
    sleep(3);
    
    // View artist profile
    // Note: Would need actual artist IDs from response
    sleep(2);
  });
}

/**
 * Homepage visitor
 * Weight: 20% of traffic
 */
export function visitHomepage() {
  group('Visit Homepage', function () {
    const homepage = http.get(`${BASE_URL}/`);
    measurePageLoad('home', homepage);
    sleep(3);
    
    // Scroll to featured sections (simulated by waiting)
    sleep(2);
  });
}

/**
 * Visitor browsing salons
 * Weight: 10% of traffic
 */
export function browseSalons() {
  group('Browse Salons', function () {
    const salonsPage = http.get(`${BASE_URL}/salons`);
    measurePageLoad('salons', salonsPage);
    sleep(3);
    
    const location = randomItem(locations);
    const locationPage = http.get(`${BASE_URL}/salons?location=${encodeURIComponent(location)}`);
    measureApiCall('search', locationPage);
    sleep(2);
  });
}

// ============================================================================
// MAIN TEST FUNCTION
// ============================================================================

export default function () {
  // Weighted random scenario selection
  const rand = Math.random();
  
  if (rand < 0.4) {
    // 40% browse jobs
    browseJobs();
  } else if (rand < 0.7) {
    // 30% browse artists
    browseArtists();
  } else if (rand < 0.9) {
    // 20% visit homepage
    visitHomepage();
  } else {
    // 10% browse salons
    browseSalons();
  }
  
  // Simulate user think time (1-3 seconds)
  sleep(Math.random() * 2 + 1);
}

// ============================================================================
// SETUP & TEARDOWN
// ============================================================================

export function setup() {
  console.log('🚀 Starting EmviApp Load Test');
  console.log('Target: 1M daily visitors capacity validation');
  console.log('Base URL:', BASE_URL);
  
  // Verify system is accessible
  const response = http.get(BASE_URL);
  if (response.status !== 200) {
    throw new Error('System not accessible before test start');
  }
  
  return { startTime: Date.now() };
}

export function teardown(data) {
  const duration = (Date.now() - data.startTime) / 1000;
  console.log(`\n✅ Load Test Completed in ${duration.toFixed(2)}s`);
  console.log('📊 Check results for performance metrics');
}

// ============================================================================
// CUSTOM SUMMARY
// ============================================================================

export function handleSummary(data) {
  return {
    'stdout': textSummary(data, { indent: ' ', enableColors: true }),
    'load-test-results.json': JSON.stringify(data, null, 2),
    'load-test-report.html': htmlReport(data),
  };
}

function textSummary(data, options) {
  let summary = '\n\n📊 EMVIAPP LOAD TEST SUMMARY\n';
  summary += '=' .repeat(80) + '\n\n';
  
  // Request metrics
  const requests = data.metrics.http_reqs;
  summary += `Total Requests: ${requests.values.count}\n`;
  summary += `Requests/sec: ${requests.values.rate.toFixed(2)}\n`;
  summary += `Failed Requests: ${(data.metrics.http_req_failed.values.rate * 100).toFixed(2)}%\n\n`;
  
  // Response time metrics
  const duration = data.metrics.http_req_duration;
  summary += 'Response Times:\n';
  summary += `  p50: ${duration.values['p(50)'].toFixed(2)}ms\n`;
  summary += `  p95: ${duration.values['p(95)'].toFixed(2)}ms\n`;
  summary += `  p99: ${duration.values['p(99)'].toFixed(2)}ms\n`;
  summary += `  max: ${duration.values.max.toFixed(2)}ms\n\n`;
  
  // Thresholds
  summary += 'Threshold Results:\n';
  Object.keys(data.metrics).forEach(key => {
    const metric = data.metrics[key];
    if (metric.thresholds) {
      Object.keys(metric.thresholds).forEach(threshold => {
        const passed = metric.thresholds[threshold].ok;
        summary += `  ${key} (${threshold}): ${passed ? '✅ PASS' : '❌ FAIL'}\n`;
      });
    }
  });
  
  summary += '\n' + '='.repeat(80) + '\n';
  
  return summary;
}

function htmlReport(data) {
  // Basic HTML report (simplified)
  return `<!DOCTYPE html>
<html>
<head>
  <title>EmviApp Load Test Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; }
    h1 { color: #333; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
    th { background-color: #4CAF50; color: white; }
    .pass { color: green; }
    .fail { color: red; }
  </style>
</head>
<body>
  <h1>EmviApp Load Test Report</h1>
  <h2>Test Summary</h2>
  <p>Generated: ${new Date().toISOString()}</p>
  <p>Total Requests: ${data.metrics.http_reqs.values.count}</p>
  <p>Error Rate: ${(data.metrics.http_req_failed.values.rate * 100).toFixed(2)}%</p>
  
  <h2>Performance Metrics</h2>
  <table>
    <tr>
      <th>Metric</th>
      <th>p50</th>
      <th>p95</th>
      <th>p99</th>
      <th>Max</th>
    </tr>
    <tr>
      <td>Response Time</td>
      <td>${data.metrics.http_req_duration.values['p(50)'].toFixed(2)}ms</td>
      <td>${data.metrics.http_req_duration.values['p(95)'].toFixed(2)}ms</td>
      <td>${data.metrics.http_req_duration.values['p(99)'].toFixed(2)}ms</td>
      <td>${data.metrics.http_req_duration.values.max.toFixed(2)}ms</td>
    </tr>
  </table>
</body>
</html>`;
}
