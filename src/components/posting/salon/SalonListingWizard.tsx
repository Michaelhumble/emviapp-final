
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { SalonFormValues, salonFormSchema } from './salonFormSchema';
import { SalonPricingOptions } from '@/utils/posting/salonPricing';
import { useStripe } from '@/hooks/useStripe';
import PostWizardLayout from '@/components/posting/PostWizardLayout';

import { SalonDetailsStep } from './steps/SalonDetailsStep';
import LocationDetailsStep from './steps/LocationDetailsStep';
import FinancialDetailsStep from './steps/FinancialDetailsStep';
import DescriptionDetailsStep from './steps/DescriptionDetailsStep';
import FeaturesDetailsStep from './steps/FeaturesDetailsStep';
import { SalonPricingStep } from './steps/SalonPricingStep';
import PhotoUpload from '../PhotoUpload';
import { SalonReviewStep } from './steps/SalonReviewStep';
import TermsAndConditionsStep from './steps/TermsAndConditionsStep';

interface StepProps {
  form: any;
  photoUploads?: File[];
  setPhotoUploads?: React.Dispatch<React.SetStateAction<File[]>>;
  selectedOptions?: SalonPricingOptions;
  onOptionsChange?: (options: SalonPricingOptions) => void;
}

const steps = [
  'Identity',
  'Location', 
  'Details',
  'Photos',
  'Features',
  'Pricing',
  'Review'
];

const stepLabels = [
  { en: 'Identity / Danh tính', sub: 'Salon details / Chi tiết salon' },
  { en: 'Location / Vị trí', sub: 'Where is your salon / Salon ở đâu' },
  { en: 'Details / Chi tiết', sub: 'Business information / Thông tin kinh doanh' },
  { en: 'Photos / Ảnh', sub: 'Show your salon / Hiển thị salon' },
  { en: 'Features / Tính năng', sub: 'Amenities / Tiện ích' },
  { en: 'Pricing / Giá cả', sub: 'Choose your plan / Chọn gói' },
  { en: 'Review / Xem lại', sub: 'Final check / Kiểm tra cuối' }
];

const SalonListingWizard: React.FC<{ onComplete: (formData: SalonFormValues, photos: File[], pricing: SalonPricingOptions) => void }> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<SalonPricingOptions>({
    selectedPricingTier: 'standard',
    durationMonths: 3,
    featuredAddOn: false,
    autoRenew: false,
    isFirstPost: true
  });
  const { initiatePayment, isLoading } = useStripe();

  const form = useForm<SalonFormValues>({
    resolver: zodResolver(salonFormSchema),
    defaultValues: {
      salonName: '',
      businessType: '',
      beautyIndustry: 'Nails',
      address: '',
      city: '',
      state: '',
      askingPrice: '',
      monthlyRent: '',
      termsAccepted: false,
      autoRenew: false
    },
    mode: "onChange"
  });

  const getCompletionPercentage = () => {
    return Math.round((currentStep / steps.length) * 100);
  };

  const handleNext = () => {
    form.handleSubmit(async (data) => {
      if (currentStep === steps.length) {
        if (!data.termsAccepted) {
          toast.error("Please accept the terms and conditions");
          return;
        }
        
        const success = await initiatePayment(selectedOptions, data);
        if (success) {
          onComplete(data, photoUploads, selectedOptions);
        }
      } else {
        setCurrentStep(currentStep + 1);
      }
    })();
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };
  
  const renderStepContent = (step: number) => {
    const stepProps: StepProps = {
      form,
      photoUploads,
      setPhotoUploads,
      selectedOptions,
      onOptionsChange: setSelectedOptions
    };
    
    switch (step) {
      case 1:
        return <SalonDetailsStep {...stepProps} />;
      case 2:
        return <LocationDetailsStep {...stepProps} />;
      case 3:
        return <FinancialDetailsStep {...stepProps} />;
      case 4:
        return <PhotoUpload photoUploads={photoUploads} setPhotoUploads={setPhotoUploads} maxPhotos={8} />;
      case 5:
        return <FeaturesDetailsStep {...stepProps} />;
      case 6:
        return <SalonPricingStep selectedOptions={selectedOptions} onOptionsChange={setSelectedOptions} form={form} />;
      case 7:
        return <SalonReviewStep form={form} photoUploads={photoUploads} />;
      default:
        return <div>Not Found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-4xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Sell Your Salon / Bán Salon Của Bạn
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with serious buyers and get the best value / Kết nối với người mua nghiêm túc và nhận giá trị tốt nhất
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-700">Step {currentStep} of {steps.length}</span>
            <span className="text-sm font-medium text-purple-600">{getCompletionPercentage()}% Complete / Hoàn thành</span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${getCompletionPercentage()}%` }}
            />
          </div>

          {/* Step Icons */}
          <div className="flex justify-between">
            {steps.map((step, index) => {
              const stepNumber = index + 1;
              const isActive = stepNumber === currentStep;
              const isCompleted = stepNumber < currentStep;
              
              return (
                <div key={step} className="flex flex-col items-center">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium mb-2
                    ${isActive ? 'bg-purple-600 text-white' : 
                      isCompleted ? 'bg-purple-600 text-white' : 'bg-gray-300 text-gray-600'}
                  `}>
                    {stepNumber}
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-medium text-gray-700">{stepLabels[index].en}</div>
                    <div className="text-xs text-gray-500">{stepLabels[index].sub}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <Card>
          <CardContent className="p-6">
            <FormProvider {...form}>
              {renderStepContent(currentStep)}
            </FormProvider>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={handleBack} 
            disabled={currentStep === 1}
            className="px-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous / Trước
          </Button>
          <Button 
            onClick={handleNext} 
            disabled={isLoading}
            className="px-6 bg-purple-600 hover:bg-purple-700"
          >
            {currentStep === steps.length ? (
              <>
                {isLoading ? "Processing..." : "Confirm & Pay"}
              </>
            ) : (
              <>
                Next / Tiếp theo
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SalonListingWizard;
