
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowLeft, ArrowRight, Sparkles, Crown, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { SalonIdentitySection } from './sections/SalonIdentitySection';
import { SalonLocationSection } from './sections/SalonLocationSection';
import { SalonPhotosSection } from './sections/SalonPhotosSection';
import { SalonAboutSection } from './sections/SalonAboutSection';
import { SalonPerformanceSection } from './sections/SalonPerformanceSection';
import { SalonPromotionSection } from './sections/SalonPromotionSection';
import { SalonConfirmationSection } from './sections/SalonConfirmationSection';
import { EnhancedSalonFormValues } from './enhancedSalonFormSchema';

interface PremiumSalonWizardProps {
  onSubmit: (data: EnhancedSalonFormValues) => Promise<boolean>;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  onPromotionChange: (upgrades: any) => void;
}

const steps = [
  { id: 1, title: 'Salon Identity', icon: '🏪' },
  { id: 2, title: 'Location', icon: '📍' },
  { id: 3, title: 'Photos & Videos', icon: '📸' },
  { id: 4, title: 'Your Story', icon: '✨' },
  { id: 5, title: 'Performance', icon: '📊' },
  { id: 6, title: 'Promotion', icon: '🚀' },
  { id: 7, title: 'Confirmation', icon: '✅' },
];

export const PremiumSalonWizard = ({ 
  onSubmit, 
  photoUploads, 
  setPhotoUploads, 
  onPromotionChange 
}: PremiumSalonWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<EnhancedSalonFormValues>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const progress = (currentStep / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const success = await onSubmit(formData as EnhancedSalonFormValues);
    if (success) {
      setShowSuccess(true);
    }
    setIsSubmitting(false);
  };

  const updateFormData = (data: Partial<EnhancedSalonFormValues>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  if (showSuccess) {
    return <SalonConfirmationSection />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Premium Header with Glassmorphism */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600">
                <Crown className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Sell Your Salon</h1>
                <p className="text-sm text-gray-600">Premium marketplace listing</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">Most viewed this week</span>
            </div>
          </div>
          
          {/* Animated Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Step {currentStep} of {steps.length}</span>
              <span className="text-gray-600">{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2 bg-gray-200">
              <div 
                className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-500 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </Progress>
          </div>

          {/* Step Indicators */}
          <div className="flex justify-between mt-4">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all duration-300 ${
                  step.id === currentStep 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-110' 
                    : step.id < currentStep 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step.id < currentStep ? <CheckCircle className="h-4 w-4" /> : step.icon}
                </div>
                <span className="text-xs mt-1 text-gray-600 hidden sm:block">{step.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content with Animation */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="backdrop-blur-sm bg-white/60 rounded-2xl border border-white/20 shadow-xl p-8"
          >
            {currentStep === 1 && <SalonIdentitySection onUpdate={updateFormData} data={formData} />}
            {currentStep === 2 && <SalonLocationSection onUpdate={updateFormData} data={formData} />}
            {currentStep === 3 && <SalonPhotosSection photoUploads={photoUploads} setPhotoUploads={setPhotoUploads} />}
            {currentStep === 4 && <SalonAboutSection onUpdate={updateFormData} data={formData} />}
            {currentStep === 5 && <SalonPerformanceSection onUpdate={updateFormData} data={formData} />}
            {currentStep === 6 && <SalonPromotionSection onUpdate={updateFormData} onPromotionChange={onPromotionChange} data={formData} />}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="flex items-center gap-2 px-6 py-3"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>

          {currentStep === steps.length - 1 ? (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Publishing...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4" />
                  Publish Salon
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* FOMO Badge */}
      <div className="fixed bottom-4 right-4 z-40">
        <div className="backdrop-blur-sm bg-red-500/90 text-white px-4 py-2 rounded-full shadow-lg animate-pulse">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
            <span className="text-sm font-medium">Only 2 Diamond slots left!</span>
          </div>
        </div>
      </div>
    </div>
  );
};
