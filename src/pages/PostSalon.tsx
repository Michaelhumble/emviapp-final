
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import PostWizardLayout from '@/components/posting/PostWizardLayout';
import { SalonIdentitySection } from '@/components/posting/salon/SalonIdentitySection';
import { SalonLocationSection } from '@/components/posting/salon/SalonLocationSection';
import { SalonDescriptionSection } from '@/components/posting/salon/SalonDescriptionSection';
import { SalonPhotoSection } from '@/components/posting/salon/SalonPhotoSection';
import { salonFormSchema, type SalonFormValues } from '@/components/posting/salon/salonFormSchema';

const PostSalon = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
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
      photos: [],
      coverPhotoIndex: 0,
    },
    mode: "onChange"
  });

  const handleNext = async () => {
    let fieldsToValidate: (keyof SalonFormValues)[] = [];
    
    switch (currentStep) {
      case 1:
        fieldsToValidate = ["salonName", "businessType"];
        break;
      case 2:
        fieldsToValidate = ["address", "city", "state", "zipCode"];
        break;
      case 3:
        fieldsToValidate = ["salonDescription", "askingPrice"];
        break;
      case 4:
        fieldsToValidate = ["photos"];
        break;
    }

    const isStepValid = await form.trigger(fieldsToValidate);
    
    if (isStepValid) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    } else {
      toast.error("Please fill in all required fields correctly");
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (data: SalonFormValues) => {
    console.log('Salon form submitted:', data);
    toast.success('Salon listing created successfully!');
    navigate('/dashboard');
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
        return <SalonPhotoSection form={form} />;
      default:
        return <div>Step {currentStep} coming soon...</div>;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Tell us about your salon";
      case 2: return "Where is your salon located?";
      case 3: return "Describe your salon";
      case 4: return "Add salon photos";
      case 5: return "Review and publish";
      default: return "Complete your listing";
    }
  };

  const isStepValid = () => {
    const values = form.getValues();
    const errors = form.formState.errors;
    
    switch (currentStep) {
      case 1:
        return values.salonName && values.businessType && !errors.salonName && !errors.businessType;
      case 2:
        return values.address && values.city && values.state && values.zipCode && 
               !errors.address && !errors.city && !errors.state && !errors.zipCode;
      case 3:
        return values.salonDescription && values.askingPrice && 
               values.salonDescription.length >= 30 && 
               !errors.salonDescription && !errors.askingPrice;
      case 4:
        return values.photos && values.photos.length > 0 && !errors.photos;
      default:
        return false;
    }
  };

  return (
    <>
      <Helmet>
        <title>Sell Your Salon | EmviApp</title>
        <meta name="description" content="List your salon for sale on EmviApp and connect with qualified buyers." />
      </Helmet>
      
      <PostWizardLayout currentStep={currentStep} totalSteps={totalSteps}>
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-2xl md:text-3xl font-playfair font-bold text-gray-900 mb-2">
              {getStepTitle()}
            </h1>
            <p className="text-gray-600">Step {currentStep} of {totalSteps}</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
              {renderCurrentStep()}
              
              <div className="flex justify-between pt-6">
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
                
                {currentStep < totalSteps ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={!isStepValid()}
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={!isStepValid()}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    Publish Listing
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </PostWizardLayout>
    </>
  );
};

export default PostSalon;
