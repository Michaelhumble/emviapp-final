import { useEffect, useState } from 'react';
import { measurePerformance, checkPerformanceBudget, type PerformanceMetrics } from '@/utils/performanceOptimizer';

interface PerformanceMonitoringConfig {
  enableRealTimeTracking?: boolean;
  measurementInterval?: number;
  performanceBudget?: {
    lcp?: number;
    fcp?: number;
    cls?: number;
    fid?: number;
  };
}

export const usePerformanceMonitoring = (config: PerformanceMonitoringConfig = {}) => {
  const {
    enableRealTimeTracking = false,
    measurementInterval = 30000, // 30 seconds
    performanceBudget
  } = config;

  const [metrics, setMetrics] = useState<PerformanceMetrics>({});
  const [isOptimized, setIsOptimized] = useState<boolean>(true);
  const [violations, setViolations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Measure initial performance
  useEffect(() => {
    const measureInitialPerformance = async () => {
      try {
        setIsLoading(true);
        const initialMetrics = await measurePerformance();
        setMetrics(initialMetrics);
        
        // Check against performance budget
        const budgetCheck = checkPerformanceBudget(initialMetrics);
        setIsOptimized(budgetCheck.passed);
        setViolations(budgetCheck.violations);
        
        if (process.env.NODE_ENV === 'development') {
          console.log('📊 Initial Performance Metrics:', initialMetrics);
          
          if (!budgetCheck.passed) {
            console.warn('⚠️ Performance Budget Violations:', budgetCheck.violations);
          } else {
            console.log('✅ All performance budgets met!');
          }
        }
      } catch (error) {
        console.error('Failed to measure initial performance:', error);
      } finally {
        setIsLoading(false);
      }
    };

    measureInitialPerformance();
  }, []);

  // Real-time performance tracking
  useEffect(() => {
    if (!enableRealTimeTracking) return;

    const interval = setInterval(async () => {
      try {
        const currentMetrics = await measurePerformance();
        setMetrics(currentMetrics);
        
        const budgetCheck = checkPerformanceBudget(currentMetrics);
        setIsOptimized(budgetCheck.passed);
        setViolations(budgetCheck.violations);
        
        if (process.env.NODE_ENV === 'development') {
          console.log('📊 Performance Update:', currentMetrics);
          
          if (!budgetCheck.passed) {
            console.warn('⚠️ Performance Degradation Detected:', budgetCheck.violations);
          }
        }
      } catch (error) {
        console.error('Failed to update performance metrics:', error);
      }
    }, measurementInterval);

    return () => clearInterval(interval);
  }, [enableRealTimeTracking, measurementInterval]);

  // Monitor performance observer events
  useEffect(() => {
    if (!window.PerformanceObserver) return;

    // Monitor layout shifts in real-time
    const clsObserver = new PerformanceObserver((list) => {
      let clsValue = 0;
      for (const entry of list.getEntries() as any[]) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          
          if (entry.value > 0.05) { // Significant layout shift
            console.warn('⚠️ Significant layout shift detected:', {
              value: entry.value,
              sources: entry.sources?.map((source: any) => ({
                node: source.node,
                previousRect: source.previousRect,
                currentRect: source.currentRect
              }))
            });
          }
        }
      }
      
      if (clsValue > 0) {
        setMetrics(prev => ({ ...prev, cls: (prev.cls || 0) + clsValue }));
      }
    });

    // Monitor long tasks
    const longTaskObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry: any) => {
        if (entry.duration > 50) {
          console.warn('⚠️ Long task detected:', {
            duration: entry.duration,
            startTime: entry.startTime,
            attribution: entry.attribution?.[0]
          });
        }
      });
    });

    try {
      clsObserver.observe({ type: 'layout-shift', buffered: true });
      longTaskObserver.observe({ type: 'longtask', buffered: true });
    } catch (error) {
      console.warn('Performance observers not supported:', error);
    }

    return () => {
      clsObserver.disconnect();
      longTaskObserver.disconnect();
    };
  }, []);

  // Performance grade calculation
  const getPerformanceGrade = (): 'A' | 'B' | 'C' | 'D' | 'F' => {
    if (isLoading) return 'F';
    
    let score = 0;
    let checks = 0;

    if (metrics.lcp !== undefined) {
      score += metrics.lcp <= 2500 ? 100 : metrics.lcp <= 4000 ? 75 : 50;
      checks++;
    }

    if (metrics.fcp !== undefined) {
      score += metrics.fcp <= 1800 ? 100 : metrics.fcp <= 3000 ? 75 : 50;
      checks++;
    }

    if (metrics.cls !== undefined) {
      score += metrics.cls <= 0.1 ? 100 : metrics.cls <= 0.25 ? 75 : 50;
      checks++;
    }

    if (metrics.fid !== undefined) {
      score += metrics.fid <= 100 ? 100 : metrics.fid <= 300 ? 75 : 50;
      checks++;
    }

    if (checks === 0) return 'F';

    const averageScore = score / checks;
    
    if (averageScore >= 90) return 'A';
    if (averageScore >= 80) return 'B';
    if (averageScore >= 70) return 'C';
    if (averageScore >= 60) return 'D';
    return 'F';
  };

  // Get performance insights
  const getInsights = () => {
    const insights: string[] = [];

    if (metrics.lcp && metrics.lcp > 2500) {
      insights.push('Consider optimizing images and reducing server response times');
    }

    if (metrics.fcp && metrics.fcp > 1800) {
      insights.push('Reduce render-blocking resources and optimize critical path');
    }

    if (metrics.cls && metrics.cls > 0.1) {
      insights.push('Add dimensions to images and reserve space for dynamic content');
    }

    if (metrics.fid && metrics.fid > 100) {
      insights.push('Minimize main thread work and break up long tasks');
    }

    return insights;
  };

  return {
    metrics,
    isOptimized,
    violations,
    isLoading,
    grade: getPerformanceGrade(),
    insights: getInsights(),
    refresh: async () => {
      setIsLoading(true);
      try {
        const newMetrics = await measurePerformance();
        setMetrics(newMetrics);
        
        const budgetCheck = checkPerformanceBudget(newMetrics);
        setIsOptimized(budgetCheck.passed);
        setViolations(budgetCheck.violations);
      } finally {
        setIsLoading(false);
      }
    }
  };
};