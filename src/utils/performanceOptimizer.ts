// Advanced performance optimization utilities for Core Web Vitals
export interface PerformanceMetrics {
  lcp?: number;
  fcp?: number;
  cls?: number;
  fid?: number;
  ttfb?: number;
  tti?: number;
}

// Measure comprehensive performance metrics
export const measurePerformance = (): Promise<PerformanceMetrics> => {
  return new Promise((resolve) => {
    const metrics: PerformanceMetrics = {};

    if ('PerformanceObserver' in window) {
      // Measure LCP (Largest Contentful Paint)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        metrics.lcp = lastEntry.startTime;
      });

      try {
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      } catch (e) {
        // LCP not supported
      }

      // Measure FCP (First Contentful Paint)
      const fcpObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            metrics.fcp = entry.startTime;
          }
        });
      });

      try {
        fcpObserver.observe({ type: 'paint', buffered: true });
      } catch (e) {
        // FCP not supported
      }

      // Measure CLS (Cumulative Layout Shift)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as any[]) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        metrics.cls = clsValue;
      });

      try {
        clsObserver.observe({ type: 'layout-shift', buffered: true });
      } catch (e) {
        // CLS not supported
      }

      // Measure FID (First Input Delay)
      const fidObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          metrics.fid = entry.processingStart - entry.startTime;
        });
      });

      try {
        fidObserver.observe({ type: 'first-input', buffered: true });
      } catch (e) {
        // FID not supported
      }
    }

    // Measure TTFB and TTI from Navigation Timing
    setTimeout(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as any;
      if (navigation) {
        metrics.ttfb = navigation.responseStart - navigation.requestStart;
        metrics.tti = navigation.domContentLoadedEventEnd - navigation.fetchStart;
      }
      resolve(metrics);
    }, 3000);
  });
};

// Advanced image optimization with multiple formats
export const generateSrcSet = (src: string, sizes: number[] = [320, 640, 768, 1024, 1280, 1600]): string => {
  if (src.includes('unsplash.com')) {
    return sizes.map(size => `${src}&w=${size}&q=80&auto=format ${size}w`).join(', ');
  }
  
  if (src.includes('supabase.co')) {
    return sizes.map(size => `${src}?width=${size}&quality=80 ${size}w`).join(', ');
  }

  return src;
};

// Generate optimized image URL with advanced settings
export const generateOptimizedImageUrl = (config: {
  src: string;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg';
  width?: number;
  height?: number;
  priority?: boolean;
}): string => {
  const { src, quality = 85, format = 'webp', width, height } = config;
  
  if (src.includes('unsplash.com')) {
    const url = new URL(src);
    url.searchParams.set('q', quality.toString());
    url.searchParams.set('fm', format);
    url.searchParams.set('auto', 'format,compress');
    if (width) url.searchParams.set('w', width.toString());
    if (height) url.searchParams.set('h', height.toString());
    return url.toString();
  }

  if (src.includes('supabase.co')) {
    const url = new URL(src);
    url.searchParams.set('quality', quality.toString());
    url.searchParams.set('format', format);
    if (width) url.searchParams.set('width', width.toString());
    if (height) url.searchParams.set('height', height.toString());
    return url.toString();
  }

  return src;
};

// Enhanced lazy loading observer with performance monitoring
export const createLazyObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
): IntersectionObserver => {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px 0px',
    threshold: 0.01,
    ...options
  };

  const enhancedCallback: IntersectionObserverCallback = (entries, observer) => {
    const startTime = performance.now();
    callback(entries, observer);
    const duration = performance.now() - startTime;
    
    if (process.env.NODE_ENV === 'development' && duration > 16) {
      console.warn(`⚠️ Slow intersection observer callback: ${duration}ms`);
    }
  };

  return new IntersectionObserver(enhancedCallback, defaultOptions);
};

// Preload critical resources strategically
export const preloadCriticalResources = (resources: Array<{
  href: string;
  as: 'image' | 'font' | 'style' | 'script';
  type?: string;
  crossorigin?: boolean;
}>): void => {
  resources.forEach(({ href, as, type, crossorigin }) => {
    const existingLink = document.querySelector(`link[href="${href}"]`);
    if (!existingLink) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = as;
      if (type) link.type = type;
      if (crossorigin) link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    }
  });
};

// Initialize comprehensive performance optimizations
export const initPerformanceOptimizations = (): void => {
  // Add critical resource hints
  addResourceHints();
  
  // Preload critical images
  const criticalImages = document.querySelectorAll('img[loading="eager"], img[fetchpriority="high"]');
  criticalImages.forEach((img: any) => {
    if (img.src && !img.complete) {
      preloadCriticalResources([{
        href: img.src,
        as: 'image'
      }]);
    }
  });

  // Enhanced lazy image loading
  setupAdvancedLazyLoading();

  // Monitor long tasks
  monitorLongTasks();

  // Setup performance tracking
  trackResourceTiming();

  if (process.env.NODE_ENV === 'development') {
    // Bundle analysis in development
    analyzeBundle();
  }
};

// Advanced lazy loading setup
const setupAdvancedLazyLoading = (): void => {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  if (lazyImages.length > 0 && 'IntersectionObserver' in window) {
    const imageObserver = createLazyObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          
          // Performance timing for image load
          const startTime = performance.now();
          
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            
            img.onload = () => {
              const loadTime = performance.now() - startTime;
              if (process.env.NODE_ENV === 'development') {
                console.log(`📸 Lazy image loaded: ${img.alt || 'Unknown'} in ${loadTime}ms`);
              }
              
              // Track slow loading images
              if (loadTime > 2000) {
                console.warn(`⚠️ Slow image load: ${img.src} (${loadTime}ms)`);
              }
            };
            
            imageObserver.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.1
    });

    lazyImages.forEach((img) => imageObserver.observe(img));
  }
};

