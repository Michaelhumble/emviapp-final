
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { salonFormSchema, SalonFormValues } from "./salonFormSchema";
import { SalonBasicInfoStep } from "./steps/SalonBasicInfoStep";
import { SalonDetailsStep } from "./steps/SalonDetailsStep";
import { SalonPhotosStep } from "./steps/SalonPhotosStep";
import { SalonPreviewStep } from "./steps/SalonPreviewStep";
import { SalonPaymentStep } from "./steps/SalonPaymentStep";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SalonPricingOptions } from "@/utils/posting/salonPricing";
import { Form } from "@/components/ui/form";
import { useStripe } from "@/hooks/useStripe";

const STEPS = [
  { id: 1, title: "Basic Information", component: SalonBasicInfoStep },
  { id: 2, title: "Details", component: SalonDetailsStep },
  { id: 3, title: "Photos", component: SalonPhotosStep },
  { id: 4, title: "Review", component: SalonPreviewStep },
  { id: 5, title: "Payment", component: SalonPaymentStep },
];

export const SalonListingWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [pricingOptions, setPricingOptions] = useState<SalonPricingOptions>({
    selectedPricingTier: undefined,
    featuredAddon: false
  });

  const { initiatePayment, isLoading } = useStripe();

  const form = useForm<SalonFormValues>({
    resolver: zodResolver(salonFormSchema),
    defaultValues: {
      salonName: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      contactNotes: "",
      neighborhood: "",
      businessType: "",
      establishedYear: "",
      logo: "",
      askingPrice: "",
      monthlyRent: "",
      revenue: "",
      numberOfStaff: "",
      squareFeet: "",
      englishDescription: "",
      vietnameseDescription: "",
      reasonForSelling: "",
      virtualTourUrl: "",
      willTrain: false,
      hasHousing: false,
      hasParking: false,
      equipmentIncluded: false,
      leaseTransferable: false,
      sellerFinancing: false,
      hasWaxRoom: false,
      hasDiningRoom: false,
      hasLaundry: false,
    },
  });

  const progress = (currentStep / STEPS.length) * 100;
  const CurrentStepComponent = STEPS[currentStep - 1].component;

  const handleNext = async () => {
    const isValid = await form.trigger();
    if (isValid && currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    const formData = form.getValues();
    
    if (!pricingOptions.selectedPricingTier) {
      console.error("No pricing tier selected");
      return;
    }

    // Initiate Stripe payment
    const success = await initiatePayment(pricingOptions, formData);
    if (success) {
      console.log("Payment initiated successfully");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">List Your Salon for Sale</h1>
            <span className="text-sm text-gray-500">
              Step {currentStep} of {STEPS.length}
            </span>
          </div>
          <Progress value={progress} className="mb-2" />
          <p className="text-sm text-gray-600">{STEPS[currentStep - 1].title}</p>
        </div>

        {/* Step Content */}
        <Form {...form}>
          <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
            <CurrentStepComponent 
              form={form} 
              {...(currentStep === 5 && {
                pricingOptions,
                onPricingChange: setPricingOptions
              })}
            />
          </div>
        </Form>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>

          {currentStep < STEPS.length ? (
            <Button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading || !pricingOptions.selectedPricingTier}
              className="flex items-center gap-2"
            >
              {isLoading ? "Processing..." : "Submit Listing"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalonListingWizard;
