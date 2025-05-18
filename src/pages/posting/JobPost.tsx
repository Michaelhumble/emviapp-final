
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import EnhancedJobForm from '@/components/posting/job/EnhancedJobForm';
import PostWizardLayout from '@/components/posting/PostWizardLayout';
import { JobFormValues } from '@/components/posting/job/jobFormSchema';
import { PricingOptions } from '@/utils/posting/types';
import { usePostPayment } from '@/hooks/usePostPayment';
import { useJobPosting } from '@/hooks/jobs/useJobPosting';
import { FormProvider, useForm } from 'react-hook-form';
import { uploadImage } from '@/utils/uploadImage';
import JobTemplateSelector from '@/components/posting/job/JobTemplateSelector';
import { JobTemplateType } from '@/utils/jobs/jobTemplates';
import { Card } from '@/components/ui/card';

const JobPost = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showTemplateSelector, setShowTemplateSelector] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState<JobFormValues | null>(null);
  const [selectedTemplateType, setSelectedTemplateType] = useState<JobTemplateType | null>(null);
  const { handleJobPost } = useJobPosting();
  const { initiatePayment, isLoading } = usePostPayment();
  const formMethods = useForm();

  const handleTemplateSelect = (template: JobFormValues, templateType: JobTemplateType) => {
    setSelectedTemplate(template);
    setSelectedTemplateType(templateType);
    setShowTemplateSelector(false);
    setCurrentStep(2);
  };

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  const handleSubmit = async (formData: JobFormValues, photoUploads: File[], pricingOptions: PricingOptions) => {
    // Validate required fields one more time
    if (!formData.title || !formData.description || !formData.location || !formData.contactEmail) {
      toast.error("Please complete all required fields before submitting");
      return false;
    }

    // Ensure requirements and specialties are arrays
    const safeRequirements = Array.isArray(formData.requirements) ? formData.requirements : [];
    const safeSpecialties = Array.isArray(formData.specialties) ? formData.specialties : [];

    try {
      console.log('Form submitted with price tier:', pricingOptions.selectedPricingTier);
      console.log('Duration months:', pricingOptions.durationMonths);
      console.log('Auto-renew:', pricingOptions.autoRenew);
      console.log('Nationwide:', pricingOptions.isNationwide);
      console.log('First post:', pricingOptions.isFirstPost);
      console.log('Photos count:', photoUploads.length);
      
      // Handle photo upload if any
      let imageUrls: string[] = [];
      if (photoUploads.length > 0) {
        try {
          // Upload each photo and collect URLs
          const uploadPromises = photoUploads.map(photo => uploadImage(photo));
          imageUrls = await Promise.all(uploadPromises);
          console.log('Images uploaded successfully:', imageUrls);
        } catch (uploadError) {
          console.error('Error uploading photos:', uploadError);
          toast.error("There was an issue uploading your photos");
          // Continue with job post even if image upload fails
        }
      }

      // Prepare job details for submission
      const jobDetails = {
        title: formData.title,
        description: formData.description,
        vietnamese_description: formData.vietnameseDescription || '',
        location: formData.location,
        employment_type: formData.jobType,
        compensation_details: formData.compensation_details || '',
        salary_range: formData.salary_range || '',
        experience_level: formData.experience_level,
        contact_info: {
          email: formData.contactEmail,
          owner_name: formData.contactName || '',
          phone: formData.contactPhone || ''
        },
        specialties: safeSpecialties,
        requirements: safeRequirements,
        post_type: 'job',
        images: imageUrls,
        templateType: formData.templateType || selectedTemplateType
      };
      
      // Diamond plan handling - direct to waitlist instead of payment
      if (pricingOptions.selectedPricingTier === 'diamond') {
        toast.success("Diamond plan request submitted", {
          description: "Our team will contact you shortly to discuss premium options."
        });
        
        // Submit the request to a different endpoint or track in database
        // For now, we'll just simulate success
        setTimeout(() => {
          navigate('/post-success?tier=diamond&waitlist=true');
        }, 1500);
        return true;
      }
      
      // Even for free tier, process through payment flow to collect credit card
      const result = await initiatePayment('job', jobDetails, pricingOptions);
      return result?.success || false;
    } catch (error) {
      console.error('Error submitting job post:', error);
      toast.error("Error creating job post");
      return false;
    }
  };

  return (
    <FormProvider {...formMethods}>
      <PostWizardLayout currentStep={currentStep} totalSteps={showTemplateSelector ? 4 : 3}>
        <Helmet>
          <title>Post a Job | EmviApp</title>
          <meta 
            name="description" 
            content="Find qualified candidates for your salon position quickly with EmviApp job listings."
          />
        </Helmet>
        
        {showTemplateSelector ? (
          <Card className="bg-white shadow-md rounded-lg p-6">
            <JobTemplateSelector onTemplateSelect={handleTemplateSelect} />
          </Card>
        ) : (
          <EnhancedJobForm 
            onSubmit={handleSubmit}
            onStepChange={handleStepChange}
            initialTemplate={selectedTemplate || undefined}
            isCustomTemplate={selectedTemplateType === 'custom'}
            maxPhotos={5} // Set maximum photos to 5
          />
        )}
      </PostWizardLayout>
    </FormProvider>
  );
};

export default JobPost;
