
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

export interface StatCardProps {
  title: string;
  value: number | string;
  loading?: boolean;
  precision?: number;
  icon?: React.ReactNode;
  description?: string;
  prefix?: string;
  suffix?: string;
}

const StatCard = ({ 
  title, 
  value, 
  loading = false, 
  precision = 0, 
  icon,
  description,
  prefix = '',
  suffix = ''
}: StatCardProps) => {
  const displayValue = typeof value === 'number' 
    ? value.toLocaleString(undefined, { minimumFractionDigits: precision, maximumFractionDigits: precision }) 
    : value;

  return (
    <Card className="bg-white">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-gray-500">{title}</div>
          {icon && <div>{icon}</div>}
        </div>
        <div className="mt-2">
          {loading ? (
            <Skeleton className="h-7 w-16" />
          ) : (
            <div className="text-2xl font-bold">{prefix}{displayValue}{suffix}</div>
          )}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
