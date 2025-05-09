
import { useState, useEffect } from 'react';

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window === 'undefined') return;
    
    // Initial check
    setIsMobile(window.innerWidth < 768);
    
    // Create the media query list
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    
    // Define the handler
    const handleResize = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };
    
    // Add the listener
    mediaQuery.addEventListener('change', handleResize);
    
    // Clean up
    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, []);
  
  return isMobile;
}
