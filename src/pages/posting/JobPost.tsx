import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { JobDetailsSubmission } from '@/types/job';
import { PricingOptions } from '@/utils/posting/types';
import { jobPricingOptions, getJobPostPricingSummary } from '@/utils/posting/jobPricing';
import JobDetailsSection from '@/components/posting/JobDetailsSection';
import ReviewAndPaymentSection from '@/components/posting/ReviewAndPaymentSection';
import PricingSection from '@/components/posting/PricingSection';
import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react';

const JobPost: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Job details state
  const [jobDetails, setJobDetails] = useState<JobDetailsSubmission>({
    title: '',
    company: '',
    location: '',
    description: '',
    job_type: 'full-time',
    salary_range: '',
    application_email: '',
    application_url: '',
    contact_phone: '',
    benefits: [],
    responsibilities: [],
    qualifications: [],
    years_of_experience: '',
    education_level: '',
    skills: [],
    is_remote: false,
    status: 'active',
    posted_date: new Date(),
    category: 'other',
    tags: [],
    // user_id: user?.id || '',  // Set on submission
    // salon_id: '',             // For salon-linked jobs
  });

  // Pricing options state
  const [pricingId, setPricingId] = useState<string>('');
  const [duration, setDuration] = useState<number>(1);
  const [autoRenew, setAutoRenew] = useState<boolean>(false);
  const [pricingOptions, setPricingOptions] = useState<PricingOptions>({
    selectedPricingTier: pricingId,
    durationMonths: duration,
    autoRenew: autoRenew
  });

  // Form section state
  const [currentSection, setCurrentSection] = useState<number>(0);
  const totalSections = 3;

  // Validation error state
  const [validationError, setValidationError] = useState<string>('');

  // Update pricing options whenever pricingId, duration, or autoRenew changes
  useEffect(() => {
    setPricingOptions({
      selectedPricingTier: pricingId,
      durationMonths: duration,
      autoRenew: autoRenew
    });
  }, [pricingId, duration, autoRenew]);

  // Pricing summary
  const price = getJobPostPricingSummary(pricingId, duration);

  // Handlers for updating job details
  const handleJobDetailsChange = (updatedDetails: Partial<JobDetailsSubmission>) => {
    setJobDetails(prevDetails => ({ ...prevDetails, ...updatedDetails }));
    setValidationError(''); // Clear any previous validation errors
  };

  // Handler for going to the next section
  const handleNextSection = () => {
    // Validate job details before proceeding
    if (currentSection === 0) {
      if (!jobDetails.title || !jobDetails.company || !jobDetails.location || !jobDetails.description) {
        setValidationError(t(
          "Please fill in all required job details.",
          "Vui lòng điền đầy đủ thông tin chi tiết công việc."
        ));
        toast.error(t(
          "Please fill in all required job details.",
          "Vui lòng điền đầy đủ thông tin chi tiết công việc."
        ));
        return;
      }
    }

    // Validate pricing options before proceeding
    if (currentSection === 1) {
      if (!pricingId || !duration) {
        setValidationError(t(
          "Please select a pricing option and duration.",
          "Vui lòng chọn một tùy chọn giá và thời hạn."
        ));
        toast.error(t(
          "Please select a pricing option and duration.",
          "Vui lòng chọn một tùy chọn giá và thời hạn."
        ));
        return;
      }
    }

    setValidationError('');
    setCurrentSection(prevSection => Math.min(prevSection + 1, totalSections - 1));
  };

  // Handler for going to the previous section
  const handlePreviousSection = () => {
    setCurrentSection(prevSection => Math.max(prevSection - 1, 0));
    setValidationError('');
  };

  // Handler for pricing selection
  const handlePricingSelect = (selectedPricingId: string) => {
    setPricingId(selectedPricingId);
    setValidationError('');
  };

  // Handler for duration selection
  const handleDurationSelect = (selectedDuration: number) => {
    setDuration(selectedDuration);
    setValidationError('');
  };

  // Handler for auto-renew toggle
  const handleAutoRenewToggle = (selectedAutoRenew: boolean) => {
    setAutoRenew(selectedAutoRenew);
  };

  // Handler for form submission
  const handleSubmit = async () => {
    // Validate all required fields
    if (!jobDetails.title || !jobDetails.company || !jobDetails.location || !jobDetails.description) {
      setValidationError(t(
        "Please fill in all required job details.",
        "Vui lòng điền đầy đủ thông tin chi tiết công việc."
      ));
      toast.error(t(
        "Please fill in all required job details.",
        "Vui lòng điền đầy đủ thông tin chi tiết công việc."
      ));
      setCurrentSection(0);
      return;
    }

    if (!pricingId || !duration) {
      setValidationError(t(
        "Please select a pricing option and duration.",
        "Vui lòng chọn một tùy chọn giá và thời hạn."
      ));
      toast.error(t(
        "Please select a pricing option and duration.",
        "Vui lòng chọn một tùy chọn giá và thời hạn."
      ));
      setCurrentSection(1);
      return;
    }

    // Set user_id before submission
    jobDetails.user_id = user?.id || '';

    // All validations passed, proceed to the last section
    setCurrentSection(2);
  };

  return (
    <div className="container mx-auto py-8">
      <Button variant="ghost" onClick={() => navigate('/dashboard')} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t("Back to Dashboard", "Quay lại trang tổng quan")}
      </Button>

      <h1 className="text-2xl font-bold mb-4">{t("Post a Job", "Đăng tin tuyển dụng")}</h1>

      {validationError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">{t("Error", "Lỗi")}:</strong>
          <span className="block sm:inline">{validationError}</span>
        </div>
      )}

      <div className="mb-6">
        {currentSection === 0 && (
          <JobDetailsSection
            jobDetails={jobDetails}
            onChange={handleJobDetailsChange}
            onNext={handleNextSection}
          />
        )}

        {currentSection === 1 && (
          <PricingSection
            pricingOptions={jobPricingOptions}
            selectedPricingId={pricingId}
            selectedDuration={duration}
            autoRenew={autoRenew}
            onPricingSelect={handlePricingSelect}
            onDurationSelect={handleDurationSelect}
            onAutoRenewToggle={handleAutoRenewToggle}
            onNext={handleNextSection}
            onPrevious={handlePreviousSection}
          />
        )}

        {currentSection === 2 && (
          <ReviewAndPaymentSection
            pricingId={pricingId}
            duration={duration}
            autoRenew={autoRenew}
            jobDetails={jobDetails}
            pricingOptions={pricingOptions}
            onValidationError={setValidationError}
          />
        )}
      </div>

      {currentSection !== 2 && (
        <div className="flex justify-between">
          {currentSection > 0 && (
            <Button variant="secondary" onClick={handlePreviousSection}>
              {t("Previous", "Trước")}
            </Button>
          )}

          {currentSection < 1 && (
            <Button onClick={handleNextSection}>
              {t("Next", "Tiếp theo")}
            </Button>
          )}

          {currentSection === 1 && (
            <Button onClick={handleSubmit}>
              {t("Submit", "Gửi")}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default JobPost;
