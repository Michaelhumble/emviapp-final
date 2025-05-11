
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { calculatePriceWithDuration, calculateFinalPrice } from '@/utils/posting/jobPricing';
import { PricingOptions } from '@/utils/posting/types';

interface UpsellModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTier: string;
  basePrice: number;
  onConfirm: (duration: number, autoRenew: boolean) => void;
}

const UpsellModal: React.FC<UpsellModalProps> = ({
  isOpen,
  onClose,
  selectedTier,
  basePrice,
  onConfirm
}) => {
  const [selectedDuration, setSelectedDuration] = useState(6); // Default to 6 months
  const [autoRenew, setAutoRenew] = useState(false);

  const durations = [
    { months: 3, label: "3 months", discount: 10, badge: "" },
    { months: 6, label: "6 months", discount: 15, badge: "Most Popular" },
    { months: 12, label: "12 months", discount: 20, badge: "Best Value" },
  ];

  const handleConfirm = () => {
    onConfirm(selectedDuration, autoRenew);
  };

  const autoRenewDiscount = autoRenew ? 5 : 0;

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

        <div className="py-4 space-y-4">
          <div className="grid gap-4">
            {durations.map((option) => {
              const priceWithDuration = calculatePriceWithDuration(basePrice, option.months);
              const totalDiscount = option.discount + autoRenewDiscount;
              const finalPrice = calculateFinalPrice(basePrice, option.months, autoRenew);
              const savings = ((basePrice * option.months) - finalPrice).toFixed(2);
              
              return (
                <div 
                  key={option.months}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedDuration === option.months 
                      ? "border-purple-500 bg-purple-50" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedDuration(option.months)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{option.label}</span>
                        {option.badge && (
                          <Badge 
                            variant={option.badge === "Best Value" ? "default" : "secondary"}
                            className={option.badge === "Best Value" ? "bg-green-600" : "bg-amber-500"}
                          >
                            {option.badge}
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        Save {totalDiscount}% ({autoRenew ? `${option.discount}% + ${autoRenewDiscount}% auto-renew` : `${option.discount}%`})
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">
                        ${finalPrice.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-500 line-through">
                        ${(basePrice * option.months).toFixed(2)}
                      </div>
                      <div className="text-xs text-green-600">
                        Save ${savings}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center space-x-2 mt-4 pt-4 border-t">
            <Checkbox 
              id="autoRenew" 
              checked={autoRenew}
              onCheckedChange={(checked) => setAutoRenew(!!checked)} 
            />
            <label 
              htmlFor="autoRenew" 
              className="text-sm font-medium leading-none cursor-pointer"
            >
              Auto-renew subscription (save an additional 5%)
            </label>
          </div>
        </div>

        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={onClose}>
            Back to Plan Selection
          </Button>
          <Button onClick={handleConfirm}>
            Continue to Payment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpsellModal;
