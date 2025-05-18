
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

const CreateJobPosting = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<JobFormValues | null>(null);
  const [step, setStep] = useState<'template' | 'form'>('template');

  const handleTemplateSelect = (template: JobFormValues) => {
    setSelectedTemplate(template);
    setStep('form');
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      console.log('Form submitted:', data);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Job post created successfully!');
      navigate('/jobs');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error creating job post');
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
            <JobForm 
              onSubmit={handleSubmit}
              photoUploads={photoUploads}
              setPhotoUploads={setPhotoUploads}
              isSubmitting={isSubmitting}
              initialValues={selectedTemplate || undefined}
              onBack={() => setStep('template')}
              showVietnameseByDefault={selectedTemplate?.title?.toLowerCase().includes('nail') || false}
            />
          )}
        </Card>
      </div>
    </Layout>
  );
};

export default CreateJobPosting;
