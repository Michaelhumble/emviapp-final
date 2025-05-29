
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
  { id: 1, title: "Identity / Danh tính", subtitle: "Salon details / Chi tiết salon" },
  { id: 2, title: "Location / Vị trí", subtitle: "Where is your salon / Salon ở đâu" },
  { id: 3, title: "Details / Chi tiết", subtitle: "Business information / Thông tin kinh doanh" },
  { id: 4, title: "Photos / Ảnh", subtitle: "Show your salon / Hiển thị salon" },
  { id: 5, title: "Pricing / Giá cả", subtitle: "Choose your plan / Chọn gói" },
  { id: 6, title: "Review / Xem lại", subtitle: "Final check / Kiểm tra cuối" }
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

  const renderStep = () => {
    const currentStepData = STEPS[currentStep - 1];
    const formData = form.getValues();

    switch (currentStep) {
      case 1:
        return <SalonIdentityStep form={form} />;
      case 2:
        return <SalonLocationStep form={form} />;
      case 3:
        return <SalonDetailsStep form={form} photoUploads={photoUploads} setPhotoUploads={setPhotoUploads} />;
      case 4:
        return (
          <SalonDetailsStep 
            form={form} 
            photoUploads={photoUploads}
            setPhotoUploads={setPhotoUploads}
          />
        );
      case 5:
        return (
          <SalonPricingStep 
            selectedOptions={selectedOptions}
            onOptionsChange={setSelectedOptions}
            form={form}
          />
        );
      case 6:
        return (
          <SalonReviewStep 
            form={form}
            formData={formData}
            selectedOptions={selectedOptions}
            photoUploads={photoUploads}
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
        return formData.askingPrice && formData.monthlyRent;
      case 4:
        return photoUploads.length > 0;
      case 5:
        return selectedOptions.selectedPricingTier && selectedOptions.durationMonths;
      case 6:
        return formData.termsAccepted;
      default:
        return true;
    }
  };

  const getCompletionPercentage = () => {
    return Math.round((currentStep / STEPS.length) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with progress */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                className="mr-4" 
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              
              <div>
                <h1 className="text-xl font-medium">Sell Your Salon / Bán Salon Của Bạn</h1>
                <p className="text-sm text-gray-600">
                  Connect with serious buyers and get the best value / Kết nối với người mua nghiêm túc và nhận giá trị tốt nhất
                </p>
              </div>
            </div>
          </div>
          
          {/* Progress info */}
          <div className="pb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Step {currentStep} of {STEPS.length}</span>
              <span className="text-sm font-medium text-purple-600">{getCompletionPercentage()}% Complete / Hoàn thành</span>
            </div>
            
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getCompletionPercentage()}%` }}
              />
            </div>
          </div>

          {/* Step indicators */}
          <div className="flex items-center justify-between pb-4">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center text-center flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mb-2 ${
                  currentStep === step.id 
                    ? 'bg-purple-600 text-white' 
                    : currentStep > step.id 
                      ? 'bg-purple-100 text-purple-600 border-2 border-purple-600'
                      : 'bg-gray-200 text-gray-500'
                }`}>
                  {step.id}
                </div>
                <div className="text-xs">
                  <div className={`font-medium ${currentStep >= step.id ? 'text-purple-600' : 'text-gray-500'}`}>
                    {step.title}
                  </div>
                  <div className="text-gray-500 mt-1">
                    {step.subtitle}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container max-w-4xl mx-auto py-8 px-4">
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
              Previous / Trước
            </Button>

            {currentStep < STEPS.length && (
              <Button
                type="button"
                onClick={nextStep}
                disabled={!canProceed()}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
              >
                Next / Tiếp theo
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SalonListingWizard;
