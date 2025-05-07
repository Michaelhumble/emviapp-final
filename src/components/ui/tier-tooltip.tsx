
import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TierTooltipProps {
  children: React.ReactNode;
  tier: string;
  price: string;
  description?: string;
}

const TierTooltip: React.FC<TierTooltipProps> = ({ 
  children, 
  tier, 
  price,
  description 
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent className="bg-white p-3 shadow-lg border border-gray-100 max-w-xs">
          <div>
            <h4 className="font-semibold">{tier} Tier</h4>
            <p className="text-xs text-gray-500 mt-1">{price}</p>
            {description && (
              <p className="text-xs mt-2">{description}</p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TierTooltip;
