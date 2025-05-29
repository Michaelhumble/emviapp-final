
import React from 'react';
import { SalonFormValues } from '../salonFormSchema';
import { SalonPricingOptions } from '@/utils/posting/salonPricing';

interface SalonDetailsStepProps {
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

export const SalonDetailsStep = ({ formData, updateFormData }: SalonDetailsStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Salon Details</h2>
        <p className="text-gray-600">Tell us about your salon business</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Salon Name *
          </label>
          <input
            type="text"
            value={formData.salonName}
            onChange={(e) => updateFormData({ salonName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Beautiful Nails Spa"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Type *
          </label>
          <select
            value={formData.businessType || ''}
            onChange={(e) => updateFormData({ businessType: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Select business type</option>
            <option value="nail-salon">Nail Salon</option>
            <option value="hair-salon">Hair Salon</option>
            <option value="beauty-salon">Beauty Salon</option>
            <option value="spa">Spa</option>
            <option value="barbershop">Barbershop</option>
            <option value="massage">Massage Therapy</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
    </div>
  );
};
