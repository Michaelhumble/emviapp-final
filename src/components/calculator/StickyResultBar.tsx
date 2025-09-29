import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/valuation';

interface StickyResultBarProps {
  low: number;
  high: number;
  show: boolean;
}

export const StickyResultBar: React.FC<StickyResultBarProps> = ({ low, high, show }) => {
  const navigate = useNavigate();

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t shadow-lg z-50 p-4 md:hidden animate-slide-up">
      <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
        <div className="flex-1">
          <div className="text-xs text-muted-foreground">Your Estimate</div>
          <div className="font-bold text-lg">
            {formatCurrency(low)} – {formatCurrency(high)}
          </div>
        </div>
        <Button 
          onClick={() => navigate('/salons/post')}
          size="sm"
          className="whitespace-nowrap"
        >
          List Free
        </Button>
      </div>
    </div>
  );
};
