
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { SalonListing } from './types';
import SalonIdentitySection from './sections/SalonIdentitySection';
import SalonLocationSection from './sections/SalonLocationSection';

interface PremiumSalonWizardProps {
  onSubmit: (data: SalonListing) => Promise<boolean>;
  isSubmitting?: boolean;
}

const PremiumSalonWizard = ({ onSubmit, isSubmitting = false }: PremiumSalonWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<SalonListing>>({});

  const steps = [
    { title: 'Identity', component: 'identity' },
    { title: 'Location', component: 'location' },
  ];

  const handleSectionSubmit = (sectionData: Partial<SalonListing>) => {
    const updatedData = { ...formData, ...sectionData };
    setFormData(updatedData);
    
    // Move to next step if not the last step
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // This would be the final submission
      console.log('Final form data:', updatedData);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-4">
            List Your Premium Salon
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create a stunning listing that attracts serious buyers and maximizes your salon's value
          </p>
        </div>

        {/* Progress Bar */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-gray-600">
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="text-sm font-medium text-purple-600">
                {Math.round(progressPercentage)}% Complete
              </span>
            </div>
            
            <Progress 
              value={progressPercentage} 
              className="h-3 bg-gray-100"
              indicatorClassName="bg-gradient-to-r from-purple-500 to-pink-500"
            />
            
            <div className="flex justify-between mt-4">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className={`flex flex-col items-center ${
                    index <= currentStep ? 'text-purple-600' : 'text-gray-400'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium mb-1 ${
                      index <= currentStep
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="text-xs">{step.title}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
          <CardContent className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {currentStep === 0 && (
                  <SalonIdentitySection
                    data={formData}
                    onSubmit={handleSectionSubmit}
                  />
                )}
                {currentStep === 1 && (
                  <SalonLocationSection
                    data={formData}
                    onSubmit={handleSectionSubmit}
                    onPrevious={handlePrevious}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PremiumSalonWizard;
