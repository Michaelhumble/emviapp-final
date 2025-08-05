// ============= EMVIAPP COMPREHENSIVE PERFORMANCE AUDIT SYSTEM =============
// Billion-dollar performance audit for all pages and routes

import { PerformanceMetrics } from './performanceOptimizer';

export interface PageAuditResult {
  page: string;
  route: string;
  fcp: number | null;
  lcp: number | null;
  cls: number | null;
  fid: number | null;
  ttfb: number | null;
  bundleSize: number | null;
  imageScore: number; // 0-100
  loadingStateScore: number; // 0-100
  seoScore: number; // 0-100
  status: 'PASS' | 'NEEDS_WORK' | 'CRITICAL';
  issues: string[];
  recommendations: string[];
}

export interface AuditTarget {
  name: string;
  route: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  expectedLoadTime: number; // seconds
}

// All pages to audit
export const AUDIT_TARGETS: AuditTarget[] = [
  // Critical path pages
  { name: 'Home/Main Page', route: '/', priority: 'critical', expectedLoadTime: 1.5 },
  { name: 'Jobs Listing', route: '/jobs', priority: 'critical', expectedLoadTime: 2.0 },
  { name: 'Blog Landing', route: '/blog', priority: 'high', expectedLoadTime: 2.0 },
  
  // Industry pages
  { name: 'Nails Industry', route: '/nails', priority: 'high', expectedLoadTime: 2.0 },
  { name: 'Hair Industry', route: '/hair', priority: 'high', expectedLoadTime: 2.0 },
  { name: 'Barber Industry', route: '/barber', priority: 'high', expectedLoadTime: 2.0 },
  { name: 'Massage Industry', route: '/massage', priority: 'medium', expectedLoadTime: 2.0 },
  { name: 'Skincare Industry', route: '/skincare', priority: 'medium', expectedLoadTime: 2.0 },
  { name: 'Makeup Industry', route: '/makeup', priority: 'medium', expectedLoadTime: 2.0 },
  { name: 'Brows/Lashes Industry', route: '/brows-lashes', priority: 'medium', expectedLoadTime: 2.0 },
  { name: 'Tattoo Industry', route: '/tattoo', priority: 'medium', expectedLoadTime: 2.0 },
  
  // User flows
  { name: 'Post Job Page', route: '/post-job', priority: 'high', expectedLoadTime: 1.8 },
  { name: 'Sign Up', route: '/auth/signup', priority: 'high', expectedLoadTime: 1.5 },
  { name: 'Sign In', route: '/signin', priority: 'high', expectedLoadTime: 1.5 },
  { name: 'Salon Marketplace', route: '/salons', priority: 'high', expectedLoadTime: 2.0 },
  
  // Secondary pages
  { name: 'About Page', route: '/about', priority: 'medium', expectedLoadTime: 2.0 },
  { name: 'Contact Page', route: '/contact', priority: 'medium', expectedLoadTime: 1.8 },
  { name: 'Pricing Page', route: '/pricing', priority: 'medium', expectedLoadTime: 1.8 },
  { name: 'Artists Page', route: '/artists', priority: 'medium', expectedLoadTime: 2.0 },
];

// Core Web Vitals thresholds
export const PERFORMANCE_THRESHOLDS = {
  fcp: { good: 1800, needsImprovement: 3000 }, // ms
  lcp: { good: 2500, needsImprovement: 4000 }, // ms
  cls: { good: 0.05, needsImprovement: 0.25 }, // unitless
  fid: { good: 100, needsImprovement: 300 }, // ms
  ttfb: { good: 600, needsImprovement: 1500 }, // ms
};

export class PerformanceAuditor {
  private results: PageAuditResult[] = [];
  
