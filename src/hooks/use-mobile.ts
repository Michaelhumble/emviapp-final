
import { useState, useEffect } from 'react';

/**
 * Hook to detect if the current viewport is a mobile device
 * @param breakpoint - The breakpoint width in pixels (default: 768)
 * @returns boolean indicating if viewport is mobile-sized
 */
export function useIsMobile(breakpoint: number = 768): boolean {
  // Initialize with a server-safe check
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
    
    // Initial check
    checkIsMobile();
    
    // Add event listener for window resize with debounce
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(checkIsMobile, 100);
    };
    
    window.addEventListener("resize", handleResize);
    
    // Cleanup
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint]);

  return isMobile;
}
