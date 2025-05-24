
import React, { useState } from 'react';
import { useAuth } from '@/context/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useStripe } from '@/hooks/useStripe';
import { PricingOptions, JobPricingTier } from '@/utils/posting/types';
import { calculateJobPostPrice } from '@/utils/posting/jobPricing';
import ConsolidatedJobTemplateSelector from '@/components/job-posting-new/ConsolidatedJobTemplateSelector';
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
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-gray-900">Post a Job</h1>
                <p className="text-lg text-gray-600">Choose a template to get started with your job posting</p>
              </div>
              <ConsolidatedJobTemplateSelector 
                onTemplateSelect={handleTemplateSelect}
                isSubmitting={false}
              />
            </div>
          )}

          {currentStep === 'form' && selectedTemplate && (
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold text-gray-900">Job Details</h2>
                <p className="text-lg text-gray-600">Fill in the details for your job posting</p>
              </div>
              
              {/* Enhanced Job Form Section */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter job title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Salon Name</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Your salon name"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="City, State"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Employment Type</label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                        <option>Full-time</option>
                        <option>Part-time</option>
                        <option>Contract</option>
                        <option>Temporary</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Description</label>
                    <textarea 
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Describe the role, responsibilities, and requirements..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="e.g. $40,000 - $60,000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                        <option>Entry Level</option>
                        <option>Mid Level</option>
                        <option>Senior Level</option>
                        <option>Expert Level</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Benefits & Perks</label>
                    <textarea 
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Health insurance, paid time off, commission opportunities..."
                    />
                  </div>

                  <div className="flex justify-between pt-6">
                    <button 
                      onClick={() => setCurrentStep('template')}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Back to Templates
                    </button>
                    <button 
                      onClick={handleFormSubmit}
                      className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                    >
                      Continue to Pricing
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
