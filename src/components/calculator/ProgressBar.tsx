import React from 'react';
import { Check } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number; // 1-4
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  const steps = [
    { number: 1, label: 'Business Info' },
    { number: 2, label: 'Lease & Location' },
    { number: 3, label: 'Reputation' },
    { number: 4, label: 'Result' }
  ];
  
  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;
  
  return (
    <div className="w-full max-w-4xl mx-auto mb-8 px-4">
      {/* Progress Bar */}
      <div className="relative mb-8">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      {/* Steps */}
      <div className="flex justify-between items-start">
        {steps.map((step) => {
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;
          
          return (
            <div key={step.number} className="flex flex-col items-center flex-1">
              <div 
                className={`
                  w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-base transition-all duration-300
                  ${isCompleted ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white' : ''}
                  ${isCurrent ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white ring-4 ring-purple-200' : ''}
                  ${!isCompleted && !isCurrent ? 'bg-gray-200 text-gray-500' : ''}
                `}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : step.number}
              </div>
              <span 
                className={`
                  mt-2 text-xs sm:text-sm font-medium text-center transition-colors duration-300
                  ${isCurrent ? 'text-purple-600 font-bold' : ''}
                  ${isCompleted ? 'text-purple-600' : ''}
                  ${!isCompleted && !isCurrent ? 'text-gray-500' : ''}
                `}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
