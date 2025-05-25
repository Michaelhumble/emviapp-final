
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import ConsolidatedJobTemplateSelector from '@/components/job-posting-new/ConsolidatedJobTemplateSelector';
import EnhancedJobForm from '@/components/posting/job/EnhancedJobForm';
import JobPostingFlow from '@/components/posting/job/JobPostingFlow';
import { getJobPrefillByIndustry } from '@/utils/beautyIndustryPrefills';

type PostingStep = 'template' | 'form' | 'pricing';

const EnhancedPostJob = () => {
  const [currentStep, setCurrentStep] = useState<PostingStep>('template');
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [jobFormData, setJobFormData] = useState<any>(null);

  const handleTemplateSelect = (template: any) => {
    console.log('Template selected:', template);
    
    // Get prefill data based on template selection
    const prefillData = getJobPrefillByIndustry(template.id || template.title || '');
    
    // Set the selected template with prefill data
    setSelectedTemplate({
      ...template,
      prefillData
    });
    
    setCurrentStep('form');
  };

  const handleFormSubmit = (formData: any) => {
    console.log('Job form submitted:', formData);
    setJobFormData(formData);
    setCurrentStep('pricing');
  };

  const handleBackToTemplate = () => {
    setCurrentStep('template');
    setSelectedTemplate(null);
  };

  const handleBackToForm = () => {
    setCurrentStep('form');
  };

  return (
    <Layout>
      <Helmet>
        <title>Post a Job | EmviApp</title>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        {currentStep === 'template' && (
          <div className="container mx-auto py-8">
            <ConsolidatedJobTemplateSelector onTemplateSelect={handleTemplateSelect} />
          </div>
        )}
        
        {currentStep === 'form' && selectedTemplate && (
          <div className="container mx-auto py-8">
            <div className="mb-6">
              <button
                onClick={handleBackToTemplate}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                ← Back to Templates
              </button>
            </div>
            
            <EnhancedJobForm 
              selectedTemplate={selectedTemplate}
              onSubmit={handleFormSubmit}
              initialValues={selectedTemplate.prefillData}
            />
          </div>
        )}
        
        {currentStep === 'pricing' && jobFormData && (
          <JobPostingFlow 
            jobFormData={jobFormData}
            onBack={handleBackToForm}
          />
        )}
      </div>
    </Layout>
  );
};

export default EnhancedPostJob;
