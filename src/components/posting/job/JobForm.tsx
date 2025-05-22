
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
}

const JobForm = ({ onSubmit, defaultValues = {}, onTemplateSelect }: JobFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      salonName: '',
      title: '',
      description: '',
      vietnameseDescription: '',
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
        vietnameseDescription: template.vietnameseDescription,
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
        vietnameseDescription: template.vietnameseDescription,
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
      // Map form values to JobDetailsSubmission structure
      const formattedData = {
        ...data,
        // Required by JobDetailsSubmission
        company: data.salonName, // For backward compatibility
        contact_info: {
          owner_name: data.contactName,
          phone: data.contactPhone,
          email: data.contactEmail,
          notes: '',
        },
      };
      
      onSubmit(formattedData);
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
        <JobDetailsSection form={form} />
        <ContactInfoSection form={form} />

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
