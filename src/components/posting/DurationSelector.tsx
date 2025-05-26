
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { DurationOption } from '@/types/pricing';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Diamond } from 'lucide-react';

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
  // For Diamond plan, show special message with NO duration selection
  if (selectedPricing === 'diamond') {
    return (
      <div className={cn("space-y-4", className)}>
        <div className="text-center">
          <h3 className="text-lg font-medium">Diamond Exclusive Plan</h3>
          <p className="text-sm text-gray-500">Fixed annual pricing only</p>
        </div>
        
        <Alert className="border-cyan-200 bg-cyan-50">
          <Diamond className="h-4 w-4 text-cyan-600" />
          <AlertDescription className="text-cyan-800">
            Diamond tier is exclusively available as a $999.99 annual plan. No monthly or shorter duration options available.
          </AlertDescription>
        </Alert>
        
        <div className="flex justify-center">
          <div className="px-6 py-3 rounded-full border-2 border-cyan-600 bg-cyan-600 text-white font-medium">
            12 Months - $999.99
            <span className="text-xs bg-cyan-100 text-cyan-800 px-2 py-1 rounded-full ml-2">
              Annual Only
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Regular duration selector for non-Diamond plans only
  return (
    <div className={cn("space-y-2", className)}>
      <RadioGroup
        value={String(selectedDuration)}
        onValueChange={(value) => onChange(Number(value))}
        className="flex flex-wrap justify-center gap-2"
        disabled={disableSelection}
      >
        {durations.map((duration) => (
          <div key={duration.months} className="flex flex-col items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="relative flex items-center justify-center cursor-pointer transition-all duration-200">
                    <RadioGroupItem
                      value={String(duration.months)}
                      id={`duration-${duration.months}`}
                      className="sr-only"
                      disabled={disableSelection}
                    />
                    <Label
                      htmlFor={`duration-${duration.months}`}
                      className={cn(
                        "px-4 py-2 rounded-full border cursor-pointer transition-all",
                        "text-sm font-medium flex items-center gap-1",
                        selectedDuration === duration.months
                          ? "bg-purple-600 text-white border-purple-600"
                          : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700",
                        disableSelection && "cursor-not-allowed opacity-50"
                      )}
                    >
                      {duration.label}
                      {duration.discount > 0 && (
                        <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-1.5 py-0.5 rounded-full ml-1">
                          -{duration.discount}%
                        </span>
                      )}
                    </Label>
                  </div>
                </TooltipTrigger>
              </Tooltip>
            </TooltipProvider>
            <span className="text-xs text-muted-foreground mt-1">
              {duration.vietnameseLabel}
            </span>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default DurationSelector;
