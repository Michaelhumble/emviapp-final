
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const MobileButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ className, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      className={cn(
        "w-full sm:w-auto rounded-md", // Full width on mobile, auto on desktop
        className
      )}
      {...props}
    />
  );
});

MobileButton.displayName = 'MobileButton';
