
import React from 'react';
import { format, addMonths } from 'date-fns';
import { CalendarIcon, CheckCircle2, RefreshCw } from 'lucide-react';

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
  
  return (
    <div className="rounded-lg border bg-card p-4 mt-6">
      <h3 className="font-semibold text-md mb-4">Listing Summary</h3>
      
      <div className="space-y-3 text-sm">
        {isFreePlan ? (
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
              <span>Free listing</span>
            </div>
            <span>30 days</span>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                <span>Listing duration</span>
              </div>
              <span>{duration} {duration === 1 ? 'month' : 'months'}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-2 text-slate-500" />
                <span>Expires on</span>
              </div>
              <span>{formattedDate}</span>
            </div>
            
            {autoRenew && (
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <RefreshCw className="h-4 w-4 mr-2 text-blue-500" />
                  <span>Auto-renew</span>
                </div>
                <span>Enabled</span>
              </div>
            )}
            
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between items-center">
                <span>Standard price</span>
                <span>${originalPrice.toFixed(2)}</span>
              </div>
              
              {discountPercentage > 0 && (
                <div className="flex justify-between items-center text-green-600">
                  <span>Discount ({discountPercentage}%)</span>
                  <span>-${(originalPrice - finalPrice).toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center font-semibold mt-1">
                <span>Total</span>
                <span>${finalPrice.toFixed(2)}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PricingDisplay;
