
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useState } from 'react';
import { JobFormValues } from '@/components/posting/job/jobFormSchema';
import { Card } from '@/components/ui/card';
import { JobTemplateSelector } from '@/components/posting/job/JobTemplateSelector';
import type { JobTemplateType } from '@/components/posting/job/JobTemplateSelector';
import { JobTemplateType as UtilsJobTemplateType } from '@/utils/jobs/jobTemplates';
import { usePostPayment } from '@/hooks/usePostPayment';
import { PricingOptions } from '@/utils/posting/types';
import PremiumJobPostForm from '@/components/posting/job/PremiumJobPostForm';
import { PricingProvider } from '@/context/pricing/PricingProvider';
import { JobDetailsSubmission } from '@/types/job';
import { uploadImage } from '@/utils/uploadImage';

const PostJob = () => {
  const navigate = useNavigate();
  const { initiatePayment, isLoading } = usePostPayment();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<JobFormValues | null>(null);
  const [selectedTemplateType, setSelectedTemplateType] = useState<UtilsJobTemplateType | null>(null);
  const [step, setStep] = useState<'template' | 'form'>('template');
  const [currentFormStep, setCurrentFormStep] = useState(1);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleTemplateSelect = (template: JobFormValues, templateType: JobTemplateType) => {
    setSelectedTemplate(template);
    setSelectedTemplateType(templateType as UtilsJobTemplateType);
    setStep('form');
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (data: JobFormValues, uploads: File[], pricingOptions: PricingOptions) => {
    try {
      setIsSubmitting(true);
      setUploadProgress(0);
      
      // Upload images if any
      let imageUrls: string[] = [];
      
      if (uploads.length > 0) {
        toast.info('Uploading images...');
        
        // Upload each image and track progress
        for (let i = 0; i < uploads.length; i++) {
          const url = await uploadImage(uploads[i], (progress) => {
            // Calculate overall progress across all uploads
            const overallProgress = ((i / uploads.length) * 100) + (progress / uploads.length);
            setUploadProgress(Math.round(overallProgress));
          });
          imageUrls.push(url);
        }
      }
      
      // Convert form data to the expected format for the API
      const jobDetails: JobDetailsSubmission = {
        title: data.title,
        description: data.description,
        vietnameseDescription: data.vietnameseDescription,
        location: data.location,
        jobType: data.jobType, 
        compensation_type: data.compensation_type,
        compensation_details: data.compensation_details,
        weekly_pay: data.weekly_pay,
        has_housing: data.has_housing,
        has_wax_room: data.has_wax_room,
        owner_will_train: data.owner_will_train,
        no_supply_deduction: data.no_supply_deduction,
        salonName: data.salonName,
        contactName: data.contactName,
        contactPhone: data.contactPhone,
        contactEmail: data.contactEmail,
        requirements: data.requirements || [],
        specialties: data.specialties || [],
        post_type: 'job',
        // Add the primary image if available
        image: imageUrls.length > 0 ? imageUrls[0] : undefined
      };
      
      // Initiate payment with our consolidated hook
      const result = await initiatePayment('job', jobDetails, pricingOptions);
      
      if (result.success) {
        toast.success('Job post created successfully!');
        navigate('/dashboard');
        return true;
      } else {
        toast.error('Error processing your job posting. Please try again.');
        return false;
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error creating job post');
      return false;
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  const handleBackToTemplates = () => {
    setStep('template');
  };

  const handleStepChange = (step: number) => {
    setCurrentFormStep(step);
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
          <title>Post a Job | EmviApp</title>
          <meta 
            name="description" 
            content="Post a job on EmviApp. Find qualified beauty professionals for your business."
          />
        </Helmet>
        <div className="container max-w-4xl mx-auto py-8 px-4">
          <div className="mb-8 text-center">
            <h1 className="text-2xl md:text-3xl font-bold font-playfair mb-2">Post a Job</h1>
            <p className="text-gray-600">Find your perfect employee</p>
          </div>
          
          <Card className="bg-white shadow-md rounded-lg border-0 p-6 overflow-hidden">
            {step === 'template' ? (
              <JobTemplateSelector onTemplateSelect={handleTemplateSelect} />
            ) : (
              <PremiumJobPostForm 
                onSubmit={handleSubmit}
                initialTemplate={selectedTemplate || undefined}
                onBack={handleBackToTemplates}
                isLoading={isLoading || isSubmitting}
                isCustomTemplate={selectedTemplateType === 'custom'}
                maxPhotos={5}
                onStepChange={handleStepChange}
              />
            )}
          </Card>
        </div>
      </Layout>
    </PricingProvider>
  );
};

export default PostJob;
