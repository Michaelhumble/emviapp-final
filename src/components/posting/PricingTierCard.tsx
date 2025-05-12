
import React from 'react';
import { Check, X, Star, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { JobPricingOption } from '@/utils/posting/types';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PricingTierCardProps {
  pricing: JobPricingOption;
  isSelected: boolean;
  onClick: () => void;
  isMostPopular?: boolean;
  isFreeVariant?: boolean;
  subtitle?: string;
  negativeFeatures?: string[];
}

const PricingTierCard: React.FC<PricingTierCardProps> = ({
  pricing,
  isSelected,
  onClick,
  isMostPopular = false,
  isFreeVariant = false,
  subtitle,
  negativeFeatures = []
}) => {
  const getBgGradient = () => {
    if (isFreeVariant) return 'bg-gradient-to-b from-gray-50 to-gray-100';
    if (pricing.id === 'gold') return 'bg-gradient-to-b from-amber-50 to-amber-100/80';
    if (pricing.id === 'premium') return 'bg-gradient-to-b from-purple-50 to-purple-100/80';
    if (pricing.id === 'standard') return 'bg-gradient-to-b from-blue-50 to-blue-100/80';
    return 'bg-gradient-to-b from-white to-gray-50';
  };

  const getBorderColor = () => {
    if (isSelected) {
      if (pricing.id === 'gold') return 'border-amber-400 ring-4 ring-amber-200/50';
      if (pricing.id === 'premium') return 'border-purple-400 ring-4 ring-purple-200/50';
      if (pricing.id === 'standard') return 'border-blue-400 ring-4 ring-blue-200/50';
      return 'border-gray-300 ring-2 ring-gray-200';
    }
    if (isFreeVariant) return 'border-gray-200';
    if (pricing.id === 'gold') return 'border-amber-200 hover:border-amber-300';
    if (pricing.id === 'premium') return 'border-purple-200 hover:border-purple-300';
    return 'border-gray-200 hover:border-gray-300';
  };

  const getNameTextColor = () => {
    if (pricing.id === 'gold') return 'text-amber-700';
    if (pricing.id === 'premium') return 'text-purple-700';
    if (pricing.id === 'standard') return 'text-blue-700';
    return 'text-gray-600';
  };

  const getPriceTextColor = () => {
    if (pricing.id === 'gold') return 'text-amber-800';
    if (pricing.id === 'premium') return 'text-purple-800';
    if (pricing.id === 'standard') return 'text-blue-800';
    return 'text-gray-600';
  };

  const getCheckColor = () => {
    if (pricing.id === 'gold') return 'text-amber-600';
    if (pricing.id === 'premium') return 'text-purple-600';
    if (pricing.id === 'standard') return 'text-blue-600';
    return 'text-gray-500';
  };

  const getFreeWarning = () => {
    if (pricing.id === 'free') {
      return "Free posts reach 80% fewer candidates. Use only if testing.";
    }
    return null;
  };

  const getCardClasses = () => {
    let baseClasses = "relative rounded-xl border p-6 cursor-pointer transition-all duration-300";
    
    // Add shadow effects based on tier
    if (pricing.id === 'gold') {
      baseClasses += isSelected ? " shadow-lg shadow-amber-100" : " shadow-sm hover:shadow-md hover:shadow-amber-100";
    } else if (pricing.id === 'premium') {
      baseClasses += isSelected ? " shadow-lg shadow-purple-100" : " shadow-sm hover:shadow-md hover:shadow-purple-100";
    } else if (pricing.id === 'standard') {
      baseClasses += isSelected ? " shadow-lg shadow-blue-100" : " shadow-sm hover:shadow-md hover:shadow-blue-100";
    } else {
      baseClasses += isSelected ? " shadow-sm" : " shadow-xs hover:shadow-sm";
    }

    // For the free variant, make it visually smaller
    if (isFreeVariant) {
      baseClasses += " scale-95 opacity-90";
    }

    return baseClasses;
  };

  const freeWarning = getFreeWarning();

  return (
    <div
      onClick={onClick}
      className={cn(
        getCardClasses(),
        getBgGradient(),
        getBorderColor(),
        isFreeVariant ? "bg-opacity-80" : "bg-opacity-100"
      )}
    >
      {/* Popular Badge */}
      {isMostPopular && (
        <div className="absolute -top-3 inset-x-0 mx-auto w-max">
          <Badge className="bg-purple-600 text-white hover:bg-purple-700 px-3 py-1 font-medium shadow-sm">
            <Star className="h-3.5 w-3.5 mr-1 text-yellow-200" /> Most Popular
          </Badge>
        </div>
      )}
      
      {/* Limited Visibility Warning for Free Plan */}
      {isFreeVariant && (
        <div className="absolute -top-3 inset-x-0 mx-auto w-max">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 px-3 py-1 font-medium border border-amber-200">
                  <Info className="h-3.5 w-3.5 mr-1.5 text-amber-600" /> Limited Visibility Warning
                </Badge>
              </TooltipTrigger>
              <TooltipContent className="bg-white border border-amber-200 p-3 shadow-lg max-w-xs">
                <p className="text-amber-800">Free posts reach 80% fewer candidates. Use only if testing.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
      
      {/* Plan Name */}
      <h3 className={cn(
        "text-lg font-semibold mb-1",
        getNameTextColor(),
        isFreeVariant ? "text-gray-600" : ""
      )}>
        {isFreeVariant ? "🧊 Basic Plan (Limited Reach)" : pricing.name}
      </h3>
      
      {/* Plan Description */}
      {pricing.description && (
        <p className="text-sm text-gray-600 mb-2">{pricing.description}</p>
      )}
      
      {/* Vietnamese Description */}
      {subtitle && (
        <p className="text-xs text-gray-500 italic mb-4">{subtitle}</p>
      )}
      
      {/* Free Plan Subtitle */}
      {isFreeVariant && (
        <p className="text-xs text-gray-500 font-medium mb-3">Recommended only for testing the platform</p>
      )}
      
      {/* Trust Signal Tag */}
      {pricing.tag && (
        <p className={cn(
          "text-xs mb-3 mt-1 font-medium",
          pricing.id === 'gold' ? "text-amber-700" : 
          pricing.id === 'premium' ? "text-purple-700" : 
          pricing.id === 'standard' ? "text-blue-700" : "text-gray-700"
        )}>
          {pricing.tag}
        </p>
      )}
      
      {/* Price Display with Original Price */}
      <div className="mb-4 mt-3">
        <div className="flex items-baseline">
          {pricing.wasPrice && (
            <span className="text-sm line-through text-gray-500 mr-2">
              ${pricing.wasPrice.toFixed(2)}
            </span>
          )}
          <span className={cn(
            "text-2xl font-bold",
            getPriceTextColor()
          )}>
            ${pricing.price.toFixed(2)}
          </span>
          {pricing.price > 0 && (
            <span className="text-sm text-gray-500 ml-1">/month</span>
          )}
        </div>
      </div>
      
      {/* Features List */}
      <ul className="space-y-2.5">
        {pricing.features.map((feature, index) => (
          <li key={`${pricing.id}-feature-${index}`} className="flex items-start">
            <Check className={cn(
              "h-4 w-4 mr-2 mt-0.5 flex-shrink-0",
              getCheckColor()
            )} />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
        
        {/* Negative Features */}
        {negativeFeatures && negativeFeatures.map((feature, index) => (
          <li key={`${pricing.id}-negative-${index}`} className="flex items-start text-gray-500">
            <X className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-gray-400" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PricingTierCard;
