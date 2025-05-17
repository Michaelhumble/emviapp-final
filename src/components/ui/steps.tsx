
import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Step = {
  title: string;
  description?: string;
};

interface StepsProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export function Steps({ steps, currentStep, className }: StepsProps) {
  return (
    <div className={cn("w-full", className)}>
      <ol className="flex items-center w-full">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          const isLast = index === steps.length - 1;
          
          return (
            <li key={index} className={cn(
              "flex items-center",
              !isLast && "w-full"
            )}>
              <div className="flex flex-col items-center">
                <div className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium border transition-all duration-200",
                  isActive && "border-purple-600 bg-purple-50 text-purple-600",
                  isCompleted && "border-purple-600 bg-purple-600 text-white",
                  !isActive && !isCompleted && "border-gray-300 bg-white text-gray-500"
                )}>
                  {isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <div className="mt-2 text-center">
                  <h3 className={cn(
                    "text-sm font-medium",
                    isActive && "text-purple-600",
                    isCompleted && "text-purple-600",
                    !isActive && !isCompleted && "text-gray-500"
                  )}>
                    {step.title}
                  </h3>
                  {step.description && (
                    <p className={cn(
                      "text-xs",
                      isActive && "text-gray-600",
                      isCompleted && "text-gray-600",
                      !isActive && !isCompleted && "text-gray-400"
                    )}>
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
              
              {!isLast && (
                <div className={cn(
                  "w-full flex-1 h-0.5 mx-2",
                  isCompleted ? "bg-purple-600" : "bg-gray-200"
                )}></div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
