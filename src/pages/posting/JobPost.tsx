
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import PostWizardLayout from '@/components/posting/PostWizardLayout';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from '@/hooks/useTranslation';
import { toast } from 'sonner';
import EnhancedJobForm from '@/components/posting/job/EnhancedJobForm';
import { JobFormValues } from '@/components/posting/job/jobFormSchema';
import { PricingOptions, JobPricingTier } from '@/utils/posting/types';
import WalletConfetti from '@/components/customer/WalletConfetti';
import PricingTierSelector from '@/components/posting/pricing/PricingTierSelector';
import YesLadder from '@/components/posting/upsell/YesLadder';
import JobSummary from '@/components/posting/JobSummary';
import { calculateJobPostPrice } from '@/utils/posting/jobPricing';
import PaymentSummary from '@/components/posting/PaymentSummary';
import { Card } from '@/components/ui/card';

const JobPost = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [jobFormData, setJobFormData] = useState<JobFormValues | null>(null);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  
  // Pricing options state
  const [pricingOptions, setPricingOptions] = useState<PricingOptions>({
    selectedPricingTier: 'standard',
    durationMonths: 1,
    isFirstPost: true,
    autoRenew: false
  });
  
  // Upsell options state
  const [upsellOptions, setUpsellOptions] = useState({
    expertReview: false,
    priorityPlacement: false,
    extendedReach: false
  });
  
  // Calculate price based on options
  const priceCalc = calculateJobPostPrice(pricingOptions);
  const isFreePlan = pricingOptions.selectedPricingTier === 'free';
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);
  
  // Suggest premium tier when user selects upsell options
  const suggestPremiumTier = () => {
    if (pricingOptions.selectedPricingTier === 'standard' || pricingOptions.selectedPricingTier === 'free') {
      setPricingOptions(prev => ({
        ...prev,
        selectedPricingTier: 'premium'
      }));
      
      // Toast notification
      toast.info(t({
        english: 'Premium plan recommended for these features',
        vietnamese: 'Gói cao cấp được đề xuất cho các tính năng này'
      }), {
        duration: 3000
      });
    }
  };
  
  // Handle tier selection
  const handleTierSelect = (tier: JobPricingTier) => {
    setPricingOptions(prev => ({
      ...prev,
      selectedPricingTier: tier
    }));
  };
  
  // Handle job form submission - moves to pricing step
  const handleJobFormSubmit = async (formData: JobFormValues, uploads: File[]) => {
    setIsSubmitting(true);
    
    try {
      // Store the form data for later
      setJobFormData(formData);
      setPhotoUploads(uploads);
      
      // Move to pricing/upsell step
      setTimeout(() => {
        setCurrentStep(2);
        setIsSubmitting(false);
      }, 500);
      
      return true;
    } catch (error) {
      console.error('Error submitting job form:', error);
      toast.error(t({
        english: 'Error saving job details. Please try again.',
        vietnamese: 'Lỗi khi lưu chi tiết công việc. Vui lòng thử lại.'
      }));
      setIsSubmitting(false);
      return false;
    }
  };
  
  // Handle final submission and payment
  const handleProceedToPayment = () => {
    setIsSubmitting(true);
    
    try {
      // Store data in session storage for payment processing
      sessionStorage.setItem('jobPostData', JSON.stringify(jobFormData));
      sessionStorage.setItem('jobPricingOptions', JSON.stringify({
        ...pricingOptions,
        ...upsellOptions
      }));
      
      // Simulate payment processing
      setTimeout(() => {
        setShowConfetti(true);
        setIsSubmitting(false);
      }, 1000);
      
    } catch (error) {
      console.error('Error processing payment:', error);
      toast.error(t({
        english: 'Error processing your request. Please try again.',
        vietnamese: 'Lỗi khi xử lý yêu cầu của bạn. Vui lòng thử lại.'
      }));
      setIsSubmitting(false);
    }
  };
  
  // Handle form step change
  const handleFormStepChange = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <Layout>
      <Helmet>
        <title>
          {t({
            english: 'Post a Job | EmviApp',
            vietnamese: 'Đăng Tin Tuyển Dụng | EmviApp'
          })}
        </title>
        <meta 
          name="description" 
          content={t({
            english: 'Create your job posting on EmviApp to find skilled professionals in the beauty industry.',
            vietnamese: 'Tạo tin đăng tuyển dụng trên EmviApp để tìm các chuyên gia có kỹ năng trong ngành làm đẹp.'
          })}
        />
      </Helmet>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <PostWizardLayout currentStep={currentStep} totalSteps={2}>
          {currentStep === 1 ? (
            <EnhancedJobForm 
              onSubmit={handleJobFormSubmit} 
              onStepChange={handleFormStepChange}
            />
          ) : (
            <div className="container max-w-6xl mx-auto pb-20">
              <h1 className="text-3xl font-playfair font-semibold mb-6 text-center">
                {t({
                  english: 'Review & Publish Your Job',
                  vietnamese: 'Xem lại & Đăng công việc của bạn'
                })}
              </h1>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  {/* Job Summary Card */}
                  {jobFormData && (
                    <JobSummary 
                      jobData={jobFormData} 
                      pricingTier={pricingOptions.selectedPricingTier}
                      durationMonths={pricingOptions.durationMonths}
                    />
                  )}
                  
                  {/* Yes Ladder / Upsell Section */}
                  <YesLadder 
                    onOptionChange={setUpsellOptions}
                    suggestPremium={suggestPremiumTier}
                  />
                  
                  {/* Pricing Tier Selection */}
                  <Card className="p-6 border-[#e8e1d5]">
                    <PricingTierSelector 
                      selectedTier={pricingOptions.selectedPricingTier}
                      onTierSelect={handleTierSelect}
                      pricingOptions={pricingOptions}
                      isFirstPost={pricingOptions.isFirstPost}
                    />
                  </Card>
                </div>
                
                <div className="lg:col-span-1">
                  <div className="sticky top-8">
                    <Card className="p-6 border-[#e8e1d5]">
                      <h2 className="text-xl font-playfair font-medium mb-4">
                        {t({
                          english: 'Payment Summary',
                          vietnamese: 'Tóm tắt thanh toán'
                        })}
                      </h2>
                      
                      <PaymentSummary
                        basePrice={priceCalc.finalPrice / pricingOptions.durationMonths}
                        duration={pricingOptions.durationMonths}
                        autoRenew={pricingOptions.autoRenew || false}
                        originalPrice={priceCalc.originalPrice}
                        finalPrice={priceCalc.finalPrice}
                        discountPercentage={priceCalc.discountPercentage}
                        onProceedToPayment={handleProceedToPayment}
                        isFreePlan={isFreePlan}
                        isSubmitting={isSubmitting}
                      />
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {showConfetti && (
            <WalletConfetti 
              trigger={showConfetti} 
              onDone={() => {
                // Redirect after confetti animation
                setTimeout(() => {
                  navigate('/dashboard');
                  toast.success(t({
                    english: 'Job posted successfully!',
                    vietnamese: 'Đăng tin tuyển dụng thành công!'
                  }));
                }, 1500);
              }} 
            />
          )}
        </PostWizardLayout>
      </motion.div>
    </Layout>
  );
};

export default JobPost;
