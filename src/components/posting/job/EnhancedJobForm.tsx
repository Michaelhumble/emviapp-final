
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import JobForm from './JobForm';
import { ReviewAndPaymentSection } from '../sections/ReviewAndPaymentSection';
import { Card, CardContent } from '@/components/ui/card';
import { JobFormValues } from './jobFormSchema';
import { PricingOptions } from '@/utils/posting/types';
import JobTemplateSelector from './JobTemplateSelector';

interface EnhancedJobFormProps {
  onSubmit: (formData: JobFormValues, photoUploads: File[], pricingOptions: PricingOptions) => Promise<boolean>;
  initialValues?: JobFormValues;
  onStepChange?: (step: number) => void;
}

const EnhancedJobForm: React.FC<EnhancedJobFormProps> = ({ 
  onSubmit, 
  initialValues,
  onStepChange 
}) => {
  const [currentStep, setCurrentStep] = useState<'template' | 'form' | 'review'>('template');
  const [formData, setFormData] = useState<JobFormValues | null>(null);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<JobFormValues | null>(null);
  const [pricingOptions, setPricingOptions] = useState<PricingOptions>({
    selectedPricingTier: 'premium',
    durationMonths: 1,
    isFirstPost: true
  });
  
  useEffect(() => {
    if (onStepChange) {
      onStepChange(currentStep === 'template' ? 1 : currentStep === 'form' ? 2 : 3);
    }
  }, [currentStep, onStepChange]);
  
  const handleTemplateSelect = (template: JobFormValues) => {
    setSelectedTemplate(template);
    // Always go to the form step after template selection
    setCurrentStep('form');
    window.scrollTo(0, 0);
  };
  
  const handleFormSubmit = (data: JobFormValues) => {
    // Ensure all required fields are present
    if (!validateRequiredFields(data)) {
      return;
    }
    
    setFormData(data);
    setCurrentStep('review');
    window.scrollTo(0, 0);
  };
  
  const validateRequiredFields = (data: JobFormValues): boolean => {
    // Check for required fields
    if (!data.title || !data.description || !data.location || !data.contactEmail) {
      return false;
    }
    return true;
  };
  
  const handleFinalSubmit = async (finalOptions: PricingOptions) => {
    // Double check that we have form data before allowing payment
    if (!formData || !validateRequiredFields(formData)) {
      setCurrentStep('form');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Convert form data to JobFormValues format
      const jobFormValues: JobFormValues = {
        title: formData.title || '',
        description: formData.description || '',
        vietnameseDescription: formData.vietnameseDescription || '',
        location: formData.location || '',
        compensation_details: formData.compensation_details || '',
        salary_range: formData.salary_range || '',
        jobType: formData.jobType || 'full-time',
        experience_level: formData.experience_level || 'experienced',
        contactEmail: formData.contactEmail || '',
        requirements: formData.requirements || [],
        specialties: formData.specialties || [],
        contactName: formData.contactName || '',
        contactPhone: formData.contactPhone || '',
      };
      
      const success = await onSubmit(jobFormValues, photoUploads, finalOptions);
      
      if (!success) {
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error in final submission:', error);
      setIsSubmitting(false);
    }
  };
  
  const handleBack = () => {
    if (currentStep === 'review') {
      setCurrentStep('form');
    } else if (currentStep === 'form') {
      setCurrentStep('template');
    }
    window.scrollTo(0, 0);
  };
  
  return (
    <Card className="border shadow-md rounded-xl overflow-hidden bg-white">
      <CardContent className="p-0">
        <AnimatePresence mode="wait">
          {currentStep === 'template' ? (
            <motion.div
              key="template-step"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-6"
            >
              <JobTemplateSelector onTemplateSelect={handleTemplateSelect} />
            </motion.div>
          ) : currentStep === 'form' ? (
            <motion.div
              key="form-step"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-6"
            >
              <JobForm 
                onSubmit={handleFormSubmit} 
                photoUploads={photoUploads} 
                setPhotoUploads={setPhotoUploads}
                isSubmitting={isSubmitting}
                initialValues={selectedTemplate || initialValues}
                onBack={handleBack}
                showVietnameseByDefault={selectedTemplate?.title?.toLowerCase().includes('nail') ? true : false}
              />
            </motion.div>
          ) : (
            <motion.div
              key="review-step"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="p-6"
            >
              <ReviewAndPaymentSection 
                formData={formData} 
                photoUploads={photoUploads}
                onBack={handleBack}
                onSubmit={handleFinalSubmit}
                isSubmitting={isSubmitting}
                pricingOptions={pricingOptions}
                setPricingOptions={setPricingOptions}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default EnhancedJobForm;
