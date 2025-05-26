
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { enhancedSalonFormSchema, type EnhancedSalonFormValues } from './enhancedSalonFormSchema';
import SalonIdentitySection from './sections/SalonIdentitySection';
import SalonLocationSection from './sections/SalonLocationSection';
import SalonPhotosSection from './sections/SalonPhotosSection';
import SalonAboutSection from './sections/SalonAboutSection';
import SalonPerformanceSection from './sections/SalonPerformanceSection';
import SalonAssetsSection from './sections/SalonAssetsSection';
import SalonPromotionSection from './sections/SalonPromotionSection';
import SalonContactPrivacySection from './sections/SalonContactPrivacySection';
import SalonConfirmationSection from './sections/SalonConfirmationSection';

interface PremiumSalonWizardProps {
  onSubmit: (data: EnhancedSalonFormValues) => Promise<boolean>;
  photoUploads: File[];
  setPhotoUploads: (files: File[]) => void;
  onPromotionChange: (upgrades: any) => void;
}

const PremiumSalonWizard = ({ 
  onSubmit, 
  photoUploads, 
  setPhotoUploads, 
  onPromotionChange 
}: PremiumSalonWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<EnhancedSalonFormValues>({
    resolver: zodResolver(enhancedSalonFormSchema),
    defaultValues: {
      salonName: '',
      businessType: '',
      salonSize: '',
      city: '',
      state: '',
      salonStory: '',
      askingPrice: '',
      hideAddress: false,
      hidePrice: false,
      requireNDA: false,
      promotionUpgrades: {
        isUrgent: false,
        isFeatured: false,
        isDiamond: false
      }
    }
  });

  const steps = [
    { title: "Salon Identity", component: SalonIdentitySection },
    { title: "Location", component: SalonLocationSection },
    { title: "Photos & Media", component: SalonPhotosSection },
    { title: "About Your Salon", component: SalonAboutSection },
    { title: "Performance Metrics", component: SalonPerformanceSection },
    { title: "Assets & Team", component: SalonAssetsSection },
    { title: "Promotion Options", component: SalonPromotionSection },
    { title: "Contact & Privacy", component: SalonContactPrivacySection },
    { title: "Review & Confirm", component: SalonConfirmationSection }
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const isStepComplete = () => {
    const values = form.getValues();
    switch (currentStep) {
      case 0: return values.salonName && values.businessType && values.salonSize;
      case 1: return values.city && values.state;
      case 2: return true; // Photos are optional
      case 3: return values.salonStory;
      case 4: return true; // Performance metrics are optional
      case 5: return true; // Assets are optional
      case 6: return true; // Promotion is optional
      case 7: return true; // Contact preferences are optional
      case 8: return values.askingPrice; // Final confirmation needs price
      default: return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1 && isStepComplete()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFormSubmit = async () => {
    if (currentStep === steps.length - 1) {
      setIsSubmitting(true);
      try {
        const success = await onSubmit(form.getValues());
        if (!success) {
          setIsSubmitting(false);
        }
      } catch (error) {
        setIsSubmitting(false);
      }
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                List Your Salon for Sale
              </h1>
              <div className="text-sm text-gray-600">
                Step {currentStep + 1} of {steps.length}
              </div>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-gray-600 mt-2">{steps[currentStep].title}</p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white/80 backdrop-blur-md rounded-xl p-8 shadow-lg border border-white/20 mb-8"
              >
                <CurrentStepComponent 
                  form={form}
                  photoUploads={photoUploads}
                  setPhotoUploads={setPhotoUploads}
                  onPromotionChange={onPromotionChange}
                  isComplete={isStepComplete()}
                  onSubmit={handleFormSubmit}
                  isSubmitting={isSubmitting}
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              {currentStep < steps.length - 1 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={!isStepComplete()}
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={!isStepComplete() || isSubmitting}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  {isSubmitting ? 'Publishing...' : 'Publish Listing'}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PremiumSalonWizard;
