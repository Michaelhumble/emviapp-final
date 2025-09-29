import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/valuation';
import { ChevronUp, ChevronDown, Phone } from 'lucide-react';

interface StickyResultBarProps {
  low: number;
  high: number;
  show: boolean;
}

export const StickyResultBar: React.FC<StickyResultBarProps> = ({ low, high, show }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t shadow-lg z-50 md:hidden animate-slide-up">
      {isExpanded ? (
        <div className="p-4">
          <button 
            onClick={() => setIsExpanded(false)}
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
            aria-label="Collapse bar"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
          <div className="mb-3">
            <div className="text-xs text-muted-foreground">Your Estimate</div>
            <div className="font-bold text-lg">
              {formatCurrency(low)} – {formatCurrency(high)}
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={() => window.location.href = 'https://www.emvi.app/sell-salon'}
              size="sm"
              className="flex-1"
            >
              List Free
            </Button>
            <Button 
              onClick={() => window.location.href = 'tel:+1-800-EMVIAPP'}
              size="sm"
              variant="outline"
              className="flex items-center gap-1"
            >
              <Phone className="w-4 h-4" />
              Call
            </Button>
          </div>
        </div>
      ) : (
        <div className="p-3 flex items-center justify-between">
          <div className="flex-1">
            <div className="font-bold text-sm">
              {formatCurrency(low)} – {formatCurrency(high)}
            </div>
          </div>
          <button 
            onClick={() => setIsExpanded(true)}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Expand bar"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
