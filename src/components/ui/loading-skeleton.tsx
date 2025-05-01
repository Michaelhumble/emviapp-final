
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * Loading skeleton component for displaying placeholder content while data is loading
 * 
 * @component
 * @param {Object} props - Component properties
 * @param {string} [props.className] - Additional CSS classes
 * @param {number} [props.items=3] - Number of skeleton items to render
 * @param {string} [props.height='20px'] - Height of each skeleton item
 * @returns {JSX.Element} Loading skeleton component
 */
export const LoadingSkeleton = ({ 
  className = '',
  items = 3,
  height = '20px'
}: { 
  className?: string;
  items?: number;
  height?: string;
}) => {
  return (
    <div className={`w-full space-y-3 ${className}`}>
      {[...Array(items)].map((_, i) => (
        <Skeleton 
          key={`skeleton-${i}`} 
          className={`w-full ${height}`}
          style={{ height }}
        />
      ))}
    </div>
  );
};

/**
 * Card skeleton component for displaying a loading state for card components
 * 
 * @component
 * @param {Object} props - Component properties
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Card skeleton component
 */
export const CardSkeleton = ({ 
  className = '' 
}: { 
  className?: string 
}) => {
  return (
    <div className={`rounded-lg border p-4 ${className}`}>
      <div className="space-y-3">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-10 w-1/2" />
      </div>
    </div>
  );
};

/**
 * Dashboard skeleton component for displaying a loading state for dashboard widgets
 * 
 * @component
 * @returns {JSX.Element} Dashboard skeleton component
 */
export const DashboardSkeleton = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <CardSkeleton key={`dashboard-skeleton-${i}`} />
      ))}
    </div>
  );
};
