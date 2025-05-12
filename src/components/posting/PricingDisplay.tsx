
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
  
  const getBorderColor = () => {
    switch(pricingId) {
      case 'standard': return 'border-blue-200';
      case 'premium': return 'border-purple-200';
      case 'gold': return 'border-amber-200';
      default: return 'border-gray-200';
    }
  };
  
  const getHeaderGradient = () => {
    switch(pricingId) {
      case 'standard': return 'bg-gradient-to-r from-blue-50 to-blue-100';
      case 'premium': return 'bg-gradient-to-r from-purple-50 to-purple-100';
      case 'gold': return 'bg-gradient-to-r from-amber-50 to-amber-100';
      default: return 'bg-gray-50';
    }
  };
  
  return (
    <div className={cn(
      "rounded-xl border p-0 shadow-sm overflow-hidden",
      getBorderColor(),
      !isFreePlan ? "bg-white" : "bg-gray-50"
    )}>
      <div className={cn(
        "p-5 border-b",
        getHeaderGradient()
      )}>
        <h3 className="font-semibold text-md mb-1 flex items-center gap-2 text-gray-800">
          <Sparkles className={cn(
            "h-5 w-5",
            pricingId === 'standard' ? "text-blue-600" :
            pricingId === 'premium' ? "text-purple-600" :
            pricingId === 'gold' ? "text-amber-600" : "text-gray-500"
          )} />
          Listing Summary
        </h3>
      </div>
      
      <div className="space-y-5 text-sm p-5">
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
                <TooltipContent className="p-3 shadow-lg bg-white">
                  <p className="text-sm">Free listings have limited visibility and may not attract qualified candidates</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ) : (
          <>
            <div className={cn(
              "flex justify-between items-center p-4 rounded-md border shadow-sm",
              pricingId === 'standard' ? "bg-blue-50/50 border-blue-100" :
              pricingId === 'premium' ? "bg-purple-50/50 border-purple-100" :
              pricingId === 'gold' ? "bg-amber-50/50 border-amber-100" : "bg-white border-gray-100"
            )}>
              <div className="flex items-center">
                <Sparkles className={cn(
                  "h-5 w-5 mr-3",
                  pricingId === 'standard' ? "text-blue-500" :
                  pricingId === 'premium' ? "text-purple-500" :
                  pricingId === 'gold' ? "text-amber-500" : "text-gray-500"
                )} />
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
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-md border border-blue-100 shadow-sm">
                <div className="flex items-center">
                  <RefreshCw className="h-5 w-5 mr-3 text-blue-500" />
                  <span>Auto-renew</span>
                </div>
                <span className="font-medium">Enabled</span>
              </div>
            )}
            
            <div className={cn(
              "border-t pt-5 mt-5 space-y-3.5",
              pricingId !== 'free' ? "border-gray-100" : "border-gray-200"
            )}>
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
              
              <div className={cn(
                "flex justify-between items-center font-bold text-lg pt-4 border-t border-dashed mt-2",
                pricingId !== 'free' ? "border-gray-100" : "border-gray-200"
              )}>
                <div className="flex items-center">
                  <CreditCard className={cn(
                    "h-5 w-5 mr-2",
                    pricingId === 'standard' ? "text-blue-700" :
                    pricingId === 'premium' ? "text-purple-700" :
                    pricingId === 'gold' ? "text-amber-700" : "text-gray-700"
                  )} />
                  <span>Total</span>
                </div>
                <div className="flex flex-col items-end">
                  {discountPercentage > 0 && (
                    <span className="text-sm line-through text-gray-500 font-normal">${originalPrice.toFixed(2)}</span>
                  )}
                  <span className={cn(
                    pricingId === 'standard' ? "text-blue-800" :
                    pricingId === 'premium' ? "text-purple-800" :
                    pricingId === 'gold' ? "text-amber-800" : "text-gray-800"
                  )}>${finalPrice.toFixed(2)}</span>
                </div>
              </div>
              
              {discountPercentage > 0 && (
                <div className="mt-4">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100 px-3 py-1.5 font-medium border border-green-200">
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
