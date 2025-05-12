
import React from 'react';
import { Check, X, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { JobPricingOption } from '@/utils/posting/types';

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
    if (isFreeVariant) return 'bg-gray-50 hover:bg-gray-50/80';
    if (pricing.id === 'gold') return 'bg-gradient-to-b from-amber-50 to-amber-100/60';
    if (pricing.id === 'premium') return 'bg-gradient-to-b from-purple-50 to-purple-100/60';
    if (pricing.id === 'standard') return 'bg-gradient-to-b from-blue-50/80 to-blue-100/50 hover:from-blue-50 hover:to-blue-100/70';
    return 'bg-gradient-to-b from-white to-gray-50';
  };

  const getBorderColor = () => {
    if (isSelected) {
      if (pricing.id === 'gold') return 'border-amber-400 ring-2 ring-amber-200';
      if (pricing.id === 'premium') return 'border-purple-400 ring-2 ring-purple-200';
      if (pricing.id === 'standard') return 'border-blue-400 ring-2 ring-blue-200';
      return 'border-gray-300 ring-2 ring-gray-200';
    }
    if (isFreeVariant) return 'border-gray-200';
    if (pricing.id === 'gold') return 'border-amber-200';
    if (pricing.id === 'premium') return 'border-purple-200';
    if (pricing.id === 'standard') return 'border-blue-200';
    return 'border-gray-200';
  };

  const getNameTextColor = () => {
    if (pricing.id === 'gold') return 'text-amber-700';
    if (pricing.id === 'premium') return 'text-purple-700';
    if (pricing.id === 'standard') return 'text-blue-700';
    return 'text-gray-700';
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
    return 'text-gray-400';
  };

  const getCardShadow = () => {
    if (isFreeVariant) return '';
    if (isSelected) return 'shadow-lg';
    return 'shadow-md hover:shadow-lg';
  };

  const getHoverEffect = () => {
    if (isFreeVariant) return '';
    return 'transition-all duration-300 hover:translate-y-[-4px]';
  };

  const getPricingDisplayClass = () => {
    if (isFreeVariant) {
      return 'text-gray-600 font-medium';
    }
    return 'text-3xl font-bold';
  };

  const getFeatureTextClass = () => {
    if (isFreeVariant) {
      return 'text-sm text-gray-500';
    }
    return 'text-sm';
  };

  const renderPlanName = () => {
    if (pricing.id === 'free') {
      return '🧊 Basic Plan (Limited Reach)';
    }
    return pricing.name;
  };

  const renderSubtitle = () => {
    if (pricing.id === 'free') {
      return 'Recommended only for testing the platform.';
    }
    return subtitle || pricing.description;
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "relative rounded-xl border p-5 cursor-pointer",
        getBgGradient(),
        getBorderColor(),
        getCardShadow(),
        getHoverEffect(),
        isFreeVariant ? "transform scale-95 opacity-90" : "transform scale-100",
        isSelected ? "z-10" : "z-0"
      )}
    >
      {/* Popular Badge */}
      {isMostPopular && (
        <div className="absolute -top-3 inset-x-0 mx-auto w-max">
          <Badge className="bg-purple-600 text-white hover:bg-purple-700 px-3 py-1 font-medium shadow-sm">
            <Star className="h-3.5 w-3.5 mr-1" /> Most Popular
          </Badge>
        </div>
      )}
      
      {/* Plan Name */}
      <h3 className={cn(
        "text-lg font-semibold mb-1",
        getNameTextColor(),
        isFreeVariant ? "text-base" : "text-lg"
      )}>
        {renderPlanName()}
      </h3>
      
      {/* Plan Description */}
      {renderSubtitle() && (
        <p className={cn(
          "text-sm mb-2",
          isFreeVariant ? "text-gray-500" : "text-gray-600"
        )}>
          {renderSubtitle()}
        </p>
      )}
      
      {/* Trust Signal Tag */}
      {pricing.tag && !isFreeVariant && (
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
      <div className={cn("mb-4 mt-3", isFreeVariant ? "mt-2" : "mt-4")}>
        <div className={cn("flex items-baseline", isFreeVariant ? "" : "space-x-2")}>
          {pricing.wasPrice && !isFreeVariant && (
            <span className="text-sm line-through text-gray-400">
              ${pricing.wasPrice.toFixed(2)}
            </span>
          )}
          <span className={cn(
            getPricingDisplayClass(),
            getPriceTextColor()
          )}>
            {pricing.price === 0 ? "Free" : `$${pricing.price.toFixed(2)}`}
          </span>
          {pricing.price > 0 && (
            <span className="text-sm text-gray-500 ml-1">/month</span>
          )}
        </div>
      </div>
      
      {/* Features List */}
      <ul className={cn(
        "space-y-2", 
        isFreeVariant ? "opacity-80" : "opacity-100"
      )}>
        {pricing.features.map((feature, index) => (
          <li key={`${pricing.id}-feature-${index}`} className="flex items-start">
            <Check className={cn(
              "h-4 w-4 mr-2 mt-0.5 flex-shrink-0",
              getCheckColor()
            )} />
            <span className={getFeatureTextClass()}>{feature}</span>
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
