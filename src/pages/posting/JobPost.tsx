
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ConsolidatedJobTemplateSelector from '@/components/job-posting-new/ConsolidatedJobTemplateSelector';
import ConsolidatedJobForm from '@/components/job-posting-new/ConsolidatedJobForm';
import JobPostOptions from '@/components/posting/job/JobPostOptions';
import { PaymentSummary } from '@/components/posting/PaymentSummary';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePostPayment } from '@/hooks/usePostPayment';
import { PricingOptions, JobPricingTier } from '@/utils/posting/types';
import { calculatePricing } from '@/utils/posting/pricing';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';

const JobPost = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProfession, setSelectedProfession] = useState<string | null>(null);
  const [jobFormData, setJobFormData] = useState<any>(null);
  const [showPricing, setShowPricing] = useState(false);
  const [pricingOptions, setPricingOptions] = useState<PricingOptions>({
    selectedPricingTier: 'standard',
    durationMonths: 1,
    autoRenew: false,
    isFirstPost: false
  });
  const { initiatePayment } = usePostPayment();

  const handleTemplateSelect = (profession: string) => {
    console.log('Profession selected:', profession);
    setSelectedProfession(profession);
  };

  const handleFormSubmit = async (formData: any) => {
    console.log('Job form completed:', formData);
    setJobFormData(formData);
    setShowPricing(true);
  };

  const handlePricingOptionsChange = (options: PricingOptions) => {
    setPricingOptions(options);
  };

  const handleBackToForm = () => {
    setShowPricing(false);
  };

  const handleBackToTemplates = () => {
    setSelectedProfession(null);
    setShowPricing(false);
    setJobFormData(null);
  };

  const handleProceedToPayment = async () => {
    if (!jobFormData) return;
    
    setIsSubmitting(true);
    
    try {
      console.log('Proceeding to payment with:', { jobFormData, pricingOptions });

      // Transform the form data to match expected format
      const jobData = {
        title: `${jobFormData.profession.replace('-', ' ')} Position`,
        salonName: jobFormData.salonName,
        company: jobFormData.salonName,
        location: jobFormData.location,
        employment_type: jobFormData.employmentType,
        compensation_type: jobFormData.compensationType,
        compensation_details: jobFormData.compensationDetails,
        jobDescription: jobFormData.jobDescriptionEnglish,
        vietnameseDescription: jobFormData.jobDescriptionVietnamese,
        description: jobFormData.jobDescriptionEnglish,
        vietnamese_description: jobFormData.jobDescriptionVietnamese,
        contact_info: {
          owner_name: jobFormData.contactName,
          phone: jobFormData.contactPhone,
          email: jobFormData.contactEmail
        },
        benefits: jobFormData.benefits || [],
        profession: jobFormData.profession,
        photos: jobFormData.photoUploads || []
      };

      // Initiate payment and job posting
      const result = await initiatePayment('job', jobData, pricingOptions);
      
      if (result.success) {
        toast.success('Job posting created successfully!', {
          description: 'Redirecting to listings page...'
        });
        navigate('/listings');
      } else if (result.waitlisted) {
        toast.info('Added to Diamond tier waitlist', {
          description: 'Our team will contact you soon.'
        });
        navigate('/listings');
      } else {
        toast.error('Failed to submit job posting', {
          description: 'Please try again or contact support.'
        });
      }
    } catch (error) {
      console.error('Job posting error:', error);
      toast.error('An error occurred', {
        description: 'Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate pricing data for display
  const pricingData = React.useMemo(() => {
    const pricing = calculatePricing(
      pricingOptions.selectedPricingTier,
      pricingOptions.durationMonths,
      pricingOptions.autoRenew || false,
      pricingOptions.isFirstPost || false,
      pricingOptions.isNationwide || false
    );
    
    return {
      basePrice: pricing.originalPrice,
      originalPrice: pricing.originalPrice,
      finalPrice: pricing.finalPrice,
      discountedPrice: pricing.finalPrice,
      discountPercentage: pricing.discountPercentage,
      discountAmount: pricing.originalPrice - pricing.finalPrice,
      discountLabel: pricing.discountPercentage > 0 ? `${pricing.discountPercentage}% Discount` : '',
      isFoundersDiscount: false,
      durationMonths: pricingOptions.durationMonths,
      selectedTier: pricingOptions.selectedPricingTier
    };
  }, [pricingOptions]);

  return (
    <Layout>
      <Helmet>
        <title>Post a Job - Premium Job Posting | EmviApp</title>
        <meta name="description" content="Post your job with our premium job posting experience - find the perfect beauty professional" />
      </Helmet>
      
      {!selectedProfession ? (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 bg-clip-text text-transparent leading-tight" 
                  style={{ textShadow: '0 2px 4px rgba(147, 51, 234, 0.1)' }}>
                Build Your Beauty Empire: Start with the Perfect Hire.
              </h1>
              <p className="font-inter text-lg md:text-xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
                Unlock the most beautiful job posting experience ever built for the beauty industry. Select your profession below to begin.
              </p>
              <div className="flex items-center justify-center gap-2 text-purple-600 font-medium animate-pulse">
                <span className="text-2xl">🚀</span>
                <p className="text-base md:text-lg bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent font-semibold">
                  1,000+ salons have found top talent on Emvi.App — be the next success story.
                </p>
              </div>
            </div>
            
            <ConsolidatedJobTemplateSelector 
              onTemplateSelect={handleTemplateSelect} 
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      ) : !showPricing ? (
        <ConsolidatedJobForm 
          selectedProfession={selectedProfession}
          onSubmit={handleFormSubmit}
          onBack={handleBackToTemplates}
          isSubmitting={isSubmitting}
        />
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Button 
                variant="ghost" 
                onClick={handleBackToForm}
                className="mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Job Form
              </Button>
              
              <h1 className="font-playfair text-3xl font-bold mb-2">Choose Your Plan</h1>
              <p className="text-gray-600">Select the best plan for your job posting needs</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Job Posting Options</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <JobPostOptions
                      options={pricingOptions}
                      onOptionsChange={handlePricingOptionsChange}
                      isFirstPost={pricingOptions.isFirstPost}
                    />
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-1">
                <PaymentSummary priceData={pricingData} />
                
                <div className="mt-6 space-y-3">
                  <Button 
                    onClick={handleProceedToPayment}
                    disabled={isSubmitting}
                    className="w-full"
                    size="lg"
                  >
                    {isSubmitting ? 'Processing...' : 
                     pricingData.finalPrice === 0 ? 'Post Job for Free' : 
                     `Proceed to Payment - $${pricingData.finalPrice.toFixed(2)}`}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={handleBackToForm}
                    className="w-full"
                  >
                    Back to Edit Job
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default JobPost;
