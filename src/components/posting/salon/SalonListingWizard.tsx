
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { SalonIdentityStep } from './steps/SalonIdentityStep';
import { SalonLocationStep } from './steps/SalonLocationStep';
import { SalonDetailsStep } from './steps/SalonDetailsStep';
import SalonPostPhotoUpload from './SalonPostPhotoUpload';
import { SalonPricingStep } from './steps/SalonPricingStep';

const SalonListingWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [salonDetails, setSalonDetails] = useState({});
  const [salonLocation, setSalonLocation] = useState({});
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [pricingOptions, setPricingOptions] = useState({});

  const steps = [
    { 
      id: 1, 
      title: 'Salon Identity', 
      subtitle: 'Thông tin cơ bản',
      description: 'Tell us about your salon business',
      isCompleted: currentStep > 1 
    },
    { 
      id: 2, 
      title: 'Location', 
      subtitle: 'Địa điểm',
      description: 'Where is your salon located?',
      isCompleted: currentStep > 2 
    },
    { 
      id: 3, 
      title: 'Business Details', 
      subtitle: 'Chi tiết kinh doanh',
      description: 'Financial and operational information',
      isCompleted: currentStep > 3 
    },
    { 
      id: 4, 
      title: 'Photos', 
      subtitle: 'Hình ảnh',
      description: 'Upload beautiful salon photos',
      isCompleted: currentStep > 4 
    },
    { 
      id: 5, 
      title: 'Pricing & Payment', 
      subtitle: 'Thanh toán',
      description: 'Choose your listing plan',
      isCompleted: currentStep > 5 
    }
  ];

  const totalSteps = steps.length;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepId: number) => {
    setCurrentStep(stepId);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <SalonIdentityStep 
            salonDetails={salonDetails}
            setSalonDetails={setSalonDetails}
          />
        );
      case 2:
        return (
          <SalonLocationStep 
            salonLocation={salonLocation}
            setSalonLocation={setSalonLocation}
          />
        );
      case 3:
        return (
          <SalonDetailsStep 
            salonDetails={salonDetails}
            setSalonDetails={setSalonDetails}
          />
        );
      case 4:
        return (
          <SalonPostPhotoUpload 
            photoUploads={photoUploads}
            setPhotoUploads={setPhotoUploads}
          />
        );
      case 5:
        return (
          <SalonPricingStep 
            pricingOptions={pricingOptions}
            setPricingOptions={setPricingOptions}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            💎 Sell Your Salon | Bán Salon Của Bạn
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            List your salon business for sale and reach thousands of qualified buyers
            <br />
            <span className="text-purple-600">Đăng tin bán salon và tiếp cận hàng nghìn người mua tiềm năng</span>
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-purple-600">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>
          <Progress 
            value={progressPercentage} 
            className="h-3 bg-purple-100"
          />
        </div>

        {/* Step Indicators */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {steps.map((step) => (
            <Card 
              key={step.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                currentStep === step.id
                  ? 'ring-2 ring-purple-500 bg-gradient-to-br from-purple-50 to-pink-50'
                  : step.isCompleted
                  ? 'bg-green-50 border-green-200'
                  : 'bg-white hover:bg-gray-50'
              }`}
              onClick={() => handleStepClick(step.id)}
            >
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  {step.isCompleted ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                      currentStep === step.id
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {step.id}
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-sm text-gray-900 mb-1">
                  {step.title}
                </h3>
                <p className="text-xs text-purple-600 mb-1">
                  {step.subtitle}
                </p>
                <p className="text-xs text-gray-500">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              Step {currentStep} of {totalSteps}
            </p>
          </div>

          <Button
            onClick={handleNext}
            disabled={currentStep === totalSteps}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {currentStep === totalSteps ? 'Complete' : 'Next'}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SalonListingWizard;
