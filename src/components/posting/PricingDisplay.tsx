
import React from 'react';
import { format, addMonths } from 'date-fns';
import { CalendarIcon, CheckCircle2, RefreshCw, DollarSign, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface PricingDisplayProps {
  basePrice: number;
  duration: number;
  pricingId: string;
  autoRenew: boolean;
  originalPrice: number;
  finalPrice: number;
  discountPercentage: number;
}

const PricingDisplay: React.FC<PricingDisplayProps> = ({
  basePrice,
  duration,
  pricingId,
  autoRenew,
  originalPrice,
  finalPrice,
  discountPercentage
}) => {
  const futureDate = addMonths(new Date(), duration);
  const formattedDate = format(futureDate, 'MMM d, yyyy');
  const isFreePlan = pricingId === 'free';
  const discountAmount = Number((originalPrice - finalPrice).toFixed(2));
  
  return (
    <div className={cn(
      "rounded-lg border bg-white p-5 mt-6 shadow-sm",
      !isFreePlan && "bg-gradient-to-br from-white to-gray-50"
    )}>
      <h3 className="font-semibold text-md mb-4 flex items-center gap-2">
        <DollarSign className="h-5 w-5 text-purple-600" />
        Listing Summary
      </h3>
      
      <div className="space-y-4 text-sm">
        {isFreePlan ? (
          <div className="flex justify-between items-center p-3.5 bg-green-50 rounded-md border border-green-100">
            <div className="flex items-center">
              <CheckCircle2 className="h-5 w-5 mr-2.5 text-green-500" />
              <span className="font-medium">Free listing</span>
            </div>
            <span className="font-medium">30 days</span>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center p-3.5 bg-gray-50 rounded-md border border-gray-100">
              <div className="flex items-center">
                <CheckCircle2 className="h-5 w-5 mr-2.5 text-green-500" />
                <span>Listing duration</span>
              </div>
              <span className="font-medium">{duration} {duration === 1 ? 'month' : 'months'}</span>
            </div>
            
            <div className="flex justify-between items-center p-3.5 bg-gray-50 rounded-md border border-gray-100">
              <div className="flex items-center">
                <CalendarIcon className="h-5 w-5 mr-2.5 text-blue-500" />
                <span>Expires on</span>
              </div>
              <span className="font-medium">{formattedDate}</span>
            </div>
            
            {autoRenew && (
              <div className="flex justify-between items-center p-3.5 bg-blue-50 rounded-md border border-blue-100">
                <div className="flex items-center">
                  <RefreshCw className="h-5 w-5 mr-2.5 text-blue-500" />
                  <span>Auto-renew</span>
                </div>
                <span className="font-medium">Enabled</span>
              </div>
            )}
            
            <div className="border-t pt-4 mt-4 space-y-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Base price (${basePrice.toFixed(2)}/month × {duration})</span>
                <span>${originalPrice.toFixed(2)}</span>
              </div>
              
              {discountPercentage > 0 && (
                <div className="flex justify-between items-center text-green-600 mb-2">
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 mr-2" />
                    <span>Discount ({discountPercentage}%)</span>
                  </div>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center font-bold text-lg pt-3 border-t border-dashed">
                <span>Total</span>
                <div className="flex flex-col items-end">
                  {discountPercentage > 0 && (
                    <span className="text-sm line-through text-gray-500 font-normal">${originalPrice.toFixed(2)}</span>
                  )}
                  <span>${finalPrice.toFixed(2)}</span>
                </div>
              </div>
              
              {discountPercentage > 0 && (
                <div className="mt-3">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100 px-2.5 py-1">
                    You Save ${discountAmount.toFixed(2)} ({discountPercentage}%)
                  </Badge>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PricingDisplay;
