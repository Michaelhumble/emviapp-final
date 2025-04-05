
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { PricingOptions } from "@/utils/posting";

interface PricingDisplayProps {
  postType: 'job' | 'salon' | 'booth' | 'supply';
  price: number;
  options?: PricingOptions;
  promotionalText?: string;
  originalPrice?: number;
  onProceed?: () => void;
  discounts?: {
    label: string;
    amount: number;
  }[];
  additionalFeatures?: {
    label: string;
    amount: number;
    selected: boolean;
    onToggle: () => void;
  }[];
}

const PricingDisplay = ({
  postType,
  price,
  options = {},
  promotionalText,
  originalPrice,
  onProceed,
  discounts = [],
  additionalFeatures = []
}: PricingDisplayProps) => {
  
  // Calculate original price before discounts if not provided
  const finalOriginalPrice = originalPrice || 
    (discounts.length > 0 ? price + discounts.reduce((total, discount) => total + discount.amount, 0) : undefined);
  
  const isFirstPost = options?.isFirstPost;
  const isSecondPost = options?.isFirstPost === false && options?.hasActivePost === false;
  
  return (
    <Card className="w-full shadow-md border-primary/20">
      <CardHeader className="bg-primary/5 pb-4">
        <CardTitle className="text-xl font-medium flex items-center justify-between">
          <span>
            {postType === 'job' ? 'Job Post' : 
             postType === 'salon' ? 'Salon Listing' : 
             postType === 'booth' ? 'Booth Rental Post' : 'Supply Listing'}
          </span>
          <span className="text-2xl font-bold text-primary">${price}</span>
        </CardTitle>
        <CardDescription>
          {isFirstPost && postType === 'job' ? 'Special first-time poster pricing!' : 
           isSecondPost && postType === 'job' ? 'Reduced rate for your second job post!' :
           promotionalText || 'Standard pricing for professional visibility'}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="space-y-4">
          {/* Show original price if there are discounts */}
          {finalOriginalPrice && finalOriginalPrice > price && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Original Price</span>
              <span className="line-through text-gray-500">${finalOriginalPrice}</span>
            </div>
          )}
          
          {/* List discounts */}
          {discounts.map((discount, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="text-green-600 flex items-center">
                <Check className="h-4 w-4 mr-1" /> {discount.label}
              </span>
              <span className="text-green-600">-${discount.amount}</span>
            </div>
          ))}
          
          {/* Feature list */}
          <div className="pt-2">
            <h4 className="font-medium text-sm mb-2">Included Features:</h4>
            <ul className="space-y-2">
              {postType === 'job' && [
                "30-day listing period",
                "Visible to all job seekers",
                "Email notifications for matches",
                "One-click contact options"
              ].map((feature, i) => (
                <li key={i} className="text-sm flex items-start">
                  <Check className="h-4 w-4 mr-2 text-green-600 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
              
              {postType === 'salon' && [
                "90-day listing period",
                "Photo gallery (up to 10 images)",
                "Detailed salon specifications",
                "Secure messaging with interested buyers"
              ].map((feature, i) => (
                <li key={i} className="text-sm flex items-start">
                  <Check className="h-4 w-4 mr-2 text-green-600 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
              
              {postType === 'booth' && [
                "60-day listing period",
                "Booth specifications display",
                "Location map integration",
                "Rate and terms clarity"
              ].map((feature, i) => (
                <li key={i} className="text-sm flex items-start">
                  <Check className="h-4 w-4 mr-2 text-green-600 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
              
              {postType === 'supply' && [
                "45-day listing period",
                "Product specifications display",
                "Business to business visibility",
                "Direct supplier contact"
              ].map((feature, i) => (
                <li key={i} className="text-sm flex items-start">
                  <Check className="h-4 w-4 mr-2 text-green-600 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Additional features that can be toggled */}
          {additionalFeatures.length > 0 && (
            <div className="pt-2">
              <h4 className="font-medium text-sm mb-2">Additional Options:</h4>
              <div className="space-y-2">
                {additionalFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={`feature-${index}`}
                        checked={feature.selected}
                        onChange={feature.onToggle}
                        className="rounded mr-2 text-primary focus:ring-primary"
                      />
                      <label htmlFor={`feature-${index}`} className="text-sm">
                        {feature.label}
                      </label>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-3.5 w-3.5 ml-1 text-gray-400 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs max-w-[200px]">
                              {feature.label.includes("Featured") ? 
                                "Featured posts receive 3x more visibility and appear at the top of search results." : 
                                feature.label.includes("Nationwide") ? 
                                "Make your post visible to users across the entire country, not just your local area." :
                                "Enhances your listing's performance and visibility."}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <span className="text-sm">+${feature.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      {onProceed && (
        <CardFooter className="flex justify-between border-t pt-4">
          <p className="text-xs text-gray-500">
            All prices in USD. One-time payment.
          </p>
          <Button onClick={onProceed}>
            Continue to Payment
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default PricingDisplay;
