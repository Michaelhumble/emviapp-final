
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { SalonIdentitySection } from "@/components/posting/salon/SalonIdentitySection";
import { SalonLocationSection } from "@/components/posting/salon/SalonLocationSection";
import { SalonDescriptionSection } from "@/components/posting/salon/SalonDescriptionSection";
import { SalonPhotosSection } from "@/components/posting/salon/SalonPhotosSection";
import { SalonReviewSection } from "@/components/posting/salon/SalonReviewSection";
import { salonFormSchema, SalonFormValues } from "@/components/posting/salon/salonFormSchema";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const STEP_TITLES = [
  "Identity",
  "Location", 
  "Details",
  "Photos",
  "Review & Payment"
];

const SellSalonPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalSteps = 5;
  
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

  const { watch, trigger } = form;
  const watchedFields = watch();

  // Validation for each step
  const validateStep = async (step: number): Promise<boolean> => {
    switch (step) {
      case 1:
        return await trigger(["salonName", "businessType"]);
      case 2:
        return await trigger(["city", "state"]); // Basic location validation
      case 3:
        return true; // All fields optional for description step
      case 4:
        return true; // Photos are optional
      case 5:
        return await trigger(["termsAccepted"]);
      default:
        return true;
    }
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(watchedFields.salonName && watchedFields.businessType);
      case 2:
        return !!(watchedFields.city && watchedFields.state);
      case 3:
        return true; // Description step is optional
      case 4:
        return true; // Photos are optional
      case 5:
        return !!watchedFields.termsAccepted;
      default:
        return true;
    }
  };

  const handleNext = async () => {
    const valid = await validateStep(currentStep);
    if (valid && currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      navigate("/dashboard");
    }
  };

  const handleEditStep = (step: number) => {
    setCurrentStep(step);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Here you would normally submit to your backend
      const formData = form.getValues();
      console.log("Submitting salon listing:", formData);
      console.log("Photos:", photoUploads);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("Salon listing published successfully!");
      navigate("/salon-listing-success");
    } catch (error) {
      console.error("Error submitting salon listing:", error);
      toast.error("Failed to publish listing. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <SalonIdentitySection form={form} />;
      case 2:
        return <SalonLocationSection form={form} />;
      case 3:
        return <SalonDescriptionSection form={form} />;
      case 4:
        return (
          <SalonPhotosSection
            photoUploads={photoUploads}
            setPhotoUploads={setPhotoUploads}
            maxPhotos={10}
          />
        );
      case 5:
        return (
          <SalonReviewSection
            form={form}
            photoUploads={photoUploads}
            onEditStep={handleEditStep}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Sell Your Salon | EmviApp</title>
        <meta 
          name="description" 
          content="List your salon for sale on EmviApp and connect with qualified buyers."
        />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="container max-w-4xl mx-auto py-8 px-4">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <Button 
                variant="ghost" 
                onClick={handleBack}
                className="text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {currentStep === 1 ? "Back to Dashboard" : "Back"}
              </Button>
              <div className="text-sm font-medium text-gray-600">
                Step {currentStep} of {totalSteps}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>{STEP_TITLES[currentStep - 1]}</span>
                <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
              </div>
              <Progress 
                value={(currentStep / totalSteps) * 100} 
                className="h-2 bg-gray-200"
              />
            </div>
          </div>

          {/* Form Content */}
          <Form {...form}>
            <form className="space-y-8">
              <div className="bg-white p-8 rounded-lg border shadow-sm">
                {renderCurrentStep()}
              </div>
              
              {/* Navigation - Only show for steps 1-4 */}
              {currentStep < 5 && (
                <div className="flex justify-between pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleBack}
                    className="px-8"
                  >
                    {currentStep === 1 ? "Cancel" : "Back"}
                  </Button>
                  
                  <Button 
                    type="button"
                    onClick={handleNext}
                    disabled={!isStepValid(currentStep)}
                    className="px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    {currentStep === totalSteps - 1 ? "Review & Pay" : "Continue"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
            </form>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default SellSalonPage;
