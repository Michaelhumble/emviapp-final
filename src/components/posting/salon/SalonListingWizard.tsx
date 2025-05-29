import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import { salonFormSchema, type SalonFormValues } from './salonFormSchema';
import { toast } from 'sonner';

// Import step components as default exports
import SalonIdentityStep from './steps/SalonIdentityStep';
import SalonDetailsStep from './steps/SalonDetailsStep';
import SalonLocationStep from './steps/SalonLocationStep';
import SalonPostPhotoUpload from './SalonPostPhotoUpload';
import SalonPricingStep from './steps/SalonPricingStep';

const steps = [
  {
    id: 'identity',
    title: 'Salon Identity',
    description: 'Tell us about your salon',
    component: SalonIdentityStep,
    icon: '🏪'
  },
  {
    id: 'details', 
    title: 'Business Details',
    description: 'Share your business information',
    component: SalonDetailsStep,
    icon: '📋'
  },
  {
    id: 'location',
    title: 'Location',
    description: 'Where is your salon?',
    component: SalonLocationStep,
    icon: '📍'
  },
  {
    id: 'photos',
    title: 'Photos',
    description: 'Show off your salon',
    component: SalonPostPhotoUpload,
    icon: '📸'
  },
  {
    id: 'pricing',
    title: 'Pricing & Package',
    description: 'Choose your listing package',
    component: SalonPricingStep,
    icon: '💎'
  }
];

const SalonListingWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SalonFormValues>({
    resolver: zodResolver(salonFormSchema),
    mode: 'onChange',
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
      termsAccepted: false
    }
  });

  const nextStep = async () => {
    const stepFields = getStepFields(currentStep);
    const isValid = await form.trigger(stepFields);
    
    if (isValid && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepFields = (stepIndex: number): (keyof SalonFormValues)[] => {
    switch (stepIndex) {
      case 0: return ['salonName', 'businessType'];
      case 1: return ['askingPrice', 'monthlyRent'];
      case 2: return ['address', 'city', 'state'];
      case 3: return [];
      case 4: return ['termsAccepted'];
      default: return [];
    }
  };

  const onSubmit = async (data: SalonFormValues) => {
    setIsSubmitting(true);
    try {
      console.log('Salon listing data:', data);
      toast.success('Your salon listing has been submitted successfully!');
    } catch (error) {
      console.error('Error submitting salon listing:', error);
      toast.error('Failed to submit salon listing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-8 px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-orange-200/30 to-yellow-200/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-purple-100 shadow-lg mb-6">
            <Sparkles className="h-5 w-5 text-purple-500" />
            <span className="text-purple-700 font-medium">Salon Listing Wizard</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent mb-4">
            Sell Your Salon
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with qualified buyers and sell your salon quickly with our premium listing platform
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-gray-600">
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="text-sm font-medium text-purple-600">
                {Math.round(progress)}% Complete
              </span>
            </div>
            
            <Progress 
              value={progress} 
              className="h-3 mb-4"
            />
            
            <div className="flex justify-between">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex flex-col items-center transition-all duration-300 ${
                    index <= currentStep ? 'text-purple-600' : 'text-gray-400'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium mb-2 transition-all duration-300 ${
                    index < currentStep 
                      ? 'bg-green-500 text-white' 
                      : index === currentStep
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {index < currentStep ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <span>{step.icon}</span>
                    )}
                  </div>
                  <span className="text-xs font-medium text-center hidden sm:block">
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-white/60 backdrop-blur-md border-white/20 shadow-2xl">
              <CardContent className="p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {steps[currentStep].title}
                  </h2>
                  <p className="text-gray-600">
                    {steps[currentStep].description}
                  </p>
                </div>

                <CurrentStepComponent form={form} />
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <motion.div 
          className="flex justify-between items-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="bg-white/80 backdrop-blur-sm border-purple-200 hover:bg-purple-50 hover:border-purple-300 disabled:opacity-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          {currentStep === steps.length - 1 ? (
            <Button
              type="button"
              onClick={form.handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Listing
                  <Sparkles className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          ) : (
            <Button
              type="button"
              onClick={nextStep}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Next Step
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SalonListingWizard;
