
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { salonFormSchema, type SalonFormValues } from './salonFormSchema';
import { SalonIdentitySection } from './SalonIdentitySection';
import { SalonLocationSection } from './SalonLocationSection';
import { SalonBusinessStep } from './steps/SalonBusinessStep';
import { SalonPostDescription } from './SalonPostDescription';
import { SalonContactSection } from './SalonContactSection';
import { SalonPhotosSection } from './SalonPhotosSection';
import SalonPaymentStep from './steps/SalonPaymentStep';
import SalonPreviewStep from './steps/SalonPreviewStep';

const steps = [
  { id: 'identity', title: 'Salon Identity', component: 'identity' },
  { id: 'location', title: 'Location', component: 'location' },
  { id: 'business', title: 'Business Details', component: 'business' },
  { id: 'description', title: 'Description', component: 'description' },
  { id: 'contact', title: 'Contact Info', component: 'contact' },
  { id: 'photos', title: 'Photos', component: 'photos' },
  { id: 'preview', title: 'Preview', component: 'preview' },
  { id: 'payment', title: 'Payment', component: 'payment' }
];

const SalonListingWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
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
      revenue: '',
      yearlyRevenue: '',
      grossRevenue: '',
      netProfit: '',
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

  const renderStepContent = () => {
    const step = steps[currentStep];
    
    switch (step.component) {
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
          <SalonPhotosSection 
            photoUploads={photoUploads}
            setPhotoUploads={setPhotoUploads}
            maxPhotos={8}
          />
        );
      case 'preview':
        return <SalonPreviewStep form={form} photoUploads={photoUploads} />;
      case 'payment':
        return <SalonPaymentStep form={form} />;
      default:
        return null;
    }
  };

  const handlePaymentComplete = () => {
    toast.success('Salon listing published successfully!');
    // Navigate to success page or salon listing
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${index <= currentStep 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                  }
                `}>
                  {index < currentStep ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`
                    h-1 w-16 mx-2
                    ${index < currentStep ? 'bg-purple-600' : 'bg-gray-200'}
                  `} />
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-gray-600">
            Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
          </p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold text-center">
              Sell Your Salon
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <Form {...form}>
              <form className="space-y-6">
                {renderStepContent()}
                
                {/* Navigation Buttons */}
                <div className="flex justify-between pt-8 border-t">
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
                  
                  {currentStep < steps.length - 1 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      Next
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  ) : null}
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
