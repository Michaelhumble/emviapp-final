
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { SalonFormValues } from './salonFormSchema';
import { SalonPostForm } from './SalonPostForm';
import SalonPricingSection from './SalonPricingSection';
import SalonPaymentFeatures from './SalonPaymentFeatures';
import { SalonPricingOptions } from '@/utils/posting/salonPricing';

interface SalonListingWizardProps {
  onComplete: (formData: SalonFormValues, options: SalonPricingOptions) => void;
}

const SalonListingWizard: React.FC<SalonListingWizardProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<SalonFormValues | null>(null);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<SalonPricingOptions>({
    durationMonths: 1,
    selectedPricingTier: 'standard',
    autoRenew: false,
    isNationwide: false,
    isFirstPost: true,
    showAtTop: false,
    fastSalePackage: false,
    bundleWithJobPost: false,
    featuredBoost: false
  });

  const steps = [
    'Salon Details',
    'Description & Features', 
    'Upload Photos',
    'Choose Your Plan',
    'Payment & Review',
    'Success'
  ];

  const handleFormSubmit = (values: SalonFormValues) => {
    setFormData(values);
    setCurrentStep(4); // Go to pricing step
  };

  const handlePricingNext = () => {
    setCurrentStep(5); // Go to payment step
  };

  const handlePricingBack = () => {
    setCurrentStep(1); // Go back to form (which includes photos)
  };

  const handlePayment = () => {
    if (formData) {
      onComplete(formData, selectedOptions);
    }
  };

  const handlePaymentBack = () => {
    setCurrentStep(4); // Go back to pricing
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Step {currentStep} of {steps.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="w-full" />
            <div className="flex justify-between text-sm">
              {steps.map((step, index) => (
                <span 
                  key={index}
                  className={`${
                    index + 1 <= currentStep 
                      ? 'text-purple-600 font-medium' 
                      : 'text-gray-400'
                  }`}
                >
                  {step}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card>
        <CardContent className="p-8">
          {currentStep <= 3 && (
            <SalonPostForm
              onSubmit={handleFormSubmit}
              photoUploads={photoUploads}
              setPhotoUploads={setPhotoUploads}
              onNationwideChange={(checked) => 
                setSelectedOptions(prev => ({ ...prev, isNationwide: checked }))
              }
              onFastSaleChange={(checked) => 
                setSelectedOptions(prev => ({ ...prev, fastSalePackage: checked }))
              }
            />
          )}

          {currentStep === 4 && (
            <SalonPricingSection
              selectedOptions={selectedOptions}
              onOptionsChange={setSelectedOptions}
              onNext={handlePricingNext}
              onBack={handlePricingBack}
              isFirstPost={true}
            />
          )}

          {currentStep === 5 && formData && (
            <SalonPaymentFeatures
              formData={formData}
              selectedOptions={selectedOptions}
              onPayment={handlePayment}
              onBack={handlePaymentBack}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonListingWizard;
