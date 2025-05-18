
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/utils/posting/pricing";
import { Shield, Clock, CreditCard, LockIcon, CheckCircle } from "lucide-react";

// Create a proper type for the price data
type PriceData = {
  originalPrice: number;
  finalPrice: number;
  discountPercentage: number;
};

// Update the component to use named export and accept PriceData object
export const PaymentSummary = ({
  priceData,
  durationMonths = 1,
  autoRenew = true,
}: {
  priceData: PriceData;
  durationMonths?: number;
  autoRenew?: boolean;
}) => {
  const { originalPrice, finalPrice, discountPercentage } = priceData;
  
  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardContent className="p-5">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-900">Payment Summary</h3>
              <p className="text-sm text-gray-500">
                {durationMonths} {durationMonths === 1 ? 'month' : 'months'} subscription
              </p>
            </div>
            {discountPercentage > 0 && (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-2 py-1">
                Save {discountPercentage}%
              </Badge>
            )}
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Base price</span>
              <span className="font-medium">
                {formatCurrency(originalPrice)}
              </span>
            </div>
            
            {discountPercentage > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-green-600 text-sm">Discount</span>
                <span className="font-medium text-green-600">
                  -{formatCurrency(originalPrice - finalPrice)}
                </span>
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Duration</span>
              <span className="font-medium">
                {durationMonths} {durationMonths === 1 ? 'month' : 'months'}
              </span>
            </div>
            
            {durationMonths > 1 && (
              <div className="flex justify-between items-center">
                <span className="text-green-600 text-sm">Multi-month savings</span>
                <span className="font-medium text-green-600">
                  Included in price
                </span>
              </div>
            )}
          </div>
          
          <Separator />
          
          <div className="flex justify-between items-center font-medium">
            <span>Total due today</span>
            <span className="text-lg">
              {formatCurrency(finalPrice)}
            </span>
          </div>
          
          <div className={autoRenew ? "text-gray-600" : "text-gray-400"}>
            <div className="flex items-center gap-1 text-sm">
              <Clock size={14} />
              {autoRenew ? (
                <span>Auto-renews at {formatCurrency(finalPrice)}/month</span>
              ) : (
                <span>No auto-renewal (one-time payment)</span>
              )}
            </div>
          </div>
        </div>

        {/* Trust indicators section */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-center gap-2 mb-3">
            <LockIcon size={16} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-600">100% Secure Checkout</span>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div className="flex items-start gap-2">
              <Shield size={16} className="text-gray-500 mt-0.5" />
              <span className="text-xs text-gray-600">Secure payment processing by Stripe</span>
            </div>
            <div className="flex items-start gap-2">
              <CreditCard size={16} className="text-gray-500 mt-0.5" />
              <span className="text-xs text-gray-600">Major credit cards accepted</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle size={16} className="text-gray-500 mt-0.5" />
              <span className="text-xs text-gray-600">Cancel anytime, no risk</span>
            </div>
            <div className="flex items-start gap-2">
              <Shield size={16} className="text-gray-500 mt-0.5" />
              <span className="text-xs text-gray-600">SSL encrypted checkout</span>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">"EmviApp has helped me find 3 nail techs in the last 6 months. Worth every penny!"</p>
            <p className="text-xs font-medium mt-1">— Magic Nails Salon, San Jose</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
