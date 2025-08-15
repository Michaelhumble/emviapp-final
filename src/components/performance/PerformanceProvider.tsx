import React, { createContext, useContext, useEffect, useState } from 'react';
import { measurePerformance, PerformanceMetrics, initPerformanceOptimizations } from '@/utils/performanceOptimizer';

interface PerformanceContextType {
  metrics: PerformanceMetrics;
  isOptimized: boolean;
  updateMetrics: () => void;
}

const PerformanceContext = createContext<PerformanceContextType | undefined>(undefined);

export const usePerformance = () => {
  const context = useContext(PerformanceContext);
  if (!context) {
    throw new Error('usePerformance must be used within PerformanceProvider');
  }
  return context;
};

interface PerformanceProviderProps {
  children: React.ReactNode;
}

export const PerformanceProvider: React.FC<PerformanceProviderProps> = ({ children }) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({});
  const [isOptimized, setIsOptimized] = useState(false);

  const updateMetrics = async () => {
    const newMetrics = await measurePerformance();
    setMetrics(newMetrics);
    
    // Check if performance meets targets
    const meetsTargets = 
      (!newMetrics.lcp || newMetrics.lcp < 2500) &&
      (!newMetrics.fcp || newMetrics.fcp < 1800) &&
      (!newMetrics.cls || newMetrics.cls < 0.05) &&
      (!newMetrics.fid || newMetrics.fid < 100);
    
    setIsOptimized(meetsTargets);
    
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Performance Metrics Updated:', {
        ...newMetrics,
        meetsTargets,
        targets: {
          LCP: '< 2.5s',
          FCP: '< 1.8s', 
          CLS: '< 0.05',
          FID: '< 100ms'
        }
      });
    }
  };

  useEffect(() => {
    // Initialize performance optimizations on mount
    initPerformanceOptimizations();
    
    // Measure initial performance
    setTimeout(updateMetrics, 1000);
    
    // Set up periodic monitoring - reduced frequency to prevent scroll jumping
    const interval = setInterval(updateMetrics, 300000); // Every 5 minutes
    
    return () => clearInterval(interval);
  }, []);

  const value = {
    metrics,
    isOptimized,
    updateMetrics
  };

  return (
    <PerformanceContext.Provider value={value}>
      {children}
    </PerformanceContext.Provider>
  );
};