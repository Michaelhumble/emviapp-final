
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, ArrowLeft, ArrowRight } from 'lucide-react';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SalonFormValues, salonFormSchema } from './salonFormSchema';
import { SalonIdentityStep } from './steps/SalonIdentityStep';
import SalonDetailsStep from './steps/SalonDetailsStep';
import SalonLocationStep from './steps/SalonLocationStep';
import SalonPhotoUpload from './SalonPostPhotoUpload';
import SalonPricingStep from './steps/SalonPricingStep';

const SalonListingWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [pricingOptions, setPricingOptions] = useState<any>({});

  const form = useForm<SalonFormValues>({
    resolver: zodResolver(salonFormSchema),
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
      englishDescription: '',
      vietnameseDescription: '',
      reasonForSelling: '',
      askingPrice: '',
      grossRevenue: '',
      netProfit: '',
      equipmentIncluded: false,
      leaseTransferable: false,
      sellerFinancing: false
    }
  });

  const steps = [
    {
      id: 'identity',
      title: 'Salon Information',
      subtitle: 'Thông Tin Salon',
      description: 'Tell us about your salon business',
      icon: '🏢'
    },
    {
      id: 'location',
      title: 'Location Details',
      subtitle: 'Thông Tin Vị Trí',
      description: 'Where is your salon located?',
      icon: '📍'
    },
    {
      id: 'details',
      title: 'Business Details',
      subtitle: 'Chi Tiết Kinh Doanh',
      description: 'Financial and operational details',
      icon: '💼'
    },
    {
      id: 'photos',
      title: 'Salon Photos',
      subtitle: 'Hình Ảnh Salon',
      description: 'Upload beautiful photos of your salon',
      icon: '📸'
    },
    {
      id: 'pricing',
      title: 'Choose Plan',
      subtitle: 'Chọn Gói Đăng Tin',
      description: 'Select your listing duration and features',
      icon: '💎'
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <SalonIdentityStep form={form} />;
      case 1:
        return <SalonLocationStep form={form} />;
      case 2:
        return <SalonDetailsStep form={form} />;
      case 3:
        return (
          <SalonPhotoUpload
            photoUploads={photoUploads}
            setPhotoUploads={setPhotoUploads}
          />
        );
      case 4:
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            💎 Sell Your Salon / Bán Salon Của Bạn
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            List your salon for sale and reach thousands of qualified buyers looking for established beauty businesses.
            <br />
            <span className="text-purple-600 font-medium">
              Đăng tin bán salon và tiếp cận hàng nghìn người mua tiềm năng đang tìm kiếm doanh nghiệp làm đẹp.
            </span>
          </p>
        </div>

        {/* Progress Steps */}
        <Card className="mb-8 border-2 border-purple-100 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold transition-all ${
                      index <= currentStep 
                        ? 'bg-purple-600 text-white shadow-lg' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {index < currentStep ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <span>{step.icon}</span>
                      )}
                    </div>
                    <div className="text-center mt-2">
                      <p className={`text-sm font-medium ${
                        index <= currentStep ? 'text-purple-600' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-500">{step.subtitle}</p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-1 mx-4 rounded transition-all ${
                      index < currentStep ? 'bg-purple-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Form */}
        <Form {...form}>
          <Card className="border-2 border-purple-100 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    {steps[currentStep].icon} {steps[currentStep].title}
                  </CardTitle>
                  <p className="text-purple-100 mt-1">
                    {steps[currentStep].description}
                  </p>
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white">
                  Step {currentStep + 1} of {steps.length}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="p-8">
              {renderStepContent()}
            </CardContent>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center p-6 bg-gray-50 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous / Quay lại
              </Button>

              <div className="text-sm text-gray-500">
                Step {currentStep + 1} of {steps.length}
              </div>

              <Button
                type="button"
                onClick={nextStep}
                disabled={currentStep === steps.length - 1}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
              >
                Next / Tiếp theo
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </Form>
      </div>
    </div>
  );
};

export default SalonListingWizard;
