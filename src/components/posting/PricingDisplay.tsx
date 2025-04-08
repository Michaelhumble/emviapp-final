
import { CheckCircle, DollarSign, AlertCircle } from "lucide-react";
import { PricingOptions, PostType } from "@/utils/posting/types";

interface PricingDisplayProps {
  postType: PostType;
  price: number;
  options?: PricingOptions;
  promotionalText?: string;
  originalPrice?: number;
}

const PricingDisplay = ({ 
  postType, 
  price, 
  options,
  promotionalText, 
  originalPrice 
}: PricingDisplayProps) => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-500/5 to-purple-500/5 px-4 py-3 border-b">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Total</h3>
          <div className="flex items-baseline gap-2">
            {originalPrice && originalPrice > price && (
              <span className="text-sm line-through text-gray-500">${originalPrice}</span>
            )}
            <span className="text-xl font-bold">${price}</span>
          </div>
        </div>
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
