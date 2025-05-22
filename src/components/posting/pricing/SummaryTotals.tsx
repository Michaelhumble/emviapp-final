
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { calculateTotalPrice, getPlanByTier, DURATION_DISCOUNTS } from '@/utils/posting/pricingConfig';
import { formatCurrency } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface SummaryTotalsProps {
  selectedTier: string;
  durationMonths: number;
  autoRenew: boolean;
  isFirstPost?: boolean;
}

export const SummaryTotals: React.FC<SummaryTotalsProps> = ({ 
  selectedTier, 
  durationMonths,
  autoRenew,
  isFirstPost = false
}) => {
  // Get plan details
  const plan = getPlanByTier(selectedTier);
  
  // Skip if no plan found or first post (free)
  if (!plan || (isFirstPost && selectedTier !== 'diamond')) {
    return (
      <Card className="border-dashed mt-4">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-lg font-medium">Your first posting is free!</h3>
            <p className="text-sm text-muted-foreground">
              Future listings will follow our standard pricing.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Calculate pricing
  const { originalPrice, finalPrice, discountPercentage, savings } = 
    calculateTotalPrice(selectedTier, durationMonths, autoRenew);
  
  // Convert to string for lookup to fix the TS error
  const durationKey = String(durationMonths);
  const hasDurationDiscount = durationKey in DURATION_DISCOUNTS && 
                              DURATION_DISCOUNTS[durationKey as keyof typeof DURATION_DISCOUNTS] > 0;
  
  return (
    <Card className="mt-4">
      <CardContent className="pt-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm">Selected Plan</span>
            <span className="font-medium">{plan.name}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm">Duration</span>
            <span>{durationMonths} month{durationMonths > 1 ? 's' : ''}</span>
          </div>
          
          {hasDurationDiscount && (
            <div className="flex justify-between items-center text-green-600">
              <span className="text-sm">Duration Discount</span>
              <span>-{DURATION_DISCOUNTS[durationKey as keyof typeof DURATION_DISCOUNTS]}%</span>
            </div>
          )}
          
          {autoRenew && (
            <div className="flex justify-between items-center text-green-600">
              <span className="text-sm">Auto-Renew Discount</span>
              <span>-5%</span>
            </div>
          )}
          
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">Subtotal</span>
              <div>
                {discountPercentage > 0 && (
                  <span className="line-through text-gray-500 mr-2">
                    {formatCurrency(originalPrice)}
                  </span>
                )}
                <span className="font-medium">{formatCurrency(finalPrice)}</span>
              </div>
            </div>
            
            {savings > 0 && (
              <div className="flex justify-end mt-1">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  You save {formatCurrency(savings)}
                </Badge>
              </div>
            )}
          </div>
          
          <div className="text-xs text-muted-foreground mt-4">
            {autoRenew ? (
              <p>Your subscription will automatically renew every {durationMonths} month{durationMonths > 1 ? 's' : ''}. You can cancel anytime.</p>
            ) : (
              <p>Your listing will expire after {durationMonths} month{durationMonths > 1 ? 's' : ''} unless manually renewed.</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SummaryTotals;
