
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { salonFormSchema, type SalonFormValues } from './salonFormSchema';
import { SalonBasicInfoStep } from './steps/SalonBasicInfoStep';
import { SalonDescriptionStep } from './steps/SalonDescriptionStep';
import { SalonPhotoStep } from './steps/SalonPhotoStep';
import { SalonPricingStep } from './steps/SalonPricingStep';
import { SalonReviewStep } from './steps/SalonReviewStep';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { type SalonPricingOptions, type SalonPricingTier } from '@/utils/posting/salonPricing';

interface SalonListingWizardProps {
  onComplete: (formData: SalonFormValues, photos: File[], pricing: SalonPricingOptions) => void;
}

const SalonListingWizard = ({ onComplete }: SalonListingWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [photos, setPhotos] = useState<File[]>([]);
  const [pricingOptions, setPricingOptions] = useState<SalonPricingOptions>({
    selectedPricingTier: 'standard' as SalonPricingTier,
    durationMonths: 1,
    featuredAddOn: false,
    autoRenew: false,
    isFirstPost: false
  });

  const form = useForm<SalonFormValues>({
    resolver: zodResolver(salonFormSchema),
    defaultValues: {
      businessName: '',
      location: '',
      price: '',
      description: '',
      features: [],
      contactName: '',
      contactPhone: '',
      contactEmail: '',
      autoRenew: false
    }
  });

  const handlePricingChange = (options: SalonPricingOptions) => {
    setPricingOptions(options);
    form.setValue('autoRenew', options.autoRenew || false);
  };

  const steps = [
    {
      title: 'Basic Information',
      component: <SalonBasicInfoStep form={form} />
    },
    {
      title: 'Description & Features',
      component: <SalonDescriptionStep form={form} />
    },
    {
      title: 'Photos',
      component: <SalonPhotoStep photos={photos} onPhotosChange={setPhotos} />
    },
    {
      title: 'Pricing Plan',
      component: (
        <SalonPricingStep
          selectedOptions={pricingOptions}
          onOptionsChange={handlePricingChange}
          form={form}
        />
      )
    },
    {
      title: 'Review & Submit',
      component: (
        <SalonReviewStep
          formData={form.getValues()}
          photos={photos}
          pricingOptions={pricingOptions}
          onComplete={() => onComplete(form.getValues(), photos, pricingOptions)}
        />
      )
    }
  ];

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

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        const basicFields = ['businessName', 'location', 'price'] as const;
        return basicFields.every(field => {
          const value = form.getValues(field);
          return value && value.trim().length > 0;
        });
      case 1:
        const description = form.getValues('description');
        return description && description.trim().length >= 10;
      case 2:
        return photos.length > 0;
      case 3:
        return true; // Pricing step is always valid with defaults
      default:
        return true;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index <= currentStep
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 ${
                    index < currentStep ? 'bg-primary' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <h2 className="text-xl font-semibold">{steps[currentStep].title}</h2>
      </div>

      {/* Step content */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        {steps[currentStep].component}
      </motion.div>

      {/* Navigation buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0}
          className="flex items-center"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        {currentStep < steps.length - 1 ? (
          <Button
            onClick={nextStep}
            disabled={!isStepValid()}
            className="flex items-center"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default SalonListingWizard;
