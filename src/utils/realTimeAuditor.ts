// ============= REAL-TIME PERFORMANCE AUDIT EXECUTION SYSTEM =============
// Executes live performance audits on the current page

import { PageAuditResult, PERFORMANCE_THRESHOLDS } from './performanceAuditor';

export class RealTimeAuditor {
  private metrics: any = {};
  
  async auditCurrentPage(): Promise<PageAuditResult> {
    const currentPath = window.location.pathname;
    const pageName = this.getPageName(currentPath);
    
    console.log(`🔍 Auditing current page: ${pageName} (${currentPath})`);
    
    const result: PageAuditResult = {
      page: pageName,
      route: currentPath,
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
      // Get navigation timing
      const navTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navTiming) {
        result.ttfb = navTiming.responseStart - navTiming.requestStart;
      }

      // Get paint timing
      const paintEntries = performance.getEntriesByType('paint');
      const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
      if (fcpEntry) {
        result.fcp = fcpEntry.startTime;
      }

      // Measure current metrics
      await this.measureWebVitals(result);
      
      // Audit images
      result.imageScore = this.auditImages();
      
      // Audit loading states
      result.loadingStateScore = this.auditLoadingStates();
      
      // Audit SEO
      result.seoScore = this.auditSEO();
      
      // Calculate bundle size
      result.bundleSize = this.estimateBundleSize();
      
      // Determine status
      result.status = this.determineStatus(result);
      
      // Generate recommendations
      result.recommendations = this.generateRecommendations(result);
      
      console.log('✅ Current page audit complete:', result);
      
    } catch (error) {
      console.error('❌ Error auditing current page:', error);
      result.issues.push(`Audit failed: ${error}`);
      result.status = 'CRITICAL';
    }

