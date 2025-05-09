
import React, { useState } from 'react';
import { jobPricingOptions } from '@/utils/posting/jobPricing';
import PricingCards from '@/components/posting/PricingCards';
import PricingDisplay from '@/components/posting/PricingDisplay';
import { PostType, PricingOptions } from '@/utils/posting/types';
import { Card, CardContent } from '@/components/ui/card';
import DurationSelector from '@/components/posting/DurationSelector';
import { DurationSelection } from '@/types/pricing';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

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
  
  // Track selected duration for each pricing tier
  const [selectedDurations, setSelectedDurations] = useState<DurationSelection>({
    standard: 1,
    gold: 1,
    premium: 1,
    diamond: 12 // Diamond plan is annual only
  });

  // Get discount percentage based on selected duration
  const getDiscountForDuration = (months: number): number => {
    switch (months) {
      case 3: return 0.1; // 10% discount
      case 6: return 0.2; // 20% discount
      case 12: return 0.3; // 30% discount
      default: return 0; // no discount
    }
  };

  // Calculate the actual price based on selection, duration and options
  const calculatePrice = () => {
    const baseOption = jobPricingOptions.find(option => option.id === selectedPricing);
    let price = baseOption ? baseOption.price : 0;
    
    // For free tier or first post standard, return 0 or base price
    if (selectedPricing === 'free' || (isFirstPost && selectedPricing === 'standard')) {
      return isFirstPost && selectedPricing === 'standard' ? 0 : price;
    }
    
    // Apply duration discount for paid tiers
    const months = selectedDurations[selectedPricing] || 1;
    const discount = getDiscountForDuration(months);
    
    // Calculate total price for the selected duration with discount
    const totalPrice = price * months;
    const discountedPrice = totalPrice * (1 - discount);
    
    return discountedPrice;
  };

  const handlePricingChange = (pricingId: string) => {
    setSelectedPricing(pricingId);
  };

  const handleDurationChange = (pricingId: string, months: number) => {
    setSelectedDurations(prev => ({
      ...prev,
      [pricingId]: months
    }));
  };

  // Calculate final price
  const finalPrice = calculatePrice();
  const selectedOption = jobPricingOptions.find(option => option.id === selectedPricing);
  const promotionalText = isFirstPost && selectedPricing === 'standard' 
    ? "Your first standard post is on us! Future posts will be billed at regular rates."
    : undefined;
  
  // Get selected duration
  const selectedDuration = selectedDurations[selectedPricing] || 1;
  
  // Calculate discount percentage for display
  const discountPercentage = getDiscountForDuration(selectedDuration) * 100;
  
  // Calculate the original total price before discount
  const originalTotalPrice = selectedOption ? selectedOption.price * selectedDuration : 0;

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
      
      {/* Pricing Cards with improved layout - now in 2 rows */}
      <div className="px-0 md:px-4 lg:px-6">
        <div className="grid grid-cols-1 gap-4">
          {/* Top row: Premium and Diamond */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobPricingOptions
              .filter(option => ['premium', 'diamond'].includes(option.id))
              .map((option) => (
                <div key={option.id} className="flex">
                  <PricingCards 
                    pricingOptions={[option]}
                    selectedPricing={selectedPricing}
                    onChange={handlePricingChange}
                    className="w-full"
                  />
                </div>
              ))}
          </div>
          
          {/* Bottom row: Free, Standard, and Gold */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {jobPricingOptions
              .filter(option => ['free', 'standard', 'gold'].includes(option.id))
              .map((option) => (
                <div key={option.id} className="flex">
                  <PricingCards 
                    pricingOptions={[option]}
                    selectedPricing={selectedPricing}
                    onChange={handlePricingChange}
                    className="w-full"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
      
      {/* Duration Selector - only show for paid tiers except Diamond */}
      {selectedPricing !== 'free' && (
        <div className="mt-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <h3 className="font-medium text-center">Select Duration</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-help">
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">Save more when you commit longer 💰</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          {selectedPricing !== 'diamond' ? (
            <DurationSelector 
              selectedDuration={selectedDurations[selectedPricing] || 1}
              onChange={(duration) => handleDurationChange(selectedPricing, duration)}
            />
          ) : (
            <div className="text-center text-sm text-muted-foreground">
              <p className="mb-1">
                <span className="font-semibold">🔥 Only 3 Available</span>
              </p>
              <p>Vị trí đặc biệt – Chỉ 3 chỗ duy nhất</p>
              <p className="mt-2">Annual subscription only (12 months)</p>
            </div>
          )}
        </div>
      )}
      
      {/* Expiration notice */}
      <div className="text-center text-sm text-muted-foreground mt-1">
        <p>🕒 All listings expire after 30 days. Auto-renew saves up to 20%.</p>
      </div>
      
      {/* Summary Card */}
      <div className="mt-8">
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
              originalPrice={selectedOption?.wasPrice || (discountPercentage > 0 ? originalTotalPrice : undefined)}
              discountPercentage={discountPercentage > 0 ? discountPercentage : undefined}
              duration={selectedDuration}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReviewAndPaymentSection;
