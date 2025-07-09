
import { useState, useEffect } from 'react';

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window === 'undefined') return;
    
    // Initial check - Desktop is 1024px+, Mobile/Tablet is below that
    setIsMobile(window.innerWidth < 1024);
    
    // Create the media query list for desktop breakpoint
    const mediaQuery = window.matchMedia('(max-width: 1023px)');
    
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
