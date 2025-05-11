
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { calculateFinalPrice } from '@/utils/posting/jobPricing';

interface UpsellModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTier: string;
  basePrice: number;
  onConfirm: (duration: number, autoRenew: boolean) => void;
  showUrgencyLabel?: boolean;
}

const UpsellModal: React.FC<UpsellModalProps> = ({
  isOpen,
  onClose,
  selectedTier,
  basePrice,
  onConfirm,
  showUrgencyLabel = true
}) => {
  const [selectedDuration, setSelectedDuration] = useState(6); // Default to 6 months
  const [autoRenew, setAutoRenew] = useState(false);

  const durations = [
    { months: 3, label: "3 months", days: 90, discount: 10, badge: "" },
    { months: 6, label: "6 months", days: 180, discount: 15, badge: "Most Popular" },
    { months: 12, label: "12 months", days: 365, discount: 20, badge: "Best Value" },
  ];

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

        <div className="py-4 space-y-4">
          <div className="grid gap-4">
            {durations.map((option) => {
              // Calculate pricing for this duration option
              const { originalPrice, finalPrice, discountPercentage } = calculateFinalPrice(
                basePrice, 
                option.months, 
                autoRenew
              );
              
              const savings = (originalPrice - finalPrice).toFixed(2);
              const pricePerDay = (finalPrice / option.days).toFixed(2);
              
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
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{option.days} days / {option.months} months</span>
                        {option.badge && (
                          <Badge 
                            variant={option.badge === "Best Value" ? "default" : "secondary"}
                            className={option.badge === "Best Value" ? "bg-green-600" : "bg-amber-500"}
                          >
                            {option.badge}
                          </Badge>
                        )}
                      </div>
                      
                      {showUrgencyLabel && (
                        <div className="text-sm text-orange-600 font-medium animate-pulse">
                          🔥 Limited time deal – you may not see this offer again
                        </div>
                      )}
                      
                      <div className="text-sm mt-2">
                        Originally <span className="line-through">${originalPrice.toFixed(2)}</span> – now just <span className="font-bold">${finalPrice.toFixed(2)}</span>
                      </div>
                      
                      <div className="text-sm font-bold text-green-600">
                        💸 Just ${pricePerDay}/day
                      </div>
                      
                      <div className="text-sm text-gray-600 italic">
                        💡 {option.days} days = {option.days} chances for the right artist to find you. Don't miss your next hire.
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        Save {discountPercentage}% (${savings})
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-bold text-lg">
                        ${finalPrice.toFixed(2)}
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
