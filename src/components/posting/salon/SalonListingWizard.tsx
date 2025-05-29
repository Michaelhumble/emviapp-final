
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

import { salonFormSchema, type SalonFormValues } from './salonFormSchema';
import { SalonIdentitySection } from './SalonIdentitySection';
import { SalonLocationSection } from './SalonLocationSection';
import SalonBusinessStep from './steps/SalonBusinessStep';
import { SalonPostDescription } from './SalonPostDescription';
import { SalonContactSection } from './SalonContactSection';
import SalonPhotosStep from './steps/SalonPhotosStep';
import SalonPreviewStep from './steps/SalonPreviewStep';

const steps = [
  { title: 'Salon Identity', component: 'identity' },
  { title: 'Location', component: 'location' },
  { title: 'Business Details', component: 'business' },
  { title: 'Description', component: 'description' },
  { title: 'Contact Info', component: 'contact' },
  { title: 'Photos', component: 'photos' },
  { title: 'Preview', component: 'preview' },
];

const SalonListingWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);

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
      termsAccepted: false
    }
  });

  const nextStep = async () => {
    const currentStepName = steps[currentStep].component;
    let fieldsToValidate: (keyof SalonFormValues)[] = [];

    // Define required fields for each step
    switch (currentStepName) {
      case 'identity':
        fieldsToValidate = ['salonName', 'businessType'];
        break;
      case 'location':
        fieldsToValidate = ['address', 'city', 'state', 'zipCode'];
        break;
      case 'business':
        fieldsToValidate = ['askingPrice', 'monthlyRent'];
        break;
      case 'contact':
        fieldsToValidate = ['contactName', 'contactEmail', 'contactPhone'];
        break;
      default:
        break;
    }

    // Validate current step fields
    if (fieldsToValidate.length > 0) {
      const isValid = await form.trigger(fieldsToValidate);
      if (!isValid) {
        toast.error('Please fill in all required fields before proceeding.');
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

  const onSubmit = async (data: SalonFormValues) => {
    setIsSubmitting(true);
    try {
      console.log('Form submitted:', data);
      console.log('Photos:', photoUploads);
      toast.success('Salon listing submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit listing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (steps[currentStep].component) {
      case 'identity':
        return <SalonIdentitySection form={form} />;
      case 'location':
        return <SalonLocationSection form={form} />;
      case 'business':
        return <SalonBusinessStep form={form} />;
      case 'description':
        return <SalonPostDescription form={form} />;
      case 'contact':
        return <SalonContactSection form={form} />;
      case 'photos':
        return (
          <SalonPhotosStep 
            form={form} 
            photoUploads={photoUploads}
            setPhotoUploads={setPhotoUploads}
          />
        );
      case 'preview':
        return <SalonPreviewStep form={form} photoUploads={photoUploads} />;
      default:
        return null;
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold text-center">
              List Your Salon for Sale
            </CardTitle>
            <CardDescription className="text-purple-100 text-center">
              Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
            </CardDescription>
            <div className="mt-4">
              <Progress value={progress} className="h-2 bg-purple-200" />
            </div>
          </CardHeader>

          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {renderStep()}

                <div className="flex justify-between pt-6 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>

                  {currentStep === steps.length - 1 ? (
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Listing'}
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
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
