
import { CheckCircle, DollarSign, AlertCircle } from "lucide-react";
import { PricingOptions, PostType } from "@/utils/posting/types";

interface PricingDisplayProps {
  postType: PostType;
  price: number;
  options?: PricingOptions;
  promotionalText?: string;
  originalPrice?: number;
  discountPercentage?: number;
  duration?: number;
}

const PricingDisplay = ({ 
  postType, 
  price, 
  options,
  promotionalText, 
  originalPrice,
  discountPercentage,
  duration = 1
}: PricingDisplayProps) => {
  const formattedPrice = price.toFixed(2);
  const formattedOriginalPrice = originalPrice ? originalPrice.toFixed(2) : undefined;
  const durationText = duration > 1 ? `for ${duration} month${duration === 1 ? '' : 's'}` : '';
  
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-500/5 to-purple-500/5 px-4 py-3 border-b">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Total</h3>
          <div className="flex flex-col items-end">
            <div className="flex items-baseline gap-2">
              {formattedOriginalPrice && Number(formattedOriginalPrice) > Number(formattedPrice) && (
                <span className="text-sm line-through text-red-500">${formattedOriginalPrice}</span>
              )}
              <span className="text-xl font-bold">${formattedPrice}</span>
            </div>
            {discountPercentage && discountPercentage > 0 && (
              <span className="text-xs text-green-600 font-medium">
                Tiết kiệm: {discountPercentage}%
              </span>
            )}
          </div>
        </div>
        {durationText && (
          <div className="text-xs text-muted-foreground text-right mt-1">
            {durationText}
          </div>
        )}
      </div>
      
      <div className="p-4 bg-white">
        <div className="flex flex-col space-y-2 mb-3">
          <div className="flex items-start">
            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
            <span className="text-sm">
              {postType === 'job' 
                ? '30-day job listing' 
                : postType === 'salon' 
                  ? 'Salon for sale listing (30 days)'
                  : postType === 'booth' 
                    ? 'Booth rental listing (30 days)'
                    : 'Supply listing (30 days)'}
            </span>
          </div>
          
          {options?.isNationwide && (
            <div className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-sm">Nationwide visibility</span>
            </div>
          )}
          
          {options?.fastSalePackage && (
            <div className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-sm">Featured placement + Fast Sale Package</span>
            </div>
          )}
          
          {options?.showAtTop && (
            <div className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-sm">Top position in search results</span>
            </div>
          )}
          
          {options?.isFirstPost && (
            <div className="flex items-start">
              <DollarSign className="h-4 w-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-sm text-amber-700 font-medium">First-time poster discount applied</span>
            </div>
          )}
          
          {duration && duration > 1 && (
            <div className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-sm">{duration}-month subscription{duration >= 3 ? ' with discount' : ''}</span>
            </div>
          )}
        </div>
        
        {promotionalText && (
          <div className="mt-3 py-2 px-3 bg-indigo-50 rounded-md text-sm text-indigo-700 border border-indigo-100">
            {promotionalText}
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingDisplay;
