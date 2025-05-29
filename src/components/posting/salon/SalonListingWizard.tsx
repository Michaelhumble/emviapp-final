
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SalonFormValues, salonFormSchema } from './salonFormSchema';
import { SalonPricingOptions } from '@/utils/posting/salonPricing';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SalonDetailsStep } from './steps/SalonDetailsStep';
import LocationDetailsStep from './steps/LocationDetailsStep';
import FinancialDetailsStep from './steps/FinancialDetailsStep';
import PhotoUpload from '@/components/posting/PhotoUpload';
import FeaturesDetailsStep from './steps/FeaturesDetailsStep';
import SalonPricingStep from './steps/SalonPricingStep';
import { SalonReviewStep } from './steps/SalonReviewStep';

interface SalonListingWizardProps {
  onComplete: (formData: SalonFormValues, photos: File[], pricing: SalonPricingOptions) => void;
}

const SalonListingWizard = ({ onComplete }: SalonListingWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [pricingOptions, setPricingOptions] = useState<SalonPricingOptions>({
    selectedPricingTier: 'standard',
    durationMonths: 3,
    featuredAddOn: false,
    autoRenew: false,
    isFirstPost: true,
    isNationwide: false,
    fastSalePackage: false
  });

  const form = useForm<SalonFormValues>({
    resolver: zodResolver(salonFormSchema),
    defaultValues: {
      salonName: '',
      businessType: 'nail-salon',
      beautyIndustry: 'Nails',
      establishedYear: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      neighborhood: '',
      hideExactAddress: false,
      askingPrice: '',
      monthlyRent: '',
      monthlyProfit: '',
      monthlyRevenue: '',
      employeeCount: '',
      numberOfTables: '',
      squareFeet: '',
      englishDescription: '',
      vietnameseDescription: '',
      reasonForSelling: '',
      willTrain: false,
      hasWaxRoom: false,
      hasParking: false,
      termsAccepted: false
    }
  });

  const totalSteps = 6;
  const progressPercentage = Math.round((currentStep / totalSteps) * 100);

  const stepLabels = [
    {
      number: 1,
      title: 'Identity / Danh tính',
      subtitle: 'Salon details / Chi tiết salon'
    },
    {
      number: 2,
      title: 'Location / Vị trí',
      subtitle: 'Where is your salon / Salon ở đâu'
    },
    {
      number: 3,
      title: 'Details / Chi tiết',
      subtitle: 'Business information / Thông tin kinh doanh'
    },
    {
      number: 4,
      title: 'Photos / Ảnh',
      subtitle: 'Show your salon / Hiển thị salon'
    },
    {
      number: 5,
      title: 'Pricing / Giá cả',
      subtitle: 'Choose your plan / Chọn gói'
    },
    {
      number: 6,
      title: 'Review / Xem lại',
      subtitle: 'Final check / Kiểm tra cuối'
    }
  ];

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const formData = form.getValues();
    onComplete(formData, photoUploads, pricingOptions);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <SalonDetailsStep form={form} />;
      case 2:
        return <LocationDetailsStep form={form} />;
      case 3:
        return <FinancialDetailsStep form={form} />;
      case 4:
        return (
          <PhotoUpload
            photoUploads={photoUploads}
            setPhotoUploads={setPhotoUploads}
            maxPhotos={8}
          />
        );
      case 5:
        return (
          <SalonPricingStep
            pricingOptions={pricingOptions}
            setPricingOptions={setPricingOptions}
          />
        );
      case 6:
        return (
          <SalonReviewStep
            form={form}
            photoUploads={photoUploads}
            pricingOptions={pricingOptions}
            onSubmit={handleSubmit}
          />
        );
      default:
        return <SalonDetailsStep form={form} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Sell Your Salon / Bán Salon Của Bạn
          </h1>
          <p className="text-lg text-gray-600">
            Connect with serious buyers and get the best value / Kết nối với người mua nghiêm túc và nhận giá trị tốt nhất
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm font-medium text-purple-600">
              {progressPercentage}% Complete / Hoàn thành
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {/* Step Indicators */}
          <div className="flex justify-between items-center">
            {stepLabels.map((step) => (
              <div key={step.number} className="flex flex-col items-center text-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium mb-2 ${
                  currentStep >= step.number 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step.number}
                </div>
                <div className="text-xs">
                  <div className={`font-medium ${currentStep >= step.number ? 'text-purple-600' : 'text-gray-500'}`}>
                    {step.title}
                  </div>
                  <div className="text-gray-500 mt-1">{step.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <FormProvider {...form}>
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            {renderStep()}
          </div>
        </FormProvider>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous / Trước
          </Button>

          {currentStep < totalSteps ? (
            <Button
              type="button"
              onClick={nextStep}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
            >
              Next / Tiếp theo
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700"
            >
              Publish Listing / Đăng tin
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalonListingWizard;
