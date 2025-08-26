import React, { useEffect, useRef } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { type Outlet, formatDate, getHostFromUrl, getLogoUrl } from '@/lib/press';

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
          event: 'outlet_click',
          outlet_key: outlet.key,
          outlet_name: outlet.name,
          link_type: 'primary'
        });
      }
      
      // Open in new tab
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleAltClick = (url: string) => {
    if (outlet) {
      const host = getHostFromUrl(url);
      
      // Analytics tracking
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'outlet_click',
          outlet_key: outlet.key,
          outlet_name: outlet.name,
          link_type: 'alt'
        });
      }
      
      // Open in new tab
      window.open(url, '_blank', 'noopener,noreferrer');
    }
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
            <div className="pressLogoWrap !h-16 !w-16 !p-3 flex-shrink-0">
              <img
                src={getLogoUrl(outlet)}
                alt={`${outlet.name} logo`}
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

          {/* Action Buttons - Primary article link */}
          <div className="flex flex-col gap-3">
            <button
              ref={primaryButtonRef}
              onClick={() => handlePrimaryClick(outlet.url)}
              className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <span>Read on {getHostFromUrl(outlet.url)}</span>
              <ExternalLink className="ml-2 h-4 w-4" />
            </button>
            
            {/* More sources if available */}
            {outlet.altUrls && outlet.altUrls.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">More sources:</p>
                {outlet.altUrls.slice(0, 3).map((url, index) => {
                  const host = getHostFromUrl(url);
                  return (
                    <button
                      key={index}
                      onClick={() => handleAltClick(url)}
                      className="w-full inline-flex items-center justify-between rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      <span>Read on {host}</span>
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PressModal;