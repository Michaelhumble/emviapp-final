import React from 'react';

// Screen reader only text component
export const ScreenReaderOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="sr-only absolute left-[-10000px] top-auto w-[1px] h-[1px] overflow-hidden">
    {children}
  </span>
);

// Skip to content link
export const SkipToContent: React.FC = () => (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50 focus:z-50"
  >
    Skip to main content
  </a>
);

// Focus management hook
export const useFocusManagement = () => {
  const focusElement = (selector: string) => {
    const element = document.querySelector(selector) as HTMLElement;
    if (element) {
      element.focus();
    }
  };

  const trapFocus = (container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0] as HTMLElement;
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          lastFocusable?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          firstFocusable?.focus();
          e.preventDefault();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    firstFocusable?.focus();

    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  };

  return { focusElement, trapFocus };
};

// ARIA announcer for dynamic content
export const AriaLiveRegion: React.FC<{ 
  message: string; 
  priority?: 'polite' | 'assertive' 
}> = ({ message, priority = 'polite' }) => (
  <div
    role="status"
    aria-live={priority}
    aria-atomic="true"
    className="sr-only"
  >
    {message}
  </div>
);

// Accessible button with proper ARIA attributes
export const AccessibleButton: React.FC<{
  children: React.ReactNode;
  onClick: () => void;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  disabled?: boolean;
  className?: string;
}> = ({ children, onClick, ariaLabel, ariaDescribedBy, disabled = false, className = '' }) => (
  <button
    onClick={onClick}
    aria-label={ariaLabel}
    aria-describedby={ariaDescribedBy}
    disabled={disabled}
    className={`focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${className}`}
  >
    {children}
  </button>
);

// Accessible form field wrapper
export const AccessibleField: React.FC<{
  label: string;
  children: React.ReactNode;
  error?: string;
  hint?: string;
  required?: boolean;
  id: string;
}> = ({ label, children, error, hint, required = false, id }) => {
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-foreground"
      >
        {label}
        {required && <span className="text-destructive ml-1" aria-label="required">*</span>}
      </label>
      
      {hint && (
        <p id={hintId} className="text-sm text-muted-foreground">
          {hint}
        </p>
      )}
      
      <div>
        {React.cloneElement(children as React.ReactElement, {
          id,
          'aria-describedby': [
            hint ? hintId : '',
            error ? errorId : ''
          ].filter(Boolean).join(' ') || undefined,
          'aria-invalid': error ? 'true' : undefined,
          'aria-required': required
        })}
      </div>
      
      {error && (
        <p id={errorId} role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
};