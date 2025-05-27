
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Building2 } from 'lucide-react';
import { SalonFormValues, salonFormSchema } from './salonFormSchema';
import { SalonPricingOptions } from '@/utils/posting/salonPricing';
import SalonBasicInfoStep from './steps/SalonBasicInfoStep';
import SalonLocationStep from './steps/SalonLocationStep';
import SalonDetailsStep from './steps/SalonDetailsStep';
import SalonPricingStep from './steps/SalonPricingStep';
import SalonReviewStep from './steps/SalonReviewStep';

type WizardStep = 1 | 2 | 3 | 4 | 5;

const SalonListingWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<WizardStep>(1);
  const [formData, setFormData] = useState<Partial<SalonFormValues>>({});
  const [selectedPricingOptions, setSelectedPricingOptions] = useState<SalonPricingOptions>({
    selectedPricingTier: 'basic',
    durationMonths: 1,
    autoRenew: false,
    isNationwide: false,
    fastSalePackage: false,
    featuredBoost: false,
    showAtTop: false,
    bundleWithJobPost: false,
    isFirstPost: false
  });
  
  const navigate = useNavigate();

  const stepTitles = {
    1: 'Thông tin cơ bản / Basic Information',
    2: 'Địa điểm / Location',
    3: 'Chi tiết & Hình ảnh / Details & Photos',
    4: 'Gói đăng tin / Pricing Plan',
    5: 'Xem lại & Thanh toán / Review & Payment'
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => (prev + 1) as WizardStep);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as WizardStep);
    }
  };

  const handleFormDataUpdate = (stepData: Partial<SalonFormValues>) => {
    setFormData(prev => ({ ...prev, ...stepData }));
  };

  const handlePricingOptionsUpdate = (options: SalonPricingOptions) => {
    setSelectedPricingOptions(options);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <SalonBasicInfoStep
            formData={formData}
            onNext={handleNext}
            onFormDataUpdate={handleFormDataUpdate}
          />
        );
      case 2:
        return (
          <SalonLocationStep
            formData={formData}
            onNext={handleNext}
            onBack={handleBack}
            onFormDataUpdate={handleFormDataUpdate}
          />
        );
      case 3:
        return (
          <SalonDetailsStep
            formData={formData}
            onNext={handleNext}
            onBack={handleBack}
            onFormDataUpdate={handleFormDataUpdate}
          />
        );
      case 4:
        return (
          <SalonPricingStep
            formData={formData as SalonFormValues}
            selectedOptions={selectedPricingOptions}
            onNext={handleNext}
            onBack={handleBack}
            onPricingOptionsUpdate={handlePricingOptionsUpdate}
          />
        );
      case 5:
        return (
          <SalonReviewStep
            formData={formData as SalonFormValues}
            selectedOptions={selectedPricingOptions}
            onBack={handleBack}
          />
        );
      default:
        return null;
    }
  };

  const progress = (currentStep / 5) * 100;

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard')}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại Dashboard / Back to Dashboard
            </Button>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Building2 className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Bán Salon / Sell Your Salon
                </h1>
                <p className="text-gray-600">
                  Đăng tin bán salon của bạn và tiếp cận hàng nghìn người mua tiềm năng /
                  List your salon for sale and reach thousands of potential buyers
                </p>
              </div>
            </div>
          </div>

          {/* Progress */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">
                  Bước {currentStep}/5: {stepTitles[currentStep]}
                </CardTitle>
                <span className="text-sm text-gray-500">{Math.round(progress)}% hoàn thành</span>
              </div>
              <Progress value={progress} className="mt-2" />
            </CardHeader>
          </Card>

          {/* Step Content */}
          <Card>
            <CardContent className="p-8">
              {renderStepContent()}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SalonListingWizard;
