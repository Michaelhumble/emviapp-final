
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { JobFormValues } from '@/components/posting/job/jobFormSchema';
import { PricingOptions } from '@/utils/posting/types';
import { calculatePricing, formatCurrency } from '@/utils/posting/pricing';
import { PaymentSummary } from '@/components/posting/PaymentSummary';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from '@/components/ui/badge';
import { JobPostPreview } from '@/components/posting/job/JobPostPreview';
import { Separator } from '@/components/ui/separator';

interface ReviewAndPaymentSectionProps {
  formData: JobFormValues | null;
  photoUploads: File[];
  onBack: () => void;
  onSubmit: () => Promise<void>;
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
  const [calculatedPrice, setCalculatedPrice] = useState({ originalPrice: 0, finalPrice: 0, discountPercentage: 0 });

  useEffect(() => {
    if (formData) {
      const { selectedPricingTier, durationMonths, autoRenew, isFirstPost, isNationwide } = pricingOptions;
      const calculated = calculatePricing(selectedPricingTier, durationMonths, autoRenew, isFirstPost, isNationwide);
      setCalculatedPrice(calculated);
    }
  }, [formData, pricingOptions]);

  const handleAutoRenewChange = (checked: boolean) => {
    setPricingOptions(prev => ({ ...prev, autoRenew: checked }));
  };

  // Function to handle pricing tier change
  const handlePricingTierChange = (tier: string) => {
    setPricingOptions(prev => ({ ...prev, selectedPricingTier: tier }));
  };

  // Function to handle duration change
  const handleDurationChange = (months: number) => {
    setPricingOptions(prev => ({ ...prev, durationMonths: months }));
  };

  // Function to handle nationwide option change
  const handleNationwideChange = (checked: boolean) => {
    setPricingOptions(prev => ({ ...prev, isNationwide: checked }));
  };

  if (!formData) {
    return <div>No form data available.</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Review Job Post</h2>
      
      {/* Job Preview Card */}
      <JobPostPreview 
        jobData={formData} 
        photoUploads={photoUploads}
        onBack={onBack}
      />
      
      {/* Pricing Section Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Select Pricing Plan</span>
            {calculatedPrice.discountPercentage > 0 && (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Save {calculatedPrice.discountPercentage}% OFF
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Pricing Tier Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div 
              onClick={() => handlePricingTierChange('standard')}
              className={`cursor-pointer rounded-lg border p-4 ${pricingOptions.selectedPricingTier === 'standard' ? 'border-2 border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <div className="font-medium">Standard</div>
              <div className="text-sm text-gray-500">Basic visibility</div>
              <div className="mt-2 font-semibold">{formatCurrency(9.99)}/mo</div>
            </div>
            
            <div 
              onClick={() => handlePricingTierChange('premium')}
              className={`cursor-pointer rounded-lg border p-4 relative ${pricingOptions.selectedPricingTier === 'premium' ? 'border-2 border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <Badge className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3">Popular</Badge>
              <div className="font-medium">Premium</div>
              <div className="text-sm text-gray-500">Enhanced visibility</div>
              <div className="mt-2 font-semibold">{formatCurrency(19.99)}/mo</div>
            </div>
            
            <div 
              onClick={() => handlePricingTierChange('gold')}
              className={`cursor-pointer rounded-lg border p-4 ${pricingOptions.selectedPricingTier === 'gold' ? 'border-2 border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <div className="font-medium">Gold</div>
              <div className="text-sm text-gray-500">Maximum visibility</div>
              <div className="mt-2 font-semibold">{formatCurrency(39.99)}/mo</div>
            </div>
          </div>
          
          {/* Duration Selection */}
          <div className="space-y-2">
            <Label>Duration</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <Button 
                type="button" 
                variant={pricingOptions.durationMonths === 1 ? "default" : "outline"}
                onClick={() => handleDurationChange(1)}
                className="w-full"
              >
                1 Month
              </Button>
              <Button 
                type="button" 
                variant={pricingOptions.durationMonths === 3 ? "default" : "outline"}
                onClick={() => handleDurationChange(3)}
                className="w-full"
              >
                3 Months <Badge variant="outline" className="ml-1">-10%</Badge>
              </Button>
              <Button 
                type="button" 
                variant={pricingOptions.durationMonths === 6 ? "default" : "outline"}
                onClick={() => handleDurationChange(6)}
                className="w-full"
              >
                6 Months <Badge variant="outline" className="ml-1">-15%</Badge>
              </Button>
              <Button 
                type="button" 
                variant={pricingOptions.durationMonths === 12 ? "default" : "outline"}
                onClick={() => handleDurationChange(12)}
                className="w-full"
              >
                12 Months <Badge variant="outline" className="ml-1">-20%</Badge>
              </Button>
            </div>
          </div>
          
          {/* Additional Options */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="nationwide" className="font-medium">Nationwide Listing</Label>
                <p className="text-sm text-gray-500">Make your job visible across the country</p>
              </div>
              <Switch 
                id="nationwide" 
                checked={pricingOptions.isNationwide || false}
                onCheckedChange={handleNationwideChange}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-renew" className="font-medium">Auto-Renew</Label>
                <p className="text-sm text-gray-500">Automatically renew your subscription each month</p>
              </div>
              <Switch
                id="auto-renew"
                checked={pricingOptions.autoRenew}
                onCheckedChange={handleAutoRenewChange}
              />
            </div>
            
            {pricingOptions.isFirstPost && pricingOptions.selectedPricingTier === 'free' && (
              <div className="bg-yellow-50 p-3 rounded-md text-amber-800 text-sm">
                <p className="font-medium">Free for your first post! Credit card required for future posts.</p>
                <p className="mt-1">After your first free post, standard pricing will apply.</p>
              </div>
            )}
          </div>

          <Separator />
          
          {/* Payment Summary */}
          <PaymentSummary 
            priceData={calculatedPrice} 
            durationMonths={pricingOptions.durationMonths}
            autoRenew={pricingOptions.autoRenew}
          />
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="sticky bottom-4 bg-white p-4 border border-gray-200 rounded-lg shadow-lg flex justify-between items-center">
        <Button variant="outline" onClick={onBack}>
          Back to Edit
        </Button>
        <div className="flex items-center gap-2">
          <div className="text-right hidden md:block">
            <div className="text-sm text-gray-500">Total Price:</div>
            <div className="font-bold text-lg">
              {formatCurrency(calculatedPrice.finalPrice)}
            </div>
          </div>
          <Button 
            disabled={isSubmitting} 
            onClick={onSubmit} 
            size="lg"
          >
            {isSubmitting ? 'Submitting...' : calculatedPrice.finalPrice === 0 
              ? 'Post Job (Free Trial)'
              : `Pay & Post Job (${formatCurrency(calculatedPrice.finalPrice)})`}
          </Button>
        </div>
      </div>
    </div>
  );
};
