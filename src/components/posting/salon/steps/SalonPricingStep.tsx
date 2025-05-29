
import React from 'react';
import { SalonFormValues } from '../salonFormSchema';
import { SalonPricingOptions, DURATION_OPTIONS, calculateSalonPostPrice } from '@/utils/posting/salonPricing';

interface SalonPricingStepProps {
  formData: SalonFormValues;
  photos: File[];
  pricing: SalonPricingOptions;
  updateFormData: (data: Partial<SalonFormValues>) => void;
  updatePhotos: (photos: File[]) => void;
  updatePricing: (pricing: SalonPricingOptions) => void;
  setPricing: (pricing: SalonPricingOptions) => void;
  onNext: () => void;
  onPrev: () => void;
  onComplete: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export const SalonPricingStep = ({ 
  pricing, 
  updatePricing,
  setPricing 
}: SalonPricingStepProps) => {
  const handleDurationChange = (months: number) => {
    const newPricing = { ...pricing, durationMonths: months };
    updatePricing(newPricing);
    setPricing(newPricing);
  };

  const handleFeaturedChange = (featured: boolean) => {
    const newPricing = { ...pricing, featuredAddOn: featured };
    updatePricing(newPricing);
    setPricing(newPricing);
  };

  const handleAutoRenewChange = (autoRenew: boolean) => {
    const newPricing = { ...pricing, autoRenew };
    updatePricing(newPricing);
    setPricing(newPricing);
  };

  const totalPrice = calculateSalonPostPrice(pricing);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Plan</h2>
        <p className="text-gray-600">Select the best plan for your salon listing</p>
      </div>

      {/* Duration Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Listing Duration</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {DURATION_OPTIONS.map((option) => (
            <div
              key={option.months}
              onClick={() => handleDurationChange(option.months)}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                pricing.durationMonths === option.months
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-300'
              }`}
            >
              <div className="text-center">
                <div className="font-semibold">{option.label}</div>
                <div className="text-2xl font-bold text-purple-600">${option.price}</div>
                {option.originalPrice > option.price && (
                  <div className="text-sm text-gray-500 line-through">
                    ${option.originalPrice}
                  </div>
                )}
                <div className="text-xs text-green-600 font-medium">
                  {option.fomoBadge}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add-ons */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Add-ons</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Featured Placement</h4>
              <p className="text-sm text-gray-600">
                Stand out with premium positioning (one-time fee)
              </p>
            </div>
            <div className="flex items-center">
              <span className="text-lg font-semibold mr-4">+$10.00</span>
              <input
                type="checkbox"
                checked={pricing.featuredAddOn || false}
                onChange={(e) => handleFeaturedChange(e.target.checked)}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Auto-Renew</h4>
              <p className="text-sm text-gray-600">
                Save 5% with automatic renewal
              </p>
            </div>
            <div className="flex items-center">
              <span className="text-lg font-semibold mr-4 text-green-600">-5%</span>
              <input
                type="checkbox"
                checked={pricing.autoRenew || false}
                onChange={(e) => handleAutoRenewChange(e.target.checked)}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Price Summary */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Price Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Base Price ({pricing.durationMonths} months)</span>
            <span>${DURATION_OPTIONS.find(d => d.months === pricing.durationMonths)?.price || 19.99}</span>
          </div>
          {pricing.featuredAddOn && (
            <div className="flex justify-between">
              <span>Featured Placement</span>
              <span>+$10.00</span>
            </div>
          )}
          {pricing.autoRenew && (
            <div className="flex justify-between text-green-600">
              <span>Auto-renew discount</span>
              <span>-5%</span>
            </div>
          )}
          <div className="border-t pt-2 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
