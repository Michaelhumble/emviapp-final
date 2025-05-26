
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { enhancedSalonFormSchema, type EnhancedSalonFormValues } from './enhancedSalonFormSchema';
import SalonIdentitySection from './sections/SalonIdentitySection';
import SalonLocationSection from './sections/SalonLocationSection';
import SalonPhotosSection from './sections/SalonPhotosSection';
import SalonAboutSection from './sections/SalonAboutSection';
import SalonPerformanceSection from './sections/SalonPerformanceSection';
import SalonPromotionSection from './sections/SalonPromotionSection';
import SalonConfirmationSection from './sections/SalonConfirmationSection';

interface PremiumSalonWizardProps {
  onSubmit: (data: EnhancedSalonFormValues) => Promise<boolean>;
  photoUploads: File[];
  setPhotoUploads: (files: File[]) => void;
  onPromotionChange: (upgrades: any) => void;
}

const steps = [
  { id: 'identity', title: 'Salon Identity', description: 'Basic information about your salon' },
  { id: 'location', title: 'Location', description: 'Where your salon is located' },
  { id: 'photos', title: 'Photos & Video', description: 'Visual showcase of your salon' },
  { id: 'about', title: 'About Your Salon', description: 'Your story and unique selling points' },
  { id: 'performance', title: 'Business Performance', description: 'Financial metrics and growth data' },
  { id: 'promotion', title: 'Promotion Options', description: 'Boost your listing visibility' },
  { id: 'confirmation', title: 'Review & Publish', description: 'Final review and launch' }
];

const PremiumSalonWizard = ({ 
  onSubmit, 
  photoUploads, 
  setPhotoUploads, 
  onPromotionChange 
}: PremiumSalonWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<EnhancedSalonFormValues>({
    resolver: zodResolver(enhancedSalonFormSchema),
    defaultValues: {
      salonName: '',
      businessType: '',
      salonSize: '',
      city: '',
      state: '',
      neighborhood: '',
      hideAddress: false,
      coverPhotoIndex: 0,
      videoUrl: '',
      salonStory: '',
      ownerMessage: '',
      reasonForSelling: '',
      showRevenue: true,
      showProfit: true,
      showClients: true,
      revenue: '',
      profit: '',
      monthlyClients: '',
      yearsInOperation: '',
      leaseTerms: '',
      monthlyRent: '',
      askingPrice: '',
      hidePrice: false,
      includedEquipment: [],
      teamSize: '',
      teamStays: false,
      staffBios: '',
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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const formData = form.getValues();
      const success = await onSubmit(formData);
      if (!success) {
        setIsSubmitting(false);
      }
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  const isStepComplete = (stepIndex: number) => {
    const values = form.getValues();
    
    switch (stepIndex) {
      case 0: // Identity
        return !!(values.salonName && values.businessType && values.salonSize);
      case 1: // Location
        return !!(values.city && values.state);
      case 2: // Photos
        return photoUploads.length > 0;
      case 3: // About
        return !!(values.salonStory);
      case 4: // Performance
        return !!(values.askingPrice);
      case 5: // Promotion
        return true; // Optional step
      case 6: // Confirmation
        return true;
      default:
        return false;
    }
  };

  const canProceed = isStepComplete(currentStep);

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
      case 6:
        return (
          <SalonConfirmationSection 
            form={form}
            isComplete={canProceed}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 via-blue-50/20 to-pink-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            List Your Salon for Sale
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Create a premium listing that attracts serious buyers
          </p>
          
          {/* Progress Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-3 bg-gray-200" />
            <div className="mt-2">
              <h3 className="font-semibold text-lg">{steps[currentStep].title}</h3>
              <p className="text-gray-600">{steps[currentStep].description}</p>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="max-w-4xl mx-auto">
          <Form {...form}>
            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 p-8 shadow-lg">
              {renderStepContent()}
            </div>
          </Form>

          {/* Navigation */}
          {currentStep < steps.length - 1 && (
            <div className="flex justify-between items-center mt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              <div className="flex gap-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index <= currentStep
                        ? 'bg-purple-500'
                        : isStepComplete(index)
                        ? 'bg-green-500'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <Button
                onClick={nextStep}
                disabled={!canProceed}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PremiumSalonWizard;
