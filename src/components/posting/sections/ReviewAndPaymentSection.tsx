
import React, { useState } from 'react';
import { jobPricingOptions } from '@/utils/posting/jobPricing';
import PricingCards from '@/components/posting/PricingCards';
import PricingDisplay from '@/components/posting/PricingDisplay';
import { PostType, PricingOptions } from '@/utils/posting/types';
import { Card, CardContent } from '@/components/ui/card';

interface ReviewAndPaymentSectionProps {
  postType: PostType;
  formData: any;
  onNextStep: () => void;
  onPrevStep: () => void;
  isFirstPost?: boolean;
  pricingOptions?: PricingOptions;
}

const ReviewAndPaymentSection = ({
  postType,
  formData,
  onNextStep,
  onPrevStep,
  isFirstPost = false,
  pricingOptions = {}
}: ReviewAndPaymentSectionProps) => {
  const [selectedPricing, setSelectedPricing] = useState(jobPricingOptions[2].id); // Default to Gold
  const [showExtraOptions, setShowExtraOptions] = useState(false);

  // Calculate the actual price based on selection and options
  const calculatePrice = () => {
    const baseOption = jobPricingOptions.find(option => option.id === selectedPricing);
    const price = baseOption ? baseOption.price : 0;
    
    return isFirstPost && selectedPricing === 'standard' ? 0 : price;
  };

  const handlePricingChange = (pricingId: string) => {
    setSelectedPricing(pricingId);
  };

  // Calculate final price
  const finalPrice = calculatePrice();
  const selectedOption = jobPricingOptions.find(option => option.id === selectedPricing);
  const promotionalText = isFirstPost && selectedPricing === 'standard' 
    ? "Your first standard post is on us! Future posts will be billed at regular rates."
    : undefined;

  return (
    <div className="space-y-8 max-w-6xl mx-auto px-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-3">
          Select Your Listing Package
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Choose the best option to reach your target audience. Every tier offers unique benefits.
        </p>
      </div>
      
      {/* Pricing Cards */}
      <div className="overflow-hidden">
        <PricingCards 
          pricingOptions={jobPricingOptions}
          selectedPricing={selectedPricing}
          onChange={handlePricingChange}
        />
      </div>
      
      {/* Summary Card */}
      <div className="mt-12">
        <Card className="border-primary/20 max-w-xl mx-auto">
          <CardContent className="pt-6">
            <PricingDisplay 
              postType={postType}
              price={finalPrice}
              options={{
                isFirstPost,
                ...pricingOptions,
              }}
              promotionalText={promotionalText}
              originalPrice={selectedOption?.wasPrice}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReviewAndPaymentSection;
