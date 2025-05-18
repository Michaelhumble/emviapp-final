import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { JobFormValues } from '@/components/posting/job/jobFormSchema';
import { PricingOptions } from '@/utils/posting/types';
import { calculatePricing } from '@/utils/posting/pricing';
import { PaymentSummary } from '@/components/posting/PaymentSummary';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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

  if (!formData) {
    return <div>No form data available.</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Review Job Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium leading-none">Job Title</p>
              <p className="text-sm text-gray-500">{formData.title}</p>
            </div>
            <div>
              <p className="text-sm font-medium leading-none">Location</p>
              <p className="text-sm text-gray-500">{formData.location}</p>
            </div>
            <div>
              <p className="text-sm font-medium leading-none">Job Type</p>
              <p className="text-sm text-gray-500">{formData.jobType}</p>
            </div>
            <div>
              <p className="text-sm font-medium leading-none">Experience Level</p>
              <p className="text-sm text-gray-500">{formData.experience_level}</p>
            </div>
            <div>
              <p className="text-sm font-medium leading-none">Contact Email</p>
              <p className="text-sm text-gray-500">{formData.contactEmail}</p>
            </div>
            <div>
              <p className="text-sm font-medium leading-none">Contact Name</p>
              <p className="text-sm text-gray-500">{formData.contactName || 'N/A'}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium leading-none">Description</p>
            <p className="text-sm text-gray-500">{formData.description}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <PaymentSummary 
            priceData={calculatedPrice} 
            durationMonths={pricingOptions.durationMonths}
            autoRenew={pricingOptions.autoRenew}
          />

          <div className="flex items-center justify-between">
            <div className="space-x-2">
              <Label htmlFor="auto-renew">Auto-Renew</Label>
              <p className="text-sm text-gray-500">Automatically renew your subscription each month.</p>
            </div>
            <Switch
              id="auto-renew"
              checked={pricingOptions.autoRenew}
              onCheckedChange={handleAutoRenewChange}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="secondary" onClick={onBack}>
          Back to Edit
        </Button>
        <Button disabled={isSubmitting} onClick={onSubmit}>
          {isSubmitting ? 'Submitting...' : 'Submit Job Post'}
        </Button>
      </div>
    </div>
  );
};
