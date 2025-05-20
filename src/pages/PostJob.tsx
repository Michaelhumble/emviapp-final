
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import JobForm from '@/components/posting/job/JobForm';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useState } from 'react';
import { JobFormValues } from '@/components/posting/job/jobFormSchema';
import { Card } from '@/components/ui/card';
import JobTemplateSelector from '@/components/posting/job/JobTemplateSelector';
import { JobTemplateType } from '@/utils/jobs/jobTemplates';
import { usePostPayment } from '@/hooks/usePostPayment';
import EnhancedJobForm from '@/components/posting/job/EnhancedJobForm';
import { PricingOptions, JobPricingTier } from '@/utils/posting/types';
import { PricingProvider } from '@/context/pricing/PricingProvider';
import { useTranslation } from '@/hooks/useTranslation';

const PostJob = () => {
  const navigate = useNavigate();
  const { initiatePayment, isLoading } = usePostPayment();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<JobFormValues | null>(null);
  const [selectedTemplateType, setSelectedTemplateType] = useState<JobTemplateType | null>(null);
  const [step, setStep] = useState<'template' | 'form'>('template');
  const { t } = useTranslation();

  const handleTemplateSelect = (template: JobFormValues, templateType: JobTemplateType) => {
    setSelectedTemplate(template);
    setSelectedTemplateType(templateType);
    setStep('form');
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (data: JobFormValues, uploads: File[], pricingOptions: PricingOptions) => {
    try {
      setIsSubmitting(true);
      console.log('Form submitted:', data);
      console.log('Pricing options:', pricingOptions);
      
      // Convert form data to the expected format for the API
      const jobDetails = {
        title: data.title,
        salonName: data.salonName,
        description: data.description,
        vietnamese_description: data.vietnameseDescription,
        location: data.location,
        employment_type: data.jobType, 
        compensation_type: data.compensation_type,
        compensation_details: data.compensation_details,
        weekly_pay: data.weekly_pay,
        has_housing: data.has_housing,
        has_wax_room: data.has_wax_room,
        owner_will_train: data.owner_will_train,
        no_supply_deduction: data.no_supply_deduction,
        contact_info: {
          owner_name: data.contactName,
          phone: data.contactPhone,
          email: data.contactEmail,
        },
        post_type: 'job'
      };
      
      // Initiate payment with our consolidated hook
      const result = await initiatePayment('job', jobDetails, pricingOptions);
      
      if (result.success) {
        toast.success(t({
          english: 'Job post created successfully!',
          vietnamese: 'Tin tuyển dụng đã được tạo thành công!'
        }));
        navigate('/dashboard');
        return true;
      } else {
        toast.error(t({
          english: 'Error processing your job posting. Please try again.',
          vietnamese: 'Lỗi xử lý tin tuyển dụng của bạn. Vui lòng thử lại.'
        }));
        return false;
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(t({
        english: 'Error creating job post',
        vietnamese: 'Lỗi khi tạo tin tuyển dụng'
      }));
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToTemplates = () => {
    setStep('template');
  };

  // Set the default pricing options
  const defaultPricingOptions: PricingOptions = {
    selectedPricingTier: 'premium',
    durationMonths: 1,
    autoRenew: true,
    isFirstPost: true,
    isNationwide: false
  };

  return (
    <PricingProvider initialOptions={defaultPricingOptions}>
      <Layout>
        <Helmet>
          <title>{t({
            english: "Post a Job | EmviApp",
            vietnamese: "Đăng tin tuyển dụng | EmviApp"
          })}</title>
          <meta 
            name="description" 
            content={t({
              english: "Post a job on EmviApp. Find qualified beauty professionals for your business.",
              vietnamese: "Đăng tin tuyển dụng trên EmviApp. Tìm chuyên viên làm đẹp cho doanh nghiệp của bạn."
            })}
          />
        </Helmet>
        <div className="container max-w-4xl mx-auto py-8">
          <div className="mb-8 text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{t({
              english: "Post a Job",
              vietnamese: "Đăng tin tuyển dụng"
            })}</h1>
            <p className="text-gray-600">{t({
              english: "Find your perfect employee",
              vietnamese: "Tìm nhân viên lý tưởng cho bạn"
            })}</p>
          </div>
          
          <Card className="bg-white shadow-md rounded-lg p-6">
            {step === 'template' ? (
              <JobTemplateSelector onTemplateSelect={handleTemplateSelect} />
            ) : (
              <EnhancedJobForm 
                onSubmit={handleSubmit}
                initialTemplate={selectedTemplate || undefined}
                onBack={handleBackToTemplates}
                isCustomTemplate={selectedTemplateType === 'custom'}
                maxPhotos={5}
                onStepChange={(step) => console.log(`Changed to step ${step}`)}
              />
            )}
          </Card>
        </div>
      </Layout>
    </PricingProvider>
  );
};

export default PostJob;
