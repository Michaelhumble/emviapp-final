
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { SalonFormValues } from './salonFormSchema';
import { SalonPostForm } from './SalonPostForm';
import SalonPricingSection from './SalonPricingSection';
import SalonPaymentFeatures from './SalonPaymentFeatures';
import { SalonPricingOptions } from '@/utils/posting/salonPricing';
import { useTranslation } from "@/hooks/useTranslation";
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface SalonListingWizardProps {
  onComplete: (formData: SalonFormValues, options: SalonPricingOptions) => void;
}

const SalonListingWizard: React.FC<SalonListingWizardProps> = ({ onComplete }) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<SalonFormValues | null>(null);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<SalonPricingOptions>({
    durationMonths: 1,
    selectedPricingTier: 'standard',
    autoRenew: false,
    isNationwide: false,
    isFirstPost: true,
    showAtTop: false,
    fastSalePackage: false,
    bundleWithJobPost: false,
    featuredBoost: false
  });

  const steps = [
    t({ english: 'Salon Details', vietnamese: 'Chi Tiết Tiệm' }),
    t({ english: 'Description & Features', vietnamese: 'Mô Tả & Tính Năng' }),
    t({ english: 'Upload Photos', vietnamese: 'Tải Ảnh' }),
    t({ english: 'Choose Your Plan', vietnamese: 'Chọn Gói' }),
    t({ english: 'Payment & Review', vietnamese: 'Thanh Toán & Xem Lại' }),
    t({ english: 'Success', vietnamese: 'Thành Công' })
  ];

  const handleFormSubmit = (values: SalonFormValues) => {
    console.log('Form submitted with values:', values);
    console.log('Photos uploaded:', photoUploads.length);
    
    // Validate required Vietnamese fields
    if (!values.numberOfTables || !values.numberOfChairs) {
      console.error('Vietnamese salon fields (tables/chairs) are required');
      return;
    }
    
    // Validate photos one more time
    if (photoUploads.length === 0) {
      console.error('No photos uploaded, cannot proceed');
      return;
    }
    
    setFormData(values);
    console.log('Moving to pricing step (step 4)');
    setCurrentStep(4); // Go to pricing step
  };

  const handlePricingNext = () => {
    if (!formData) {
      console.error('No form data available');
      return;
    }
    console.log('Pricing step completed, moving to payment');
    setCurrentStep(5); // Go to payment step
  };

  const handlePricingBack = () => {
    console.log('Going back to form');
    setCurrentStep(1); // Go back to form (which includes photos)
  };

  const handlePayment = () => {
    if (!formData) {
      console.error('No form data available for payment');
      return;
    }
    
    if (!paymentCompleted) {
      console.error('Payment must be completed before publishing listing');
      return;
    }
    
    console.log('Payment completed, calling onComplete');
    onComplete(formData, selectedOptions);
  };

  const handlePaymentSuccess = () => {
    console.log('Payment successful, enabling listing creation');
    setPaymentCompleted(true);
  };

  const handlePaymentBack = () => {
    console.log('Going back to pricing');
    setCurrentStep(4); // Go back to pricing
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>{t({ english: `Step ${currentStep} of ${steps.length}`, vietnamese: `Bước ${currentStep} / ${steps.length}` })}</span>
              <span>{Math.round(progress)}% {t({ english: "Complete", vietnamese: "Hoàn Thành" })}</span>
            </div>
            <Progress value={progress} className="w-full" />
            <div className="flex justify-between text-sm">
              {steps.map((step, index) => (
                <span 
                  key={index}
                  className={`${
                    index + 1 <= currentStep 
                      ? 'text-purple-600 font-medium' 
                      : 'text-gray-400'
                  }`}
                >
                  {step}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Warning */}
      {currentStep >= 4 && !paymentCompleted && (
        <Alert className="mb-6 border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>Payment Required:</strong> Your salon listing will only be published after successful payment processing via Stripe.
          </AlertDescription>
        </Alert>
      )}

      {/* Step Content */}
      <Card>
        <CardContent className="p-8">
          {currentStep <= 3 && (
            <SalonPostForm
              onSubmit={handleFormSubmit}
              photoUploads={photoUploads}
              setPhotoUploads={setPhotoUploads}
              onNationwideChange={(checked) => 
                setSelectedOptions(prev => ({ ...prev, isNationwide: checked }))
              }
              onFastSaleChange={(checked) => 
                setSelectedOptions(prev => ({ ...prev, fastSalePackage: checked }))
              }
            />
          )}

          {currentStep === 4 && (
            <SalonPricingSection
              options={selectedOptions}
              onOptionsChange={setSelectedOptions}
              onNext={handlePricingNext}
              onBack={handlePricingBack}
              isFirstPost={true}
            />
          )}

          {currentStep === 5 && formData && (
            <SalonPaymentFeatures
              formData={formData}
              selectedOptions={selectedOptions}
              onPayment={handlePayment}
              onPaymentSuccess={handlePaymentSuccess}
              onBack={handlePaymentBack}
              paymentCompleted={paymentCompleted}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonListingWizard;
