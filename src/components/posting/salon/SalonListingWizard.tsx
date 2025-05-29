import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { SalonFormValues, salonFormSchema } from './salonFormSchema';
import { SalonIdentitySection } from './SalonIdentitySection';
import { SalonLocationSection } from './SalonLocationSection';
import { SalonContactSection } from './SalonContactSection';
import SalonBusinessStep from './steps/SalonBusinessStep';
import { SalonPostDescription } from './SalonPostDescription';
import SalonPhotosStep from './steps/SalonPhotosStep';
import SalonPreviewStep from './steps/SalonPreviewStep';
import SalonPaymentStep from './steps/SalonPaymentStep';
import PostWizardLayout from '../PostWizardLayout';

const SalonListingWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const totalSteps = 8;

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
      askingPrice: '',
      monthlyRent: '',
      monthlyRevenue: '',
      monthlyProfit: '',
      numberOfStaff: '',
      numberOfTables: '',
      numberOfChairs: '',
      squareFeet: '',
      vietnameseDescription: '',
      englishDescription: '',
      reasonForSelling: '',
      virtualTourUrl: '',
      otherNotes: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      contactFacebook: '',
      contactZalo: '',
      contactNotes: '',
      willTrain: false,
      hasHousing: false,
      hasWaxRoom: false,
      hasDiningRoom: false,
      hasLaundry: false,
      hasParking: false,
      equipmentIncluded: false,
      leaseTransferable: false,
      sellerFinancing: false,
      helpWithTransition: false,
      selectedPricingTier: 'basic',
      featuredAddon: false,
      termsAccepted: false,
    },
  });

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

  const handlePaymentComplete = () => {
    // Payment completed - could redirect or show success
    console.log('Payment completed successfully');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <SalonIdentitySection form={form} />;
      case 2:
        return <SalonLocationSection form={form} />;
      case 3:
        return <SalonBusinessStep form={form} />;
      case 4:
        return <SalonContactSection form={form} />;
      case 5:
        return <SalonPostDescription form={form} />;
      case 6:
        return (
          <SalonPhotosStep 
            form={form} 
            photoUploads={photoUploads}
            setPhotoUploads={setPhotoUploads}
          />
        );
      case 7:
        return <SalonPreviewStep form={form} photoUploads={photoUploads} />;
      case 8:
        return <SalonPaymentStep form={form} onPaymentComplete={handlePaymentComplete} />;
      default:
        return <SalonIdentitySection form={form} />;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Salon Identity';
      case 2: return 'Location Details';
      case 3: return 'Business Details';
      case 4: return 'Contact Information';
      case 5: return 'Description';
      case 6: return 'Photos';
      case 7: return 'Preview';
      case 8: return 'Pricing & Payment';
      default: return 'Salon Identity';
    }
  };

  const isLastStep = currentStep === totalSteps;
  const isPreviewStep = currentStep === 7;

  return (
    <PostWizardLayout currentStep={currentStep} totalSteps={totalSteps}>
      <Form {...form}>
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 bg-clip-text text-transparent">
              <h2 className="text-4xl font-bold mb-3 flex items-center justify-center gap-3">
                <Sparkles className="h-8 w-8 text-purple-600" />
                Sell Your Salon Like a Pro
              </h2>
            </div>
            <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto leading-relaxed">
              Join the <span className="font-semibold text-purple-600">most trusted marketplace</span> for salon owners. 
              Your success story starts here.
            </p>
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-200 max-w-lg mx-auto">
              <p className="text-purple-700 font-medium">
                {getStepTitle()} - Step {currentStep} of {totalSteps}
              </p>
              <div className="w-full bg-purple-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200 p-10 mb-10">
            {renderStep()}
          </div>

          <div className="flex justify-between items-center">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2 h-12 px-6 text-base border-2 border-gray-300 hover:border-purple-400 hover:bg-purple-50 transition-all duration-300 disabled:opacity-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous Step
            </Button>

            {!isLastStep && (
              <Button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2 h-12 px-8 text-base bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                {isPreviewStep ? (
                  <>
                    Complete Your Listing
                    <Sparkles className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </Form>
    </PostWizardLayout>
  );
};

export default SalonListingWizard;
