import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SalonIdentitySection } from './SalonIdentitySection';
import SalonLocationStep from './steps/SalonLocationStep';
import { SalonPostDescription } from './SalonPostDescription';
import SalonPostPhotoUpload from './SalonPostPhotoUpload';
import SalonPricingStep from './steps/SalonPricingStep';
import { salonFormSchema, type SalonFormValues } from './salonFormSchema';

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

  const steps = [
    {
      title: "Salon Identity",
      description: "Tell us about your salon",
      component: <SalonIdentitySection form={form} />
    },
    {
      title: "Location Details", 
      description: "Where is your salon located?",
      component: <SalonLocationStep form={form} />
    },
    {
      title: "Description",
      description: "Describe your salon to attract buyers", 
      component: <SalonPostDescription form={form} />
    },
    {
      title: "Photos",
      description: "Upload photos of your salon",
      component: <SalonPostPhotoUpload form={form} />
    },
    {
      title: "Pricing & Payment",
      description: "Choose your listing package",
      component: <SalonPricingStep form={form} />
    }
  ];

  const nextStep = () => {
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
      console.log('Salon listing submitted:', data);
      toast.success('Salon listing submitted successfully!');
    } catch (error) {
      console.error('Error submitting salon listing:', error);
      toast.error('Failed to submit listing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>List Your Salon for Sale</CardTitle>
          <CardDescription>
            Step {currentStep + 1} of {steps.length}: {steps[currentStep].description}
          </CardDescription>
          <Progress value={progress} className="w-full" />
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {steps[currentStep].component}
              
              <div className="flex justify-between pt-6">
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
                    className="flex items-center gap-2"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Listing'}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center gap-2"
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
  );
};

export default SalonListingWizard;
