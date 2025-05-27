
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import SalonDetailsSection from './SalonDetailsSection';
import SalonPhotosSection from './SalonPhotosSection';
import SalonPricingSection from './SalonPricingSection';
import SalonReviewSection from './SalonReviewSection';
import { SalonFormValues } from './salonFormSchema';
import { SalonPricingOptions } from '@/utils/posting/salonPricing';

interface SalonListingWizardProps {
  onComplete: (formData: SalonFormValues, options: SalonPricingOptions) => void;
}

type WizardStep = 'details' | 'photos' | 'pricing' | 'review' | 'payment';

const SalonListingWizard: React.FC<SalonListingWizardProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState<WizardStep>('details');
  const [formData, setFormData] = useState<Partial<SalonFormValues>>({
    numberOfTables: "4",
    numberOfChairs: "9"
  });
  const [photos, setPhotos] = useState<File[]>([]);
  const [pricingOptions, setPricingOptions] = useState<SalonPricingOptions>({
    durationMonths: 1,
    selectedPricingTier: 'basic',
    isNationwide: false,
    fastSalePackage: false,
    featuredBoost: false
  });
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const steps = [
    { key: 'details', label: 'Salon Details' },
    { key: 'photos', label: 'Photos' },
    { key: 'pricing', label: 'Pricing' },
    { key: 'review', label: 'Review' },
    { key: 'payment', label: 'Payment' }
  ];

  const currentStepIndex = steps.findIndex(step => step.key === currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const handleNext = () => {
    const stepIndex = currentStepIndex;
    if (stepIndex < steps.length - 1) {
      setCurrentStep(steps[stepIndex + 1].key as WizardStep);
    }
  };

  const handleBack = () => {
    const stepIndex = currentStepIndex;
    if (stepIndex > 0) {
      setCurrentStep(steps[stepIndex - 1].key as WizardStep);
    }
  };

  const handleComplete = () => {
    if (paymentCompleted && formData) {
      onComplete(formData as SalonFormValues, pricingOptions);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'details':
        return (
          <SalonDetailsSection
            formData={formData}
            onUpdate={setFormData}
            onNext={handleNext}
          />
        );
      case 'photos':
        return (
          <SalonPhotosSection
            photos={photos}
            onPhotosChange={setPhotos}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 'pricing':
        return (
          <SalonPricingSection
            options={pricingOptions}
            onOptionsChange={setPricingOptions}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 'review':
        return (
          <SalonReviewSection
            formData={formData as SalonFormValues}
            photos={photos}
            options={pricingOptions}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 'payment':
        return (
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold">Complete Payment</h3>
            <p>Payment integration will be implemented here</p>
            <button 
              onClick={() => {
                setPaymentCompleted(true);
                handleComplete();
              }}
              className="bg-green-600 text-white px-6 py-2 rounded"
            >
              Complete Payment & Publish
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Sell Your Salon</CardTitle>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              {steps.map((step, index) => (
                <span 
                  key={step.key} 
                  className={index <= currentStepIndex ? 'text-purple-600 font-medium' : ''}
                >
                  {step.label}
                </span>
              ))}
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </CardHeader>
        <CardContent>
          {renderCurrentStep()}
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonListingWizard;
