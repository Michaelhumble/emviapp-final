
import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps
}) => {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex items-center">
            <div 
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium",
                index + 1 <= currentStep 
                  ? "bg-purple-600 text-white" 
                  : "bg-gray-100 text-gray-500 border border-gray-200"
              )}
            >
              {index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div className="h-px bg-gray-200 flex-grow w-20 mx-1" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
