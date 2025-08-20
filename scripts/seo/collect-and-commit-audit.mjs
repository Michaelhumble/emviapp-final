#!/usr/bin/env node

/**
 * Collect SEO audit artifacts and commit them to the repository
 * Usage: node scripts/seo/collect-and-commit-audit.mjs
 */

import fs from 'fs/promises';
import path from 'path';
import { execSync } from 'child_process';

async function collectAndCommitAudit() {
  try {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const auditDir = path.join('reports', 'seo', today);
    
    console.log(`📁 Creating audit directory: ${auditDir}`);
    await fs.mkdir(auditDir, { recursive: true });
    
    // Files to move from reports/ to reports/seo/YYYY-MM-DD/
    const filesToMove = [
      { from: 'reports/seo-report.html', to: path.join(auditDir, 'seo-report.html') },
      { from: 'reports/broken-links.csv', to: path.join(auditDir, 'broken-links.csv') }
    ];
    
    const movedFiles = [];
    
    for (const { from, to } of filesToMove) {
      try {
        await fs.access(from);
        await fs.rename(from, to);
        console.log(`✓ Moved ${from} → ${to}`);
        movedFiles.push(path.basename(to));
      } catch (error) {
        console.warn(`⚠️  Could not move ${from}: ${error.message}`);
      }
    }
    
    if (movedFiles.length === 0) {
      console.log('No audit files found to commit.');
      return;
    }
    
    // Configure git for automated commits
    try {
      execSync('git config user.name "github-actions[bot]"', { stdio: 'pipe' });
      execSync('git config user.email "github-actions[bot]@users.noreply.github.com"', { stdio: 'pipe' });
    } catch (error) {
      console.warn('Could not configure git user, may already be set');
    }
    
    // Add the new files to git
    execSync(`git add "${auditDir}/"`, { stdio: 'inherit' });
    
    // Create commit message
    const commitMessage = `chore(seo): add audit artifacts for ${today} [${movedFiles.join(', ')}]`;
    
    // Check if there are changes to commit
    try {
      execSync('git diff --cached --quiet', { stdio: 'pipe' });
      console.log('No changes to commit.');
    } catch (error) {
      // There are changes, proceed with commit
      execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
      console.log(`✓ Committed audit artifacts for ${today}`);
      
      // Push the changes
      execSync('git push', { stdio: 'inherit' });
      console.log('✓ Pushed changes to repository');
    }
    
  } catch (error) {
    console.error('❌ Error collecting and committing audit:', error.message);
    process.exit(1);
  }
}

collectAndCommitAudit();