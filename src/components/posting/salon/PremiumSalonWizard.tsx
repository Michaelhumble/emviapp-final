
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import { enhancedSalonFormSchema, type EnhancedSalonFormValues } from "./enhancedSalonFormSchema";
import SalonIdentitySection from "./sections/SalonIdentitySection";
import SalonLocationSection from "./sections/SalonLocationSection";
import { SalonPhotosSection } from "./sections/SalonPhotosSection";
import SalonAboutSection from "./sections/SalonAboutSection";
import { SalonPerformanceSection } from "./sections/SalonPerformanceSection";
import { SalonPromotionSection } from "./sections/SalonPromotionSection";
import { SalonConfirmationSection } from "./sections/SalonConfirmationSection";

interface PremiumSalonWizardProps {
  onSubmit: (data: EnhancedSalonFormValues) => Promise<boolean>;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  onPromotionChange: (upgrades: any) => void;
}

const steps = [
  { id: 'identity', title: 'Salon Identity', description: 'Basic information' },
  { id: 'location', title: 'Location', description: 'Address & area details' },
  { id: 'photos', title: 'Photos & Video', description: 'Showcase your salon' },
  { id: 'about', title: 'About', description: 'Your salon\'s story' },
  { id: 'performance', title: 'Performance', description: 'Business metrics' },
  { id: 'promotion', title: 'Promotion', description: 'Boost visibility' },
  { id: 'confirmation', title: 'Confirmation', description: 'Review & submit' }
];

export const PremiumSalonWizard = ({ 
  onSubmit, 
  photoUploads, 
  setPhotoUploads, 
  onPromotionChange 
}: PremiumSalonWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<EnhancedSalonFormValues>({
    resolver: zodResolver(enhancedSalonFormSchema),
    defaultValues: {
      coverPhotoIndex: 0,
      hideAddress: false,
      showRevenue: true,
      showProfit: true,
      showClients: true,
      hidePrice: false,
      includedEquipment: [],
      teamStays: false,
      promotionUpgrades: {
        isUrgent: false,
        isFeatured: false,
        isDiamond: false
      },
      urgentSale: false,
      featuredListing: false,
      diamondListing: false,
      requireNDA: false,
      messagingOnly: true,
    },
  });

  const progress = ((currentStep + 1) / steps.length) * 100;

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (data: EnhancedSalonFormValues) => {
    setIsSubmitting(true);
    try {
      const success = await onSubmit(data);
      if (success) {
        setIsSubmitted(true);
        setCurrentStep(steps.length - 1); // Go to confirmation
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleComplete = () => {
    window.location.href = '/dashboard';
  };

  if (isSubmitted && currentStep === steps.length - 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <SalonConfirmationSection onComplete={handleComplete} />
        </div>
      </div>
    );
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <SalonIdentitySection form={form} />;
      case 1:
        return <SalonLocationSection form={form} />;
      case 2:
        return (
          <SalonPhotosSection 
            form={form} 
            photoUploads={photoUploads}
            setPhotoUploads={setPhotoUploads}
          />
        );
      case 3:
        return <SalonAboutSection form={form} />;
      case 4:
        return <SalonPerformanceSection form={form} />;
      case 5:
        return (
          <SalonPromotionSection 
            form={form}
            onPromotionChange={onPromotionChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                List Your Salon
              </h1>
              <p className="text-gray-600">Premium marketplace for salon sales</p>
            </div>
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              💎 Premium Experience
            </Badge>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Step {currentStep + 1} of {steps.length}</span>
              <span className="text-purple-600 font-medium">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Indicators */}
          <div className="flex items-center justify-between mt-4 overflow-x-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-2 min-w-0">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all ${
                  index < currentStep 
                    ? 'bg-green-500 text-white' 
                    : index === currentStep 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {index < currentStep ? <CheckCircle className="h-4 w-4" /> : index + 1}
                </div>
                <div className="hidden sm:block min-w-0">
                  <div className="text-sm font-medium truncate">{step.title}</div>
                  <div className="text-xs text-gray-500 truncate">{step.description}</div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`hidden sm:block w-8 h-0.5 ${
                    index < currentStep ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            {/* Step Content */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {steps[currentStep].title}
                </h2>
                <p className="text-gray-600">{steps[currentStep].description}</p>
              </div>
              
              {renderStepContent()}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="border-purple-300 text-purple-600 hover:bg-purple-50"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              <div className="text-center">
                <div className="text-sm text-gray-500">
                  Step {currentStep + 1} of {steps.length}
                </div>
              </div>

              {currentStep === steps.length - 2 ? (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  {isSubmitting ? 'Creating Listing...' : 'Create Listing'}
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PremiumSalonWizard;
