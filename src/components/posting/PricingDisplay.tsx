
import { useState } from "react";
import { PricingOptions } from "@/utils/postingPriceCalculator";
import { DollarSign, CheckCircle, TrendingUp, Globe, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface PricingDisplayProps {
  postType: 'job' | 'salon' | 'booth' | 'supply';
  price: number;
  options: PricingOptions;
  promotionalText: string;
  originalPrice?: number;
  onOptionChange?: (option: keyof PricingOptions, value: boolean) => void;
}

const PricingDisplay = ({
  postType,
  price,
  options,
  promotionalText,
  originalPrice,
  onOptionChange
}: PricingDisplayProps) => {
  const discountPercent = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  const showDiscount = originalPrice && originalPrice > price;
  
  return (
    <motion.div 
      className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4">
        <h3 className="text-lg font-medium flex items-center">
          <DollarSign className="h-5 w-5 mr-2 text-purple-600" />
          Pricing Options
        </h3>
        {showDiscount && (
          <div className="mt-1 flex items-center">
            <span className="text-xs bg-green-100 text-green-800 py-0.5 px-2 rounded-full">
              Save {discountPercent}%
            </span>
            <span className="text-xs text-gray-500 line-through ml-2">
              ${originalPrice}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4 space-y-4">
        {/* Current price display */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total Price</span>
          <span className="text-2xl font-bold">
            {price === 0 ? "FREE" : `$${price}`}
          </span>
        </div>
        
        {/* Promotional text */}
        <p className="text-sm text-gray-600">{promotionalText}</p>
        
        {/* Visibility options */}
        <div className="space-y-3 pt-2">
          {postType === 'job' && options.isFirstPost && (
            <div className={cn(
              "flex items-center py-2 px-3 rounded-lg",
              "bg-green-50 text-green-800"
            )}>
              <CheckCircle className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">First post advantage</span>
            </div>
          )}
          
          {options.isNationwide && (
            <div className="flex items-center py-2 px-3 rounded-lg bg-blue-50 text-blue-800">
              <Globe className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Nationwide visibility</span>
            </div>
          )}
          
          {options.fastSalePackage && (
            <div className="flex items-center py-2 px-3 rounded-lg bg-yellow-50 text-yellow-800">
              <Zap className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Fast Sale Package</span>
            </div>
          )}
          
          {options.showAtTop && (
            <div className="flex items-center py-2 px-3 rounded-lg bg-purple-50 text-purple-800">
              <TrendingUp className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Top of Results</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PricingDisplay;
