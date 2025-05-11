
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { DurationOption } from '@/types/pricing';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface DurationSelectorProps {
  selectedDuration: number;
  onChange: (duration: number) => void;
  className?: string;
  durations?: DurationOption[];
  disableSelection?: boolean;
  selectedPricing?: string;
}

const DurationSelector: React.FC<DurationSelectorProps> = ({ 
  selectedDuration, 
  onChange,
  className,
  durations = [
    { months: 1, label: '1 Month', vietnameseLabel: '1 tháng', discount: 0 },
    { months: 3, label: '3 Months', vietnameseLabel: '3 tháng', discount: 5 },
    { months: 6, label: '6 Months', vietnameseLabel: '6 tháng', discount: 10 },
    { months: 12, label: '12 Months', vietnameseLabel: '1 năm', discount: 20 }
  ],
  disableSelection = false,
  selectedPricing
}) => {
  // For Diamond plan, we'll show a special message for non-yearly options
  // IMPORTANT: Diamond plan is intentionally hardcoded for 12-month only.
  // This restriction is by design and should not be changed without business approval.
  // TODO: Diamond tier is temporarily hidden and will be accessible later via waitlist/bid flow
  const isDiamondPlan = selectedPricing === 'diamond';
  const isFreePlan = selectedPricing === 'free';
  
  // Modify the first duration option label for free plans
  const modifiedDurations = isFreePlan 
    ? [{ ...durations[0], label: '30 Days Free', vietnameseLabel: '30 ngày miễn phí' }, ...durations.slice(1)]
    : durations;
  
  return (
    <div className={cn("space-y-2", className)}>
      <RadioGroup
        value={String(selectedDuration)}
        onValueChange={(value) => onChange(Number(value))}
        className="flex flex-wrap justify-center gap-2"
        disabled={disableSelection || isFreePlan}
      >
        {modifiedDurations.map((duration, index) => {
          // For Diamond plan, show tooltip on non-12-month options
          const isDiamondNonYearly = isDiamondPlan && duration.months !== 12;
          // For Free plan, only show first option (30 days)
          const isNonFreeOption = isFreePlan && index > 0;
          
          if (isFreePlan && index > 0) {
            return null; // Don't show other duration options for free plan
          }
          
          return (
            <div key={duration.months} className="flex flex-col items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className={cn(
                      "relative flex items-center justify-center",
                      "cursor-pointer transition-all duration-200",
                      (isDiamondNonYearly || isNonFreeOption) && "opacity-60 cursor-help"
                    )}>
                      <RadioGroupItem
                        value={String(duration.months)}
                        id={`duration-${duration.months}`}
                        className="sr-only"
                        disabled={disableSelection || isDiamondNonYearly || isFreePlan}
                      />
                      <Label
                        htmlFor={`duration-${duration.months}`}
                        className={cn(
                          "px-4 py-2 rounded-full border cursor-pointer transition-all",
                          "text-sm font-medium flex items-center gap-1",
                          selectedDuration === duration.months
                            ? "bg-purple-600 text-white border-purple-600"
                            : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700",
                          (disableSelection || isDiamondNonYearly || isFreePlan) && 
                            "cursor-help hover:bg-white dark:hover:bg-gray-800"
                        )}
                      >
                        {duration.label}
                        {duration.discount > 0 && !isFreePlan && (
                          <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-1.5 py-0.5 rounded-full ml-1">
                            -{duration.discount}%
                          </span>
                        )}
                      </Label>
                    </div>
                  </TooltipTrigger>
                  {isDiamondNonYearly && (
                    <TooltipContent side="top" className="p-2 max-w-xs text-center">
                      <p>Only 12-month plan unlocks special discount pricing.</p>
                    </TooltipContent>
                  )}
                  {isFreePlan && (
                    <TooltipContent side="top" className="p-2 max-w-xs text-center">
                      <p>Free listings are available for 30 days only.</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
              <span className="text-xs text-muted-foreground mt-1">
                {duration.vietnameseLabel}
              </span>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default DurationSelector;
