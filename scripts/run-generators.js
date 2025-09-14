#!/usr/bin/env node

/**
 * Test runner for sitemap and RSS generators
 * Run with: node scripts/run-generators.js
 */

import('./generate-sitemap.mjs').then(() => {
  console.log('Sitemap generation completed');
  return import('./generate-rss.mjs');
}).then(() => {
  console.log('RSS generation completed');
  console.log('✅ All generators completed successfully');
}).catch(error => {
  console.error('❌ Error running generators:', error);
  process.exit(1);
});