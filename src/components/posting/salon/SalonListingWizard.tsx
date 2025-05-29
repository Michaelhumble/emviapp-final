
import React, { useState, useCallback } from 'react';
import { useForm, FormProvider, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { salonFormSchema, SalonFormValues } from '../salon/salonFormSchema';
import { SalonDetailsStep } from '../salon/steps/SalonDetailsStep';
import { LocationDetailsStep } from '../salon/steps/LocationDetailsStep';
import { FinancialDetailsStep } from '../salon/steps/FinancialDetailsStep';
import { DescriptionDetailsStep } from '../salon/steps/DescriptionDetailsStep';
import { FeatureDetailsStep } from '../salon/steps/FeatureDetailsStep';
import { PhotoUploadStep } from '../salon/steps/PhotoUploadStep';
import { SalonPricingStep } from '../salon/steps/SalonPricingStep';
import { TermsConfirmationStep } from '../salon/steps/TermsConfirmationStep';
import { SalonReviewStep } from '../salon/steps/SalonReviewStep';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';
import { generateUniqueId } from '@/utils';
import { SalonPricingOptions, SalonPricingTier } from '@/utils/posting';

interface StepProps {
  form: UseFormReturn<SalonFormValues>;
  onNext: () => void;
  onPrev: () => void;
  photos: File[];
  setPhotos: React.Dispatch<React.SetStateAction<File[]>>;
  selectedOptions: SalonPricingOptions;
  onOptionsChange: (options: SalonPricingOptions) => void;
}

interface SalonListingWizardProps {
  onComplete: (formData: SalonFormValues, photos: File[], pricing: SalonPricingOptions) => void;
}

const steps = [
  'details',
  'location',
  'financials',
  'description',
  'features',
  'photos',
  'pricing',
  'terms',
  'review',
] as const;

type Step = (typeof steps)[number];

const stepComponents: Record<Step, React.FC<StepProps>> = {
  details: SalonDetailsStep,
  location: LocationDetailsStep,
  financials: FinancialDetailsStep,
  description: DescriptionDetailsStep,
  features: FeatureDetailsStep,
  photos: PhotoUploadStep,
  pricing: SalonPricingStep,
  terms: TermsConfirmationStep,
  review: SalonReviewStep,
};

const SalonListingWizard: React.FC<SalonListingWizardProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState<Step>('details');
  const [photos, setPhotos] = useState<File[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<SalonPricingOptions>({
    selectedPricingTier: 'standard' as SalonPricingTier,
    isNationwide: false,
    fastSalePackage: false,
  });
  const navigate = useNavigate();
  const { toast } = useToast();

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
      isNationwide: false,
      fastSalePackage: false,
      autoRenew: false
    },
    mode: 'onChange',
  });

  const handleNext = () => {
    const currentStepIndex = steps.indexOf(currentStep);
    if (currentStepIndex < steps.length - 1) {
      setCurrentStep(steps[currentStepIndex + 1]);
    }
  };

  const handlePrev = () => {
    const currentStepIndex = steps.indexOf(currentStep);
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1]);
    }
  };

  const handlePricingOptionsChange = useCallback((options: SalonPricingOptions) => {
    setSelectedOptions(options);
  }, []);

  const CurrentStepComponent = stepComponents[currentStep];

  const handleSubmit = async () => {
    try {
      await form.handleSubmit(async (data) => {
        console.log('Form Data Submitted:', data);
        onComplete(data, photos, selectedOptions);
        toast({
          title: "Salon listing submitted!",
          description: "We'll review your listing and contact you soon.",
        })
        navigate('/dashboard/salons');
      })();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.message || "Failed to submit salon listing. Please try again.",
      })
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={(e) => e.preventDefault()} className="container max-w-3xl mx-auto py-10">
        <h1 className="text-3xl font-semibold mb-6 text-center font-playfair">List Your Salon For Sale</h1>

        {CurrentStepComponent && (
          <CurrentStepComponent
            form={form}
            onNext={handleNext}
            onPrev={handlePrev}
            photos={photos}
            setPhotos={setPhotos}
            selectedOptions={selectedOptions}
            onOptionsChange={handlePricingOptionsChange}
          />
        )}

        <div className="flex justify-between mt-8">
          {currentStep !== 'details' && currentStep !== 'terms' && (
            <Button variant="secondary" onClick={handlePrev}>
              Previous
            </Button>
          )}

          {currentStep !== 'terms' ? (
            <Button onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default SalonListingWizard;
