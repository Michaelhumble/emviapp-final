
import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

declare module "@radix-ui/react-progress" {
  interface ProgressProps {
    indicatorClassName?: string;
  }
}

declare const Progress: React.ForwardRefExoticComponent<
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    indicatorClassName?: string;
  } & React.RefAttributes<React.ElementRef<typeof ProgressPrimitive.Root>>
>;

export { Progress };
