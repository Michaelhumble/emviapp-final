import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { salonFormSchema, type SalonFormValues } from './salonFormSchema';
import SalonIdentityStep from './steps/SalonIdentityStep';
import SalonLocationStep from './steps/SalonLocationStep';
import SalonBusinessStep from './steps/SalonBusinessStep';
import SalonDescriptionStep from './steps/SalonDescriptionStep';
import SalonContactStep from './steps/SalonContactStep';
import SalonPhotosStep from './steps/SalonPhotosStep';
import SalonFeaturesStep from './steps/SalonFeaturesStep';
import SalonPaymentOptions from "./SalonPaymentOptions";
import SalonPreviewStep from "./steps/SalonPreviewStep";

const steps = [
  { id: 'identity', title: 'Basic Information', component: SalonIdentityStep },
  { id: 'location', title: 'Location Details', component: SalonLocationStep },
  { id: 'business', title: 'Business Details', component: SalonBusinessStep },
  { id: 'description', title: 'Description', component: SalonDescriptionStep },
  { id: 'contact', title: 'Contact Information', component: SalonContactStep },
  { id: 'photos', title: 'Photos', component: SalonPhotosStep },
  { id: 'features', title: 'Features & Amenities', component: SalonFeaturesStep },
  { id: 'pricing', title: 'Choose Your Plan', component: SalonPaymentOptions },
  { id: 'preview', title: 'Review & Submit', component: SalonPreviewStep }
];

const SalonListingWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      numberOfStaff: '',
      numberOfTables: '',
      numberOfChairs: '',
      squareFeet: '',
      revenue: '',
      monthlyRevenue: '',
      yearlyRevenue: '',
      grossRevenue: '',
      netProfit: '',
      vietnameseDescription: '',
      englishDescription: '',
      reasonForSelling: '',
      virtualTourUrl: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
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
      selectedPricingTier: 'basic',
      featuredAddon: false,
      termsAccepted: false
    }
  });

  const progress = ((currentStep + 1) / steps.length) * 100;
  const CurrentStepComponent = steps[currentStep].component;

  const validateCurrentStep = async () => {
    const stepValidations = {
      0: ['salonName', 'businessType'],
      1: ['address', 'city', 'state', 'zipCode'],
      2: ['askingPrice'],
      3: [],
      4: ['contactName', 'contactEmail', 'contactPhone'],
      5: [],
      6: [],
      7: ['selectedPricingTier'],
      8: ['termsAccepted']
    };

    const fieldsToValidate = stepValidations[currentStep as keyof typeof stepValidations] || [];
    
    if (fieldsToValidate.length > 0) {
      const result = await form.trigger(fieldsToValidate as any);
      return result;
    }
    
    return true;
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: SalonFormValues) => {
    setIsSubmitting(true);
    try {
      console.log('Form submitted:', data);
      toast.success('Salon listing submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit listing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            List Your Salon for Sale
          </h1>
          <p className="text-gray-600 text-lg">
            Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress 
            value={progress} 
            className="h-3 bg-white/50 border border-purple-100" 
          />
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>Start</span>
            <span>{Math.round(progress)}% Complete</span>
            <span>Finish</span>
          </div>
        </div>

        {/* Form Card */}
        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-2xl shadow-purple-500/10">
          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <CurrentStepComponent form={form} />
                
                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6 border-t border-gray-100">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={isFirstStep}
                    className="px-6 py-3 border-purple-200 text-purple-600 hover:bg-purple-50"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                  
                  {isLastStep ? (
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Listing'}
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg"
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalonListingWizard;
