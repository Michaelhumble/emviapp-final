
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { salonFormSchema, SalonFormValues } from "./salonFormSchema";
import { SalonPricingOptions } from "@/utils/posting/salonPricing";
import { SalonIdentityStep } from "./steps/SalonIdentityStep";
import { SalonLocationStep } from "./steps/SalonLocationStep";
import { SalonDetailsStep } from "./steps/SalonDetailsStep";
import { SalonPricingStep } from "./steps/SalonPricingStep";
import { SalonReviewStep } from "./steps/SalonReviewStep";
import PostWizardLayout from "../PostWizardLayout";

const STEPS = [
  { id: 1, title: "Thông Tin Salon / Identity", component: "identity" },
  { id: 2, title: "Địa Chỉ / Location", component: "location" },
  { id: 3, title: "Chi Tiết & Hình Ảnh / Details & Photos", component: "details" },
  { id: 4, title: "Chọn Gói / Pricing Plan", component: "pricing" },
  { id: 5, title: "Xem Lại & Thanh Toán / Review & Payment", component: "review" }
];

const SalonListingWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<SalonPricingOptions>({
    selectedPricingTier: 'basic',
    durationMonths: 1,
    autoRenew: false
  });

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
      monthlyRevenue: "",
      vietnameseDescription: "",
      englishDescription: "",
      reasonForSelling: "",
      hasParking: false,
      hasLaundry: false,
      hasWaxRoom: false,
      hasDiningRoom: false,
      willTrain: false,
      isNationwide: false,
      fastSalePackage: false,
      autoRenew: false,
      termsAccepted: false,
    },
  });

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePayment = () => {
    // Payment logic is now handled within SalonReviewStep
    console.log("Payment initiated from review step");
  };

  const renderStep = () => {
    const currentStepData = STEPS[currentStep - 1];
    const formData = form.getValues();

    switch (currentStepData.component) {
      case "identity":
        return <SalonIdentityStep form={form} />;
      case "location":
        return <SalonLocationStep form={form} />;
      case "details":
        return (
          <SalonDetailsStep 
            form={form} 
            photoUploads={photoUploads}
            setPhotoUploads={setPhotoUploads}
          />
        );
      case "pricing":
        return (
          <SalonPricingStep 
            selectedOptions={selectedOptions}
            onOptionsChange={setSelectedOptions}
            form={form}
          />
        );
      case "review":
        return (
          <SalonReviewStep 
            form={form}
            formData={formData}
            selectedOptions={selectedOptions}
            photoUploads={photoUploads}
            onPayment={handlePayment}
          />
        );
      default:
        return null;
    }
  };

  const canProceed = () => {
    const formData = form.getValues();
    switch (currentStep) {
      case 1:
        return formData.salonName && formData.businessType;
      case 2:
        return formData.address && formData.city && formData.state;
      case 3:
        return formData.askingPrice && 
               formData.monthlyRent && 
               photoUploads.length > 0;
      case 4:
        return selectedOptions.selectedPricingTier && selectedOptions.durationMonths;
      case 5:
        return formData.termsAccepted;
      default:
        return true;
    }
  };

  return (
    <PostWizardLayout currentStep={currentStep} totalSteps={STEPS.length}>
      <div className="max-w-4xl mx-auto">
        <Form {...form}>
          <div className="bg-white rounded-lg shadow-sm border p-6 md:p-8">
            {renderStep()}
          </div>

          {/* Navigation - Only show for steps 1-4, step 5 handles its own payment button */}
          {currentStep < STEPS.length && (
            <div className="flex justify-between mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Quay lại / Back
              </Button>

              <Button
                type="button"
                onClick={nextStep}
                disabled={!canProceed()}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
              >
                Tiếp tục / Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Back button for step 5 */}
          {currentStep === STEPS.length && (
            <div className="flex justify-start mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Quay lại / Back
              </Button>
            </div>
          )}
        </Form>
      </div>
    </PostWizardLayout>
  );
};

export default SalonListingWizard;
