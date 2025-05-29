import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { SalonDetailsStep } from './steps/SalonDetailsStep';
import { LocationDetailsStep } from './steps/LocationDetailsStep';
import { FinancialDetailsStep } from './steps/FinancialDetailsStep';
import { FeaturesDetailsStep } from './steps/FeaturesDetailsStep';
import SalonPricingStep from './steps/SalonPricingStep';
import { SalonReviewStep } from './steps/SalonReviewStep';
import { SalonFormValues, salonFormSchema } from './salonFormSchema';
import { SalonPricingOptions } from '@/utils/posting/salonPricing';

interface SalonListingWizardProps {
  onComplete: (formData: SalonFormValues, photos: File[], pricing: SalonPricingOptions) => void;
}

const SalonListingWizard = ({ onComplete }: SalonListingWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<SalonFormValues>({
    salonName: '',
    businessType: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    askingPrice: '0',
    monthlyRent: '0',
    monthlyRevenue: '0',
    yearEstablished: '2020',
    numberOfChairs: '1',
    hasParking: false,
    hasWaitingArea: false,
    hasPrivateRooms: false,
    equipment: [],
    description: ''
  });
  const [photos, setPhotos] = useState<File[]>([]);
  const [pricing, setPricing] = useState<SalonPricingOptions>({
    selectedPricingTier: 'standard',
    durationMonths: 3,
    featuredAddOn: false,
    autoRenew: false
  });

  const steps = [
    { title: 'Salon Details', component: SalonDetailsStep },
    { title: 'Location', component: LocationDetailsStep },
    { title: 'Financial Details', component: FinancialDetailsStep },
    { title: 'Features & Equipment', component: FeaturesDetailsStep },
    { title: 'Pricing', component: SalonPricingStep },
    { title: 'Review & Submit', component: SalonReviewStep }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    onComplete(formData, photos, pricing);
  };

  const updateFormData = (data: Partial<SalonFormValues>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const updatePhotos = (newPhotos: File[]) => {
    setPhotos(newPhotos);
  };

  const updatePricing = (newPricing: SalonPricingOptions) => {
    setPricing(newPricing);
  };

  const StepComponent = steps[currentStep].component;
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">List Your Salon for Sale</h1>
          <p className="text-gray-600">Connect with qualified buyers looking for salon businesses</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep + 1} of {steps.length}
            </span>
            <Badge variant="outline" className="text-purple-600 border-purple-200">
              {steps[currentStep].title}
            </Badge>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Content */}
        <Card className="shadow-lg border-0">
          <CardContent className="p-8">
            <StepComponent
              formData={formData}
              photos={photos}
              pricing={pricing}
              updateFormData={updateFormData}
              updatePhotos={updatePhotos}
              updatePricing={updatePricing}
              onNext={handleNext}
              onPrev={handlePrev}
              onComplete={handleComplete}
              isFirstStep={currentStep === 0}
              isLastStep={currentStep === steps.length - 1}
            />
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <div className="flex gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index <= currentStep ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {currentStep < steps.length - 1 ? (
            <Button
              onClick={handleNext}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleComplete}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
            >
              Complete Listing
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalonListingWizard;
