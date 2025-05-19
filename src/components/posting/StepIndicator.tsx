
import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex justify-center items-center space-x-2 py-4">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div 
          key={index} 
          className={`h-2 w-2 rounded-full ${
            index + 1 === currentStep 
              ? 'bg-primary' 
              : index + 1 < currentStep 
                ? 'bg-primary/50' 
                : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  );
};

export default StepIndicator;
