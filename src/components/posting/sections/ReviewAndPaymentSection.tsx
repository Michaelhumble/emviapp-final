
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import { JobPricingOption, PricingOptions } from '@/utils/posting/types';
import { jobPricingOptions, calculatePriceWithDuration } from '@/utils/posting/jobPricing';
import { toast } from 'sonner';
import { DurationOption } from '@/types/pricing';
import AutoRenewSuggestionCard from '@/components/posting/AutoRenewSuggestionCard';

// Define the type for pricing tier
export type JobPricingTier = 'free' | 'standard' | 'premium' | 'gold' | 'diamond';

// Add the interface for the PricingCards props based on the error
interface PricingCardsProps {
  options: JobPricingOption[];
  selectedTier: string;
  onSelect: (tier: string) => void;
  durationOptions: DurationOption[];
  selectedDuration: number;
  onDurationChange: (duration: number) => void;
  autoRenew?: boolean;
  onAutoRenewChange?: (autoRenew: boolean) => void;
}

interface ReviewAndPaymentSectionProps {
  onSubmit: (options: PricingOptions) => void;
  durationOptions: DurationOption[];
  isFirstPost?: boolean;
}

const ReviewAndPaymentSection: React.FC<ReviewAndPaymentSectionProps> = ({
  onSubmit,
  durationOptions,
  isFirstPost = false,
}) => {
  const [selectedTier, setSelectedTier] = useState<string>('standard');
  const [selectedDuration, setSelectedDuration] = useState<number>(1);
  const [autoRenew, setAutoRenew] = useState<boolean>(false);
  const [isUpgrading, setIsUpgrading] = useState<boolean>(false);

  const filteredOptions = jobPricingOptions.filter(option => !option.hidden);

  const handleSubmit = () => {
    const pricingOptions: PricingOptions = {
      selectedPricingTier: selectedTier,
      isFirstPost,
      durationMonths: selectedDuration,
      autoRenew,
    };
    
    onSubmit(pricingOptions);
    toast.success('Payment options selected');
  };

  const handleUpgrade = () => {
    if (selectedTier === 'standard') {
      setSelectedTier('premium');
      setIsUpgrading(true);
      toast.success('Upgraded to Premium Plan!');
    } else if (selectedTier === 'premium') {
      setSelectedTier('gold');
      setIsUpgrading(true);
      toast.success('Upgraded to Featured Plan!');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Review & Payment</h2>
        <p className="text-gray-600 mb-4">Select a plan that works for your business needs</p>
      </div>

      {/* Use the proper PricingCards component with corrected props */}
      <PricingCards
        options={filteredOptions}
        selectedTier={selectedTier}
        onSelect={setSelectedTier}
        durationOptions={durationOptions}
        selectedDuration={selectedDuration}
        onDurationChange={setSelectedDuration}
        autoRenew={autoRenew}
        onAutoRenewChange={setAutoRenew}
      />

      {/* Show auto-renew suggestion only for standard and premium tiers */}
      {(selectedTier === 'standard' || selectedTier === 'premium') && !isUpgrading && (
        <AutoRenewSuggestionCard onUpgrade={handleUpgrade} />
      )}

      <Card className="p-4 bg-gradient-to-r from-indigo-50 to-violet-50 border-indigo-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-lg">Your Plan Summary</h3>
            <p className="text-gray-600 text-sm">
              {filteredOptions.find(option => option.id === selectedTier)?.name} for {selectedDuration} {selectedDuration === 1 ? 'month' : 'months'}
            </p>
            {autoRenew && <p className="text-emerald-600 text-sm">✓ Auto-renew enabled</p>}
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Total:</p>
            <p className="text-2xl font-bold">
              ${calculatePriceWithDuration(
                filteredOptions.find(option => option.id === selectedTier)?.price || 0,
                selectedDuration,
                durationOptions.find(option => option.months === selectedDuration)?.discount || 0
              ).toFixed(2)}
            </p>
            {selectedDuration > 1 && (
              <p className="text-emerald-600 text-xs">
                You save {durationOptions.find(option => option.months === selectedDuration)?.discount}%
              </p>
            )}
          </div>
        </div>
      </Card>

      <Separator />

      <div className="flex justify-end">
        <Button 
          onClick={handleSubmit}
          className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700"
        >
          Continue to Payment
        </Button>
      </div>
    </div>
  );
};

export default ReviewAndPaymentSection;
