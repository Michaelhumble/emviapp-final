
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
  const [formInitialValues, setFormInitialValues] = useState<any>(null);

  const handleTemplateSelect = (template: any) => {
    console.log('🎯 Template selected in handleTemplateSelect:', template);
    
    // Get the template ID - it could be the template itself if it's a string, or template.id
    const templateId = typeof template === 'string' ? template : (template.id || template.title || '');
    console.log('🔍 Template ID extracted:', templateId);
    
    // Get prefill data based on template selection
    const prefillData = getJobPrefillByIndustry(templateId);
    console.log('📋 Prefill data retrieved:', prefillData);
    console.log('📋 Prefill data keys:', Object.keys(prefillData));
    console.log('🏷️ Title field:', prefillData.title);
    console.log('🏢 Company field:', prefillData.company);
    console.log('📝 Description field preview:', prefillData.description.substring(0, 100) + '...');
    console.log('📋 Requirements array length:', prefillData.requirements?.length || 0);
    console.log('🎁 Benefits array length:', prefillData.benefits?.length || 0);
    console.log('💰 Salary field:', prefillData.salary);
    console.log('📍 Location field:', prefillData.location);
    
    // Store the selected template and prefill data
    setSelectedTemplate(template);
    setFormInitialValues(prefillData);
    
    // Additional verification logs
    console.log('✅ formInitialValues will be set to:', prefillData);
    console.log('✅ Moving to form step with prefill data');
    console.log('🚀 About to render EnhancedJobForm with initialValues:', {
      hasTitle: !!prefillData.title,
      hasCompany: !!prefillData.company,
      hasDescription: !!prefillData.description,
      requirementsCount: prefillData.requirements?.length || 0,
      benefitsCount: prefillData.benefits?.length || 0,
      hasSalary: !!prefillData.salary,
      hasLocation: !!prefillData.location
    });
    
    setCurrentStep('form');
  };

  const handleFormSubmit = (formData: any) => {
    console.log('Job form submitted:', formData);
    
    // Merge any prefill data with submitted form data for complete job information
    const completeJobData = {
      ...formInitialValues,
      ...formData,
      selectedTemplate
    };
    
    setJobFormData(completeJobData);
    setCurrentStep('pricing');
  };

  const handleBackToTemplate = () => {
    setCurrentStep('template');
    setSelectedTemplate(null);
    setFormInitialValues(null);
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
              initialValues={formInitialValues}
              onSubmit={handleFormSubmit}
            />
          </div>
        )}
        
        {currentStep === 'pricing' && jobFormData && (
          <JobPostingFlow 
            jobData={jobFormData}
          />
        )}
      </div>
    </Layout>
  );
};

export default EnhancedPostJob;
