
import React from 'react';
import { cn } from '@/lib/utils';

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  cols?: number;
  gap?: number;
}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, children, cols = 2, gap = 4, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          `grid grid-cols-1 md:grid-cols-${cols} gap-${gap}`,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = 'Grid';
