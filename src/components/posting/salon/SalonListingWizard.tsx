
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
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
  const totalSteps = 7;

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
    setCurrentStep(7); // Move to final step/success page
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
      case 8: return 'Payment';
      default: return 'Salon Identity';
    }
  };

  const isLastStep = currentStep === 8;
  const isPreviewStep = currentStep === 7;

  return (
    <PostWizardLayout currentStep={currentStep} totalSteps={8}>
      <Form {...form}>
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-center mb-2">
              List Your Salon for Sale
            </h2>
            <p className="text-center text-gray-600 mb-4">
              {getStepTitle()} - Step {currentStep} of {totalSteps}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            {renderStep()}
          </div>

          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>

            {!isLastStep && (
              <Button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {isPreviewStep ? 'Continue to Payment' : 'Next'}
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </Form>
    </PostWizardLayout>
  );
};

export default SalonListingWizard;