    return result;
  }

  private getPageName(path: string): string {
    const pageMap: Record<string, string> = {
      '/': 'Home/Main Page',
      '/jobs': 'Jobs Listing',
      '/blog': 'Blog Landing',
      '/salons': 'Salon Marketplace',
      '/artists': 'Artists Page',
      '/about': 'About Page',
      '/contact': 'Contact Page',
      '/community': 'Community Page',
      '/auth/signin': 'Sign In',
      '/auth/signup': 'Sign Up',
      '/booking-services': 'Booking Services',
      '/performance-audit': 'Performance Audit Dashboard'
    };

    return pageMap[path] || `Page: ${path}`;
  }

  private async measureWebVitals(result: PageAuditResult): Promise<void> {
    return new Promise((resolve) => {
      // Use PerformanceObserver for modern metrics
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            switch (entry.entryType) {
              case 'largest-contentful-paint':
                result.lcp = entry.startTime;
                break;
              case 'first-input':
                result.fid = (entry as any).processingStart - entry.startTime;
                break;
              case 'layout-shift':
                if (!(entry as any).hadRecentInput) {
                  result.cls = (result.cls || 0) + (entry as any).value;
                }
                break;
            }
          });
        });
        
        try {
          observer.observe({ 
            entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] 
          });
          
          // Stop observing after 5 seconds
          setTimeout(() => {
            observer.disconnect();
            resolve();
          }, 5000);
        } catch (error) {
          console.warn('PerformanceObserver not fully supported:', error);
          resolve();
        }
      } else {
        resolve();
      }
    });
  }

  private auditImages(): number {
    const images = document.querySelectorAll('img');
    let score = 100;
    let totalIssues = 0;
    
    const issues = {
      noModernFormat: 0,
      noLazyLoading: 0,
      noAltText: 0,
      oversized: 0,
      slowLoading: 0
    };

    images.forEach((img) => {
      // Check for modern formats (WebP/AVIF)
      if (!img.src.includes('webp') && !img.src.includes('avif') && 
          !img.srcset?.includes('webp') && !img.srcset?.includes('avif')) {
        issues.noModernFormat++;
      }
      
      // Check for lazy loading on below-fold images
      const rect = img.getBoundingClientRect();
      if (rect.top > window.innerHeight && img.loading !== 'lazy') {
        issues.noLazyLoading++;
      }
      
      // Check for alt text
      if (!img.alt || img.alt.trim() === '') {
        issues.noAltText++;
      }
      
      // Check for oversized images
      if (img.naturalWidth > 0 && img.naturalWidth > img.clientWidth * 2) {
        issues.oversized++;
      }
      
      // Check if image is still loading
      if (!img.complete) {
        issues.slowLoading++;
      }
    });

    totalIssues = Object.values(issues).reduce((sum, count) => sum + count, 0);
    
    // Calculate score (each issue reduces score by 5 points, minimum 0)
    score = Math.max(0, 100 - (totalIssues * 5));
    
    console.log('📸 Image audit:', { images: images.length, issues, score });
    return score;
  }

  private auditLoadingStates(): number {
    let score = 0;
    
    // Check for skeleton loaders
    const skeletons = document.querySelectorAll('[class*="skeleton"], [data-skeleton]');
    if (skeletons.length > 0) score += 25;
    
    // Check for loading spinners/indicators
    const loadingElements = document.querySelectorAll('[class*="loading"], [class*="spinner"], [aria-label*="loading"]');
    if (loadingElements.length > 0) score += 20;
    
    // Check for progressive disclosure/suspense boundaries
    const suspenseElements = document.querySelectorAll('[data-testid*="suspense"], [class*="fallback"]');
    if (suspenseElements.length > 0) score += 15;
    
    // Check for smooth transitions
    const animatedElements = document.querySelectorAll('[class*="animate"], [class*="transition"]');
    if (animatedElements.length > 3) score += 20;
    
    // Check for proper loading states on buttons/forms
    const loadingButtons = document.querySelectorAll('button[disabled], button[aria-busy="true"]');
    if (loadingButtons.length > 0) score += 10;
    
    // Check for image placeholders
    const imagePlaceholders = document.querySelectorAll('[class*="placeholder"], [style*="blur"]');
    if (imagePlaceholders.length > 0) score += 10;
    
    console.log('⏳ Loading states audit:', { score });
    return Math.min(100, score);
  }

  private auditSEO(): number {
    let score = 0;
    const checks = [];
    
    // Title tag (15 points)
    const title = document.querySelector('title');
    if (title?.textContent && title.textContent.length >= 10 && title.textContent.length <= 60) {
      score += 15;
      checks.push('✅ Title tag');
    } else {
      checks.push('❌ Title tag');
    }
    
    // Meta description (15 points)
    const metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    if (metaDesc?.content && metaDesc.content.length >= 50 && metaDesc.content.length <= 160) {
      score += 15;
      checks.push('✅ Meta description');
    } else {
      checks.push('❌ Meta description');
    }
    
    // H1 tag (15 points)
    const h1s = document.querySelectorAll('h1');
    if (h1s.length === 1) {
      score += 15;
      checks.push('✅ Single H1');
    } else {
      checks.push(`❌ H1 count: ${h1s.length}`);
    }
    
    // Open Graph tags (20 points)
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogTitle && ogDescription && ogImage) {
      score += 20;
      checks.push('✅ Open Graph tags');
    } else {
      checks.push('❌ Open Graph tags incomplete');
    }
    
    // Canonical URL (10 points)
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      score += 10;
      checks.push('✅ Canonical URL');
    } else {
      checks.push('❌ Canonical URL');
    }
    
    // Alt text coverage (15 points)
    const images = document.querySelectorAll('img');
    const imagesWithAlt = document.querySelectorAll('img[alt]:not([alt=""])');
    const altCoverage = images.length > 0 ? (imagesWithAlt.length / images.length) * 100 : 100;
    if (altCoverage >= 90) {
      score += 15;
      checks.push('✅ Alt text coverage');
    } else {
      checks.push(`❌ Alt text coverage: ${altCoverage.toFixed(0)}%`);
    }
    
    // Schema markup (10 points)
    const schemas = document.querySelectorAll('script[type="application/ld+json"]');
    if (schemas.length > 0) {
      score += 10;
      checks.push('✅ Schema markup');
    } else {
      checks.push('❌ Schema markup');
    }
    
    console.log('🔍 SEO audit:', { score, checks });
    return score;
  }

  private estimateBundleSize(): number {
    // Estimate based on resource timing
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    const jsResources = resources.filter(resource => 
      resource.name.includes('.js') || resource.name.includes('javascript')
    );
    
    const totalSize = jsResources.reduce((sum, resource) => {
      return sum + (resource.transferSize || 0);
    }, 0);
    
    return Math.round(totalSize / 1024); // Convert to KB
  }

  private determineStatus(result: PageAuditResult): 'PASS' | 'NEEDS_WORK' | 'CRITICAL' {
    const criticalIssues = [];
    const needsWorkIssues = [];
    
    // Check critical thresholds
    if (result.lcp && result.lcp > 4000) criticalIssues.push('LCP > 4s');
    if (result.fcp && result.fcp > 3000) criticalIssues.push('FCP > 3s');
    if (result.cls && result.cls > 0.25) criticalIssues.push('CLS > 0.25');
    if (result.ttfb && result.ttfb > 2000) criticalIssues.push('TTFB > 2s');
    
    // Check needs work thresholds
    if (result.lcp && result.lcp > 2500) needsWorkIssues.push('LCP > 2.5s');
    if (result.fcp && result.fcp > 1800) needsWorkIssues.push('FCP > 1.8s');
    if (result.cls && result.cls > 0.05) needsWorkIssues.push('CLS > 0.05');
    if (result.ttfb && result.ttfb > 600) needsWorkIssues.push('TTFB > 600ms');
    if (result.imageScore < 70) needsWorkIssues.push('Poor image optimization');
    if (result.seoScore < 80) needsWorkIssues.push('Poor SEO');
    
    if (criticalIssues.length > 0) {
      result.issues.push(...criticalIssues);
      return 'CRITICAL';
    }
    
    if (needsWorkIssues.length > 0) {
      result.issues.push(...needsWorkIssues);
      return 'NEEDS_WORK';
    }
    
    return 'PASS';
  }

  private generateRecommendations(result: PageAuditResult): string[] {
    const recommendations: string[] = [];
    
    if (result.fcp && result.fcp > PERFORMANCE_THRESHOLDS.fcp.good) {
      recommendations.push(`🚀 Reduce FCP from ${Math.round(result.fcp)}ms to <1800ms by inlining critical CSS and removing render-blocking resources`);
    }
    
    if (result.lcp && result.lcp > PERFORMANCE_THRESHOLDS.lcp.good) {
      recommendations.push(`⚡ Optimize LCP from ${Math.round(result.lcp)}ms to <2500ms by compressing hero images and preloading critical resources`);
    }
    
    if (result.cls && result.cls > PERFORMANCE_THRESHOLDS.cls.good) {
      recommendations.push(`📐 Fix layout shifts (CLS: ${result.cls.toFixed(3)}) by setting explicit dimensions on images and avoiding dynamic content injection`);
    }
    
    if (result.ttfb && result.ttfb > PERFORMANCE_THRESHOLDS.ttfb.good) {
      recommendations.push(`🌐 Improve TTFB from ${Math.round(result.ttfb)}ms to <600ms by optimizing server response time and using CDN`);
    }
    
    if (result.imageScore < 70) {
      recommendations.push(`🖼️ Optimize images (Score: ${result.imageScore}%) by converting to WebP/AVIF, implementing lazy loading, and adding alt text`);
    }
    
    if (result.seoScore < 80) {
      recommendations.push(`📈 Improve SEO (Score: ${result.seoScore}%) by adding meta descriptions, Open Graph tags, and structured data`);
    }
    
    if (result.loadingStateScore < 50) {
      recommendations.push(`⏳ Add loading states (Score: ${result.loadingStateScore}%) with skeleton loaders and progress indicators`);
    }
    
    if (result.bundleSize && result.bundleSize > 500) {
      recommendations.push(`📦 Reduce bundle size from ${result.bundleSize}KB by implementing code splitting and removing unused dependencies`);
    }
    
    return recommendations;
  }
}

export const realTimeAuditor = new RealTimeAuditor();