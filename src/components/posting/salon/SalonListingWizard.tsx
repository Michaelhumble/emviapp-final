import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Form } from '@/components/ui/form';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { salonFormSchema, SalonFormValues } from './salonFormSchema';
import { SalonPricingOptions, SalonPricingTier } from '@/utils/posting/salonPricing';
import { useStripe } from '@/hooks/useStripe';
import { toast } from 'sonner';

// Import step components
import { SalonIdentityStep } from './steps/SalonIdentityStep';
import { SalonBusinessStep } from './steps/SalonBusinessStep';
import { SalonDescriptionStep } from './steps/SalonDescriptionStep';
import { SalonContactStep } from './steps/SalonContactStep';
import { SalonPhotosStep } from './steps/SalonPhotosStep';
import { SalonFeaturesStep } from './steps/SalonFeaturesStep';
import { SalonPreviewStep } from './steps/SalonPreviewStep';
import SalonPricingPlans from './SalonPricingPlans';
import SalonPaymentOptions from './SalonPaymentOptions';

const steps = [
  { id: 'identity', label: 'Salon Identity', component: SalonIdentityStep },
  { id: 'business', label: 'Business Details', component: SalonBusinessStep },
  { id: 'description', label: 'Description', component: SalonDescriptionStep },
  { id: 'contact', label: 'Contact Info', component: SalonContactStep },
  { id: 'photos', label: 'Photos', component: SalonPhotosStep },
  { id: 'features', label: 'Features', component: SalonFeaturesStep },
  { id: 'preview', label: 'Preview', component: SalonPreviewStep },
  { id: 'pricing', label: 'Select Plan', component: null },
  { id: 'payment', label: 'Payment', component: null },
];

const SalonListingWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<SalonPricingOptions>({});
  const { initiatePayment, isLoading } = useStripe();

  const form = useForm<SalonFormValues>({
    resolver: zodResolver(salonFormSchema),
    defaultValues: {
      salonName: '',
      businessType: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      askingPrice: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      englishDescription: '',
      reasonForSelling: '',
      virtualTourUrl: '',
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
      termsAccepted: false,
    },
  });

  const nextStep = async () => {
    const stepId = steps[currentStep].id;
    
    // Validate current step
    let fieldsToValidate: (keyof SalonFormValues)[] = [];
    
    switch (stepId) {
      case 'identity':
        fieldsToValidate = ['salonName', 'businessType'];
        break;
      case 'business':
        fieldsToValidate = ['askingPrice'];
        break;
      case 'contact':
        fieldsToValidate = ['contactName', 'contactEmail', 'contactPhone'];
        break;
      // Add other validations as needed
    }
    
    if (fieldsToValidate.length > 0) {
      const isValid = await form.trigger(fieldsToValidate);
      if (!isValid) {
        return;
      }
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePlanSelect = (tier: SalonPricingTier) => {
    setSelectedOptions({ ...selectedOptions, selectedPricingTier: tier });
    nextStep();
  };

  const handlePayment = async () => {
    try {
      const formData = form.getValues();
      const success = await initiatePayment(selectedOptions, formData);
      
      if (success) {
        toast.success('Redirecting to payment...');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  const renderStepContent = () => {
    const step = steps[currentStep];
    
    if (step.id === 'pricing') {
      return (
        <SalonPricingPlans
          selectedOptions={selectedOptions}
          onPlanSelect={handlePlanSelect}
        />
      );
    }
    
    if (step.id === 'payment') {
      return (
        <SalonPaymentOptions
          form={form}
          selectedOptions={selectedOptions}
          onPayment={handlePayment}
          onBack={prevStep}
        />
      );
    }
    
    if (step.component) {
      const StepComponent = step.component;
      return <StepComponent form={form} />;
    }
    
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                List Your Salon
              </h1>
              <span className="text-sm text-gray-600">
                Step {currentStep + 1} of {steps.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between mt-2">
              {steps.map((step, index) => (
                <span
                  key={step.id}
                  className={`text-xs ${
                    index <= currentStep ? 'text-purple-600 font-medium' : 'text-gray-400'
                  }`}
                >
                  {step.label}
                </span>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <Card className="shadow-xl border-0">
            <CardContent className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(() => {})}>
                  {renderStepContent()}
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Navigation */}
          {steps[currentStep].id !== 'pricing' && steps[currentStep].id !== 'payment' && (
            <div className="flex justify-between mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>

              <Button
                type="button"
                onClick={nextStep}
                disabled={currentStep === steps.length - 1}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalonListingWizard;
