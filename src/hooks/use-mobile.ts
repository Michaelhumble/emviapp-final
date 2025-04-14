
import { useState, useEffect, useRef } from 'react';

/**
 * Hook to detect if the current viewport is a mobile device with improved stability
 * @param breakpoint - The breakpoint width in pixels (default: 768)
 * @returns boolean indicating if viewport is mobile-sized
 */
export function useIsMobile(breakpoint: number = 768): boolean {
  // Initialize with a conservative default that won't cause layout shifts
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  // Use refs to prevent unnecessary re-renders
  const isMobileRef = useRef<boolean>(false);
  const breakpointRef = useRef<number>(breakpoint);
  
  // Update ref when breakpoint changes (rare)
  useEffect(() => {
    breakpointRef.current = breakpoint;
  }, [breakpoint]);

  useEffect(() => {
    // Function to check mobile state that updates ref first, then state
    const checkIsMobile = () => {
      const newIsMobileState = window.innerWidth < breakpointRef.current;
      
      // Only update if changed to prevent unnecessary re-renders
      if (newIsMobileState !== isMobileRef.current) {
        isMobileRef.current = newIsMobileState;
        // Schedule state update to avoid mid-render state changes
        requestAnimationFrame(() => {
          setIsMobile(newIsMobileState);
        });
      }
    };
    
    // Check once on mount with RAF to avoid layout shifts during initial render
    if (typeof window !== 'undefined') {
      requestAnimationFrame(checkIsMobile);
    }
    
    // Use passive event listeners for performance
    const handleResize = () => {
      // Skip checks when input might be focused
      if (document.activeElement?.tagName !== 'INPUT' && 
          document.activeElement?.tagName !== 'TEXTAREA') {
        checkIsMobile();
      }
    };
    
    // Add resize event with passive flag for better performance
    window.addEventListener("resize", handleResize, { passive: true });
    
    // Clean up event listeners on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array - only run on mount/unmount

  return isMobile;
}
