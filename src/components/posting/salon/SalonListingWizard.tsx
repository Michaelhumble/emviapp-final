
import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useTranslation } from '@/hooks/useTranslation';
import { SalonFormValues, salonFormSchema } from './salonFormSchema';
import { SalonPricingOptions } from '@/utils/posting/salonPricing';
import { SalonBasicInfoStep } from './steps/SalonBasicInfoStep';
import { SalonDescriptionStep } from './steps/SalonDescriptionStep';
import { SalonPhotoStep } from './steps/SalonPhotoStep';
import { SalonPricingStep } from './steps/SalonPricingStep';
import { SalonReviewStep } from './steps/SalonReviewStep';

interface SalonListingWizardProps {
  onComplete: (formData: SalonFormValues, photos: File[], pricing: SalonPricingOptions) => void;
}

const steps = [
  { id: 'basic', title: { english: 'Basic Info', vietnamese: 'Thông Tin Cơ Bản' } },
  { id: 'description', title: { english: 'Description', vietnamese: 'Mô Tả' } },
  { id: 'photos', title: { english: 'Photos', vietnamese: 'Hình Ảnh' } },
  { id: 'pricing', title: { english: 'Pricing', vietnamese: 'Bảng Giá' } },
  { id: 'review', title: { english: 'Review', vietnamese: 'Xem Lại' } },
];

const SalonListingWizard: React.FC<SalonListingWizardProps> = ({ onComplete }) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [photos, setPhotos] = useState<File[]>([]);
  const [pricingOptions, setPricingOptions] = useState<SalonPricingOptions>({
    selectedPricingTier: 'standard',
    durationMonths: 1,
    featuredAddOn: false,
    autoRenew: false,
    isFirstPost: false
  });

  const form = useForm<SalonFormValues>({
    resolver: zodResolver(salonFormSchema),
    defaultValues: {
      salonName: '',
      location: '',
      description: '',
      askingPrice: '',
      monthlyRevenue: '',
      contactEmail: '',
      contactPhone: '',
      autoRenew: false
    },
    mode: 'onChange'
  });

  const { watch, trigger } = form;
  const formValues = watch();

  const validateCurrentStep = async () => {
    const fieldsToValidate: Record<number, (keyof SalonFormValues)[]> = {
      0: ['salonName', 'location'],
      1: ['description', 'askingPrice', 'monthlyRevenue'],
      2: [], // Photos step - validated separately
      3: [], // Pricing step - no form validation needed
      4: ['contactEmail', 'contactPhone'] // Review step
    };

    const fields = fieldsToValidate[currentStep];
    if (fields && fields.length > 0) {
      return await trigger(fields);
    }
    return true;
  };

  const nextStep = async () => {
    const isValid = await validateCurrentStep();
    if (isValid && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePhotosChange = useCallback((newPhotos: File[]) => {
    setPhotos(newPhotos);
  }, []);

  const handlePricingChange = useCallback((options: SalonPricingOptions) => {
    setPricingOptions(options);
  }, []);

  const handleSubmit = () => {
    onComplete(formValues, photos, pricingOptions);
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <SalonBasicInfoStep form={form} />;
      case 1:
        return <SalonDescriptionStep form={form} />;
      case 2:
        return <SalonPhotoStep photos={photos} onPhotosChange={handlePhotosChange} />;
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
            formData={formValues}
            photos={photos}
            pricingOptions={pricingOptions}
            onSubmit={handleSubmit}
            form={form}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header with Progress */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 mb-2">
              <Sparkles className="h-6 w-6 text-purple-600" />
              <h1 className="text-3xl md:text-4xl font-playfair font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t({
                  english: 'Sell Your Salon',
                  vietnamese: 'Bán Salon Của Bạn'
                })}
              </h1>
              <Sparkles className="h-6 w-6 text-purple-600" />
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t({
                english: 'Create a premium listing that attracts serious buyers and maximizes your salon\'s value',
                vietnamese: 'Tạo tin đăng cao cấp thu hút người mua nghiêm túc và tối đa hóa giá trị salon của bạn'
              })}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                {t({
                  english: `Step ${currentStep + 1} of ${steps.length}`,
                  vietnamese: `Bước ${currentStep + 1} / ${steps.length}`
                })}
              </span>
              <span className="text-sm font-medium text-purple-600">
                {Math.round(progress)}% {t({
                  english: 'Complete',
                  vietnamese: 'Hoàn thành'
                })}
              </span>
            </div>
            <Progress value={progress} className="h-3 bg-gray-200" />
          </div>

          {/* Step Navigation */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4 overflow-x-auto pb-2">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex items-center ${index < steps.length - 1 ? 'mr-4' : ''}`}
                >
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                    index < currentStep
                      ? 'bg-green-500 border-green-500 text-white'
                      : index === currentStep
                      ? 'bg-purple-600 border-purple-600 text-white'
                      : 'bg-white border-gray-300 text-gray-400'
                  }`}>
                    {index < currentStep ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <span className="text-sm font-semibold">{index + 1}</span>
                    )}
                  </div>
                  <span className={`ml-2 text-sm font-medium hidden sm:block ${
                    index <= currentStep ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {t(step.title)}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 mx-4 hidden sm:block ${
                      index < currentStep ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Step Content */}
        <Form {...form}>
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="backdrop-blur-sm bg-white/90 border-0 shadow-2xl">
              <CardContent className="p-8">
                <AnimatePresence mode="wait">
                  {renderStep()}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </Form>

        {/* Navigation Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-between items-center mt-8"
        >
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            {t({
              english: 'Previous',
              vietnamese: 'Trước'
            })}
          </Button>

          {currentStep < steps.length - 1 ? (
            <Button
              type="button"
              onClick={nextStep}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {t({
                english: 'Next Step',
                vietnamese: 'Bước Tiếp'
              })}
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleSubmit}
              className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              <CheckCircle className="h-4 w-4" />
              {t({
                english: 'Complete Listing',
                vietnamese: 'Hoàn Thành Đăng Tin'
              })}
            </Button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SalonListingWizard;
