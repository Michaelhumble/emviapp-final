import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Flame, Star, Diamond } from 'lucide-react';
import { cn } from '@/lib/utils';
import PricingMicroCopy from './PricingMicroCopy';

interface PricingDisplayProps {
  pricingId: string;
  basePrice: number;
  duration: number;
  autoRenew: boolean;
  originalPrice: number;
  finalPrice: number;
  discountPercentage: number;
}

const PricingDisplay: React.FC<PricingDisplayProps> = ({
  pricingId,
  basePrice,
  duration,
  autoRenew,
  originalPrice,
  finalPrice,
  discountPercentage,
}) => {
  const isFreePlan = pricingId === 'free';
  
  const formatCurrency = (value: number): string => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };
  
  // Function to get the appropriate icon
  const getPlanIcon = () => {
    switch (pricingId) {
      case 'standard':
        return <Flame size={24} className="text-blue-600" />;
      case 'premium':
        return <Diamond size={24} className="text-purple-600" />;
      case 'gold':
        return <Star size={24} className="text-amber-600" />;
      default:
        return null;
    }
  };
  
  // Function to get the plan name
  const getPlanName = () => {
    switch (pricingId) {
      case 'standard':
        return "Standard";
      case 'premium':
        return "Premium Listing";
      case 'gold':
        return "Gold Featured";
      case 'free':
        return "Basic Plan";
      default:
        return "Selected Plan";
    }
  };
  
  // Get gradient background for different plans
  const getGradientBg = () => {
    if (isFreePlan) return "bg-gray-50";
    
    switch (pricingId) {
      case 'standard':
        return "bg-gradient-to-br from-white to-blue-50";
      case 'premium':
        return "bg-gradient-to-br from-purple-50 to-purple-100/70";
      case 'gold':
        return "bg-gradient-to-br from-amber-50 to-amber-100/70";
      default:
        return "bg-white";
    }
  };

  return (
    <Card className={cn(
      "overflow-hidden",
      getGradientBg(),
      pricingId === 'standard' ? "border-blue-200" :
      pricingId === 'premium' ? "border-purple-200" :
      pricingId === 'gold' ? "border-amber-200" :
      "border-gray-200"
    )}>
      <CardHeader 
        className={cn(
          "p-5 space-y-1",
          pricingId === 'standard' ? "bg-blue-100/50 border-b border-blue-200" :
          pricingId === 'premium' ? "bg-purple-100/50 border-b border-purple-200" :
          pricingId === 'gold' ? "bg-amber-100/50 border-b border-amber-200" :
          "bg-gray-100 border-b border-gray-200"
        )}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {getPlanIcon()}
            <CardTitle className={cn(
              "font-playfair",
              pricingId === 'standard' ? "text-blue-800" :
              pricingId === 'premium' ? "text-purple-800" :
              pricingId === 'gold' ? "text-amber-800" :
              "text-gray-800"
            )}>
              {getPlanName()}
            </CardTitle>
          </div>
          {!isFreePlan && (
            <span className="px-2 py-1 text-xs rounded-full bg-opacity-20 font-medium bg-white">
              {duration} {duration === 1 ? 'month' : 'months'}
            </span>
          )}
        </div>
        <CardDescription className={cn(
          "text-sm",
          pricingId === 'standard' ? "text-blue-700" :
          pricingId === 'premium' ? "text-purple-700" :
          pricingId === 'gold' ? "text-amber-700" :
          "text-gray-600"
        )}>
          {isFreePlan ? "Limited visibility posting" : "Premium job placement"}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-5 space-y-4">
        {isFreePlan ? (
          <div className="text-center py-2">
            <p className="text-2xl font-medium mb-1">Free</p>
            <p className="text-sm text-gray-500">For first-time users only</p>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Base price</span>
                <span className="font-medium">{formatCurrency(basePrice)}/mo</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Duration</span>
                <span className="font-medium">{duration} {duration === 1 ? 'month' : 'months'}</span>
              </div>

              {discountPercentage > 0 && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatCurrency(originalPrice)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-green-700">
                    <span className="text-sm font-medium">Discount ({discountPercentage}%)</span>
                    <span className="font-medium">-{formatCurrency(originalPrice - finalPrice)}</span>
                  </div>
                </>
              )}
              
              <div className="pt-2 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">Total</span>
                  <span className="text-xl font-bold">
                    {formatCurrency(finalPrice)}
                  </span>
                </div>
              </div>

              {autoRenew && (
                <div className="pt-3 text-xs text-gray-600">
                  <p className="flex items-center">
                    <RefreshCw className="h-3.5 w-3.5 mr-1 text-green-600" />
                    Auto-renewal is enabled. You can cancel anytime.
                  </p>
                </div>
              )}
            </div>
          </>
        )}
        
        {/* Add the dynamic microcopy */}
        <PricingMicroCopy selectedPlan={pricingId} />
      </CardContent>
    </Card>
  );
};

// Import RefreshCw from lucide-react
import { RefreshCw } from 'lucide-react';

export default PricingDisplay;
