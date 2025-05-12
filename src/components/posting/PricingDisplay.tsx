
import React from 'react';
import { format, addMonths } from 'date-fns';
import { CalendarIcon, RefreshCw, CreditCard, Tag, Sparkles, Check, Info, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  
  const getPricingTitle = () => {
    switch(pricingId) {
      case 'standard': return 'Standard';
      case 'premium': return 'Premium';
      case 'gold': return 'Featured';
      case 'free': return 'Basic (Limited Reach)';
      default: return 'Selected Plan';
    }
  };
  
  return (
    <div className={cn(
      "rounded-lg border p-6 mt-6 shadow-md",
      !isFreePlan ? "bg-gradient-to-br from-white to-gray-50" : "bg-gray-50"
    )}>
      <h3 className="font-semibold text-md mb-5 flex items-center gap-2 text-purple-800">
        <Sparkles className="h-5 w-5 text-purple-600" />
        Listing Summary
      </h3>
      
      <div className="space-y-5 text-sm">
        {isFreePlan ? (
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-md border border-gray-200">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-3 text-amber-500" />
              <span className="font-medium text-gray-700">Basic - Limited Reach</span>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="font-medium flex items-center">
                    30 days
                    <Info className="h-4 w-4 ml-1 text-gray-400" />
                  </span>
                </TooltipTrigger>
                <TooltipContent className="p-2">
                  <p className="text-sm">Free listings have limited visibility</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center p-4 bg-white rounded-md border border-gray-100 shadow-sm">
              <div className="flex items-center">
                <Sparkles className="h-5 w-5 mr-3 text-purple-500" />
                <span className="font-medium">{getPricingTitle()} Plan</span>
              </div>
              <span className="font-medium">${basePrice.toFixed(2)}/month</span>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-white rounded-md border border-gray-100 shadow-sm">
              <div className="flex items-center">
                <CalendarIcon className="h-5 w-5 mr-3 text-blue-500" />
                <span>Duration</span>
              </div>
              <span className="font-medium">{duration} {duration === 1 ? 'month' : 'months'}</span>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-white rounded-md border border-gray-100 shadow-sm">
              <div className="flex items-center">
                <CalendarIcon className="h-5 w-5 mr-3 text-blue-500" />
                <span>Expires on</span>
              </div>
              <span className="font-medium">{formattedDate}</span>
            </div>
            
            {autoRenew && (
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-md border border-blue-100">
                <div className="flex items-center">
                  <RefreshCw className="h-5 w-5 mr-3 text-blue-500" />
                  <span>Auto-renew</span>
                </div>
                <span className="font-medium">Enabled</span>
              </div>
            )}
            
            <div className="border-t pt-5 mt-5 space-y-3.5">
              <div className="flex justify-between items-center text-gray-700">
                <span>Base price (${basePrice.toFixed(2)}/month × {duration})</span>
                <span>${originalPrice.toFixed(2)}</span>
              </div>
              
              {discountPercentage > 0 && (
                <div className="flex justify-between items-center text-green-600">
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 mr-2" />
                    <span>Discount ({discountPercentage}%)</span>
                  </div>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center font-bold text-lg pt-4 border-t border-dashed mt-2">
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-purple-700" />
                  <span>Total</span>
                </div>
                <div className="flex flex-col items-end">
                  {discountPercentage > 0 && (
                    <span className="text-sm line-through text-gray-500 font-normal">${originalPrice.toFixed(2)}</span>
                  )}
                  <span className="text-purple-800">${finalPrice.toFixed(2)}</span>
                </div>
              </div>
              
              {discountPercentage > 0 && (
                <div className="mt-4">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100 px-3 py-1.5 font-semibold">
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
