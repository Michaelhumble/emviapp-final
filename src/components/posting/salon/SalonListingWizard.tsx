
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SalonDetailsStep } from './steps/SalonDetailsStep';
import { SalonLocationStep } from './steps/SalonLocationStep';
import SalonPhotoUpload from './SalonPostPhotoUpload';
import SalonPricingStep from './steps/SalonPricingStep';

const SalonListingWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [salonDetails, setSalonDetails] = useState({});
  const [salonLocation, setSalonLocation] = useState({});
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [pricingOptions, setPricingOptions] = useState({});

  const totalSteps = 6;
  const progress = (currentStep / totalSteps) * 100;

  const steps = [
    { 
      id: 1, 
      label: 'Identity / Danh tính', 
      subtitle: 'Salon details / Chi tiết salon',
      component: SalonDetailsStep 
    },
    { 
      id: 2, 
      label: 'Location / Vị trí', 
      subtitle: 'Where is your salon / Salon ở đâu',
      component: SalonLocationStep 
    },
    { 
      id: 3, 
      label: 'Details / Chi tiết', 
      subtitle: 'Business information / Thông tin kinh doanh',
      component: SalonDetailsStep 
    },
    { 
      id: 4, 
      label: 'Photos / Ảnh', 
      subtitle: 'Show your salon / Hiển thị salon',
      component: SalonPhotoUpload 
    },
    { 
      id: 5, 
      label: 'Pricing / Giá cả', 
      subtitle: 'Choose your plan / Chọn gói',
      component: SalonPricingStep 
    },
    { 
      id: 6, 
      label: 'Review / Xem lại', 
      subtitle: 'Final check / Kiểm tra cuối',
      component: SalonDetailsStep 
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

  const getStepProps = () => {
    switch (currentStep) {
      case 1:
      case 3:
        return { salonDetails, setSalonDetails };
      case 2:
        return { salonLocation, setSalonLocation };
      case 4:
        return { photoUploads, setPhotoUploads };
      case 5:
        return { pricingOptions, setPricingOptions };
      default:
        return {};
    }
  };

  const CurrentStepComponent = steps.find(step => step.id === currentStep)?.component || SalonDetailsStep;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Sell Your Salon / Bán Salon Của Bạn
            </h1>
            <p className="text-lg text-gray-600">
              Connect with serious buyers and get the best value / Kết nối với người mua nghiêm túc và nhận giá trị tốt nhất
            </p>
          </div>

          {/* Progress Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm font-medium text-purple-600">
                {Math.round(progress)}% Complete / Hoàn thành
              </span>
            </div>
            <Progress value={progress} className="h-2 mb-6" />

            {/* Step Indicators */}
            <div className="flex justify-between items-center">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center text-center flex-1">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold mb-2 ${
                      currentStep >= step.id 
                        ? 'bg-purple-600 text-white' 
                        : currentStep === step.id
                        ? 'bg-purple-100 text-purple-600 border-2 border-purple-600'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step.id}
                  </div>
                  <div className="text-xs">
                    <div className={`font-medium ${currentStep >= step.id ? 'text-purple-600' : 'text-gray-500'}`}>
                      {step.label}
                    </div>
                    <div className="text-gray-400 mt-1">
                      {step.subtitle}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CurrentStepComponent {...getStepProps()} />
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6">
            <Button 
              variant="outline" 
              onClick={prevStep} 
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous / Trước
            </Button>

            <Button 
              onClick={nextStep} 
              disabled={currentStep === totalSteps}
              className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
            >
              Next / Tiếp theo
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonListingWizard;
