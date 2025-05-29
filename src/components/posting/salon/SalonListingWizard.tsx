
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { SalonFormValues, salonFormSchema } from './salonFormSchema';
import { SalonPricingOptions } from '@/utils/posting/salonPricing';
import { SalonDetailsStep } from './steps/SalonDetailsStep';
import { LocationDetailsStep } from './steps/LocationDetailsStep';
import { FinancialDetailsStep } from './steps/FinancialDetailsStep';
import PhotoUpload from '@/components/posting/PhotoUpload';
import { FeaturesDetailsStep } from './steps/FeaturesDetailsStep';
import { SalonPricingStep } from './steps/SalonPricingStep';
import { SalonReviewStep } from './steps/SalonReviewStep';

interface SalonListingWizardProps {
  onComplete: (formData: SalonFormValues, photos: File[], pricing: SalonPricingOptions) => void;
}

const SalonListingWizard = ({ onComplete }: SalonListingWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [pricing, setPricing] = useState<SalonPricingOptions>({
    selectedPricingTier: 'standard',
    durationMonths: 3,
    featuredAddOn: false,
    autoRenew: false
  });

  const form = useForm<SalonFormValues>({
    resolver: zodResolver(salonFormSchema),
    defaultValues: {
      beautyIndustry: 'Nails',
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
    }
  });

  const steps = [
    { id: 1, title: 'Salon Identity', titleVi: 'Danh tính salon' },
    { id: 2, title: 'Location Details', titleVi: 'Chi tiết vị trí' },
    { id: 3, title: 'Business Details', titleVi: 'Chi tiết kinh doanh' },
    { id: 4, title: 'Photos', titleVi: 'Ảnh salon' },
    { id: 5, title: 'Features & Amenities', titleVi: 'Tính năng & Tiện ích' },
    { id: 6, title: 'Pricing', titleVi: 'Giá cả' },
    { id: 7, title: 'Review', titleVi: 'Xem lại' }
  ];

  const handleNext = async () => {
    const isValid = await form.trigger();
    if (isValid && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (data: SalonFormValues) => {
    if (currentStep === steps.length) {
      onComplete(data, photoUploads, pricing);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <SalonDetailsStep form={form} />;
      case 2:
        return <LocationDetailsStep form={form} />;
      case 3:
        return <FinancialDetailsStep form={form} />;
      case 4:
        return (
          <PhotoUpload
            photoUploads={photoUploads}
            setPhotoUploads={setPhotoUploads}
            maxPhotos={8}
          />
        );
      case 5:
        return <FeaturesDetailsStep form={form} />;
      case 6:
        return (
          <SalonPricingStep
            pricing={pricing}
            setPricing={setPricing}
          />
        );
      case 7:
        return (
          <SalonReviewStep
            form={form}
            photoUploads={photoUploads}
            pricing={pricing}
          />
        );
      default:
        return <SalonDetailsStep form={form} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50" style={{ backgroundColor: '#FFF2FA' }}>
      <div className="container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {currentStep > step.id ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    step.id
                  )}
                </div>
                <div className="ml-2 hidden md:block">
                  <div className="text-sm font-medium">
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {step.titleVi}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 h-0.5 bg-gray-200 mx-4 hidden md:block">
                    <div
                      className={`h-full bg-purple-600 transition-all duration-300 ${
                        currentStep > step.id ? 'w-full' : 'w-0'
                      }`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <Card className="max-w-4xl mx-auto">
              <CardContent className="p-8">
                {renderStep()}
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between mt-8 max-w-4xl mx-auto">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="flex items-center"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back / Quay lại
              </Button>

              {currentStep < steps.length ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center bg-purple-600 hover:bg-purple-700"
                >
                  Next / Tiếp theo
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="flex items-center bg-green-600 hover:bg-green-700"
                >
                  Complete Listing / Hoàn thành
                  <Check className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default SalonListingWizard;
