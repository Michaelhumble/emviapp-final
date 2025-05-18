
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft, AlertCircle } from 'lucide-react';
import { JobFormValues } from '../job/jobFormSchema';
import { JobPostPreview } from '../job/JobPostPreview';
import { PaymentSummary } from '../PaymentSummary';
import { PricingOptions, JobPricingTier } from '@/utils/posting/types';
import { jobPricingOptions, calculateJobPostPrice } from '@/utils/posting/jobPricing';
import { DurationSelector } from '../pricing/DurationSelector';
import { SummaryTotals } from '../pricing/SummaryTotals';
import { Alert, AlertDescription } from '@/components/ui/alert';
import PricingCard from '../pricing/PricingCard';
import { formatCurrency } from '@/utils/posting/pricing';

interface ReviewAndPaymentSectionProps {
  formData: JobFormValues | null;
  photoUploads: File[];
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  pricingOptions: PricingOptions;
  setPricingOptions: React.Dispatch<React.SetStateAction<PricingOptions>>;
}

export const ReviewAndPaymentSection: React.FC<ReviewAndPaymentSectionProps> = ({
  formData,
  photoUploads,
  onBack,
  onSubmit,
  isSubmitting,
  pricingOptions,
  setPricingOptions
}) => {
  const [showPricingOptions, setShowPricingOptions] = useState(false);

  // Calculate pricing based on current options
  const priceData = calculateJobPostPrice(pricingOptions);

  // Change handler for pricing tier
  const handlePricingTierChange = (tierId: string) => {
    // Find the pricing tier from the job pricing options
    const selectedOption = jobPricingOptions.find(option => option.id === tierId);
    
    if (selectedOption) {
      // Update the pricing options with the new tier
      setPricingOptions(prev => ({
        ...prev,
        selectedPricingTier: selectedOption.tier as JobPricingTier
      }));
    }
  };

  // Handle duration change
  const handleDurationChange = (months: number) => {
    setPricingOptions(prev => ({ ...prev, durationMonths: months }));
  };

  // Toggle auto-renew
  const handleAutoRenewChange = (autoRenew: boolean) => {
    setPricingOptions(prev => ({ ...prev, autoRenew }));
  };

  // Function to generate payment button text
  const getPaymentButtonText = () => {
    if (isSubmitting) return 'Processing...';
    
    const isFree = priceData.finalPrice <= 0;
    if (isFree) {
      return 'Submit Job Post';
    } else {
      return `Pay ${formatCurrency(priceData.finalPrice)} & Post Job`;
    }
  };
  
  // Determine if it's the diamond plan
  const isDiamondPlan = pricingOptions.selectedPricingTier === 'diamond';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Review & Payment</h2>
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ChevronLeft className="mr-1 h-4 w-4" /> Back to Edit
        </Button>
      </div>

      {/* Job Preview */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Job Details</h3>
        <JobPostPreview jobData={formData} photoUploads={photoUploads} onBack={onBack} />
      </div>

      {/* Pricing Options */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Pricing Plan</h3>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowPricingOptions(!showPricingOptions)}
          >
            {showPricingOptions ? 'Hide Options' : 'Change Plan'}
          </Button>
        </div>

        {showPricingOptions && (
          <div className="space-y-6">
            {/* Plan Selector */}
            <div className="space-y-3">
              <h4 className="text-base font-medium">Select Your Plan</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {jobPricingOptions
                  .filter(option => !option.hidden)
                  .map((option) => (
                    <PricingCard
                      key={option.id}
                      isSelected={pricingOptions.selectedPricingTier === option.tier}
                      onSelect={() => handlePricingTierChange(option.id)}
                      tier={option.tier}
                      pricingInfo={option}
                    />
                  ))}
              </div>
            </div>
            
            {/* Duration Selector */}
            <DurationSelector
              durationMonths={pricingOptions.durationMonths}
              onDurationChange={handleDurationChange}
              isDiamondPlan={isDiamondPlan}
            />
          </div>
        )}

        {/* Current Plan Summary */}
        <Card className="bg-gray-50">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Selected Plan</h4>
                <p className="text-sm text-gray-600">
                  {jobPricingOptions.find(opt => opt.tier === pricingOptions.selectedPricingTier)?.name} - {pricingOptions.durationMonths} {pricingOptions.durationMonths === 1 ? 'month' : 'months'}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">{formatCurrency(priceData.finalPrice)}</p>
                {priceData.discountPercentage > 0 && (
                  <p className="text-sm text-green-600">You save {priceData.discountPercentage}%</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pricing Summary and Payment */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="md:col-span-3 space-y-4">
          {/* Payment Summary */}
          <SummaryTotals
            originalPrice={priceData.originalPrice}
            finalPrice={priceData.finalPrice}
            discountPercentage={priceData.discountPercentage}
            durationMonths={pricingOptions.durationMonths}
            autoRenew={pricingOptions.autoRenew || false}
            onAutoRenewChange={handleAutoRenewChange}
          />

          {/* Diamond Plan Notice */}
          {isDiamondPlan && (
            <Alert className="bg-blue-50 border-blue-200">
              <AlertCircle className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                The Diamond plan requires approval. Our team will contact you shortly after submission.
              </AlertDescription>
            </Alert>
          )}
          
          {/* Free Trial Notice */}
          {pricingOptions.selectedPricingTier === 'free' && (
            <Alert className="bg-amber-50 border-amber-200">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                Your free trial will be active for 30 days. Credit card required for verification.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div className="md:col-span-2">
          <PaymentSummary
            priceData={priceData}
            durationMonths={pricingOptions.durationMonths}
            autoRenew={pricingOptions.autoRenew}
          />
        </div>
      </div>
      
      {/* Sticky Payment Button Footer */}
      <div className="sticky bottom-0 left-0 right-0 pt-4 pb-4 bg-white border-t mt-6 -mx-6 px-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium">Total to pay:</p>
            <p className="text-xl font-bold">{formatCurrency(priceData.finalPrice)}</p>
          </div>
          <Button 
            size="lg" 
            onClick={onSubmit} 
            disabled={isSubmitting || !formData}
            className="min-w-[200px]"
          >
            {getPaymentButtonText()}
          </Button>
        </div>
      </div>
    </div>
  );
};
