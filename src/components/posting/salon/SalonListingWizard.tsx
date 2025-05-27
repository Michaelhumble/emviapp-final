
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SalonPostForm } from './SalonPostForm';
import { SalonFormValues } from './salonFormSchema';
import SalonPricingSelection from './SalonPricingSelection';
import SalonPaymentFeatures from './SalonPaymentFeatures';
import { SalonPricingOptions } from '@/utils/posting/salonPricing';

const TOTAL_STEPS = 6;

const SalonListingWizard = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<SalonFormValues | null>(null);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [pricingOptions, setPricingOptions] = useState<SalonPricingOptions>({
    selectedPricingTier: 'standard',
    durationMonths: 1,
    autoRenew: false,
    isNationwide: false,
    isFirstPost: false,
    showAtTop: false,
    fastSalePackage: false,
    jobPostBundle: false,
    bundleWithJobPost: false,
    isRenewal: false,
    hasReferrals: false,
    featuredBoost: false
  });

  const stepTitles = [
    'Basic Information',
    'Description & Details', 
    'Photos',
    'Choose Your Plan', // This is the pricing selection step
    'Payment & Features',
    'Success'
  ];

  const progress = (currentStep / TOTAL_STEPS) * 100;

  const handleFormSubmit = (values: SalonFormValues) => {
    setFormData(values);
    setCurrentStep(4); // Go to pricing selection step
  };

  const handlePricingSelect = (options: SalonPricingOptions) => {
    setPricingOptions(options);
    setCurrentStep(5); // Go to payment step
  };

  const handlePayment = async () => {
    // Handle payment processing here
    console.log('Processing payment with:', { formData, photoUploads, pricingOptions });
    // After successful payment, redirect to success page
    navigate('/salon-listing-success');
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/');
    }
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      <Helmet>
        <title>Sell Your Salon | EmviApp</title>
        <meta name="description" content="List your salon for sale on EmviApp. Reach thousands of qualified buyers." />
      </Helmet>

      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              onClick={handleBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="text-center">
              <h1 className="text-xl font-semibold">List Your Salon for Sale</h1>
              <p className="text-sm text-gray-600">
                Step {currentStep} of {TOTAL_STEPS}: {stepTitles[currentStep - 1]}
              </p>
            </div>
            <div className="w-16"></div> {/* Spacer for centering */}
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Step Content */}
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6 md:p-8"
          >
            {/* Steps 1-3: Combined Form */}
            {currentStep >= 1 && currentStep <= 3 && (
              <SalonPostForm
                onSubmit={handleFormSubmit}
                photoUploads={photoUploads}
                setPhotoUploads={setPhotoUploads}
                onNationwideChange={(checked) => 
                  setPricingOptions(prev => ({ ...prev, isNationwide: checked }))
                }
                onFastSaleChange={(checked) => 
                  setPricingOptions(prev => ({ ...prev, fastSalePackage: checked }))
                }
              />
            )}

            {/* Step 4: Pricing Selection */}
            {currentStep === 4 && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Plan</h2>
                  <p className="text-gray-600">Select the perfect listing plan for your salon</p>
                </div>
                
                <SalonPricingSelection
                  selectedOptions={pricingOptions}
                  onOptionsChange={setPricingOptions}
                />

                <div className="flex justify-between mt-8">
                  <Button variant="outline" onClick={handleBack}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Photos
                  </Button>
                  <Button 
                    onClick={() => handlePricingSelect(pricingOptions)}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Continue to Payment
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 5: Payment & Features */}
            {currentStep === 5 && formData && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment & Features</h2>
                  <p className="text-gray-600">Review your selection and complete payment</p>
                </div>

                <SalonPaymentFeatures
                  formData={formData}
                  selectedOptions={pricingOptions}
                  onPayment={handlePayment}
                  onBack={() => setCurrentStep(4)}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SalonListingWizard;
