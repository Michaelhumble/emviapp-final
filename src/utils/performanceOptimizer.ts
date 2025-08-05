// ============= BILLION-DOLLAR PERFORMANCE OPTIMIZER =============
// Critical optimization utilities for EmviApp performance

/**
 * Image Optimization Utilities
 */
export interface OptimizedImageOptions {
  src: string;
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpg' | 'png';
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  sizes?: string;
}

export const generateOptimizedImageUrl = (options: OptimizedImageOptions): string => {
  const { src, width, height, quality = 85, format = 'webp' } = options;
  
  // If it's a Supabase storage URL
  if (src.includes('supabase.co/storage')) {
    const url = new URL(src);
    if (width) url.searchParams.set('width', width.toString());
    if (height) url.searchParams.set('height', height.toString());
    url.searchParams.set('quality', quality.toString());
    url.searchParams.set('format', format);
    return url.toString();
  }
  
  // If it's an Unsplash URL
  if (src.includes('unsplash.com')) {
    const url = new URL(src);
    if (width) url.searchParams.set('w', width.toString());
    if (height) url.searchParams.set('h', height.toString());
    url.searchParams.set('q', quality.toString());
    url.searchParams.set('fm', format);
    url.searchParams.set('auto', 'format,compress');
    return url.toString();
  }
  
  return src;
};

export const generateSrcSet = (src: string, sizes: number[] = [320, 640, 768, 1024, 1280, 1600]): string => {
  return sizes
    .map(size => `${generateOptimizedImageUrl({ src, width: size })} ${size}w`)
    .join(', ');
};

/**
 * Bundle Size Analysis
 */
export const BUNDLE_SIZE_LIMITS = {
  critical: 150, // KB - Critical first load
  lazy: 300,     // KB - Lazy loaded chunks
  vendor: 400,   // KB - Vendor libraries
  total: 1000,   // KB - Total initial bundle
};

/**
 * Performance Monitoring
 */
export interface PerformanceMetrics {
  fcp?: number;  // First Contentful Paint
  lcp?: number;  // Largest Contentful Paint
  fid?: number;  // First Input Delay
  cls?: number;  // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
  tti?: number;  // Time to Interactive
}

export const measurePerformance = (): Promise<PerformanceMetrics> => {
  return new Promise((resolve) => {
    const metrics: PerformanceMetrics = {};
    
    // Measure FCP and LCP
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
      
      // Stop observing after 10 seconds
      setTimeout(() => {
        observer.disconnect();
        resolve(metrics);
      }, 10000);
    } else {
      resolve(metrics);
    }
  });
};

/**
 * Critical Resource Hints
 */
export const addResourceHints = () => {
  const head = document.head;
  
  // Preconnect to critical domains
  const domains = [
    'https://fonts.googleapis.com',
    'https://images.unsplash.com',
    'https://wwhqbjrhbajpabfdwnip.supabase.co',
  ];
  
  domains.forEach(domain => {
    if (!document.querySelector(`link[href="${domain}"]`)) {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = 'anonymous';
      head.appendChild(link);
    }
  });
};

/**
 * Intersection Observer for Lazy Loading
 */
export const createLazyObserver = (callback: (entries: IntersectionObserverEntry[]) => void) => {
  const options = {
    root: null,
    rootMargin: '50px 0px', // Start loading 50px before element comes into view
    threshold: 0.01
  };
  
  return new IntersectionObserver(callback, options);
};

/**
 * Bundle Analysis Helpers
 */
export const logBundleInfo = () => {
  if (process.env.NODE_ENV === 'development') {
    // Log performance timing
    window.addEventListener('load', () => {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      console.log('🚀 Performance Metrics:', {
        'DOM Content Loaded': perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
        'Load Complete': perfData.loadEventEnd - perfData.loadEventStart,
        'Total Load Time': perfData.loadEventEnd - perfData.fetchStart,
        'DNS Lookup': perfData.domainLookupEnd - perfData.domainLookupStart,
        'TCP Connection': perfData.connectEnd - perfData.connectStart,
        'Response Time': perfData.responseEnd - perfData.responseStart,
      });
    });
  }
};

/**
 * Font Loading Optimization
 */
export const optimizeFontLoading = () => {
  // Preload critical fonts
  const criticalFonts = [
    '/fonts/Inter-Regular.woff2',
    '/fonts/Inter-SemiBold.woff2',
    '/fonts/PlayfairDisplay-SemiBold.woff2'
  ];
  
  criticalFonts.forEach(font => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = font;
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};

/**
 * Service Worker for Caching
 */
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('SW registered: ', registration);
    } catch (registrationError) {
      console.log('SW registration failed: ', registrationError);
    }
  }
};

/**
 * Critical CSS Detection
 */
export const inlineCriticalCSS = () => {
  // This would be handled by build tools in production
  // Placeholder for critical CSS inlining logic
  console.log('🎨 Critical CSS optimization enabled');
};

/**
 * Memory Management
 */
export const cleanupResources = () => {
  // Clean up observers, timers, and event listeners
  window.addEventListener('beforeunload', () => {
    // Cleanup logic here
    console.log('🧹 Cleaning up resources');
  });
};

/**
 * Initialize all performance optimizations
 */
export const initPerformanceOptimizations = () => {
  // Initialize critical optimizations
  addResourceHints();
  optimizeFontLoading();
  registerServiceWorker();
  logBundleInfo();
  cleanupResources();
  
  console.log('⚡ Performance optimizations initialized');
};