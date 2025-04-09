
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  description?: string;
  icon: LucideIcon;
  onClick?: () => void;
  variant?: 'default' | 'primary' | 'secondary' | 'outline';
  className?: string;
}

const DashboardCard = ({
  title,
  description,
  icon: Icon,
  onClick,
  variant = 'default',
  className,
}: DashboardCardProps) => {
  // Define variant-specific styles
  const variantStyles = {
    default: 'bg-white hover:bg-gray-50 border border-gray-200',
    primary: 'bg-primary/10 hover:bg-primary/20 border border-primary/20 text-primary',
    secondary: 'bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700',
    outline: 'bg-transparent hover:bg-gray-50 border border-gray-200',
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-xl p-5 transition-all duration-200 shadow-sm',
        'transform hover:scale-105 hover:shadow-md cursor-pointer',
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-start">
        <div className="mr-4 rounded-full p-2 bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
