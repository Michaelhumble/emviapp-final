import { analytics } from '@/lib/analytics';

interface PerformanceMetrics {
  loadTime: number;
  firstPaint: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private observer: PerformanceObserver | null = null;
  private metrics: Partial<PerformanceMetrics> = {};

  public static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  public init(): void {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return;
    }

    // Measure Web Vitals
    this.measureWebVitals();
    
    // Measure page load time
    this.measurePageLoad();
    
    // Report metrics after load
    window.addEventListener('load', () => {
      setTimeout(() => this.reportMetrics(), 2000);
    });
  }

  private measureWebVitals(): void {
    try {
      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        this.metrics.largestContentfulPaint = lastEntry.startTime;
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          this.metrics.firstInputDelay = entry.processingStart - entry.startTime;
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        this.metrics.cumulativeLayoutShift = clsValue;
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

    } catch (error) {
      console.warn('Performance monitoring failed:', error);
    }
  }

  private measurePageLoad(): void {
    try {
      const paintObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.name === 'first-paint') {
            this.metrics.firstPaint = entry.startTime;
          }
          if (entry.name === 'first-contentful-paint') {
            this.metrics.firstContentfulPaint = entry.startTime;
          }
        });
      });
      paintObserver.observe({ entryTypes: ['paint'] });

    } catch (error) {
      console.warn('Paint timing measurement failed:', error);
    }
  }

  private reportMetrics(): void {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    if (navigation) {
      this.metrics.loadTime = navigation.loadEventEnd - navigation.fetchStart;
    }

    // Report to analytics
    Object.entries(this.metrics).forEach(([metric, value]) => {
      if (value !== undefined) {
        analytics.trackPerformance(metric, value, {
          url: window.location.pathname,
          userAgent: navigator.userAgent,
          connectionType: (navigator as any).connection?.effectiveType
        });
      }
    });

    // Log for debugging
    console.log('📊 Performance Metrics:', this.metrics);

    // Flag poor performance
    if (this.metrics.loadTime && this.metrics.loadTime > 3000) {
      console.warn('⚠️ Slow page load detected:', this.metrics.loadTime + 'ms');
    }
    
    if (this.metrics.largestContentfulPaint && this.metrics.largestContentfulPaint > 2500) {
      console.warn('⚠️ Poor LCP detected:', this.metrics.largestContentfulPaint + 'ms');
    }
  }

  public trackCustomMetric(name: string, value: number, context?: Record<string, any>): void {
    analytics.trackPerformance(name, value, context);
  }

  public trackAPICall(endpoint: string, duration: number, status: number): void {
    analytics.trackPerformance('api_call', duration, {
      endpoint,
      status,
      url: window.location.pathname
    });

    if (duration > 1000) {
      console.warn(`⚠️ Slow API call: ${endpoint} took ${duration}ms`);
    }
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance();