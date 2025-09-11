#!/usr/bin/env node

/**
 * 🧹 SEO Housekeeping Script  
 * Cleans up old cache files and maintains SEO data hygiene
 */

import fs from 'fs';
import path from 'path';

const CACHE_DIR = '.seo-cache';
const REPORTS_DIR = 'reports';
const MAX_CACHE_FILES = 8; // Keep last 8 runs
const MAX_AGE_DAYS = 30; // Delete files older than 30 days

function ensureDirectories() {
  [CACHE_DIR, REPORTS_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`📁 Created directory: ${dir}`);
    }
  });
}

function cleanupCacheFiles() {
  console.log('🧹 Cleaning up cache files...');
  
  if (!fs.existsSync(CACHE_DIR)) {
    console.log('📁 Cache directory not found, creating...');
    fs.mkdirSync(CACHE_DIR, { recursive: true });
    return { cleaned: 0, kept: 0 };
  }

  const files = fs.readdirSync(CACHE_DIR)
    .filter(file => file.endsWith('.json'))
    .map(file => ({
      name: file,
      path: path.join(CACHE_DIR, file),
      stat: fs.statSync(path.join(CACHE_DIR, file))
    }))
    .sort((a, b) => b.stat.mtime - a.stat.mtime); // Sort by newest first

  let cleaned = 0;
  let kept = 0;
  
  // Group files by type
  const fileTypes = {};
  files.forEach(file => {
    const type = file.name.split('-')[0]; // audit, cwv, keywords, etc.
    if (!fileTypes[type]) fileTypes[type] = [];
    fileTypes[type].push(file);
  });

  // Clean each file type separately
  Object.entries(fileTypes).forEach(([type, typeFiles]) => {
    console.log(`📋 Processing ${type} files (${typeFiles.length} total)`);
    
    typeFiles.forEach((file, index) => {
      const ageInDays = (Date.now() - file.stat.mtime) / (1000 * 60 * 60 * 24);
      
      if (index >= MAX_CACHE_FILES || ageInDays > MAX_AGE_DAYS) {
        try {
          fs.unlinkSync(file.path);
          console.log(`🗑️ Deleted old ${type} file: ${file.name} (${Math.round(ageInDays)} days old)`);
          cleaned++;
        } catch (error) {
          console.error(`❌ Failed to delete ${file.name}: ${error.message}`);
        }
      } else {
        kept++;
      }
    });
  });

  return { cleaned, kept };
}

function cleanupReports() {
  console.log('🧹 Cleaning up report files...');
  
  if (!fs.existsSync(REPORTS_DIR)) {
    console.log('📁 Reports directory not found, creating...');
    fs.mkdirSync(REPORTS_DIR, { recursive: true });
    return { cleaned: 0, kept: 0 };
  }

  const files = fs.readdirSync(REPORTS_DIR)
    .filter(file => file.endsWith('.html') || file.endsWith('.csv') || file.endsWith('.txt'))
    .map(file => ({
      name: file,
      path: path.join(REPORTS_DIR, file),
      stat: fs.statSync(path.join(REPORTS_DIR, file))
    }));

  let cleaned = 0;
  let kept = 0;

  files.forEach(file => {
    const ageInDays = (Date.now() - file.stat.mtime) / (1000 * 60 * 60 * 24);
    
    if (ageInDays > MAX_AGE_DAYS) {
      try {
        fs.unlinkSync(file.path);
        console.log(`🗑️ Deleted old report: ${file.name} (${Math.round(ageInDays)} days old)`);
        cleaned++;
      } catch (error) {
        console.error(`❌ Failed to delete ${file.name}: ${error.message}`);
      }
    } else {
      kept++;
    }
  });

  return { cleaned, kept };
}

