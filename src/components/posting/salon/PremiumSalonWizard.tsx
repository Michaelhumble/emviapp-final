
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { enhancedSalonFormSchema, type EnhancedSalonFormValues } from './enhancedSalonFormSchema';

// Import all section components
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
  onSubmit: (data: any) => Promise<boolean>;
  isSubmitting?: boolean;
}

const steps = [
  { id: 'identity', title: 'Salon Identity', component: SalonIdentitySection },
  { id: 'location', title: 'Location', component: SalonLocationSection },
  { id: 'photos', title: 'Photos', component: SalonPhotosSection },
  { id: 'about', title: 'About', component: SalonAboutSection },
  { id: 'performance', title: 'Performance', component: SalonPerformanceSection },
  { id: 'assets', title: 'Assets', component: SalonAssetsSection },
  { id: 'promotion', title: 'Promotion', component: SalonPromotionSection },
  { id: 'contact', title: 'Contact & Privacy', component: SalonContactPrivacySection },
  { id: 'confirmation', title: 'Review & Confirm', component: SalonConfirmationSection },
];

const PremiumSalonWizard: React.FC<PremiumSalonWizardProps> = ({ onSubmit, isSubmitting = false }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const form = useForm<EnhancedSalonFormValues>({
    resolver: zodResolver(enhancedSalonFormSchema),
    mode: 'onChange',
    defaultValues: {
      identity: {
        salonName: '',
        businessType: '',
        establishedYear: '',
      },
      location: {
        address: '',
        city: '',
        state: '',
        zipCode: '',
        neighborhood: '',
        hideAddressFromPublic: false,
      },
      photos: {
        photos: [],
        coverPhotoIndex: 0,
        virtualTourUrl: '',
      },
      about: {
        description: '',
        reasonForSelling: '',
        ownerNote: '',
        yearsInBusiness: '',
      },
      performance: {
        annualRevenue: '',
        monthlyRent: '',
        averageClients: '',
        hideFinancialInfo: true,
      },
      assets: {
        equipment: [],
        equipmentValue: '',
        staffCount: '',
        staffIncluded: false,
        leaseDetails: '',
      },
      promotion: {
        promotionTier: 'standard',
        urgentListing: false,
      },
      contactPrivacy: {
        showPhone: true,
        showEmail: true,
        requireNDA: false,
        preScreenBuyers: true,
        messagingPreference: 'serious-inquiries',
      },
      askingPrice: '',
    },
  });

  const handleNext = async (data: any) => {
    if (currentStep === steps.length - 1) {
      // Final submission
      const formData = form.getValues();
      const success = await onSubmit({ ...formData, ...data });
      if (success) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
    } else {
      // Move to next step
      setCompletedSteps([...completedSteps, currentStep]);
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="container max-w-6xl mx-auto py-8 px-4">
        {/* Progress Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="text-center mb-6">
            <h1 className="text-4xl font-playfair font-bold text-gray-900 mb-2">
              Premium Salon Listing
            </h1>
            <p className="text-gray-600 text-lg">
              Create a billion-dollar listing experience
            </p>
          </div>

          {/* Step Progress */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600">
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="text-sm font-medium text-gray-600">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-3 mb-4" />
            
            {/* Steps Navigation */}
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
                >
                  <div
                    className={`
                      flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all
                      ${completedSteps.includes(index)
                        ? 'bg-green-500 border-green-500 text-white'
                        : index === currentStep
                        ? 'bg-purple-500 border-purple-500 text-white'
                        : 'bg-gray-100 border-gray-300 text-gray-400'
                      }
                    `}
                  >
                    {completedSteps.includes(index) ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`
                        flex-1 h-0.5 mx-2 transition-all
                        ${completedSteps.includes(index) ? 'bg-green-500' : 'bg-gray-200'}
                      `}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <FormProvider {...form}>
          <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border border-white/20 rounded-3xl overflow-hidden">
            <CardContent className="p-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-8"
                >
                  <CurrentStepComponent
                    data={form.getValues()}
                    onSubmit={handleNext}
                    onPrevious={handlePrevious}
                    isSubmitting={isSubmitting}
                    formData={form.getValues()}
                  />
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </FormProvider>
      </div>
    </div>
  );
};

export default PremiumSalonWizard;
