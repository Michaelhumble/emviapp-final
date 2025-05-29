
import React, { useState } from 'react';
import { SalonFormValues, salonFormSchema } from './salonFormSchema';
import { SalonPricingOptions, calculateSalonPostPrice, getSalonPostPricingSummary } from '@/utils/posting/salonPricing';
import { SalonDetailsStep } from './steps/SalonDetailsStep';
import { LocationDetailsStep } from './steps/LocationDetailsStep';
import { FeaturesDetailsStep } from './steps/FeaturesDetailsStep';
import { PhotoUploadStep } from './steps/PhotoUploadStep';
import { SalonPricingStep } from './steps/SalonPricingStep';
import { SalonReviewStep } from './steps/SalonReviewStep';

interface SalonListingWizardProps {
  onComplete: (formData: SalonFormValues, photos: File[], pricing: SalonPricingOptions) => void;
}

const SalonListingWizard: React.FC<SalonListingWizardProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<SalonFormValues>({
    salonName: '',
    businessType: '',
    beautyIndustry: 'Nails',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    askingPrice: '',
    monthlyRent: '',
    monthlyRevenue: '',
    numberOfChairs: '',
    equipment: [],
    description: '',
    hasParking: false,
    hasWaitingArea: false,
    hasPrivateRooms: false,
    termsAccepted: false
  });

  const [photos, setPhotos] = useState<File[]>([]);
  const [pricing, setPricing] = useState<SalonPricingOptions>({
    selectedPricingTier: 'standard',
    durationMonths: 3,
    featuredAddOn: false,
    autoRenew: false,
    isNationwide: false,
    fastSalePackage: false
  });

  const totalSteps = 6;

  const updateFormData = (data: Partial<SalonFormValues>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const updatePhotos = (newPhotos: File[]) => {
    setPhotos(newPhotos);
  };

  const updatePricing = (newPricing: SalonPricingOptions) => {
    setPricing(newPricing);
  };

  const getStepCompletion = () => {
    return Math.round((currentStep / totalSteps) * 100);
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    onComplete(formData, photos, pricing);
  };

  const getStepInfo = (stepNumber: number) => {
    const steps = [
      {
        title: 'Identity / Danh tính',
        subtitle: 'Salon details / Chi tiết salon'
      },
      {
        title: 'Location / Vị trí',
        subtitle: 'Where is your salon / Salon ở đâu'
      },
      {
        title: 'Details / Chi tiết',
        subtitle: 'Business information / Thông tin kinh doanh'
      },
      {
        title: 'Photos / Ảnh',
        subtitle: 'Show your salon / Hiển thị salon'
      },
      {
        title: 'Pricing / Giá cả',
        subtitle: 'Choose your plan / Chọn gói'
      },
      {
        title: 'Review / Xem lại',
        subtitle: 'Final check / Kiểm tra cuối'
      }
    ];
    return steps[stepNumber - 1];
  };

  const renderStep = () => {
    const stepProps = {
      formData,
      photos,
      pricing,
      updateFormData,
      updatePhotos,
      updatePricing,
      onNext: handleNext,
      onPrev: handlePrev,
      onComplete: handleComplete,
      isFirstStep: currentStep === 1,
      isLastStep: currentStep === totalSteps
    };

    switch (currentStep) {
      case 1:
        return <SalonDetailsStep {...stepProps} />;
      case 2:
        return <LocationDetailsStep {...stepProps} />;
      case 3:
        return <FeaturesDetailsStep {...stepProps} />;
      case 4:
        return <PhotoUploadStep {...stepProps} />;
      case 5:
        return <SalonPricingStep {...stepProps} setPricing={updatePricing} />;
      case 6:
        return <SalonReviewStep {...stepProps} />;
      default:
        return <SalonDetailsStep {...stepProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sell Your Salon / Bán Salon Của Bạn
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with serious buyers and get the best value / Kết nối với người mua nghiêm túc và nhận giá trị tốt nhất
          </p>
        </div>

        {/* Progress Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm font-medium text-purple-600">
              {getStepCompletion()}% Complete / Hoàn thành
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${getStepCompletion()}%` }}
            />
          </div>

          {/* Step Indicators */}
          <div className="flex justify-between items-start">
            {Array.from({ length: totalSteps }, (_, index) => {
              const stepNumber = index + 1;
              const stepInfo = getStepInfo(stepNumber);
              const isActive = stepNumber === currentStep;
              const isCompleted = stepNumber < currentStep;
              const isAccessible = stepNumber <= currentStep;

              return (
                <div key={stepNumber} className="flex flex-col items-center flex-1">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold mb-2 transition-all duration-300 ${
                    isActive 
                      ? 'bg-purple-600 text-white shadow-lg scale-110' 
                      : isCompleted
                        ? 'bg-purple-100 text-purple-600 border-2 border-purple-300'
                        : 'bg-gray-100 text-gray-400'
                  }`}>
                    {stepNumber}
                  </div>
                  <div className="text-center">
                    <div className={`text-xs font-medium mb-1 ${
                      isActive ? 'text-purple-600' : isCompleted ? 'text-purple-500' : 'text-gray-400'
                    }`}>
                      {stepInfo.title}
                    </div>
                    <div className={`text-xs ${
                      isActive ? 'text-gray-700' : 'text-gray-500'
                    }`}>
                      {stepInfo.subtitle}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-8">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            ← Previous / Trước
          </button>

          {currentStep === totalSteps ? (
            <button
              onClick={handleComplete}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg"
            >
              Complete Listing / Hoàn thành
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg"
            >
              Next / Tiếp theo →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalonListingWizard;
