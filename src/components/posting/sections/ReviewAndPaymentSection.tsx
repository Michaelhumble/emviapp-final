
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getNationwidePrice } from '@/utils/posting/pricing';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft } from 'lucide-react';
import PricingTierSelector from '@/components/posting/pricing/PricingTierSelector';
import { JobPostPreview } from '@/components/posting/job/JobPostPreview';
import { PricingOptions, JobPricingTier } from '@/utils/posting/types';
import { JobFormValues } from '@/components/posting/job/jobFormSchema';

interface ReviewAndPaymentSectionProps {
  formData: JobFormValues | null;
  photoUploads?: File[];
  onBack: () => void;
  onSubmit: (pricingOptions: PricingOptions) => Promise<void>;
  isSubmitting: boolean;
  pricingOptions: PricingOptions;
  setPricingOptions: React.Dispatch<React.SetStateAction<PricingOptions>>;
}

export const ReviewAndPaymentSection: React.FC<ReviewAndPaymentSectionProps> = ({
  formData,
  photoUploads = [],
  onBack,
  onSubmit,
  isSubmitting,
  pricingOptions,
  setPricingOptions,
}) => {
  // Fixed type: Use JobPricingTier instead of string
  const [selectedPricingTier, setSelectedPricingTier] = useState<JobPricingTier>(
    pricingOptions.selectedPricingTier || 'premium'
  );

  // Fixed handler to properly use JobPricingTier type
  const handlePricingTierSelect = (tier: JobPricingTier) => {
    setSelectedPricingTier(tier);
    setPricingOptions(prev => ({ 
      ...prev, 
      selectedPricingTier: tier 
    }));
  };

  const handleSubmit = async () => {
    await onSubmit(pricingOptions);
  };

  const calculatePrice = () => {
    let basePrice = 0;
    if (pricingOptions.selectedPricingTier === 'standard') {
      basePrice = 49;
    } else if (pricingOptions.selectedPricingTier === 'premium') {
      basePrice = 99;
    } else if (pricingOptions.selectedPricingTier === 'diamond') {
      basePrice = 149;
    }

    let nationwidePrice = 0;
    if (pricingOptions.isNationwide) {
      nationwidePrice = 5;
    }

    return basePrice + nationwidePrice;
  };
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-playfair font-medium">Review & Payment</h2>
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack}
          disabled={isSubmitting}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Edit
        </Button>
      </div>
      
      {/* Job Post Preview Card */}
      <div className="mb-8">
        <h3 className="text-xl font-playfair mb-4">Preview Your Post Before Payment</h3>
        <JobPostPreview 
          jobData={formData} 
          photoUploads={photoUploads} 
          onBack={onBack}
        />
      </div>
      
      <Separator className="my-6" />
      
      {/* Pricing Tiers */}
      <PricingTierSelector 
        selectedTier={pricingOptions.selectedPricingTier} 
        onTierSelect={handlePricingTierSelect} 
        pricingOptions={pricingOptions}
        isFirstPost={pricingOptions.isFirstPost}
      />
      
      <div className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Additional Options</CardTitle>
            <CardDescription>Select additional options to enhance your listing.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="nationwide" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Nationwide Reach
                </label>
                <Button variant="outline" size="sm">{getNationwidePrice('job')}</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack}
          disabled={isSubmitting}
          className="flex-1"
        >
          Back to Edit
        </Button>
        <Button 
          type="button" 
          variant="default" 
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
        >
          {isSubmitting ? 'Processing...' : `Pay & Post Job - $${calculatePrice()}`}
        </Button>
      </div>
    </div>
  );
};

