
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { DurationOption } from '@/types/pricing';

interface DurationSelectorProps {
  selectedDuration: number;
  onChange: (duration: number) => void;
  className?: string;
  durations?: DurationOption[];
}

const DurationSelector: React.FC<DurationSelectorProps> = ({ 
  selectedDuration, 
  onChange,
  className,
  durations = [
    { months: 1, label: '1 Month', vietnameseLabel: '1 tháng', discount: 0 },
    { months: 3, label: '3 Months', vietnameseLabel: '3 tháng', discount: 10 },
    { months: 6, label: '6 Months', vietnameseLabel: '6 tháng', discount: 20 },
    { months: 12, label: '12 Months', vietnameseLabel: '1 năm', discount: 30 }
  ]
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      <RadioGroup
        value={String(selectedDuration)}
        onValueChange={(value) => onChange(Number(value))}
        className="flex flex-wrap justify-center gap-2"
      >
        {durations.map((duration) => (
          <div key={duration.months} className="flex flex-col items-center">
            <div className={cn(
              "relative flex items-center justify-center",
              "cursor-pointer transition-all duration-200"
            )}>
              <RadioGroupItem
                value={String(duration.months)}
                id={`duration-${duration.months}`}
                className="sr-only"
              />
              <Label
                htmlFor={`duration-${duration.months}`}
                className={cn(
                  "px-4 py-2 rounded-full border cursor-pointer transition-all",
                  "text-sm font-medium flex items-center gap-1",
                  selectedDuration === duration.months
                    ? "bg-purple-600 text-white border-purple-600"
                    : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                )}
                title={duration.discount > 0 ? `Save ${duration.discount}% when you commit longer 💰` : undefined}
              >
                {duration.label}
                {duration.discount > 0 && (
                  <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-1.5 py-0.5 rounded-full ml-1">
                    -{duration.discount}%
                  </span>
                )}
              </Label>
            </div>
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