// Monitor long tasks that can affect performance
const monitorLongTasks = (): void => {
  if ('PerformanceObserver' in window) {
    const longTaskObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry: any) => {
        if (entry.duration > 50) { // Tasks longer than 50ms
          console.warn(`⚠️ Long task detected: ${entry.duration}ms`);
          
          // Log attribution if available
          if (entry.attribution && entry.attribution.length > 0) {
            console.warn('Task attribution:', entry.attribution[0]);
          }
        }
      });
    });

    try {
      longTaskObserver.observe({ type: 'longtask', buffered: true });
    } catch (e) {
      // Long tasks not supported
    }
  }
};

// Track resource timing for performance insights
const trackResourceTiming = (): void => {
  if ('PerformanceObserver' in window) {
    const resourceObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.duration > 1000) { // Resources taking longer than 1s
          console.warn(`⚠️ Slow resource: ${entry.name} (${entry.duration}ms)`);
        }
        
        // Track specific resource types
        if (entry.name.includes('.js') || entry.name.includes('.css')) {
          if (process.env.NODE_ENV === 'development') {
            console.log(`📦 ${entry.name.split('/').pop()}: ${entry.duration}ms`);
          }
        }
      });
    });

    try {
      resourceObserver.observe({ type: 'resource', buffered: true });
    } catch (e) {
      // Resource timing not supported
    }
  }
};

// Bundle analysis and optimization suggestions
export const analyzeBundle = (): void => {
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Starting bundle analysis...');
    
    // Track JavaScript bundle sizes
    const scripts = Array.from(document.scripts);
    scripts.forEach((script) => {
      if (script.src && script.src.includes('.js')) {
        console.log(`🔍 Script: ${script.src.split('/').pop()}`);
      }
    });

    // Track CSS bundle sizes
    const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
    stylesheets.forEach((link: any) => {
      console.log(`🎨 Stylesheet: ${link.href.split('/').pop()}`);
    });

    // Analyze critical path
    setTimeout(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as any;
      if (navigation) {
        console.log('📈 Critical Path Analysis:', {
          'DNS Lookup': `${navigation.domainLookupEnd - navigation.domainLookupStart}ms`,
          'TCP Connection': `${navigation.connectEnd - navigation.connectStart}ms`,
          'Request': `${navigation.responseStart - navigation.requestStart}ms`,
          'Response': `${navigation.responseEnd - navigation.responseStart}ms`,
          'DOM Processing': `${navigation.domContentLoadedEventEnd - navigation.responseEnd}ms`,
          'Resource Loading': `${navigation.loadEventEnd - navigation.domContentLoadedEventEnd}ms`
        });
      }
    }, 2000);
  }
};

// Critical resource hints for performance
const addResourceHints = (): void => {
  const hints = [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com', crossorigin: true },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
    { rel: 'preconnect', href: 'https://images.unsplash.com' },
    { rel: 'dns-prefetch', href: 'https://www.googletagmanager.com' },
    { rel: 'dns-prefetch', href: 'https://js-na2.hs-scripts.com' },
    { rel: 'preconnect', href: 'https://cdn.gpteng.co' }
  ];

  hints.forEach((hint) => {
    const existingLink = document.querySelector(`link[href="${hint.href}"]`);
    if (!existingLink) {
      const link = document.createElement('link');
      link.rel = hint.rel;
      link.href = hint.href;
      if (hint.crossorigin) {
        link.crossOrigin = 'anonymous';
      }
      document.head.appendChild(link);
    }
  });
};

// Performance budget monitoring
export const checkPerformanceBudget = (metrics: PerformanceMetrics): {
  passed: boolean;
  violations: string[];
} => {
  const violations: string[] = [];
  
  // Performance budgets (Core Web Vitals thresholds)
  const budgets = {
    lcp: 2500, // 2.5 seconds
    fcp: 1800, // 1.8 seconds  
    cls: 0.1,  // 0.1
    fid: 100,  // 100ms
    ttfb: 800  // 800ms
  };

  if (metrics.lcp && metrics.lcp > budgets.lcp) {
    violations.push(`LCP: ${metrics.lcp}ms (budget: ${budgets.lcp}ms)`);
  }
  
  if (metrics.fcp && metrics.fcp > budgets.fcp) {
    violations.push(`FCP: ${metrics.fcp}ms (budget: ${budgets.fcp}ms)`);
  }
  
  if (metrics.cls && metrics.cls > budgets.cls) {
    violations.push(`CLS: ${metrics.cls} (budget: ${budgets.cls})`);
  }
  
  if (metrics.fid && metrics.fid > budgets.fid) {
    violations.push(`FID: ${metrics.fid}ms (budget: ${budgets.fid}ms)`);
  }
  
  if (metrics.ttfb && metrics.ttfb > budgets.ttfb) {
    violations.push(`TTFB: ${metrics.ttfb}ms (budget: ${budgets.ttfb}ms)`);
  }

  return {
    passed: violations.length === 0,
    violations
  };
};

// Image compression for uploads
export const compressImage = (file: File, maxWidth = 1920, quality = 0.8): Promise<File> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Calculate dimensions
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;
      
      // Draw and compress
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: 'image/webp',
              lastModified: Date.now()
            });
            resolve(compressedFile);
          } else {
            resolve(file);
          }
        },
        'image/webp',
        quality
      );
    };
    
    img.src = URL.createObjectURL(file);
  });
};