import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SEOKeyboardShortcuts() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Only in development mode
      if (process.env.NODE_ENV !== 'development') return;
      
      // Ctrl/Cmd + Shift + P = Performance Dashboard
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'P') {
        event.preventDefault();
        navigate('/performance');
        console.log('🎯 Navigated to Performance Dashboard');
      }
      
      // Ctrl/Cmd + Shift + S = SEO Analysis (placeholder)
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'S') {
        event.preventDefault();
        console.log('🔍 SEO Analysis - Feature coming soon!');
        // Could navigate to SEO dashboard when built
      }
      
      // Ctrl/Cmd + Shift + M = Metrics Log
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'M') {
        event.preventDefault();
        console.log('📊 Current Performance Metrics:', {
          location: window.location.pathname,
          timestamp: new Date().toISOString(),
          viewport: `${window.innerWidth}x${window.innerHeight}`,
          connection: (navigator as any).connection?.effectiveType || 'unknown'
        });
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    
    // Log available shortcuts in development
    if (process.env.NODE_ENV === 'development') {
      console.log('⌨️ SEO Dev Shortcuts Available:');
      console.log('  Ctrl/Cmd + Shift + P: Performance Dashboard');
      console.log('  Ctrl/Cmd + Shift + S: SEO Analysis');
      console.log('  Ctrl/Cmd + Shift + M: Log Current Metrics');
    }

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [navigate]);

  return null; // No visual component, just keyboard listener
}