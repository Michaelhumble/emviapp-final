
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SalonFormValues } from './salonFormSchema';
import { SalonPostForm } from './SalonPostForm';
import { SalonPricingOptions, calculateSalonPostPrice } from '@/utils/posting/salonPricing';
import SalonPaymentFeatures from './SalonPaymentFeatures';
import SalonPricingSection from './SalonPricingSection';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SalonListingWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<SalonFormValues | null>(null);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<SalonPricingOptions>({
    durationMonths: 1,
    isNationwide: false,
    fastSalePackage: false,
    showAtTop: false,
    bundleWithJobPost: false,
    featuredBoost: false,
    selectedPricingTier: 'standard'
  });
  const [hasPlanSelection, setHasPlanSelection] = useState(false);
  
  const navigate = useNavigate();
  
  const totalSteps = 6;
  const progress = (currentStep / totalSteps) * 100;

  const stepTitles = [
    'Basic Information',
    'Description & Details', 
    'Photos',
    'Choose Your Plan',
    'Payment & Features',
    'Success'
  ];

  const handleFormSubmit = (values: SalonFormValues) => {
    console.log('Form submitted with values:', values);
    setFormData(values);
    setCurrentStep(4); // Go to pricing selection step
  };

  const handlePricingSelect = (options: SalonPricingOptions) => {
    console.log('Pricing selected:', options);
    setSelectedOptions(options);
    setHasPlanSelection(true);
    setCurrentStep(5); // Go to payment step
  };

  const handlePayment = () => {
    if (!formData || !hasPlanSelection) {
      console.error('Missing form data or plan selection');
      return;
    }
    
    console.log('Processing payment with:', {
      formData,
      selectedOptions,
      totalPrice: calculateSalonPostPrice(selectedOptions)
    });
    
    // TODO: Integrate with Stripe
    setCurrentStep(6);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      
      // Reset plan selection flag when going back from payment
      if (currentStep === 5) {
        setHasPlanSelection(false);
      }
    } else {
      navigate('/dashboard');
    }
  };

  const canProceedToPayment = () => {
    return formData && hasPlanSelection && selectedOptions;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
      case 2:
      case 3:
        return (
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
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Choose Your Plan</h2>
              <p className="text-gray-600">Select the perfect plan for your salon listing</p>
            </div>
            
            <SalonPricingSection
              selectedOptions={selectedOptions}
              onOptionsChange={handlePricingSelect}
              isFirstPost={true}
            />
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Photos
              </Button>
              
              <Button 
                onClick={() => setCurrentStep(5)}
                disabled={!hasPlanSelection}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Continue to Payment
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        );
      
      case 5:
        if (!formData || !hasPlanSelection) {
          return (
            <Card>
              <CardHeader>
                <CardTitle>Error</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Please complete all previous steps before proceeding to payment.</p>
                <Button onClick={() => setCurrentStep(1)} className="mt-4">
                  Start Over
                </Button>
              </CardContent>
            </Card>
          );
        }
        
        return (
          <SalonPaymentFeatures
            formData={formData}
            selectedOptions={selectedOptions}
            onPayment={handlePayment}
            onBack={handleBack}
          />
        );
      
      case 6:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-green-600">Success!</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Your salon listing has been submitted successfully!</p>
              <div className="space-y-2">
                <Button onClick={() => navigate('/salons')} className="w-full">
                  View All Salons
                </Button>
                <Button variant="outline" onClick={() => navigate('/dashboard')} className="w-full">
                  Return to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      
      default:
        return <div>Invalid step</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container max-w-4xl mx-auto py-4 px-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold">List Your Salon for Sale</h1>
            <span className="text-sm text-gray-500">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
          
          {/* Progress Bar */}
          <Progress value={progress} className="h-2" />
          
          {/* Step Labels */}
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            {stepTitles.map((title, index) => (
              <span 
                key={index}
                className={`${
                  index + 1 <= currentStep ? 'text-purple-600 font-medium' : ''
                }`}
              >
                {title}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="container max-w-4xl mx-auto py-8 px-4">
        {renderStepContent()}
      </div>
    </div>
  );
};

export default SalonListingWizard;
