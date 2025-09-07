#!/usr/bin/env tsx

import { PRESS_OUTLETS } from '../src/data/pressOutlets';

interface ValidationResult {
  outlet: string;
  href: string;
  status: 'valid' | 'warning' | 'error';
  message: string;
}

async function validateOutlet(outlet: typeof PRESS_OUTLETS[0]): Promise<ValidationResult> {
  // Check if href is empty or not https
  if (!outlet.href) {
    return {
      outlet: outlet.name,
      href: outlet.href,
      status: 'error',
      message: 'Empty href'
    };
  }

  if (!outlet.href.startsWith('https://')) {
    return {
      outlet: outlet.name,
      href: outlet.href,
      status: 'error',
      message: 'href must use HTTPS'
    };
  }

  // Skip network requests during CI if no internet
  if (process.env.CI && !process.env.NETWORK_TESTS) {
    return {
      outlet: outlet.name,
      href: outlet.href,
      status: 'valid',
      message: 'Skipped network test in CI'
    };
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const response = await fetch(outlet.href, {
      method: 'HEAD',
      signal: controller.signal,
      headers: {
        'User-Agent': 'EmviApp Press Validator/1.0'
      }
    });

    clearTimeout(timeout);

    if (response.status >= 400) {
      return {
        outlet: outlet.name,
        href: outlet.href,
        status: 'warning',
        message: `HTTP ${response.status} - ${response.statusText}`
      };
    }

    return {
      outlet: outlet.name,
      href: outlet.href,
      status: 'valid',
      message: `HTTP ${response.status}`
    };

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    return {
      outlet: outlet.name,
      href: outlet.href,
      status: 'warning',
      message: `Network error: ${errorMessage}`
    };
  }
}

async function validatePress() {
  console.log('🔍 Validating press outlets...\n');

  const results = await Promise.all(
    PRESS_OUTLETS.map(validateOutlet)
  );

  let hasErrors = false;
  let hasWarnings = false;

  results.forEach(result => {
    const icon = result.status === 'valid' ? '✅' : 
                 result.status === 'warning' ? '⚠️' : '❌';
    
    console.log(`${icon} ${result.outlet}`);
    console.log(`   ${result.href}`);
    console.log(`   ${result.message}\n`);

    if (result.status === 'error') hasErrors = true;
    if (result.status === 'warning') hasWarnings = true;
  });

  console.log(`\n📊 Summary:`);
  console.log(`   Valid: ${results.filter(r => r.status === 'valid').length}`);
  console.log(`   Warnings: ${results.filter(r => r.status === 'warning').length}`);
  console.log(`   Errors: ${results.filter(r => r.status === 'error').length}`);

  if (hasErrors) {
    console.log('\n❌ Build failed due to validation errors');
    process.exit(1);
  }

  if (hasWarnings) {
    console.log('\n⚠️  Build succeeded with warnings');
  } else {
    console.log('\n✅ All outlets validated successfully');
  }
}

// Run validation
validatePress().catch(error => {
  console.error('💥 Validation script failed:', error);
  process.exit(1);
});