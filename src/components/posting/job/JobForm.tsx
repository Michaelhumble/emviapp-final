
import React, { useState } from 'react';
import { MobileButton } from '@/components/ui/mobile-button';
import { JobFormValues, IndustryType } from './jobFormSchema';
import { useTranslation } from '@/hooks/useTranslation';
import JobDetailsSection from '../sections/JobDetailsSection';
import CompensationSection from '../sections/CompensationSection';
import ContactInformationSection from '../sections/ContactInformationSection';
import { Job } from '@/types/job';
import { jobPostingTranslations } from '@/translations/jobPostingForm';
import JobTemplateSelector from './JobTemplateSelector';

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
  const commonTranslations = jobPostingTranslations.common;
  const [industryType, setIndustryType] = useState<IndustryType | ''>('');
  
  const [formState, setFormState] = useState({
    jobDetails: {
      title: initialValues?.title || '',
      description: initialValues?.description || '',
      location: initialValues?.location || '',
      requirements: initialValues?.requirements || [],
      specialties: [],
      weekly_pay: false,
      has_housing: false,
      has_wax_room: false,
      no_supply_deduction: false,
      owner_will_train: false,
      industry: initialValues?.industry || '',
      experience_level: initialValues?.experience_level || 'experienced' as 'entry' | 'intermediate' | 'experienced' | 'senior',
    },
    compensation: {
      employment_type: initialValues?.jobType || 'full-time',
      compensation_type: '',
      compensation_details: initialValues?.salary_range || '',
      salary_range: initialValues?.salary_range || '',
      tip_range: '',
      experience_level: initialValues?.experience_level || 'experienced' as 'entry' | 'intermediate' | 'experienced' | 'senior',
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
    setFormState(prev => ({
      ...prev, 
      jobDetails: details
    }));
    
    // Update the industry type if it has been selected
    if (details.industry && details.industry !== industryType) {
      setIndustryType(details.industry);
    }
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
  
  const handleTemplateSelection = (templateData: Partial<JobFormValues>) => {
    if (templateData.industry) {
      setIndustryType(templateData.industry as IndustryType);
    }
    
    // Update job details
    setFormState(prev => ({
      ...prev,
      jobDetails: {
        ...prev.jobDetails,
        title: templateData.title || prev.jobDetails.title,
        description: templateData.description || prev.jobDetails.description,
        industry: templateData.industry || prev.jobDetails.industry,
        requirements: templateData.requirements || prev.jobDetails.requirements,
      },
      compensation: {
        ...prev.compensation,
        employment_type: templateData.jobType || prev.compensation.employment_type,
        salary_range: templateData.salary_range || prev.compensation.salary_range,
        experience_level: templateData.experience_level || prev.compensation.experience_level,
      }
    }));
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
    <form onSubmit={handleSubmit} className="space-y-10 bg-white rounded-lg">
      {/* Template Selector */}
      <div className="mb-10">
        <JobTemplateSelector 
          selectedIndustry={industryType} 
          onSelectTemplate={handleTemplateSelection} 
        />
      </div>
      
      <div className="space-y-12 mt-8">
        {/* Job Details Section */}
        <JobDetailsSection 
          details={formState.jobDetails}
          onChange={handleJobDetailsChange}
          photoUploads={photoUploads}
          setPhotoUploads={setPhotoUploads}
          industryType={industryType || undefined}
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
          {isSubmitting ? t(commonTranslations.submitting) : t({
            english: 'Continue to Next Step',
            vietnamese: 'Tiếp tục đến bước tiếp theo'
          })}
        </MobileButton>
      </div>
    </form>
  );
};
