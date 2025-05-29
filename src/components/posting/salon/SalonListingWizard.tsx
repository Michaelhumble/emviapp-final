
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { salonFormSchema, type SalonFormValues } from './salonFormSchema';
import { SalonPricingOptions, type SalonPricingTier } from '@/utils/posting/salonPricing';
import { SalonBasicInfoStep } from './steps/SalonBasicInfoStep';
import { SalonDescriptionStep } from './steps/SalonDescriptionStep';
import { SalonPhotoStep } from './steps/SalonPhotoStep';
import { SalonPricingStep } from './steps/SalonPricingStep';
import { SalonReviewStep } from './steps/SalonReviewStep';
import { useTranslation } from '@/hooks/useTranslation';

interface SalonListingWizardProps {
  onComplete: (formData: SalonFormValues, photos: File[], pricing: SalonPricingOptions) => void;
}

const STEPS = [
  { id: 'basic', title: 'Basic Information' },
  { id: 'description', title: 'Description' },
  { id: 'photos', title: 'Photos' },
  { id: 'pricing', title: 'Pricing' },
  { id: 'review', title: 'Review' }
];

const SalonListingWizard: React.FC<SalonListingWizardProps> = ({ onComplete }) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [photos, setPhotos] = useState<File[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<SalonPricingOptions>({
    selectedPricingTier: 'standard' as SalonPricingTier,
    durationMonths: 1,
    isNationwide: false,
    fastSalePackage: false,
    showAtTop: false,
    bundleWithJobPost: false,
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

  const handleNext = async () => {
    const currentStepData = getCurrentStepFields();
    const isValid = await form.trigger(currentStepData);
    
    if (isValid) {
      if (currentStep < STEPS.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getCurrentStepFields = (): (keyof SalonFormValues)[] => {
    switch (currentStep) {
      case 0: // Basic Info
        return ['salonName', 'address', 'city', 'state', 'askingPrice', 'monthlyRent'];
      case 1: // Description
        return ['description', 'englishDescription', 'vietnameseDescription'];
      case 2: // Photos
        return [];
      case 3: // Pricing
        return [];
      case 4: // Review
        return ['termsAccepted'];
      default:
        return [];
    }
  };

  const handleComplete = () => {
    const formData = form.getValues();
    onComplete(formData, photos, selectedOptions);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <SalonBasicInfoStep form={form} />;
      case 1:
        return <SalonDescriptionStep form={form} />;
      case 2:
        return <SalonPhotoStep photos={photos} onPhotosChange={setPhotos} />;
      case 3:
        return (
          <SalonPricingStep
            selectedOptions={selectedOptions}
            onOptionsChange={setSelectedOptions}
            form={form}
          />
        );
      case 4:
        return (
          <SalonReviewStep
            formData={form.getValues()}
            photos={photos}
            selectedOptions={selectedOptions}
            form={form}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center ${
                  index < STEPS.length - 1 ? 'flex-1' : ''
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    index <= currentStep
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {index + 1}
                </div>
                <div className="ml-3">
                  <p
                    className={`text-sm font-medium ${
                      index <= currentStep ? 'text-purple-600' : 'text-gray-500'
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 ${
                      index < currentStep ? 'bg-purple-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Form {...form}>
          <form className="space-y-6">
            {renderCurrentStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                {t({
                  english: 'Previous',
                  vietnamese: 'Quay lại'
                })}
              </Button>

              {currentStep === STEPS.length - 1 ? (
                <Button
                  type="button"
                  onClick={handleComplete}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8"
                >
                  {t({
                    english: 'Complete Listing',
                    vietnamese: 'Hoàn thành đăng tin'
                  })}
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
                >
                  {t({
                    english: 'Next',
                    vietnamese: 'Tiếp theo'
                  })}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SalonListingWizard;
