import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';
import YesLadder from '../upsell/YesLadder';
import PricingTierSelector from '../pricing/PricingTierSelector';
import { PricingOptions, JobPricingTier } from '@/utils/posting/types';
import { getNationwidePrice } from '@/utils/posting/pricing';
import { useTranslation } from '@/hooks/useTranslation';
import { calculateJobPostPrice, getJobPostPricingSummary } from '@/utils/posting/jobPricing';
import { DurationOption, PricingWithDuration } from '@/types/pricing';
import { MultiSelect } from '@/components/ui/multi-select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { JobFormValues } from '../job/jobFormSchema';

interface ReviewAndPaymentSectionProps {
  formData: JobFormValues | null;
  photoUploads: File[];
  onBack: () => void;
  onSubmit: (pricingOptions: PricingOptions) => Promise<void>;
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
  const { t } = useTranslation();
  const [showPremiumSuggestion, setShowPremiumSuggestion] = useState(false);
  const [upsellOptions, setUpsellOptions] = useState({
    expertReview: false,
    priorityPlacement: false,
    extendedReach: false
  });
  
  const durationOptions: DurationOption[] = [
    { months: 1, label: '1 Month', vietnameseLabel: '1 Tháng', discount: 0 },
    { months: 3, label: '3 Months', vietnameseLabel: '3 Tháng', discount: 10 },
    { months: 6, label: '6 Months', vietnameseLabel: '6 Tháng', discount: 20 },
  ];
  
  const handleDurationChange = (months: number) => {
    setPricingOptions(prev => ({
      ...prev,
      durationMonths: months
    }));
  };
  
  const handleTierChange = (tier: JobPricingTier) => {
    setPricingOptions(prev => ({
      ...prev,
      selectedPricingTier: tier
    }));
  };
  
  const handleUpsellOptionsChange = (options: {
    expertReview: boolean;
    priorityPlacement: boolean;
    extendedReach: boolean;
  }) => {
    setUpsellOptions(options);
    
    // Update pricing options with upsell selections
    setPricingOptions(prev => ({
      ...prev,
      expertReview: options.expertReview,
      priorityPlacement: options.priorityPlacement,
      extendedReach: options.extendedReach
    }));
  };
  
  const suggestPremium = () => {
    setShowPremiumSuggestion(true);
  };
  
  const handleSubmitClick = async () => {
    if (!formData) {
      toast.error("Please complete the form before proceeding");
      return;
    }
    
    try {
      await onSubmit(pricingOptions);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("There was an error processing your submission");
    }
  };
  
  const calculatePrice = (): PricingWithDuration => {
    // Base price depends on the selected tier
    let basePricePerMonth = 0;
    
    switch (pricingOptions.selectedPricingTier) {
      case 'free':
        basePricePerMonth = 0;
        break;
      case 'standard':
        basePricePerMonth = 9.99;
        break;
      case 'premium':
        basePricePerMonth = 19.99;
        break;
      case 'gold':
        basePricePerMonth = 29.99;
        break;
      case 'diamond':
        basePricePerMonth = 49.99;
        break;
      default:
        basePricePerMonth = 9.99;
    }
    
    // Find the selected duration option
    const selectedDuration = durationOptions.find(
      option => option.months === pricingOptions.durationMonths
    ) || durationOptions[0];
    
    return {
      basePricePerMonth,
      durationMonths: selectedDuration.months,
      discountPercentage: selectedDuration.discount
    };
  };
  
  const pricing = calculatePrice();
  const discountAmount = pricing.basePricePerMonth * pricing.durationMonths * (pricing.discountPercentage / 100);
  const totalPrice = (pricing.basePricePerMonth * pricing.durationMonths) - discountAmount;
  
  // Format price for display
  const formattedPrice = totalPrice.toFixed(2);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack} 
          className="mr-2"
          disabled={isSubmitting}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h2 className="text-2xl font-semibold">Review & Payment</h2>
      </div>
      
      {/* Form Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Job Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Title</h3>
              <p>{formData?.title || 'Not provided'}</p>
            </div>
            
            <div>
              <h3 className="font-medium">Location</h3>
              <p>{formData?.location || 'Not provided'}</p>
            </div>
            
            <div>
              <h3 className="font-medium">Job Type</h3>
              <p>{formData?.jobType || 'Not provided'}</p>
            </div>
            
            <div>
              <h3 className="font-medium">Contact Email</h3>
              <p>{formData?.contactEmail || 'Not provided'}</p>
            </div>
            
            {photoUploads.length > 0 && (
              <div>
                <h3 className="font-medium">Photos</h3>
                <p>{photoUploads.length} photo(s) attached</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Upsell Options */}
      <YesLadder 
        onOptionChange={handleUpsellOptionsChange}
        suggestPremium={suggestPremium}
      />
      
      {/* Pricing Tiers */}
      <PricingTierSelector
        selectedTier={pricingOptions.selectedPricingTier}
        onTierSelect={handleTierChange}
        pricingOptions={pricingOptions}
        isFirstPost={pricingOptions.isFirstPost}
      />
      
      {/* Duration Selection */}
      {pricingOptions.selectedPricingTier !== 'free' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              value={pricingOptions.durationMonths.toString()} 
              onValueChange={(value) => handleDurationChange(parseInt(value))}
              className="flex flex-col space-y-3"
            >
              {durationOptions.map((option) => (
                <div key={option.months} className="flex items-center space-x-3 rounded-md border p-3">
                  <RadioGroupItem value={option.months.toString()} id={`duration-${option.months}`} />
                  <Label htmlFor={`duration-${option.months}`} className="flex-1">
                    <div className="flex justify-between">
                      <span>{option.label}</span>
                      {option.discount > 0 && (
                        <span className="text-green-600 font-medium">Save {option.discount}%</span>
                      )}
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      )}
      
      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Base Price</span>
              <span>${pricing.basePricePerMonth.toFixed(2)} × {pricing.durationMonths} {pricing.durationMonths === 1 ? 'month' : 'months'}</span>
            </div>
            
            {pricing.discountPercentage > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Duration Discount ({pricing.discountPercentage}%)</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            
            <Separator />
            
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${formattedPrice}</span>
            </div>
            
            {pricingOptions.selectedPricingTier === 'free' && (
              <div className="mt-4 p-3 bg-blue-50 rounded-md text-blue-700 text-sm">
                <CheckCircle2 className="inline-block h-4 w-4 mr-1" />
                Your first job post is free! No payment required.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Submit Button */}
      <Button 
        onClick={handleSubmitClick} 
        disabled={isSubmitting} 
        className="w-full"
      >
        {isSubmitting ? 'Processing...' : pricingOptions.selectedPricingTier === 'free' ? 'Post Job' : 'Proceed to Payment'}
      </Button>
      
      {/* Premium Suggestion */}
      {showPremiumSuggestion && pricingOptions.selectedPricingTier === 'standard' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 border border-amber-200 bg-amber-50 rounded-lg mt-4"
        >
          <p className="text-amber-800 text-sm">
            <strong>Pro tip:</strong> Upgrade to Premium to get all enhancement features included, plus priority placement in search results!
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-2 bg-amber-100 hover:bg-amber-200 border-amber-300"
            onClick={() => handleTierChange('premium')}
          >
            Upgrade to Premium
          </Button>
        </motion.div>
      )}
    </div>
  );
};
