
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { SalonDetailsStep } from './steps/SalonDetailsStep';
import { LocationDetailsStep } from './steps/LocationDetailsStep';
import { FinancialDetailsStep } from './steps/FinancialDetailsStep';
import { PhotoUploadStep } from './steps/PhotoUploadStep';
import SalonPricingStep from './steps/SalonPricingStep';
import { SalonReviewStep } from './steps/SalonReviewStep';
import { SalonFormValues, salonFormSchema } from './salonFormSchema';
import { SalonPricingOptions } from '@/utils/posting/salonPricing';

interface SalonListingWizardProps {
  onComplete: (formData: SalonFormValues, photos: File[], pricing: SalonPricingOptions) => void;
}

const SalonListingWizard = ({ onComplete }: SalonListingWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<SalonFormValues>({
    salonName: '',
    businessType: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    askingPrice: '0',
    monthlyRent: '0',
    monthlyRevenue: '0',
    establishedYear: '2020',
    numberOfChairs: '1',
    hasParking: false,
    hasWaitingArea: false,
    hasPrivateRooms: false,
    equipment: [],
    description: ''
  });
  const [photos, setPhotos] = useState<File[]>([]);
  const [pricing, setPricing] = useState<SalonPricingOptions>({
    selectedPricingTier: 'standard',
    durationMonths: 3,
    featuredAddOn: false,
    autoRenew: false
  });

  const steps = [
    { 
      title: 'Identity / Danh tính',
      subtitle: 'Salon details / Chi tiết salon',
      component: SalonDetailsStep 
    },
    { 
      title: 'Location / Vị trí',
      subtitle: 'Where is your salon / Salon ở đâu',
      component: LocationDetailsStep 
    },
    { 
      title: 'Details / Chi tiết',
      subtitle: 'Business information / Thông tin kinh doanh',
      component: FinancialDetailsStep 
    },
    { 
      title: 'Photos / Ảnh',
      subtitle: 'Show your salon / Hiển thị salon',
      component: PhotoUploadStep 
    },
    { 
      title: 'Pricing / Giá cả',
      subtitle: 'Choose your plan / Chọn gói',
      component: SalonPricingStep 
    },
    { 
      title: 'Review / Xem lại',
      subtitle: 'Final check / Kiểm tra cuối',
      component: SalonReviewStep 
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    onComplete(formData, photos, pricing);
  };

  const updateFormData = (data: Partial<SalonFormValues>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const updatePhotos = (newPhotos: File[]) => {
    setPhotos(newPhotos);
  };

  const updatePricing = (newPricing: SalonPricingOptions) => {
    setPricing(newPricing);
  };

  const StepComponent = steps[currentStep].component;
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sell Your Salon / Bán Salon Của Bạn</h1>
          <p className="text-gray-600">Connect with serious buyers and get the best value / Kết nối với người mua nghiêm túc và nhận giá trị tốt nhất</p>
        </div>

        {/* Progress Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep + 1} of {steps.length}
            </span>
            <Badge variant="outline" className="text-purple-600 border-purple-200">
              {Math.round(progress)}% Complete / Hoàn thành
            </Badge>
          </div>
          <Progress value={progress} className="h-2 mb-6" />
          
          {/* Step Indicators */}
          <div className="flex justify-between items-start mb-4">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center flex-1">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mb-2 ${
                  index <= currentStep ? 'bg-purple-600' : 'bg-gray-300'
                } ${index === currentStep ? 'ring-4 ring-purple-200' : ''}`}>
                  {index + 1}
                </div>
                <div className="text-xs">
                  <div className={`font-medium ${index <= currentStep ? 'text-purple-600' : 'text-gray-500'}`}>
                    {step.title}
                  </div>
                  <div className="text-gray-500 text-xs">
                    {step.subtitle}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="shadow-lg border-0">
          <CardContent className="p-8">
            <StepComponent
              formData={formData}
              photos={photos}
              pricing={pricing}
              updateFormData={updateFormData}
              updatePhotos={updatePhotos}
              updatePricing={updatePricing}
              onNext={handleNext}
              onPrev={handlePrev}
              onComplete={handleComplete}
              isFirstStep={currentStep === 0}
              isLastStep={currentStep === steps.length - 1}
            />
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous / Trước
          </Button>
          
          {currentStep < steps.length - 1 ? (
            <Button
              onClick={handleNext}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
            >
              Next / Tiếp theo
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleComplete}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
            >
              Complete Listing
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalonListingWizard;
