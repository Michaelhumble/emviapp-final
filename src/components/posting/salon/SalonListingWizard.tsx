
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { SalonIdentitySection } from './SalonIdentitySection';
import { SalonLocationSection } from './SalonLocationSection';
import { SalonPhotosSection } from './SalonPhotosSection';
import SalonPricingSection from './SalonPricingSection';
import SalonPlanSelectionSection from './SalonPlanSelectionSection';
import { salonFormSchema, SalonFormValues } from './salonFormSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { SalonPricingOptions } from '@/utils/posting/salonPricing';

const SalonListingWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [isNationwide, setIsNationwide] = useState(false);
  const [fastSalePackage, setFastSalePackage] = useState(false);
  const [pricingOptions, setPricingOptions] = useState<SalonPricingOptions>({
    selectedPricingTier: 'standard',
    durationMonths: 1,
    autoRenew: false,
    isNationwide: false,
    isFirstPost: true,
    showAtTop: false,
    fastSalePackage: false,
    jobPostBundle: false,
    bundleWithJobPost: false,
    isRenewal: false,
    hasReferrals: false,
    featuredBoost: false
  });

  const totalSteps = 6; // Updated to include the new pricing plan step

  const form = useForm<SalonFormValues>({
    resolver: zodResolver(salonFormSchema),
    defaultValues: {
      salonName: "",
      city: "",
      state: "",
      askingPrice: "",
      monthlyRent: "",
      numberOfStaff: "",
      squareFeet: "",
      revenue: "",
      reasonForSelling: "",
      vietnameseDescription: "",
      englishDescription: "",
      willTrain: false,
      isNationwide: false,
      fastSalePackage: false,
      hasHousing: false,
      hasWaxRoom: false,
      hasDiningRoom: false,
      hasLaundry: false,
      termsAccepted: false,
    },
  });

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submitForm = (data: SalonFormValues) => {
    console.log("Form Data Submitted:", data);
    console.log("Photo Uploads:", photoUploads);
    console.log("Pricing Options:", pricingOptions);
    // Handle form submission logic here (e.g., API call)
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Salon Details";
      case 2:
        return "Location Information";
      case 3:
        return "Upload Photos";
      case 4:
        return "Choose Your Plan";
      case 5:
        return "Payment & Features";
      case 6:
        return "Terms & Confirmation";
      default:
        return "Salon Listing";
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <SalonIdentitySection form={form} />;
      case 2:
        return <SalonLocationSection form={form} />;
      case 3:
        return <SalonPhotosSection photoUploads={photoUploads} setPhotoUploads={setPhotoUploads} />;
      case 4:
        return (
          <SalonPlanSelectionSection
            options={pricingOptions}
            onOptionsChange={setPricingOptions}
          />
        );
      case 5:
        return (
          <SalonPricingSection
            options={pricingOptions}
            onOptionsChange={setPricingOptions}
            isNationwide={isNationwide}
            fastSalePackage={fastSalePackage}
          />
        );
      case 6:
        return (
          <div>
            <h2>Terms and Conditions</h2>
            <p>Please read and accept the terms and conditions before submitting your listing.</p>
            {/* Terms and conditions display here */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(submitForm)} className="space-y-4">
                {/* Terms acceptance field */}
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        );
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <div className="container max-w-4xl mx-auto py-12">
      <Helmet>
        <title>List Your Salon | EmviApp</title>
        <meta name="description" content="List your salon for sale on EmviApp." />
      </Helmet>

      <Card className="shadow-lg rounded-lg">
        <CardContent className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-800">List Your Salon For Sale</h1>
            <p className="text-gray-500">Provide details about your salon to create an attractive listing.</p>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">{getStepTitle()}</span>
              <span className="text-sm text-gray-500">Step {currentStep} of {totalSteps}</span>
            </div>
            <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
          </div>

          {renderStepContent()}

          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button onClick={nextStep} disabled={currentStep === totalSteps}>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonListingWizard;
