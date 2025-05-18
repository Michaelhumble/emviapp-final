
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useState } from 'react';
import { JobFormValues } from '@/components/posting/job/jobFormSchema';
import { Card } from '@/components/ui/card';
import JobTemplateSelector from '@/components/posting/job/JobTemplateSelector';
import { JobTemplateType } from '@/utils/jobs/jobTemplates';
import { PricingOptions } from '@/utils/posting/types';
import EnhancedJobForm from '@/components/posting/job/EnhancedJobForm';
import { usePostPayment } from '@/hooks/usePostPayment';

const CreateJobPosting = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<JobFormValues | null>(null);
  const [selectedTemplateType, setSelectedTemplateType] = useState<JobTemplateType | null>(null);
  const [step, setStep] = useState<'template' | 'form'>('template');
  const { initiatePayment } = usePostPayment();

  const handleTemplateSelect = (template: JobFormValues, templateType: JobTemplateType) => {
    setSelectedTemplate(template);
    setSelectedTemplateType(templateType);
    setStep('form');
    window.scrollTo(0, 0);
  };

  const handleFormSubmit = async (data: JobFormValues, uploads: File[], pricingOptions: PricingOptions) => {
    try {
      setIsSubmitting(true);
      console.log('Form submitted:', data);
      console.log('Selected pricing options:', pricingOptions);
      console.log('Uploaded photos:', uploads);
      
      // Prepare job details for submission and payment
      const jobDetails = {
        ...data,
        // Ensure we have all needed fields for backend
        title: data.title || '',
        description: data.description || '',
        location: data.location || '',
        contact_info: {
          email: data.contactEmail || '',
          phone: data.contactPhone || '',
          owner_name: data.contactName || '',
          zalo: data.contactZalo || '',
        },
        vietnamese_description: data.vietnameseDescription || '',
        requirements: data.requirements || [],
        specialties: data.specialties || [],
        weekly_pay: data.weeklyPay || false,
        has_housing: data.hasHousing || false,
        no_supply_deduction: data.noSupplyDeduction || false,
        owner_will_train: data.ownerWillTrain || false,
        is_urgent: data.isUrgent || false,
      };
      
      // Handle payment and job posting through the usePostPayment hook
      const paymentResponse = await initiatePayment('job', jobDetails, pricingOptions);
      
      if (!paymentResponse.success) {
        throw new Error('Payment failed');
      }
      
      // Note: The redirect will be handled by the usePostPayment hook
      return paymentResponse.success;
      
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error creating job post');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Create Job Posting | EmviApp</title>
        <meta 
          name="description" 
          content="Create a new job posting to find qualified beauty professionals for your salon."
        />
      </Helmet>
      <div className="container max-w-4xl mx-auto py-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Create Job Posting</h1>
          <p className="text-gray-600">Find your perfect employee</p>
        </div>
        
        <Card className="bg-white shadow-md rounded-lg p-6">
          {step === 'template' ? (
            <JobTemplateSelector onTemplateSelect={handleTemplateSelect} />
          ) : (
            <EnhancedJobForm 
              onSubmit={handleFormSubmit}
              initialTemplate={selectedTemplate || undefined}
              onBack={() => setStep('template')}
              isCustomTemplate={selectedTemplateType === 'custom'}
              maxPhotos={5} // Set maximum photos to 5
            />
          )}
        </Card>
      </div>
    </Layout>
  );
};

export default CreateJobPosting;
