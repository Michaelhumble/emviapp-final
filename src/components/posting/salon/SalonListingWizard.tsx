
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import { salonFormSchema, type SalonFormValues } from "./salonFormSchema";
import { SalonIdentityStep } from "./steps/SalonIdentityStep";
import { SalonLocationStep } from "./steps/SalonLocationStep";
import { SalonDetailsStep } from "./steps/SalonDetailsStep";
import { SalonReviewStep } from "./steps/SalonReviewStep";
import { SalonPhotosSection } from "./SalonPhotosSection";
import { SalonPricingStep } from "./steps/SalonPricingStep";
import { type SalonPricingOptions } from "@/utils/posting/salonPricing";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SalonListingWizardProps {
  onComplete: (data: SalonFormValues, photos: File[], pricing: SalonPricingOptions) => void;
}

const SalonListingWizard = ({ onComplete }: SalonListingWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [pricingOptions, setPricingOptions] = useState<SalonPricingOptions>({
    selectedPricingTier: 'standard',
    isNationwide: false,
    fastSalePackage: false,
    showAtTop: false,
    bundleWithJobPost: false,
    autoRenew: false,
    isFirstPost: false
  });

  const form = useForm<SalonFormValues>({
    resolver: zodResolver(salonFormSchema),
    mode: "onChange",
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
      monthlyProfit: "",
      employeeCount: "",
      numberOfStaff: "",
      numberOfTables: "",
      numberOfChairs: "",
      squareFeet: "",
      revenue: "",
      monthlyRevenue: "",
      yearlyRevenue: "",
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
      isNationwide: false,
      fastSalePackage: false,
      autoRenew: false,
      termsAccepted: false,
    },
  });

  const steps = [
    {
      title: "Identity / Danh tính",
      description: "Salon details / Chi tiết salon",
      component: <SalonIdentityStep form={form} />
    },
    {
      title: "Location / Vị trí", 
      description: "Where is your salon / Salon ở đâu",
      component: <SalonLocationStep form={form} />
    },
    {
      title: "Details / Chi tiết",
      description: "Business information / Thông tin kinh doanh", 
      component: <SalonDetailsStep form={form} />
    },
    {
      title: "Photos / Ảnh",
      description: "Show your salon / Hiển thị salon",
      component: <SalonPhotosSection photoUploads={photoUploads} setPhotoUploads={setPhotoUploads} />
    },
    {
      title: "Pricing / Giá cả",
      description: "Choose your plan / Chọn gói",
      component: <SalonPricingStep selectedOptions={pricingOptions} onOptionsChange={setPricingOptions} form={form} />
    },
    {
      title: "Review / Xem lại",
      description: "Final check / Kiểm tra cuối",
      component: <SalonReviewStep form={form} photoUploads={photoUploads} />
    }
  ];

  const validateCurrentStep = async () => {
    const values = form.getValues();
    
    switch (currentStep) {
      case 0: // Identity
        const identityFields = ['salonName', 'businessType'] as const;
        const identityValid = await form.trigger(identityFields);
        return identityValid;
        
      case 1: // Location  
        const locationFields = ['address', 'city', 'state'] as const;
        const locationValid = await form.trigger(locationFields);
        return locationValid;
        
      case 2: // Details
        const detailFields = ['askingPrice', 'monthlyRent'] as const;
        const detailValid = await form.trigger(detailFields);
        return detailValid;
        
      case 3: // Photos
        if (photoUploads.length === 0) {
          // Show error for missing photos
          return false;
        }
        return true;
        
      case 4: // Pricing
        return !!pricingOptions.selectedPricingTier;
        
      case 5: // Review
        return true;
        
      default:
        return true;
    }
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    
    if (!isValid) {
      // Show error message based on current step
      if (currentStep === 3 && photoUploads.length === 0) {
        // Could show a toast or inline error here
        console.log("At least one photo is required / Cần ít nhất một ảnh");
        return;
      }
      return;
    }

    if (currentStep === steps.length - 1) {
      // Final submission
      const formData = form.getValues();
      onComplete(formData, photoUploads, pricingOptions);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-playfair text-4xl font-bold text-gray-900 mb-2">
            Sell Your Salon / Bán Salon Của Bạn
          </h1>
          <p className="text-gray-600 text-lg">
            Connect with serious buyers and get the best value / Kết nối với người mua nghiêm túc và nhận giá trị tốt nhất
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm font-medium text-purple-600">
              {Math.round(progress)}% Complete / Hoàn thành
            </span>
          </div>
          <Progress value={progress} className="h-3 bg-gray-200" />
          
          {/* Step indicators */}
          <div className="flex justify-between mt-4">
            {steps.map((step, index) => (
              <div key={index} className={`text-center flex-1 ${index <= currentStep ? 'text-purple-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-sm font-bold ${
                  index <= currentStep ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {index + 1}
                </div>
                <div className="text-xs font-medium">{step.title}</div>
                <div className="text-xs text-gray-500">{step.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <Form {...form}>
          <form className="space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {steps[currentStep].component}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center gap-2 h-12 px-6"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous / Trước
              </Button>
              
              <Button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2 h-12 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {currentStep === steps.length - 1 ? (
                  "Complete Listing / Hoàn thành tin đăng"
                ) : (
                  <>
                    Next / Tiếp theo
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SalonListingWizard;
