#!/usr/bin/env node

/**
 * 🛡️ SEO Guard - US-Only Programmatic Content Enforcement
 * Prevents banned terms from entering programmatic SEO data
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// BANNED TERMS (case-insensitive)
const BANNED_TERMS = [
  'ho-chi-minh',
  'saigon', 
  'sai gon',
  'hcmc',
  'viet nam',
  'vietnam',
  '🇻🇳'
];

const SEO_DATA_FILES = [
  path.join(__dirname, '../data/roles.us.ts'),
  path.join(__dirname, '../data/cities.us.ts'),
  path.join(__dirname, '../src/data/seo-expanded-roles.ts'),
  path.join(__dirname, '../src/data/seo-expanded-locations.ts'),
  path.join(__dirname, '../src/components/seo/ProgrammaticLander.tsx')
];

let violations = [];

async function scanFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    const fileName = path.basename(filePath);
    
    for (const term of BANNED_TERMS) {
      const regex = new RegExp(term, 'gi');
      const matches = content.match(regex);
      
      if (matches) {
        violations.push({
          file: filePath,
          term: term,
          count: matches.length,
          type: 'seo-data'
        });
      }
    }
  } catch (error) {
    // File doesn't exist - skip silently for optional files
    if (error.code !== 'ENOENT') {
      console.warn(`⚠️ Could not scan ${filePath}: ${error.message}`);
    }
  }
}

async function runSeoGuard() {
  console.log('🛡️ Running SEO Data Guard...');
  
  violations = [];
  
  for (const filePath of SEO_DATA_FILES) {
    await scanFile(filePath);
  }
  
  if (violations.length > 0) {
    console.error('\n❌ SEO GUARD VIOLATION DETECTED!');
    console.error('The following banned terms were found in programmatic SEO data:\n');
    
    for (const violation of violations) {
      console.error(`📁 ${violation.file}`);
      console.error(`🚫 Term: "${violation.term}" (${violation.count} occurrences)`);
      console.error('');
    }
    
    console.error('🛡️ EmviApp programmatic SEO is US-only. Please remove these terms from SEO data files.');
    console.error('💡 All programmatic landing pages must target US cities and beauty roles only.');
    
    process.exit(1);
  }
  
  console.log('✅ SEO Guard passed - no banned terms detected in programmatic data');
}

runSeoGuard().catch(error => {
  console.error('❌ SEO Guard failed:', error);
  process.exit(1);
});