
import React from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { AlertCircle, ShieldCheck, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { usePricing } from '@/context/pricing/PricingProvider';

interface PaymentSummaryProps {
  priceData: {
    basePrice: number;
    originalPrice: number;
    finalPrice: number;
    discountPercentage: number;
    discountAmount: number;
    autoRenewDiscount: number;
    durationMonths: number;
    isFirstPost: boolean;
    isNationwide: boolean;
    selectedTier: string;
  };
}

export function PaymentSummary({ priceData }: PaymentSummaryProps) {
  const [showAutoRenewDialog, setShowAutoRenewDialog] = React.useState(false);
  const { pricingOptions, setPricingOptions } = usePricing();
  
  const handleAutoRenewToggle = () => {
    if (pricingOptions.autoRenew) {
      // Show warning dialog when turning OFF auto-renew
      setShowAutoRenewDialog(true);
    } else {
      // Turn ON auto-renew directly (no warning needed)
      setPricingOptions({
        ...pricingOptions,
        autoRenew: true
      });
    }
  };

  const confirmDisableAutoRenew = () => {
    setPricingOptions({
      ...pricingOptions,
      autoRenew: false
    });
    setShowAutoRenewDialog(false);
  };

  const cancelDisableAutoRenew = () => {
    setShowAutoRenewDialog(false);
  };

  const isFreeplan = priceData.finalPrice === 0;

  return (
    <div className="space-y-3 border-t pt-4">
      <h3 className="text-lg font-medium">Summary</h3>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-500">Original Price</span>
          <span className="text-gray-500">${priceData.originalPrice.toFixed(2)}</span>
        </div>
        
        {priceData.discountPercentage > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Duration Discount ({priceData.discountPercentage}% OFF)</span>
            <span>-${priceData.discountAmount.toFixed(2)}</span>
          </div>
        )}
        
        {priceData.autoRenewDiscount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Auto-Renew Discount (5% OFF)</span>
            <span>-${priceData.autoRenewDiscount.toFixed(2)}</span>
          </div>
        )}
        
        {priceData.isNationwide && (
          <div className="flex justify-between">
            <span>Nationwide Visibility Fee</span>
            <span>+$5.00</span>
          </div>
        )}
        
        <div className="flex justify-between font-medium text-lg pt-2 border-t">
          <span>Total</span>
          <span>${priceData.finalPrice.toFixed(2)}</span>
        </div>
        
        {priceData.finalPrice > 0 && (
          <div className="flex items-center justify-between mt-2 bg-gray-50 p-2 rounded">
            <label className="flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="form-checkbox h-4 w-4 text-purple-600 rounded" 
                checked={pricingOptions.autoRenew} 
                onChange={handleAutoRenewToggle}
              />
              <span className="ml-2 text-sm font-medium">Auto-renew subscription</span>
            </label>
            <span className="text-xs text-green-600 font-medium">
              {pricingOptions.autoRenew ? "Can turn off anytime" : ""}
            </span>
          </div>
        )}
        
        <div className="text-sm text-gray-500">
          {pricingOptions.autoRenew 
            ? <span>Your subscription will automatically renew every {priceData.durationMonths} month{priceData.durationMonths > 1 ? 's' : ''} at ${(priceData.finalPrice / priceData.durationMonths).toFixed(2)}/month.</span>
            : <span>Your post will expire after {priceData.durationMonths} month{priceData.durationMonths > 1 ? 's' : ''}. <span className="text-amber-600 font-medium">You'll lose your current pricing!</span></span>
          }
        </div>

        {/* Free plan messaging */}
        {isFreeplan && (
          <div className="mt-3 text-xs bg-yellow-50 p-3 rounded-md text-amber-800">
            <p className="font-medium">Credit card required for free trial. Cancel anytime, no risk.</p>
            <p className="mt-1">After your 30-day free trial, plan will automatically convert to paid unless canceled.</p>
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
