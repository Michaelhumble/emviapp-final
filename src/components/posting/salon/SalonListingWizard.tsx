
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/auth";
import { salonFormSchema, SalonFormValues } from "./salonFormSchema";
import { SalonPricingOptions } from "@/utils/posting/salonPricing";
import { SalonIdentityStep } from "./steps/SalonIdentityStep";
import { SalonLocationStep } from "./steps/SalonLocationStep";
import { SalonDetailsStep } from "./steps/SalonDetailsStep";
import { SalonPricingStep } from "./steps/SalonPricingStep";
import { SalonReviewStep } from "./steps/SalonReviewStep";
import PostWizardLayout from "../PostWizardLayout";

const STEPS = [
  { id: 1, title: "Salon Information / Thông Tin Salon", component: "identity" },
  { id: 2, title: "Location / Địa Chỉ", component: "location" },
  { id: 3, title: "Details & Photos / Chi Tiết & Hình Ảnh", component: "details" },
  { id: 4, title: "Pricing Plan / Chọn Gói", component: "pricing" },
  { id: 5, title: "Review & Payment / Xem Lại & Thanh Toán", component: "review" }
];

const SalonListingWizard = () => {
  const { user } = useAuth();
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
      beautyIndustry: "Nails",
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

  // Check auth status
  React.useEffect(() => {
    if (!user) {
      toast.error("Please sign in to post a salon listing", {
        description: "You'll be redirected to the sign-in page"
      });
    }
  }, [user]);

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
    toast.success("Payment completed! Your salon listing is now live.", {
      description: "Redirecting to success page..."
    });
    // Redirect to success page after payment
    setTimeout(() => {
      window.location.href = "/salon-listing-success";
    }, 1500);
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
        return formData.salonName && formData.businessType && formData.beautyIndustry;
      case 2:
        return formData.address && formData.city && formData.state;
      case 3:
        return formData.askingPrice && 
               formData.monthlyRent && 
               photoUploads.length > 0;
      case 4:
        return selectedOptions.selectedPricingTier && selectedOptions.durationMonths;
      case 5:
        return formData.termsAccepted && user;
      default:
        return true;
    }
  };

  const getStepError = () => {
    if (!user && currentStep === 5) {
      return "Please sign in to complete your listing";
    }
    
    const formData = form.getValues();
    switch (currentStep) {
      case 1:
        if (!formData.salonName) return "Salon name is required";
        if (!formData.businessType) return "Business type is required";
        break;
      case 2:
        if (!formData.address) return "Address is required";
        if (!formData.city) return "City is required";
        if (!formData.state) return "State is required";
        break;
      case 3:
        if (!formData.askingPrice) return "Asking price is required";
        if (!formData.monthlyRent) return "Monthly rent is required";
        if (photoUploads.length === 0) return "At least one photo is required";
        break;
      case 4:
        if (!selectedOptions.selectedPricingTier) return "Please select a pricing plan";
        break;
      case 5:
        if (!formData.termsAccepted) return "Please accept the terms and conditions";
        break;
    }
    return null;
  };

  return (
    <PostWizardLayout currentStep={currentStep} totalSteps={STEPS.length}>
      <div className="max-w-4xl mx-auto">
        <Form {...form}>
          <div className="bg-white rounded-lg shadow-sm border p-6 md:p-8">
            {renderStep()}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back / Quay lại
            </Button>

            <div className="flex flex-col items-end">
              {currentStep < STEPS.length ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
                >
                  Next / Tiếp tục
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handlePayment}
                  disabled={!canProceed()}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Complete Payment / Hoàn tất thanh toán
                </Button>
              )}
              
              {getStepError() && (
                <p className="text-sm text-red-600 mt-2">
                  {getStepError()}
                </p>
              )}
            </div>
          </div>
        </Form>
      </div>
    </PostWizardLayout>
  );
};

export default SalonListingWizard;
