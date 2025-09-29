import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency } from '@/lib/valuation';

interface ComparisonSliderProps {
  userValue: number;
}

export const ComparisonSlider: React.FC<ComparisonSliderProps> = ({ userValue }) => {
  // Calculate comparison percentages
  const averageSalonValue = 180000;
  const percentageDiff = ((userValue - averageSalonValue) / averageSalonValue) * 100;
  const isAboveAverage = percentageDiff > 0;

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200 shadow-sm">
      <h4 className="text-xl font-bold mb-4 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        How You Compare
      </h4>
      
      <div className="space-y-4">
        {/* Your Value Bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-foreground">Your Salon</span>
            <span className="font-bold text-purple-600">{formatCurrency(userValue)}</span>
          </div>
          <div className="h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-shimmer" />
            <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
              You
            </div>
          </div>
        </div>

        {/* Average Value Bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-muted-foreground">Average Salon</span>
            <span className="font-medium text-muted-foreground">{formatCurrency(averageSalonValue)}</span>
          </div>
          <div className="h-10 bg-gray-300 rounded-lg relative" style={{ width: '70%' }}>
            <div className="absolute inset-0 flex items-center justify-center text-gray-700 font-semibold text-sm">
              Industry Avg
            </div>
          </div>
        </div>

        {/* Comparison Result */}
        <div className={`flex items-center gap-3 p-4 rounded-lg ${isAboveAverage ? 'bg-green-100 border-2 border-green-300' : 'bg-orange-100 border-2 border-orange-300'}`}>
          {isAboveAverage ? (
            <>
              <TrendingUp className="w-8 h-8 text-green-600 flex-shrink-0" />
              <div>
                <div className="font-bold text-green-900 text-lg">
                  {Math.abs(percentageDiff).toFixed(0)}% Above Average! 🎉
                </div>
                <div className="text-sm text-green-700">
                  Your salon is valued higher than most in your area
                </div>
              </div>
            </>
          ) : (
            <>
              <TrendingDown className="w-8 h-8 text-orange-600 flex-shrink-0" />
              <div>
                <div className="font-bold text-orange-900 text-lg">
                  {Math.abs(percentageDiff).toFixed(0)}% Below Average
                </div>
                <div className="text-sm text-orange-700">
                  Room for growth—let's maximize your value
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
