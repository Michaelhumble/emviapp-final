
import React from "react";
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
import { salonFormSchema, SalonFormValues } from "@/components/posting/salon/salonFormSchema";
import { useNavigate } from "react-router-dom";

const SellSalonPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = React.useState(1);
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
      hideAddressFromPublic: false,
      salonDescription: "",
      askingPrice: "",
      reasonForSelling: "",
      virtualTourUrl: "",
    },
  });

  const { watch, formState } = form;
  const watchedFields = watch();
  
  // Check if current step is valid
  const isStep1Valid = watchedFields.salonName && 
                      watchedFields.businessType && 
                      !formState.errors.salonName &&
                      !formState.errors.businessType;

  const isStep2Valid = watchedFields.address && 
                      watchedFields.city && 
                      watchedFields.state && 
                      watchedFields.zipCode &&
                      !formState.errors.address &&
                      !formState.errors.city &&
                      !formState.errors.state &&
                      !formState.errors.zipCode;

  const isStep3Valid = watchedFields.salonDescription && 
                      watchedFields.askingPrice &&
                      watchedFields.salonDescription.length >= 30 &&
                      watchedFields.salonDescription.length <= 1000 &&
                      !formState.errors.salonDescription &&
                      !formState.errors.askingPrice &&
                      !formState.errors.virtualTourUrl;

  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 1:
        return isStep1Valid;
      case 2:
        return isStep2Valid;
      case 3:
        return isStep3Valid;
      default:
        return false;
    }
  };

  const handleContinue = () => {
    if (isCurrentStepValid()) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      } else if (currentStep === 3) {
        console.log("Step 3 completed:", watchedFields);
        // TODO: Navigate to step 4 when implemented
      }
    }
  };

  const handleBack = () => {
    if (currentStep === 1) {
      navigate("/dashboard");
    } else {
      setCurrentStep(currentStep - 1);
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
      default:
        return <SalonIdentitySection form={form} />;
    }
  };

  const getStepName = () => {
    switch (currentStep) {
      case 1:
        return "Identity";
      case 2:
        return "Location";
      case 3:
        return "Description";
      default:
        return "Identity";
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
                <span>{getStepName()}</span>
                <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
              </div>
              <Progress 
                value={(currentStep / totalSteps) * 100} 
                className="h-2 bg-gray-200"
                indicatorClassName="bg-gradient-to-r from-purple-600 to-pink-600"
              />
            </div>
          </div>

          {/* Form Content */}
          <Form {...form}>
            <form className="space-y-8">
              {renderCurrentStep()}
              
              {/* Navigation */}
              <div className="flex justify-between pt-8">
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
                  onClick={handleContinue}
                  disabled={!isCurrentStepValid()}
                  className="px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default SellSalonPage;
