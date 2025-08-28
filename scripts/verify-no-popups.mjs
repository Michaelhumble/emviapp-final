#!/usr/bin/env node

/**
 * 🔍 Popup Modal Verification Script
 * Ensures no marketing popups exist in the codebase
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

console.log('🔍 VERIFYING NO MARKETING POPUPS EXIST...\n');

const results = {
  timestamp: new Date().toISOString(),
  checks: [],
  status: 'PASSED',
  issues: []
};

// Function to recursively search files
function searchInFile(filePath, patterns) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const findings = [];
    
    patterns.forEach(({ pattern, description, critical }) => {
      const regex = new RegExp(pattern, 'gi');
      const matches = content.match(regex);
      
      if (matches && matches.length > 0) {
        findings.push({
          pattern: description,
          matches: matches.length,
          critical: critical || false,
          sample: matches[0]
        });
      }
    });
    
    return findings;
  } catch (error) {
    return [];
  }
}

// Function to search directory
function searchDirectory(dir, patterns, extensions = ['.tsx', '.ts', '.js', '.jsx']) {
  const findings = {};
  
  function traverse(currentDir) {
    const files = fs.readdirSync(currentDir);
    
    files.forEach(file => {
      const fullPath = path.join(currentDir, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
        traverse(fullPath);
      } else if (extensions.some(ext => file.endsWith(ext))) {
        const relativeFile = path.relative(projectRoot, fullPath);
        const fileFindings = searchInFile(fullPath, patterns);
        
        if (fileFindings.length > 0) {
          findings[relativeFile] = fileFindings;
        }
      }
    });
  }
  
  traverse(dir);
  return findings;
}

// Define popup detection patterns
const POPUP_PATTERNS = [
  {
    pattern: 'Wait.*Don\'t.*Miss.*Out',
    description: 'Exit intent popup text',
    critical: true
  },
  {
    pattern: 'Get Booked 3x Faster.*modal',
    description: 'Marketing popup title',
    critical: true
  },
  {
    pattern: 'showSignupModal.*setState',
    description: 'Signup modal state management',
    critical: true
  },
  {
    pattern: 'PremiumSignupModal.*isOpen.*true',
    description: 'Active premium signup modal',
    critical: true
  },
  {
    pattern: 'exitIntent.*modal.*show',
    description: 'Exit intent modal trigger',
    critical: true
  },
  {
    pattern: 'fixed inset-0.*bg-black/60.*z-\\[100\\]',
    description: 'Marketing modal overlay styling',
    critical: true
  },
  {
    pattern: 'addEventListener.*mouseleave.*modal',
    description: 'Exit intent event listeners',
    critical: true
  },
  {
    pattern: 'setTimeout.*modal.*open',
    description: 'Timer-based modal triggers',
    critical: true
  }
];

// Run the audit
console.log('🔍 Scanning for marketing popup patterns...\n');

const srcDir = path.join(projectRoot, 'src');
const findings = searchDirectory(srcDir, POPUP_PATTERNS);

// Process results
Object.entries(findings).forEach(([file, fileFindings]) => {
  console.log(`📄 ${file}:`);
  
  fileFindings.forEach(finding => {
    const status = finding.critical ? '❌ CRITICAL' : '⚠️ WARNING';
    console.log(`  ${status}: ${finding.pattern} (${finding.matches} matches)`);
    console.log(`    Sample: "${finding.sample.substring(0, 100)}..."\n`);
    
    results.issues.push({
      file,
      pattern: finding.pattern,
      matches: finding.matches,
      critical: finding.critical,
      sample: finding.sample
    });
    
    if (finding.critical) {
      results.status = 'FAILED';
    }
  });
});

// Check specific critical files
const criticalChecks = [
  {
    file: 'src/components/modals/PremiumSignupModal.tsx',
    should: 'return null only'
  },
  {
    file: 'src/components/modals/GlobalPremiumSignupModalProvider.tsx', 
    should: 'return children only'
  },
  {
    file: 'src/config/flags.ts',
    should: 'have signupModalEnabled: false'
  }
];

console.log('🔧 Verifying critical file states...\n');

criticalChecks.forEach(check => {
  try {
    const content = fs.readFileSync(path.join(projectRoot, check.file), 'utf8');
    let passed = true;
    let reason = '';
    
    if (check.file.includes('PremiumSignupModal.tsx')) {
      if (!content.includes('return null') || content.includes('AnimatePresence')) {
        passed = false;
        reason = 'Still contains modal logic';
      }
    }
    
    if (check.file.includes('GlobalPremiumSignupModalProvider.tsx')) {
      if (content.includes('showModal') || content.includes('setTimeout')) {
        passed = false;
        reason = 'Still contains modal state management';
      }
    }
    
    if (check.file.includes('flags.ts')) {
      if (!content.includes('signupModalEnabled: false')) {
        passed = false;
        reason = 'Signup modal flag not disabled';
      }
    }
    
    const status = passed ? '✅ PASSED' : '❌ FAILED';
    console.log(`${status}: ${check.file}`);
    if (!passed) {
      console.log(`    Reason: ${reason}`);
      results.issues.push({
        file: check.file,
        critical: true,
        reason
      });
      results.status = 'FAILED';
    }
    
    results.checks.push({
      file: check.file,
      expected: check.should,
      passed,
      reason
    });
    
  } catch (error) {
    console.log(`❌ ERROR: Could not verify ${check.file} - ${error.message}`);
    results.status = 'FAILED';
  }
});

// Generate final report
console.log(`\n📊 FINAL RESULTS:`);
console.log(`Status: ${results.status === 'PASSED' ? '✅ NO MARKETING POPUPS DETECTED' : '❌ ISSUES FOUND'}`);
console.log(`Critical issues: ${results.issues.filter(i => i.critical).length}`);
console.log(`Total files checked: ${Object.keys(findings).length + criticalChecks.length}`);
console.log(`Timestamp: ${results.timestamp}\n`);

if (results.status === 'PASSED') {
  console.log('🎉 SUCCESS: All marketing popups have been permanently eliminated!');
  console.log('🛡️ The app is now popup-free and provides a clean user experience.');
  console.log('✨ Users can browse freely without modal interruptions.');
} else {
  console.log('🚨 FAILURE: Marketing popup traces still detected!');
  console.log('🔧 Review the issues above and eliminate remaining popup code.');
  process.exit(1);
}

// Save detailed results
const reportPath = path.join(projectRoot, 'popup-verification-results.json');
fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
console.log(`\n📄 Detailed results saved to: ${path.relative(projectRoot, reportPath)}`);