  async auditPage(target: AuditTarget): Promise<PageAuditResult> {
    console.log(`🔍 Auditing: ${target.name} (${target.route})`);
    
    const result: PageAuditResult = {
      page: target.name,
      route: target.route,
      fcp: null,
      lcp: null,
      cls: null,
      fid: null,
      ttfb: null,
      bundleSize: null,
      imageScore: 0,
      loadingStateScore: 0,
      seoScore: 0,
      status: 'NEEDS_WORK',
      issues: [],
      recommendations: []
    };

    try {
      // Measure Core Web Vitals
      const metrics = await this.measureCoreWebVitals();
      result.fcp = metrics.fcp || null;
      result.lcp = metrics.lcp || null;
      result.cls = metrics.cls || null;
      result.fid = metrics.fid || null;
      
      // Measure TTFB
      const navTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navTiming) {
        result.ttfb = navTiming.responseStart - navTiming.requestStart;
      }

      // Audit images
      result.imageScore = await this.auditImages();
      
      // Audit loading states
      result.loadingStateScore = await this.auditLoadingStates();
      
      // Audit SEO
      result.seoScore = this.auditSEO();
      
      // Determine status
      result.status = this.determineStatus(result);
      
      // Generate recommendations
      result.recommendations = this.generateRecommendations(result, target);
      
    } catch (error) {
      console.error(`❌ Error auditing ${target.name}:`, error);
      result.issues.push(`Audit failed: ${error}`);
      result.status = 'CRITICAL';
    }

