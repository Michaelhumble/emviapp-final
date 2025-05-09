
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';
import { JobPricingOption, JobPricingTier } from '@/utils/posting/types';
import { formatCurrency } from '@/lib/utils';
import { DurationOption } from '@/types/pricing';

export interface PricingCardsProps {
  pricingOptions: JobPricingOption[];
  selectedPricing: string;
  onChange: (pricingId: string) => void;
  className?: string; // Added className prop to fix the TS error
  selectedDuration?: number; // Add duration support
  onDurationChange?: (months: number) => void;
}

// Duration options 
const durations: DurationOption[] = [
  { months: 1, label: '1 Month', vietnameseLabel: '1 tháng', discount: 0 },
  { months: 3, label: '3 Months', vietnameseLabel: '3 tháng', discount: 10 },
  { months: 6, label: '6 Months', vietnameseLabel: '6 tháng', discount: 20 },
  { months: 12, label: '12 Months', vietnameseLabel: '1 năm', discount: 30 }
];

const PricingCards: React.FC<PricingCardsProps> = ({ 
  pricingOptions, 
  selectedPricing, 
  onChange,
  className,
  selectedDuration = 1,
  onDurationChange
}) => {
  const calculateDiscountedPrice = (price: number, discountPercent: number) => {
    return price - (price * discountPercent / 100);
  };

  // Calculate total price based on duration and discount
  const getTotalPrice = (basePrice: number, months: number) => {
    const duration = durations.find(d => d.months === months);
    if (!duration) return basePrice * months;
    
    return calculateDiscountedPrice(basePrice * months, duration.discount);
  };

  // Show duration options for all tiers except free and diamond
  const shouldShowDurationOptions = (tier: JobPricingTier, id: string) => {
    return tier !== 'basic' && id !== 'diamond';
  };
  
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", className)}>
      {pricingOptions.map((option) => (
        <Card 
          key={option.id}
          className={cn(
            "flex flex-col transition-all duration-200 overflow-hidden",
            selectedPricing === option.id && "ring-2 ring-primary ring-offset-2",
            option.popular && "shadow-lg scale-[1.02]"
          )}
          onClick={() => onChange(option.id)}
        >
          <CardHeader className="pb-3">
            {option.tag && (
              <Badge 
                variant="outline" 
                className={cn(
                  "mb-2 whitespace-nowrap",
                  option.tier === 'premium' && "bg-orange-50 text-orange-600 border-orange-200",
                  option.tier === 'featured' && option.id === 'gold' && "bg-amber-50 text-amber-600 border-amber-200",
                  option.tier === 'featured' && option.id === 'diamond' && "bg-red-50 text-red-600 border-red-200",
                  option.tier === 'basic' && "bg-green-50 text-green-600 border-green-200"
                )}
              >
                {option.tag}
              </Badge>
            )}
            <CardTitle className="text-lg">
              {option.name}
            </CardTitle>
            <CardDescription className="line-clamp-2 h-10">
              {option.vietnameseDescription || option.description}
            </CardDescription>
            <div className="mt-2 space-y-1">
              <div className="flex items-baseline">
                {option.wasPrice && option.wasPrice > option.price && (
                  <span className="text-sm line-through text-red-500 mr-2">
                    ${option.wasPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-2xl font-bold">${option.price.toFixed(2)}</span>
                <span className="text-sm text-muted-foreground ml-1">/mo</span>
              </div>
              
              {shouldShowDurationOptions(option.tier, option.id) && onDurationChange && (
                <div className="pt-2">
                  <div className="flex flex-wrap justify-center gap-2">
                    {durations.map((duration) => (
                      <button
                        key={duration.months}
                        onClick={(e) => {
                          e.stopPropagation();
                          onDurationChange(duration.months);
                        }}
                        className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium transition-all",
                          selectedDuration === duration.months
                            ? "bg-purple-600 text-white"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                        )}
                        title={duration.discount > 0 ? `Save ${duration.discount}% when you commit longer 💰` : undefined}
                      >
                        {duration.label}
                        {duration.discount > 0 && (
                          <span className="ml-1 text-xs">-{duration.discount}%</span>
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="text-xs text-center text-muted-foreground mt-1">
                    {durations.find(d => d.months === selectedDuration)?.vietnameseLabel}
                  </div>
                  
                  {/* Show total price with discount */}
                  {selectedDuration > 1 && (
                    <div className="mt-2 text-center">
                      <div className="text-sm">
                        Total: <span className="font-medium">${getTotalPrice(option.price, selectedDuration).toFixed(2)}</span>
                      </div>
                      {selectedDuration > 1 && (
                        <div className="text-xs text-green-600">
                          Tiết kiệm: {durations.find(d => d.months === selectedDuration)?.discount}%
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="flex-grow">
            <ul className="space-y-2 text-sm">
              {option.features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          
          <CardFooter className="pt-2 pb-4 text-xs text-center bg-gray-50">
            <div className="w-full">
              {option.note ? (
                <p className="text-muted-foreground">{option.note}</p>
              ) : (
                <p className="text-muted-foreground">
                  🕒 Listings expire after 30 days. Auto-renew available.
                </p>
              )}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default PricingCards;
