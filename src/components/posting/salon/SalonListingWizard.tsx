import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SalonFormValues, salonFormSchema } from './salonFormSchema';
import { SalonPricingOptions } from '@/utils/posting/salonPricing';
import { SalonDetailsStep } from './steps/SalonDetailsStep';
import { LocationDetailsStep } from './steps/LocationDetailsStep';
import { FinancialDetailsStep } from './steps/FinancialDetailsStep';
import { FeaturesDetailsStep } from './steps/FeaturesDetailsStep';
import { PhotoUploadStep } from './steps/PhotoUploadStep';
import SalonPricingStep from './steps/SalonPricingStep';
import SalonReviewStep from './steps/SalonReviewStep';

interface WizardStep {
  id: string;
  title: string;
  component: React.ComponentType<any>;
  isCompleted?: boolean;
}

interface SalonListingWizardProps {
  onSubmit: (data: SalonFormValues, photos: File[], pricing: SalonPricingOptions) => void;
  isSubmitting?: boolean;
}

export const SalonListingWizard = ({ onSubmit, isSubmitting = false }: SalonListingWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<SalonFormValues>({});
  const [photos, setPhotos] = useState<File[]>([]);
  const [pricing, setPricing] = useState<SalonPricingOptions>({
    listingType: 'standard',
    duration: 30,
    featured: false,
    totalPrice: 49
  });

  const steps: WizardStep[] = [
    { id: 'details', title: 'Salon Details', component: SalonDetailsStep },
    { id: 'location', title: 'Location', component: LocationDetailsStep },
    { id: 'financial', title: 'Financial Info', component: FinancialDetailsStep },
    { id: 'features', title: 'Features', component: FeaturesDetailsStep },
    { id: 'photos', title: 'Photos', component: PhotoUploadStep },
    { id: 'pricing', title: 'Pricing & Publish', component: SalonPricingStep },
    { id: 'review', title: 'Review & Submit', component: SalonReviewStep }
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
    onSubmit(formData, photos, pricing);
  };

  const currentStepData = steps[currentStep];
  const StepComponent = currentStepData.component;
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">List Your Salon</h1>
              <p className="text-gray-600">Step {currentStep + 1} of {steps.length}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-8 overflow-x-auto">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center min-w-0">
                <motion.div
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center font-medium text-sm
                    transition-all duration-300 shadow-lg
                    ${index < currentStep 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                      : index === currentStep
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-purple-200'
                      : 'bg-white text-gray-400 border-2 border-gray-200'
                    }
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {index < currentStep ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </motion.div>
                <span className={`
                  mt-2 text-xs font-medium text-center max-w-20 leading-tight
                  ${index <= currentStep ? 'text-gray-900' : 'text-gray-400'}
                `}>
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`
                  w-8 h-0.5 mx-2 transition-colors duration-300
                  ${index < currentStep ? 'bg-green-400' : 'bg-gray-200'}
                `} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardContent className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <StepComponent
                  formData={formData}
                  photos={photos}
                  pricing={pricing}
                  updateFormData={updateFormData}
                  updatePhotos={updatePhotos}
                  updatePricing={updatePricing}
                  onNext={handleNext}
                  onPrev={handlePrev}
                  onComplete={handleComplete}
                  isFirstStep={currentStep === 0}
                  isLastStep={currentStep === steps.length - 1}
                />
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="px-6 py-3"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {currentStep < steps.length - 1 ? (
              <Button
                onClick={handleNext}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                disabled={isSubmitting}
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              >
                {isSubmitting ? 'Publishing...' : 'Publish Listing'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
