
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

  const totalSteps = 6;

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
    // Validate that user has selected a pricing plan before proceeding to payment
    if (currentStep === 4) {
      // Check if a valid pricing plan is selected
      if (!pricingOptions.selectedPricingTier || !pricingOptions.durationMonths) {
        alert("Please select a pricing plan before proceeding to payment.");
        return;
      }
    }
    
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

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        // Check if basic salon details are filled
        return form.watch('salonName') && form.watch('city') && form.watch('state');
      case 2:
        // Check if location info is complete
        return form.watch('askingPrice');
      case 3:
        // Check if at least one photo is uploaded
        return photoUploads.length > 0;
      case 4:
        // Check if pricing plan is selected
        return pricingOptions.selectedPricingTier && pricingOptions.durationMonths;
      case 5:
        // Payment step - can proceed if terms are accepted
        return form.watch('termsAccepted');
      default:
        return true;
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
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Terms and Conditions</h2>
              <p className="text-gray-600 mb-6">Please read and accept the terms and conditions before submitting your listing.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg max-h-60 overflow-y-auto">
              <h3 className="font-semibold mb-3">EmviApp Salon Listing Terms</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>• Your salon listing will be active for the selected duration.</p>
                <p>• All information provided must be accurate and truthful.</p>
                <p>• EmviApp reserves the right to moderate and remove inappropriate content.</p>
                <p>• Refunds are available within the first 48 hours of posting.</p>
                <p>• Featured listings receive priority placement in search results.</p>
                <p>• You will receive email notifications about interested buyers.</p>
              </div>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(submitForm)} className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="termsAccepted"
                    {...form.register('termsAccepted')}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="termsAccepted" className="text-sm text-gray-700">
                    I agree to the terms and conditions
                  </label>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={!form.watch('termsAccepted')}
                >
                  Submit Salon Listing
                </Button>
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
            
            {/* Step indicators */}
            <div className="flex justify-between mt-4 text-xs text-gray-500">
              <span className={currentStep >= 1 ? 'text-purple-600 font-medium' : ''}>Details</span>
              <span className={currentStep >= 2 ? 'text-purple-600 font-medium' : ''}>Location</span>
              <span className={currentStep >= 3 ? 'text-purple-600 font-medium' : ''}>Photos</span>
              <span className={currentStep >= 4 ? 'text-purple-600 font-medium' : ''}>Plan</span>
              <span className={currentStep >= 5 ? 'text-purple-600 font-medium' : ''}>Payment</span>
              <span className={currentStep >= 6 ? 'text-purple-600 font-medium' : ''}>Confirm</span>
            </div>
          </div>

          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStepContent()}
          </motion.div>

          <div className="flex justify-between mt-8">
            <Button 
              variant="outline" 
              onClick={prevStep} 
              disabled={currentStep === 1}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            
            <Button 
              onClick={nextStep} 
              disabled={currentStep === totalSteps || !canProceedToNext()}
            >
              {currentStep === totalSteps ? 'Complete' : 'Next'}
              {currentStep < totalSteps && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
          
          {/* Validation message */}
          {!canProceedToNext() && currentStep === 4 && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-sm text-yellow-800">
                Please select a pricing plan to continue.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonListingWizard;