function generateInventory() {
  console.log('📊 Generating file inventory...');
  
  const inventory = {
    timestamp: new Date().toISOString(),
    cache_files: [],
    reports: [],
    disk_usage: {}
  };

  // Inventory cache files
  if (fs.existsSync(CACHE_DIR)) {
    inventory.cache_files = fs.readdirSync(CACHE_DIR)
      .filter(file => file.endsWith('.json'))
      .map(file => {
        const filePath = path.join(CACHE_DIR, file);
        const stat = fs.statSync(filePath);
        return {
          name: file,
          size_bytes: stat.size,
          age_days: Math.round((Date.now() - stat.mtime) / (1000 * 60 * 60 * 24)),
          type: file.split('-')[0]
        };
      });
  }

  // Inventory reports
  if (fs.existsSync(REPORTS_DIR)) {
    inventory.reports = fs.readdirSync(REPORTS_DIR)
      .map(file => {
        const filePath = path.join(REPORTS_DIR, file);
        const stat = fs.statSync(filePath);
        return {
          name: file,
          size_bytes: stat.size,
          age_days: Math.round((Date.now() - stat.mtime) / (1000 * 60 * 60 * 24))
        };
      });
  }

  // Calculate disk usage
  inventory.disk_usage = {
    cache_total_mb: inventory.cache_files.reduce((sum, f) => sum + f.size_bytes, 0) / (1024 * 1024),
    reports_total_mb: inventory.reports.reduce((sum, f) => sum + f.size_bytes, 0) / (1024 * 1024),
    cache_file_count: inventory.cache_files.length,
    reports_file_count: inventory.reports.length
  };

  // Save inventory
  const inventoryFile = path.join(CACHE_DIR, 'inventory.json');
  fs.writeFileSync(inventoryFile, JSON.stringify(inventory, null, 2));
  
  return inventory;
}

function validateDataFiles() {
  console.log('✅ Validating data files...');
  
  const requiredFiles = [
    'data/keywords.json',
    'data/competitors.json', 
    'data/priority-urls.json'
  ];

  const validation = {
    valid_files: [],
    missing_files: [],
    corrupted_files: []
  };

  requiredFiles.forEach(file => {
    if (!fs.existsSync(file)) {
      validation.missing_files.push(file);
      console.log(`❌ Missing: ${file}`);
    } else {
      try {
        JSON.parse(fs.readFileSync(file, 'utf8'));
        validation.valid_files.push(file);
        console.log(`✅ Valid: ${file}`);
      } catch (error) {
        validation.corrupted_files.push({ file, error: error.message });
        console.log(`🚨 Corrupted: ${file} - ${error.message}`);
      }
    }
  });

  return validation;
}

async function main() {
  console.log('🧹 Starting SEO Housekeeping');
  
  // Ensure directories exist
  ensureDirectories();
  
  // Clean up old files
  const cacheCleanup = cleanupCacheFiles();
  const reportsCleanup = cleanupReports();
  
  // Generate inventory
  const inventory = generateInventory();
  
  // Validate data files
  const validation = validateDataFiles();
  
  // Generate summary
  const summary = {
    timestamp: new Date().toISOString(),
    cleanup: {
      cache_files_cleaned: cacheCleanup.cleaned,
      cache_files_kept: cacheCleanup.kept,
      reports_cleaned: reportsCleanup.cleaned,
      reports_kept: reportsCleanup.kept
    },
    disk_usage: inventory.disk_usage,
    validation: {
      valid_files: validation.valid_files.length,
      missing_files: validation.missing_files.length,
      corrupted_files: validation.corrupted_files.length
    },
    issues: []
  };

  // Check for issues
  if (validation.missing_files.length > 0) {
    summary.issues.push({
      type: 'missing_data_files',
      description: `${validation.missing_files.length} required data files are missing`,
      files: validation.missing_files
    });
  }

  if (validation.corrupted_files.length > 0) {
    summary.issues.push({
      type: 'corrupted_data_files',
      description: `${validation.corrupted_files.length} data files are corrupted`,
      files: validation.corrupted_files
    });
  }

  if (inventory.disk_usage.cache_total_mb > 100) {
    summary.issues.push({
      type: 'high_disk_usage',
      description: `Cache directory using ${inventory.disk_usage.cache_total_mb.toFixed(2)}MB of disk space`
    });
  }

  // Save summary
  const summaryFile = path.join(CACHE_DIR, 'housekeeping-summary.json');
  fs.writeFileSync(summaryFile, JSON.stringify(summary, null, 2));

  console.log('\n🧹 SEO Housekeeping Complete');
  console.log(`📁 Files cleaned: ${summary.cleanup.cache_files_cleaned + summary.cleanup.reports_cleaned}`);
  console.log(`📁 Files kept: ${summary.cleanup.cache_files_kept + summary.cleanup.reports_kept}`);
  console.log(`💾 Cache usage: ${inventory.disk_usage.cache_total_mb.toFixed(2)}MB`);
  console.log(`📋 Data files: ${validation.valid_files.length}/${requiredFiles.length} valid`);
  console.log(`⚠️ Issues found: ${summary.issues.length}`);

  if (summary.issues.length > 0) {
    console.log('\n🚨 Issues Detected:');
    summary.issues.forEach(issue => {
      console.log(`- ${issue.type}: ${issue.description}`);
    });
  }

  return summary;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('❌ Housekeeping failed:', error);
    process.exit(1);
  });
}

export { main as runHousekeeping };