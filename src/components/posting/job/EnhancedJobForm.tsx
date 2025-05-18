
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { JobForm } from './JobForm';
import { ReviewAndPaymentSection } from '../sections/ReviewAndPaymentSection';
import { Card, CardContent } from '@/components/ui/card';
import { JobFormValues } from './jobFormSchema';
import { PricingOptions } from '@/utils/posting/types';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

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
  const [currentStep, setCurrentStep] = useState<'form' | 'review'>('form');
  const [formData, setFormData] = useState<any>(null);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pricingOptions, setPricingOptions] = useState<PricingOptions>({
    selectedPricingTier: 'premium',
    durationMonths: 1,
    isFirstPost: true
  });

  const cardAnimation = useScrollAnimation({
    animation: 'fade-in',
    threshold: 0.1,
  });
  
  useEffect(() => {
    if (onStepChange) {
      onStepChange(currentStep === 'form' ? 1 : 2);
    }
  }, [currentStep, onStepChange]);
  
  const handleFormSubmit = (data: any) => {
    setFormData(data);
    setCurrentStep('review');
    window.scrollTo(0, 0);
  };
  
  const handleFinalSubmit = async (finalOptions: PricingOptions) => {
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
        jobType: formData.employment_type || 'full-time',
        experience_level: formData.experience_level || 'experienced',
        contactEmail: formData.contact_info?.email || '',
        requirements: formData.requirements || [],
        specialties: formData.specialties || [],
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
    setCurrentStep('form');
    window.scrollTo(0, 0);
  };
  
  return (
    <Card 
      className="border shadow-lg rounded-xl overflow-hidden bg-gradient-to-b from-white to-gray-50"
      {...cardAnimation}
    >
      <CardContent className="p-0">
        <AnimatePresence mode="wait">
          {currentStep === 'form' ? (
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
                initialValues={initialValues}
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
