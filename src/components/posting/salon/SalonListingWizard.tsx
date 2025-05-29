
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { salonFormSchema, type SalonFormValues } from './salonFormSchema';
import { SalonIdentitySection } from './SalonIdentitySection';
import { SalonLocationSection } from './SalonLocationSection';
import { SalonPostDescription } from './SalonPostDescription';
import { SalonPhotosSection } from './SalonPhotosSection';
import SalonPaymentStep from './steps/SalonPaymentStep';
import SalonPreviewStep from './steps/SalonPreviewStep';

const steps = [
  { id: 'identity', title: 'Salon Identity', component: 'identity' },
  { id: 'location', title: 'Location', component: 'location' },
  { id: 'description', title: 'Description', component: 'description' },
  { id: 'photos', title: 'Photos', component: 'photos' },
  { id: 'preview', title: 'Preview', component: 'preview' },
  { id: 'payment', title: 'Payment', component: 'payment' }
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

  const progress = ((currentStep + 1) / steps.length) * 100;

  const renderStepContent = () => {
    const step = steps[currentStep];
    
    switch (step.component) {
      case 'identity':
        return <SalonIdentitySection form={form} />;
      case 'location':
        return <SalonLocationSection form={form} />;
      case 'description':
        return <SalonPostDescription form={form} />;
      case 'photos':
        return (
          <SalonPhotosSection 
            photoUploads={photoUploads}
            setPhotoUploads={setPhotoUploads}
            maxPhotos={7}
          />
        );
      case 'preview':
        return <SalonPreviewStep form={form} photoUploads={photoUploads} />;
      case 'payment':
        return (
          <SalonPaymentStep 
            form={form}
            onPaymentComplete={() => {
              toast.success('Salon listing published successfully!');
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Card className="shadow-xl">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-serif">List Your Salon for Sale</CardTitle>
              <CardDescription className="text-lg">
                Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 mb-2">Progress</div>
              <div className="w-32">
                <Progress value={progress} className="h-2" />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          <Form {...form}>
            <div className="min-h-[400px]">
              {renderStepContent()}
            </div>

            <div className="flex justify-between items-center mt-8 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>

              {currentStep < steps.length - 1 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : null}
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonListingWizard;
