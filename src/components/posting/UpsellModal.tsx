
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { PRICING_OPTIONS, applyAutoRenewDiscount } from '@/utils/jobPricingOptions';
import { PriceDetails } from '@/types/PriceDetails';

interface UpsellModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTier: string;
  onConfirm: (duration: number, autoRenew: boolean) => void;
  showUrgencyLabel?: boolean;
}

const UpsellModal: React.FC<UpsellModalProps> = ({
  isOpen,
  onClose,
  selectedTier,
  onConfirm,
  showUrgencyLabel = true
}) => {
  const [selectedDuration, setSelectedDuration] = useState<number>(6); // Default to 6 months
  const [autoRenew, setAutoRenew] = useState<boolean>(false);

  const handleConfirm = () => {
    onConfirm(selectedDuration, autoRenew);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Maximize Your {selectedTier === 'gold' ? 'Gold' : 'Premium'} Plan Value
          </DialogTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Choose a longer duration for bigger savings on your job listing.
          </p>
        </DialogHeader>

        <div className="py-4 space-y-6">
          <div className="grid gap-5">
            {PRICING_OPTIONS.map((option) => {
              // Apply auto-renew discount if selected
              const price = autoRenew ? applyAutoRenewDiscount(option, autoRenew) : option;
              const { originalPrice, finalPrice, discountPercentage, dailyRate, durationDays, durationMonths } = price;
              const savings = (originalPrice - finalPrice).toFixed(2);
              
              return (
                <div 
                  key={option.id}
                  className={`relative border-[3px] rounded-2xl p-5 cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.01] ${
                    selectedDuration === durationMonths 
                      ? "border-purple-500 bg-gradient-to-br from-purple-50 to-white ring-2 ring-purple-400 ring-opacity-50" 
                      : "border-gray-200 hover:border-gray-300 bg-gradient-to-br from-slate-50 to-white"
                  }`}
                  onClick={() => setSelectedDuration(durationMonths)}
                >
                  {(option.isPopular || option.isBestValue) && (
                    <Badge 
                      className={`absolute top-3 right-3 text-xs px-2 py-1 font-medium ${
                        option.isBestValue 
                          ? "bg-green-600 hover:bg-green-700 text-white" 
                          : "bg-amber-500 hover:bg-amber-600 text-white"
                      }`}
                    >
                      {option.isBestValue ? "💎 Best Value" : "🔥 Most Popular"}
                    </Badge>
                  )}
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-purple-900">{option.label}</span>
                    </div>
                    
                    {showUrgencyLabel && (
                      <div className="text-sm text-orange-600 font-medium animate-pulse">
                        🔥 Limited time deal – you may not see this offer again
                      </div>
                    )}
                    
                    <div className="text-base mt-3 font-medium">
                      Originally <span className="line-through text-gray-500">${originalPrice.toFixed(2)}</span> – now just <span className="font-bold text-lg text-purple-700">${finalPrice.toFixed(2)}</span>
                    </div>
                    
                    <div className="text-base font-bold text-green-600 py-1 px-2.5 inline-block rounded-md bg-green-50 border border-green-100">
                      {option.emoji} Just {dailyRate}
                    </div>
                    
                    <div className="text-sm text-gray-600 italic bg-gray-50 p-3 rounded-lg border-l-2 border-purple-300">
                      💡 {option.label} = {durationDays} chances for the right artist to find you. Don't miss your next hire.
                    </div>
                    
                    <div className="flex justify-end">
                      <div className="text-sm text-green-600 font-medium">
                        💸 Save {discountPercentage}% (${savings})
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center space-x-2 mt-6 pt-4 border-t">
            <Checkbox 
              id="autoRenew" 
              checked={autoRenew}
              onCheckedChange={(checked) => setAutoRenew(!!checked)} 
              className="text-purple-600 border-purple-300 focus:ring-purple-500"
            />
            <label 
              htmlFor="autoRenew" 
              className="text-sm font-medium leading-none cursor-pointer text-gray-700"
            >
              Auto-renew subscription (save an additional 5%)
            </label>
          </div>
        </div>

        <DialogFooter className="sm:justify-between gap-4">
          <Button variant="outline" onClick={onClose} className="border-gray-300">
            Back to Plan Selection
          </Button>
          <Button onClick={handleConfirm} className="bg-purple-600 hover:bg-purple-700">
            Continue to Payment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpsellModal;
