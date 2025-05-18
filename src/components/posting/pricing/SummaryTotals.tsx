
import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
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

  return (
    <div className="space-y-3 border-t pt-4">
      <h3 className="text-lg font-medium">Summary</h3>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-500">Original Price</span>
          <span className="text-gray-500">${originalPrice.toFixed(2)}</span>
        </div>
        
        {discountPercentage > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Duration Discount ({discountPercentage}%)</span>
            <span>-${(originalPrice - finalPrice).toFixed(2)}</span>
          </div>
        )}
        
        <div className="flex justify-between font-medium text-lg pt-2 border-t">
          <span>Total</span>
          <span>${finalPrice.toFixed(2)}</span>
        </div>
        
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
              {autoRenew ? "Locked in price!" : ""}
            </span>
          </div>
        )}
        
        <div className="text-sm text-gray-500">
          {autoRenew 
            ? <span>Your subscription will automatically renew every {durationMonths} month{durationMonths > 1 ? 's' : ''} at ${(finalPrice / durationMonths).toFixed(2)}/month.</span>
            : <span>Your post will expire after {durationMonths} month{durationMonths > 1 ? 's' : ''}. <span className="text-amber-600 font-medium">You'll lose your current pricing!</span></span>
          }
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
