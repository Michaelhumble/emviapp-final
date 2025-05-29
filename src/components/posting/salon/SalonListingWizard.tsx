
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { SalonFormValues, salonFormSchema } from './salonFormSchema';
import { SalonPricingOptions, SalonPricingTier } from '@/utils/posting/salonPricing';
import { useStripe } from '@/hooks/useStripe';
import PostWizardLayout from '@/components/posting/PostWizardLayout';

import { SalonDetailsStep } from './steps/SalonDetailsStep';
import LocationDetailsStep from './steps/LocationDetailsStep';
import FinancialDetailsStep from './steps/FinancialDetailsStep';
import DescriptionDetailsStep from './steps/DescriptionDetailsStep';
import FeaturesDetailsStep from './steps/FeaturesDetailsStep';
import { SalonPricingStep } from './steps/SalonPricingStep';
import PhotoUpload from '../PhotoUpload';
import { SalonReviewStep } from './steps/SalonReviewStep';
import TermsAndConditionsStep from './steps/TermsAndConditionsStep';

interface StepProps {
  form: any;
  photoUploads?: File[];
  setPhotoUploads?: React.Dispatch<React.SetStateAction<File[]>>;
  selectedOptions?: SalonPricingOptions;
  onOptionsChange?: (options: SalonPricingOptions) => void;
}

interface SalonReviewStepProps {
  form: any;
  photoUploads: File[];
}

const steps = [
  'Details',
  'Location',
  'Financials',
  'Description',
  'Features',
  'Photos',
  'Pricing',
  'Review',
  'Terms'
];

const SalonListingWizard: React.FC<{ onComplete: (formData: SalonFormValues, photos: File[], pricing: SalonPricingOptions) => void }> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<SalonPricingOptions>({
    selectedPricingTier: 'standard',
    durationMonths: 3,
    featuredAddOn: false,
    autoRenew: false,
    isFirstPost: true
  });
  const { initiatePayment, isLoading } = useStripe();

  const form = useForm<SalonFormValues>({
    resolver: zodResolver(salonFormSchema),
    defaultValues: {
      salonName: '',
      businessType: '',
      beautyIndustry: 'Nails',
      address: '',
      city: '',
      state: '',
      askingPrice: '',
      monthlyRent: '',
      termsAccepted: false,
      autoRenew: false
    },
    mode: "onChange"
  });

  const handleNext = () => {
    form.handleSubmit(async (data) => {
      if (currentStep === steps.length) {
        if (!data.termsAccepted) {
          toast.error("Please accept the terms and conditions");
          return;
        }
        
        const success = await initiatePayment(selectedOptions, data);
        if (success) {
          onComplete(data, photoUploads, selectedOptions);
        }
      } else {
        setCurrentStep(currentStep + 1);
      }
    })();
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };
  
  const renderStepContent = (step: number) => {
    const stepProps: StepProps = {
      form,
      photoUploads,
      setPhotoUploads,
      selectedOptions,
      onOptionsChange: setSelectedOptions
    };
    
    switch (step) {
      case 1:
        return <SalonDetailsStep {...stepProps} />;
      case 2:
        return <LocationDetailsStep {...stepProps} />;
      case 3:
        return <FinancialDetailsStep {...stepProps} />;
      case 4:
        return <DescriptionDetailsStep {...stepProps} />;
      case 5:
        return <FeaturesDetailsStep {...stepProps} />;
      case 6:
        return <PhotoUpload photoUploads={photoUploads} setPhotoUploads={setPhotoUploads} />;
      case 7:
        return <SalonPricingStep selectedOptions={selectedOptions} onOptionsChange={setSelectedOptions} form={form} />;
      case 8:
        return <SalonReviewStep form={form} photoUploads={photoUploads} />;
      case 9:
        return <TermsAndConditionsStep form={form} />;
      default:
        return <div>Not Found</div>;
    }
  };

  return (
    <PostWizardLayout currentStep={currentStep} totalSteps={steps.length}>
      <Card>
        <CardContent className="relative">
          <FormProvider {...form}>
            {renderStepContent(currentStep)}
          </FormProvider>
        </CardContent>
      </Card>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button onClick={handleNext} disabled={isLoading}>
          {currentStep === steps.length ? (
            <>
              {isLoading ? "Processing..." : "Confirm & Pay"}
            </>
          ) : (
            <>
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </PostWizardLayout>
  );
};

export default SalonListingWizard;
