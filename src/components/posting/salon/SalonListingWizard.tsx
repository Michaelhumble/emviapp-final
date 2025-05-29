import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { salonFormSchema, SalonFormValues } from "./salonFormSchema";
import { SalonIdentityStep } from "./steps/SalonIdentityStep";
import { SalonDetailsStep } from "./steps/SalonDetailsStep";
import { SalonLocationStep } from "./steps/SalonLocationStep";
import SalonPhotoUpload from "./SalonPostPhotoUpload";
import SalonPricingStep from "./steps/SalonPricingStep";
import PostWizardLayout from "@/components/posting/PostWizardLayout";

const SalonListingWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [pricingOptions, setPricingOptions] = useState({});

  const form = useForm<SalonFormValues>({
    resolver: zodResolver(salonFormSchema),
    defaultValues: {
      salonName: "",
      businessType: "",
      establishedYear: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      neighborhood: "",
      hideExactAddress: false,
      askingPrice: "",
      monthlyRent: "",
      numberOfStaff: "",
      numberOfTables: "",
      numberOfChairs: "",
      squareFeet: "",
      revenue: "",
      monthlyRevenue: "",
      yearlyRevenue: "",
      grossRevenue: "",
      netProfit: "",
      vietnameseDescription: "",
      englishDescription: "",
      reasonForSelling: "",
      virtualTourUrl: "",
      willTrain: false,
      hasHousing: false,
      hasWaxRoom: false,
      hasDiningRoom: false,
      hasLaundry: false,
      hasParking: false,
      equipmentIncluded: false,
      leaseTransferable: false,
      sellerFinancing: false,
      isNationwide: false,
      fastSalePackage: false,
      autoRenew: false,
      termsAccepted: false,
    },
  });

  const steps = [
    { id: 1, title: "Identity", component: SalonIdentityStep },
    { id: 2, title: "Details", component: SalonDetailsStep },
    { id: 3, title: "Location", component: SalonLocationStep },
    { id: 4, title: "Photos", component: SalonPhotoUpload },
    { id: 5, title: "Pricing", component: SalonPricingStep },
  ];

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

  const onSubmit = (data: SalonFormValues) => {
    console.log("Form submitted:", { data, photoUploads, pricingOptions });
  };

  const renderCurrentStep = () => {
    const CurrentStepComponent = steps[currentStep - 1].component;
    
    const stepProps: any = {};
    
    if (currentStep <= 3) {
      stepProps.form = form;
    }
    
    if (currentStep === 4) {
      stepProps.photoUploads = photoUploads;
      stepProps.setPhotoUploads = setPhotoUploads;
    }
    
    if (currentStep === 5) {
      stepProps.pricingOptions = pricingOptions;
      stepProps.setPricingOptions = setPricingOptions;
    }

    return <CurrentStepComponent {...stepProps} />;
  };

  const canProceed = () => {
    if (currentStep === 4) {
      return photoUploads.length > 0;
    }
    return true;
  };

  const pageVariants = {
    initial: { opacity: 0, x: 50 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -50 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4
  };

  return (
    <PostWizardLayout currentStep={currentStep} totalSteps={steps.length}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Premium Step Indicator */}
            <div className="mb-12">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  {steps.map((step, index) => (
                    <React.Fragment key={step.id}>
                      <div className="flex flex-col items-center">
                        <motion.div
                          className={`w-12 h-12 rounded-full border-4 flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                            currentStep === step.id
                              ? 'bg-gradient-to-br from-purple-500 to-purple-600 border-purple-300 text-white shadow-lg scale-110'
                              : currentStep > step.id
                              ? 'bg-gradient-to-br from-green-500 to-green-600 border-green-300 text-white shadow-md'
                              : 'bg-white border-gray-300 text-gray-500'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          {currentStep > step.id ? (
                            <CheckCircle className="w-6 h-6" />
                          ) : (
                            step.id
                          )}
                        </motion.div>
                        <span className={`mt-2 text-sm font-medium ${
                          currentStep === step.id ? 'text-purple-600' : 
                          currentStep > step.id ? 'text-green-600' : 'text-gray-500'
                        }`}>
                          {step.title}
                        </span>
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`flex-1 h-1 mx-4 rounded-full transition-all duration-500 ${
                          currentStep > step.id ? 'bg-gradient-to-r from-green-400 to-green-500' : 'bg-gray-200'
                        }`} />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Step Content with Animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
                className="min-h-[600px]"
              >
                {renderCurrentStep()}
              </motion.div>
            </AnimatePresence>

            {/* Premium Navigation */}
            <div className="max-w-4xl mx-auto pt-12">
              <div className="flex justify-between items-center bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="h-12 px-6 text-lg font-semibold rounded-xl border-2 hover:bg-gray-50 disabled:opacity-50 transition-all duration-200"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Previous
                </Button>

                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">Step {currentStep} of {steps.length}</div>
                  <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(currentStep / steps.length) * 100}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {currentStep < steps.length ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={!canProceed()}
                    className="h-12 px-6 text-lg font-semibold rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
                  >
                    Next
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="h-12 px-8 text-lg font-semibold rounded-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Complete Listing
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Form>
      </div>
    </PostWizardLayout>
  );
};

export default SalonListingWizard;
