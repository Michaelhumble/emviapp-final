
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import JobForm from "./JobForm";
import JobPricingStep from "./JobPricingStep";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { PricingProvider } from "@/context/pricing/PricingProvider";
import { usePostPayment } from "@/hooks/usePostPayment";
import { JobFormValues } from "./jobFormSchema";
import { PricingOptions } from "@/utils/posting/types";

// Animation variants for step transitions
const stepVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 }
};

const JobPostingWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [jobFormData, setJobFormData] = useState<JobFormValues | null>(null);
  const [selectedPricing, setSelectedPricing] = useState<PricingOptions | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { initiatePayment, isLoading } = usePostPayment();
  const navigate = useNavigate();

  // Handle job form submission
  const handleJobFormSubmit = (data: JobFormValues) => {
    setJobFormData(data);
    setCurrentStep(2); // Move to pricing step
    window.scrollTo(0, 0);
  };

  // Handle pricing selection
  const handlePricingSubmit = (pricingOptions: PricingOptions) => {
    setSelectedPricing(pricingOptions);
    setIsSubmitting(true);
    
    if (jobFormData) {
      // Process payment using usePostPayment hook
      initiatePayment('job', jobFormData, pricingOptions)
        .then((result) => {
          setIsSubmitting(false);
          if (result.success) {
            // Payment successful or initiated - redirect will happen in the hook
            // If it's a free post, we might need to handle redirect here
            if (pricingOptions.selectedPricingTier === 'free') {
              navigate('/post-success');
            }
          } else if (result.waitlisted) {
            // Handle diamond tier waitlist
            navigate('/post-waitlist');
          } else {
            // Payment failed
            console.error('Payment initiation failed');
          }
        })
        .catch((error) => {
          console.error('Payment error:', error);
          setIsSubmitting(false);
        });
    }
  };

  // Go back to previous step
  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold">Post a Job</h1>
          <div className="text-sm text-muted-foreground">
            Step {currentStep} of 2
          </div>
        </div>
        
        {/* Step indicator */}
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-primary h-2.5 rounded-full transition-all duration-300 ease-in-out" 
            style={{ width: `${(currentStep / 2) * 100}%` }}
          />
        </div>
      </div>

      {/* Back button */}
      {currentStep > 1 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={goBack}
          disabled={isSubmitting}
          className="mb-4"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
      )}

      {/* Step content with animations */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={stepVariants}
          transition={{ duration: 0.3 }}
        >
          {currentStep === 1 && (
            <div>
              <JobForm onSubmit={handleJobFormSubmit} />
            </div>
          )}
          
          {currentStep === 2 && (
            <div>
              <PricingProvider>
                <JobPricingStep 
                  onSubmit={handlePricingSubmit} 
                  isLoading={isSubmitting || isLoading}
                />
              </PricingProvider>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default JobPostingWizard;
