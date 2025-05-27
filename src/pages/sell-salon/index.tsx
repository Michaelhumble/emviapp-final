
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { SalonFormValues } from '@/components/posting/salon/salonFormSchema';
import { SalonPostForm } from '@/components/posting/salon/SalonPostForm';
import SalonPricingSection from '@/components/posting/salon/SalonPricingSection';
import SalonPaymentFeatures from '@/components/posting/salon/SalonPaymentFeatures';
import { SalonPricingOptions } from '@/utils/posting/salonPricing';
import { useNavigate } from 'react-router-dom';

const SellSalonPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<SalonFormValues | null>(null);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
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
    'Salon Details',
    'Description & Features', 
    'Upload Photos',
    'Choose Your Plan',
    'Payment & Review',
    'Success'
  ];

  const handleFormSubmit = (values: SalonFormValues) => {
    setFormData(values);
    setCurrentStep(4); // Go to pricing step
  };

  const handlePricingNext = () => {
    setCurrentStep(5); // Go to payment step
  };

  const handlePricingBack = () => {
    setCurrentStep(1); // Go back to form (which includes photos)
  };

  const handlePayment = () => {
    // Handle payment processing here
    console.log('Processing payment with options:', selectedOptions);
    console.log('Form data:', formData);
    navigate('/salon-listing-success');
  };

  const handlePaymentBack = () => {
    setCurrentStep(4); // Go back to pricing
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Sell Your Salon | EmviApp</title>
        <meta 
          name="description" 
          content="List your salon for sale on EmviApp. Reach thousands of qualified buyers looking for salon businesses."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Sell Your Salon
            </h1>
            <p className="text-xl text-gray-600">
              Connect with qualified buyers and sell your salon business
            </p>
          </div>

          {/* Progress Bar */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Step {currentStep} of {steps.length}</span>
                  <span>{Math.round(progress)}% Complete</span>
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
                />
              )}

              {currentStep === 5 && formData && (
                <SalonPaymentFeatures
                  formData={formData}
                  selectedOptions={selectedOptions}
                  onPayment={handlePayment}
                  onBack={handlePaymentBack}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SellSalonPage;
