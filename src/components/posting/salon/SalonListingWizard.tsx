
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SalonPostForm } from './SalonPostForm';
import SalonPlanSelectionSection from './SalonPlanSelectionSection';
import { SalonPricingOptions, SalonPricingTier, calculateSalonPostPrice } from '@/utils/posting/salonPricing';
import { SalonFormValues } from './salonFormSchema';
import { useTranslation } from '@/hooks/useTranslation';

const SalonListingWizard = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<SalonFormValues | null>(null);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  
  // Fix: Initialize with proper SalonPricingTier type instead of string
  const [pricingOptions, setPricingOptions] = useState<SalonPricingOptions>({
    selectedPricingTier: 'standard' as SalonPricingTier, // Fix: explicit type cast
    isNationwide: false,
    fastSalePackage: false,
    showAtTop: false,
    bundleWithJobPost: false,
    isFirstPost: false
  });

  const totalSteps = 3;
  
  const handleFormSubmit = (values: SalonFormValues) => {
    setFormData(values);
    setCurrentStep(2);
  };

  const handlePricingOptionsChange = (options: SalonPricingOptions) => {
    setPricingOptions(options);
  };

  const handleNextFromPricing = () => {
    setCurrentStep(3);
  };

  const handlePaymentComplete = () => {
    // Payment completion logic
    console.log('Payment completed for salon listing');
  };

  const currentPrice = calculateSalonPostPrice(pricingOptions);

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">
          {t({ english: 'List Your Salon for Sale', vietnamese: 'Đăng bán Salon của bạn' })}
        </h1>
        <Progress value={(currentStep / totalSteps) * 100} className="mb-4" />
        <p className="text-gray-600">
          {t({ english: `Step ${currentStep} of ${totalSteps}`, vietnamese: `Bước ${currentStep} / ${totalSteps}` })}
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          {currentStep === 1 && (
            <SalonPostForm
              onSubmit={handleFormSubmit}
              photoUploads={photoUploads}
              setPhotoUploads={setPhotoUploads}
              onNationwideChange={(checked) => 
                setPricingOptions(prev => ({ ...prev, isNationwide: checked }))
              }
              onFastSaleChange={(checked) => 
                setPricingOptions(prev => ({ ...prev, fastSalePackage: checked }))
              }
            />
          )}

          {currentStep === 2 && (
            <SalonPlanSelectionSection
              selectedOptions={pricingOptions}
              onOptionsChange={handlePricingOptionsChange}
              onNext={handleNextFromPricing}
              onBack={() => setCurrentStep(1)}
            />
          )}

          {currentStep === 3 && (
            <div className="text-center py-8">
              <h2 className="text-2xl font-bold mb-4">
                {t({ english: 'Complete Payment', vietnamese: 'Hoàn tất thanh toán' })}
              </h2>
              <p className="text-gray-600 mb-6">
                {t({ english: `Total: $${currentPrice.toFixed(2)}`, vietnamese: `Tổng: $${currentPrice.toFixed(2)}` })}
              </p>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(2)}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t({ english: 'Back', vietnamese: 'Quay lại' })}
                </Button>
                <Button onClick={handlePaymentComplete}>
                  {t({ english: 'Pay Now', vietnamese: 'Thanh toán ngay' })}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonListingWizard;
