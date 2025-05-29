
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { SalonFormValues, salonFormSchema } from './salonFormSchema';
import { SalonBasicInfoStep } from './steps/SalonBasicInfoStep';
import { SalonDescriptionStep } from './steps/SalonDescriptionStep';
import { SalonPhotoStep } from './steps/SalonPhotoStep';
import { SalonPricingStep } from './steps/SalonPricingStep';
import { SalonReviewStep } from './steps/SalonReviewStep';
import { type SalonPricingTier } from '@/utils/posting/salonPricing';

interface SalonListingWizardProps {
  onComplete: (formData: SalonFormValues, photos: File[], pricing: any) => void;
}

const SalonListingWizard: React.FC<SalonListingWizardProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [selectedPricingOptions, setSelectedPricingOptions] = useState({
    selectedPricingTier: 'free' as SalonPricingTier,
    isNationwide: false,
    fastSalePackage: false,
    autoRenew: false,
    isFirstPost: false
  });

  const form = useForm<SalonFormValues>({
    resolver: zodResolver(salonFormSchema),
    defaultValues: {
      beautyIndustry: "Nails",
      hideExactAddress: false,
      willTrain: false,
      hasHousing: false,
      hasWaxRoom: false,
      hasDiningRoom: false,
      hasLaundry: false,
      hasParking: false,
      isNationwide: false,
      fastSalePackage: false,
      autoRenew: false,
      termsAccepted: false,
    },
  });

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const stepTitles = [
    'Basic Information',
    'Description & Details', 
    'Photos',
    'Pricing Plan',
    'Review & Submit'
  ];

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const formData = form.getValues();
    onComplete(formData, photoUploads, selectedPricingOptions);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <SalonBasicInfoStep form={form} />;
      case 2:
        return <SalonDescriptionStep form={form} />;
      case 3:
        return (
          <SalonPhotoStep 
            form={form} 
            photoUploads={photoUploads} 
            setPhotoUploads={setPhotoUploads} 
          />
        );
      case 4:
        return (
          <SalonPricingStep 
            selectedOptions={selectedPricingOptions}
            onOptionsChange={setSelectedPricingOptions}
            form={form}
          />
        );
      case 5:
        return <SalonReviewStep form={form} photos={photoUploads} />;
      default:
        return <SalonBasicInfoStep form={form} />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-playfair font-bold text-center mb-4">
          Sell Your Salon
        </h1>
        <div className="mb-4">
          <Progress value={progress} className="w-full" />
          <p className="text-center text-sm text-gray-600 mt-2">
            Step {currentStep} of {totalSteps}: {stepTitles[currentStep - 1]}
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          {renderStep()}
          
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            
            {currentStep === totalSteps ? (
              <Button onClick={handleSubmit}>
                Submit Listing
              </Button>
            ) : (
              <Button onClick={nextStep}>
                Next
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonListingWizard;
