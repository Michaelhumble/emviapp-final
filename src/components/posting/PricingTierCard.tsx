
import React from 'react';
import { JobPricingOption } from '@/utils/posting/types';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';

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
  negativeFeatures = [],
}) => {
  const isPremiumPlan = pricing.id === 'premium';
  const isGoldPlan = pricing.id === 'gold';
  const isStandardPlan = pricing.id === 'standard';
  const isFreePlan = pricing.id === 'free';

  return (
    <Card
      className={cn(
        "relative overflow-hidden border-2 transition-all",
        isSelected
          ? isFreeVariant
            ? "border-gray-300 shadow-md"
            : isPremiumPlan
              ? "border-purple-500 shadow-lg"
              : isGoldPlan
                ? "border-amber-500 shadow-lg"
                : "border-blue-500 shadow-lg"
          : isFreeVariant
            ? "border-gray-200 hover:border-gray-300"
            : "border-gray-200 hover:border-gray-300",
        isFreeVariant
          ? "bg-gray-50"
          : isPremiumPlan
            ? "bg-gradient-to-br from-white via-purple-50 to-white"
            : isGoldPlan
              ? "bg-gradient-to-br from-white via-amber-50 to-white"
              : isStandardPlan
                ? "bg-gradient-to-br from-white via-blue-50 to-white"
                : "bg-white"
      )}
    >
      {/* Popular Tag */}
      {isMostPopular && !isFreeVariant && (
        <div className="absolute -top-3 left-0 right-0 text-center">
          <div className="inline-block bg-purple-600 text-white text-xs font-bold py-1 px-3 rounded-full shadow-md">
            MOST POPULAR
          </div>
        </div>
      )}

      {/* Tier Tag */}
      {isGoldPlan && !isFreeVariant && (
        <div className="absolute -top-3 left-0 right-0 text-center">
          <div className="inline-block bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold py-1 px-3 rounded-full shadow-md">
            FASTEST RESULTS
          </div>
        </div>
      )}

      <div 
        onClick={onClick}
        className={cn(
          "p-5 cursor-pointer h-full flex flex-col",
          isSelected && !isFreeVariant ? "ring-2 ring-inset ring-offset-1" : "",
          isFreeVariant ? "ring-0" : ""
        )}
      >
        {/* Header */}
        <div className="text-center mb-4">
          <h3 className={cn(
            "text-xl font-bold mb-1",
            isFreeVariant ? "text-gray-600" : "text-gray-800"
          )}>
            {pricing.name}
          </h3>
          {subtitle && (
            <p className="text-xs text-gray-500 italic">{subtitle}</p>
          )}
        </div>

        {/* Price */}
        <div className={cn(
          "text-center mb-4",
          isFreeVariant ? "text-gray-600" : "text-gray-900"
        )}>
          {pricing.wasPrice && !isFreeVariant && (
            <div className="text-sm text-gray-400 line-through">
              ${pricing.wasPrice}
            </div>
          )}
          <div className="flex items-center justify-center">
            <span className="text-3xl font-bold">
              {pricing.price > 0 ? `$${pricing.price}` : 'Free'}
            </span>
            {pricing.price > 0 && <span className="text-sm ml-1">/mo</span>}
          </div>
        </div>

        {/* Social Proof Tag */}
        {pricing.tag && !isFreeVariant && (
          <div className="mb-4 text-center">
            <div className={cn(
              "text-xs px-2 py-1.5 rounded-full text-center inline-block",
              isPremiumPlan 
                ? "bg-purple-100 text-purple-800"
                : isGoldPlan 
                  ? "bg-amber-100 text-amber-800"
                  : "bg-blue-100 text-blue-800"
            )}>
              {pricing.tag}
            </div>
          </div>
        )}

        {/* Features */}
        <div className="space-y-2 flex-grow mb-4">
          {pricing.features && pricing.features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <Check className={cn(
                "h-4 w-4 mr-2 mt-0.5 flex-shrink-0",
                isFreeVariant ? "text-gray-500" : "text-green-600"
              )} />
              <span className={cn(
                "text-sm",
                isFreeVariant ? "text-gray-600" : "text-gray-700"
              )}>
                {feature}
              </span>
            </div>
          ))}
          
          {/* Negative Features */}
          {negativeFeatures && negativeFeatures.map((feature, index) => (
            <div key={`neg-${index}`} className="flex items-start">
              <X className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-gray-400" />
              <span className="text-sm text-gray-500">{feature}</span>
            </div>
          ))}
        </div>

        {/* Select Button */}
        <div className="mt-auto pt-2">
          <button 
            onClick={onClick}
            type="button"
            className={cn(
              "w-full rounded-full py-2 px-4 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
              isSelected
                ? isFreeVariant
                  ? "bg-gray-500 text-white hover:bg-gray-600"
                  : isPremiumPlan
                    ? "bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500"
                    : isGoldPlan
                      ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 focus:ring-amber-500"
                      : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
                : isFreeVariant
                  ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-300"
            )}
          >
            {isSelected ? "Selected" : "Select Plan"}
          </button>
        </div>
      </div>
    </Card>
  );
};

export default PricingTierCard;
