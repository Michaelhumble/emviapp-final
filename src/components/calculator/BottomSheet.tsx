import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({ isOpen, onClose, children }) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);

  // Focus trap and keyboard handling
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleTabTrap = (e: KeyboardEvent) => {
      if (e.key === 'Tab' && sheetRef.current) {
        const focusableElements = sheetRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleTabTrap);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Auto-focus first element
    setTimeout(() => firstFocusableRef.current?.focus(), 100);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTabTrap);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Sheet */}
      <div 
        ref={sheetRef}
        className="fixed inset-x-0 bottom-0 z-[70] bg-background rounded-t-3xl shadow-2xl animate-slide-in-bottom"
        style={{ 
          height: '90vh',
          maxHeight: '90vh'
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheet-title"
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1.5 bg-muted-foreground/30 rounded-full" />
        </div>

        {/* Close button */}
        <Button
          ref={firstFocusableRef}
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-10"
          onClick={onClose}
          aria-label="Close valuation results"
        >
          <X className="w-5 h-5" />
        </Button>

        {/* Scrollable content */}
        <div className="h-full overflow-y-auto overscroll-contain pb-6 px-4">
          {children}
        </div>
      </div>
    </>
  );
};

// Animation styles in index.css
export const bottomSheetAnimationStyles = `
@keyframes slide-in-bottom {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.animate-slide-in-bottom {
  animation: slide-in-bottom 0.3s cubic-bezier(0.32, 0.72, 0, 1);
}
`;
