
import React from 'react';
import { cn } from "@/lib/utils";
import { DurationOption } from '@/types/pricing';

interface DurationSelectorProps {
  durationMonths: number;
  onDurationChange: (months: number) => void;
}

export function DurationSelector({ durationMonths, onDurationChange }: DurationSelectorProps) {
  const durations: DurationOption[] = [
    { months: 1, label: '1 Month', vietnameseLabel: '1 tháng', discount: 0 },
    { months: 3, label: '3 Months', vietnameseLabel: '3 tháng', discount: 10 },
    { months: 6, label: '6 Months', vietnameseLabel: '6 tháng', discount: 20 },
    { months: 12, label: '12 Months', vietnameseLabel: '1 năm', discount: 35 }
  ];

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium">Post Duration</h3>
      <p className="text-sm text-gray-500">Choose how long your job post will be active</p>
      
      <div className="flex flex-wrap gap-2 mt-3">
        {durations.map((duration) => (
          <button
            key={duration.months}
            type="button"
            onClick={() => onDurationChange(duration.months)}
            className={cn(
              "px-4 py-2 rounded-full border transition-all",
              "text-sm font-medium flex items-center gap-1",
              durationMonths === duration.months
                ? "bg-purple-600 text-white border-purple-600"
                : "bg-white border-gray-200 hover:bg-gray-50"
            )}
          >
            {duration.label}
            {duration.discount > 0 && (
              <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full ml-1">
                -{duration.discount}%
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
