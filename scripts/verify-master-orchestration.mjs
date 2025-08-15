#!/usr/bin/env node

/**
 * 🎯 Master Orchestration Verification Script
 * Runs all verification checks for the comprehensive fixes
 */

import { execSync } from 'child_process';
import fs from 'fs';

console.log('🎯 MASTER ORCHESTRATION VERIFICATION\n');

const results = {
  tests: { passed: false, output: '' },
  fomoRemoval: { passed: false, output: '' },
  seoComponents: { passed: false, output: '' },
  scrollStability: { passed: false, output: '' }
};

// 1. Run FOMO removal tests
console.log('1️⃣ Running FOMO removal tests...');
try {
  const output = execSync('npx vitest run src/__tests__/jobsFomoRemoval.test.tsx --reporter=verbose', { 
    encoding: 'utf8',
    stdio: 'pipe'
  });
  results.fomoRemoval.passed = !output.includes('FAILED') && output.includes('PASSED');
  results.fomoRemoval.output = output;
  console.log(results.fomoRemoval.passed ? '✅ FOMO tests passed' : '❌ FOMO tests failed');
} catch (error) {
  results.fomoRemoval.output = error.message;
  console.log('❌ FOMO tests failed');
}

// 2. Run SEO component tests
console.log('\n2️⃣ Running SEO component tests...');
try {
  const output = execSync('npx vitest run src/__tests__/seoComponents.test.tsx --reporter=verbose', { 
    encoding: 'utf8',
    stdio: 'pipe'
  });
  results.seoComponents.passed = !output.includes('FAILED') && output.includes('PASSED');
  results.seoComponents.output = output;
  console.log(results.seoComponents.passed ? '✅ SEO tests passed' : '❌ SEO tests failed');
} catch (error) {
  results.seoComponents.output = error.message;
  console.log('❌ SEO tests failed');
}

// 3. Run scroll stability tests
console.log('\n3️⃣ Running scroll stability tests...');
try {
  const output = execSync('npx vitest run src/__tests__/scrollStability.test.tsx --reporter=verbose', { 
    encoding: 'utf8',
    stdio: 'pipe'
  });
  results.scrollStability.passed = !output.includes('FAILED') && output.includes('PASSED');
  results.scrollStability.output = output;
  console.log(results.scrollStability.passed ? '✅ Scroll tests passed' : '❌ Scroll tests failed');
} catch (error) {
  results.scrollStability.output = error.message;
  console.log('❌ Scroll tests failed');
}

// 4. Run all tests
console.log('\n4️⃣ Running full test suite...');
try {
  const output = execSync('npx vitest run --reporter=verbose', { 
    encoding: 'utf8',
    stdio: 'pipe'
  });
  results.tests.passed = !output.includes('FAILED') && output.includes('PASSED');
  results.tests.output = output;
  console.log(results.tests.passed ? '✅ All tests passed' : '❌ Some tests failed');
} catch (error) {
  results.tests.output = error.message;
  console.log('❌ Test suite failed');
}

// 5. Check for FOMO residuals
console.log('\n5️⃣ Checking for FOMO residuals...');
try {
  const searchOutput = execSync('grep -r "TeaserLocked\\|FOMONailJobsSection\\|PremiumContactGate\\|lockBadge\\|lockedOverlay\\|blurContact" src/ --exclude-dir=__tests__ || true', { 
    encoding: 'utf8'
  });
  
  const hasResiduals = searchOutput.trim().length > 0;
  if (hasResiduals) {
    console.log('❌ FOMO residuals found:');
    console.log(searchOutput);
  } else {
    console.log('✅ No FOMO residuals found');
  }
} catch (error) {
  console.log('⚠️ Could not check for residuals');
}

// 6. Verify scroll-to-top fixes
console.log('\n6️⃣ Checking scroll-to-top fixes...');
try {
  const scrollOutput = execSync('grep -r "window\\.scrollTo(0.*0)" src/ --exclude-dir=__tests__ | grep -v "behavior.*smooth" || true', { 
    encoding: 'utf8'
  });
  
  const hasProblematicScrolls = scrollOutput.trim().length > 0;
  if (hasProblematicScrolls) {
    console.log('❌ Problematic scroll-to-top calls found:');
    console.log(scrollOutput);
  } else {
    console.log('✅ No problematic scroll-to-top calls');
  }
} catch (error) {
  console.log('⚠️ Could not check scroll calls');
}

// Summary
console.log('\n📊 VERIFICATION SUMMARY:');
console.log('='.repeat(40));
console.log(`FOMO Removal Tests: ${results.fomoRemoval.passed ? '✅ PASS' : '❌ FAIL'}`);
console.log(`SEO Component Tests: ${results.seoComponents.passed ? '✅ PASS' : '❌ FAIL'}`);
console.log(`Scroll Stability Tests: ${results.scrollStability.passed ? '✅ PASS' : '❌ FAIL'}`);
console.log(`Full Test Suite: ${results.tests.passed ? '✅ PASS' : '❌ FAIL'}`);

const allPassed = Object.values(results).every(r => r.passed);
console.log(`\nOVERALL STATUS: ${allPassed ? '🎉 ALL CHECKS PASSED' : '⚠️ ISSUES DETECTED'}`);

// Save detailed results
fs.writeFileSync('reports/verification-results.json', JSON.stringify(results, null, 2));
console.log('\n💾 Detailed results saved to reports/verification-results.json');

if (!allPassed) {
  console.log('\n🔧 To fix issues, check the detailed outputs above');
  process.exit(1);
}

console.log('\n🚀 Ready for production audit!');
console.log('Next: Run `node scripts/run-audit-production.mjs`');