
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle, Sparkles } from 'lucide-react';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { salonFormSchema, type SalonFormValues } from './salonFormSchema';

import { SalonIdentityStep } from './steps/SalonIdentityStep';
import { SalonDetailsStep } from './steps/SalonDetailsStep';
import { SalonLocationStep } from './steps/SalonLocationStep';
import { SalonPostPhotoUpload } from './SalonPostPhotoUpload';
import { SalonPricingStep } from './steps/SalonPricingStep';

const STEPS = [
  { id: 1, name: 'Identity', component: SalonIdentityStep },
  { id: 2, name: 'Details', component: SalonDetailsStep },
  { id: 3, name: 'Location', component: SalonLocationStep },
  { id: 4, name: 'Photos', component: SalonPostPhotoUpload },
  { id: 5, name: 'Pricing', component: SalonPricingStep },
];

const SalonListingWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const form = useForm<SalonFormValues>({
    resolver: zodResolver(salonFormSchema),
    defaultValues: {
      salonName: '',
      businessType: '',
      establishedYear: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      neighborhood: '',
      hideExactAddress: false,
      askingPrice: '',
      monthlyRent: '',
      numberOfStaff: '',
      numberOfTables: '',
      numberOfChairs: '',
      squareFeet: '',
      revenue: '',
      monthlyRevenue: '',
      yearlyRevenue: '',
      grossRevenue: '',
      netProfit: '',
      vietnameseDescription: '',
      englishDescription: '',
      reasonForSelling: '',
      virtualTourUrl: '',
      willTrain: false,
      hasHousing: false,
      hasWaxRoom: false,
      hasDiningRoom: false,
      hasLaundry: false,
      hasParking: false,
      equipmentIncluded: false,
      leaseTransferable: false,
      sellerFinancing: false,
      isNationwide: false,
      fastSalePackage: false,
      autoRenew: false,
      termsAccepted: false,
    },
  });

  const nextStep = async () => {
    let isValid = false;

    switch (currentStep) {
      case 1:
        isValid = await form.trigger(['salonName', 'businessType']);
        break;
      case 2:
        isValid = await form.trigger(['askingPrice', 'monthlyRent']);
        break;
      case 3:
        isValid = await form.trigger(['address', 'city', 'state']);
        break;
      case 4:
        isValid = true;
        break;
      case 5:
        isValid = true;
        break;
      default:
        isValid = true;
    }

    if (isValid && currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('🎉 Salon listing created successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting salon listing:', error);
      toast.error('Failed to create salon listing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    const StepComponent = STEPS[currentStep - 1]?.component;
    
    if (!StepComponent) return null;

    const stepProps: any = { form };

    if (currentStep === 4) {
      return (
        <SalonPostPhotoUpload
          photoUploads={photoUploads}
          setPhotoUploads={setPhotoUploads}
          maxPhotos={15}
        />
      );
    }

    if (currentStep === 5) {
      return (
        <SalonPricingStep
          form={form}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      );
    }

    return <StepComponent {...stepProps} />;
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    })
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.6
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <Form {...form}>
        <div className="relative">
          {/* Step Content */}
          <AnimatePresence mode="wait" custom={currentStep}>
            <motion.div
              key={currentStep}
              custom={currentStep}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={pageTransition}
              className="w-full"
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>

          {/* Navigation - Only show if not on final step or submitting */}
          {currentStep < 5 && (
            <motion.div 
              className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-4 flex items-center gap-4">
                {/* Previous Button */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="h-12 px-6 rounded-xl border-2 border-gray-300 hover:border-purple-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <ChevronLeft className="w-5 h-5 mr-2" />
                    Back
                  </Button>
                </motion.div>

                {/* Step Indicator */}
                <div className="flex items-center gap-2 mx-4">
                  {STEPS.map((step, index) => (
                    <motion.div
                      key={step.id}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index + 1 === currentStep
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 scale-125 shadow-lg'
                          : index + 1 < currentStep
                          ? 'bg-green-400 shadow-md'
                          : 'bg-gray-300'
                      }`}
                      initial={{ scale: 0.8 }}
                      animate={{ 
                        scale: index + 1 === currentStep ? 1.25 : 1,
                        backgroundColor: index + 1 === currentStep 
                          ? '#a855f7' 
                          : index + 1 < currentStep 
                          ? '#4ade80' 
                          : '#d1d5db'
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  ))}
                </div>

                {/* Next Button */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="h-12 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl shadow-lg transition-all duration-200 border-0"
                  >
                    Next
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Floating Success Animation for Completed Steps */}
          <AnimatePresence>
            {currentStep > 1 && (
              <motion.div
                className="fixed top-8 right-8 z-50"
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0, rotate: 180 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="bg-green-500 text-white rounded-full p-3 shadow-xl">
                  <CheckCircle className="w-6 h-6" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Sparkles */}
          <div className="fixed inset-0 pointer-events-none z-10">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${10 + i * 12}%`
                }}
                animate={{
                  y: [-10, 10, -10],
                  rotate: [0, 360],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5
                }}
              >
                <Sparkles className="w-4 h-4 text-purple-400/30" />
              </motion.div>
            ))}
          </div>
        </div>
      </Form>
    </div>
  );
};

export default SalonListingWizard;
