
import React, { useState } from 'react';
import { useAuth } from '@/context/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useStripe } from '@/hooks/useStripe';
import { PricingOptions, JobPricingTier } from '@/utils/posting/types';
import { calculateJobPostPrice } from '@/utils/posting/jobPricing';
import JobTemplateSelector from '@/components/legacy-job-templates/JobTemplateSelector';
import EnhancedJobForm from '@/components/posting/job/EnhancedJobForm';
import PremiumPricingTable from '@/components/posting/PremiumPricingTable';

const JobPost = () => {
  const { userProfile } = useAuth();
  const navigate = useNavigate();
  const { initiatePayment, isLoading } = useStripe();
  
  const [currentStep, setCurrentStep] = useState<'template' | 'form' | 'pricing' | 'payment'>('template');
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [formData, setFormData] = useState<any>(null);
  const [pricingOptions, setPricingOptions] = useState<PricingOptions>({
    selectedPricingTier: 'standard' as JobPricingTier,
    durationMonths: 1,
    autoRenew: false,
    isNationwide: false
  });

  const handleTemplateSelect = (template: any) => {
    console.log('Template selected:', template);
    setSelectedTemplate(template);
    setCurrentStep('form');
  };

  const handleFormSubmit = (data: any) => {
    console.log('Form submitted:', data);
    setFormData(data);
    setCurrentStep('pricing');
  };

  const handlePricingSelect = (options: PricingOptions) => {
    console.log('Pricing selected:', options);
    setPricingOptions(options);
  };

  const handlePayment = async () => {
    if (!userProfile) {
      toast.error('Please sign in to continue');
      navigate(`/login?redirect=${encodeURIComponent('/post-job')}`);
      return;
    }

    // Handle Diamond tier waitlist
    if (pricingOptions.selectedPricingTier === 'diamond') {
      toast.success('Added to Diamond tier waitlist! We\'ll contact you soon.');
      navigate('/dashboard');
      return;
    }

    try {
      const success = await initiatePayment({
        ...pricingOptions,
        jobFormData: formData
      });
      
      if (success) {
        toast.success('Redirecting to payment...');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
    }
  };

  const pricing = calculateJobPostPrice(pricingOptions);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {currentStep === 'template' && (
            <JobTemplateSelector 
              onTemplateSelect={handleTemplateSelect}
              isSubmitting={false}
            />
          )}

          {currentStep === 'form' && selectedTemplate && (
            <EnhancedJobForm
              template={selectedTemplate}
              onSubmit={handleFormSubmit}
              onBack={() => setCurrentStep('template')}
            />
          )}

          {currentStep === 'pricing' && (
            <PremiumPricingTable
              selectedTier={pricingOptions.selectedPricingTier}
              durationMonths={pricingOptions.durationMonths}
              autoRenew={pricingOptions.autoRenew}
              isNationwide={pricingOptions.isNationwide}
              onPricingChange={handlePricingSelect}
              onProceedToPayment={handlePayment}
              onBack={() => setCurrentStep('form')}
              isLoading={isLoading}
              totalPrice={pricing.finalPrice}
              originalPrice={pricing.originalPrice}
              discountPercentage={pricing.discountPercentage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default JobPost;
