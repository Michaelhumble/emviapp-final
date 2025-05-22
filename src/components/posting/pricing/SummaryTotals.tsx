
import React, { useState } from 'react';
import { AlertCircle, ShieldCheck, Clock } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from '@/lib/utils';
import { DURATION_DISCOUNTS, AUTO_RENEW_DISCOUNT } from '@/utils/posting/pricingConfig';

interface SummaryTotalsProps {
  originalPrice: number;
  finalPrice: number;
  discountPercentage: number;
  durationMonths: number;
  autoRenew: boolean;
  onAutoRenewChange?: (autoRenew: boolean) => void;
}

export function SummaryTotals({ 
  originalPrice, 
  finalPrice, 
  discountPercentage, 
  durationMonths,
  autoRenew,
  onAutoRenewChange
}: SummaryTotalsProps) {
  const [showAutoRenewDialog, setShowAutoRenewDialog] = useState(false);
  
  const handleAutoRenewToggle = () => {
    if (autoRenew) {
      // Show warning dialog when turning OFF auto-renew
      setShowAutoRenewDialog(true);
    } else {
      // Turn ON auto-renew directly (no warning needed)
      onAutoRenewChange?.(true);
    }
  };

  const confirmDisableAutoRenew = () => {
    onAutoRenewChange?.(false);
    setShowAutoRenewDialog(false);
  };

  const cancelDisableAutoRenew = () => {
    setShowAutoRenewDialog(false);
  };

  // Extract discount components
  const durationDiscount = DURATION_DISCOUNTS[durationMonths as keyof typeof DURATION_DISCOUNTS] || 0;
  const autoRenewDiscount = autoRenew ? AUTO_RENEW_DISCOUNT : 0;
  
  const isFreeplan = finalPrice === 0;
  const savings = originalPrice - finalPrice;

  return (
    <div className="space-y-3 border-t pt-4">
      <h3 className="text-lg font-medium">Summary</h3>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-500">Original Price</span>
          <span className="text-gray-500">{formatCurrency(originalPrice)}</span>
        </div>
        
        {durationDiscount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>{durationMonths}-month discount ({durationDiscount}% OFF)</span>
            <span>-{formatCurrency((originalPrice * durationDiscount) / 100)}</span>
          </div>
        )}
        
        {autoRenewDiscount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Auto-renew discount ({autoRenewDiscount}% OFF)</span>
            <span>-{formatCurrency((originalPrice * autoRenewDiscount) / 100)}</span>
          </div>
        )}
        
        <div className="flex justify-between font-medium text-lg pt-2 border-t">
          <span>Total</span>
          <span>{formatCurrency(finalPrice)}</span>
        </div>
        
        {savings > 0 && (
          <div className="text-sm text-green-600 font-medium">
            You save: {formatCurrency(savings)}
          </div>
        )}
        
        {finalPrice > 0 && onAutoRenewChange && (
          <div className="flex items-center justify-between mt-2 bg-gray-50 p-2 rounded">
            <label className="flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="form-checkbox h-4 w-4 text-purple-600 rounded" 
                checked={autoRenew} 
                onChange={handleAutoRenewToggle}
              />
              <span className="ml-2 text-sm font-medium">Auto-renew subscription</span>
            </label>
            <span className="text-xs text-green-600 font-medium">
              {autoRenew ? "Can turn off anytime" : ""}
            </span>
          </div>
        )}
        
        <div className="text-sm text-gray-500">
          {autoRenew 
            ? <span>Your subscription will automatically renew every {durationMonths} month{durationMonths > 1 ? 's' : ''} at {formatCurrency(finalPrice / durationMonths)}/month.</span>
            : <span>Your post will expire after {durationMonths} month{durationMonths > 1 ? 's' : ''}. <span className="text-amber-600 font-medium">You'll lose your current pricing!</span></span>
          }
        </div>

        {/* Free plan messaging */}
        {isFreeplan && (
          <div className="mt-3 text-xs bg-yellow-50 p-3 rounded-md text-amber-800">
            <p className="font-medium">First post is completely free with no credit card required.</p>
          </div>
        )}

        {/* Trust badges */}
        <div className="mt-4 pt-3 border-t flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-gray-500" />
            <span className="text-xs text-gray-600">100% Secure Payment via Stripe</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Badge variant="outline" className="text-[10px] py-0 h-4">
              <Clock className="h-3 w-3 mr-1" />
              Limited Time Offer
            </Badge>
          </div>
        </div>
      </div>

      {/* Auto-renew warning dialog */}
      <AlertDialog open={showAutoRenewDialog} onOpenChange={setShowAutoRenewDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              Are you sure you want to disable auto-renew?
            </AlertDialogTitle>
            <AlertDialogDescription>
              By turning off auto-renew, you'll lose your special pricing when your subscription ends. 
              We'll also be unable to guarantee your listing's position after expiration.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDisableAutoRenew}>Keep Auto-Renew</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDisableAutoRenew} className="bg-red-600 hover:bg-red-700">
              Turn Off Auto-Renew
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
