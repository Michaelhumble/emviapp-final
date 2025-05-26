
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { salonFormSchema, SalonFormValues } from "./salonFormSchema";
import { SalonIdentitySection } from "./SalonIdentitySection";
import { SalonLocationSection } from "./SalonLocationSection";
import { SalonDescriptionSection } from "./SalonDescriptionSection";
import { SalonPhotosSection } from "./SalonPhotosSection";
import { SalonPricingSection } from "./SalonPricingSection";
import { calculateSalonPostPrice, getSalonPostPricingSummary, SalonPricingOptions } from "@/utils/posting/salonPricing";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const steps = [
  { id: 1, title: "Identity", description: "Basic salon information" },
  { id: 2, title: "Location", description: "Where is your salon?" },
  { id: 3, title: "Description", description: "Tell us about your salon" },
  { id: 4, title: "Photos", description: "Show your salon" },
  { id: 5, title: "Review & Payment", description: "Complete your listing" },
];

export const SalonListingWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [pricingOptions, setPricingOptions] = useState<SalonPricingOptions>({
    selectedPricingTier: 'standard',
    durationMonths: 1,
    autoRenew: false,
    isFirstPost: true,
    featuredBoost: false,
  });
  
  const navigate = useNavigate();

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
      revenue: "",
      squareFeet: "",
      numberOfStaff: "",
      virtualTourUrl: "",
      englishDescription: "",
      vietnameseDescription: "",
      reasonForSelling: "",
      willTrain: false,
      hasHousing: false,
      hasWaxRoom: false,
      hasDiningRoom: false,
      hasLaundry: false,
      isNationwide: false,
      fastSalePackage: false,
      termsAccepted: false,
    },
  });

  const handleNext = async () => {
    let isValid = true;
    
    // Validate current step
    switch (currentStep) {
      case 1:
        isValid = await form.trigger(['salonName', 'businessType']);
        break;
      case 2:
        isValid = await form.trigger(['city', 'state']);
        break;
      case 3:
        isValid = await form.trigger(['askingPrice']);
        break;
      case 4:
        // Photos are optional, so always valid
        break;
      case 5:
        isValid = await form.trigger(['termsAccepted']);
        break;
    }

    if (isValid && currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else if (isValid && currentStep === 5) {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    const formData = form.getValues();
    
    try {
      // Here you would typically save to database and process payment
      console.log("Form data:", formData);
      console.log("Photos:", photoUploads);
      console.log("Pricing:", pricingOptions);
      
      toast.success("Salon listing created successfully!");
      navigate("/salon-listing-success");
    } catch (error) {
      toast.error("Failed to create listing. Please try again.");
    }
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container max-w-4xl mx-auto py-8 px-4">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-playfair font-bold text-gray-900">
              List Your Salon for Sale
            </h1>
            <span className="text-sm text-gray-500">
              Step {currentStep} of {steps.length}
            </span>
          </div>
          
          <Progress value={progress} className="mb-4" />
          
          <div className="flex justify-between text-sm">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex flex-col items-center ${
                  currentStep >= step.id ? "text-purple-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium mb-1 ${
                    currentStep >= step.id
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step.id}
                </div>
                <span className="text-xs font-medium">{step.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <Form {...form}>
          <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
            {currentStep === 1 && <SalonIdentitySection form={form} />}
            {currentStep === 2 && <SalonLocationSection form={form} />}
            {currentStep === 3 && <SalonDescriptionSection form={form} />}
            {currentStep === 4 && (
              <SalonPhotosSection
                photoUploads={photoUploads}
                setPhotoUploads={setPhotoUploads}
                maxPhotos={10}
              />
            )}
            {currentStep === 5 && (
              <SalonPricingSection
                formData={form.getValues()}
                photoUploads={photoUploads}
                pricingOptions={pricingOptions}
                setPricingOptions={setPricingOptions}
                onSubmit={handleSubmit}
              />
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            
            <Button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {currentStep === 5 ? "Complete Listing" : "Continue"}
              {currentStep !== 5 && <ArrowRight className="w-4 h-4" />}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SalonListingWizard;
