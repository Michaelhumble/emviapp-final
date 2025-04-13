
import { useState, useEffect } from 'react';

/**
 * Hook to detect if the current viewport is a mobile device
 * @param breakpoint - The breakpoint width in pixels (default: 768)
 * @returns boolean indicating if viewport is mobile-sized
 */
export function useIsMobile(breakpoint: number = 768): boolean {
  // Initialize with a server-safe check that preserves value during input focus
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < breakpoint;
    }
    return false;
  });

  useEffect(() => {
    // Function to check if the viewport is mobile sized
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    
    // Only run initial check once
    checkIsMobile();
    
    // Use a more efficient debounce for resize
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      // Don't check while an input might be focused
      if (document.activeElement?.tagName !== 'TEXTAREA' && 
          document.activeElement?.tagName !== 'INPUT') {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(checkIsMobile, 150); // Slower debounce to avoid interrupting typing
      }
    };
    
    window.addEventListener("resize", handleResize, { passive: true });
    
    // Cleanup
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint]);

  return isMobile;
}
