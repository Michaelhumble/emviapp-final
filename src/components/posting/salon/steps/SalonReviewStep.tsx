
import React from 'react';
import { SalonFormValues } from '../salonFormSchema';
import { SalonPricingOptions, getSalonPostPricingSummary } from '@/utils/posting/salonPricing';

interface SalonReviewStepProps {
  formData: SalonFormValues;
  photos: File[];
  pricing: SalonPricingOptions;
  updateFormData: (data: Partial<SalonFormValues>) => void;
  updatePhotos: (photos: File[]) => void;
  updatePricing: (pricing: SalonPricingOptions) => void;
  onNext: () => void;
  onPrev: () => void;
  onComplete: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export const SalonReviewStep = ({ 
  formData, 
  photos, 
  pricing, 
  onComplete 
}: SalonReviewStepProps) => {
  const pricingSummary = getSalonPostPricingSummary(pricing);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Your Listing</h2>
        <p className="text-gray-600">Please review all details before submitting</p>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Salon Information</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Salon Name:</span> {formData.salonName}
          </div>
          <div>
            <span className="font-medium">Business Type:</span> {formData.businessType}
          </div>
          <div>
            <span className="font-medium">Address:</span> {formData.address}
          </div>
          <div>
            <span className="font-medium">City:</span> {formData.city}
          </div>
          <div>
            <span className="font-medium">Asking Price:</span> ${formData.askingPrice}
          </div>
          <div>
            <span className="font-medium">Monthly Rent:</span> ${formData.monthlyRent}
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Pricing Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Plan:</span>
            <span>{pricingSummary.planName}</span>
          </div>
          <div className="flex justify-between">
            <span>Base Price:</span>
            <span>${pricingSummary.basePrice.toFixed(2)}</span>
          </div>
          {pricing.featuredAddOn && (
            <div className="flex justify-between">
              <span>Featured Placement (one-time):</span>
              <span>$10.00</span>
            </div>
          )}
          {pricing.autoRenew && (
            <div className="flex justify-between text-green-600">
              <span>Auto-renew discount:</span>
              <span>-${pricingSummary.autoRenewDiscount.toFixed(2)}</span>
            </div>
          )}
          <div className="border-t pt-2 flex justify-between font-semibold">
            <span>Total:</span>
            <span>${pricingSummary.finalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium"
        >
          Complete Listing
        </button>
      </div>
    </div>
  );
};
