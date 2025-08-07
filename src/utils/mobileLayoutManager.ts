import { useEffect, useState } from 'react';

// Mobile layout constants for consistent spacing and z-index management
export const MOBILE_LAYOUT = {
  // Z-index layers (ascending order)
  Z_INDEX: {
    BOTTOM_NAV: 40,
    STICKY_CTA: 45,
    FAB_PRIMARY: 50,
    FAB_SECONDARY: 48,
    CHAT_BUTTON: 51, // Slightly higher than other FABs
    MODAL_OVERLAY: 60,
    MOBILE_MENU_BACKDROP: 9998, // Mobile menu backdrop
    MOBILE_MENU_PANEL: 9999, // Mobile menu panel (highest)
    TOAST_NOTIFICATIONS: 70,
    EMERGENCY_ALERTS: 80,
  },
  
  // Safe areas and spacing
  SAFE_AREAS: {
    BOTTOM_NAV_HEIGHT: 64, // 16 * 4 = 64px
    FAB_OFFSET: 80, // Offset from bottom nav
    SIDE_PADDING: 16,
    TOP_SAFE_AREA: 44, // iOS status bar
    BOTTOM_SAFE_AREA: 34, // iOS home indicator
  },
  
  // Touch targets
  TOUCH_TARGETS: {
    MIN_SIZE: 48,
    COMFORTABLE_SIZE: 56,
    SPACING: 8,
  },
  
  // Breakpoints
  BREAKPOINTS: {
    PHONE: 640,
    TABLET: 768,
    MOBILE: 1024,
  }
} as const;

// Hook for detecting keyboard visibility
export function useKeyboardVisible() {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initialViewportHeight = window.visualViewport?.height || window.innerHeight;
    
    const handleViewportChange = () => {
      const currentHeight = window.visualViewport?.height || window.innerHeight;
      const heightDifference = initialViewportHeight - currentHeight;
      
      // Keyboard is likely visible if viewport height decreased by more than 150px
      setIsKeyboardVisible(heightDifference > 150);
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleViewportChange);
      return () => window.visualViewport?.removeEventListener('resize', handleViewportChange);
    } else {
      window.addEventListener('resize', handleViewportChange);
      return () => window.removeEventListener('resize', handleViewportChange);
    }
  }, []);

  return isKeyboardVisible;
}

// Hook for detecting scroll direction
export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | 'idle'>('idle');
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let ticking = false;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      
      if (Math.abs(scrollY - lastScrollY) < 5) {
        ticking = false;
        return;
      }
      
      setScrollDirection(scrollY > lastScrollY ? 'down' : 'up');
      setLastScrollY(scrollY);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastScrollY]);

  return scrollDirection;
}

// Utility for calculating safe FAB positions
export function calculateFABPosition(
  options: {
    position?: 'bottom-right' | 'bottom-center' | 'bottom-left';
    hasBottomNav?: boolean;
    isKeyboardVisible?: boolean;
    additionalOffset?: number;
  } = {}
) {
  const {
    position = 'bottom-right',
    hasBottomNav = true,
    isKeyboardVisible = false,
    additionalOffset = 0
  } = options;

  const baseBottom = hasBottomNav 
    ? MOBILE_LAYOUT.SAFE_AREAS.BOTTOM_NAV_HEIGHT + MOBILE_LAYOUT.SAFE_AREAS.SIDE_PADDING
    : MOBILE_LAYOUT.SAFE_AREAS.BOTTOM_SAFE_AREA + MOBILE_LAYOUT.SAFE_AREAS.SIDE_PADDING;

  const bottom = isKeyboardVisible 
    ? MOBILE_LAYOUT.SAFE_AREAS.SIDE_PADDING 
    : baseBottom + additionalOffset;

  const positions = {
    'bottom-right': {
      bottom: `${bottom}px`,
      right: `${MOBILE_LAYOUT.SAFE_AREAS.SIDE_PADDING}px`,
      left: 'auto',
      transform: 'none'
    },
    'bottom-center': {
      bottom: `${bottom}px`,
      left: '50%',
      right: 'auto',
      transform: 'translateX(-50%)'
    },
    'bottom-left': {
      bottom: `${bottom}px`,
      left: `${MOBILE_LAYOUT.SAFE_AREAS.SIDE_PADDING}px`,
      right: 'auto',
      transform: 'none'
    }
  };

  return positions[position];
}

// Utility for managing multiple overlays
export class MobileOverlayManager {
  private static instance: MobileOverlayManager;
  private activeOverlays = new Set<string>();
  private listeners = new Set<() => void>();

  static getInstance() {
    if (!MobileOverlayManager.instance) {
      MobileOverlayManager.instance = new MobileOverlayManager();
    }
    return MobileOverlayManager.instance;
  }

  register(id: string) {
    this.activeOverlays.add(id);
    this.notifyListeners();
  }

  unregister(id: string) {
    this.activeOverlays.delete(id);
    this.notifyListeners();
  }

  getActiveCount() {
    return this.activeOverlays.size;
  }

  shouldHideOtherOverlays(currentId: string) {
    return this.activeOverlays.size > 1 && !this.activeOverlays.has(currentId);
  }

  addListener(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener());
  }
}