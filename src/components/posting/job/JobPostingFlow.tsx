import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/context/auth';
import { useJobPosting } from '@/hooks/jobs/useJobPosting';
import { useStripe } from '@/hooks/useStripe';
import JobDetailsForm from './JobDetailsForm';
import PricingSelection from './PricingSelection';
import ReviewAndSubmit from './ReviewAndSubmit';
import { PricingOptions } from '@/utils/posting/types';
import { calculatePrice } from '@/utils/pricing';
import { usePricingData } from '@/hooks/usePricingData';
import { JobDetailsSubmission } from '@/types/job';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const JobPostingFlow = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { handleJobPost, handleFreeJobPost } = useJobPosting();
  const { initiatePayment, isLoading: isPaymentLoading } = useStripe();
  const { pricingTiers } = usePricingData();

  const [step, setStep] = useState(1);
  const [jobFormData, setJobFormData] = useState<JobDetailsSubmission>({
    title: '',
    description: '',
    location: '',
    compensation_type: 'hourly',
    compensation_details: '',
    employment_type: 'full-time',
    requirements: [],
    contact_info: {
      owner_name: '',
      phone: '',
      email: '',
      notes: '',
      zalo: '',
    },
    image: '',
    vietnamese_description: '',
    preferred_languages: [],
    benefits: [],
    features: [],
    salon_type: '',
    specialties: [],
    weekly_pay: false,
    has_housing: false,
    has_wax_room: false,
    no_supply_deduction: false,
    owner_will_train: false,
    tip_range: '',
    salary_range: '',
    is_urgent: false,
    user_id: '',
    post_type: 'job',
    salonName: ''
  });
  const [pricingOptions, setPricingOptions] = useState<PricingOptions>({
    selectedPricingTier: 'free',
    durationMonths: 1,
    autoRenew: false,
    isNationwide: false,
    isFirstPost: false,
    showAtTop: false,
    fastSalePackage: false,
    jobPostBundle: false,
    bundleWithJobPost: false,
    isRenewal: false,
    hasReferrals: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!user) {
      toast.error('Please log in to post a job');
      navigate('/login');
    }
  }, [user, navigate]);

  const priceData = calculatePrice(pricingOptions, pricingTiers);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setJobFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setJobFormData(prevState => ({
      ...prevState,
      [name]: checked
    }));
  };

  const handlePricingChange = (options: PricingOptions) => {
    setPricingOptions(options);
  };

  const handleSubmit = async () => {
    if (!user?.id) {
      toast.error('Please log in to post a job');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const completeJobData = {
        ...jobFormData,
        user_id: user.id, // Always set the authenticated user's ID
        pricing_tier: pricingOptions.selectedPricingTier,
        status: 'active'
      };

      console.log('📝 Job posting submission:', {
        user_id: user.id,
        pricing_tier: pricingOptions.selectedPricingTier,
        finalPrice: priceData.finalPrice
      });

      // Check if this is truly a free post (tier is 'free' AND price is 0)
      if (pricingOptions.selectedPricingTier === 'free' && priceData.finalPrice === 0) {
        console.log('🆓 Using FREE posting flow');
        const jobId = await handleFreeJobPost(completeJobData);
        if (jobId) {
          // Redirect to success page for free posting
          navigate(`/post-success?free=true&jobId=${jobId}`);
        }
      } else {
        console.log('💳 Using PAID posting flow - Stripe checkout');
        // For paid posts, pass the job data in metadata for the payment system
        const pricingOptionsWithData = {
          ...pricingOptions,
          jobData: completeJobData
        };
        
        const success = await initiatePayment(pricingOptionsWithData, completeJobData);
        if (!success) {
          toast.error('Failed to initiate payment. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error submitting job:', error);
      toast.error('Failed to submit job posting. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <JobDetailsForm
            formData={jobFormData}
            onChange={handleInputChange}
            onCheckboxChange={handleCheckboxChange}
          />
        );
      case 2:
        return (
          <PricingSelection
            pricingOptions={pricingOptions}
            onPricingChange={handlePricingChange}
            priceData={priceData}
          />
        );
      case 3:
        return (
          <ReviewAndSubmit
            formData={jobFormData}
            pricingOptions={pricingOptions}
            priceData={priceData}
            isSubmitting={isSubmitting || isPaymentLoading}
            onSubmit={handleSubmit}
          />
        );
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <div className="container mx-auto py-8">
      {/* Back to Dashboard button */}
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </Button>
      </div>
      
      <h1 className="text-2xl font-bold mb-4">Post a Job</h1>
      
      <div className="mb-4">
        Step {step} of 3
      </div>

      {renderStepContent()}

      <div className="flex justify-between mt-6">
        {step > 1 && (
          <Button variant="secondary" onClick={prevStep}>
            Previous
          </Button>
        )}
        {step < 3 && (
          <Button onClick={nextStep} disabled={isSubmitting || isPaymentLoading}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default JobPostingFlow;
