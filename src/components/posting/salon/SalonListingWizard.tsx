
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

// Import form schema and types
import { salonFormSchema, type SalonFormValues } from './salonFormSchema';
import { SalonPricingOptions } from '@/utils/posting/salonPricing';

// Import step components
import { SalonIdentityStep } from './steps/SalonIdentityStep';
import { SalonLocationStep } from './steps/SalonLocationStep';
import { SalonDetailsStep } from './steps/SalonDetailsStep';
import SalonPhotosSection from './SalonPhotosSection';
import { SalonPostDescription } from './SalonPostDescription';
import { SalonPricingStep } from './steps/SalonPricingStep';
import { SalonReviewStep } from './steps/SalonReviewStep';

// Import auth
import { useAuth } from '@/context/auth';

const steps = [
  { id: 1, title: 'Identity', component: 'identity' },
  { id: 2, title: 'Location', component: 'location' },
  { id: 3, title: 'Details', component: 'details' },
  { id: 4, title: 'Photos', component: 'photos' },
  { id: 5, title: 'Description', component: 'description' },
  { id: 6, title: 'Pricing', component: 'pricing' },
  { id: 7, title: 'Review', component: 'review' },
];

const SalonListingWizard = () => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<SalonPricingOptions>({
    selectedPricingTier: 'free',
    durationMonths: 1,
    autoRenew: false,
    isNationwide: false,
    fastSalePackage: false
  });

  const form = useForm<SalonFormValues>({
    resolver: zodResolver(salonFormSchema),
    defaultValues: {
      salonName: '',
      businessType: '',
      beautyIndustry: 'Nails',
      establishedYear: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      neighborhood: '',
      hideExactAddress: false,
      askingPrice: '',
      monthlyRent: '',
      monthlyProfit: '',
      employeeCount: '',
      numberOfStaff: '',
      numberOfTables: '',
      numberOfChairs: '',
      squareFeet: '',
      revenue: '',
      monthlyRevenue: '',
      yearlyRevenue: '',
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
      isNationwide: false,
      fastSalePackage: false,
      autoRenew: false,
      termsAccepted: false,
    },
  });

  const progress = (currentStep / steps.length) * 100;

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (data: SalonFormValues) => {
    if (!user) {
      toast.error('Please sign in to continue');
      return;
    }

    console.log('Salon form data:', data);
    console.log('Photo uploads:', photoUploads);
    console.log('Selected options:', selectedOptions);

    // Here you would typically:
    // 1. Upload photos to storage
    // 2. Create salon listing record
    // 3. Process payment if premium tier selected
    // 4. Redirect to success page

    toast.success('Salon listing created successfully!');
  };

  const renderCurrentStep = () => {
    const currentStepData = steps[currentStep - 1];
    
    switch (currentStepData.component) {
      case 'identity':
        return <SalonIdentityStep form={form} />;
      case 'location':
        return <SalonLocationStep form={form} />;
      case 'details':
        return <SalonDetailsStep form={form} />;
      case 'photos':
        return (
          <SalonPhotosSection
            photoUploads={photoUploads}
            setPhotoUploads={setPhotoUploads}
          />
        );
      case 'description':
        return <SalonPostDescription form={form} />;
      case 'pricing':
        return (
          <SalonPricingStep
            selectedOptions={selectedOptions}
            onOptionsChange={setSelectedOptions}
            form={form}
          />
        );
      case 'review':
        return (
          <SalonReviewStep
            form={form}
            photoUploads={photoUploads}
          />
        );
      default:
        return <div>Step not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-playfair font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Sell Your Salon
          </h1>
          <p className="text-lg text-gray-600">
            Reach thousands of qualified buyers looking for salon businesses
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep} of {steps.length}
            </span>
            <span className="text-sm font-medium text-gray-700">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          
          {/* Step indicators */}
          <div className="flex justify-between mt-4">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`text-xs text-center flex-1 ${
                  step.id === currentStep
                    ? 'text-purple-600 font-medium'
                    : step.id < currentStep
                    ? 'text-green-600'
                    : 'text-gray-400'
                }`}
              >
                {step.title}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-purple-500/10 to-pink-500/10">
            <CardTitle className="text-2xl font-playfair text-center">
              {steps[currentStep - 1]?.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                {renderCurrentStep()}
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          {currentStep < steps.length ? (
            <Button
              onClick={nextStep}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={form.handleSubmit(handleSubmit)}
              className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              Publish Listing
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalonListingWizard;
