import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { SalonFormValues } from './salonFormSchema';
import { SalonPricingOptions } from '@/utils/posting/salonPricing';
import { SalonDetailsStep } from './steps/SalonDetailsStep';
import { LocationDetailsStep } from './steps/LocationDetailsStep';
import { FinancialDetailsStep } from './steps/FinancialDetailsStep';
import { FeaturesDetailsStep } from './steps/FeaturesDetailsStep';
import { PhotoUploadStep } from './steps/PhotoUploadStep';
import SalonPricingStep from './steps/SalonPricingStep';
import SalonReviewStep from './steps/SalonReviewStep';

interface SalonListingWizardProps {
  onComplete: (formData: SalonFormValues, photos: File[], pricing: SalonPricingOptions) => void;
}

interface FormStep {
  id: string;
  title: string;
  component: React.ComponentType<any>;
}

const initialFormData: SalonFormValues = {
  salonName: '',
  businessType: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  askingPrice: '',
  monthlyRent: '',
  monthlyRevenue: '',
  numberOfChairs: '',
  hasParking: false,
  hasWaitingArea: false,
  hasPrivateRooms: false,
  equipment: [],
  description: '',
};

const STEPS = [
  { id: 'details', title: 'Salon Details', component: SalonDetailsStep },
  { id: 'location', title: 'Location', component: LocationDetailsStep },
  { id: 'financial', title: 'Financial Info', component: FinancialDetailsStep },
  { id: 'features', title: 'Features', component: FeaturesDetailsStep },
  { id: 'photos', title: 'Photos', component: PhotoUploadStep },
  { id: 'pricing', title: 'Pricing', component: SalonPricingStep },
  { id: 'review', title: 'Review', component: SalonReviewStep },
];

export const SalonListingWizard = ({ onComplete }: SalonListingWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<SalonFormValues>(initialFormData);
  const [photos, setPhotos] = useState<File[]>([]);
  const [pricing, setPricing] = useState<SalonPricingOptions>('basic');

  const updateFormData = (data: Partial<SalonFormValues>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const updatePhotos = (newPhotos: File[]) => {
    setPhotos(newPhotos);
  };

  const updatePricing = (newPricing: SalonPricingOptions) => {
    setPricing(newPricing);
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    onComplete(formData, photos, pricing);
  };

  const CurrentStepComponent = STEPS[currentStep].component;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === STEPS.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">List Your Salon for Sale</h1>
          <p className="text-gray-600">Connect with serious buyers looking for salon businesses</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {STEPS.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center ${index !== STEPS.length - 1 ? 'flex-1' : ''}`}
              >
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    index < currentStep
                      ? 'bg-purple-600 border-purple-600 text-white'
                      : index === currentStep
                      ? 'border-purple-600 bg-white text-purple-600'
                      : 'border-gray-300 bg-white text-gray-400'
                  }`}
                >
                  {index < currentStep ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                {index !== STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      index < currentStep ? 'bg-purple-600' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            {STEPS.map((step, index) => (
              <span
                key={step.id}
                className={`${
                  index === currentStep ? 'text-purple-600 font-medium' : ''
                }`}
              >
                {step.title}
              </span>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <CurrentStepComponent
              formData={formData}
              photos={photos}
              pricing={pricing}
              updateFormData={updateFormData}
              updatePhotos={updatePhotos}
              updatePricing={updatePricing}
              setPricing={updatePricing}
              onNext={nextStep}
              onPrev={prevStep}
              onComplete={handleComplete}
              isFirstStep={isFirstStep}
              isLastStep={isLastStep}
            />
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={isFirstStep}
            className="flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          {isLastStep ? (
            <Button
              onClick={handleComplete}
              className="bg-purple-600 hover:bg-purple-700 flex items-center"
            >
              Complete Listing
              <Check className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={nextStep}
              className="bg-purple-600 hover:bg-purple-700 flex items-center"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
