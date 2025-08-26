import React, { useEffect, useState } from 'react';

interface PerformanceMetrics {
  lcp: number | null;
  cls: number | null;
  inp: number | null;
  fcp: number | null;
  ttfb: number | null;
  fid: number | null;
}

interface PerformanceGrades {
  lcp: 'good' | 'needs-improvement' | 'poor';
  cls: 'good' | 'needs-improvement' | 'poor';
  inp: 'good' | 'needs-improvement' | 'poor';
  overall: 'excellent' | 'good' | 'fair' | 'poor';
}

export default function AdvancedPerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    lcp: null, cls: null, inp: null, fcp: null, ttfb: null, fid: null
  });
  
  const [grades, setGrades] = useState<PerformanceGrades>({
    lcp: 'good', cls: 'good', inp: 'good', overall: 'excellent'
  });

  const [alerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
    let clsValue = 0;
    let inpValue = 0;
    let fidValue = 0;

    // Enhanced CLS monitoring
    const observeCLS = () => {
      if ('PerformanceObserver' in window) {
        try {
          new PerformanceObserver((list) => {
            for (const entry of list.getEntries() as any[]) {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
                
                // Real-time CLS alerts
                if (entry.value > 0.05) {
                  setAlerts(prev => [...prev, `⚠️ Large layout shift: ${entry.value.toFixed(3)}`]);
                }
              }
            }
            
            setMetrics(prev => ({ ...prev, cls: clsValue }));
          }).observe({ type: 'layout-shift', buffered: true });
        } catch (e) {
          console.debug('CLS monitoring unavailable');
        }
      }
    };

    // Enhanced LCP monitoring
    const observeLCP = () => {
      if ('PerformanceObserver' in window) {
        try {
          new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1] as any;
            
            setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
            
            // LCP alerts
            if (lastEntry.startTime > 4000) {
              setAlerts(prev => [...prev, `🐌 Slow LCP detected: ${Math.round(lastEntry.startTime)}ms`]);
            }
          }).observe({ type: 'largest-contentful-paint', buffered: true });
        } catch (e) {
          console.debug('LCP monitoring unavailable');
        }
      }
    };

    // Enhanced INP monitoring
    const observeINP = () => {
      if ('PerformanceObserver' in window) {
        try {
          new PerformanceObserver((list) => {
            for (const entry of list.getEntries() as any[]) {
              const delay = entry.processingStart - entry.startTime;
              inpValue = Math.max(inpValue, delay);
              
              // INP alerts
              if (delay > 500) {
                setAlerts(prev => [...prev, `🔄 Slow interaction: ${Math.round(delay)}ms`]);
              }
            }
            
            setMetrics(prev => ({ ...prev, inp: inpValue }));
          }).observe({ type: 'event', buffered: true });
        } catch (e) {
          console.debug('INP monitoring unavailable');
        }
      }
    };

    // FID monitoring
    const observeFID = () => {
      if ('PerformanceObserver' in window) {
        try {
          new PerformanceObserver((list) => {
            for (const entry of list.getEntries() as any[]) {
              fidValue = entry.processingStart - entry.startTime;
              setMetrics(prev => ({ ...prev, fid: fidValue }));
              
              if (fidValue > 300) {
                setAlerts(prev => [...prev, `⏱️ High FID: ${Math.round(fidValue)}ms`]);
              }
            }
          }).observe({ type: 'first-input', buffered: true });
        } catch (e) {
          console.debug('FID monitoring unavailable');
        }
      }
    };

    // FCP and TTFB
    const measureBasicMetrics = () => {
      // FCP
      if ('PerformanceObserver' in window) {
        try {
          new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (entry.name === 'first-contentful-paint') {
                setMetrics(prev => ({ ...prev, fcp: entry.startTime }));
              }
            }
          }).observe({ type: 'paint', buffered: true });
        } catch (e) {
          console.debug('FCP monitoring unavailable');
        }
      }

      // TTFB
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigationEntry) {
        const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
        setMetrics(prev => ({ ...prev, ttfb }));
      }
    };

    // Grade calculator
    const calculateGrades = () => {
      const interval = setInterval(() => {
        const newGrades: PerformanceGrades = {
          lcp: metrics.lcp === null ? 'good' : 
               metrics.lcp <= 2500 ? 'good' : 
               metrics.lcp <= 4000 ? 'needs-improvement' : 'poor',
          
          cls: metrics.cls === null ? 'good' : 
               metrics.cls <= 0.1 ? 'good' : 
               metrics.cls <= 0.25 ? 'needs-improvement' : 'poor',
          
          inp: metrics.inp === null ? 'good' : 
               metrics.inp <= 200 ? 'good' : 
               metrics.inp <= 500 ? 'needs-improvement' : 'poor',
          
          overall: 'excellent' // Will be calculated below
        };

        // Calculate overall grade
        const grades_array = [newGrades.lcp, newGrades.cls, newGrades.inp];
        const goodCount = grades_array.filter(g => g === 'good').length;
        const poorCount = grades_array.filter(g => g === 'poor').length;

        if (goodCount === 3) newGrades.overall = 'excellent';
        else if (goodCount >= 2 && poorCount === 0) newGrades.overall = 'good';
        else if (poorCount === 0) newGrades.overall = 'fair';
        else newGrades.overall = 'poor';

        setGrades(newGrades);
      }, 1000);

      return () => clearInterval(interval);
    };

    // Resource timing analysis
    const analyzeResources = () => {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      
      const slowResources = resources.filter(resource => {
        const duration = resource.responseEnd - resource.requestStart;
        return duration > 1000; // Slower than 1 second
      });

      if (slowResources.length > 0) {
        setAlerts(prev => [...prev, `📦 ${slowResources.length} slow resources detected`]);
      }

      // Large resources
      const largeResources = resources.filter(resource => {
        return resource.transferSize > 500000; // Larger than 500KB
      });

      if (largeResources.length > 0) {
        setAlerts(prev => [...prev, `💾 ${largeResources.length} large resources detected`]);
      }
    };

    // Performance budget monitoring
    const monitorBudgets = () => {
      const budgets = {
        totalJSSize: 500000, // 500KB
        totalCSSSize: 100000, // 100KB
        totalImageSize: 2000000, // 2MB
        requestCount: 50
      };

      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      
      let jsSize = 0;
      let cssSize = 0;
      let imageSize = 0;

      resources.forEach(resource => {
        if (resource.name.includes('.js')) jsSize += resource.transferSize || 0;
        if (resource.name.includes('.css')) cssSize += resource.transferSize || 0;
        if (resource.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) imageSize += resource.transferSize || 0;
      });

      if (jsSize > budgets.totalJSSize) {
        setAlerts(prev => [...prev, `📜 JS bundle too large: ${Math.round(jsSize/1000)}KB`]);
      }
      
      if (imageSize > budgets.totalImageSize) {
        setAlerts(prev => [...prev, `🖼️ Images too large: ${Math.round(imageSize/1000)}KB`]);
      }
      
      if (resources.length > budgets.requestCount) {
        setAlerts(prev => [...prev, `🌐 Too many requests: ${resources.length}`]);
      }
    };

    // Initialize all monitoring
    observeCLS();
    observeLCP();
    observeINP();
    observeFID();
    measureBasicMetrics();
    analyzeResources();
    monitorBudgets();
    
    const cleanupGrades = calculateGrades();

    // Send metrics to analytics (if configured)
    const sendAnalytics = () => {
      if (typeof window !== 'undefined' && 'gtag' in window && metrics.lcp !== null) {
        (window as any).gtag('event', 'core_web_vitals', {
          event_category: 'Performance',
          lcp: Math.round(metrics.lcp),
          cls: Math.round((metrics.cls || 0) * 1000) / 1000,
          inp: Math.round(metrics.inp || 0),
          grade: grades.overall
        });
      }
    };

    // Send analytics after 5 seconds
    const analyticsTimer = setTimeout(sendAnalytics, 5000);

    return () => {
      cleanupGrades();
      clearTimeout(analyticsTimer);
    };
  }, []);

  // Auto-clear alerts after 10 seconds
  useEffect(() => {
    if (alerts.length > 0) {
      const timer = setTimeout(() => {
        setAlerts(prev => prev.slice(1));
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, [alerts]);

  // Log performance metrics for debugging
  useEffect(() => {
    if (metrics.lcp !== null || metrics.cls !== null || metrics.inp !== null) {
      console.log('📊 Performance Metrics Updated:', {
        lcp: metrics.lcp ? `${Math.round(metrics.lcp)}ms` : null,
        cls: metrics.cls ? metrics.cls.toFixed(3) : null,
        inp: metrics.inp ? `${Math.round(metrics.inp)}ms` : null,
        fcp: metrics.fcp ? `${Math.round(metrics.fcp)}ms` : null,
        ttfb: metrics.ttfb ? `${Math.round(metrics.ttfb)}ms` : null,
        grade: grades.overall,
        meetsTargets: grades.lcp === 'good' && grades.cls === 'good' && grades.inp === 'good',
        targets: {
          LCP: '< 2.5s',
          FCP: '< 1.8s', 
          CLS: '< 0.05',
          INP: '< 200ms'
        }
      });
    }
  }, [metrics, grades]);

  // Development mode display
  if (process.env.NODE_ENV === 'development') {
    return (
      <>
        {/* Performance metrics display */}
        <div className="fixed top-4 right-4 bg-black/90 text-white p-4 rounded-lg text-xs font-mono z-50 max-w-xs">
          <div className="font-bold mb-2 text-green-400">⚡ Core Web Vitals</div>
          
          <div className="space-y-1">
            <div className={`flex justify-between ${grades.lcp === 'good' ? 'text-green-400' : grades.lcp === 'needs-improvement' ? 'text-yellow-400' : 'text-red-400'}`}>
              <span>LCP:</span>
              <span>{metrics.lcp ? `${Math.round(metrics.lcp)}ms` : '...'}</span>
            </div>
            
            <div className={`flex justify-between ${grades.cls === 'good' ? 'text-green-400' : grades.cls === 'needs-improvement' ? 'text-yellow-400' : 'text-red-400'}`}>
              <span>CLS:</span>
              <span>{metrics.cls ? metrics.cls.toFixed(3) : '...'}</span>
            </div>
            
            <div className={`flex justify-between ${grades.inp === 'good' ? 'text-green-400' : grades.inp === 'needs-improvement' ? 'text-yellow-400' : 'text-red-400'}`}>
              <span>INP:</span>
              <span>{metrics.inp ? `${Math.round(metrics.inp)}ms` : '...'}</span>
            </div>
            
            {metrics.fcp && (
              <div className="flex justify-between text-blue-400">
                <span>FCP:</span>
                <span>{Math.round(metrics.fcp)}ms</span>
              </div>
            )}
            
            {metrics.ttfb && (
              <div className="flex justify-between text-purple-400">
                <span>TTFB:</span>
                <span>{Math.round(metrics.ttfb)}ms</span>
              </div>
            )}
          </div>
          
          <div className="mt-2 pt-2 border-t border-gray-600">
            <div className={`text-xs font-bold ${
              grades.overall === 'excellent' ? 'text-green-400' :
              grades.overall === 'good' ? 'text-blue-400' :
              grades.overall === 'fair' ? 'text-yellow-400' : 'text-red-400'
            }`}>
              Grade: {grades.overall.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Performance alerts */}
        {alerts.length > 0 && (
          <div className="fixed top-4 left-4 space-y-2 z-50">
            {alerts.slice(0, 3).map((alert, index) => (
              <div key={index} className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm max-w-md">
                {alert}
              </div>
            ))}
          </div>
        )}
      </>
    );
  }

  return null;
}