
import { useState, useEffect } from 'react';

/**
 * Hook to detect if the current viewport is a mobile device
 * @param breakpoint - The breakpoint width in pixels (default: 768)
 * @returns boolean indicating if viewport is mobile-sized
 */
export function useIsMobile(breakpoint: number = 768): boolean {
  // Initialize with a server-safe check that doesn't cause reflows
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < breakpoint;
    }
    return false;
  });

  useEffect(() => {
    // Only check on mount and window resize, not during typing
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    
    // Check once on mount
    checkIsMobile();
    
    // Use a passive event listener with debounce for better performance
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      // Skip resize check if input is focused to avoid input loss
      if (document.activeElement?.tagName !== 'TEXTAREA' && 
          document.activeElement?.tagName !== 'INPUT') {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(checkIsMobile, 200);
      }
    };
    
    // Passive listener improves scrolling performance
    window.addEventListener("resize", handleResize, { passive: true });
    
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint]);

  return isMobile;
}
