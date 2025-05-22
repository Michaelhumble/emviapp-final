
import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

export interface IndustryCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  selected?: boolean;
  onClick: (id: string) => void;
}

const IndustryCard: React.FC<IndustryCardProps> = ({ 
  id, 
  title, 
  description, 
  icon: IconComponent,
  selected = false,
  onClick
}) => {
  return (
    <Card 
      onClick={() => onClick(id)}
      className={cn(
        "cursor-pointer p-6 transition-all hover:shadow-md",
        selected 
          ? "border-2 border-primary bg-primary/5" 
          : "border border-gray-200 hover:border-primary/30"
      )}
    >
      <div className="flex flex-col items-start gap-3">
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center",
          selected ? "bg-primary/20" : "bg-primary/10"
        )}>
          <IconComponent size={20} className="text-primary" />
        </div>
        
        <h3 className="text-lg font-semibold">{title}</h3>
        
        <p className="text-sm text-gray-600 line-clamp-3">
          {description}
        </p>
      </div>
    </Card>
  );
};

export default IndustryCard;
