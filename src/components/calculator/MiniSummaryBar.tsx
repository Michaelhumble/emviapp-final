import React from 'react';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/valuation';
import { TrendingUp } from 'lucide-react';

interface MiniSummaryBarProps {
  low: number;
  high: number;
  status?: string;
  onListClick: () => void;
  onSaveClick: () => void;
  show: boolean;
}

export const MiniSummaryBar: React.FC<MiniSummaryBarProps> = ({ 
  low, 
  high, 
  status = 'Great Position',
  onListClick,
  onSaveClick,
  show 
}) => {
  if (!show) return null;

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t shadow-lg z-50 animate-slide-up"
      role="region"
      aria-label="Valuation summary"
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          {/* Valuation Range */}
          <div className="flex-1 min-w-0">
            <div className="font-bold text-sm md:text-base tabular-nums">
              {formatCurrency(low)} – {formatCurrency(high)}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3" />
              <span className="truncate">{status}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button 
              size="sm"
              variant="outline"
              onClick={onSaveClick}
              className="hidden sm:inline-flex"
            >
              Save
            </Button>
            <Button 
              size="sm"
              onClick={onListClick}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              List My Salon
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
