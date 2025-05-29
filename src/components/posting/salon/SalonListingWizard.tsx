import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { SalonFormValues, salonFormSchema } from './salonFormSchema';
import { SalonPricingOptions, calculateSalonPostPrice } from '@/utils/posting/salonPricing';
import { SalonDetailsStep } from './steps/SalonDetailsStep';
import { LocationDetailsStep } from './steps/LocationDetailsStep';
import { FinancialDetailsStep } from './steps/FinancialDetailsStep';
import { FeaturesDetailsStep } from './steps/FeaturesDetailsStep';
import { PhotoUploadStep } from './steps/PhotoUploadStep';
import SalonPricingStep from './steps/SalonPricingStep';
import { SalonReviewStep } from './steps/SalonReviewStep';

interface SalonListingWizardProps {
  onComplete: (formData: SalonFormValues, photos: File[], pricing: SalonPricingOptions) => void;
}

export const SalonListingWizard = ({ onComplete }: SalonListingWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<SalonFormValues>({
    salonName: '',
    businessType: '',
    beautyIndustry: 'Nails',
    address: '',
    city: '',
    state: '',
    askingPrice: '',
    monthlyRent: '',
    termsAccepted: false,
  });
  
  const [photos, setPhotos] = useState<File[]>([]);
  const [pricing, setPricing] = useState<SalonPricingOptions>({
    selectedPricingTier: 'standard',
    durationMonths: 3,
    featuredAddOn: false,
    autoRenew: false,
    isFirstPost: true,
    isNationwide: false,
    fastSalePackage: false
  });

  const steps = [
    { id: 1, name: 'Salon Details', component: 'details' },
    { id: 2, name: 'Location', component: 'location' },
    { id: 3, name: 'Financial Details', component: 'financial' },
    { id: 4, name: 'Features', component: 'features' },
    { id: 5, name: 'Photos', component: 'photos' },
    { id: 6, name: 'Pricing', component: 'pricing' },
    { id: 7, name: 'Review', component: 'review' }
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

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    onComplete(formData, photos, pricing);
  };

  const getStepProgress = () => {
    return ((currentStep + 1) / steps.length) * 100;
  };

  const renderStep = () => {
    const stepProps = {
      formData,
      photos,
      pricing,
      updateFormData,
      updatePhotos,
      updatePricing,
      onNext: handleNext,
      onPrev: handlePrev,
      onComplete: handleComplete,
      isFirstStep: currentStep === 0,
      isLastStep: currentStep === steps.length - 1
    };

    switch (steps[currentStep].component) {
      case 'details':
        return <SalonDetailsStep {...stepProps} />;
      case 'location':
        return <LocationDetailsStep {...stepProps} />;
      case 'financial':
        return <FinancialDetailsStep {...stepProps} />;
      case 'features':
        return <FeaturesDetailsStep {...stepProps} />;
      case 'photos':
        return <PhotoUploadStep {...stepProps} />;
      case 'pricing':
        return <SalonPricingStep {...stepProps} />;
      case 'review':
        return <SalonReviewStep {...stepProps} />;
      default:
        return <SalonDetailsStep {...stepProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            List Your Salon for Sale
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with qualified buyers and sell your salon business through EmviApp's trusted marketplace.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(getStepProgress())}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${getStepProgress()}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Step Indicators */}
        <div className="flex justify-between mb-8 overflow-x-auto">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center min-w-0 flex-1">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium mb-2
                ${index <= currentStep 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-gray-200 text-gray-500'
                }
                ${index < currentStep ? 'bg-green-500' : ''}
              `}>
                {index < currentStep ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  step.id
                )}
              </div>
              <span className={`
                text-xs text-center
                ${index <= currentStep ? 'text-purple-600 font-medium' : 'text-gray-500'}
              `}>
                {step.name}
              </span>
              {index < steps.length - 1 && (
                <div className={`
                  hidden md:block w-full h-px mt-2
                  ${index < currentStep ? 'bg-green-500' : 'bg-gray-200'}
                `} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-8">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="flex items-center"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>

              <Badge variant="outline" className="px-4 py-2">
                {steps[currentStep].name}
              </Badge>

              {currentStep === steps.length - 1 ? (
                <Button
                  onClick={handleComplete}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white flex items-center"
                >
                  Complete Listing
                  <CheckCircle className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white flex items-center"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
