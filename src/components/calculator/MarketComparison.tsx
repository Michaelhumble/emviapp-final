import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MarketComparisonProps {
  valuationBase: number;
}

export const MarketComparison: React.FC<MarketComparisonProps> = ({ valuationBase }) => {
  const marketAverage = 125000;
  const percentDiff = ((valuationBase - marketAverage) / marketAverage) * 100;
  const isAbove = percentDiff > 0;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 shadow-sm">
      <h4 className="text-lg font-bold mb-4 text-center">Market Comparison</h4>
      <div className="flex items-center justify-center gap-4">
        <div className="text-center">
          <div className="text-sm text-muted-foreground mb-1">Your Salon</div>
          <div className="text-2xl font-bold text-primary">
            ${valuationBase.toLocaleString()}
          </div>
        </div>
        <div className="flex flex-col items-center">
          {isAbove ? (
            <TrendingUp className="w-8 h-8 text-green-600" />
          ) : (
            <TrendingDown className="w-8 h-8 text-orange-600" />
          )}
          <span className={`text-sm font-bold ${isAbove ? 'text-green-600' : 'text-orange-600'}`}>
            {isAbove ? '+' : ''}{percentDiff.toFixed(1)}%
          </span>
        </div>
        <div className="text-center">
          <div className="text-sm text-muted-foreground mb-1">Market Average</div>
          <div className="text-2xl font-bold text-muted-foreground">
            ${marketAverage.toLocaleString()}
          </div>
        </div>
      </div>
      <p className="text-center text-sm text-muted-foreground mt-4">
        {isAbove 
          ? 'Your salon is valued above the market average—great position for sale!' 
          : 'Your salon has competitive pricing for quick sale potential.'}
      </p>
    </div>
  );
};
