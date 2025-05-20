
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
    <div className="space-y-2">
      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-300 ease-in-out" 
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex flex-col items-center">
            <div 
              className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-all",
                index + 1 <= currentStep 
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md" 
                  : "bg-gray-100 text-gray-500 border border-gray-200"
              )}
            >
              {index + 1}
            </div>
            <span 
              className={cn(
                "text-xs mt-1 hidden md:block",
                index + 1 <= currentStep ? "text-purple-700" : "text-gray-500"
              )}
            >
              {getStepName(index + 1)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

function getStepName(step: number): string {
  switch (step) {
    case 1: return 'Basics';
    case 2: return 'Details';
    case 3: return 'Contact';
    case 4: return 'Photos';
    case 5: return 'Preview';
    case 6: return 'Pricing';
    default: return `Step ${step}`;
  }
}
