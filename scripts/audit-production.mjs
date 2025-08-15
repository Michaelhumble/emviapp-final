#!/usr/bin/env node

/**
 * Quick audit command for EmviApp
 * Usage: npm run audit:production
 */

console.log('🚀 Running EmviApp Production Audit...');

import('./run-audit.mjs').then((module) => {
  // This will run the full audit against production
}).catch((error) => {
  console.error('❌ Audit failed:', error.message);
  process.exit(1);
});