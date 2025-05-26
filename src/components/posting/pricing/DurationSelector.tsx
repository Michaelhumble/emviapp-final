
import React from 'react';
import { cn } from "@/lib/utils";
import { DurationOption } from '@/types/pricing';
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Diamond } from 'lucide-react';

interface DurationSelectorProps {
  durationMonths: number;
  onDurationChange: (months: number) => void;
  selectedPricingTier?: string;
  isDiamondPlan?: boolean;
}

export function DurationSelector({ 
  durationMonths, 
  onDurationChange, 
  selectedPricingTier,
  isDiamondPlan = false
}: DurationSelectorProps) {
  const durations: DurationOption[] = [
    { months: 1, label: '1 Month', vietnameseLabel: '1 tháng', discount: 0 },
    { months: 3, label: '3 Months', vietnameseLabel: '3 tháng', discount: 10 },
    { months: 6, label: '6 Months', vietnameseLabel: '6 tháng', discount: 20 },
    { months: 12, label: '12 Months', vietnameseLabel: '1 năm', discount: 35 },
  ];

  // For Diamond plan, show special fixed pricing message only - NO duration selection
  if (selectedPricingTier === 'diamond') {
    return (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-medium">Diamond Exclusive Plan</h3>
          <p className="text-sm text-gray-500">Annual listing only</p>
        </div>
        
        <Alert className="border-cyan-200 bg-cyan-50">
          <Diamond className="h-4 w-4 text-cyan-600" />
          <AlertDescription className="text-cyan-800">
            Diamond is only available as a $999.99 annual listing. 
            This exclusive tier provides 1 year of top diamond placement with premium features.
          </AlertDescription>
        </Alert>
        
        <div className="flex justify-center">
          <div className="px-6 py-3 rounded-full border-2 border-cyan-600 bg-cyan-600 text-white font-medium">
            1 Year - $999.99
            <span className="text-xs bg-cyan-100 text-cyan-800 px-2 py-1 rounded-full ml-2">
              Annual Only
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Regular duration selector for other plans (Gold, Premium, Free) - Diamond is excluded
  const getBadgeContent = (months: number) => {
    if (months === 6) return "Most Popular";
    if (months === 12) return "Best Value!";
    return null;
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium">Post Duration</h3>
      <p className="text-sm text-gray-500">Choose how long your job post will be active</p>
      
      <div className="flex flex-wrap gap-2 mt-3">
        {durations.map((duration) => {
          const badgeContent = getBadgeContent(duration.months);
          
          return (
            <TooltipProvider key={duration.months}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => onDurationChange(duration.months)}
                    className={cn(
                      "px-4 py-2 rounded-full border transition-all relative",
                      "text-sm font-medium flex flex-col items-center gap-1",
                      durationMonths === duration.months
                        ? "bg-purple-600 text-white border-purple-600"
                        : "bg-white border-gray-200 hover:bg-gray-50"
                    )}
                  >
                    <span>{duration.label}</span>
                    {duration.discount > 0 && (
                      <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full">
                        Save {duration.discount}%
                      </span>
                    )}
                    {badgeContent && (
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "absolute -top-2 -right-2 text-[10px]",
                          duration.months === 12 ? "bg-amber-100 border-amber-300 text-amber-800" : "bg-purple-100 border-purple-300 text-purple-800"
                        )}
                      >
                        {badgeContent}
                      </Badge>
                    )}
                  </button>
                </TooltipTrigger>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
      
      {durationMonths >= 6 && (
        <p className="text-xs text-green-600 font-medium mt-2">
          {durationMonths === 12 ? "🔒 Lock in this special pricing for a full year!" : "Great choice! Extended visibility at a discount."}
        </p>
      )}
    </div>
  );
}
