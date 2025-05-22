
import React from 'react';
import { cn } from '@/lib/utils';

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  cols?: number;
  gap?: number;
}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, children, cols = 2, gap = 4, ...props }, ref) => {
    // Create the correct Tailwind classes based on the props
    const gridColsClass = cols === 1 ? 'grid-cols-1' : `grid-cols-1 md:grid-cols-${cols}`;
    const gapClass = `gap-${gap}`;
    
    return (
      <div
        ref={ref}
        className={cn(
          'grid',
          gridColsClass,
          gapClass,
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
