
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MobileButton } from '@/components/ui/mobile-button';
import { JobFormValues, IndustryType } from './jobFormSchema';
import { useTranslation } from '@/hooks/useTranslation';
import JobDetailsSection from '../sections/JobDetailsSection';
import CompensationSection from '../sections/CompensationSection';
import ContactInformationSection from '../sections/ContactInformationSection';
import { Job } from '@/types/job';
import { jobPostingTranslations } from '@/translations/jobPostingForm';
import { JobTemplates } from './JobTemplates';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { jobTemplates } from './jobTemplates';

interface JobFormProps {
  onSubmit: (values: any) => void;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  isSubmitting: boolean;
  initialValues?: JobFormValues;
}

export const JobForm: React.FC<JobFormProps> = ({ 
  onSubmit, 
  photoUploads, 
  setPhotoUploads, 
  isSubmitting,
  initialValues
}) => {
  const { t } = useTranslation();
  const commonTranslations = jobPostingTranslations.common || {
    continue: 'Continue',
    submitting: 'Submitting...',
    back: 'Back'
  };
  
  const [step, setStep] = useState<'template' | 'form'>('template');
  const [industryType, setIndustryType] = useState<IndustryType | undefined>();
  
  const [formState, setFormState] = useState({
    jobDetails: {
      title: initialValues?.title || '',
      description: initialValues?.description || '',
      vietnameseDescription: initialValues?.vietnameseDescription || '',
      location: initialValues?.location || '',
      requirements: initialValues?.requirements || [],
      specialties: [],
      weekly_pay: false,
      has_housing: false,
      has_wax_room: false,
      no_supply_deduction: false,
      owner_will_train: false,
    },
    compensation: {
      employment_type: initialValues?.jobType || 'full-time',
      compensation_type: '',
      compensation_details: initialValues?.compensation_details || '',
      salary_range: initialValues?.salary_range || '',
      tip_range: '',
      experience_level: initialValues?.experience_level || 'experienced',
    },
    contact_info: {
      owner_name: '',
      phone: '',
      email: initialValues?.contactEmail || '',
      notes: '',
      zalo: '',
    },
  });
  
  const handleJobDetailsChange = (details: any) => {
    setFormState(prev => ({ ...prev, jobDetails: details }));
  };
  
  const handleCompensationChange = (compensation: any) => {
    setFormState(prev => ({ ...prev, compensation }));
  };
  
  const handleContactInfoChange = (contactInfo: Partial<Job['contact_info']>) => {
    setFormState(prev => ({
      ...prev,
      contact_info: {
        ...prev.contact_info,
        ...contactInfo
      }
    }));
  };
  
  const handleTemplateSelection = (selectedIndustry: IndustryType, templateData: Partial<JobFormValues>) => {
    setIndustryType(selectedIndustry);
    
    // Update job details
    setFormState(prev => ({
      jobDetails: {
        ...prev.jobDetails,
        title: templateData.title || prev.jobDetails.title,
        description: templateData.description || prev.jobDetails.description,
        vietnameseDescription: templateData.vietnameseDescription || prev.jobDetails.vietnameseDescription,
        location: templateData.location || prev.jobDetails.location,
        requirements: templateData.requirements || prev.jobDetails.requirements,
      },
      compensation: {
        ...prev.compensation,
        employment_type: templateData.jobType || prev.compensation.employment_type,
        salary_range: templateData.salary_range || prev.compensation.salary_range,
        experience_level: templateData.experience_level || prev.compensation.experience_level,
      },
      contact_info: prev.contact_info
    }));
    
    // Move to form step after template selection with animation delay
    setTimeout(() => {
      setStep('form');
      // Scroll to top of form
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  };
  
  const handleBackToTemplates = () => {
    setStep('template');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Merge form sections into a single object for submission
    const formData = {
      ...formState.jobDetails,
      ...formState.compensation,
      contact_info: formState.contact_info,
    };
    
    onSubmit(formData);
  };
  
  return (
    <motion.div 
      className="bg-white rounded-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence mode="wait">
        {step === 'template' ? (
          <motion.div
            key="template-step"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <JobTemplates 
              onSelectTemplate={handleTemplateSelection}
              selectedIndustry={industryType}
            />
          </motion.div>
        ) : (
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-10"
            key="form-step"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center mb-6">
              <Button
                type="button"
                variant="ghost"
                onClick={handleBackToTemplates}
                className="text-gray-500 hover:text-gray-700"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t(commonTranslations.back)}
              </Button>
              
              <div className="ml-4 flex items-center">
                <span className="bg-purple-100 text-purple-700 text-xs font-medium mr-2 px-2.5 py-1 rounded-full">
                  {industryType && industryType.charAt(0).toUpperCase() + industryType.slice(1)}
                </span>
                <h2 className="text-xl font-semibold text-gray-800">
                  {t({
                    english: "Customize Your Job Post",
                    vietnamese: "Tùy chỉnh Bài Đăng Việc làm của Bạn"
                  })}
                </h2>
              </div>
            </div>
            
            <div className="space-y-12">
              {/* Job Details Section */}
              <JobDetailsSection 
                details={formState.jobDetails}
                onChange={handleJobDetailsChange}
                photoUploads={photoUploads}
                setPhotoUploads={setPhotoUploads}
                industryType={industryType}
              />
              
              {/* Compensation Section */}
              <CompensationSection 
                details={formState.compensation}
                onChange={handleCompensationChange}
              />
              
              {/* Contact Information Section */}
              <ContactInformationSection 
                contactInfo={formState.contact_info}
                onChange={handleContactInfoChange}
              />
            </div>
            
            <div className="flex justify-end pt-8 border-t border-border">
              <MobileButton
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="min-w-[150px] bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium"
              >
                {isSubmitting ? t(commonTranslations.submitting) : t(commonTranslations.continue)}
              </MobileButton>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
