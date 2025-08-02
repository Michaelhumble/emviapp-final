import { useState, useEffect, useCallback } from 'react';

interface UseExitIntentOptions {
  onExitIntent: () => void;
  enabled?: boolean;
  sensitivity?: number; // pixels from top edge to trigger
  delay?: number; // minimum time on page before triggering (ms)
}

interface UseExitIntentReturn {
  hasTriggered: boolean;
  reset: () => void;
}

export const useExitIntent = ({
  onExitIntent,
  enabled = true,
  sensitivity = 50,
  delay = 3000
}: UseExitIntentOptions): UseExitIntentReturn => {
  const [hasTriggered, setHasTriggered] = useState(false);
  const [isDelayMet, setIsDelayMet] = useState(false);

  // Reset function
  const reset = useCallback(() => {
    setHasTriggered(false);
  }, []);

  // Handle delay
  useEffect(() => {
    if (!enabled) return;

    const timer = setTimeout(() => {
      setIsDelayMet(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [enabled, delay]);

  // Handle mouse movement
  useEffect(() => {
    if (!enabled || hasTriggered || !isDelayMet) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Check if mouse is leaving from the top of the viewport
      if (e.clientY <= sensitivity && e.relatedTarget === null) {
        setHasTriggered(true);
        onExitIntent();
      }
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!hasTriggered) {
        setHasTriggered(true);
        onExitIntent();
      }
    };

    // Add event listeners
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [enabled, hasTriggered, isDelayMet, onExitIntent, sensitivity]);

  return { hasTriggered, reset };
};

// Hook for managing viewport visibility
export const usePageVisibility = () => {
  const [isVisible, setIsVisible] = useState(!document.hidden);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return isVisible;
};

// Hook for detecting return visitors
export const useReturnVisitor = (onReturnVisitor: () => void, delay: number = 5000) => {
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasTriggered) {
        setHasTriggered(true);
        onReturnVisitor();
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [onReturnVisitor, delay, hasTriggered]);

  return { hasTriggered, reset: () => setHasTriggered(false) };
};

// Hook for managing mobile-friendly modals
export const useMobileModal = (isOpen: boolean) => {
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll on mobile when modal is open
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      
      // Add a class for mobile-specific styling
      document.documentElement.classList.add('modal-open');
    } else {
      // Restore normal scrolling
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      
      document.documentElement.classList.remove('modal-open');
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.documentElement.classList.remove('modal-open');
    };
  }, [isOpen]);
};

// Hook for handling keyboard navigation and accessibility
export const useModalAccessibility = (isOpen: boolean, onClose: () => void) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleFocusTrap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const modal = document.querySelector('[role="dialog"]') as HTMLElement;
      if (!modal) return;

      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keydown', handleFocusTrap);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keydown', handleFocusTrap);
    };
  }, [isOpen, onClose]);
};