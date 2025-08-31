#!/usr/bin/env node

/**
 * 🔧 SEO Auto-Fix Runner
 * Runs all available SEO fix scripts in the correct order
 */

import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';

const SCRIPTS_TO_RUN = [
  // Read-only audit first
  { script: 'scripts/audit-seo-streaming.mjs', description: 'SEO Audit (Before)', mode: 'audit' },
  
  // Apply fixes
  { script: 'scripts/fix-broken-links.mjs', args: ['--apply'], description: 'Fix Broken Links' },
  { script: 'scripts/fix-canonicals.mjs', args: ['--dry-run=false'], description: 'Fix Canonical URLs' },
  { script: 'scripts/fix-sitemaps.mjs', args: ['--dry-run=false'], description: 'Fix Sitemaps' },
  { script: 'scripts/fix-index-keys.mjs', args: ['--dry-run=false'], description: 'Fix React Keys', optional: true },
  { script: 'scripts/fix-jsonld.mjs', args: ['--dry-run=false'], description: 'Fix JSON-LD', optional: true },
  { script: 'scripts/apply-seo-fixes.mjs', description: 'Apply SEO Patches', optional: true },
  
  // Final audit
  { script: 'scripts/audit-seo-streaming.mjs', description: 'SEO Audit (After)', mode: 'audit' }
];

const results = {
  timestamp: new Date().toISOString(),
  scripts_run: [],
  before_audit: null,
  after_audit: null,
  fixes_applied: 0,
  errors: []
};

async function runScript(scriptConfig) {
  const { script, args = [], description, optional = false, mode } = scriptConfig;
  
  console.log(`\n🔧 Running: ${description}`);
  console.log(`   Command: node ${script} ${args.join(' ')}`);
  
  // Check if script exists
  try {
    await fs.access(script);
  } catch (error) {
    if (optional) {
      console.log(`   ⚠️ Optional script not found: ${script}`);
      return { skipped: true };
    } else {
      throw new Error(`Required script not found: ${script}`);
    }
  }
  
  return new Promise((resolve, reject) => {
    const ps = spawn('node', [script, ...args], {
      stdio: ['inherit', 'pipe', 'pipe']
    });

    let stdout = '';
    let stderr = '';
    
    ps.stdout.on('data', (data) => {
      process.stdout.write(data);
      stdout += data.toString();
    });

    ps.stderr.on('data', (data) => {
      process.stderr.write(data);
      stderr += data.toString();
    });

    ps.on('close', (code) => {
      const result = {
        script,
        description,
        mode,
        exitCode: code,
        stdout,
        stderr,
        timestamp: new Date().toISOString()
      };

      if (code === 0) {
        console.log(`   ✅ ${description} completed successfully`);
        resolve(result);
      } else {
        console.error(`   ❌ ${description} failed with exit code ${code}`);
        if (optional) {
          console.log(`   ⚠️ Continuing despite optional script failure`);
          resolve({ ...result, skipped: true });
        } else {
          reject(new Error(`${description} failed: ${stderr || 'Unknown error'}`));
        }
      }
    });

    ps.on('error', (error) => {
      console.error(`   ❌ Failed to start ${description}:`, error.message);
      if (optional) {
        resolve({ skipped: true, error: error.message });
      } else {
        reject(error);
      }
    });
  });
}

function extractAuditStats(stdout) {
  try {
    // Parse audit results from stdout
    const lines = stdout.split('\n');
    
    let passed = 0, warnings = 0, errors = 0, lighthouse_passed = 0, total = 0;
    
    for (const line of lines) {
      if (line.includes('SEO Passed:')) {
        const match = line.match(/(\d+)\/(\d+)/);
        if (match) {
          passed = parseInt(match[1]);
          total = parseInt(match[2]);
        }
      }
      if (line.includes('SEO Warnings:')) {
        const match = line.match(/(\d+)/);
        if (match) warnings = parseInt(match[1]);
      }
      if (line.includes('SEO Errors:')) {
        const match = line.match(/(\d+)/);
        if (match) errors = parseInt(match[1]);
      }
      if (line.includes('Lighthouse ≥90%:')) {
        const match = line.match(/(\d+)\/(\d+)/);
        if (match) lighthouse_passed = parseInt(match[1]);
      }
    }
    
    return { passed, warnings, errors, lighthouse_passed, total };
  } catch (error) {
    console.warn('Could not parse audit stats:', error.message);
    return null;
  }
}

