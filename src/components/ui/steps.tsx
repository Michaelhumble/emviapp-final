
import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface StepsProps {
  steps: {
    title: string;
    description?: string;
  }[];
  currentStep: number;
  className?: string;
}

export const Steps = React.forwardRef<HTMLDivElement, StepsProps>(
  ({ steps, currentStep, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex w-full justify-between", className)}
        {...props}
      >
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div
              key={index}
              className={cn(
                "flex flex-1 flex-col",
                index !== steps.length - 1 ? "after:mt-4 after:hidden md:after:block after:h-[1px] after:flex-1 after:bg-border" : "",
                index !== 0 ? "before:mt-4 before:hidden md:before:block before:h-[1px] before:flex-1 before:bg-border" : "",
                "relative"
              )}
            >
              <div className="flex flex-1 items-center justify-center pb-4 md:block md:pb-0">
                <div className="absolute left-1/2 -translate-x-1/2 md:relative md:left-auto md:translate-x-0">
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full border text-center text-sm font-medium",
                      isCompleted ? "border-primary bg-primary text-primary-foreground" : "",
                      isCurrent ? "border-primary bg-background text-primary" : "",
                      !isCompleted && !isCurrent ? "border-border bg-background text-muted-foreground" : ""
                    )}
                  >
                    {isCompleted ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center text-center md:items-start md:justify-start md:text-left">
                <div
                  className={cn(
                    "text-sm font-medium",
                    isCompleted || isCurrent ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {step.title}
                </div>
                {step.description ? (
                  <div className="hidden text-sm text-muted-foreground md:block">
                    {step.description}
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);

Steps.displayName = "Steps";
