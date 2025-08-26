import React from 'react';

// Performance components - only load in development
import LCPOptimizer from '@/components/performance/LCPOptimizer';
import CLSPrevention from '@/components/performance/CLSPrevention';
import INPOptimizer from '@/components/performance/INPOptimizer'; 
import AdvancedPerformanceMonitor from '@/components/performance/AdvancedPerformanceMonitor';
import CriticalCSS from '@/components/performance/CriticalCSS';
import SEOKeyboardShortcuts from '@/components/performance/SEOKeyboardShortcuts';

/**
 * Development-only performance overlay
 * Only renders when NEXT_PUBLIC_PERF_OVERLAY=true and NODE_ENV !== production
 */
export default function PerfOverlay() {
  // This component is only rendered when explicitly enabled in dev
  // Environment guards are handled by the parent component

  return (
    <>
      {/* Core Web Vitals Optimization - Dev Only */}
      <CriticalCSS />
      <LCPOptimizer criticalImages={['/hero-image.jpg']} />
      <CLSPrevention />
      <INPOptimizer />
      <AdvancedPerformanceMonitor />
      <SEOKeyboardShortcuts />
    </>
  );
}