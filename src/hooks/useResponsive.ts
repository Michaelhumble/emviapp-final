import { useState, useEffect } from 'react';

interface ResponsiveState {
  isMobile: boolean;
  isTablet: boolean;
  isPhone: boolean;
  isDesktop: boolean;
}

const BREAKPOINTS = {
  phone: 640,
  tablet: 768,
  mobile: 1024
} as const;

export function useResponsive(): ResponsiveState {
  const [state, setState] = useState<ResponsiveState>({
    isMobile: false,
    isTablet: false,
    isPhone: false,
    isDesktop: true
  });

  useEffect(() => {
    // SSR-safe: Only run on client
    if (typeof window === 'undefined') return;

    const updateState = () => {
      const width = window.innerWidth;
      setState({
        isPhone: width < BREAKPOINTS.phone,
        isTablet: width < BREAKPOINTS.tablet,
        isMobile: width < BREAKPOINTS.mobile,
        isDesktop: width >= BREAKPOINTS.mobile
      });
    };

    // Initial state
    updateState();

    // Use matchMedia for better performance
    const phoneQuery = window.matchMedia(`(max-width: ${BREAKPOINTS.phone - 1}px)`);
    const tabletQuery = window.matchMedia(`(max-width: ${BREAKPOINTS.tablet - 1}px)`);
    const mobileQuery = window.matchMedia(`(max-width: ${BREAKPOINTS.mobile - 1}px)`);

    const handleChange = () => updateState();

    phoneQuery.addEventListener('change', handleChange);
    tabletQuery.addEventListener('change', handleChange);
    mobileQuery.addEventListener('change', handleChange);

    return () => {
      phoneQuery.removeEventListener('change', handleChange);
      tabletQuery.removeEventListener('change', handleChange);
      mobileQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return state;
}

// Individual hooks for backward compatibility
export function useIsMobile(): boolean {
  const { isMobile } = useResponsive();
  return isMobile;
}

export function useIsTablet(): boolean {
  const { isTablet } = useResponsive();
  return isTablet;
}

export function useIsPhone(): boolean {
  const { isPhone } = useResponsive();
  return isPhone;
}