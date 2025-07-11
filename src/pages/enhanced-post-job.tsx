
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ConsolidatedJobTemplateSelector from '@/components/job-posting-new/ConsolidatedJobTemplateSelector';
import EnhancedJobForm from '@/components/posting/job/EnhancedJobForm';
import JobPostingFlow from '@/components/posting/job/JobPostingFlow';
import { getJobPrefillByIndustry } from '@/utils/beautyIndustryPrefills';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CreditCard, CheckCircle } from 'lucide-react';
import NailJobPostForm from '@/components/nails/NailJobPostForm';

type PostingStep = 'template' | 'form' | 'pricing';

const EnhancedPostJob = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<PostingStep>('template');
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [jobFormData, setJobFormData] = useState<any>(null);
  const [formInitialValues, setFormInitialValues] = useState<any>(null);
  const [isNailsCategory, setIsNailsCategory] = useState(false);
  
  // Check for edit state
  const editState = location.state as { editJobId?: string; editJobData?: any } | null;

  // Check if this is a nails-specific route or category
  useEffect(() => {
    const isNailsRoute = location.pathname.includes('/nails') || 
                        location.pathname === '/post-job/nails';
    setIsNailsCategory(isNailsRoute);
    
    // If coming from /post-job/nails, auto-select nails template
    if (isNailsRoute) {
      setSelectedTemplate({ id: 'nails', title: 'Nail Technician' });
      const prefillData = getJobPrefillByIndustry('nails');
      setFormInitialValues(prefillData);
      setCurrentStep('form');
    }
  }, [location.pathname]);

  const handleTemplateSelect = (template: any) => {
    console.log('🎯 Template selected in handleTemplateSelect:', template);
    
    // Get the template ID - it could be the template itself if it's a string, or template.id
    const templateId = typeof template === 'string' ? template : (template.id || template.title || '');
    console.log('🔍 Template ID extracted:', templateId);
    
    // Check if this is a nails template
    const isNails = templateId.toLowerCase().includes('nail') || templateId === 'nails';
    setIsNailsCategory(isNails);
    
    // Get prefill data based on template selection
    const prefillData = getJobPrefillByIndustry(templateId);
    console.log('📋 Prefill data retrieved:', prefillData);
    
    // Store the selected template and prefill data
    setSelectedTemplate(template);
    setFormInitialValues(prefillData);
    
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
            {!location.pathname.includes('/nails') && (
              <div className="mb-6">
                <button
                  onClick={handleBackToTemplate}
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  ← Back to Templates
                </button>
              </div>
            )}
            
            {isNailsCategory ? (
              <NailJobPostForm 
                onSubmit={handleFormSubmit}
                editJobId={editState?.editJobId}
                editJobData={editState?.editJobData}
              />
            ) : (
              <EnhancedJobForm 
                initialValues={formInitialValues}
                onSubmit={handleFormSubmit}
              />
            )}
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
