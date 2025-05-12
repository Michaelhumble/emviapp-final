
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Check, CreditCard, Info } from 'lucide-react';

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
  discountPercentage,
}) => {
  const isFreePlan = pricingId === 'free';

  return (
    <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 border-b">
        <h3 className="font-medium text-lg text-purple-800">Payment Summary</h3>
      </div>
      
      <div className="p-4 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start">
            <CreditCard className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
            <div>
              <span className="font-medium">
                {isFreePlan ? 'Free Basic Plan' : `${duration} Month${duration > 1 ? 's' : ''} Plan`}
              </span>
              {!isFreePlan && (
                <div className="text-sm text-gray-600">
                  ${basePrice.toFixed(2)}/mo × {duration} month{duration > 1 ? 's' : ''}
                </div>
              )}
            </div>
          </div>
          <div className="font-medium">
            {isFreePlan ? '$0.00' : `$${originalPrice.toFixed(2)}`}
          </div>
        </div>
        
        {!isFreePlan && discountPercentage > 0 && (
          <div className="flex items-start justify-between text-green-700">
            <div className="flex items-start">
              <Check className="h-5 w-5 mr-3 mt-0.5" />
              <div>
                <span className="font-medium">{duration}-month discount</span>
                <div className="text-sm">
                  Save {discountPercentage}% on {duration}-month plan
                </div>
              </div>
            </div>
            <div className="font-medium">-${(originalPrice - finalPrice).toFixed(2)}</div>
          </div>
        )}

        {autoRenew && !isFreePlan && (
          <div className="flex items-start">
            <CalendarDays className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
            <div className="text-sm text-blue-700">
              <span className="font-medium">Auto-renew enabled</span>
              <p className="text-blue-600 text-xs mt-0.5">
                Your subscription will automatically renew every {duration} month{duration > 1 ? 's' : ''}.
                You can cancel at any time.
              </p>
            </div>
          </div>
        )}
        
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-semibold text-gray-800">Total</span>
            <span className="text-xl font-bold text-purple-800">
              ${isFreePlan ? '0.00' : finalPrice.toFixed(2)}
            </span>
          </div>
          
          {!isFreePlan && (
            <div className="flex items-start mt-2 text-sm text-gray-600">
              <Info className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5 text-blue-500" />
              <div>
                {autoRenew ? (
                  <p>You'll be charged ${finalPrice.toFixed(2)} now, then ${finalPrice.toFixed(2)} every {duration} month{duration > 1 ? 's' : ''}.</p>
                ) : (
                  <p>One-time payment for {duration} month{duration > 1 ? 's' : ''} of service.</p>
                )}
              </div>
            </div>
          )}
          
          {!isFreePlan && discountPercentage > 0 && (
            <Badge variant="secondary" className="mt-2 bg-green-100 text-green-800 hover:bg-green-200">
              You save ${(originalPrice - finalPrice).toFixed(2)} ({discountPercentage}%)
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default PricingDisplay;
