
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobFormSchema, JobFormValues, IndustryType } from './jobFormSchema';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import ContactInfoSection from '../sections/ContactInfoSection';
import BasicInfoSection from '../sections/BasicInfoSection';
import DetailsSection from '../sections/DetailsSection';
import CompensationSection from '../sections/CompensationSection';
import LocationSection from '../sections/LocationSection';
import JobDetailsSection from './JobDetailsSection';
import { getJobTemplate } from '@/utils/jobs/jobTemplates';

interface JobFormProps {
  onSubmit: (data: JobFormValues) => void;
  defaultValues?: Partial<JobFormValues>;
  onTemplateSelect?: (template: JobFormValues, templateType: IndustryType) => void;
}

const JobForm = ({ onSubmit, defaultValues = {}, onTemplateSelect }: JobFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  
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
      weekly_pay: false,
      salary_range: '',
      experience_level: '',
      isNationwide: false,
      compensationMin: '',
      compensationMax: '',
      ...defaultValues,
    },
  });

  const handleTemplateSelect = (templateType: IndustryType) => {
    const template = getJobTemplate(templateType);
    
    if (onTemplateSelect) {
      onTemplateSelect(template as JobFormValues, templateType);
    } else {
      form.reset({
        ...template as unknown as JobFormValues,
        templateType: templateType
      });
    }
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = (data: JobFormValues) => {
    onSubmit(data);
  };

  const steps = [
    <BasicInfoSection 
      key="basic-info" 
      control={form.control} 
      onNext={nextStep} 
    />,
    <LocationSection 
      key="location" 
      control={form.control} 
      onNext={nextStep} 
      onPrevious={prevStep} 
    />,
    <DetailsSection 
      key="details" 
      control={form.control} 
      onNext={nextStep} 
      onPrevious={prevStep} 
    />,
    <CompensationSection 
      key="compensation" 
      control={form.control} 
      onNext={nextStep} 
      onPrevious={prevStep} 
    />,
    <JobDetailsSection 
      key="job-details" 
      control={form.control} 
      onNext={nextStep} 
      onPrevious={prevStep} 
    />,
    <ContactInfoSection 
      key="contact-info" 
      control={form.control} 
      onPrevious={prevStep} 
      onNext={() => form.handleSubmit(handleSubmit)()} 
      isLastStep={true}
    />
  ];

  return (
    <Form {...form}>
      <form onSubmit={(e) => { e.preventDefault(); }} className="space-y-8">
        {steps[currentStep]}
      </form>
    </Form>
  );
};

export default JobForm;
