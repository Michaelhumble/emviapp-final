import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import ConsolidatedJobTemplateSelector from '@/components/posting/job/ConsolidatedJobTemplateSelector';
import ConsolidatedJobForm from '@/components/posting/job/ConsolidatedJobForm';
import PremiumPricingTable from '@/components/posting/PremiumPricingTable';
import { useStripe } from '@/hooks/useStripe';
import { PricingOptions, JobPricingTier } from '@/utils/posting/types';
import { supabase } from '@/integrations/supabase/client';

const formSchema = z.object({
  profession: z.string().nonempty('Please select a profession'),
  salonName: z.string().nonempty('Please enter your salon name'),
  location: z.string().nonempty('Please enter your location'),
  employmentType: z.string().nonempty('Please select employment type'),
  compensationType: z.string().nonempty('Please select compensation type'),
  compensationDetails: z.string().nonempty('Please enter compensation details'),
  jobDescriptionEnglish: z.string().nonempty('Please enter job description in English'),
  jobDescriptionVietnamese: z.string().nonempty('Please enter job description in Vietnamese'),
  contactName: z.string().nonempty('Please enter contact name'),
  contactPhone: z.string().nonempty('Please enter contact phone'),
  contactEmail: z.string().nonempty('Please enter contact email'),
  benefits: z.array(z.string()).optional(),
  photoUploads: z.array(z.string()).optional()
});

type FormValues = z.infer<typeof formSchema>;

const JobPost = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { initiatePayment, isLoading: isPaymentLoading } = useStripe();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [pricingOptions, setPricingOptions] = useState<PricingOptions>({
    selectedPricingTier: 'standard',
    durationMonths: 1,
    autoRenew: true,
    isFirstPost: false,
    isNationwide: false
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profession: '',
      salonName: '',
      location: '',
      employmentType: '',
      compensationType: '',
      compensationDetails: '',
      jobDescriptionEnglish: '',
      jobDescriptionVietnamese: '',
      contactName: '',
      contactPhone: '',
      contactEmail: '',
      benefits: [],
      photoUploads: []
    }
  });

  const handleTemplateSelect = (template: string) => {
    setSelectedTemplate(template);
    setCurrentStep(2);
  };

  const handleFormComplete = (data: any) => {
    form.reset(data);
    setCurrentStep(3); // Move to pricing step
  };

  const handlePricingOptionsChange = (options: PricingOptions) => {
    setPricingOptions(options);
  };

  const handleProceedToPayment = async () => {
    if (!user) {
      toast.error('Please log in to continue');
      navigate('/login?redirect=' + encodeURIComponent('/post-job'));
      return;
    }

    try {
      const formData = form.getValues();
      
      // For Diamond tier, redirect to waitlist/contact
      if (pricingOptions.selectedPricingTier === 'diamond') {
        window.open('mailto:support@emviapp.com?subject=Diamond Plan Interest', '_blank');
        return;
      }

      // Initiate Stripe payment
      const success = await initiatePayment({
        ...pricingOptions,
        jobData: formData,
        postType: 'job'
      });

      if (success) {
        toast.success('Payment initiated successfully!');
        // Payment will redirect to success page
      } else {
        toast.error('Payment initiation failed. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  const handleBackStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step ? 'bg-purple-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2">
            <span className="text-sm text-gray-600">
              {currentStep === 1 && 'Choose Template'}
              {currentStep === 2 && 'Job Details'}
              {currentStep === 3 && 'Select Plan'}
            </span>
          </div>
        </div>

        {/* Step 1: Template Selection */}
        {currentStep === 1 && (
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold">
                Choose Your Job Template
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ConsolidatedJobTemplateSelector onTemplateSelect={handleTemplateSelect} />
            </CardContent>
          </Card>
        )}

        {/* Step 2: Job Form */}
        {currentStep === 2 && (
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="flex flex-row items-center space-y-0">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleBackStep}
                className="mr-4"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <CardTitle className="text-2xl font-bold">
                Job Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <ConsolidatedJobForm 
                  onComplete={handleFormComplete}
                  selectedTemplate={selectedTemplate}
                />
              </Form>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Premium Pricing Table */}
        {currentStep === 3 && (
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleBackStep}
                className="mr-4"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Job Details
              </Button>
            </div>
            
            <PremiumPricingTable
              pricingOptions={pricingOptions}
              onOptionsChange={handlePricingOptionsChange}
              onProceedToPayment={handleProceedToPayment}
              isLoading={isPaymentLoading}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default JobPost;
