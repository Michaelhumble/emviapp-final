
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobFormSchema, JobFormValues, IndustryType } from './jobFormSchema';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import ContactInfoSection from '../sections/ContactInfoSection';
import JobDetailsSection from '../sections/JobDetailsSection';
import { getJobTemplate } from '@/utils/jobs/jobTemplates';

interface JobFormProps {
  onSubmit: (data: JobFormValues) => void;
  defaultValues?: Partial<JobFormValues>;
  onTemplateSelect?: (template: JobFormValues, templateType: IndustryType) => void;
}

const JobForm = ({ onSubmit, defaultValues = {}, onTemplateSelect }: JobFormProps) => {
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
  });

  const handleTemplateSelect = (templateType: IndustryType) => {
    const template = getJobTemplate(templateType);
    
    if (onTemplateSelect) {
      // Pass only the JobFormValues fields to the parent component
      const { 
        salonName, title, description, vietnameseDescription, location, jobType,
        specialties, requirements, contactName, contactEmail, contactPhone,
        compensation_type, compensation_details, weekly_pay, has_housing,
        has_wax_room, owner_will_train, no_supply_deduction, salary_range,
        experience_level
      } = template;
      
      const templateValues: JobFormValues = {
        salonName, title, description, vietnameseDescription, location, jobType,
        specialties: specialties || [],
        requirements: requirements || [],
        contactName, contactEmail, contactPhone,
        compensation_type, compensation_details, weekly_pay, has_housing,
        has_wax_room, owner_will_train, no_supply_deduction, salary_range,
        experience_level
      };
      
      onTemplateSelect(templateValues, templateType);
    } else {
      // Only set the form values if we're not forwarding to the parent
      form.reset({
        ...template,
        specialties: template.specialties || [],
        requirements: template.requirements || []
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <JobDetailsSection form={form} />
        <ContactInfoSection form={form} />

        <div className="flex justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default JobForm;
