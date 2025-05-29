
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Progress } from '@/components/ui/progress';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { salonFormSchema, SalonFormValues } from './salonFormSchema';
import { SalonPricingOptions } from '@/utils/posting/salonPricing';
import { SalonBasicInfoStep } from './steps/SalonBasicInfoStep';
import { SalonDescriptionStep } from './steps/SalonDescriptionStep';
import { SalonPhotoStep } from './steps/SalonPhotoStep';
import { SalonPricingStep } from './steps/SalonPricingStep';
import { SalonReviewStep } from './steps/SalonReviewStep';
import { useTranslation } from '@/hooks/useTranslation';

interface SalonListingWizardProps {
  onComplete: (formData: SalonFormValues, photos: File[], pricing: SalonPricingOptions) => void;
}

const steps = [
  { id: 'basic', title: 'Basic Info', vietnamese: 'Thông Tin Cơ Bản' },
  { id: 'description', title: 'Description', vietnamese: 'Mô Tả' },
  { id: 'photos', title: 'Photos', vietnamese: 'Hình Ảnh' },
  { id: 'pricing', title: 'Pricing', vietnamese: 'Chọn Gói' },
  { id: 'review', title: 'Review', vietnamese: 'Xem Lại' }
];

const SalonListingWizard: React.FC<SalonListingWizardProps> = ({ onComplete }) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [photos, setPhotos] = useState<File[]>([]);
  const [pricingOptions, setPricingOptions] = useState<SalonPricingOptions>({
    selectedPricingTier: 'standard',
    durationMonths: 1,
    featuredAddOn: false,
    autoRenew: false
  });

  const form = useForm<SalonFormValues>({
    resolver: zodResolver(salonFormSchema),
    defaultValues: {
      salonName: '',
      businessType: '',
      address: '',
      city: '',
      state: '',
      askingPrice: '',
      monthlyRent: '',
      englishDescription: '',
      vietnameseDescription: '',
      monthlyRevenue: '',
      numberOfChairs: '',
      squareFeet: '',
      willTrain: false,
      hasHousing: false,
      hasParking: false,
      autoRenew: false
    }
  });

  const handlePricingChange = (options: SalonPricingOptions) => {
    setPricingOptions(options);
    form.setValue('autoRenew', options.autoRenew || false);
  };

  const nextStep = async () => {
    const stepValidation = await validateCurrentStep();
    if (stepValidation) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const validateCurrentStep = async () => {
    switch (currentStep) {
      case 0:
        return await form.trigger(['salonName', 'businessType', 'address', 'city', 'state', 'askingPrice']);
      case 1:
        return await form.trigger(['monthlyRent']);
      case 2:
        return true; // Photos are optional
      case 3:
        return true; // Pricing selection is handled separately
      default:
        return true;
    }
  };

  const handleComplete = () => {
    const formData = form.getValues();
    onComplete(formData, photos, pricingOptions);
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <SalonBasicInfoStep form={form} />;
      case 1:
        return <SalonDescriptionStep form={form} />;
      case 2:
        return <SalonPhotoStep photos={photos} onPhotosChange={setPhotos} />;
      case 3:
        return (
          <SalonPricingStep
            selectedOptions={pricingOptions}
            onOptionsChange={handlePricingChange}
            form={form}
          />
        );
      case 4:
        return (
          <SalonReviewStep
            formData={form.getValues()}
            photos={photos}
            pricingOptions={pricingOptions}
            onComplete={handleComplete}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-playfair font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {t({
              english: 'Sell Your Salon',
              vietnamese: 'Bán Salon Của Bạn'
            })}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t({
              english: 'List your salon with confidence and reach qualified buyers',
              vietnamese: 'Đăng tin salon của bạn một cách tự tin và tiếp cận những người mua có tiềm năng'
            })}
          </p>
        </div>

        {/* Progress Bar */}
        <Card className="mb-8 overflow-hidden shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                    ${index <= currentStep
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-600'
                    }
                  `}>
                    {index < currentStep ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`
                      w-12 h-1 mx-2
                      ${index < currentStep ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-200'}
                    `} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900">
                {steps[currentStep].title} / {steps[currentStep].vietnamese}
              </h3>
              <div className="mt-2">
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-gray-500 mt-1">
                  {t({
                    english: `Step ${currentStep + 1} of ${steps.length}`,
                    vietnamese: `Bước ${currentStep + 1} / ${steps.length}`
                  })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
          <CardContent className="p-8">
            <Form {...form}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>
            </Form>
          </CardContent>
        </Card>

        {/* Navigation */}
        {currentStep < 4 && (
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center px-6 py-3 text-lg"
            >
              <ChevronLeft className="h-5 w-5 mr-2" />
              {t({
                english: 'Previous',
                vietnamese: 'Trước'
              })}
            </Button>

            <Button
              onClick={nextStep}
              className="flex items-center px-6 py-3 text-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg"
            >
              {t({
                english: 'Continue',
                vietnamese: 'Tiếp Tục'
              })}
              <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalonListingWizard;
