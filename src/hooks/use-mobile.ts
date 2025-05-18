
import { useState, useEffect } from 'react';

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window === 'undefined') return;

    // Initialize with current window width
    checkIsMobile();
    
    // Add resize event listener
    function handleResize() {
      checkIsMobile();
    }
    
    function checkIsMobile() {
      // 768px is the standard md breakpoint in Tailwind
      setIsMobile(window.innerWidth < 768);
    }
    
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return isMobile;
}
