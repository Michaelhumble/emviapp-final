#!/usr/bin/env node

/**
 * Performance Audit Script for EmviApp
 * Analyzes bundle sizes, dependencies, and performance metrics
 */

import { readFileSync, existsSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

const log = (message, color = 'reset') => {
  console.log(`${colors[color]}${message}${colors.reset}`);
};

// Performance budget thresholds
const PERFORMANCE_BUDGETS = {
  totalJSSize: 300 * 1024, // 300KB
  totalCSSSize: 100 * 1024, // 100KB
  maxChunkSize: 200 * 1024, // 200KB per chunk
  maxDependencies: 50,
  criticalPathSize: 150 * 1024 // 150KB for critical path
};

class PerformanceAuditor {
  constructor() {
    this.results = {
      passed: 0,
      failed: 0,
      warnings: 0,
      violations: []
    };
  }

  // Check if required files exist
  checkRequiredFiles() {
    log('\n📋 Checking required files...', 'cyan');
    
    const requiredFiles = [
      'package.json',
      'vite.config.ts',
      'src/utils/performanceOptimizer.ts',
      'src/components/performance/PerformanceProvider.tsx'
    ];

    requiredFiles.forEach(file => {
      const filePath = join(projectRoot, file);
      if (existsSync(filePath)) {
        log(`  ✅ ${file}`, 'green');
        this.results.passed++;
      } else {
        log(`  ❌ Missing: ${file}`, 'red');
        this.results.failed++;
        this.results.violations.push(`Missing required file: ${file}`);
      }
    });
  }

  // Analyze package.json for performance impacts
  analyzeDependencies() {
    log('\n📦 Analyzing dependencies...', 'cyan');
    
    try {
      const packagePath = join(projectRoot, 'package.json');
      const pkg = JSON.parse(readFileSync(packagePath, 'utf8'));
      
      const allDeps = {
        ...pkg.dependencies,
        ...pkg.devDependencies
      };
      
      const depCount = Object.keys(pkg.dependencies || {}).length;
      const devDepCount = Object.keys(pkg.devDependencies || {}).length;
      
      log(`  📊 Production dependencies: ${depCount}`, depCount > PERFORMANCE_BUDGETS.maxDependencies ? 'yellow' : 'green');
      log(`  🛠️  Development dependencies: ${devDepCount}`, 'blue');
      
      if (depCount > PERFORMANCE_BUDGETS.maxDependencies) {
        this.results.warnings++;
        this.results.violations.push(`High dependency count: ${depCount} (budget: ${PERFORMANCE_BUDGETS.maxDependencies})`);
      } else {
        this.results.passed++;
      }

      // Check for performance-critical dependencies
      const heavyDeps = [
        'lodash', 'moment', 'jquery', 'bootstrap', 
        'material-ui', 'antd', '@ant-design/icons'
      ];
      
      heavyDeps.forEach(dep => {
        if (allDeps[dep]) {
          log(`  ⚠️  Heavy dependency detected: ${dep}`, 'yellow');
          this.results.warnings++;
        }
      });

      // Check for performance-optimized alternatives
      const optimizedDeps = [
        'react-window', 'react-virtualized', 'intersection-observer',
        'web-vitals', 'workbox-webpack-plugin'
      ];
      
      log('\n  🚀 Performance optimizations:', 'magenta');
      optimizedDeps.forEach(dep => {
        if (allDeps[dep]) {
          log(`    ✅ ${dep}`, 'green');
        } else {
          log(`    ❓ Consider adding: ${dep}`, 'yellow');
        }
      });

    } catch (error) {
      log(`  ❌ Error analyzing dependencies: ${error.message}`, 'red');
      this.results.failed++;
    }
  }

  // Analyze Vite configuration for performance
  analyzeViteConfig() {
    log('\n⚡ Analyzing Vite configuration...', 'cyan');
    
    try {
      const configPath = join(projectRoot, 'vite.config.ts');
      const config = readFileSync(configPath, 'utf8');
      
      // Check for manual chunks configuration
      if (config.includes('manualChunks')) {
        log('  ✅ Manual chunks configured for code splitting', 'green');
        this.results.passed++;
      } else {
        log('  ⚠️  Manual chunks not configured', 'yellow');
        this.results.warnings++;
        this.results.violations.push('Missing manual chunks configuration for optimal code splitting');
      }
      
      // Check for build optimizations
      const optimizations = [
        { pattern: 'minify', name: 'Minification' },
        { pattern: 'sourcemap.*false', name: 'Source maps disabled for production' },
        { pattern: 'chunkSizeWarningLimit', name: 'Chunk size limit' },
        { pattern: 'assetsInlineLimit', name: 'Asset inline limit' },
        { pattern: 'cssCodeSplit', name: 'CSS code splitting' }
      ];
      
      optimizations.forEach(({ pattern, name }) => {
        if (config.match(new RegExp(pattern))) {
          log(`  ✅ ${name}`, 'green');
          this.results.passed++;
        } else {
          log(`  ❓ Consider: ${name}`, 'yellow');
        }
      });

      // Check for performance-critical chunks
      if (config.includes('critical')) {
        log('  ✅ Critical path chunks identified', 'green');
        this.results.passed++;
      } else {
        log('  ⚠️  Critical path not optimized', 'yellow');
        this.results.warnings++;
      }

    } catch (error) {
      log(`  ❌ Error analyzing Vite config: ${error.message}`, 'red');
      this.results.failed++;
    }
  }

  // Check for performance optimization patterns in code
  analyzeCodePatterns() {
    log('\n🔍 Analyzing code patterns...', 'cyan');
    
    const patterns = [
      {
        file: 'src/utils/performanceOptimizer.ts',
        checks: [
          { pattern: 'measurePerformance', name: 'Performance measurement' },
          { pattern: 'generateOptimizedImageUrl', name: 'Image optimization' },
          { pattern: 'createLazyObserver', name: 'Lazy loading' },
          { pattern: 'preloadCriticalResources', name: 'Resource preloading' }
        ]
      },
      {
        file: 'index.html',
        checks: [
          { pattern: 'preconnect', name: 'DNS preconnect' },
          { pattern: 'preload.*font', name: 'Font preloading' },
          { pattern: 'loading="eager"', name: 'Critical image loading' },
          { pattern: 'aspect-ratio', name: 'CLS prevention' }
        ]
      }
    ];

    patterns.forEach(({ file, checks }) => {
      const filePath = join(projectRoot, file);
      
      if (existsSync(filePath)) {
        const content = readFileSync(filePath, 'utf8');
        
        log(`\n  📄 ${file}:`, 'blue');
        checks.forEach(({ pattern, name }) => {
          if (content.match(new RegExp(pattern, 'i'))) {
            log(`    ✅ ${name}`, 'green');
            this.results.passed++;
          } else {
            log(`    ❌ Missing: ${name}`, 'red');
            this.results.failed++;
            this.results.violations.push(`${file}: Missing ${name}`);
          }
        });
      } else {
        log(`  ❌ File not found: ${file}`, 'red');
        this.results.failed++;
      }
    });
  }

  // Generate performance recommendations
  generateRecommendations() {
    log('\n💡 Performance Recommendations:', 'magenta');
    
    const recommendations = [
      '1. 🖼️  Use WebP/AVIF formats for images',
      '2. 📱 Implement lazy loading for below-the-fold content',
      '3. 🔄 Add service worker for caching',
      '4. 📦 Enable gzip/brotli compression',
      '5. 🚀 Use CDN for static assets',
      '6. 🎯 Minimize render-blocking resources',
      '7. 📊 Monitor Core Web Vitals regularly',
      '8. 🔍 Use performance budgets in CI/CD',
      '9. 📈 Implement performance analytics',
      '10. 🔧 Regular dependency audits'
    ];
    
    recommendations.forEach(rec => log(`  ${rec}`, 'cyan'));
  }

  // Generate report summary
  generateSummary() {
    log('\n📊 Performance Audit Summary:', 'bold');
    log('═'.repeat(50), 'blue');
    
    const total = this.results.passed + this.results.failed + this.results.warnings;
    const passRate = total > 0 ? ((this.results.passed / total) * 100).toFixed(1) : 0;
    
    log(`✅ Passed: ${this.results.passed}`, 'green');
    log(`❌ Failed: ${this.results.failed}`, 'red');
    log(`⚠️  Warnings: ${this.results.warnings}`, 'yellow');
    log(`📈 Pass Rate: ${passRate}%`, passRate >= 80 ? 'green' : passRate >= 60 ? 'yellow' : 'red');
    
    if (this.results.violations.length > 0) {
      log('\n🚨 Violations to address:', 'red');
      this.results.violations.forEach((violation, i) => {
        log(`  ${i + 1}. ${violation}`, 'red');
      });
    }

    // Save results to file
    const reportPath = join(projectRoot, 'performance-audit-report.json');
    const report = {
      timestamp: new Date().toISOString(),
      summary: this.results,
      passRate: parseFloat(passRate),
      grade: passRate >= 90 ? 'A' : passRate >= 80 ? 'B' : passRate >= 70 ? 'C' : passRate >= 60 ? 'D' : 'F'
    };
    
    writeFileSync(reportPath, JSON.stringify(report, null, 2));
    log(`\n📄 Report saved to: performance-audit-report.json`, 'blue');
  }

  // Run complete audit
  async run() {
    log('🚀 Starting EmviApp Performance Audit...', 'bold');
    log('═'.repeat(50), 'blue');
    
    this.checkRequiredFiles();
    this.analyzeDependencies();
    this.analyzeViteConfig();
    this.analyzeCodePatterns();
    this.generateRecommendations();
    this.generateSummary();
    
    log('\n✨ Performance audit completed!', 'green');
    
    // Exit with appropriate code
    const hasFailures = this.results.failed > 0;
    process.exit(hasFailures ? 1 : 0);
  }
}

// Run the audit
const auditor = new PerformanceAuditor();
auditor.run().catch(error => {
  log(`💥 Audit failed: ${error.message}`, 'red');
  process.exit(1);
});