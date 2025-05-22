
import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import * as LucideIcons from 'lucide-react';

export interface IndustryCardProps {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof LucideIcons;
  selected?: boolean;
  onClick: (id: string) => void;
}

const IndustryCard: React.FC<IndustryCardProps> = ({ 
  id, 
  title, 
  description, 
  icon,
  selected = false,
  onClick
}) => {
  const Icon = LucideIcons[icon] || LucideIcons.CircleDashed;
  
  return (
    <Card 
      onClick={() => onClick(id)}
      className={cn(
        "cursor-pointer p-6 transition-all hover:shadow-md border-2",
        selected 
          ? "border-primary bg-primary/5" 
          : "border-transparent hover:border-gray-200"
      )}
    >
      <div className="flex flex-col items-start gap-3">
        <div className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center",
          selected ? "bg-primary/20" : "bg-primary/10"
        )}>
          <Icon size={24} className={cn("text-primary")} />
        </div>
        
        <h3 className="text-lg font-semibold">{title}</h3>
        
        <p className="text-sm text-gray-600">
          {description}
        </p>
      </div>
    </Card>
  );
};

export default IndustryCard;
