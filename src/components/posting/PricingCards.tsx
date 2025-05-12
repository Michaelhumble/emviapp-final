
import React from 'react';
import { JobPricingOption } from '@/utils/posting/types';
import { Card } from '@/components/ui/card';
import PricingTierCard from '@/components/posting/PricingTierCard';
import { cn } from '@/lib/utils';
import { Crown, FlameIcon, Star, Diamond } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PricingCardsProps {
  pricingOptions: JobPricingOption[];
  selectedPricing: string;
  onChange: (pricingId: string) => void;
  selectedDuration: number;
  onDurationChange: (duration: number) => void;
}

const DURATION_OPTIONS = [
  { months: 1, label: '1 Month', discount: 0 },
  { months: 3, label: '3 Months', discount: 10 },
  { months: 6, label: '6 Months', discount: 20 },
  { months: 12, label: '12 Months', discount: 30, isBestValue: true },
];

const PricingCards: React.FC<PricingCardsProps> = ({
  pricingOptions,
  selectedPricing,
  onChange,
  selectedDuration,
  onDurationChange,
}) => {
  // Filter out any hidden options
  const visiblePricingOptions = pricingOptions.filter(option => !option.hidden);
  
  // Sort options by price - free at the end
  const sortedOptions = [...visiblePricingOptions].sort((a, b) => {
    if (a.id === 'free') return 1;
    if (b.id === 'free') return -1;
    return a.price - b.price;
  });

  // Find free plan
  const freePlan = sortedOptions.find(option => option.price === 0);
  // Find paid plans
  const paidPlans = sortedOptions.filter(option => option.price > 0).sort((a, b) => a.price - b.price);

  // Helper function to get badge content
  const getBadgeContent = (pricingId: string) => {
    switch(pricingId) {
      case 'standard':
        return (
          <div className="flex items-center gap-1.5 text-amber-600">
            <FlameIcon size={14} className="text-amber-500" />
            <span className="font-medium">Chosen by over 8,200 salons this year</span>
          </div>
        );
      case 'premium':
        return (
          <div className="flex items-center gap-1.5 text-purple-600">
            <Diamond size={14} className="text-purple-500" />
            <span className="font-medium">Most loved by salons</span>
          </div>
        );
      case 'gold':
        return (
          <div className="flex items-center gap-1.5 text-amber-700">
            <Star size={14} className="text-amber-500" />
            <span className="font-medium">Built to help you grow faster</span>
          </div>
        );
      case 'free':
      default:
        return (
          <div className="flex items-center gap-1.5 text-gray-600">
            <span className="text-lg">✨</span>
            <span className="font-medium">Free for first job post</span>
          </div>
        );
    }
  };

  // Helper function to get the card design
  const getCardClasses = (pricingId: string, isSelected: boolean) => {
    const baseClasses = "transition-all duration-300 overflow-hidden";
    
    switch(pricingId) {
      case 'standard':
        return cn(
          baseClasses,
          "bg-white border-blue-400",
          isSelected ? "border-[2.5px] shadow-lg" : "border hover:border-blue-500"
        );
      case 'premium':
        return cn(
          baseClasses,
          "bg-gradient-to-b from-[#F5F3FF] to-[#EDE7FF]",
          isSelected 
            ? "ring-2 ring-purple-400 ring-offset-2 shadow-xl" 
            : "border border-purple-200 hover:ring-2 hover:ring-purple-300 hover:ring-offset-2"
        );
      case 'gold':
        return cn(
          baseClasses,
          "bg-gradient-to-b from-[#FFF6E5] to-[#FFE5A6]",
          isSelected 
            ? "ring-2 ring-yellow-400 ring-offset-2 shadow-xl" 
            : "border border-yellow-200 hover:ring-2 hover:ring-yellow-300 hover:ring-offset-2"
        );
      case 'free':
      default:
        return cn(
          baseClasses,
          "bg-gray-50 border-gray-200",
          isSelected ? "border-[2px] shadow-md" : "border hover:border-gray-300"
        );
    }
  };
  
  // Helper function to format plan title
  const getPlanTitle = (pricing: JobPricingOption) => {
    switch(pricing.id) {
      case 'standard':
        return "Standard — $9.99/month";
      case 'premium':
        return "Premium Listing — $24.99/month";
      case 'gold':
        return "Gold Featured — $14.99/month";
      case 'free':
        return "Basic Plan — Free (new users only)";
      default:
        return `${pricing.name} — $${pricing.price.toFixed(2)}/month`;
    }
  };

  // Helper function to get plan subtitle
  const getPlanSubtitle = (pricing: JobPricingOption) => {
    switch(pricing.id) {
      case 'standard':
        return "Increased visibility. Better search placement.";
      case 'premium':
        return "Top visibility. Highlighted in results. Matched faster.";
      case 'gold':
        return "Homepage presence. Priority listing exposure.";
      case 'free':
        return "No credit card required. Great for trying EmviApp.";
      default:
        return pricing.description;
    }
  };

  return (
    <div className="space-y-8">
      {/* Pricing Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Paid Plans First */}
        {paidPlans.map((pricing) => (
          <div 
            key={pricing.id} 
            className={cn(
              "transition-all duration-300",
              pricing.id === 'premium' ? "md:transform md:scale-105 md:z-10" : ""
            )}
          >
            <Card 
              className={getCardClasses(pricing.id, selectedPricing === pricing.id)}
              onClick={() => onChange(pricing.id)}
            >
              <div className="p-6">
                {/* Badge */}
                <div className="mb-3">
                  <Badge 
                    variant="outline"
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium",
                      pricing.id === 'standard' ? "bg-amber-50 border-amber-200" :
                      pricing.id === 'premium' ? "bg-purple-50 border-purple-200" :
                      "bg-amber-50 border-amber-200"
                    )}
                  >
                    {getBadgeContent(pricing.id)}
                  </Badge>
                </div>
                
                {/* Title */}
                <h3 className={cn(
                  "font-playfair text-xl font-bold mb-2",
                  pricing.id === 'standard' ? "text-blue-800" :
                  pricing.id === 'premium' ? "text-purple-800" :
                  "text-amber-800"
                )}>
                  {getPlanTitle(pricing)}
                </h3>
                
                {/* Subtitle */}
                <p className={cn(
                  "text-sm mb-5",
                  pricing.id === 'standard' ? "text-blue-600" :
                  pricing.id === 'premium' ? "text-purple-600" :
                  "text-amber-700"
                )}>
                  {getPlanSubtitle(pricing)}
                </p>
                
                {/* Features */}
                <div className="space-y-3">
                  {pricing.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start">
                      <span className="text-green-500 mr-2 mt-0.5">✅</span>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                  
                  {pricing.id === 'premium' && (
                    <div className="flex items-start">
                      <span className="text-green-500 mr-2 mt-0.5">✅</span>
                      <span className="text-sm">Faster candidate matching</span>
                    </div>
                  )}
                  
                  {pricing.id === 'gold' && (
                    <>
                      <div className="flex items-start">
                        <span className="text-green-500 mr-2 mt-0.5">✅</span>
                        <span className="text-sm">Homepage feature</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-500 mr-2 mt-0.5">✅</span>
                        <span className="text-sm">Priority support</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Selected Indicator */}
              {selectedPricing === pricing.id && (
                <div className={cn(
                  "px-6 py-2 text-sm font-medium text-center",
                  pricing.id === 'standard' ? "bg-blue-100 text-blue-800" :
                  pricing.id === 'premium' ? "bg-purple-100 text-purple-800" :
                  "bg-amber-100 text-amber-800"
                )}>
                  Selected Plan
                </div>
              )}
            </Card>
          </div>
        ))}
      </div>

      {/* Duration Selector - Moved below pricing cards */}
      <Card className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200">
        <div className="flex flex-col space-y-3">
          <h3 className="text-base font-medium text-center sm:text-left">Choose Duration & Save:</h3>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {DURATION_OPTIONS.map((option) => (
              <button
                key={option.months}
                onClick={() => onDurationChange(option.months)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all border relative",
                  selectedDuration === option.months
                    ? option.months === 12 
                      ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white border-amber-600 shadow-md" 
                      : "bg-purple-600 text-white border-purple-600 shadow-md"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                )}
              >
                <span className="flex items-center">
                  {option.isBestValue && selectedDuration === option.months && (
                    <Crown className="h-4 w-4 mr-1.5 text-amber-200" />
                  )}
                  <span>{option.label}</span>
                  {option.discount > 0 && (
                    <span className={cn(
                      "ml-2 px-2 py-0.5 rounded-full text-xs font-semibold",
                      selectedDuration === option.months
                        ? option.months === 12 
                          ? "bg-amber-400 text-amber-900" 
                          : "bg-purple-500 text-white"
                        : "bg-green-100 text-green-800"
                    )}>
                      {option.isBestValue ? "👑 Best Deal" : ""} Save {option.discount}%
                    </span>
                  )}
                </span>
              </button>
            ))}
          </div>
          <p className="text-xs text-center text-gray-500 italic mt-2">
            You'll save nearly 4 months by going annual. That's $35.96 back in your pocket.
          </p>
        </div>
      </Card>

      {/* Free Plan - Separated and visually diminished */}
      {freePlan && (
        <div className="mt-8 max-w-lg mx-auto">
          <Card 
            className={getCardClasses('free', selectedPricing === 'free')}
            onClick={() => onChange('free')}
          >
            <div className="p-6">
              {/* Badge */}
              <div className="mb-3 flex justify-center">
                <Badge 
                  variant="outline"
                  className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 border-gray-300"
                >
                  {getBadgeContent('free')}
                </Badge>
              </div>
              
              {/* Title */}
              <h3 className="font-medium text-center text-lg mb-2">
                {getPlanTitle(freePlan)}
              </h3>
              
              {/* Subtitle */}
              <p className="text-sm text-center text-gray-600 mb-5">
                {getPlanSubtitle(freePlan)}
              </p>
              
              {/* Features */}
              <div className="space-y-2">
                <div className="flex items-center justify-center">
                  <span className="text-green-500 mr-2">✅</span>
                  <span className="text-sm">Limited reach</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-red-500 mr-2">🚫</span>
                  <span className="text-sm">No top placement</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-red-500 mr-2">🚫</span>
                  <span className="text-sm">No social promotion</span>
                </div>
              </div>
            </div>
            
            {/* Selected Indicator */}
            {selectedPricing === 'free' && (
              <div className="px-6 py-2 bg-gray-200 text-gray-800 text-sm font-medium text-center">
                Selected Plan
              </div>
            )}
          </Card>
        </div>
      )}

      {/* Legal and trust copy */}
      <p className="text-center text-xs text-neutral-400 mt-10">
        🔒 We never store your card. All payments are securely handled by Stripe.<br/>
        🌞 Inspired by Sunshine ☀️ — with love for artists, salons, and dreamers.
      </p>
    </div>
  );
};

export default PricingCards;
