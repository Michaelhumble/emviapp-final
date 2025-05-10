
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CalendarDays, Check } from 'lucide-react';

interface DurationSelectorProps {
  selectedDuration: number;
  onChange: (duration: number) => void;
  selectedPricing: string;
}

const DurationSelector: React.FC<DurationSelectorProps> = ({
  selectedDuration,
  onChange,
  selectedPricing
}) => {
  // Define duration options (in months)
  const options = [
    { value: 1, label: '1 Month', discount: 0 },
    { value: 3, label: '3 Months', discount: 5 },
    { value: 6, label: '6 Months', discount: 10 },
    { value: 12, label: '1 Year', discount: 20 }
  ];
  
  // If Diamond tier, only show annual option (discount already built into price)
  const availableOptions = selectedPricing === 'diamond' 
    ? options.filter(option => option.value === 12)
    : options;

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {availableOptions.map((option) => (
        <Button
          key={option.value}
          type="button"
          variant={selectedDuration === option.value ? "default" : "outline"}
          className={cn(
            "relative min-w-[120px] h-auto py-3 px-4 flex-col items-center",
            selectedDuration === option.value && "border-primary"
          )}
          onClick={() => onChange(option.value)}
          disabled={selectedPricing === 'diamond' && option.value !== 12}
        >
          <div className="flex items-center justify-center mb-1">
            <CalendarDays className="h-4 w-4 mr-1" />
            <span>{option.label}</span>
          </div>
          
          {option.discount > 0 && (
            <div className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
              Save {option.discount}%
            </div>
          )}
          
          {selectedDuration === option.value && (
            <div className="absolute -top-2 -right-2 bg-primary text-white w-5 h-5 rounded-full flex items-center justify-center">
              <Check className="h-3 w-3" />
            </div>
          )}
        </Button>
      ))}
    </div>
  );
};

export default DurationSelector;
