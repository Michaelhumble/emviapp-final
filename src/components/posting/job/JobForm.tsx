
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobFormSchema, JobFormValues, IndustryType, JobType, CompensationType, JobTemplate } from './jobFormSchema';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import ContactInfoSection from '../sections/ContactInfoSection';
import JobDetailsSection from '../sections/JobDetailsSection';
import { getJobTemplate } from '@/utils/jobs/jobTemplates';
import { toast } from 'sonner';

interface JobFormProps {
  onSubmit: (data: JobFormValues) => void;
  defaultValues?: Partial<JobFormValues>;
  onTemplateSelect?: (template: JobFormValues, templateType: IndustryType) => void;
  expressMode?: boolean; // Add expressMode prop
}

const JobForm = ({ onSubmit, defaultValues = {}, onTemplateSelect, expressMode = false }: JobFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      salonName: '',
      title: '',
      description: '',
      vietnamese_description: '',
      location: '',
      specialties: [],
      requirements: [],
      jobType: 'full-time',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      has_housing: false,
      has_wax_room: false,
      owner_will_train: false,
      no_supply_deduction: false,
      salary_range: '',
      experience_level: '',
      ...defaultValues,
    },
    mode: 'onBlur', // Validate on blur for better UX
  });

  const handleTemplateSelect = (templateType: IndustryType) => {
    const template = getJobTemplate(templateType);
    
    if (onTemplateSelect) {
      // Convert template to match JobFormValues interface
      const formValues: JobFormValues = {
        salonName: template.salonName,
        title: template.title,
        description: template.description,
        vietnamese_description: template.vietnamese_description || '',
        location: template.location,
        jobType: template.jobType as JobType,
        specialties: template.specialties || [],
        requirements: template.requirements || [],
        contactName: template.contactName,
        contactEmail: template.contactEmail,
        contactPhone: template.contactPhone,
        compensation_type: template.compensation_type as CompensationType,
        compensation_details: template.compensation_details,
        weekly_pay: template.weekly_pay,
        has_housing: template.has_housing,
        has_wax_room: template.has_wax_room,
        owner_will_train: template.owner_will_train,
        no_supply_deduction: template.no_supply_deduction,
        salary_range: template.salary_range,
        experience_level: template.experience_level,
        industry: template.industry,
        templateType: templateType
      };
      
      onTemplateSelect(formValues, templateType);
    } else {
      // Convert template object to match the form values format
      form.reset({
        salonName: template.salonName,
        title: template.title,
        description: template.description,
        vietnamese_description: template.vietnamese_description || '',
        location: template.location,
        jobType: template.jobType as JobType,
        specialties: template.specialties || [],
        requirements: template.requirements || [],
        contactName: template.contactName,
        contactEmail: template.contactEmail,
        contactPhone: template.contactPhone,
        compensation_type: template.compensation_type as CompensationType,
        compensation_details: template.compensation_details,
        weekly_pay: template.weekly_pay,
        has_housing: template.has_housing,
        has_wax_room: template.has_wax_room,
        owner_will_train: template.owner_will_train,
        no_supply_deduction: template.no_supply_deduction,
        salary_range: template.salary_range,
        experience_level: template.experience_level,
        industry: template.industry,
        templateType: templateType
      });
    }
  };

  // Enforce validation and show toast with errors if form is invalid
  const handleSubmit = async (data: JobFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Check required fields explicitly to ensure thorough validation
      const requiredFields = [
        { field: 'title', message: 'Job title is required' },
        { field: 'salonName', message: 'Salon name is required' },
        { field: 'location', message: 'Location is required' },
        { field: 'description', message: 'Job description is required' },
        { field: 'jobType', message: 'Job type is required' },
        { field: 'contactName', message: 'Contact name is required' },
        { field: 'contactEmail', message: 'Contact email is required' },
        { field: 'contactPhone', message: 'Contact phone is required' },
      ];
      
      // Check for missing required fields
      const missingFields = requiredFields.filter(
        rf => !data[rf.field as keyof JobFormValues]
      );
      
      if (missingFields.length > 0) {
        const errorMessages = missingFields.map(f => f.message).join('\n');
        toast.error(`Please fix the following errors:\n${errorMessages}`);
        console.error("Validation errors:", missingFields);
        return;
      }
      
      // Prepare contact_info object from separate fields for consistency with JobDetailsSubmission
      data.contact_info = {
        owner_name: data.contactName,
        email: data.contactEmail,
        phone: data.contactPhone,
        notes: data.contactNotes || '',
        zalo: data.contactZalo || ''
      };
      
      // Set employment_type to match jobType for consistency
      data.employment_type = data.jobType;
      data.post_type = 'job';
      
      console.log("Form data validated, submitting:", data);
      onSubmit(data);
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("There was a problem submitting your form");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <JobDetailsSection form={form} expressMode={expressMode} />
        <ContactInfoSection form={form} expressMode={expressMode} />

        <div className="flex justify-end mt-6">
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="min-w-[150px] bg-primary text-white hover:bg-primary/90"
          >
            {isSubmitting ? 'Submitting...' : 'Continue'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default JobForm;
