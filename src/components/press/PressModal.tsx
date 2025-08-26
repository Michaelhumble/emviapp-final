import React, { useEffect, useRef } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { type Outlet, formatDate, getHostFromUrl } from '@/lib/press';

interface PressModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  outlet: Outlet | null;
  triggerRef?: React.RefObject<HTMLElement>;
}

const PressModal: React.FC<PressModalProps> = ({ 
  open, 
  onOpenChange, 
  outlet,
  triggerRef 
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const primaryButtonRef = useRef<HTMLButtonElement>(null);

  // Focus management
  useEffect(() => {
    if (open && closeButtonRef.current) {
      // Focus the close button when modal opens
      setTimeout(() => closeButtonRef.current?.focus(), 100);
    } else if (!open && triggerRef?.current) {
      // Return focus to trigger when modal closes
      setTimeout(() => triggerRef.current?.focus(), 100);
    }
  }, [open, triggerRef]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        onOpenChange(false);
      }
    };

    if (open) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onOpenChange]);

  const handlePrimaryClick = (url?: string) => {
    if (outlet && url) {
      const host = getHostFromUrl(url);
      
      // Analytics tracking
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'press_modal_primary_click',
          host: host,
          outlet_key: outlet.key
        });
      }
      
      // Open in new tab
      window.open(url, '_blank', 'nofollow noopener');
    }
  };

  const handleSeeAllClick = () => {
    if (outlet) {
      // Analytics tracking
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'press_modal_secondary_click',
          action: 'see_all',
          outlet_key: outlet.key
        });
      }
    }
    onOpenChange(false);
  };

  if (!outlet) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-md mx-auto"
        aria-modal="true"
        role="dialog"
        aria-labelledby="press-modal-title"
        aria-describedby="press-modal-description"
      >
        <DialogHeader>
          <button
            ref={closeButtonRef}
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Outlet Logo and Name */}
          <div className="flex items-center space-x-3">
            <div className="pressLogoWrap flex-shrink-0">
              <img
                src={outlet.logo}
                alt={`${outlet.name} logo`}
                className="max-w-full"
                loading="eager"
                decoding="sync"
              />
            </div>
            <h2 id="press-modal-title" className="font-semibold text-lg text-foreground">
              {outlet.name}
            </h2>
          </div>

          {/* Article Details */}
          <div className="space-y-3">
            <h3 className="font-medium text-foreground leading-snug">
              {outlet.headline}
            </h3>
            
            <p className="text-sm text-muted-foreground">
              {formatDate(outlet.dateISO)} • {outlet.market}
            </p>
          </div>

          {/* Action Buttons - different for article vs aggregator */}
          <div className="flex flex-col gap-3">
            {outlet.type === 'article' ? (
              // Single article - primary and secondary buttons
              <>
                <button
                  ref={primaryButtonRef}
                  onClick={() => handlePrimaryClick(outlet.url)}
                  className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <span>Read on {outlet.name}</span>
                  <ExternalLink className="ml-2 h-4 w-4" />
                </button>
                
                <Link
                  to={`/press?outlet=${outlet.key}`}
                  onClick={handleSeeAllClick}
                  className="inline-flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  See all coverage
                </Link>
              </>
            ) : (
              // Aggregator - list canonical options
              <>
                <p className="text-sm text-muted-foreground mb-2">
                  Choose where to read the coverage:
                </p>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {outlet.altUrls.map((url, index) => {
                    const host = getHostFromUrl(url);
                    return (
                      <button
                        key={index}
                        onClick={() => handlePrimaryClick(url)}
                        className="w-full inline-flex items-center justify-between rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      >
                        <span>Read on {host}</span>
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PressModal;