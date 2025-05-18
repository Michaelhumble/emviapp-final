
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useStripe } from '@/hooks/useStripe';
import { JobFormValues } from '../job/jobFormSchema';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft, AlertCircle, CreditCard } from 'lucide-react';
import { calculateJobPostPrice, jobPricingOptions } from '@/utils/posting/jobPricing';
import { PricingOptions } from '@/utils/posting/types';
import { PricingTierSelector } from '../pricing/PricingTierSelector';
import { DurationSelector } from '../pricing/DurationSelector';
import { SummaryTotals } from '../pricing/SummaryTotals';

interface ReviewAndPaymentSectionProps {
  formData: JobFormValues | null;
  photoUploads: File[];
  onBack: () => void;
  onSubmit: () => Promise<void>;
  isSubmitting: boolean;
  pricingOptions: PricingOptions;
  setPricingOptions: React.Dispatch<React.SetStateAction<PricingOptions>>;
}

export function ReviewAndPaymentSection({
  formData,
  photoUploads,
  onBack,
  onSubmit,
  isSubmitting,
  pricingOptions,
  setPricingOptions,
}: ReviewAndPaymentSectionProps) {
  const { isLoading: isStripeLoading } = useStripe();
  const [error, setError] = useState<string | null>(null);

  if (!formData) {
    return <div>No form data available. Please go back and complete the form.</div>;
  }

  // Handle tier selection change
  const handleTierChange = (tier: string) => {
    setPricingOptions({
      ...pricingOptions,
      selectedPricingTier: tier
    });
  };

  // Handle duration change
  const handleDurationChange = (months: number) => {
    setPricingOptions({
      ...pricingOptions,
      durationMonths: months
    });
  };

  const handleSubmit = async () => {
    try {
      setError(null);
      await onSubmit();
    } catch (err: any) {
      setError(err?.message || 'An unexpected error occurred during payment processing');
    }
  };

  // Calculate pricing based on selected options
  const { finalPrice, originalPrice, discountPercentage } = calculateJobPostPrice(pricingOptions);

  return (
    <div className="space-y-6">
      <CardHeader className="px-0 pt-0">
        <Button 
          variant="ghost" 
          className="mb-2 pl-0 hover:bg-transparent" 
          onClick={onBack}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Job Details
        </Button>
        <CardTitle className="text-2xl font-semibold">Review & Payment</CardTitle>
      </CardHeader>

      {/* Job Summary */}
      <Card className="border-gray-100">
        <CardHeader>
          <CardTitle className="text-xl">Job Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium">Title</h3>
            <p className="text-gray-700">{formData.title}</p>
          </div>
          <div>
            <h3 className="font-medium">Location</h3>
            <p className="text-gray-700">{formData.location}</p>
          </div>
          <div>
            <h3 className="font-medium">Employment Type</h3>
            <p className="text-gray-700">{formData.jobType}</p>
          </div>
          {photoUploads.length > 0 && (
            <div>
              <h3 className="font-medium">Photos</h3>
              <div className="flex gap-2 mt-1">
                {photoUploads.map((file, index) => (
                  <div 
                    key={index} 
                    className="w-16 h-16 rounded overflow-hidden bg-gray-100"
                  >
                    <img 
                      src={URL.createObjectURL(file)} 
                      alt={`Upload ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment Options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Choose Your Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <PricingTierSelector 
            selectedTier={pricingOptions.selectedPricingTier}
            onSelectTier={handleTierChange}
            pricingOptions={pricingOptions}
            setPricingOptions={setPricingOptions}
          />

          <Separator className="my-6" />

          <DurationSelector
            durationMonths={pricingOptions.durationMonths}
            onDurationChange={handleDurationChange}
          />
          
          <Separator className="my-6" />

          <SummaryTotals 
            originalPrice={originalPrice}
            finalPrice={finalPrice}
            discountPercentage={discountPercentage}
            durationMonths={pricingOptions.durationMonths}
            autoRenew={pricingOptions.autoRenew || false}
          />
        </CardContent>
      </Card>

      {error && (
        <div className="bg-red-50 p-4 rounded-lg flex items-start">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
          <div>
            <p className="text-red-800 font-medium">Payment Error</p>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </div>
      )}

      <CardFooter className="px-0 pt-4 flex flex-col sm:flex-row gap-4">
        <Button 
          variant="outline" 
          onClick={onBack}
        >
          Back
        </Button>
        <Button 
          onClick={handleSubmit}
          disabled={isSubmitting || isStripeLoading}
          className="flex-1"
        >
          <CreditCard className="mr-2 h-4 w-4" />
          {isSubmitting || isStripeLoading ? 'Processing...' : 'Pay & Post Job'}
        </Button>
      </CardFooter>
    </div>
  );
}