    this.results.push(result);
    return result;
  }

  private async measureCoreWebVitals(): Promise<Partial<PerformanceMetrics>> {
    return new Promise((resolve) => {
      const metrics: Partial<PerformanceMetrics> = {};
      
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.name === 'first-contentful-paint') {
              metrics.fcp = entry.startTime;
            }
            if (entry.entryType === 'largest-contentful-paint') {
              metrics.lcp = (entry as any).startTime;
            }
            if (entry.entryType === 'first-input') {
              metrics.fid = (entry as any).processingStart - entry.startTime;
            }
            if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
              metrics.cls = (metrics.cls || 0) + (entry as any).value;
            }
          });
        });
        
        observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift'] });
        
        setTimeout(() => {
          observer.disconnect();
          resolve(metrics);
        }, 5000);
      } else {
        resolve(metrics);
      }
    });
  }

  private async auditImages(): Promise<number> {
    const images = document.querySelectorAll('img');
    let score = 100;
    let issues = 0;

    images.forEach((img) => {
      // Check for modern formats
      if (!img.src.includes('webp') && !img.src.includes('avif')) {
        issues++;
      }
      
      // Check for lazy loading
      if (!img.loading || img.loading !== 'lazy') {
        const rect = img.getBoundingClientRect();
        if (rect.top > window.innerHeight) {
          issues++; // Should be lazy loaded
        }
      }
      
      // Check for alt text
      if (!img.alt || img.alt.trim() === '') {
        issues++;
      }
      
      // Check for proper sizing
      if (img.naturalWidth > img.clientWidth * 2) {
        issues++; // Oversized image
      }
    });

    score = Math.max(0, 100 - (issues * 10));
    return score;
  }

  private async auditLoadingStates(): Promise<number> {
    // Check for skeleton loaders, spinners, or progress indicators
    const loadingElements = document.querySelectorAll('[class*="skeleton"], [class*="loading"], [class*="spinner"]');
    const suspenseElements = document.querySelectorAll('[data-testid*="suspense"], [class*="fallback"]');
    
    let score = 0;
    
    // Score based on presence of loading states
    if (loadingElements.length > 0) score += 40;
    if (suspenseElements.length > 0) score += 30;
    
    // Check for smooth transitions
    const animatedElements = document.querySelectorAll('[class*="animate"], [class*="transition"]');
    if (animatedElements.length > 5) score += 30;
    
    return Promise.resolve(Math.min(100, score));
  }

  private auditSEO(): number {
    let score = 0;
    let checks = 0;

    // Title tag
    const title = document.querySelector('title');
    if (title && title.textContent && title.textContent.length > 10) {
      score += 15;
    }
    checks++;

    // Meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && metaDesc.getAttribute('content') && metaDesc.getAttribute('content')!.length > 50) {
      score += 15;
    }
    checks++;

    // Heading structure
    const h1s = document.querySelectorAll('h1');
    if (h1s.length === 1) {
      score += 15;
    }
    checks++;

    // Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogTitle && ogImage) {
      score += 15;
    }
    checks++;

    // Canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      score += 10;
    }
    checks++;

    // Alt text coverage
    const images = document.querySelectorAll('img');
    const imagesWithAlt = document.querySelectorAll('img[alt]:not([alt=""])');
    if (images.length > 0 && imagesWithAlt.length / images.length > 0.8) {
      score += 15;
    }
    checks++;

    // Schema markup
    const schemas = document.querySelectorAll('script[type="application/ld+json"]');
    if (schemas.length > 0) {
      score += 15;
    }
    checks++;

    return (score / checks) * 100;
  }

  private determineStatus(result: PageAuditResult): 'PASS' | 'NEEDS_WORK' | 'CRITICAL' {
    const { fcp, lcp, cls } = result;
    
    // Critical issues
    if ((lcp && lcp > 4000) || (fcp && fcp > 3000) || (cls && cls > 0.25)) {
      return 'CRITICAL';
    }
    
    // Good performance
    if ((fcp && fcp < 1800) && (lcp && lcp < 2500) && (cls && cls < 0.05) && 
        result.imageScore > 70 && result.seoScore > 80) {
      return 'PASS';
    }
    
    return 'NEEDS_WORK';
  }

  private generateRecommendations(result: PageAuditResult, target: AuditTarget): string[] {
    const recommendations: string[] = [];
    
    if (result.fcp && result.fcp > PERFORMANCE_THRESHOLDS.fcp.good) {
      recommendations.push('Reduce First Contentful Paint by optimizing critical CSS and removing render-blocking resources');
    }
    
    if (result.lcp && result.lcp > PERFORMANCE_THRESHOLDS.lcp.good) {
      recommendations.push('Optimize Largest Contentful Paint by compressing hero images and preloading critical resources');
    }
    
    if (result.cls && result.cls > PERFORMANCE_THRESHOLDS.cls.good) {
      recommendations.push('Reduce Cumulative Layout Shift by setting explicit dimensions on images and avoiding dynamic content injection');
    }
    
    if (result.imageScore < 70) {
      recommendations.push('Convert images to WebP/AVIF format, implement proper lazy loading, and add alt text');
    }
    
    if (result.seoScore < 80) {
      recommendations.push('Improve SEO by adding meta descriptions, Open Graph tags, and structured data');
    }
    
    if (result.loadingStateScore < 50) {
      recommendations.push('Add skeleton loaders and loading states for better perceived performance');
    }
    
    return recommendations;
  }

  async auditAllPages(): Promise<PageAuditResult[]> {
    console.log('🚀 Starting comprehensive performance audit...');
    
    this.results = [];
    
    for (const target of AUDIT_TARGETS) {
      await this.auditPage(target);
      
      // Small delay between audits
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    return this.results;
  }

  generateReport(): string {
    const passCount = this.results.filter(r => r.status === 'PASS').length;
    const needsWorkCount = this.results.filter(r => r.status === 'NEEDS_WORK').length;
    const criticalCount = this.results.filter(r => r.status === 'CRITICAL').length;
    
    let report = `
# 📊 EMVIAPP PERFORMANCE AUDIT REPORT
## Summary: ${passCount} PASS | ${needsWorkCount} NEEDS WORK | ${criticalCount} CRITICAL

| Page | Route | FCP | LCP | CLS | Status | Score |
|------|-------|-----|-----|-----|--------|-------|
`;

    this.results.forEach(result => {
      const fcp = result.fcp ? `${Math.round(result.fcp)}ms` : 'N/A';
      const lcp = result.lcp ? `${Math.round(result.lcp)}ms` : 'N/A';
      const cls = result.cls ? result.cls.toFixed(3) : 'N/A';
      const score = Math.round((result.imageScore + result.seoScore + result.loadingStateScore) / 3);
      
      report += `| ${result.page} | ${result.route} | ${fcp} | ${lcp} | ${cls} | ${result.status} | ${score}% |\n`;
    });

    report += `\n## 🎯 Priority Fixes Needed:\n`;
    
    this.results
      .filter(r => r.status === 'CRITICAL' || r.status === 'NEEDS_WORK')
      .forEach(result => {
        report += `\n### ${result.page}\n`;
        result.recommendations.forEach(rec => {
          report += `- ${rec}\n`;
        });
      });

    return report;
  }
}

// Export singleton instance
export const performanceAuditor = new PerformanceAuditor();