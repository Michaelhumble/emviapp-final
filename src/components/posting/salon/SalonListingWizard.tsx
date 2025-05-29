
import React, { useState } from 'react';
import { SalonFormValues } from './salonFormSchema';
import { SalonPricingOptions } from '@/utils/posting/salonPricing';
import { SalonDetailsStep } from './steps/SalonDetailsStep';
import { LocationDetailsStep } from './steps/LocationDetailsStep';
import { FinancialDetailsStep } from './steps/FinancialDetailsStep';
import { FeaturesDetailsStep } from './steps/FeaturesDetailsStep';
import { PhotoUploadStep } from './steps/PhotoUploadStep';
import { SalonPricingStep } from './steps/SalonPricingStep';
import { SalonReviewStep } from './steps/SalonReviewStep';
import { useStripe } from '@/hooks/useStripe';
import { toast } from 'sonner';

interface SalonListingWizardProps {
  onComplete: (formData: SalonFormValues, photos: File[], pricing: SalonPricingOptions) => void;
}

export const SalonListingWizard = ({ onComplete }: SalonListingWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<SalonFormValues>({
    salonName: '',
    businessType: '',
    address: '',
    city: '',
    state: '',
    askingPrice: '',
    monthlyRent: ''
  });
  const [photos, setPhotos] = useState<File[]>([]);
  const [pricing, setPricing] = useState<SalonPricingOptions>({
    selectedPricingTier: 'standard',
    durationMonths: 3,
    featuredAddOn: false,
    autoRenew: false
  });

  const { initiatePayment, isLoading } = useStripe();

  const steps = [
    'Salon Details',
    'Location',
    'Financial Info',
    'Features',
    'Photos',
    'Pricing',
    'Review'
  ];

  const updateFormData = (data: Partial<SalonFormValues>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const updatePhotos = (newPhotos: File[]) => {
    setPhotos(newPhotos);
  };

  const updatePricing = (newPricing: SalonPricingOptions) => {
    setPricing(newPricing);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    try {
      const success = await initiatePayment(pricing, formData);
      if (success) {
        onComplete(formData, photos, pricing);
        toast.success('Salon listing created successfully!');
      }
    } catch (error) {
      console.error('Error completing salon listing:', error);
      toast.error('Failed to complete salon listing. Please try again.');
    }
  };

  const stepProps = {
    formData,
    photos,
    pricing,
    updateFormData,
    updatePhotos,
    updatePricing,
    onNext: nextStep,
    onPrev: prevStep,
    onComplete: handleComplete,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === steps.length - 1
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <SalonDetailsStep {...stepProps} />;
      case 1:
        return <LocationDetailsStep {...stepProps} />;
      case 2:
        return <FinancialDetailsStep {...stepProps} />;
      case 3:
        return <FeaturesDetailsStep {...stepProps} />;
      case 4:
        return <PhotoUploadStep {...stepProps} />;
      case 5:
        return <SalonPricingStep {...stepProps} setPricing={updatePricing} />;
      case 6:
        return <SalonReviewStep {...stepProps} />;
      default:
        return <SalonDetailsStep {...stepProps} />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {steps.map((step, index) => (
            <div
              key={step}
              className={`flex items-center ${
                index <= currentStep ? 'text-purple-600' : 'text-gray-400'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index <= currentStep
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {index + 1}
              </div>
              <span className="ml-2 text-sm font-medium hidden md:block">
                {step}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        {renderStep()}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        {currentStep === steps.length - 1 ? (
          <button
            onClick={handleComplete}
            disabled={isLoading}
            className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : 'Complete & Pay'}
          </button>
        ) : (
          <button
            onClick={nextStep}
            className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};
