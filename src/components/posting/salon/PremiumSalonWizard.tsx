
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowLeft, ArrowRight, Star, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GradientBackground } from '@/components/ui/gradient-background';
import SalonIdentitySection from './sections/SalonIdentitySection';
import SalonLocationSection from './sections/SalonLocationSection';
import SalonPhotosSection from './sections/SalonPhotosSection';
import SalonAboutSection from './sections/SalonAboutSection';
import SalonPerformanceSection from './sections/SalonPerformanceSection';
import SalonAssetsSection from './sections/SalonAssetsSection';
import SalonPromotionSection from './sections/SalonPromotionSection';
import SalonContactPrivacySection from './sections/SalonContactPrivacySection';
import SalonConfirmationSection from './sections/SalonConfirmationSection';
import { EnhancedSalonFormValues } from './enhancedSalonFormSchema';

interface PremiumSalonWizardProps {
  onSubmit: (data: any) => Promise<boolean>;
  isSubmitting: boolean;
}

const steps = [
  { id: 'identity', title: 'Salon Identity', description: 'Tell us about your salon', icon: Star },
  { id: 'location', title: 'Location Details', description: 'Where is your salon located?', icon: Shield },
  { id: 'photos', title: 'Photo Gallery', description: 'Showcase your beautiful space', icon: Zap },
  { id: 'about', title: 'Your Story', description: 'Why are you selling?', icon: Star },
  { id: 'performance', title: 'Performance', description: 'Business metrics & revenue', icon: Shield },
  { id: 'assets', title: 'Assets & Equipment', description: 'What\'s included in the sale?', icon: Zap },
  { id: 'promotion', title: 'Promotion Options', description: 'Get maximum visibility', icon: Star },
  { id: 'contact', title: 'Contact & Privacy', description: 'How buyers can reach you', icon: Shield },
  { id: 'confirmation', title: 'Review & Submit', description: 'Final review of your listing', icon: Zap },
];

const PremiumSalonWizard = ({ onSubmit, isSubmitting }: PremiumSalonWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<EnhancedSalonFormValues>>({});
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const updateFormData = (stepData: any) => {
    setFormData(prev => ({ ...prev, ...stepData }));
  };

  const markStepComplete = (stepIndex: number) => {
    setCompletedSteps(prev => new Set([...prev, stepIndex]));
  };

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      markStepComplete(currentStep);
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepSubmit = (stepData: any) => {
    updateFormData(stepData);
    if (currentStep === steps.length - 1) {
      // Final submission
      onSubmit({ ...formData, ...stepData });
    } else {
      goToNextStep();
    }
  };

  const renderCurrentSection = () => {
    const sectionProps = {
      data: formData,
      onSubmit: handleStepSubmit,
      onNext: goToNextStep,
      onPrevious: goToPreviousStep,
      isSubmitting,
    };

    switch (steps[currentStep].id) {
      case 'identity':
        return <SalonIdentitySection {...sectionProps} />;
      case 'location':
        return <SalonLocationSection {...sectionProps} />;
      case 'photos':
        return <SalonPhotosSection {...sectionProps} />;
      case 'about':
        return <SalonAboutSection {...sectionProps} />;
      case 'performance':
        return <SalonPerformanceSection {...sectionProps} />;
      case 'assets':
        return <SalonAssetsSection {...sectionProps} />;
      case 'promotion':
        return <SalonPromotionSection {...sectionProps} />;
      case 'contact':
        return <SalonContactPrivacySection {...sectionProps} />;
      case 'confirmation':
        return <SalonConfirmationSection {...sectionProps} formData={formData} />;
      default:
        return null;
    }
  };

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Header with Progress */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-playfair font-bold text-gray-900">
                List Your Premium Salon
              </h1>
              <p className="text-gray-600">
                Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                <Star className="w-3 h-3 mr-1" />
                Premium Listing
              </Badge>
              <Badge variant="outline" className="border-orange-200 text-orange-700">
                🔥 Only 12 Diamond spots left
              </Badge>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <motion.div
              className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Step Navigation */}
          <div className="flex items-center justify-between overflow-x-auto pb-2">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = completedSteps.has(index);
              const isCurrent = index === currentStep;
              const isAccessible = index <= currentStep;

              return (
                <motion.div
                  key={step.id}
                  className={`flex items-center min-w-0 ${index < steps.length - 1 ? 'flex-1' : ''}`}
                  whileHover={isAccessible ? { scale: 1.05 } : {}}
                >
                  <div className="flex items-center">
                    <div
                      className={`
                        flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium
                        ${isCompleted
                          ? 'bg-green-500 text-white'
                          : isCurrent
                          ? 'bg-purple-500 text-white'
                          : isAccessible
                          ? 'bg-gray-300 text-gray-700'
                          : 'bg-gray-100 text-gray-400'
                        }
                      `}
                    >
                      {isCompleted ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                    </div>
                    <div className="ml-2 hidden md:block">
                      <p className={`text-xs font-medium ${isCurrent ? 'text-purple-600' : 'text-gray-500'}`}>
                        {step.title}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-1 mx-4 h-px bg-gray-300 hidden md:block" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <GradientBackground variant="premium" className="p-6">
                <Card className="border-0 shadow-2xl bg-white/70 backdrop-blur-lg">
                  <CardContent className="p-8">
                    {renderCurrentSection()}
                  </CardContent>
                </Card>
              </GradientBackground>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Trust Footer */}
      <div className="bg-white border-t">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-500" />
              SSL Secured
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              Trusted by 10,000+ salons
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-500" />
              Average sale: 90 days
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumSalonWizard;