async function generateSummary() {
  console.log('\n📊 SEO Fixes Summary Report');
  console.log('='.repeat(50));
  
  const beforeStats = results.before_audit;
  const afterStats = results.after_audit;
  
  if (beforeStats && afterStats) {
    console.log('\n📈 Before → After Comparison:');
    console.log(`   SEO Errors: ${beforeStats.errors} → ${afterStats.errors} (${afterStats.errors - beforeStats.errors >= 0 ? '+' : ''}${afterStats.errors - beforeStats.errors})`);
    console.log(`   SEO Warnings: ${beforeStats.warnings} → ${afterStats.warnings} (${afterStats.warnings - beforeStats.warnings >= 0 ? '+' : ''}${afterStats.warnings - beforeStats.warnings})`);
    console.log(`   SEO Passed: ${beforeStats.passed} → ${afterStats.passed} (${afterStats.passed - beforeStats.passed >= 0 ? '+' : ''}${afterStats.passed - beforeStats.passed})`);
    console.log(`   Lighthouse ≥90%: ${beforeStats.lighthouse_passed} → ${afterStats.lighthouse_passed} (${afterStats.lighthouse_passed - beforeStats.lighthouse_passed >= 0 ? '+' : ''}${afterStats.lighthouse_passed - beforeStats.lighthouse_passed})`);
    
    const improvement = (afterStats.errors < beforeStats.errors) || 
                       (afterStats.warnings < beforeStats.warnings) ||
                       (afterStats.passed > beforeStats.passed) ||
                       (afterStats.lighthouse_passed > beforeStats.lighthouse_passed);
    
    if (improvement) {
      console.log('\n🎉 SEO improvements detected!');
    } else {
      console.log('\n⚠️ No significant SEO improvements');
    }
  }
  
  console.log('\n🔧 Scripts Executed:');
  results.scripts_run.forEach((script, i) => {
    if (script.skipped) {
      console.log(`   ${i + 1}. ⚠️ ${script.description} (skipped)`);
    } else if (script.exitCode === 0) {
      console.log(`   ${i + 1}. ✅ ${script.description}`);
      if (script.mode !== 'audit') results.fixes_applied++;
    } else {
      console.log(`   ${i + 1}. ❌ ${script.description} (failed)`);
    }
  });
  
  console.log(`\n📊 Final Stats:`);
  console.log(`   Scripts run: ${results.scripts_run.length}`);
  console.log(`   Fixes applied: ${results.fixes_applied}`);
  console.log(`   Errors: ${results.errors.length}`);
  
  // Save summary
  await fs.writeFile(
    'reports/seo-fixes-summary.json',
    JSON.stringify(results, null, 2)
  );
  
  console.log(`\n💾 Summary saved to: reports/seo-fixes-summary.json`);
}

async function main() {
  try {
    console.log('🚀 Starting SEO Auto-Fix Pipeline...');
    
    // Ensure reports directory exists
    await fs.mkdir('reports', { recursive: true });
    
    for (const scriptConfig of SCRIPTS_TO_RUN) {
      try {
        const result = await runScript(scriptConfig);
        results.scripts_run.push(result);
        
        // Capture audit results for comparison
        if (result.mode === 'audit') {
          const stats = extractAuditStats(result.stdout || '');
          if (stats) {
            if (!results.before_audit) {
              results.before_audit = stats;
            } else {
              results.after_audit = stats;
            }
          }
        }
        
      } catch (error) {
        console.error(`\n❌ Pipeline failed at: ${scriptConfig.description}`);
        console.error(`   Error: ${error.message}`);
        results.errors.push({
          script: scriptConfig.script,
          description: scriptConfig.description,
          error: error.message
        });
        
        // Stop pipeline on critical errors (non-optional scripts)
        if (!scriptConfig.optional) {
          throw error;
        }
      }
    }
    
    await generateSummary();
    
    const hasErrors = results.errors.length > 0;
    const hasImprovements = results.after_audit && results.before_audit && 
      results.after_audit.errors < results.before_audit.errors;
    
    if (hasErrors) {
      console.log('\n⚠️ Pipeline completed with errors');
      process.exit(1);
    } else if (hasImprovements) {
      console.log('\n🎉 SEO fixes applied successfully!');
      process.exit(0);
    } else {
      console.log('\n✅ Pipeline completed (no fixes needed)');
      process.exit(0);
    }
    
  } catch (error) {
    console.error('\n💥 SEO Fix Pipeline Failed:', error.message);
    await generateSummary();
    process.exit(1);
  }
}

main();