#!/usr/bin/env node

/**
 * 🤖 EmviApp SEO Agent - Orchestrator
 * Automated SEO monitoring, analysis, and surgical fixes
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

// Parse command line arguments
const args = process.argv.slice(2);
const SITE_URL = args.find(arg => arg.startsWith('--site='))?.split('=')[1] || process.env.SITE_URL || 'https://www.emvi.app';
const REPORTS_DIR = args.find(arg => arg.startsWith('--out='))?.split('=')[1] || process.env.REPORTS_DIR || 'reports';
const DRY_RUN = args.includes('--dry-run') || process.env.DRY_RUN === 'true' || false;
const CONFIG_PATH = 'agents/seo-agent/config.yaml';

// Ensure reports directory exists
if (!fs.existsSync(REPORTS_DIR)) {
  fs.mkdirSync(REPORTS_DIR, { recursive: true });
}

console.log('🤖 EmviApp SEO Agent Starting...');
console.log(`📍 Site: ${SITE_URL}`);
console.log(`📁 Reports: ${REPORTS_DIR}/`);
console.log(`🔄 Mode: ${DRY_RUN ? 'DRY-RUN (no changes)' : 'LIVE (will apply fixes)'}`);

// Load configuration
let config;
try {
  const configFile = fs.readFileSync(CONFIG_PATH, 'utf8');
  config = yaml.load(configFile);
  console.log('✅ Configuration loaded');
} catch (error) {
  console.error('❌ Failed to load config:', error.message);
  process.exit(1);
}

const results = {
  timestamp: new Date().toISOString(),
  site: SITE_URL,
  audits: {},
  fixes: {
    auto: [],
    manual: [],
    prs: []
  },
  summary: {
    issues_found: 0,
    auto_fixed: 0,
    needs_review: 0
  }
};

async function runAudits() {
  console.log('\n🔍 Running SEO Audits...');
  
  try {
    // 1. Main SEO audit
    console.log('1️⃣ SEO audit...');
    const seoOutput = execSync(`node scripts/audit-seo.mjs --site=${SITE_URL} --out=${REPORTS_DIR} --maxDepth=6 --includeSitemaps`, {
      encoding: 'utf8',
      stdio: 'pipe'
    });
    results.audits.seo = { success: true, output: seoOutput };
    
    // 2. Sitemap validation
    console.log('2️⃣ Sitemap validation...');
    const sitemapOutput = execSync(`node scripts/validate-sitemaps.mjs --site=${SITE_URL}/sitemap.xml --out=${REPORTS_DIR}`, {
      encoding: 'utf8',
      stdio: 'pipe'
    });
    results.audits.sitemap = { success: true, output: sitemapOutput };
    
    // 3. Broken links check
    console.log('3️⃣ Broken links analysis...');
    const brokenLinksFile = path.join(REPORTS_DIR, 'broken-links.csv');
    if (fs.existsSync(brokenLinksFile)) {
      const brokenLinksContent = fs.readFileSync(brokenLinksFile, 'utf8');
      const lines = brokenLinksContent.split('\n').filter(line => line.trim());
      const internalBroken = lines.filter(line => 
        line.includes('emvi.app') && !line.includes('Status Code,URL')
      );
      
      results.audits.brokenLinks = {
        total: lines.length - 1, // Exclude header
        internal: internalBroken.length,
        details: internalBroken.slice(0, 10) // First 10 for analysis
      };
      
      console.log(`   Found ${internalBroken.length} internal broken links`);
    }
    
    console.log('✅ Audits complete');
    
  } catch (error) {
    console.error('❌ Audit failed:', error.message);
    results.audits.error = error.message;
  }
}

async function analyzeAndFix() {
  console.log('\n🔧 Analyzing Issues and Applying Safe Fixes...');
  
  const fixPlan = [];
  
  // Analyze broken links
  if (results.audits.brokenLinks?.internal?.length > 0) {
    console.log(`🔗 Processing ${results.audits.brokenLinks.internal.length} broken internal links...`);
    
    for (const brokenLink of results.audits.brokenLinks.details) {
      try {
        // Parse CSV line
        const [statusCode, url, sourceUrl] = brokenLink.split(',');
        if (url && url.includes('emvi.app')) {
          fixPlan.push({
            type: 'broken_link',
            url: url.trim(),
            sourceUrl: sourceUrl?.trim(),
            statusCode: statusCode?.trim(),
            priority: 'high'
          });
        }
      } catch (error) {
        console.warn('⚠️ Could not parse broken link:', brokenLink);
      }
    }
  }
  
  // Apply safe auto-fixes or simulate for dry-run
  if (fixPlan.length > 0) {
    if (DRY_RUN) {
      console.log(`🔧 DRY-RUN: Would apply ${fixPlan.length} fixes...`);
      results.fixes.manual.push({
        type: 'broken_links_dry_run',
        issues: fixPlan,
        reason: 'Dry-run mode - no changes applied'
      });
      results.summary.needs_review += fixPlan.length;
    } else {
      console.log(`🔧 Applying ${fixPlan.length} safe fixes...`);
      
      try {
        // Run broken links fixer
        const fixOutput = execSync(`node scripts/fix-broken-links.mjs --plan='${JSON.stringify(fixPlan)}' --dry-run=false`, {
          encoding: 'utf8',
          stdio: 'pipe'
        });
        
        results.fixes.auto.push({
          type: 'broken_links',
          count: fixPlan.length,
          output: fixOutput
        });
        
        results.summary.auto_fixed += fixPlan.length;
        console.log(`✅ Applied ${fixPlan.length} auto-fixes`);
        
      } catch (error) {
        console.warn('⚠️ Some auto-fixes failed:', error.message);
        results.fixes.manual.push({
          type: 'broken_links_manual',
          issues: fixPlan,
          reason: 'Auto-fix failed'
        });
      }
    }
  }
  
  // Check for canonical issues
  console.log('🔍 Checking canonical URLs...');
  try {
    const canonicalOutput = execSync(`node scripts/fix-canonicals.mjs --site=${SITE_URL} --dry-run=true`, {
      encoding: 'utf8',
      stdio: 'pipe'
    });
    
    if (canonicalOutput.includes('issues found')) {
      results.fixes.manual.push({
        type: 'canonicals',
        output: canonicalOutput,
        reason: 'Needs review'
      });
      results.summary.needs_review++;
    }
  } catch (error) {
    console.warn('⚠️ Canonical check failed:', error.message);
  }
  
  // Check JSON-LD
  console.log('🔍 Validating JSON-LD...');
  try {
    const jsonldOutput = execSync(`node scripts/fix-jsonld.mjs --site=${SITE_URL} --dry-run=true`, {
      encoding: 'utf8',
      stdio: 'pipe'
    });
    
    if (jsonldOutput.includes('missing') || jsonldOutput.includes('duplicate')) {
      results.fixes.auto.push({
        type: 'jsonld',
        output: jsonldOutput
      });
      
      // Apply JSON-LD fixes
      execSync(`node scripts/fix-jsonld.mjs --site=${SITE_URL} --dry-run=false`);
      results.summary.auto_fixed++;
    }
  } catch (error) {
    console.warn('⚠️ JSON-LD validation failed:', error.message);
  }
}

async function callChatGPTAgent(fixPlan) {
  if (!process.env.OPENAI_API_KEY) {
    console.log('⚠️ No OpenAI API key - skipping ChatGPT agent');
    return null;
  }
  
  console.log('🤖 Calling ChatGPT agent for complex fixes...');
  
  try {
    const agentOutput = execSync(`node scripts/agent-call.mjs --plan='${JSON.stringify(fixPlan)}'`, {
      encoding: 'utf8',
      stdio: 'pipe'
    });
    
    return JSON.parse(agentOutput);
  } catch (error) {
    console.warn('⚠️ ChatGPT agent call failed:', error.message);
    return null;
  }
}

async function generateSummary() {
  console.log('\n📊 Generating Summary Report...');
  
  const summary = `# 🤖 SEO Agent Report - ${new Date().toLocaleDateString()}

## 📈 Summary
- **Issues Found**: ${results.summary.issues_found}
- **Auto-Fixed**: ${results.summary.auto_fixed}  
- **Needs Review**: ${results.summary.needs_review}
- **Site**: ${SITE_URL}
- **Timestamp**: ${results.timestamp}

## 🔍 Audit Results

### Broken Links
${results.audits.brokenLinks ? `
- **Total**: ${results.audits.brokenLinks.total}
- **Internal**: ${results.audits.brokenLinks.internal}
${results.audits.brokenLinks.internal > 0 ? '- **Status**: ❌ CRITICAL - Fix required' : '- **Status**: ✅ All good'}
` : '- **Status**: ⚠️ Could not analyze'}

### Canonicals  
${results.fixes.manual.find(f => f.type === 'canonicals') ? '- **Status**: ⚠️ Issues found - Review needed' : '- **Status**: ✅ All good'}

### JSON-LD
${results.fixes.auto.find(f => f.type === 'jsonld') ? '- **Status**: ✅ Auto-fixed' : '- **Status**: ✅ All good'}

## 🔧 Applied Fixes

### Auto-Fixed
${results.fixes.auto.map(fix => `- **${fix.type}**: ${fix.count || 1} issues resolved`).join('\n') || '- None applied'}

### Manual Review Required  
${results.fixes.manual.map(fix => `- **${fix.type}**: ${fix.reason}`).join('\n') || '- None'}

## 🎯 Next Actions

${results.audits.brokenLinks?.internal > 0 ? '🚨 **CRITICAL**: Fix internal broken links immediately' : ''}
${results.summary.needs_review > 0 ? '⚠️ **REVIEW**: Manual fixes needed - see details above' : ''}
${results.summary.auto_fixed > 0 ? '✅ **SUCCESS**: Auto-fixes applied successfully' : ''}

---
*Generated by EmviApp SEO Agent*
`;

  const summaryPath = path.join(REPORTS_DIR, 'seo-agent-summary.md');
  fs.writeFileSync(summaryPath, summary);
  
  const resultsPath = path.join(REPORTS_DIR, 'seo-agent-results.json');
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  
  console.log(`✅ Summary saved to ${summaryPath}`);
  console.log(`📊 Full results saved to ${resultsPath}`);
  
  return { summaryPath, resultsPath };
}

async function main() {
  try {
    await runAudits();
    await analyzeAndFix();
    
    const { summaryPath } = await generateSummary();
    
    // Check if we should open a PR or issue
    const shouldOpenPR = results.summary.auto_fixed >= (config.notifications?.pr_threshold || 3);
    const shouldOpenIssue = results.summary.issues_found >= (config.notifications?.issue_threshold || 10);
    
    if (shouldOpenPR && process.env.GITHUB_TOKEN) {
      console.log('\n🔄 Auto-fixes applied - consider opening PR');
      // Would trigger PR creation logic
    }
    
    if (shouldOpenIssue && process.env.GITHUB_TOKEN) {
      console.log('\n⚠️ Multiple issues found - consider opening issue');
      // Would trigger issue creation logic
    }
    
    // Exit with error if critical issues found
    if (results.audits.brokenLinks?.internal > 0) {
      console.error('\n❌ CRITICAL: Internal broken links found');
      process.exit(1);
    }
    
    console.log('\n🎉 SEO Agent completed successfully!');
    console.log(`📄 View summary: ${summaryPath}`);
    
  } catch (error) {
    console.error('\n❌ SEO Agent failed:', error.message);
    process.exit(1);
  }
}

// Run the agent
main();